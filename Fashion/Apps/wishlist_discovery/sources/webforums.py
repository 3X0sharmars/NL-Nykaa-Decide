# -*- coding: utf-8 -*-
"""
Bucket 3: product reviews / Q&A / other public forums.

MEASURED REACHABILITY AS AT 2026-08-22
--------------------------------------
Blocked (HTTP 403 to any non-browser client):
    mouthshut.com          -- Indian consumer review site
    trustpilot.com
    quora.com              -- where much of this discussion actually lives

Reachable but DRY (fetched and text-searched; zero wishlist mentions):
    sitejabber.com         -- reviews of myntra.com etc.
    complaintsboard.com
    consumercomplaints.in
    These sites are dominated by delivery, refund and counterfeit complaints.
    Wishlist non-conversion is not the kind of grievance people take to a
    complaints board, which is itself an informative null result.

Deliberately NOT included:
    Medium/UX case-study articles about wishlist design. A behaviour-anchored
    web search surfaces these in volume, but they are secondary analysis
    written by designers and PMs -- not first-person user commentary about
    their own non-conversion. Including them would be padding the corpus with
    the wrong evidence type (spec 7.1, 7.2).

This module still runs the attempt against the reachable sites and logs the
result -- including zeros -- so the query log proves the well was tried.
"""

import time

import requests
from bs4 import BeautifulSoup

import config
import util

UA = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                  "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
}

# Public listing pages that were confirmed to return HTTP 200.
FORUM_TARGETS = [
    ("sitejabber", "Myntra", "https://www.sitejabber.com/reviews/myntra.com"),
    ("sitejabber", "AJIO", "https://www.sitejabber.com/reviews/ajio.com"),
    ("sitejabber", "Nykaa Fashion", "https://www.sitejabber.com/reviews/nykaafashion.com"),
    ("complaintsboard", "Myntra", "https://www.complaintsboard.com/myntra-b123166"),
    ("consumercomplaints", "Myntra", "https://www.consumercomplaints.in/myntra-b100327"),
    ("consumercomplaints", "AJIO", "https://www.consumercomplaints.in/ajio-b105452"),
    ("consumercomplaints", "Nykaa", "https://www.consumercomplaints.in/nykaa-b104969"),
]

# Tags that typically wrap a single user's review/complaint body.
TEXT_BLOCK_SELECTORS = ["p", "div.review-content", "div.complaint-text", "article"]

MIN_BLOCK_CHARS = 60
MAX_BLOCK_CHARS = 6000


def _extract_blocks(html: str):
    """Pull candidate user-text blocks out of a page, generically."""
    soup = BeautifulSoup(html, "lxml")
    for tag in soup(["script", "style", "nav", "header", "footer"]):
        tag.decompose()

    blocks = []
    seen = set()
    for sel in TEXT_BLOCK_SELECTORS:
        for node in soup.select(sel):
            txt = node.get_text(" ", strip=True)
            if MIN_BLOCK_CHARS <= len(txt) <= MAX_BLOCK_CHARS and txt not in seen:
                seen.add(txt)
                blocks.append(txt)
    return blocks


def retrieve(query_log, sleep=1.5):
    units = []

    for site, brand, url in FORUM_TARGETS:
        try:
            resp = requests.get(url, headers=UA, timeout=30)
        except Exception as exc:
            util.log("  ! " + site + " (" + brand + ") network error: "
                     + exc.__class__.__name__)
            query_log.record(
                query_string="behaviour-anchored scan of public review page",
                source="forum", raw_results_returned=0, units_retained=0,
                method="HTTP GET + local behaviour-anchored regex filter",
                notes=site + " / " + brand + " / NETWORK ERROR "
                      + exc.__class__.__name__ + " / " + url,
            )
            continue

        if resp.status_code != 200:
            util.log("  ! " + site + " (" + brand + ") HTTP " + str(resp.status_code))
            query_log.record(
                query_string="behaviour-anchored scan of public review page",
                source="forum", raw_results_returned=0, units_retained=0,
                method="HTTP GET + local behaviour-anchored regex filter",
                notes=site + " / " + brand + " / BLOCKED HTTP "
                      + str(resp.status_code) + " / " + url,
            )
            time.sleep(sleep)
            continue

        blocks = _extract_blocks(resp.text)
        kept = 0
        for txt in blocks:
            text = util.clean_text(txt)
            hits = util.matched_behaviour_patterns(text)
            if not hits:
                continue
            units.append({
                "unit_id": util.make_unit_id("forum", text, url),
                "source": "forum",
                "source_detail": site + " / " + brand,
                "url": url,
                "retrieved_at": util.now_iso(),
                "text": text,
                "platform_mentioned": util.tag_platform(text),
                "query_matched": "; ".join(hits),
            })
            kept += 1

        query_log.record(
            query_string="behaviour-anchored scan of public review page",
            source="forum",
            raw_results_returned=len(blocks),
            units_retained=kept,
            method="HTTP GET + local behaviour-anchored regex filter",
            notes=site + " / " + brand + " / " + url,
        )
        util.log("  " + site + " (" + brand + "): " + str(len(blocks))
                 + " text blocks scanned, " + str(kept) + " retained")
        time.sleep(sleep)

    return units
