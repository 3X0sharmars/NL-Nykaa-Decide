# -*- coding: utf-8 -*-
"""
PHASE 1B relevance audit -- NEW material only.

Run:  python relevance_audit.py                 # audit x + serpapi_web units
      python relevance_audit.py --sample 30
      python relevance_audit.py --source x

Samples 30 units at random per module and reports what fraction genuinely
concern a SPECIFIC SAVED FASHION ITEM -- as opposed to wishlist feature
complaints ("let me sort my wishlist") or generic shopping talk.

Modules are reported SEPARATELY because their precision will differ: X is
short-form and lossy, web forums are long-form and denser.

PM DIRECTIVE: if either module is under 70%, STOP and report before doing
anything else. This script exits non-zero in that case.

This is a heuristic screen, printed alongside the full text of every sampled
unit so the judgement can be checked by eye rather than taken on trust. It is
NOT a classification and it never touches the codebook.
"""

import argparse
import csv
import random
import re
import sys
from collections import Counter

import config

THRESHOLD_PCT = 70.0

# A unit is "on-target" if it plausibly concerns a specific saved item.
SPECIFIC_ITEM = re.compile(
    r"\b(this|that|it|the)\s+(dress|kurta|kurti|saree|sari|lehenga|top|shirt|"
    r"jean\w*|jacket|shoe\w*|bag|watch|skirt|outfit|piece|item|product)\b"
    r"|\b(a|an|one)\s+(dress|kurta|kurti|saree|top|shirt|jacket|bag|skirt)\b"
    r"|\b(dress|kurta|kurti|saree|lehenga|top|shirt|jean\w*|jacket|shoe\w*|bag)\b",
    re.IGNORECASE)

PURCHASE_SIGNAL = re.compile(
    r"\b(buy|bought|purchase\w*|order\w*|checkout|check\s?out|cart|"
    r"wanted it|want it|meant to|planned to|going to get|didn'?t buy|"
    r"never bought|still want)\b", re.IGNORECASE)

# Signals that a unit is about the wishlist FEATURE, not a saved item.
FEATURE_COMPLAINT = re.compile(
    r"\b(sort|filter|categor\w+|multiple wishlist\w*|create.{0,12}list|"
    r"organi[sz]\w+|capacity|limit of|max\w*\s+\d+\s+item|folder\w*|"
    r"ui|ux|interface|app crash\w*|bug|error|login|log\s?in|slow|hang\w*|"
    r"feature request|please add|kindly add|suggestion)\b", re.IGNORECASE)


def judge(text):
    """Returns (on_target: bool, reason: str)."""
    has_item = bool(SPECIFIC_ITEM.search(text))
    has_purchase = bool(PURCHASE_SIGNAL.search(text))
    feature = bool(FEATURE_COMPLAINT.search(text))

    if feature and not (has_item and has_purchase):
        return False, "wishlist feature/app complaint"
    if not has_item:
        return False, "no specific item referenced"
    if not has_purchase:
        return False, "item but no purchase-oriented signal"
    return True, "specific item + purchase signal"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, default=30)
    ap.add_argument("--source", default=None,
                    help="audit one source only (x, serpapi_web)")
    ap.add_argument("--seed", type=int, default=4242)
    args = ap.parse_args()

    with open(config.CORPUS_CSV, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))

    NEW_SOURCES = ["x", "serpapi_web"]
    targets = [args.source] if args.source else NEW_SOURCES

    print("")
    print("=" * 74)
    print("RELEVANCE AUDIT -- NEW MATERIAL ONLY (Phase 1B)")
    print("=" * 74)
    print("Question: does the unit genuinely concern a SPECIFIC SAVED FASHION ITEM?")
    print("Threshold: " + format(THRESHOLD_PCT, ".0f") + "% -- below this, STOP and report.")

    any_present = False
    failures = []

    for src in targets:
        pool = [r for r in rows if r.get("source") == src]
        print("")
        print("-" * 74)
        print("MODULE: " + src + "   (" + str(len(pool)) + " units in corpus)")
        print("-" * 74)

        if not pool:
            print("  NO UNITS -- this module retrieved nothing, so there is")
            print("  nothing to audit. Not a pass and not a failure: absent.")
            continue

        any_present = True
        rng = random.Random(args.seed)
        sample = rng.sample(pool, min(args.sample, len(pool)))

        on = 0
        reasons = Counter()
        for i, r in enumerate(sample, 1):
            ok, why = judge(r["text"])
            on += ok
            reasons[why] += 1
            txt = r["text"].replace("\n", " ")
            print("")
            print("  " + str(i).zfill(2) + ". [" + ("ON-TARGET" if ok else "off-target")
                  + "] " + why)
            print("      " + (txt[:280] + ("..." if len(txt) > 280 else "")))

        pct = 100.0 * on / len(sample)
        print("")
        print("  " + "=" * 60)
        print("  PRECISION: " + str(on) + "/" + str(len(sample))
              + " = " + format(pct, ".1f") + "%")
        for why, n in reasons.most_common():
            print("     " + str(n).rjust(3) + "  " + why)
        if pct < THRESHOLD_PCT:
            print("  *** BELOW " + format(THRESHOLD_PCT, ".0f") + "% THRESHOLD ***")
            failures.append((src, pct))
        print("  " + "=" * 60)

    if not any_present:
        print("")
        print("No new-material units exist yet. Run phase1b_expand.py first.")
        return 0

    if failures:
        print("")
        print("!" * 74)
        print("STOP. Precision below threshold:")
        for src, pct in failures:
            print("   " + src + ": " + format(pct, ".1f") + "%")
        print("Per the PM directive, nothing further should proceed until this")
        print("is reviewed. Do not loosen filters to raise the number.")
        print("!" * 74)
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
