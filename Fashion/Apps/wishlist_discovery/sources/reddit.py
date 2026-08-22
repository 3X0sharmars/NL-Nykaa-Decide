# -*- coding: utf-8 -*-
"""
Reddit retrieval.

RETRIEVAL DESIGN (PM directive, 2026-08-22)
-------------------------------------------
1. Subreddit-scoped search across a fixed 12-subreddit list, rather than
   site-wide only. Raises precision and makes the sampling frame explicit.
2. Site-wide queries carry a fashion/platform domain anchor, so bare
   "wishlist" does not drag in Steam sales and gift registries.
3. COMMENTS are searched as well as submissions. First-person non-conversion
   narratives live disproportionately in comment replies.
4. The subreddit list is itself a bias source and is recorded in
   artefacts/bias_register.md.

BACKEND STATUS AS AT 2026-08-22
-------------------------------
Every route was measured in this environment, not assumed:

    www.reddit.com/search.json           -> HTTP 403 (bot wall)
    www.reddit.com/r/<sub>/search.json   -> HTTP 403 (bot wall)
    old.reddit.com/search.json           -> HTTP 200 but HTML interstitial
    oauth.reddit.com (no token)          -> HTTP 403 (expected)
    descriptive / script User-Agent      -> still HTTP 403
    api.pullpush.io submission + comment -> HTTP 429, body:
        "This website does not provide free scraping resources for agents.
         Please contact the administrator on Discord if you're interested in
         a paid scraping service."

That pullpush response is a categorical refusal of automated agent traffic by
the operator, not a transient rate limit. This module therefore does NOT
attempt to evade it -- no User-Agent rotation, no proxy pool, no slow-rolling
under a threshold. Evading a stated access control would also stamp every
Reddit row in the corpus with scraped-against-refusal provenance, inside an
audit trail built to survive a reviewer.

CAPABILITY CONSTRAINT ON COMMENTS
---------------------------------
Reddit's official API /search accepts type=link, sr, user. There is NO comment
search. Comment retrieval is a Pushshift-family capability only. So directive
item 3 is achievable ONLY via a Pushshift mirror:

    backend=official_api  -> submissions yes, comments NO  (sanctioned)
    backend=pullpush      -> submissions yes, comments yes (refusing agents)

The comment-search code path is implemented and ready. It is not reachable
until a backend that supports it becomes available. That gap is reported, not
silently dropped.

BACKENDS
--------
  official_api  Reddit's sanctioned OAuth API. Free 'script' app at
                https://www.reddit.com/prefs/apps, credentials in .env.
  pullpush      Pushshift mirror. Supports comments. Currently refusing agents;
                requires require_ack=True so it can never be used by accident.
  public_json   The spec's original route. Retained for re-testing; 403 today.
"""

import os
import time

import requests

import config
import util


class RedditBlocked(RuntimeError):
    """Raised when Reddit cannot be retrieved by the selected backend."""


BROWSER_UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

# Which backends can return comments at all.
BACKEND_SUPPORTS_COMMENTS = {
    "public_json": False,
    "official_api": False,   # Reddit /search has no type=comment
    "pullpush": True,
}


# ---------------------------------------------------------------------------
# Backend: public JSON (the spec's original route; currently 403)
# ---------------------------------------------------------------------------
def _search_public_json(query, subreddit=None, kind="submission", limit=100):
    if kind == "comment":
        raise RedditBlocked("public_json backend cannot search comments.")
    if subreddit:
        url = "https://www.reddit.com/r/" + subreddit + "/search.json"
        params = {"q": query, "restrict_sr": 1, "limit": limit, "sort": "relevance"}
    else:
        url = "https://www.reddit.com/search.json"
        params = {"q": query, "limit": limit, "sort": "relevance"}

    resp = requests.get(url, headers=BROWSER_UA, params=params, timeout=30)
    if resp.status_code != 200:
        raise RedditBlocked(
            "Reddit public JSON returned HTTP " + str(resp.status_code)
            + " for " + repr(query) + ". The endpoint is bot-walled here.")
    if "json" not in resp.headers.get("content-type", ""):
        raise RedditBlocked(
            "Reddit public JSON returned an HTML interstitial, not JSON, for "
            + repr(query) + ".")
    return [c.get("data", {}) for c in resp.json().get("data", {}).get("children", [])]


# ---------------------------------------------------------------------------
# Backend: official OAuth API (sanctioned; submissions only)
# ---------------------------------------------------------------------------
_token_cache = {"token": None, "expires": 0}


