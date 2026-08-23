# -*- coding: utf-8 -*-
"""
PHASE 1B schema migration: add source_genre and vertical to every corpus unit.

Run:  python migrate_schema.py            # migrate in place
      python migrate_schema.py --dry-run  # report only, write nothing

Applies retroactively to all existing units. Idempotent: re-running recomputes
the same tags rather than compounding them.

VERTICAL IS A HARD GATE. Beauty and unclear units are excluded from gate
analysis and reported separately. The tagging rule lives in config.tag_vertical
and is documented there; this script only applies it and reports the result.

Writes a backup of the pre-migration corpus to
artefacts/corpus_raw.pre1b.csv the first time it runs.
"""

import csv
import os
import shutil
import sys
from collections import Counter

import config
import util

NEW_FIELDS = ["source_genre", "vertical"]
BACKUP = os.path.join(config.ARTEFACTS_DIR, "corpus_raw.pre1b.csv")


def migrate(rows):
    genre_counts = Counter()
    vert_counts = Counter()
    unknown_source = Counter()

    for r in rows:
        src = (r.get("source") or "").strip()
        genre = config.SOURCE_TO_GENRE.get(src)
        if genre is None:
            unknown_source[src] += 1
            genre = "app_review" if src in ("playstore", "appstore") else "forum_thread"
        r["source_genre"] = genre
        genre_counts[genre] += 1

        vert = config.tag_vertical(
            r.get("text", ""), r.get("source_detail", ""), src)
        r["vertical"] = vert
        vert_counts[vert] += 1

    return genre_counts, vert_counts, unknown_source


def main():
    dry = "--dry-run" in sys.argv

    if not os.path.exists(config.CORPUS_CSV):
        sys.exit("ERROR: " + config.CORPUS_CSV + " not found. Run phase1_retrieve.py first.")

    with open(config.CORPUS_CSV, "r", encoding="utf-8-sig", newline="") as f:
        reader = csv.DictReader(f)
        rows = list(reader)
        existing_fields = list(reader.fieldnames or [])

    util.log("Loaded " + str(len(rows)) + " units from corpus_raw.csv")
    already = [f for f in NEW_FIELDS if f in existing_fields]
    if already:
        util.log("  (re-tagging existing columns: " + ", ".join(already) + ")")

    genre_counts, vert_counts, unknown_source = migrate(rows)

    print("")
    print("=" * 66)
    print("SCHEMA MIGRATION" + ("  [DRY RUN -- nothing written]" if dry else ""))
    print("=" * 66)
    print("")
    print("source_genre:")
    for g, n in genre_counts.most_common():
        print("   " + g.ljust(16) + str(n))
    print("")
    print("vertical:")
    total = len(rows)
    for v, n in vert_counts.most_common():
        pct = 100.0 * n / total if total else 0.0
        gate = "  <-- EXCLUDED from gate analysis" if v not in config.GATE_ELIGIBLE_VERTICALS else ""
        print("   " + v.ljust(16) + str(n).rjust(5) + "  " + format(pct, "5.1f") + "%" + gate)
    print("")
    eligible = sum(n for v, n in vert_counts.items()
                   if v in config.GATE_ELIGIBLE_VERTICALS)
    excluded = total - eligible
    print("   gate-eligible (fashion + mixed): " + str(eligible))
    print("   excluded (beauty + unclear)    : " + str(excluded))

    if unknown_source:
        print("")
        print("!! sources with no SOURCE_TO_GENRE mapping (fell back):")
        for s, n in unknown_source.most_common():
            print("   " + repr(s) + ": " + str(n))

    if dry:
        print("")
        print("Dry run -- corpus_raw.csv unchanged.")
        return

    if not os.path.exists(BACKUP):
        shutil.copy2(config.CORPUS_CSV, BACKUP)
        util.log("Backed up pre-migration corpus to " + BACKUP)

    out_fields = existing_fields + [f for f in NEW_FIELDS if f not in existing_fields]
    with open(config.CORPUS_CSV, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=out_fields, extrasaction="ignore")
        w.writeheader()
        w.writerows(rows)

    print("")
    util.log("WROTE " + config.CORPUS_CSV + "  (" + str(len(out_fields)) + " columns)")


if __name__ == "__main__":
    main()
