# -*- coding: utf-8 -*-
"""
Corpus inspection helper. Reads corpus_raw.csv and prints what is actually in
it, so relevance can be eyeballed rather than assumed.

Run:  python inspect_corpus.py            # summary + random sample
      python inspect_corpus.py 40         # bigger sample
      python inspect_corpus.py 20 wishlist  # only units matching a pattern

This is a diagnostic tool. It performs no classification and reveals no model
output, so it is safe to run before hand-coding.
"""

import csv
import random
import re
import sys
from collections import Counter

import config


def main():
    n = int(sys.argv[1]) if len(sys.argv) > 1 else 15
    pattern = sys.argv[2] if len(sys.argv) > 2 else None

    with open(config.CORPUS_CSV, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))

    if pattern:
        rx = re.compile(pattern, re.IGNORECASE)
        rows = [r for r in rows if rx.search(r["text"])]
        print("Filtered to " + str(len(rows)) + " units matching " + repr(pattern))

    print("")
    print("Total units: " + str(len(rows)))
    print("")
    print("By source:")
    for s, c in Counter(r["source"] for r in rows).most_common():
        print("   " + s.ljust(14) + str(c))
    print("By source_detail:")
    for s, c in Counter(r["source_detail"] for r in rows).most_common():
        print("   " + s.ljust(24) + str(c))
    print("By platform_mentioned:")
    for s, c in Counter(r["platform_mentioned"] for r in rows).most_common():
        print("   " + s.ljust(24) + str(c))
    print("By matched behaviour anchor:")
    anchors = Counter()
    for r in rows:
        for a in r["query_matched"].split("; "):
            anchors[a] += 1
    for a, c in anchors.most_common():
        print("   " + a.ljust(24) + str(c))

    lengths = sorted(len(r["text"]) for r in rows)
    if lengths:
        print("")
        print("Text length: min " + str(lengths[0])
              + "  median " + str(lengths[len(lengths) // 2])
              + "  max " + str(lengths[-1]))

    rng = random.Random(7)
    sample = rng.sample(rows, min(n, len(rows)))
    print("")
    print("=" * 78)
    print("RANDOM SAMPLE OF " + str(len(sample)))
    print("=" * 78)
    for r in sample:
        print("")
        print("[" + r["unit_id"] + "] " + r["source_detail"]
              + "  | platform=" + r["platform_mentioned"])
        print("  anchor: " + r["query_matched"])
        txt = r["text"].replace("\n", " ")
        print("  " + (txt[:500] + ("..." if len(txt) > 500 else "")))


if __name__ == "__main__":
    main()
