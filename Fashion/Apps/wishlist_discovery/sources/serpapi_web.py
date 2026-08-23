# -*- coding: utf-8 -*-
"""
MODULE B -- SerpApi general web retrieval (explicitly NOT Reddit).

TWO-STAGE, MANDATORY
--------------------
  Stage 1: SerpApi returns URLs.
  Stage 2: fetch each page and extract first-person comment/answer text.

SerpApi's own result snippets NEVER become evidence units. A snippet is a
search engine's summary, not a person's words, and treating one as evidence
would put fabricated-by-paraphrase text into the corpus. Snippets are carried
only as lead metadata.

A URL that cannot be fetched is a LEAD, NOT EVIDENCE. It is logged as unfetched
with its HTTP status and skipped. It never enters corpus_raw.csv.

REDDIT IS OUT OF SCOPE
----------------------
Reddit has an active legal complaint against SerpApi over data access. That
combination is kept out of this audit trail entirely, and the guard is enforced
at two independent layers:

  1. config.enforce_no_reddit() rejects any query that could route to Reddit,
     raising rather than silently rewriting it.
  2. _is_blocked_domain() refuses to fetch any reddit.com host in stage 2, no
     matter what the search engine returns.

Auth: set SERPAPI_KEY in .env.
"""

import os
import time
from urllib.parse import urlparse

import requests
from bs4 import BeautifulSoup

import config
import util

SERPAPI_URL = "https://serpapi.com/search"

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

# Selectors that tend to wrap first-person answers/comments on the target sites.
COMMENT_SELECTORS = [
    "div.q-text",              # Quora answers
    "div.CommentThread",
    "div.comment", "li.comment", "article.comment",
    "div.comment-body", "div.comment-content", "div.commenttext",
    "div.post-message", "div.message-body", "div.bbWrapper",  # forum software
    "p",
]

MIN_BLOCK_CHARS = 60
MAX_BLOCK_CHARS = 6000


class SerpApiAuthError(RuntimeError):
    pass


class SerpApiQuotaExhausted(RuntimeError):
    pass


def _api_key():
    key = (os.environ.get("SERPAPI_KEY")
           or os.environ.get("SERPAPI_API_KEY") or "").strip()
    if not key:
        raise SerpApiAuthError(
            "SERPAPI_KEY is not set. Add it to .env. Module B cannot run "
            "without it, and no substitute source will be used.")
    return key


def _is_blocked_domain(url: str) -> bool:
    """Second, independent Reddit guard -- applied to every URL before fetching."""
    try:
        host = (urlparse(url).hostname or "").lower()
    except Exception:
        return True
    if host in config.BLOCKED_FETCH_DOMAINS:
        return True
    return host.endswith(".reddit.com") or host == "redd.it" or host.endswith(".redd.it")


# ---------------------------------------------------------------------------
# Stage 1 -- URLs from SerpApi
# ---------------------------------------------------------------------------
def search_urls(query, key):
    config.enforce_no_reddit(query)   # raises rather than rewriting

    params = {
        "engine": config.SERPAPI_ENGINE,
        "q": query,
        "api_key": key,
        "num": config.SERPAPI_NUM_RESULTS,
        "gl": config.SERPAPI_GL,
        "hl": config.SERPAPI_HL,
        "location": config.SERPAPI_LOCATION,
    }
    resp = requests.get(SERPAPI_URL, params=params, timeout=40)

    if resp.status_code == 401:
        raise SerpApiAuthError("SerpApi rejected the key (401).")
    if resp.status_code == 429:
        raise SerpApiQuotaExhausted("SerpApi quota exhausted (429).")
    if resp.status_code != 200:
        raise RuntimeError("SerpApi HTTP " + str(resp.status_code) + ": "
                           + resp.text[:200])

    payload = resp.json()
    if "error" in payload:
        raise RuntimeError("SerpApi error: " + str(payload["error"])[:200])

    results = []
    for r in payload.get("organic_results", []) or []:
        link = r.get("link") or ""
        if not link or _is_blocked_domain(link):
            continue
        results.append({
            "url": link,
            # snippet is LEAD METADATA ONLY -- never promoted to evidence
            "snippet": r.get("snippet", "") or "",
            "title": r.get("title", "") or "",
        })
    return results


