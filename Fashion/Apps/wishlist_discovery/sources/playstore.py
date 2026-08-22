# -*- coding: utf-8 -*-
"""
Google Play Store reviews (Myntra, AJIO, Nykaa Fashion -- India, English).

IMPORTANT LIMITATION, recorded honestly in the query log:
Play's review endpoint has NO server-side search. You cannot ask it for
"reviews mentioning wishlist". You can only page through reviews in bulk and
filter locally. So for this source the behaviour-anchored "query" is a local
regex filter, and `raw_results_returned` in the query log is the number of
reviews actually scanned -- not a number of search hits. The distinction
matters for anyone auditing how the corpus was built.
"""

import time

from google_play_scraper import reviews, Sort

import config
import util


def _pull_app_reviews(package: str, max_pages: int, sleep: float = 0.4):
    """Page through reviews until the endpoint stops issuing continuation tokens."""
    collected = []
    token = None
    for page in range(max_pages):
        try:
            batch, token = reviews(
                package,
                lang=config.PLAY_LANG,
                country=config.PLAY_COUNTRY,
                count=200,
                continuation_token=token,
                sort=Sort.NEWEST,
            )
        except Exception as exc:
            util.log("  ! Play API error on " + package + " page " + str(page)
                     + ": " + exc.__class__.__name__ + " " + str(exc))
            break
        if not batch:
            break
        collected.extend(batch)
        if token is None:
            break
        time.sleep(sleep)
    return collected


def retrieve(query_log, max_pages=None):
    """
    Returns a list of corpus units. Only reviews matching a behaviour-anchored
    pattern are retained; everything else is discarded, never padded.
    """
    max_pages = max_pages or config.PLAY_MAX_PAGES
    units = []

    for app_name, package in config.PLAY_APPS.items():
        util.log("Play Store: " + app_name + " (" + package + ") -- paging...")
        raw = _pull_app_reviews(package, max_pages)
        util.log("  scanned " + str(len(raw)) + " reviews")

        retained_by_pattern = {name: 0 for name in config.BEHAVIOUR_FILTER_RE}
        kept_this_app = 0

        for r in raw:
            text = util.clean_text(r.get("content") or "")
            if not text:
                continue
            hits = util.matched_behaviour_patterns(text)
            if not hits:
                continue

            for h in hits:
                retained_by_pattern[h] += 1

            review_id = r.get("reviewId") or ""
            url = ("https://play.google.com/store/apps/details?id=" + package
                   + "&reviewId=" + review_id) if review_id else \
                  ("https://play.google.com/store/apps/details?id=" + package)

            units.append({
                "unit_id": util.make_unit_id("playstore", text, url),
                "source": "playstore",
                "source_detail": app_name + " (Android)",
                "url": url,
                "retrieved_at": util.now_iso(),
                "text": text,
                # The review is definitionally about the host app, so that app
                # is the default; an explicit mention of another platform in the
                # text upgrades this to "Multiple" via tag_platform.
                "platform_mentioned": util.tag_platform(text, default=app_name),
                "query_matched": "; ".join(hits),
            })
            kept_this_app += 1

        # One query-log row per behaviour pattern, so the audit trail shows
        # which anchors actually did the work and which returned nothing.
        for pattern_name, n in retained_by_pattern.items():
            query_log.record(
                query_string=pattern_name,
                source="playstore",
                raw_results_returned=len(raw),
                units_retained=n,
                method="bulk review pull + local behaviour-anchored regex filter",
                notes=app_name + " / " + package + " / country=in lang=en / "
                      "no server-side search available on this endpoint",
            )

        util.log("  retained " + str(kept_this_app) + " behaviour-matched units")

    return units
