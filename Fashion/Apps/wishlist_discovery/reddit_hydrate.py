# -*- coding: utf-8 -*-
"""
Turn the reddit_discovery LEADS into real evidence, via Reddit's official API.

    python reddit_hydrate.py --dry-run        # show what would be fetched
    python reddit_hydrate.py                  # hydrate submissions
    python reddit_hydrate.py --with-comments  # also pull comment threads

WHY THIS EXISTS
---------------
`reddit_discovery/` produced 415 Reddit URLs, but its rows carry only a search
engine's `snippet` -- median 144 characters, 72% ellipsis-truncated. A snippet
is a third party's summary, not the author's words, so it cannot be an evidence
unit: `supporting_quote` would be verified against text no human wrote.

Those URLs are still valuable. 408 carry an extractable submission id. This
module hydrates them through Reddit's OWN OAuth API, which returns verbatim
`selftext` and real comment bodies.

WHY COMMENTS MATTER MOST
------------------------
Measured on the current app-review corpus: median length 272 characters, max
529 (Google Play truncates at ~500), and only 7.1% of units contain two or more
temporal sequencing words. The genre structurally cannot carry a multi-step
journey, which is what codebook 4.3 ordering needs -- "the earliest gate at
which the path actually failed" is meaningless when only one beat is present.

Reddit comment replies are where sequenced narratives live: "I saved it, went
back twice, then my size was gone, so I got it on Myntra instead." That is a
four-beat journey with a determinable earliest failure. Submissions alone are
better than app reviews; comments are better still.

PROVENANCE NOTE, recorded honestly
----------------------------------
The URL list was DISCOVERED via SerpApi queries carrying `site:reddit.com`,
which the PM had previously prohibited. Hydration here goes through Reddit's
sanctioned OAuth API, so the EVIDENCE text never passes through SerpApi -- but
the lead list did. That distinction is recorded in the output, not hidden. To
avoid it entirely, use sources/reddit.py with backend=official_api, which does
discovery and retrieval through Reddit alone.

Output is written to a STAGING file. Nothing enters corpus_raw.csv until the
mandatory >=70% relevance audit has been run on it.
"""

import argparse
import csv
import json
import os
import re
import sys
import time

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import requests

import config
import util

LEADS_CSV = os.path.join(
    os.path.dirname(os.path.dirname(os.path.abspath(__file__))),
    "reddit_discovery", "outputs", "reddit_results.csv")
STAGING_CSV = os.path.join(config.ARTEFACTS_DIR, "reddit_hydrated_STAGING.csv")

OAUTH_TOKEN_URL = "https://www.reddit.com/api/v1/access_token"
API = "https://oauth.reddit.com"

MIN_TEXT_CHARS = 40          # below this there is nothing to code
MAX_COMMENTS_PER_POST = 25


class RedditAuthError(RuntimeError):
    pass


def get_token():
    cid = os.environ.get("REDDIT_CLIENT_ID", "").strip()
    secret = os.environ.get("REDDIT_CLIENT_SECRET", "").strip()
    ua = os.environ.get("REDDIT_USER_AGENT",
                        "wishlist-research:v1.0 (academic)").strip()
    if not cid or not secret:
        raise RedditAuthError(
            "REDDIT_CLIENT_ID / REDDIT_CLIENT_SECRET are not set.\n\n"
            "Get them free in about two minutes:\n"
            "  1. https://www.reddit.com/prefs/apps  ->  'create another app'\n"
            "  2. Choose type: script\n"
            "  3. redirect uri: http://localhost:8080  (unused, but required)\n"
            "  4. The id under the app name is REDDIT_CLIENT_ID;\n"
            "     'secret' is REDDIT_CLIENT_SECRET\n"
            "  5. Put both in .env\n\n"
            "This is Reddit's sanctioned route. No scraping, no evasion.")
    r = requests.post(OAUTH_TOKEN_URL, auth=(cid, secret),
                      data={"grant_type": "client_credentials"},
                      headers={"User-Agent": ua}, timeout=30)
    if r.status_code != 200:
        raise RedditAuthError("token request failed HTTP " + str(r.status_code)
                              + ": " + r.text[:200])
    return r.json()["access_token"], ua


