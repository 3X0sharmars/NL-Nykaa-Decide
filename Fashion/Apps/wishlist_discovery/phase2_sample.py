# -*- coding: utf-8 -*-
"""
PHASE 2 -- export the blind validation set.

Run:  python phase2_sample.py

Draws a random sample of 120 units from corpus_raw.csv using the fixed seed in
config.RANDOM_SEED, and writes artefacts/validation_set_BLANK.csv.

THE HUMAN COLUMNS ARE LEFT EMPTY, BY DESIGN.

This script never calls a model, never imports the classifier, and never
displays a predicted label. The PM codes these 120 units blind; if they saw
model output first, the agreement statistics downstream would be measuring
anchoring rather than agreement, and the validation gate would be worthless.
"""

import csv
import os
import random
import sys

import config
import util

BLANK_FIELDS = [
    "unit_id",
    "text",
    "source",
    # --- everything below is filled in BY THE PM, by hand, blind ---
    "human_intent",
    "human_gate",
    "human_other_subtype",
    "human_secondary_metadata",
    "human_notes",
]


def load_corpus(path=None):
    path = path or config.CORPUS_CSV
    if not os.path.exists(path):
        sys.exit("ERROR: " + path + " not found. Run phase1_retrieve.py first.")
    with open(path, "r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def main():
    rows = load_corpus()
    n = len(rows)
    if n == 0:
        sys.exit("ERROR: corpus_raw.csv is empty. Nothing to sample.")

    size = min(config.VALIDATION_SAMPLE_SIZE, n)
    if size < config.VALIDATION_SAMPLE_SIZE:
        util.log("!! WARNING: corpus has only " + str(n) + " units; sampling all "
                 + str(size) + " instead of " + str(config.VALIDATION_SAMPLE_SIZE) + ".")

    rng = random.Random(config.RANDOM_SEED)
    # Sort first so the draw does not depend on CSV row order.
    ordered = sorted(rows, key=lambda r: r["unit_id"])
    sample = rng.sample(ordered, size)

    util.ensure_dirs()
    with open(config.VALIDATION_BLANK_CSV, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=BLANK_FIELDS)
        w.writeheader()
        for r in sample:
            w.writerow({
                "unit_id": r["unit_id"],
                "text": r["text"],
                "source": r["source"],
                "human_intent": "",
                "human_gate": "",
                "human_other_subtype": "",
                "human_secondary_metadata": "",
                "human_notes": "",
            })

    from collections import Counter
    by_source = Counter(r["source"] for r in sample)
    by_plat = Counter(r["platform_mentioned"] for r in sample)

    print("")
    print("=" * 72)
    print("PHASE 2 COMPLETE -- blind validation set exported")
    print("=" * 72)
    print("")
    print("  File:            " + config.VALIDATION_BLANK_CSV)
    print("  Units:           " + str(size) + " (drawn from " + str(n) + ")")
    print("  Random seed:     " + str(config.RANDOM_SEED) + "  (fixed, recorded)")
    print("")
    print("  Composition by source:")
    for s, c in by_source.most_common():
        print("    " + s.ljust(14) + str(c))
    print("  Composition by platform:")
    for p, c in by_plat.most_common():
        print("    " + p.ljust(20) + str(c))
    print("")
    print("-" * 72)
    print("WHAT YOU DO NEXT")
    print("-" * 72)
    print("""
1. Open artefacts/validation_set_BLANK.csv in Excel or Google Sheets.

2. Code all 120 units BY HAND, using the frozen codebook v1.1. Work from the
   codebook text itself, not from memory -- the adjacency rules are the whole
   point of this exercise.

   human_intent            HIGH_INTENT  or  EXCLUDE
                           Apply section 4.1 FIRST. A wishlist mention alone
                           is not enough; you need a specific product/item AND
                           a purchase-oriented signal.

   human_gate              Leave BLANK if human_intent is EXCLUDE.
                           Otherwise exactly ONE of:
                             RETURN, PURCHASABILITY, INTENT_DECAY, DECISION,
                             SUBSTITUTION, LATENCY, ECONOMIC, OTHER
                           Never two. Never a split vote (section 4.4).
                           Apply the earliest gate at which the path ACTUALLY
                           failed, temporally and causally -- not whichever
                           keyword appears first in the text (section 4.3).

   human_other_subtype     Only when human_gate is OTHER. One of:
                             INSUFFICIENT_INFO   (8A -- coverage limitation)
                             TAXONOMY_FAILURE    (8B -- codebook failure)
                           Be strict here: 8B is the number that decides
                           whether your taxonomy survives.

   human_secondary_metadata  Downstream events that get NO gate vote.
                             Free text, e.g. "bought elsewhere".

   human_notes             Anything you found genuinely ambiguous. These notes
                           are what tell us which definition to sharpen if the
                           kappa comes in low.

3. Save it as:   artefacts/validation_set_CODED.csv
   (keep the same columns and the same unit_id values)

4. Come back and say so. Only then does phase 3 run.

NOTE: phase3_classify.py checks for validation_set_CODED.csv and refuses to
start without it. That gate is deliberate -- it stops you seeing model labels
before your own are committed to disk.
""")


if __name__ == "__main__":
    main()
