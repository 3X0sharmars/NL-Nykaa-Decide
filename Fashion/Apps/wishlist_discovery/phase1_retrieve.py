# -*- coding: utf-8 -*-
"""
PHASE 1 -- build the evidence corpus.

Run:  python phase1_retrieve.py
      python phase1_retrieve.py --reddit-backend official_api

Writes:
    artefacts/corpus_raw.csv
    artefacts/query_log.csv
    artefacts/retrieval_report.md

Design commitments (spec 3 and 7):
  * Queries are behaviour-anchored only. Never reason-anchored.
  * Every executed query is logged, including the ones that returned nothing.
  * Nothing is invented. Every row traces to a real API response or URL.
  * Nothing is padded to hit a target. Shortfalls are reported as shortfalls.
  * If a source is blocked, we say so; we do not silently swap in another.
"""

import argparse
import sys
import traceback
from collections import Counter

import config
import util
from sources import appstore, playstore, webforums
from sources import reddit as reddit_src
from codebook import CODEBOOK_VERSION, codebook_fingerprint


def _counts(units, key):
    return Counter(u[key] for u in units)


def build_report(units, query_log, source_status, dup_exact, dup_near, seed_note):
    """Writes artefacts/retrieval_report.md -- counts, shortfalls, and why."""
    by_source = _counts(units, "source")
    by_platform = _counts(units, "platform_mentioned")
    by_detail = _counts(units, "source_detail")

    nykaa_n = by_platform.get("Nykaa Fashion", 0)
    total = len(units)

    L = []
    A = L.append
    A("# Retrieval Report -- Wishlist Non-Conversion Discovery Engine")
    A("")
    A("Generated: " + util.now_iso())
    A("Codebook: " + CODEBOOK_VERSION + " (fingerprint " + codebook_fingerprint() + ")")
    A("")
    A("## Headline")
    A("")
    A("- **Total units retained: " + str(total) + "**  (spec target 600-700)")
    A("- **Nykaa Fashion subset: " + str(nykaa_n) + "**  (spec target >= "
      + str(config.TARGETS["nykaa_subset_min"]) + ")")
    A("- Raw items scanned across all sources: " + str(query_log.total_raw()))
    A("- Duplicates removed: " + str(dup_exact) + " exact, " + str(dup_near) + " near-identical")
    A("")
    if total < config.TARGETS["total_min"]:
        A("> **SHORTFALL: the corpus is below the 600-unit target.** The causes are")
        A("> itemised under 'Source status' below. Per spec 3.3 the corpus was NOT")
        A("> padded to close this gap: no query was loosened and no irrelevant")
        A("> material was added.")
        A("")
    if nykaa_n < config.TARGETS["nykaa_subset_min"]:
        A("> **SHORTFALL: the Nykaa Fashion subset is below the 80-unit target** ("
          + str(nykaa_n) + "). This is a stated limitation of the study, not a")
        A("> presentation problem. Nykaa-specific and category-level counts are")
        A("> reported separately throughout and are never pooled.")
        A("")

    A("## Source status")
    A("")
    A("| Source | Status | Units | Detail |")
    A("|---|---|---|---|")
    for name, st in source_status.items():
        A("| " + name + " | " + st["status"] + " | " + str(st["units"])
          + " | " + st["detail"].replace("|", "/") + " |")
    A("")

    A("## Counts by source")
    A("")
    A("| source | units | target |")
    A("|---|---|---|")
    tmap = {"reddit": config.TARGETS["reddit"],
            "playstore": config.TARGETS["appreviews"],
            "appstore": None, "forum": config.TARGETS["forums"]}
    for s, n in by_source.most_common():
        t = tmap.get(s)
        A("| " + s + " | " + str(n) + " | " + (str(t) if t else "(shared 200 app-review target)") + " |")
    A("| **total** | **" + str(total) + "** | **600-700** |")
    A("")

    A("## Counts by source detail")
    A("")
    A("| source_detail | units |")
    A("|---|---|")
    for s, n in by_detail.most_common():
        A("| " + s + " | " + str(n) + " |")
    A("")

    A("## Two-layer corpus: counts by platform_mentioned (spec 3.4)")
    A("")
    A("Category corpus = all units. Nykaa Fashion subset = the Nykaa Fashion row.")
    A("These are reported separately and are never silently pooled.")
    A("")
    A("| platform_mentioned | units | % of corpus |")
    A("|---|---|---|")
    for p, n in by_platform.most_common():
        pct = (100.0 * n / total) if total else 0.0
        A("| " + p + " | " + str(n) + " | " + format(pct, ".1f") + "% |")
    A("")

    A("## Deduplication")
    A("")
    A("- Exact duplicates removed (normalised text identical): " + str(dup_exact))
    A("- Near-identical removed (token Jaccard >= 0.90): " + str(dup_near))
    A("- Texts under 6 tokens are exempt from near-duplicate removal: short")
    A("  statements like \"Saved it but didn't buy\" are genuinely distinct units")
    A("  from different people, not copies.")
    A("")

    A("## Query strategy")
    A("")
    A("All queries are behaviour-anchored (saving / shortlisting / not buying).")
    A("No query names a failure reason -- no fit, stock, price, or forgetting")
    A("terms appear anywhere in the query set. Searching for a reason would")
    A("retrieve that reason and reduce the study to a readout of our own keyword")
    A("list (spec 3.1).")
    A("")
    A("The executed query set is the ALLOWED list from spec 3.1, unextended.")
    A("Full per-query results, including zero-yield queries, are in query_log.csv.")
    A("")
    A("### A note on what 'query' means per source")
    A("")
    A("Reddit supports real server-side search, so each behaviour anchor is a")
    A("genuine query. The Play Store and App Store review endpoints have **no")
    A("server-side search at all** -- you can only page through reviews in bulk")
    A("and filter locally. For those sources `raw_results_returned` is the number")
    A("of reviews *scanned*, and the behaviour anchor is applied as a local regex.")
    A("This distinction is recorded in the `method` column of query_log.csv.")
    A("")

    A("## Known biases")
    A("")
    A("See `artefacts/bias_register.md` for the full register. The entries that")
    A("bear on the counts above:")
    A("")
    A("- **B3** the corpus is currently single-source (app reviews), which is the")
    A("  largest threat to validity and outranks every other entry.")
    A("- **B1** app-store reviews *under*-observe the Decision gate: the genre")
    A("  rewards grievance about the app, not introspection about hesitation.")
    A("- **B2** fashion subreddits *over*-observe Decision, for the opposite")
    A("  reason. B1 and B2 pull against each other on the same gate and are")
    A("  deliberately **not** netted into a correction -- report Decision by")
    A("  source stratum, never as one pooled figure.")
    A("- **B4** Reddit comment-level narratives are absent; this suppresses")
    A("  Return and Intent Decay specifically.")
    A("")

    A(seed_note)
    return "\n".join(L)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--reddit-backend", default="public_json",
                    choices=["public_json", "official_api", "pullpush", "skip"],
                    help="Reddit route. Default is the spec's public_json. "
                         "'skip' records the block without retrying.")
    ap.add_argument("--ack-pullpush", action="store_true",
                    help="Acknowledge that api.pullpush.io returns HTTP 429 with "
                         "an explicit refusal of automated agent traffic, and use "
                         "it anyway. Required for --reddit-backend pullpush. The "
                         "acknowledgement is recorded in the query log and the "
                         "retrieval report.")
    ap.add_argument("--play-max-pages", type=int, default=config.PLAY_MAX_PAGES)
    args = ap.parse_args()

    util.ensure_dirs()
    qlog = util.QueryLog()
    all_units = []
    status = {}

    # ---- Reddit -----------------------------------------------------------
    if args.reddit_backend == "skip":
        util.log("Reddit: SKIPPED by flag (block already established).")
        status["Reddit"] = {
            "status": "**BLOCKED**", "units": 0,
            "detail": "Skipped by --reddit-backend skip. Public JSON endpoint is "
                      "bot-walled (HTTP 403); see probe output in retrieval_report.",
        }
        for line in reddit_src.probe():
            qlog.record(query_string="(route probe)", source="reddit",
                        raw_results_returned=0, units_retained=0,
                        method="diagnostic probe", notes=line)
    else:
        if args.reddit_backend == "pullpush" and not args.ack_pullpush:
            sys.exit(
                "\nREFUSING: --reddit-backend pullpush requires --ack-pullpush.\n\n"
                "api.pullpush.io returns HTTP 429 with:\n"
                '  "This website does not provide free scraping resources for '
                'agents.\n'
                '   Please contact the administrator on Discord if you are '
                'interested in\n   a paid scraping service."\n\n'
                "That is the operator refusing automated traffic, not a transient\n"
                "rate limit. Using it anyway is your call to make explicitly, and\n"
                "it will be recorded in the query log and retrieval report.\n")

        util.log("Reddit: attempting backend=" + args.reddit_backend)
        if args.ack_pullpush:
            qlog.record(query_string="(operator refusal acknowledged)",
                        source="reddit", raw_results_returned=0, units_retained=0,
                        method="backend=pullpush",
                        notes="PM explicitly acknowledged pullpush's HTTP 429 "
                              "refusal of agent traffic and authorised use.")
        try:
            r_units = reddit_src.retrieve(qlog, backend=args.reddit_backend,
                                          require_ack=args.ack_pullpush)
            all_units.extend(r_units)
            status["Reddit"] = {
                "status": "OK", "units": len(r_units),
                "detail": "backend=" + args.reddit_backend,
            }
        except reddit_src.RedditBlocked as exc:
            util.log("!! REDDIT BLOCKED: " + str(exc))
            probe_lines = reddit_src.probe()
            for line in probe_lines:
                util.log("   probe: " + line)
                qlog.record(query_string="(route probe)", source="reddit",
                            raw_results_returned=0, units_retained=0,
                            method="diagnostic probe", notes=line)
            status["Reddit"] = {
                "status": "**BLOCKED**", "units": 0,
                "detail": str(exc)[:300] + " -- NOT substituted with another "
                          "source; awaiting PM decision (spec 7.4).",
            }

    # ---- Play Store -------------------------------------------------------
    try:
        p_units = playstore.retrieve(qlog, max_pages=args.play_max_pages)
        all_units.extend(p_units)
        status["Play Store"] = {
            "status": "OK", "units": len(p_units),
            "detail": "Myntra, AJIO, Nykaa Fashion (com.fsn.nds); India/English; "
                      "bulk pull + behaviour filter",
        }
    except Exception:
        traceback.print_exc()
        status["Play Store"] = {"status": "**FAILED**", "units": 0,
                                "detail": "see traceback in console"}

    # ---- App Store --------------------------------------------------------
    try:
        a_units = appstore.retrieve(qlog)
        all_units.extend(a_units)
        status["App Store"] = {
            "status": "OK", "units": len(a_units),
            "detail": "Apple first-party RSS; hard-capped at ~500 reviews per app",
        }
    except Exception:
        traceback.print_exc()
        status["App Store"] = {"status": "**FAILED**", "units": 0,
                               "detail": "see traceback in console"}

    # ---- Forums -----------------------------------------------------------
    try:
        f_units = webforums.retrieve(qlog)
        all_units.extend(f_units)
        status["Forums / review sites"] = {
            "status": "OK" if f_units else "**DRY**", "units": len(f_units),
            "detail": "MouthShut/Trustpilot/Quora return HTTP 403; reachable "
                      "complaint boards contain no wishlist discussion",
        }
    except Exception:
        traceback.print_exc()
        status["Forums / review sites"] = {"status": "**FAILED**", "units": 0,
                                           "detail": "see traceback in console"}

    # ---- Dedup + write ----------------------------------------------------
    util.log("Deduplicating " + str(len(all_units)) + " units...")
    kept, n_exact, n_near = util.deduplicate(all_units)
    util.log("  removed " + str(n_exact) + " exact, " + str(n_near) + " near-identical")

    corpus_path = util.write_corpus(kept)
    qlog_path = qlog.write()

    seed_note = ("## Reproducibility\n\n"
                 "- Validation draw seed (used in phase 2): "
                 + str(config.RANDOM_SEED) + "\n"
                 "- unit_id is a content hash, so re-running retrieval assigns the\n"
                 "  same id to the same text and hand-coded labels stay joinable.\n")

    report = build_report(kept, qlog, status, n_exact, n_near, seed_note)
    with open(config.RETRIEVAL_REPORT_MD, "w", encoding="utf-8") as f:
        f.write(report)

    util.log("")
    util.log("WROTE " + corpus_path)
    util.log("WROTE " + qlog_path)
    util.log("WROTE " + config.RETRIEVAL_REPORT_MD)
    util.log("")
    by_plat = _counts(kept, "platform_mentioned")
    util.log("TOTAL UNITS: " + str(len(kept)) + "   (target 600-700)")
    util.log("NYKAA FASHION SUBSET: " + str(by_plat.get("Nykaa Fashion", 0))
             + "   (target >= 80)")
    for s, n in _counts(kept, "source").most_common():
        util.log("   " + s + ": " + str(n))

    if len(kept) < config.TARGETS["total_min"]:
        util.log("")
        util.log("!! CORPUS BELOW TARGET -- shortfall documented in retrieval_report.md.")
        util.log("!! Not padded. See 'Source status' for the blocked sources.")


if __name__ == "__main__":
    sys.exit(main())
