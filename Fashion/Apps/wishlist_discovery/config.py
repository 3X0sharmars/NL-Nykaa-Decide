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

# ---------------------------------------------------------------------------
# CLASSIFIER MODEL
# ---------------------------------------------------------------------------
# Model id lives HERE, not hardcoded in classifier.py, so switching models is a
# config change. Override at runtime with the CLASSIFIER_MODEL env var.
#
# History: gemini-2.5-pro is retired for new users and returns HTTP 404 on
# generateContent even though it still appears in models.list(). That 404 was
# initially misread as a classification failure (0/11 adversarial) because the
# retry loop swallowed it.
CLASSIFIER_MODEL = "gemini-3.1-pro-preview"

# Retry policy. 4xx are PERMANENT and must never be retried: retrying a 404
# four times wastes quota and buries the real cause. Only 429 (rate limit) and
# 5xx (server-side) are transient.
RETRY_ON_STATUS = {429, 500, 502, 503, 504}
MAX_RETRIES = 4
RETRY_BASE_DELAY_S = 2.0
RETRY_MAX_DELAY_S = 30.0

# Fixed seed for the 120-unit validation draw (spec 5). Recorded in artefacts.
#
# RANDOM_SEED was the Phase 1 draw, taken from an app-review-only corpus with no
# vertical gate. Phase 1B superseded it: the sampling frame changed (vertical
# gate now excludes beauty and unclear), so a fresh seed is used and the old
# draw is retired rather than silently reused.
# Each redraw gets a NEW seed and the previous draw is archived, never silently
# reused: the sampling frame changed each time, so an old draw no longer
# represents the corpus it would be used to validate.
RANDOM_SEED_PHASE1 = 20260822          # retired: app-review corpus, no vertical gate
RANDOM_SEED_PHASE1B_A = 20260822154500  # retired: vertical gate, pre-SerpApi
RANDOM_SEED_PHASE1B_B = 20260822235900  # retired: drawn before the relevance audit
RANDOM_SEED = 20260823010000           # current: vertical gate + relevance gate
VALIDATION_SAMPLE_SIZE = 120

# Sources whose material FAILED the mandatory relevance audit (>=70% required).
# Units from these sources stay in corpus_raw.csv for provenance but are barred
# from the validation frame and from gate analysis: hand-coding them would spend
# effort on material already judged off-target.
#   serpapi_web -- 2/30 = 6.7% precision. The open web for behaviour-anchored
#   wishlist phrases returns hashtag spam, trend journalism and SaaS content
#   marketing, not first-person shopper accounts.
FAILED_RELEVANCE_SOURCES = {"serpapi_web"}

# Phase 4 sampling (spec: sample, don't census).
#
# Reduced 400 -> 200 by PM decision: the decision rule treats gates whose
# confidence bands overlap as ties, so the extra precision at n=400 cannot
# change the shortlist. At n=200 a 25% share carries a 95% CI of about
# 19.6%-31.3%; at n=400 about 21.0%-29.5%. Neither separates gates the other
# merges, so the extra 200 calls buy nothing the decision can use.
CLASSIFY_SAMPLE_SIZE = 200
CLASSIFY_SAMPLE_SEED = 20260823040000

# ---------------------------------------------------------------------------
# QUALIFIED CLASSIFIERS
# ---------------------------------------------------------------------------
# A model may only be used if it INDEPENDENTLY scored 11/11 with zero
# classification failures on the FULL adversarial set. Populate from
# artefacts/model_selection.md; do not add a model on the strength of a partial
# or batched-transport-failure run.
#
# Multi-model rules (PM directive, non-negotiable):
#   * The 120 validation units must ALL be classified by ONE model. A single
#     kappa cannot be assembled from two instruments.
#   * The sample MAY be split across qualified models, but every unit must
#     record which model classified it, and the gate-share table must report
#     whether shares differ materially by model.
#   * If shares differ materially by model, that is a FINDING, not something to
#     average away. It goes to the PM.
QUALIFIED_MODELS = {
    # model id: (batch_size verified clean, measured daily call budget)
    "gemini-3-flash-preview": {"batch": 1, "daily_calls": 22},
}