# ---------------------------------------------------------------------------
# Stage 2 -- fetch the page and extract first-person text
# ---------------------------------------------------------------------------
def fetch_and_extract(url):
    """
    Returns (blocks, status). status is 'ok' or a reason string.
    A failure yields ([], reason) and the URL is logged as an unfetched lead.
    """
    if _is_blocked_domain(url):
        return [], "blocked_domain_reddit"
    try:
        resp = requests.get(url, headers=UA,
                            timeout=config.SERPAPI_FETCH_TIMEOUT_S)
    except Exception as exc:
        return [], "fetch_error_" + exc.__class__.__name__
    if resp.status_code != 200:
        return [], "http_" + str(resp.status_code)

    ctype = resp.headers.get("content-type", "")
    if "html" not in ctype:
        return [], "non_html_" + ctype.split(";")[0]

    soup = BeautifulSoup(resp.text, "lxml")
    for tag in soup(["script", "style", "nav", "header", "footer", "aside"]):
        tag.decompose()

    blocks, seen = [], set()
    for sel in COMMENT_SELECTORS:
        for node in soup.select(sel):
            txt = node.get_text(" ", strip=True)
            if MIN_BLOCK_CHARS <= len(txt) <= MAX_BLOCK_CHARS and txt not in seen:
                seen.add(txt)
                blocks.append(txt)
    return blocks, "ok"


def retrieve(query_log, max_requests=None):
    """
    Returns (units, report_dict). Stops cleanly on quota exhaustion.
    """
    key = _api_key()   # raises loudly if absent
    max_requests = max_requests or config.SERPAPI_MAX_REQUESTS_TOTAL

    units = []
    unfetched_leads = []
    requests_made = 0
    stopped_reason = None
    completed = []

    for query in config.SERPAPI_QUERIES:
        if requests_made >= max_requests:
            stopped_reason = "request ceiling reached (" + str(max_requests) + ")"
            break

        try:
            results = search_urls(query, key)
            requests_made += 1
        except SerpApiQuotaExhausted as exc:
            stopped_reason = "quota exhausted: " + str(exc)[:160]
            util.log("  !! " + stopped_reason)
            break
        except SerpApiAuthError:
            raise
        except ValueError as exc:          # enforce_no_reddit refusal
            util.log("  !! REFUSED query: " + str(exc))
            query_log.record(query_string=query, source="serpapi_web",
                             raw_results_returned=0, units_retained=0,
                             method="SerpApi stage 1",
                             notes="REFUSED -- " + str(exc)[:160])
            continue
        except Exception as exc:
            util.log("  ! stage-1 error on " + repr(query) + ": "
                     + exc.__class__.__name__)
            query_log.record(query_string=query, source="serpapi_web",
                             raw_results_returned=0, units_retained=0,
                             method="SerpApi stage 1",
                             notes="ERROR " + exc.__class__.__name__)
            requests_made += 1
            continue

        kept_for_query = 0
        for r in results:
            blocks, status = fetch_and_extract(r["url"])
            if status != "ok":
                unfetched_leads.append({"url": r["url"], "status": status,
                                        "query": query})
                time.sleep(config.SERPAPI_FETCH_DELAY_S)
                continue

            for txt in blocks:
                text = util.clean_text(txt)
                hits = util.matched_behaviour_patterns(text)
                if not hits:
                    continue
                units.append({
                    "unit_id": util.make_unit_id("serpapi_web", text, r["url"]),
                    "source": "serpapi_web",
                    "source_detail": (urlparse(r["url"]).hostname or "web"),
                    "url": r["url"],
                    "retrieved_at": util.now_iso(),
                    "text": text,
                    "platform_mentioned": util.tag_platform(text),
                    "query_matched": query,
                    "source_genre": "forum_thread",
                    "vertical": config.tag_vertical(text, "", "serpapi_web"),
                })
                kept_for_query += 1
            time.sleep(config.SERPAPI_FETCH_DELAY_S)

        completed.append(query)
        query_log.record(
            query_string=query, source="serpapi_web",
            raw_results_returned=len(results), units_retained=kept_for_query,
            method="SerpApi stage 1 (URLs) + stage 2 (page fetch + extract)",
            notes="snippets NEVER used as evidence; unfetchable URLs logged as "
                  "leads; reddit excluded at query and fetch layers")
        util.log("  " + query[:44].ljust(46) + " urls=" + str(len(results)).rjust(3)
                 + " units=" + str(kept_for_query).rjust(3))
        time.sleep(config.SERPAPI_DELAY_S)

    # Unfetched leads are an artefact in their own right.
    if unfetched_leads:
        path = os.path.join(config.ARTEFACTS_DIR, "serpapi_unfetched_leads.csv")
        import csv as _csv
        with open(path, "w", newline="", encoding="utf-8-sig") as f:
            w = _csv.DictWriter(f, fieldnames=["url", "status", "query"])
            w.writeheader()
            w.writerows(unfetched_leads)
        util.log("  WROTE " + path + " (" + str(len(unfetched_leads)) + " leads)")

    unrun = [q for q in config.SERPAPI_QUERIES if q not in completed]
    report = {
        "queries_total": len(config.SERPAPI_QUERIES),
        "queries_run": len(completed),
        "queries_unrun": unrun,
        "requests_made": requests_made,
        "stopped_reason": stopped_reason,
        "units": len(units),
        "unfetched_leads": len(unfetched_leads),
    }
    return units, report
