# -*- coding: utf-8 -*-
"""
MODULE A -- X / Twitter retrieval.

Built for a LIMITED QUOTA. The controlling design constraints:

  * Per-request cap and inter-request delay come from config, tunable without
    touching code (X_MAX_RESULTS_PER_REQUEST, X_TOKEN_BUCKET_DELAY_S,
    X_MAX_REQUESTS_TOTAL).
  * CHECKPOINT AFTER EVERY REQUEST. Quota exhaustion, a 429, or a crash must
    never lose units already retrieved. Units are appended to a JSONL
    checkpoint and completed queries are recorded in a state file, so a re-run
    resumes instead of re-spending quota.
  * Every query is logged, including zero-yield ones.
  * On exhaustion the run stops cleanly and reports how many queries remain
    unrun.

EXPECTED LOW YIELD. X posts are short; most will fail the section 4.1 intent
filter or land in Other/insufficient-information. That is a property of the
genre, not a bug, and nothing here is loosened to raise the count.

Auth: set X_BEARER_TOKEN in .env (an app-only bearer token for the v2 API).
"""

import json
import os
import re
import time

import requests

import config
import util

SEARCH_URL = "https://api.x.com/2/tweets/search/recent"

CHECKPOINT_DIR = os.path.join(config.ARTEFACTS_DIR, "checkpoints")
UNITS_JSONL = os.path.join(CHECKPOINT_DIR, "x_units.jsonl")
STATE_JSON = os.path.join(CHECKPOINT_DIR, "x_state.json")

INDIA_RE = re.compile(config.X_INDIA_TERMS, re.IGNORECASE)


class XQuotaExhausted(RuntimeError):
    """Raised when X reports rate/quota exhaustion. Not an error to hide."""


class XAuthError(RuntimeError):
    """Raised when credentials are missing or rejected."""


# ---------------------------------------------------------------------------
# Checkpointing
# ---------------------------------------------------------------------------
def _ensure_ckpt():
    os.makedirs(CHECKPOINT_DIR, exist_ok=True)


def load_state():
    _ensure_ckpt()
    if os.path.exists(STATE_JSON):
        with open(STATE_JSON, "r", encoding="utf-8") as f:
            return json.load(f)
    return {"completed_queries": [], "requests_made": 0}


def save_state(state):
    _ensure_ckpt()
    tmp = STATE_JSON + ".tmp"
    with open(tmp, "w", encoding="utf-8") as f:
        json.dump(state, f, indent=2)
    os.replace(tmp, STATE_JSON)   # atomic: a crash mid-write cannot corrupt it


def append_units(units):
    """Append retrieved units to the checkpoint immediately, then fsync."""
    _ensure_ckpt()
    with open(UNITS_JSONL, "a", encoding="utf-8") as f:
        for u in units:
            f.write(json.dumps(u, ensure_ascii=False) + "\n")
        f.flush()
        os.fsync(f.fileno())


