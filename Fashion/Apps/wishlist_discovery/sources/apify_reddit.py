# -*- coding: utf-8 -*-
"""
PHASE 1C -- ingest Apify `reddit-scraper` dataset exports.
source_genre = community_prose.

Reads any number of Apify dataset JSON files from a folder, so the workflow is:
run the actor in the Apify console, download the dataset JSON, drop it in, and
re-run this. No APIFY_TOKEN required for ingestion. If a token is present the
runner can fetch datasets directly instead.

WHY THIS SOURCE MATTERS
-----------------------
Measured on the 10-record trial export (8 non-bot records):

    relevance   50%   vs 16.7% for the Play corpus
    multi-step  37.5% vs  7.1% for the Play corpus

It is the only source reached so far that produces sequenced, first-person
non-conversion narrative -- "i save a dress thinking it's perfect for a
vacation and then I realize I don't even have either of those planned".

THE MULTI-TOKEN FILTER IS NOT APPLIED HERE
------------------------------------------
Measured: ZERO of the four relevant trial records match any of the nine
multi-token phrases. Real prose says "i save a dress thinking..." and "ill save
10 cute tops and then remember...", never "in my wishlist" or "meant to buy".
The phrase list was derived from app-review vocabulary and has 0% recall on
community prose. Used as a hard gate it would discard this entire source.

Retention here uses the broader single-token behaviour anchors, and the
multi-token match is recorded as a STRATIFICATION FLAG (`multitoken_match`)
rather than a gate. Quality is enforced downstream by the codebook 4.1 intent
filter and the relevance audit.

TEXT FIDELITY
-------------
For a comment, Apify puts "/u/author on <post title>" in `title` and the actual
comment in `body`. Only `body` is the author's own words, so only `body` becomes
the unit text -- otherwise `supporting_quote` would be verified against a
machine-built header the commenter never wrote. The post title is preserved
separately as thread context.

Output is STAGED. Nothing enters corpus_raw.csv until the >=70% relevance audit
has been run.
"""

import glob
import html as _html
import json
import os
import re

import config
import util

# sources/ -> wishlist_discovery/ -> Apps/ -> Fashion/
_SOURCES_DIR = os.path.dirname(os.path.abspath(__file__))
_PROJECT_DIR = os.path.dirname(_SOURCES_DIR)          # wishlist_discovery
_APPS_DIR = os.path.dirname(_PROJECT_DIR)             # Apps
_FASHION_DIR = os.path.dirname(_APPS_DIR)             # Fashion

# Drop new Apify dataset exports into ANY of these; all *.json are ingested.
DEFAULT_INPUT_DIRS = [
    os.path.join(config.ARTEFACTS_DIR, "apify_in"),
    os.path.join(_FASHION_DIR, "Manual reddit download"),
    os.path.join(_APPS_DIR, "Manual reddit download"),
]

# Automated accounts and moderator boilerplate are not evidence.
BOT_RE = re.compile(
    r"automoderator|i am a bot|action was performed automatically|"
    r"please contact the moderators|this action was performed",
    re.IGNORECASE)
BOT_USERS = {"automoderator", "[deleted]", "reddit"}

DEAD_TEXT = {"[removed]", "[deleted]", ""}
MIN_CHARS = 40


def find_dataset_files(input_dirs=None):
    dirs = input_dirs or DEFAULT_INPUT_DIRS
    found = []
    for d in dirs:
        if not os.path.isdir(d):
            continue
        found.extend(sorted(glob.glob(os.path.join(d, "*.json"))))
    return found


def _clean(s):
    return util.clean_text(_html.unescape(s or ""))


def _is_bot(rec, text):
    user = (rec.get("username") or "").strip().lower().lstrip("u/")
    if user in BOT_USERS:
        return True
    return bool(BOT_RE.search(text))


def record_to_unit(rec, query_hint=""):
    dtype = (rec.get("dataType") or "").lower()
    title = _clean(rec.get("title"))
    body = _clean(rec.get("body"))

    if dtype == "comment":
        # `title` is a synthesised "/u/x on <post>" header, not author text.
        text = body
        thread = title
    else:
        text = (title + "\n\n" + body).strip() if body else title
        thread = title

    if not text or text.strip().lower() in DEAD_TEXT or len(text) < MIN_CHARS:
        return None
    if _is_bot(rec, text):
        return None

    sub = (rec.get("communityName") or rec.get("parsedCommunityName") or "reddit")
    if not sub.startswith("r/"):
        sub = "r/" + sub.lstrip("r/")
    url = rec.get("url") or ""

    # Behaviour anchors: single-token set (the multi-token set has 0% recall
    # on this genre -- see module docstring).
    hits = util.matched_behaviour_patterns(text, multitoken=False)
    if not hits:
        return None

    mt = util.matched_behaviour_patterns(text, multitoken=True)

    return {
        "unit_id": util.make_unit_id("reddit", text, url),
        "source": "reddit",
        "source_detail": sub + " (" + (dtype or "post") + ")",
        "url": url,
        "retrieved_at": rec.get("scrapedAt") or util.now_iso(),
        "text": text,
        "platform_mentioned": util.tag_platform(text),
        "query_matched": query_hint or thread[:120],
        "source_genre": "community_prose",
        "vertical": config.tag_vertical(text, "", "reddit"),
        "multitoken_match": "yes" if mt else "no",
    }


def retrieve(query_log, input_dirs=None):
    files = find_dataset_files(input_dirs)
    if not files:
        util.log("!! no Apify dataset JSON found in: "
                 + ", ".join(input_dirs or DEFAULT_INPUT_DIRS))
        return []

    units = []
    for path in files:
        try:
            with open(path, "r", encoding="utf-8") as f:
                data = json.load(f)
        except Exception as exc:
            util.log("  ! cannot read " + os.path.basename(path) + ": "
                     + exc.__class__.__name__)
            continue
        if isinstance(data, dict):
            data = data.get("items") or data.get("results") or [data]
        if not isinstance(data, list):
            util.log("  ! unexpected shape in " + os.path.basename(path))
            continue

        kept = 0
        bots = 0
        for rec in data:
            if not isinstance(rec, dict):
                continue
            t = _clean((rec.get("body") or "") + " " + (rec.get("title") or ""))
            if _is_bot(rec, t):
                bots += 1
                continue
            u = record_to_unit(rec)
            if u:
                units.append(u)
                kept += 1

        util.log("  " + os.path.basename(path)[:52] + ": " + str(len(data))
                 + " records -> " + str(kept) + " units (" + str(bots)
                 + " bot/mod records dropped)")
        query_log.record(
            query_string="(apify dataset export)", source="reddit",
            raw_results_returned=len(data), units_retained=kept,
            method="Apify trudax/reddit-scraper dataset export, ingested offline",
            notes=os.path.basename(path) + "; bots dropped=" + str(bots)
                  + "; single-token anchors used (multi-token has 0% recall "
                    "on community prose, recorded as stratification flag)")

    return units
