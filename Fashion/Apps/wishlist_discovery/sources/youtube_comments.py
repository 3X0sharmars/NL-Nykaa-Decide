# -*- coding: utf-8 -*-
"""
PHASE 1C -- YouTube comments (source_genre = video_comment).

No API key. `youtube-comment-downloader` reads the same public payload the web
player uses, and video ids come from YouTube's own results page. Nothing is
authenticated and nothing is evaded.

WHY THIS SOURCE
---------------
Every other reachable source is length-capped or feature-focused:
    Google Play   median 272 chars, hard cap ~500
    App Store     median 913 chars, but only 17 behaviour hits in 3,000 reviews
YouTube comments have no length cap, and haul / try-on videos attract an
audience that talks about what they saved and whether they actually bought it.

Retention uses the PHASE 1C MULTI-TOKEN filter: bare "wishlist" retains
nothing. Comments are noisy, so a loose filter here would be worse than
useless.

Output is STAGED. Nothing enters corpus_raw.csv until the >=70% relevance
audit has been run on it.
"""

import itertools
import re
import time

import requests

import config
import util

UA = {"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                    "AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"}

# Behaviour + category anchored, never reason-anchored. Audited by
# config.audit_queries() before use.
SEARCH_QUERIES = [
    "myntra haul try on india",
    "ajio haul try on india",
    "nykaa fashion haul india",
    "myntra wishlist shopping india",
    "online shopping haul india clothes honest review",
    "myntra vs ajio shopping experience india",
    "indian fashion online shopping haul honest",
    "myntra shopping experience india what i bought",
]

MAX_VIDEOS_PER_QUERY = 8
MAX_COMMENTS_PER_VIDEO = 100
MIN_COMMENT_CHARS = 40

INDIA_RE = re.compile(config.X_INDIA_TERMS, re.IGNORECASE)


def search_video_ids(query, limit=MAX_VIDEOS_PER_QUERY):
    """Video ids from YouTube's public results page. No API key."""
    try:
        r = requests.get("https://www.youtube.com/results",
                         params={"search_query": query},
                         headers=UA, timeout=30)
    except Exception as exc:
        util.log("  ! search error: " + exc.__class__.__name__)
        return []
    if r.status_code != 200:
        util.log("  ! search HTTP " + str(r.status_code))
        return []
    ids = list(dict.fromkeys(re.findall(r'"videoId":"([A-Za-z0-9_-]{11})"', r.text)))
    titles = dict(zip(ids, re.findall(r'"title":{"runs":\[{"text":"(.*?)"}', r.text)))
    return [(v, titles.get(v, "")) for v in ids[:limit]]


def retrieve(query_log, queries=None, max_videos=None, max_comments=None,
             sleep=1.0):
    from youtube_comment_downloader import YoutubeCommentDownloader, SORT_BY_POPULAR

    queries = queries or SEARCH_QUERIES
    max_videos = max_videos or MAX_VIDEOS_PER_QUERY
    max_comments = max_comments or MAX_COMMENTS_PER_VIDEO

    bad = config.audit_queries(queries)
    if bad:
        raise ValueError("reason-anchored query in YouTube set: " + repr(bad))

    downloader = YoutubeCommentDownloader()
    units = []
    seen_videos = set()

    for q in queries:
        vids = search_video_ids(q, max_videos)
        util.log("YouTube: " + q[:44].ljust(46) + str(len(vids)) + " videos")
        scanned = 0
        kept = 0

        for vid, title in vids:
            if vid in seen_videos:
                continue
            seen_videos.add(vid)
            url_v = "https://www.youtube.com/watch?v=" + vid
            try:
                stream = downloader.get_comments(vid, sort_by=SORT_BY_POPULAR)
                for c in itertools.islice(stream, max_comments):
                    text = util.clean_text(c.get("text", "") or "")
                    scanned += 1
                    if len(text) < MIN_COMMENT_CHARS:
                        continue
                    hits = util.matched_behaviour_patterns(text)
                    if not hits:
                        continue
                    units.append({
                        "unit_id": util.make_unit_id("youtube", text, url_v),
                        "source": "youtube",
                        "source_detail": "YouTube: " + (title or vid)[:60],
                        "url": url_v,
                        "retrieved_at": util.now_iso(),
                        "text": text,
                        "platform_mentioned": util.tag_platform(text),
                        "query_matched": q,
                        "source_genre": "video_comment",
                        "vertical": config.tag_vertical(text, "", "youtube"),
                    })
                    kept += 1
            except Exception as exc:
                util.log("  ! " + vid + ": " + exc.__class__.__name__)
            time.sleep(sleep)

        query_log.record(query_string=q, source="youtube",
                         raw_results_returned=scanned, units_retained=kept,
                         method="youtube-comment-downloader (no API key) + "
                                "multi-token behaviour filter",
                         notes=str(len(vids)) + " videos, up to "
                               + str(max_comments) + " popular comments each")
        util.log("   scanned " + str(scanned) + " comments, retained " + str(kept))

    return units
