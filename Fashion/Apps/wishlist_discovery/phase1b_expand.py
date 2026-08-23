# -*- coding: utf-8 -*-
"""
PHASE 1B -- corpus expansion via X (Module A) and SerpApi (Module B).

Run:  python phase1b_expand.py                 # both modules
      python phase1b_expand.py --module x
      python phase1b_expand.py --module serpapi
      python phase1b_expand.py --no-resume     # ignore X checkpoint

Reddit is OUT OF SCOPE and is not attempted by any route.

New units are appended to corpus_raw.csv using the existing schema plus the
Phase 1B additions (source_genre, vertical). Dedup runs across the combined
corpus, so a unit already present is not double-counted.

Missing credentials are a LOUD FAILURE, not a silent skip.
"""

import argparse
import csv
import os
import sys
from collections import Counter

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import config
import util
from sources import xtwitter, serpapi_web
from codebook import CODEBOOK_VERSION, codebook_fingerprint

FIELDS = util.CORPUS_FIELDS + ["source_genre", "vertical"]


def load_corpus():
    if not os.path.exists(config.CORPUS_CSV):
        sys.exit("ERROR: corpus_raw.csv not found. Run phase1_retrieve.py first.")
    with open(config.CORPUS_CSV, "r", encoding="utf-8-sig", newline="") as f:
        return list(csv.DictReader(f))


def write_corpus(rows):
    with open(config.CORPUS_CSV, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=FIELDS, extrasaction="ignore")
        w.writeheader()
        for r in rows:
            r.setdefault("source_genre",
                         config.SOURCE_TO_GENRE.get(r.get("source", ""), "forum_thread"))
            r.setdefault("vertical", config.tag_vertical(
                r.get("text", ""), r.get("source_detail", ""), r.get("source", "")))
            w.writerow(r)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--module", choices=["x", "serpapi", "both"], default="both")
    ap.add_argument("--no-resume", action="store_true")
    args = ap.parse_args()

    util.ensure_dirs()
    qlog = util.QueryLog()
    existing = load_corpus()
    util.log("Existing corpus: " + str(len(existing)) + " units")

    new_units = []
    reports = {}
    failures = {}

    # ---- Module A: X ------------------------------------------------------
    if config.MODULE_A_DROPPED and args.module in ("x", "both"):
        util.log("")
        util.log("MODULE A -- X / Twitter: DROPPED (not run)")
        util.log("   " + config.MODULE_A_DROP_REASON)
        reports["X (DROPPED)"] = {
            "queries_total": len(config.X_QUERIES),
            "queries_run": 0,
            "queries_unrun": list(config.X_QUERIES),
            "requests_made": 0,
            "stopped_reason": "DROPPED by PM decision -- " + config.MODULE_A_DROP_REASON,
            "units": 0,
        }
        qlog.record(query_string="(module dropped)", source="x",
                    raw_results_returned=0, units_retained=0,
                    method="not executed",
                    notes="MODULE A DROPPED. " + config.MODULE_A_DROP_REASON)
    elif args.module in ("x", "both"):
        util.log("")
        util.log("MODULE A -- X / Twitter")
        try:
            u, rep = xtwitter.retrieve(qlog, resume=not args.no_resume)
            new_units.extend(u)
            reports["X"] = rep
        except xtwitter.XAuthError as exc:
            failures["X"] = str(exc)
            util.log("!! MODULE A BLOCKED: " + str(exc))
        except Exception as exc:
            failures["X"] = exc.__class__.__name__ + ": " + str(exc)
            util.log("!! MODULE A FAILED: " + failures["X"])

    # ---- Module B: SerpApi ------------------------------------------------
    if args.module in ("serpapi", "both"):
        util.log("")
        util.log("MODULE B -- SerpApi (non-Reddit web)")
        try:
            u, rep = serpapi_web.retrieve(qlog)
            new_units.extend(u)
            reports["SerpApi"] = rep
        except serpapi_web.SerpApiAuthError as exc:
            failures["SerpApi"] = str(exc)
            util.log("!! MODULE B BLOCKED: " + str(exc))
        except Exception as exc:
            failures["SerpApi"] = exc.__class__.__name__ + ": " + str(exc)
            util.log("!! MODULE B FAILED: " + failures["SerpApi"])

    # ---- merge + dedup ----------------------------------------------------
    util.log("")
    util.log("New units retrieved: " + str(len(new_units)))
    combined = existing + new_units
    kept, n_exact, n_near = util.deduplicate(combined)
    util.log("Dedup across combined corpus: removed " + str(n_exact)
             + " exact, " + str(n_near) + " near-identical")

    write_corpus(kept)
    qlog.write(os.path.join(config.ARTEFACTS_DIR, "query_log_phase1b.csv"))

    # ---- report -----------------------------------------------------------
    by_genre = Counter(r.get("source_genre", "?") for r in kept)
    by_vert = Counter(r.get("vertical", "?") for r in kept)
    by_source = Counter(r.get("source", "?") for r in kept)

    print("")
    print("=" * 70)
    print("PHASE 1B COMPLETE")
    print("=" * 70)
    print("  codebook " + CODEBOOK_VERSION + " (" + codebook_fingerprint() + ")")
    print("  total corpus: " + str(len(kept)))
    print("")
    print("  by source:")
    for s, n in by_source.most_common():
        print("     " + s.ljust(16) + str(n))
    print("  by source_genre:")
    for g, n in by_genre.most_common():
        print("     " + g.ljust(16) + str(n))
    print("  by vertical:")
    for v, n in by_vert.most_common():
        mark = "" if v in config.GATE_ELIGIBLE_VERTICALS else "   <-- EXCLUDED"
        print("     " + v.ljust(16) + str(n) + mark)
    eligible = sum(n for v, n in by_vert.items()
                   if v in config.GATE_ELIGIBLE_VERTICALS)
    print("  gate-eligible: " + str(eligible))

    for name, rep in reports.items():
        print("")
        print("  " + name + ":")
        print("     queries run   : " + str(rep["queries_run"]) + "/"
              + str(rep["queries_total"]))
        print("     requests made : " + str(rep["requests_made"]))
        print("     units         : " + str(rep["units"]))
        if rep.get("unfetched_leads") is not None:
            print("     unfetched leads: " + str(rep["unfetched_leads"]))
        if rep["queries_unrun"]:
            print("     UNRUN (" + str(len(rep["queries_unrun"])) + "):")
            for q in rep["queries_unrun"]:
                print("        " + q)
        if rep["stopped_reason"]:
            print("     stopped: " + rep["stopped_reason"])

    if failures:
        print("")
        print("  " + "!" * 60)
        for name, err in failures.items():
            print("  MODULE " + name + " DID NOT RUN:")
            print("     " + err[:400])
        print("  " + "!" * 60)
        print("  No substitute source was used. Counts above exclude these modules.")


if __name__ == "__main__":
    main()
