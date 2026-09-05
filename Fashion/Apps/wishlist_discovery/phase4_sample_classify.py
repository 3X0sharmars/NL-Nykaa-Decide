# -*- coding: utf-8 -*-
"""
PHASE 4 -- classify a RANDOM SAMPLE of gate-eligible units. Sample, not census.

Run:  python phase4_sample_classify.py --model <chosen> --batch-size <n>
      python phase4_sample_classify.py --dry-run     # show the draw, call nothing

A census of the corpus is unaffordable on a free tier and unnecessary: a
random n=400 estimates gate shares to roughly +/-5 points, which is finer than
the biases in the register. Precision beyond that would be false comfort.

TWO HARD GATES, both deliberate:
  1. validation_report.md must exist and record a PASS. Classifying the corpus
     before the human validation gate has been cleared would produce numbers
     with no established agreement behind them.
  2. Sources that failed the relevance audit, and verticals outside
     {fashion, mixed}, are excluded from the frame.

Reporting rules:
  * Gate shares carry 95% Wilson confidence intervals reflecting the ACTUAL n.
  * A partial run is NEVER presented as complete. If quota stops the run
    early, the report says how many units were actually classified and labels
    the result partial.
  * Category-level and Nykaa-specific counts stay separate columns.
"""

import argparse
import csv
import json
import math
import os
import random
import sys
import time
from collections import Counter

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import config
import util
import providers
import batch_classify
from codebook import CODEBOOK_VERSION, GATES, codebook_fingerprint

CHECKPOINT = os.path.join(config.ARTEFACTS_DIR, "phase4_checkpoint.jsonl")
OUT_CSV = os.path.join(config.ARTEFACTS_DIR, "phase4_classified.csv")
OUT_MD = os.path.join(config.ARTEFACTS_DIR, "phase4_report.md")


def enforce_validation_passed(skip=False):
    if skip:
        util.log("!! --skip-validation-gate used: results are NOT validated.")
        return
    path = config.VALIDATION_REPORT_MD
    if not os.path.exists(path):
        sys.exit(
            "\nREFUSING TO RUN -- no validation report.\n\n"
            "Expected: " + path + "\n\n"
            "Phase 4 estimates gate shares for the corpus. Doing that before the\n"
            "human validation gate has been cleared would produce numbers with no\n"
            "established human-model agreement behind them.\n\n"
            "Run phase3_classify.py first (which itself requires your hand-coded\n"
            "file), and confirm the verdict is PASS.\n")
    with open(path, "r", encoding="utf-8") as f:
        head = f.read(4000)
    if "## VERDICT: PASS" not in head:
        sys.exit(
            "\nREFUSING TO RUN -- validation did not PASS.\n\n"
            + path + " does not record '## VERDICT: PASS'.\n"
            "Per spec 6.6 the codebook fix is the PM's decision. Do not classify\n"
            "the corpus on a failed validation.\n")


def wilson(k, n, z=1.96):
    """95% Wilson score interval. Correct for small counts, unlike normal approx."""
    if n == 0:
        return (0.0, 0.0)
    p = k / n
    d = 1 + z * z / n
    centre = (p + z * z / (2 * n)) / d
    half = (z * math.sqrt(p * (1 - p) / n + z * z / (4 * n * n))) / d
    return (max(0.0, centre - half), min(1.0, centre + half))


def load_frame():
    with open(config.CORPUS_CSV, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))
    frame = [r for r in rows
             if r.get("source") not in config.FAILED_RELEVANCE_SOURCES
             and r.get("vertical") in config.GATE_ELIGIBLE_VERTICALS]
    return rows, frame