# Difference in gate share (percentage points) beyond which two models are
# judged to disagree materially and the split is reported as a finding.
MODEL_SHARE_DIVERGENCE_PP = 10.0

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
# PHASE 1C -- MULTI-TOKEN BEHAVIOUR FILTER
# ---------------------------------------------------------------------------
# The single-token filter above retained a unit on bare "wishlist", which is
# what filled the corpus with feature complaints: "please add sorting to the
# wishlist", "the wishlist button is broken". Those mention the FEATURE, never
# a saved item someone failed to buy.
#
# These phrases require the ACT plus its OBJECT -- someone doing something with
# a specific saved item. Bare "wishlist" no longer retains anything.
#
# Faithful to the nine phrases specified. The only tolerance added is
# whitespace ("wish list") and apostrophes ("haven't"/"havent"); no synonyms,
# no morphological widening. Widening here would re-import the problem the
# filter exists to remove.
MULTITOKEN_BEHAVIOUR_PATTERNS = {
    "in my wishlist":       r"in (?:my|the) wish\s?list",
    "saved it but":         r"saved? it,? but",
    "wanted to buy":        r"wanted to buy",
    "went to buy":          r"went to buy",
    "still haven't bought": r"still (?:haven'?t|have not|hadn'?t|had not) bought",
    "meant to buy":         r"meant to buy",
    "added to wishlist":    r"add(?:ed|ing)? (?:it |this |them )?to (?:my |the )?wish\s?list",
    "wishlisted it":        r"wish\s?listed (?:it|this|them|these)",
    "shortlisted":          r"short\s?listed",
}

MULTITOKEN_BEHAVIOUR_RE = {
    name: re.compile(pat, re.IGNORECASE)
    for name, pat in MULTITOKEN_BEHAVIOUR_PATTERNS.items()
}

# Phase 1C onward this is the retention rule for every source.
USE_MULTITOKEN_FILTER = True

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

# ---------------------------------------------------------------------------
# PHASE 1B schema additions: source_genre and vertical
# ---------------------------------------------------------------------------
# ---------------------------------------------------------------------------
# MODULE A -- X / Twitter  ***DROPPED FROM THE RUN (PM decision, Phase 1B)***
# ---------------------------------------------------------------------------
# The only credential available is XAI_API_KEY, which is xAI's Grok API -- not
# the X developer API. Grok's x_search returns model SYNTHESIS plus citations
# rather than raw posts; most cited x.com URLs auth-wall on fetch; and it is
# pay-per-use. Expected yield does not justify the cost.
#
# The module code in sources/xtwitter.py is RETAINED and unchanged, so it can be
# run later against a genuine X developer bearer token. It is excluded from the
# run and reported as dropped. THE xAI API IS NOT CALLED AT ALL.
MODULE_A_DROPPED = True
MODULE_A_DROP_REASON = (
    "XAI_API_KEY is xAI's Grok API, not the X developer API. Grok x_search "
    "returns synthesis plus citations rather than posts, most cited x.com URLs "
    "auth-wall on fetch, and it is pay-per-use. Expected yield did not justify "
    "the cost. Code retained; xAI API never called."
)


# Audited against FORBIDDEN_REASON_TERMS: 0 reason-anchored. Behaviour anchors
# ("wishlist", "saved for later", "meant to buy") plus category/platform
# anchors only.
X_QUERIES = [
    '"wishlist" Myntra',
    '"wishlist" Ajio',
    '"wishlist" "Nykaa Fashion"',
    '"saved for later" dress',
    '"saved for later" kurta',
    '"still in my wishlist"',
    '"meant to buy" online shopping',
    '"never bought it" wishlist',
    '"added to wishlist" clothes',
    '"shortlisted" dress buy',
]

