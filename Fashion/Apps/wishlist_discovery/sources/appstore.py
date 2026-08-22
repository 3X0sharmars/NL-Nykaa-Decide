# -*- coding: utf-8 -*-
"""
Apple App Store reviews (Myntra, AJIO, Nykaa Fashion -- Indian storefront).

SOURCE NOTE (spec 7.4 -- no silent substitution):
The spec suggested the `app-store-scraper` package. That package is not
installed in this environment and is an unofficial third-party wrapper. This
module instead calls Apple's own public customer-reviews RSS endpoint:

    https://itunes.apple.com/in/rss/customerreviews/page=N/id=<id>/sortby=mostrecent/json

This is the SAME SOURCE (the Indian App Store), reached by Apple's first-party
public endpoint rather than a third-party wrapper -- a library change, not a
data-source change. It is called out here and in retrieval_report.md so the
choice is visible to a reviewer rather than buried.

HARD CEILING: Apple's RSS caps at page=10, i.e. ~500 most-recent reviews per
app per storefront. There is no way to page deeper and no server-side search.
That ceiling is the binding constraint on this source, and it is reported.
"""

import time

import requests

import config
import util

UA = {"User-Agent": "Mozilla/5.0 (compatible; academic-research/1.0)"}
RSS = ("https://itunes.apple.com/{country}/rss/customerreviews/"
       "page={page}/id={app_id}/sortby=mostrecent/json")


def _fetch_page(app_id: int, page: int, attempts: int = 4):
    """
    Fetch one RSS page with exponential backoff.

    Apple throttles this endpoint silently: under a fast request cadence it
    returns HTTP 200 with an EMPTY feed rather than a 429. A previous run read
    those empty feeds as "no more reviews" and recorded zero units for two apps
    that demonstrably have thousands. So an empty page is treated as a retryable
    throttle signal, not as end-of-data.
    """
    url = RSS.format(country=config.APPSTORE_COUNTRY, page=page, app_id=app_id)
    for attempt in range(1, attempts + 1):
        try:
            resp = requests.get(url, headers=UA, timeout=30)
        except Exception as exc:
            util.log("  ! network error id=" + str(app_id) + " p" + str(page)
                     + " attempt " + str(attempt) + ": " + exc.__class__.__name__)
            time.sleep(2 ** attempt)
            continue

        if resp.status_code != 200:
            util.log("  ! HTTP " + str(resp.status_code) + " id=" + str(app_id)
                     + " p" + str(page) + " attempt " + str(attempt))
            time.sleep(2 ** attempt)
            continue

        try:
            feed = resp.json().get("feed", {}) or {}
        except Exception:
            util.log("  ! non-JSON id=" + str(app_id) + " p" + str(page))
            time.sleep(2 ** attempt)
            continue

        batch = [e for e in (feed.get("entry", []) or [])
                 if "content" in e and "author" in e]
        if batch:
            return batch, True          # got data
        if attempt < attempts:
            time.sleep(2 ** attempt)    # empty: likely throttled, back off
    return [], False                    # exhausted retries


def _pull_app_reviews(app_id: int, max_pages: int, sleep: float = 1.2):
    entries = []
    for page in range(1, max_pages + 1):
        batch, ok = _fetch_page(app_id, page)
        if not ok:
            # Page 1 empty after retries means throttled or unavailable, which
            # is different from genuinely running out of pages further in.
            if page == 1:
                util.log("  !! id=" + str(app_id) + " returned nothing on page 1 "
                         "after retries -- treating as UNAVAILABLE, not as zero "
                         "reviews.")
            break
        entries.extend(batch)
        time.sleep(sleep)
    return entries


def retrieve(query_log, max_pages=None):
    max_pages = max_pages or config.APPSTORE_MAX_PAGES
    units = []

    for app_name, app_id in config.APPSTORE_APPS.items():
        util.log("App Store: " + app_name + " (id=" + str(app_id) + ") -- paging...")
        raw = _pull_app_reviews(app_id, max_pages)
        util.log("  scanned " + str(len(raw)) + " reviews")

        retained_by_pattern = {name: 0 for name in config.BEHAVIOUR_FILTER_RE}
        kept = 0

        for e in raw:
            title = (e.get("title", {}) or {}).get("label", "") or ""
            body = (e.get("content", {}) or {}).get("label", "") or ""
            text = util.clean_text((title + "\n" + body).strip())
            if not text:
                continue
            hits = util.matched_behaviour_patterns(text)
            if not hits:
                continue
            for h in hits:
                retained_by_pattern[h] += 1

            url = ((e.get("link", {}) or {}).get("attributes", {}) or {}).get("href", "")
            if not url:
                url = "https://apps.apple.com/in/app/id" + str(app_id)

            units.append({
                "unit_id": util.make_unit_id("appstore", text, url),
                "source": "appstore",
                "source_detail": app_name + " (iOS)",
                "url": url,
                "retrieved_at": util.now_iso(),
                "text": text,
                "platform_mentioned": util.tag_platform(text, default=app_name),
                "query_matched": "; ".join(hits),
            })
            kept += 1

        for pattern_name, n in retained_by_pattern.items():
            query_log.record(
                query_string=pattern_name,
                source="appstore",
                raw_results_returned=len(raw),
                units_retained=n,
                method="Apple first-party RSS customer-reviews endpoint "
                       "+ local behaviour-anchored regex filter",
                notes=app_name + " / id=" + str(app_id) + " / storefront=in / "
                      "Apple RSS hard-caps at page=10 (~500 reviews per app)",
            )

        util.log("  retained " + str(kept) + " behaviour-matched units")

    return units
