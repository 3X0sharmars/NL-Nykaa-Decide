# -*- coding: utf-8 -*-
"""
Central configuration: paths, app identifiers, and the BEHAVIOUR-ANCHORED
query set.

CRITICAL DESIGN CONSTRAINT (spec 3.1)
-------------------------------------
Queries anchor on the BEHAVIOUR (saving, shortlisting, not buying) and never
on the REASON (fit, stock, price, forgetting, ...). Searching for a reason
would retrieve that reason and turn the study into a readout of our own
keyword list.

BEHAVIOUR_QUERIES below is exactly the ALLOWED list from spec 3.1. It has not
been extended. Any addition must be cleared with the PM first -- the spec says
"If you are unsure whether a query is behaviour-anchored or reason-anchored,
ask me. Do not guess."
"""

import os
import re

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTEFACTS_DIR = os.path.join(BASE_DIR, "artefacts")
RAW_DIR = os.path.join(ARTEFACTS_DIR, "raw")

CORPUS_CSV = os.path.join(ARTEFACTS_DIR, "corpus_raw.csv")
QUERY_LOG_CSV = os.path.join(ARTEFACTS_DIR, "query_log.csv")
RETRIEVAL_REPORT_MD = os.path.join(ARTEFACTS_DIR, "retrieval_report.md")
VALIDATION_BLANK_CSV = os.path.join(ARTEFACTS_DIR, "validation_set_BLANK.csv")
VALIDATION_CODED_CSV = os.path.join(ARTEFACTS_DIR, "validation_set_CODED.csv")
CLASSIFIED_CSV = os.path.join(ARTEFACTS_DIR, "validation_set_MODEL.csv")
VALIDATION_REPORT_MD = os.path.join(ARTEFACTS_DIR, "validation_report.md")
ADVERSARIAL_REPORT_MD = os.path.join(ARTEFACTS_DIR, "adversarial_report.md")

# Fixed seed for the 120-unit validation draw (spec 5). Recorded in artefacts.
RANDOM_SEED = 20260822
VALIDATION_SAMPLE_SIZE = 120

# ---------------------------------------------------------------------------
# BEHAVIOUR-ANCHORED QUERIES -- verbatim ALLOWED list from spec 3.1
# ---------------------------------------------------------------------------
BEHAVIOUR_QUERIES = [
    "wishlist",
    "saved for later",
    "added to wishlist",
    "shortlisted",
    '"meant to buy"',
    '"never bought it"',
    '"still in my wishlist"',
    '"in my wishlist for months"',
    '"saved it but"',
    "wishlist Myntra",
    "wishlist Ajio",
    "wishlist Nykaa Fashion",
    "Nykaa Fashion saved items",
    "online shopping saved items",
    '"added to cart but didn\'t buy"',
]

# App-store review APIs have NO server-side search: you can only pull reviews
# in bulk and filter locally. These are the local filter patterns, and they are
# the same behaviour anchors as above expressed as regexes. No reason words.
BEHAVIOUR_FILTER_PATTERNS = {
    "wishlist": r"wish\s?list",
    "saved for later": r"sav(?:e|ed|ing) (?:it )?for later",
    "added to wishlist": r"add(?:ed)? to (?:my )?wish\s?list",
    "shortlisted": r"short\s?list(?:ed|ing)?",
    "saved items": r"saved? items?",
    "saved it but": r"saved? it\b",
    "added to cart / bag": r"add(?:ed)? to (?:my )?(?:cart|bag)",
    "meant to buy": r"meant to buy|planned to buy|wanted to buy",
    "never bought it": r"never (?:bought|purchased) it|didn'?t (?:buy|purchase) it",
}

# Compiled once for speed.
BEHAVIOUR_FILTER_RE = {
    name: re.compile(pat, re.IGNORECASE)
    for name, pat in BEHAVIOUR_FILTER_PATTERNS.items()
}

# ---------------------------------------------------------------------------
# Sources
# ---------------------------------------------------------------------------
PLAY_APPS = {
    "Myntra": "com.myntra.android",
    "AJIO": "com.ril.ajio",
    "Nykaa Fashion": "com.fsn.nds",  # verified: "Nykaa Fashion - Shopping App"
    # com.fsn.nykaa is Nykaa BEAUTY, a different app. Deliberately excluded --
    # this study is about fashion. See retrieval_report.md.
}

APPSTORE_APPS = {
    "Myntra": 907394059,
    "AJIO": 1113425372,
    "Nykaa Fashion": 1439872423,
}

PLAY_COUNTRY = "in"
PLAY_LANG = "en"
APPSTORE_COUNTRY = "in"