def _oauth_token():
    cid = os.environ.get("REDDIT_CLIENT_ID", "").strip()
    secret = os.environ.get("REDDIT_CLIENT_SECRET", "").strip()
    ua = os.environ.get("REDDIT_USER_AGENT", "wishlist-research:v1.0").strip()
    if not cid or not secret:
        raise RedditBlocked(
            "backend='official_api' needs REDDIT_CLIENT_ID and "
            "REDDIT_CLIENT_SECRET in .env. Create a free 'script' app at "
            "https://www.reddit.com/prefs/apps")
    if _token_cache["token"] and time.time() < _token_cache["expires"] - 60:
        return _token_cache["token"], ua

    resp = requests.post(
        "https://www.reddit.com/api/v1/access_token",
        auth=(cid, secret),
        data={"grant_type": "client_credentials"},
        headers={"User-Agent": ua},
        timeout=30,
    )
    if resp.status_code != 200:
        raise RedditBlocked("Reddit OAuth token request failed: HTTP "
                            + str(resp.status_code) + " " + resp.text[:200])
    j = resp.json()
    _token_cache["token"] = j["access_token"]
    _token_cache["expires"] = time.time() + int(j.get("expires_in", 3600))
    return _token_cache["token"], ua


def _search_official(query, subreddit=None, kind="submission", limit=100):
    if kind == "comment":
        raise RedditBlocked(
            "Reddit's official API has no comment search (type accepts "
            "link, sr, user only). Comment retrieval needs a Pushshift-family "
            "backend.")
    token, ua = _oauth_token()
    headers = {"Authorization": "Bearer " + token, "User-Agent": ua}
    if subreddit:
        url = "https://oauth.reddit.com/r/" + subreddit + "/search"
        params = {"q": query, "restrict_sr": 1, "limit": limit,
                  "sort": "relevance", "type": "link"}
    else:
        url = "https://oauth.reddit.com/search"
        params = {"q": query, "limit": limit, "sort": "relevance", "type": "link"}

    resp = requests.get(url, headers=headers, params=params, timeout=30)
    if resp.status_code == 429:
        raise RedditBlocked("Reddit OAuth rate limit (429). Slow down or resume later.")
    if resp.status_code != 200:
        raise RedditBlocked("Reddit OAuth search returned HTTP "
                            + str(resp.status_code) + " for " + repr(query))
    return [c.get("data", {}) for c in resp.json().get("data", {}).get("children", [])]


# ---------------------------------------------------------------------------
# Backend: pullpush (Pushshift mirror -- supports comments; refusing agents)
# ---------------------------------------------------------------------------
PULLPUSH_ACKNOWLEDGED = False   # flipped only by an explicit require_ack=True


def _search_pullpush(query, subreddit=None, kind="submission", limit=100):
    if not PULLPUSH_ACKNOWLEDGED:
        raise RedditBlocked(
            "pullpush backend is not acknowledged. Its API returns HTTP 429 with "
            "'This website does not provide free scraping resources for agents', "
            "which is the operator categorically refusing automated traffic. "
            "Enable only with an explicit decision (--reddit-backend pullpush "
            "--ack-pullpush), and be aware the corpus provenance then records "
            "retrieval against a stated refusal.")

    endpoint = "comment" if kind == "comment" else "submission"
    url = "https://api.pullpush.io/reddit/search/" + endpoint + "/"
    params = {"q": query, "size": min(limit, 100)}
    if subreddit:
        params["subreddit"] = subreddit

    resp = requests.get(url, headers=BROWSER_UA, params=params, timeout=40)
    if resp.status_code == 429:
        raise RedditBlocked(
            "pullpush returned HTTP 429: " + resp.text[:200]
            + " -- not retried and not evaded.")
    if resp.status_code != 200:
        raise RedditBlocked("pullpush returned HTTP " + str(resp.status_code))
    return resp.json().get("data", []) or []


BACKENDS = {
    "public_json": _search_public_json,
    "official_api": _search_official,
    "pullpush": _search_pullpush,
}


# ---------------------------------------------------------------------------
# Normalisation
# ---------------------------------------------------------------------------
def _to_unit(d, query, subreddit_label, kind):
    """Build a corpus unit from either a submission or a comment record."""
    if kind == "comment":
        text = util.clean_text(d.get("body", "") or "")
        detail_kind = "comment"
    else:
        title = d.get("title", "") or ""
        body = d.get("selftext", "") or ""
        text = util.clean_text((title + "\n\n" + body).strip())
        detail_kind = "submission"

    if not text or text in ("[removed]", "[deleted]"):
        return None

    permalink = d.get("permalink", "") or ""
    if permalink.startswith("http"):
        url = permalink
    elif permalink:
        url = "https://www.reddit.com" + permalink
    else:
        url = d.get("url", "") or ""

    sub = d.get("subreddit") or subreddit_label or "reddit-wide"
    return {
        "unit_id": util.make_unit_id("reddit", text, url),
        "source": "reddit",
        "source_detail": "r/" + sub + " (" + detail_kind + ")",
        "url": url,
        "retrieved_at": util.now_iso(),
        "text": text,
        "platform_mentioned": util.tag_platform(text),
        "query_matched": query,
    }