def load_checkpointed_units():
    if not os.path.exists(UNITS_JSONL):
        return []
    out = []
    with open(UNITS_JSONL, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                try:
                    out.append(json.loads(line))
                except json.JSONDecodeError:
                    util.log("  ! skipping corrupt checkpoint line")
    return out


# ---------------------------------------------------------------------------
# Retrieval
# ---------------------------------------------------------------------------
def _bearer():
    tok = (os.environ.get("X_BEARER_TOKEN")
           or os.environ.get("TWITTER_BEARER_TOKEN") or "").strip()
    if not tok:
        raise XAuthError(
            "X_BEARER_TOKEN is not set. Add it to .env. Module A cannot run "
            "without it, and no substitute source will be used.")
    return tok


def _search_once(query, token):
    params = {
        "query": query + " -is:retweet lang:" + config.X_LANG,
        "max_results": config.X_MAX_RESULTS_PER_REQUEST,
        "tweet.fields": "created_at,lang,author_id,public_metrics",
    }
    headers = {"Authorization": "Bearer " + token,
               "User-Agent": "wishlist-research/1.0"}
    resp = requests.get(SEARCH_URL, headers=headers, params=params, timeout=30)

    if resp.status_code in (401, 403):
        raise XAuthError("X API returned HTTP " + str(resp.status_code)
                         + ": " + resp.text[:200])
    if resp.status_code == 429:
        raise XQuotaExhausted("X API rate/quota limit (429): " + resp.text[:200])
    if resp.status_code != 200:
        raise RuntimeError("X API HTTP " + str(resp.status_code) + ": "
                           + resp.text[:200])
    return resp.json()


def _to_unit(t, query):
    text = util.clean_text(t.get("text", "") or "")
    if not text:
        return None
    tid = t.get("id", "")
    url = "https://x.com/i/web/status/" + tid if tid else ""
    return {
        "unit_id": util.make_unit_id("x", text, url),
        "source": "x",
        "source_detail": "X/Twitter",
        "url": url,
        "retrieved_at": util.now_iso(),
        "text": text,
        "platform_mentioned": util.tag_platform(text),
        "query_matched": query,
        "source_genre": "social_short",
        "vertical": config.tag_vertical(text, "X/Twitter", "x"),
    }


def retrieve(query_log, resume=True):
    """
    Run the X query set under quota control.

    Returns (units, report_dict). Never raises on quota exhaustion -- it stops
    cleanly, keeps everything already checkpointed, and reports what is unrun.
    """
    token = _bearer()   # raises XAuthError loudly if absent

    state = load_state() if resume else {"completed_queries": [], "requests_made": 0}
    completed = set(state.get("completed_queries", []))
    requests_made = int(state.get("requests_made", 0))

    units = load_checkpointed_units() if resume else []
    if units:
        util.log("Resumed " + str(len(units)) + " units from checkpoint; "
                 + str(len(completed)) + " queries already done.")

    pending = [q for q in config.X_QUERIES if q not in completed]
    stopped_reason = None

    for query in pending:
        if requests_made >= config.X_MAX_REQUESTS_TOTAL:
            stopped_reason = ("request ceiling reached ("
                              + str(config.X_MAX_REQUESTS_TOTAL) + ")")
            break

        try:
            payload = _search_once(query, token)
        except XQuotaExhausted as exc:
            stopped_reason = "quota exhausted: " + str(exc)[:160]
            util.log("  !! " + stopped_reason)
            break
        except XAuthError:
            raise
        except Exception as exc:
            util.log("  ! error on " + repr(query) + ": "
                     + exc.__class__.__name__ + " " + str(exc)[:160])
            query_log.record(query_string=query, source="x",
                             raw_results_returned=0, units_retained=0,
                             method="X v2 recent search",
                             notes="ERROR " + exc.__class__.__name__)
            requests_made += 1
            state["requests_made"] = requests_made
            save_state(state)
            time.sleep(config.X_TOKEN_BUCKET_DELAY_S)
            continue

        requests_made += 1
        raw = payload.get("data", []) or []

        # India-relevance filter, applied from the text itself.
        kept = []
        for t in raw:
            u = _to_unit(t, query)
            if u is None:
                continue
            if not INDIA_RE.search(u["text"]):
                continue
            kept.append(u)

        # CHECKPOINT IMMEDIATELY -- before anything else can fail.
        if kept:
            append_units(kept)
        units.extend(kept)
        completed.add(query)
        state["completed_queries"] = sorted(completed)
        state["requests_made"] = requests_made
        save_state(state)

        query_log.record(
            query_string=query, source="x",
            raw_results_returned=len(raw), units_retained=len(kept),
            method="X v2 recent search, max_results="
                   + str(config.X_MAX_RESULTS_PER_REQUEST),
            notes="India-relevance filter applied post-retrieval; "
                  "lang=" + config.X_LANG + "; retweets excluded")

        util.log("  " + query.ljust(38) + " raw=" + str(len(raw)).rjust(3)
                 + " kept=" + str(len(kept)).rjust(3))
        time.sleep(config.X_TOKEN_BUCKET_DELAY_S)

    unrun = [q for q in config.X_QUERIES if q not in completed]
    report = {
        "queries_total": len(config.X_QUERIES),
        "queries_run": len(config.X_QUERIES) - len(unrun),
        "queries_unrun": unrun,
        "requests_made": requests_made,
        "stopped_reason": stopped_reason,
        "units": len(units),
    }
    return units, report