# Quota controls. Tunable here without touching code, per PM directive.
X_MAX_RESULTS_PER_REQUEST = 25     # per-request cap
X_MAX_REQUESTS_TOTAL = 40          # hard ceiling across the whole run
X_TOKEN_BUCKET_DELAY_S = 4.0       # seconds between requests
X_CHECKPOINT_EVERY_REQUEST = True  # never lose retrieved units to exhaustion
X_LANG = "en"

# India-relevance filter applied AFTER retrieval. X has no reliable geo filter
# on free tiers, so relevance is established from the text itself.
X_INDIA_TERMS = (
    r"\b(india|indian|myntra|ajio|nykaa|flipkart|meesho|tatacliq|tata\s?cliq|"
    r"snapdeal|limeroad|bewakoof|kurta|kurti|saree|sari|lehenga|salwar|"
    r"rupee\w*|inr|₹|paytm|upi|cod\b|bangalore|bengaluru|mumbai|delhi|"
    r"hyderabad|chennai|kolkata|pune)\b"
)

# ---------------------------------------------------------------------------
# MODULE B -- SerpApi (general web, explicitly NOT Reddit)
# ---------------------------------------------------------------------------
# Reddit has an active legal complaint against SerpApi over data access. Every
# non-site-scoped query carries -site:reddit.com, and enforce_no_reddit()
# rejects any query that could route to Reddit. This is a hard guard, not a
# convention.
SERPAPI_QUERIES = [
    '"wishlist" Myntra -site:reddit.com',
    '"wishlist" "Nykaa Fashion" -site:reddit.com',
    '"saved for later" online shopping India -site:reddit.com',
    '"still in my wishlist" -site:reddit.com',
    '"meant to buy" dress online -site:reddit.com',
    'site:quora.com wishlist Myntra OR Ajio',
    'site:youtube.com Myntra haul wishlist',
]

SERPAPI_ENGINE = "google"
SERPAPI_LOCATION = "India"
SERPAPI_GL = "in"
SERPAPI_HL = "en"
SERPAPI_NUM_RESULTS = 20
SERPAPI_MAX_REQUESTS_TOTAL = 20
SERPAPI_DELAY_S = 2.0
SERPAPI_FETCH_DELAY_S = 1.5
SERPAPI_FETCH_TIMEOUT_S = 25

# Domains that must never be fetched in stage 2, regardless of what the search
# engine returns.
BLOCKED_FETCH_DOMAINS = {"reddit.com", "www.reddit.com", "old.reddit.com",
                         "np.reddit.com", "redd.it", "i.redd.it", "v.redd.it"}


def enforce_no_reddit(query: str) -> None:
    """
    Hard guard: refuse any SerpApi query that could route to Reddit.
    Raises ValueError rather than silently rewriting the query.
    """
    q = query.lower()
    if "site:reddit.com" in q and "-site:reddit.com" not in q:
        raise ValueError("query targets Reddit via site: -- refused: " + query)
    if "reddit" in q and "-site:reddit.com" not in q:
        raise ValueError("query mentions Reddit without exclusion -- refused: " + query)
    if q.startswith("site:"):
        return  # scoped to a named non-Reddit domain
    if "-site:reddit.com" not in q:
        raise ValueError("non-scoped SerpApi query missing -site:reddit.com: " + query)


SOURCE_GENRES = {"app_review", "social_short", "forum_thread"}
VERTICALS = {"fashion", "beauty", "mixed", "unclear"}

# Which genre each source belongs to.
SOURCE_TO_GENRE = {
    "playstore": "app_review",
    "appstore": "app_review",
    "x": "social_short",
    "forum": "forum_thread",
    "serpapi_web": "forum_thread",
}