def load_checkpoint():
    if not os.path.exists(CHECKPOINT):
        return {}
    out = {}
    with open(CHECKPOINT, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            if line:
                try:
                    r = json.loads(line)
                    out[r["unit_id"]] = r
                except json.JSONDecodeError:
                    pass
    return out


def append_checkpoint(results):
    os.makedirs(config.ARTEFACTS_DIR, exist_ok=True)
    with open(CHECKPOINT, "a", encoding="utf-8") as f:
        for r in results:
            f.write(json.dumps(r, ensure_ascii=False) + "\n")
        f.flush()
        os.fsync(f.fileno())


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--model", default=config.CLASSIFIER_MODEL)
    ap.add_argument("--batch-size", type=int, default=1)
    ap.add_argument("--n", type=int, default=config.CLASSIFY_SAMPLE_SIZE)
    ap.add_argument("--spacing", type=float, default=4.0)
    ap.add_argument("--dry-run", action="store_true")
    ap.add_argument("--skip-validation-gate", action="store_true",
                    help="ONLY for pipeline testing. Results are not validated.")
    args = ap.parse_args()

    if not args.dry_run:
        enforce_validation_passed(args.skip_validation_gate)

    all_rows, frame = load_frame()
    util.log("Corpus " + str(len(all_rows)) + " -> frame " + str(len(frame))
             + " (relevance + vertical gates applied)")

    n = min(args.n, len(frame))
    rng = random.Random(config.CLASSIFY_SAMPLE_SEED)
    ordered = sorted(frame, key=lambda r: r["unit_id"])
    sample = rng.sample(ordered, n)
    util.log("Sample n=" + str(n) + " seed=" + str(config.CLASSIFY_SAMPLE_SEED))

    if args.dry_run:
        print("")
        print("DRY RUN -- no model calls made.")
        print("  frame        : " + str(len(frame)))
        print("  sample n     : " + str(n))
        print("  seed         : " + str(config.CLASSIFY_SAMPLE_SEED))
        print("  by platform  : " + str(dict(Counter(r["platform_mentioned"]
                                                     for r in sample))))
        print("  by source    : " + str(dict(Counter(r["source"] for r in sample))))
        halfwidth = wilson(int(0.25 * n), n)
        print("  at n=" + str(n) + ", a 25% share carries a 95% CI of roughly "
              + format(100 * halfwidth[0], ".1f") + "%-"
              + format(100 * halfwidth[1], ".1f") + "%")
        return

    done = load_checkpoint()
    todo = [r for r in sample if r["unit_id"] not in done]
    util.log("Resuming: " + str(len(done)) + " done, " + str(len(todo)) + " to go")

    stopped = None
    issues_all = []
    for chunk in batch_classify.chunked(todo, args.batch_size):
        units = [{"unit_id": r["unit_id"], "text": r["text"]} for r in chunk]
        try:
            results, issues = batch_classify.classify_batch(units, args.model)
        except providers.TransportError as exc:
            stopped = "quota/transport: " + str(exc)[:200]
            util.log("!! stopping: " + stopped)
            break
        issues_all.extend(issues)
        append_checkpoint(results)
        for r in results:
            done[r["unit_id"]] = r
        util.log("  " + str(len(done)) + "/" + str(n))
        time.sleep(args.spacing)

    classified = [done[r["unit_id"]] for r in sample if r["unit_id"] in done]
    meta = {r["unit_id"]: r for r in sample}

    with open(OUT_CSV, "w", newline="", encoding="utf-8-sig") as f:
        cols = ["unit_id", "intent", "primary_gate", "other_subtype",
                "gate_reason", "supporting_quote", "quote_verified",
                "platform_mentioned", "vertical", "source", "model"]
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for r in classified:
            row = dict(r)
            m = meta.get(r["unit_id"], {})
            row["platform_mentioned"] = m.get("platform_mentioned", "")
            row["vertical"] = m.get("vertical", "")
            row["source"] = m.get("source", "")
            w.writerow(row)

    # ---- report ----
    n_done = len(classified)
    partial = n_done < n
    hi = [r for r in classified if r["intent"] == "HIGH_INTENT"]
    gate_counts = Counter(r["primary_gate"] for r in hi)
    nykaa = [r for r in hi
             if meta.get(r["unit_id"], {}).get("platform_mentioned") == "Nykaa Fashion"]
    nykaa_counts = Counter(r["primary_gate"] for r in nykaa)
    quote_fail = sum(1 for r in classified if not r["quote_verified"])
    cross = [i for i in issues_all if i["type"] == "CROSS_CONTAMINATION"]

    L = ["# Phase 4 -- Gate Shares (random sample)", "",
         "Codebook " + CODEBOOK_VERSION + " (" + codebook_fingerprint() + ")",
         "Model `" + args.model + "`, temperature 0, batch size "
         + str(args.batch_size),
         "Sample seed " + str(config.CLASSIFY_SAMPLE_SEED), ""]
    if partial:
        L += ["> **PARTIAL RUN.** " + str(n_done) + " of " + str(n)
              + " sampled units were classified before the run stopped"
              + ((" (" + stopped + ")") if stopped else "") + ".",
              "> All figures below are computed on n=" + str(n_done)
              + " and are NOT a complete run of the intended sample.", ""]
    L += ["- Frame (gate-eligible, relevance-passed): " + str(len(frame)),
          "- Intended sample: " + str(n),
          "- Classified: " + str(n_done),
          "- HIGH_INTENT: " + str(len(hi)),
          "- Quote-verification failures: " + str(quote_fail),
          "- Cross-contamination events: " + str(len(cross)), "",
          "## Gate shares, category level",
          "",
          "Shares are of the " + str(len(hi)) + " HIGH_INTENT units. 95% Wilson "
          "intervals.", "",
          "| gate | n | share | 95% CI |", "|---|---:|---:|---|"]
    for g in GATES:
        k = gate_counts.get(g, 0)
        lo, hiCI = wilson(k, len(hi))
        share = (100.0 * k / len(hi)) if hi else 0.0
        L.append("| " + g + " | " + str(k) + " | " + format(share, ".1f") + "% | "
                 + format(100 * lo, ".1f") + "%-" + format(100 * hiCI, ".1f") + "% |")
    L += ["", "## Nykaa Fashion subset (reported separately, never pooled)", "",
          "n = " + str(len(nykaa)) + " HIGH_INTENT Nykaa Fashion units.", ""]
    if nykaa:
        L += ["| gate | n | share | 95% CI |", "|---|---:|---:|---|"]
        for g in GATES:
            k = nykaa_counts.get(g, 0)
            lo, hiCI = wilson(k, len(nykaa))
            L.append("| " + g + " | " + str(k) + " | "
                     + format(100.0 * k / len(nykaa), ".1f") + "% | "
                     + format(100 * lo, ".1f") + "%-" + format(100 * hiCI, ".1f") + "% |")
        L += ["", "This base is small; the intervals are correspondingly wide.", ""]
    # ---- multi-model split check (PM directive) ------------------------
    models_used = Counter(r.get("model", "?") for r in hi)
    L += ["", "## Instrument check", "",
          "Models used on this sample: "
          + ", ".join("`" + m + "` (" + str(n) + ")"
                      for m, n in models_used.most_common()), ""]
    if len(models_used) > 1:
        L += ["The sample was split across more than one qualified model. Every "
              "unit records which model classified it (column `model` in "
              "phase4_classified.csv). Gate shares are compared below.", "",
              "| gate | " + " | ".join("`" + m + "`" for m in models_used) + " | max gap (pp) |",
              "|---" * (len(models_used) + 2) + "|"]
        material = []
        for g in GATES:
            shares = []
            for m in models_used:
                sub = [r for r in hi if r.get("model") == m]
                k = sum(1 for r in sub if r["primary_gate"] == g)
                shares.append(100.0 * k / len(sub) if sub else 0.0)
            gap = (max(shares) - min(shares)) if shares else 0.0
            if gap >= config.MODEL_SHARE_DIVERGENCE_PP:
                material.append((g, gap))
            L.append("| " + g + " | "
                     + " | ".join(format(s, ".1f") + "%" for s in shares)
                     + " | " + format(gap, ".1f") + " |")
        L.append("")
        if material:
            L += ["> **MATERIAL DIVERGENCE BETWEEN INSTRUMENTS.** These gates differ "
                  "by at least " + format(config.MODEL_SHARE_DIVERGENCE_PP, ".0f")
                  + " percentage points depending on which model classified the unit:",
                  ""]
            for g, gap in sorted(material, key=lambda x: -x[1]):
                L.append("> - **" + g + "**: " + format(gap, ".1f") + " pp spread")
            L += ["",
                  "> This is a FINDING, not something to average away. Two models "
                  "that both pass the adversarial set are still disagreeing on real "
                  "evidence, which means the boundary is underdetermined against "
                  "this corpus rather than against the test cases. The PM decides "
                  "what to do about it.", ""]
        else:
            L += ["No gate differs by " + format(config.MODEL_SHARE_DIVERGENCE_PP, ".0f")
                  + " percentage points or more across instruments.", ""]
    else:
        L += ["Single instrument -- no cross-model comparison required.", ""]

    L += ["", "## Interpretation limits", "",
          "See `bias_register.md`. In particular B3 and B4: Decision, Intent "
          "Decay and Latency are LOWER BOUNDS, not estimates, because no "
          "long-form community prose and no short-form social are present in "
          "this corpus.", ""]
    with open(OUT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(L))

    print("")
    print("Classified " + str(n_done) + "/" + str(n)
          + ("  [PARTIAL]" if partial else "  [complete]"))
    print("WROTE " + OUT_CSV)
    print("WROTE " + OUT_MD)


if __name__ == "__main__":
    main()