# How deep to paginate. Play reviews come 200/page; the endpoint stops issuing
# continuation tokens after a few thousand regardless of the app's total.
PLAY_MAX_PAGES = 150          # up to ~30,000 reviews per app
APPSTORE_MAX_PAGES = 10       # Apple's RSS hard-caps at page=10 (500 reviews)

# ---------------------------------------------------------------------------
# Reddit retrieval design (PM directive, 2026-08-22)
# ---------------------------------------------------------------------------
# 1. Subreddit scoping. Every behaviour query runs against this fixed list
#    rather than site-wide, which raises precision enormously.
REDDIT_SUBREDDITS = [
    "IndianFashionAddicts",
    "IndianFashion",
    "india",
    "IndiaSpeaks",
    "bangalore",
    "mumbai",
    "delhi",
    "TwoXIndia",
    "femalefashionadvice",
    "malefashionadvice",
    "onlineshopping",
    "Frugal_Ind",
]

# 2. Site-wide queries must carry a fashion/platform domain anchor, otherwise
#    "wishlist" alone drags in Steam, Amazon electronics and gift registries.
#    AUDITED against the spec 3.1 forbidden list: every term here is either a
#    BEHAVIOUR anchor (wishlist, saved, added to wishlist) or a CATEGORY/DOMAIN
#    anchor (dress, kurta, clothes, platform names, "online shopping India").
#    None names a failure reason. Re-run audit_queries() after any edit.
REDDIT_SITEWIDE_QUERIES = [
    "wishlist Myntra",
    "wishlist Ajio",
    '"Nykaa Fashion" wishlist',
    "wishlist dress",
    '"saved" kurta buy',
    "wishlist online shopping India",
    '"added to wishlist" clothes',
    '"still in my wishlist"',
]

# 3. Search COMMENTS as well as submissions. First-person non-conversion
#    narratives overwhelmingly live in comment replies ("same, I had 40 things
#    saved and never bought any of them"), which submission-only search misses
#    entirely.
#
#    CAPABILITY CONSTRAINT: Reddit's official API /search accepts type=link,
#    sr, user -- there is NO comment search. Comment retrieval is a
#    Pushshift-family capability only. See sources/reddit.py.
REDDIT_SEARCH_COMMENTS = True

# Reason-anchored terms that must NEVER appear in a query (spec 3.1). This is
# the eight failure modes expressed as vocabulary.
FORBIDDEN_REASON_TERMS = (
    r"\b(fit|size|sizing|stock|out of stock|sold out|expensive|cheap|cheaper|"
    r"price|cost|budget|forgot|forget|delay|wait|sale|discount|unavailable|"
    r"delist|deliver\w*|return polic\w*|lost interest|changed my mind|"
    r"decide|unsure)\b"
)


def audit_queries(queries=None):
    """
    Guard against a reason-anchored query ever entering the query set.
    Returns a list of (query, [offending_terms]); empty list means clean.
    """
    rx = re.compile(FORBIDDEN_REASON_TERMS, re.IGNORECASE)
    pool = queries if queries is not None else (
        BEHAVIOUR_QUERIES + REDDIT_SITEWIDE_QUERIES)
    return [(q, rx.findall(q)) for q in pool if rx.findall(q)]

# ---------------------------------------------------------------------------
# Platform tagging (spec 3.4)
# ---------------------------------------------------------------------------
PLATFORM_PATTERNS = {
    "Nykaa Fashion": r"nykaa\s*fashion|nykaafashion|\bnykaa\b",
    "Myntra": r"\bmyntra\b",
    "AJIO": r"\bajio\b",
}
PLATFORM_RE = {k: re.compile(v, re.IGNORECASE) for k, v in PLATFORM_PATTERNS.items()}

VALID_PLATFORMS = {"Myntra", "AJIO", "Nykaa Fashion", "Other/Unspecified", "Multiple"}

# Targets from spec 3.3 -- targets, NOT quotas. Never pad to reach these.
TARGETS = {
    "reddit": 250,
    "appreviews": 200,
    "forums": 150,
    "total_min": 600,
    "total_max": 700,
    "nykaa_subset_min": 80,
}


def tag_platform(text: str, default: str = "Other/Unspecified") -> str:
    """
    Tag which platform a unit is about (spec 3.4).

    Rules:
      - more than one distinct platform named -> "Multiple"
      - exactly one named                     -> that platform
      - none named                            -> `default` (for app-store
        reviews the caller passes the host app, since the review is definitionally
        about that app; for open web text the default stays Other/Unspecified)
    """
    if not text:
        return default
    found = {name for name, rx in PLATFORM_RE.items() if rx.search(text)}
    # "Nykaa Fashion" pattern also matches bare "Nykaa"; if the text names
    # Nykaa Fashion it should not also be double-counted.
    if len(found) > 1:
        return "Multiple"
    if len(found) == 1:
        return found.pop()
    return default