# VERTICAL IS A HARD GATE (PM directive, Phase 1B).
# Nykaa Fashion and Nykaa Beauty are different products with different wishlist
# behaviour: beauty involves replenishment, shade matching and sale stacking,
# which would inflate Economic and Latency if pooled with fashion. Beauty and
# unclear units are EXCLUDED from gate analysis and counted separately.
BEAUTY_TERMS = (
    r"\b(makeup|make-up|lipstick|lip\s?balm|kajal|eyeliner|mascara|foundation|"
    r"concealer|compact|blush|highlighter|nail\s?paint|nail\s?polish|"
    r"skincare|skin\s?care|serum|moisturis\w+|moisturiz\w+|sunscreen|spf|"
    r"cleanser|face\s?wash|toner|shampoo|conditioner|hair\s?oil|hair\s?colou?r|"
    r"fragrance|perfume|deodorant|cosmetic\w*|beauty\s?product\w*|"
    r"shade\s?match\w*|swatch\w*)\b"
)
FASHION_TERMS = (
    r"\b(dress|kurta|kurti|saree|sari|lehenga|salwar|shirt|t-?shirt|tee|top|"
    r"jean\w*|trouser\w*|pant\w*|skirt|jacket|blazer|coat|hoodie|sweater|"
    r"sweatshirt|shoe\w*|sneaker\w*|heel\w*|sandal\w*|footwear|bag|handbag|"
    r"watch|jewellery|jewelry|earring\w*|apparel|clothing|clothes|outfit|"
    r"ethnic\s?wear|western\s?wear|innerwear|lingerie|nightwear|"
    r"size|fit)\b"
)
BEAUTY_RE = re.compile(BEAUTY_TERMS, re.IGNORECASE)
FASHION_RE = re.compile(FASHION_TERMS, re.IGNORECASE)

# Default vertical implied by the source app's catalogue.
#
# This is applied ONLY where the storefront is unambiguously single-vertical.
# For those apps it is evidence, not a guess: a review of AJIO cannot be about
# a beauty purchase because AJIO does not sell beauty.
#
# Myntra is DELIBERATELY ABSENT. Myntra is fashion-dominant but also sells
# beauty, so a Myntra review naming no product could be either. Assigning it
# "fashion" would be exactly the guess the vertical gate exists to prevent, so
# those units fall through to "unclear" and are excluded from gate analysis.
# Measured cost of this choice: 269 Myntra units excluded. Measured benefit:
# zero beauty contamination in the gate-eligible set.
APP_DEFAULT_VERTICAL = {
    "AJIO": "fashion",           # fashion-only catalogue
    "Nykaa Fashion": "fashion",  # com.fsn.nds; beauty is a separate app
}


def tag_vertical(text: str, source_detail: str = "", source: str = ""):
    """
    Classify a unit as fashion / beauty / mixed / unclear.

    Rules, in order:
      1. beauty terms AND fashion terms present            -> mixed
      2. beauty terms only                                 -> beauty
      3. fashion terms only                                -> fashion
      4. no product terms, but the host app is a fashion
         storefront                                        -> that app's vertical
      5. no product terms and no app context               -> unclear

    Rule 4 applies only to app reviews, where the storefront is known. Open-web
    and social units with no product signal fall to `unclear` and are excluded
    from gate analysis -- the PM directive is explicit that unclear is not to be
    guessed.
    """
    t = text or ""
    has_beauty = bool(BEAUTY_RE.search(t))
    has_fashion = bool(FASHION_RE.search(t))

    if has_beauty and has_fashion:
        return "mixed"
    if has_beauty:
        return "beauty"
    if has_fashion:
        return "fashion"

    if source in ("playstore", "appstore"):
        for app_name, vert in APP_DEFAULT_VERTICAL.items():
            if source_detail.startswith(app_name):
                return vert
    return "unclear"


# Verticals admitted to gate analysis. Beauty and unclear are excluded and
# reported as separate counts -- never pooled.
GATE_ELIGIBLE_VERTICALS = {"fashion", "mixed"}

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
