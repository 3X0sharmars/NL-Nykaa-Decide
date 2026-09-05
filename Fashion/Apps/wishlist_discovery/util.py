# -*- coding: utf-8 -*-
"""
Shared plumbing: stable unit IDs, the query log, deduplication, and safe IO.

Everything here is deliberately boring and inspectable. Every artefact is
written as UTF-8 with a BOM (utf-8-sig) so it opens correctly in Excel on
Windows -- the PM hand-codes the validation set in a spreadsheet.
"""

import csv
import hashlib
import os
import re
import unicodedata
from datetime import datetime, timezone

import config
from config import tag_platform  # re-exported so sources can call util.tag_platform

CORPUS_FIELDS = [
    "unit_id",
    "source",
    "source_detail",
    "url",
    "retrieved_at",
    "text",
    "platform_mentioned",
    "query_matched",
]

QUERY_LOG_FIELDS = [
    "query_string",
    "source",
    "timestamp",
    "raw_results_returned",
    "units_retained",
    "method",
    "notes",
]


def now_iso() -> str:
    return datetime.now(timezone.utc).isoformat(timespec="seconds")


def ensure_dirs() -> None:
    os.makedirs(config.ARTEFACTS_DIR, exist_ok=True)
    os.makedirs(config.RAW_DIR, exist_ok=True)


def make_unit_id(source: str, text: str, url: str = "") -> str:
    """
    Stable, content-derived ID. Re-running retrieval gives the same unit the
    same ID, so the PM's hand-coded labels stay joinable to the corpus.
    """
    basis = (source + "|" + (url or "") + "|" + normalise_text(text)).encode("utf-8")
    return source[:4].lower() + "_" + hashlib.sha1(basis).hexdigest()[:12]


def normalise_text(text: str) -> str:
    """Lowercase, strip accents/punctuation, collapse whitespace. Dedup basis only."""
    if not text:
        return ""
    t = unicodedata.normalize("NFKD", text)
    t = "".join(c for c in t if not unicodedata.combining(c))
    t = t.lower()
    t = re.sub(r"[^a-z0-9\s]", " ", t)
    t = re.sub(r"\s+", " ", t).strip()
    return t


def clean_text(text: str) -> str:
    """Light cleaning of the VERBATIM text we store. Never paraphrases."""
    if not text:
        return ""
    t = text.replace("\r\n", "\n").replace("\r", "\n")
    t = re.sub(r"[ \t]+", " ", t)
    t = re.sub(r"\n{3,}", "\n\n", t)
    return t.strip()


class QueryLog:
    """
    Records EVERY query actually executed (spec 3.2). This is an audit artefact:
    a reviewer must be able to see exactly how the corpus was built, including
    the queries that returned nothing.
    """

    def __init__(self):
        self.rows = []

    def record(self, query_string, source, raw_results_returned,
               units_retained, method="", notes=""):
        self.rows.append({
            "query_string": query_string,
            "source": source,
            "timestamp": now_iso(),
            "raw_results_returned": raw_results_returned,
            "units_retained": units_retained,
            "method": method,
            "notes": notes,
        })

    def write(self, path=None):
        path = path or config.QUERY_LOG_CSV
        ensure_dirs()
        with open(path, "w", newline="", encoding="utf-8-sig") as f:
            w = csv.DictWriter(f, fieldnames=QUERY_LOG_FIELDS)
            w.writeheader()
            w.writerows(self.rows)
        return path

    def total_raw(self):
        return sum(int(r["raw_results_returned"] or 0) for r in self.rows)


def _token_set(norm_text: str):
    return set(norm_text.split())


def deduplicate(units, near_dup_threshold: float = 0.90):
    """
    Two-stage dedup (spec 3.5: "Deduplicate on near-identical text").

    Stage 1 -- exact match on normalised text.
    Stage 2 -- near-duplicate via Jaccard overlap of token sets, compared only
               against units already kept. Short texts (< 6 tokens) skip stage 2:
               "Saved it but didn't buy" and "Saved it but never bought" are
               genuinely different units from different people, not duplicates.

    Returns (kept_units, n_exact_removed, n_near_removed).
    """
    kept = []
    kept_tokens = []
    seen_exact = set()
    n_exact = 0
    n_near = 0

    for u in units:
        norm = normalise_text(u["text"])
        if not norm:
            continue
        if norm in seen_exact:
            n_exact += 1
            continue

        toks = _token_set(norm)
        if len(toks) >= 6:
            is_near = False
            for kt in kept_tokens:
                inter = len(toks & kt)
                if not inter:
                    continue
                union = len(toks | kt)
                if union and inter / union >= near_dup_threshold:
                    is_near = True
                    break
            if is_near:
                n_near += 1
                continue

        seen_exact.add(norm)
        kept.append(u)
        kept_tokens.append(toks)

    return kept, n_exact, n_near


def write_corpus(units, path=None):
    path = path or config.CORPUS_CSV
    ensure_dirs()
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=CORPUS_FIELDS, extrasaction="ignore")
        w.writeheader()
        w.writerows(units)
    return path


def matched_behaviour_patterns(text: str):
    """Which behaviour-anchored patterns this text matches. Empty list = no match."""
    if not text:
        return []
    return [name for name, rx in config.BEHAVIOUR_FILTER_RE.items() if rx.search(text)]


def log(msg: str) -> None:
    print("[" + datetime.now().strftime("%H:%M:%S") + "] " + msg, flush=True)