def retrieve(query_log, backend="public_json", sleep=2.0, require_ack=False):
    """
    Execute the full Reddit retrieval design.

      subreddit-scoped : BEHAVIOUR_QUERIES x REDDIT_SUBREDDITS
      site-wide        : REDDIT_SITEWIDE_QUERIES (domain-anchored)
      each of the above x {submission, comment} where the backend supports it

    Raises RedditBlocked on first failure. This module never decides to
    substitute a source -- that decision belongs to the PM.
    """
    global PULLPUSH_ACKNOWLEDGED
    if backend not in BACKENDS:
        raise ValueError("unknown backend " + repr(backend))
    if backend == "pullpush" and require_ack:
        PULLPUSH_ACKNOWLEDGED = True

    search = BACKENDS[backend]
    supports_comments = BACKEND_SUPPORTS_COMMENTS.get(backend, False)
    kinds = ["submission"]
    if config.REDDIT_SEARCH_COMMENTS:
        if supports_comments:
            kinds.append("comment")
        else:
            query_log.record(
                query_string="(comment search)", source="reddit",
                raw_results_returned=0, units_retained=0,
                method="backend=" + backend,
                notes="COMMENT SEARCH UNAVAILABLE on this backend. Reddit's "
                      "official API /search supports type=link,sr,user only. "
                      "First-person narratives in comment replies are NOT "
                      "represented in this corpus. Stated limitation.")
            util.log("  ! comment search unavailable on backend=" + backend)

    units = []

    # --- pass 1: subreddit-scoped, behaviour queries -----------------------
    for query in config.BEHAVIOUR_QUERIES:
        for sub in config.REDDIT_SUBREDDITS:
            for kind in kinds:
                records = search(query, subreddit=sub, kind=kind)
                kept = 0
                for d in records:
                    u = _to_unit(d, query, sub, kind)
                    if u:
                        units.append(u)
                        kept += 1
                query_log.record(
                    query_string=query, source="reddit",
                    raw_results_returned=len(records), units_retained=kept,
                    method="backend=" + backend + " kind=" + kind + " subreddit-scoped",
                    notes="r/" + sub)
                time.sleep(sleep)

    # --- pass 2: site-wide, domain-anchored queries ------------------------
    for query in config.REDDIT_SITEWIDE_QUERIES:
        for kind in kinds:
            records = search(query, subreddit=None, kind=kind)
            kept = 0
            for d in records:
                u = _to_unit(d, query, None, kind)
                if u:
                    units.append(u)
                    kept += 1
            query_log.record(
                query_string=query, source="reddit",
                raw_results_returned=len(records), units_retained=kept,
                method="backend=" + backend + " kind=" + kind + " site-wide",
                notes="domain-anchored site-wide query")
            time.sleep(sleep)

    return units


def probe():
    """Diagnostic: what every Reddit route does right now. Never raises."""
    results = []
    probes = [
        ("www.reddit.com/search.json",
         "https://www.reddit.com/search.json?q=wishlist&limit=5"),
        ("old.reddit.com/search.json",
         "https://old.reddit.com/search.json?q=wishlist&limit=5"),
        ("r/IndianFashionAddicts search.json",
         "https://www.reddit.com/r/IndianFashionAddicts/search.json?q=wishlist&restrict_sr=1&limit=5"),
        ("pullpush submission",
         "https://api.pullpush.io/reddit/search/submission/?q=wishlist&subreddit=IndianFashionAddicts&size=5"),
        ("pullpush comment",
         "https://api.pullpush.io/reddit/search/comment/?q=wishlist&subreddit=IndianFashionAddicts&size=5"),
    ]
    for name, url in probes:
        try:
            r = requests.get(url, headers=BROWSER_UA, timeout=25)
            ctype = r.headers.get("content-type", "").split(";")[0]
            ok = r.status_code == 200 and "json" in ctype
            line = name + ": HTTP " + str(r.status_code) + " content-type=" + ctype
            if not ok:
                line += "  <-- BLOCKED"
                if r.status_code == 429:
                    line += "  " + r.text[:130]
            results.append(line)
        except Exception as exc:
            results.append(name + ": EXCEPTION " + exc.__class__.__name__)
        time.sleep(1.5)
    return results


if __name__ == "__main__":
    print("Reddit route probe:")
    for line in probe():
        print("  " + line)
    print("")
    print("Retrieval design:")
    print("  subreddits          : " + str(len(config.REDDIT_SUBREDDITS)))
    print("  behaviour queries   : " + str(len(config.BEHAVIOUR_QUERIES)))
    print("  site-wide queries   : " + str(len(config.REDDIT_SITEWIDE_QUERIES)))
    n_sub = len(config.BEHAVIOUR_QUERIES) * len(config.REDDIT_SUBREDDITS)
    print("  subreddit-scoped calls per kind : " + str(n_sub))
    print("  site-wide calls per kind        : " + str(len(config.REDDIT_SITEWIDE_QUERIES)))