def load_lead_ids():
    if not os.path.exists(LEADS_CSV):
        sys.exit("ERROR: leads not found at " + LEADS_CSV)
    with open(LEADS_CSV, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    seen, leads = set(), []
    for r in rows:
        m = re.search(r"/comments/([a-z0-9]+)/", r["url"])
        if not m:
            continue
        sid = m.group(1)
        if sid in seen:
            continue
        seen.add(sid)
        leads.append({"id": sid, "url": r["url"], "query": r.get("query", ""),
                      "company": r.get("company", "")})
    return leads


def fetch_submissions(ids, token, ua, sleep=1.1):
    """/api/info accepts up to 100 fullnames per call."""
    out = []
    headers = {"Authorization": "Bearer " + token, "User-Agent": ua}
    for i in range(0, len(ids), 100):
        chunk = ids[i:i + 100]
        names = ",".join("t3_" + x for x in chunk)
        try:
            r = requests.get(API + "/api/info", headers=headers,
                             params={"id": names}, timeout=40)
        except Exception as exc:
            util.log("  ! network error: " + exc.__class__.__name__)
            continue
        if r.status_code != 200:
            util.log("  ! /api/info HTTP " + str(r.status_code)
                     + " " + r.text[:120])
            if r.status_code == 429:
                time.sleep(30)
            continue
        for c in r.json().get("data", {}).get("children", []):
            out.append(c.get("data", {}))
        util.log("  submissions " + str(min(i + 100, len(ids))) + "/" + str(len(ids)))
        time.sleep(sleep)
    return out


def fetch_comments(sub_id, token, ua, limit=MAX_COMMENTS_PER_POST):
    headers = {"Authorization": "Bearer " + token, "User-Agent": ua}
    try:
        r = requests.get(API + "/comments/" + sub_id, headers=headers,
                         params={"limit": limit, "depth": 2, "sort": "top"},
                         timeout=40)
    except Exception:
        return []
    if r.status_code != 200:
        return []
    try:
        listings = r.json()
    except Exception:
        return []
    if len(listings) < 2:
        return []

    out = []

    def walk(node):
        d = node.get("data", {})
        if node.get("kind") == "t1":
            body = d.get("body", "") or ""
            if body and body not in ("[removed]", "[deleted]"):
                out.append({"body": body, "id": d.get("id", ""),
                            "permalink": d.get("permalink", "")})
        replies = d.get("replies")
        if isinstance(replies, dict):
            for ch in replies.get("data", {}).get("children", []):
                walk(ch)

    for ch in listings[1].get("data", {}).get("children", []):
        walk(ch)
    return out[:limit]


def to_unit(text, url, kind, subreddit, query):
    text = util.clean_text(text)
    if len(text) < MIN_TEXT_CHARS:
        return None
    hits = util.matched_behaviour_patterns(text)
    if not hits:
        return None
    return {
        "unit_id": util.make_unit_id("reddit", text, url),
        "source": "reddit",
        "source_detail": "r/" + (subreddit or "?") + " (" + kind + ")",
        "url": url,
        "retrieved_at": util.now_iso(),
        "text": text,
        "platform_mentioned": util.tag_platform(text),
        "query_matched": query,
        "source_genre": "forum_thread",
        "vertical": config.tag_vertical(text, "", "reddit"),
        "lead_provenance": "url discovered via reddit_discovery (SerpApi "
                           "site:reddit.com); TEXT retrieved via Reddit "
                           "official OAuth API",
    }


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--with-comments", action="store_true")
    ap.add_argument("--max-posts", type=int, default=None)
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    leads = load_lead_ids()
    if args.max_posts:
        leads = leads[:args.max_posts]
    util.log("Leads with submission ids: " + str(len(leads)))

    if args.dry_run:
        print("")
        print("DRY RUN -- no API calls made.")
        print("  submissions to hydrate : " + str(len(leads)))
        print("  /api/info calls needed : "
              + str((len(leads) + 99) // 100) + "  (100 ids per call)")
        print("  comment calls if --with-comments : " + str(len(leads))
              + "  (1 per post, ~" + format(len(leads) * 1.1 / 60, ".0f")
              + " min at 1.1s spacing)")
        print("")
        print("  Reddit OAuth free tier is ~100 requests/minute, so this is")
        print("  comfortably within budget -- unlike the 20/day Gemini cap.")
        print("")
        print("  Output would be STAGED to:")
        print("    " + STAGING_CSV)
        print("  and would NOT enter corpus_raw.csv until the >=70% relevance")
        print("  audit has been run on it.")
        return

    try:
        token, ua = get_token()
    except RedditAuthError as exc:
        sys.exit("\nCANNOT HYDRATE\n\n" + str(exc) + "\n")

    util.log("Authenticated. Fetching submissions...")
    subs = fetch_submissions([l["id"] for l in leads], token, ua)
    util.log("Got " + str(len(subs)) + " submissions")

    qby = {l["id"]: l["query"] for l in leads}
    units = []
    for d in subs:
        sid = d.get("id", "")
        title = d.get("title", "") or ""
        body = d.get("selftext", "") or ""
        url = "https://www.reddit.com" + (d.get("permalink", "") or "")
        u = to_unit((title + "\n\n" + body).strip(), url, "submission",
                    d.get("subreddit", ""), qby.get(sid, ""))
        if u:
            units.append(u)
    util.log("Submissions passing behaviour filter: " + str(len(units)))

    if args.with_comments:
        util.log("Fetching comment threads (this is where journeys live)...")
        for n, d in enumerate(subs, 1):
            sid = d.get("id", "")
            if not sid:
                continue
            for c in fetch_comments(sid, token, ua):
                curl = ("https://www.reddit.com" + c["permalink"]
                        if c.get("permalink") else
                        "https://www.reddit.com/comments/" + sid)
                u = to_unit(c["body"], curl, "comment",
                            d.get("subreddit", ""), qby.get(sid, ""))
                if u:
                    units.append(u)
            if n % 25 == 0:
                util.log("  " + str(n) + "/" + str(len(subs)) + " posts, "
                         + str(len(units)) + " units so far")
            time.sleep(1.1)

    kept, n_exact, n_near = util.deduplicate(units)
    util.log("Dedup: removed " + str(n_exact) + " exact, " + str(n_near) + " near")

    cols = util.CORPUS_FIELDS + ["source_genre", "vertical", "lead_provenance"]
    with open(STAGING_CSV, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        w.writerows(kept)

    from collections import Counter
    L = sorted(len(r["text"]) for r in kept) or [0]
    SEQ = re.compile(r"\b(then|after|later|came back|went back|eventually|"
                     r"finally|weeks? later|months? later)\b", re.I)
    multi = sum(1 for r in kept if len(SEQ.findall(r["text"])) >= 2)

    print("")
    print("STAGED " + str(len(kept)) + " units -> " + STAGING_CSV)
    print("  by kind    : " + str(dict(Counter(
        r["source_detail"].split("(")[-1].rstrip(")") for r in kept))))
    print("  by vertical: " + str(dict(Counter(r["vertical"] for r in kept))))
    print("  text length: median " + str(L[len(L) // 2]) + "  max " + str(L[-1])
          + "   (app-review corpus median was 272, max 529)")
    print("  multi-step journeys (2+ sequencing words): " + str(multi)
          + " (" + format(100.0 * multi / max(len(kept), 1), ".1f")
          + "%)   app reviews were 7.1%")
    print("")
    print("NOT added to corpus_raw.csv. Run the relevance audit first;")
    print("below 70% precision this material does not enter the corpus.")


if __name__ == "__main__":
    main()
