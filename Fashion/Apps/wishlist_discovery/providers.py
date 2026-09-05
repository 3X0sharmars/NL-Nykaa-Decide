# -*- coding: utf-8 -*-
"""
Model-call layer. One interface, two free-tier backends.

    call_model(model, system, user) -> raw text (expected to be JSON)

Provider is inferred from the model id:
    "gemini-*"        -> Google Gemini (google-genai SDK)
    "<vendor>/<name>" -> NVIDIA build.nvidia.com (OpenAI-compatible)

Retry policy is shared and matches config: 4xx are PERMANENT and raise
immediately; only 429 and 5xx retry with exponential backoff. Retrying a
permanent error burns quota and buries the cause.
"""

import json
import os
import time

import requests

import config

NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions"


class TransportError(RuntimeError):
    """
    API/parse failure -- the model never returned a usable label.

    Deliberately distinct from a classification disagreement. Conflating the
    two once produced a "0/11 failed" report that looked like a taxonomy
    collapse but was an HTTP 404.
    """

    def __init__(self, message, status=None, permanent=False):
        super().__init__(message)
        self.status = status
        self.permanent = permanent


def provider_of(model: str) -> str:
    return "nvidia" if "/" in model else "gemini"


def _status_of(exc):
    for attr in ("code", "status_code"):
        val = getattr(exc, attr, None)
        if isinstance(val, int):
            return val
    resp = getattr(exc, "response", None)
    val = getattr(resp, "status_code", None)
    if isinstance(val, int):
        return val
    import re
    m = re.search(r"\b([45]\d{2})\b", str(exc))
    return int(m.group(1)) if m else None


def is_per_day_quota(text: str) -> bool:
    """
    Distinguish a per-DAY 429 from a per-MINUTE 429.

    This matters enormously on a 20-requests-per-day free tier: EVERY retry
    consumes one of the 20. Blanket-retrying a 429 four times turns one logical
    call into five daily requests, so three batch chunks can erase a whole day's
    budget before a single classification lands. That is exactly what happened
    on 2026-08-23.

    A per-day 429 is PERMANENT for the rest of the day -- retrying it cannot
    succeed and can only burn budget. A per-minute 429 is genuinely transient.
    """
    t = (text or "")
    return ("PerDay" in t) or ("per-day" in t.lower())


def _should_retry(status, body=""):
    if status == 429 and is_per_day_quota(body):
        return False          # permanent for today; never spend budget retrying
    return status is None or status in config.RETRY_ON_STATUS


def _backoff(attempt):
    return min(config.RETRY_BASE_DELAY_S * (2 ** (attempt - 1)),
               config.RETRY_MAX_DELAY_S)


# ---------------------------------------------------------------------------
# Gemini
# ---------------------------------------------------------------------------
_gemini_client = None


def _gemini_client_once():
    global _gemini_client
    if _gemini_client is None:
        try:
            from google import genai
        except ImportError:
            raise SystemExit("ERROR: pip install google-genai")
        key = os.environ.get("GEMINI_API_KEY", "").strip()
        if not key:
            raise SystemExit("ERROR: GEMINI_API_KEY is not set.")
        _gemini_client = genai.Client(api_key=key)
    return _gemini_client


def _call_gemini(model, system, user, schema, max_tokens):
    from google.genai import types
    client = _gemini_client_once()
    cfg = types.GenerateContentConfig(
        temperature=0,
        system_instruction=system,
        response_mime_type="application/json",
        response_schema=schema,
        max_output_tokens=max_tokens,
    )
    resp = client.models.generate_content(model=model, contents=user, config=cfg)
    return (getattr(resp, "text", None) or "").strip()


# ---------------------------------------------------------------------------
# NVIDIA (OpenAI-compatible)
# ---------------------------------------------------------------------------
def _call_nvidia(model, system, user, schema, max_tokens):
    key = os.environ.get("NVIDIA_API_KEY", "").strip()
    if not key:
        raise SystemExit("ERROR: NVIDIA_API_KEY is not set.")
    payload = {
        "model": model,
        "messages": [{"role": "system", "content": system},
                     {"role": "user", "content": user}],
        "temperature": 0,
        "max_tokens": max_tokens,
        "response_format": {"type": "json_object"},
    }
    r = requests.post(
        NVIDIA_URL,
        headers={"Authorization": "Bearer " + key, "Accept": "application/json"},
        json=payload, timeout=180)
    if r.status_code != 200:
        raise TransportError(
            "NVIDIA HTTP " + str(r.status_code) + ": " + r.text[:250],
            status=r.status_code,
            permanent=not _should_retry(r.status_code, r.text))
    body = r.json()
    try:
        return (body["choices"][0]["message"]["content"] or "").strip()
    except (KeyError, IndexError):
        raise TransportError("NVIDIA response missing content: "
                             + json.dumps(body)[:200], status=200, permanent=False)


def call_model(model, system, user, schema=None, max_tokens=8192):
    """
    Single call with shared retry policy. Returns raw text.
    Raises TransportError; never returns a partial or invented result.
    """
    prov = provider_of(model)
    last = None
    for attempt in range(1, config.MAX_RETRIES + 1):
        try:
            if prov == "gemini":
                out = _call_gemini(model, system, user, schema, max_tokens)
            else:
                out = _call_nvidia(model, system, user, schema, max_tokens)
            if not out:
                last = "empty response body"
                if attempt >= config.MAX_RETRIES:
                    raise TransportError("empty response after retries",
                                         status=None, permanent=False)
                time.sleep(_backoff(attempt))
                continue
            return out
        except TransportError as exc:
            if exc.permanent:
                raise
            last = str(exc)
            if attempt >= config.MAX_RETRIES:
                raise
            time.sleep(_backoff(attempt))
        except Exception as exc:
            status = _status_of(exc)
            body = str(exc)
            detail = (exc.__class__.__name__
                      + (" HTTP " + str(status) if status else "")
                      + ": " + body[:250])
            if status is not None and not _should_retry(status, body):
                kind = ("per-day quota exhausted -- NOT retried (each retry "
                        "would consume another of the day's requests)"
                        if status == 429 else "permanent API error (not retried)")
                raise TransportError(kind + ": " + detail,
                                     status=status, permanent=True)
            last = detail
            if attempt >= config.MAX_RETRIES:
                raise TransportError(
                    "transient error persisted after " + str(config.MAX_RETRIES)
                    + " attempts: " + detail, status=status, permanent=False)
            time.sleep(_backoff(attempt))
    raise TransportError("exhausted retries: " + str(last), permanent=False)
