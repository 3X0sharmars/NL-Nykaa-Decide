# -*- coding: utf-8 -*-
"""
PHASE 3 -- classify the 120 validation units and compute agreement metrics.

Run:  python phase3_classify.py

DO NOT RUN THIS UNTIL YOU HAVE HAND-CODED THE VALIDATION SET.

There is a hard gate at the top of main(): if artefacts/validation_set_CODED.csv
does not exist, this script exits with an error and classifies nothing. That is
deliberate (spec 6.1) -- it stops you seeing model labels before your own are
committed to disk, which would turn the agreement statistics into a measure of
anchoring rather than agreement.

Writes:
    artefacts/validation_set_MODEL.csv   -- per-unit model output
    artefacts/validation_report.md       -- the metrics

Scope note: this classifies THE 120 VALIDATION UNITS ONLY. It never touches the
full corpus. The full run is a separate decision the PM makes after reading the
validation report.
"""

import csv
import os
import sys
from collections import Counter, defaultdict

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import config
import util
import classifier
from codebook import (CODEBOOK_VERSION, GATES, WATCHED_CONFUSION_PAIRS,
                      codebook_fingerprint)

KAPPA_THRESHOLD = 0.70
TAXONOMY_FAILURE_THRESHOLD = 5.0  # percent of high-intent units


# ---------------------------------------------------------------------------
# The hard gate (spec 6.1)
# ---------------------------------------------------------------------------
def enforce_coded_file_gate():
    if not os.path.exists(config.VALIDATION_CODED_CSV):
        sys.exit(
            "\n" + "=" * 74 + "\n"
            "REFUSING TO RUN -- hand-coded validation file not found.\n"
            + "=" * 74 + "\n\n"
            "Expected:\n    " + config.VALIDATION_CODED_CSV + "\n\n"
            "This gate is deliberate (spec 6.1). Phase 3 will not classify\n"
            "anything until your own labels exist on disk, because seeing model\n"
            "output first would contaminate your coding and make the agreement\n"
            "statistics meaningless.\n\n"
            "What to do:\n"
            "  1. Run  python phase2_sample.py  if you have not already.\n"
            "  2. Hand-code artefacts/validation_set_BLANK.csv using codebook "
            + CODEBOOK_VERSION + ".\n"
            "  3. Save it as validation_set_CODED.csv in the artefacts folder.\n"
            "  4. Re-run this script.\n"
        )


def _norm(v):
    return (v or "").strip().upper()


def load_coded():
    with open(config.VALIDATION_CODED_CSV, "r", encoding="utf-8-sig", newline="") as f:
        rows = list(csv.DictReader(f))

    required = {"unit_id", "text", "human_intent", "human_gate"}
    missing = required - set(rows[0].keys() if rows else [])
    if missing:
        sys.exit("ERROR: validation_set_CODED.csv is missing columns: "
                 + ", ".join(sorted(missing)))

    problems = []
    for r in rows:
        intent = _norm(r["human_intent"])
        gate = _norm(r["human_gate"])
        if intent not in ("HIGH_INTENT", "EXCLUDE"):
            problems.append(r["unit_id"] + ": human_intent=" + repr(r["human_intent"])
                            + " (must be HIGH_INTENT or EXCLUDE)")
        if intent == "HIGH_INTENT":
            if gate not in GATES:
                problems.append(r["unit_id"] + ": human_gate=" + repr(r["human_gate"])
                                + " (must be one of " + ", ".join(GATES) + ")")
            if gate == "OTHER" and _norm(r.get("human_other_subtype")) not in (
                    "INSUFFICIENT_INFO", "TAXONOMY_FAILURE"):
                problems.append(r["unit_id"] + ": gate is OTHER but "
                                "human_other_subtype is not set to "
                                "INSUFFICIENT_INFO or TAXONOMY_FAILURE")
    if problems:
        print("\nERROR: your coded file has problems. Fix these and re-run:\n")
        for p in problems:
            print("  - " + p)
        sys.exit(1)

    return rows


# ---------------------------------------------------------------------------
# Metrics
# ---------------------------------------------------------------------------
def cohens_kappa(a, b, labels):
    """
    Cohen's kappa. Uses scikit-learn when available; otherwise computes it
    directly so the pipeline is not blocked by a missing dependency.
    """
    try:
        from sklearn.metrics import cohen_kappa_score
        return float(cohen_kappa_score(a, b, labels=labels))
    except ImportError:
        n = len(a)
        if n == 0:
            return float("nan")
        po = sum(1 for x, y in zip(a, b) if x == y) / n
        ca, cb = Counter(a), Counter(b)
        pe = sum((ca[l] / n) * (cb[l] / n) for l in labels)
        if pe == 1.0:
            return float("nan")
        return (po - pe) / (1 - pe)


def confusion_matrix(human, model, labels):
    m = {h: {g: 0 for g in labels} for h in labels}
    for h, g in zip(human, model):
        if h in m and g in m[h]:
            m[h][g] += 1
    return m


def render_matrix(m, labels):
    short = {"RETURN": "RET", "PURCHASABILITY": "PUR", "INTENT_DECAY": "DEC-",
             "DECISION": "DECN", "SUBSTITUTION": "SUB", "LATENCY": "LAT",
             "ECONOMIC": "ECO", "OTHER": "OTH"}
    w = 6
    lines = []
    header = "human \\ model".ljust(16) + "".join(short[l].rjust(w) for l in labels) + "   total"
    lines.append(header)
    lines.append("-" * len(header))
    for h in labels:
        row_total = sum(m[h].values())
        lines.append(short[h].ljust(16)
                     + "".join(str(m[h][g]).rjust(w) for g in labels)
                     + str(row_total).rjust(8))
    lines.append("-" * len(header))
    lines.append("total".ljust(16)
                 + "".join(str(sum(m[h][g] for h in labels)).rjust(w) for g in labels))
    lines.append("")
    lines.append("Key: RET=Return  PUR=Purchasability  DEC-=Intent Decay  "
                 "DECN=Decision")
    lines.append("     SUB=Substitution  LAT=Latency  ECO=Economic  OTH=Other")
    return "\n".join(lines)


def main():
    enforce_coded_file_gate()

    coded = load_coded()
    util.log("Loaded " + str(len(coded)) + " hand-coded units.")

    client = classifier.get_client()
    model_name = os.environ.get("CLASSIFIER_MODEL", classifier.DEFAULT_MODEL)
    util.log("Classifying with " + model_name + " (temperature 0, one unit per call)...")

    model_rows = []
    quote_failures = []
    hard_failures = []

    for i, r in enumerate(coded, 1):
        uid, text = r["unit_id"], r["text"]
        try:
            out = classifier.classify_unit(client, uid, text, model=model_name)
        except Exception as exc:
            util.log("  !! " + uid + " FAILED: " + str(exc))
            hard_failures.append((uid, str(exc)))
            continue
        if not out["quote_verified"]:
            quote_failures.append({
                "unit_id": uid,
                "quote": out["supporting_quote"],
                "text": text,
            })
        model_rows.append(out)
        if i % 10 == 0:
            util.log("  " + str(i) + "/" + str(len(coded)))

    # Persist raw model output.
    with open(config.CLASSIFIED_CSV, "w", newline="", encoding="utf-8-sig") as f:
        cols = ["unit_id", "intent", "intent_reason", "primary_gate",
                "other_subtype", "gate_reason", "secondary_metadata",
                "supporting_quote", "quote_verified", "n_attempts", "model",
                "codebook_version", "codebook_fingerprint"]
        w = csv.DictWriter(f, fieldnames=cols, extrasaction="ignore")
        w.writeheader()
        for m in model_rows:
            row = dict(m)
            row["secondary_metadata"] = "; ".join(m["secondary_metadata"])
            w.writerow(row)
    util.log("WROTE " + config.CLASSIFIED_CSV)

    # ---- join -------------------------------------------------------------
    mby = {m["unit_id"]: m for m in model_rows}
    joined = [(r, mby[r["unit_id"]]) for r in coded if r["unit_id"] in mby]

    # ---- 1. exclusion agreement (reported first, spec 6.5.1) --------------
    n_all = len(joined)
    intent_agree = sum(1 for h, m in joined
                       if _norm(h["human_intent"]) == m["intent"])
    intent_pct = (100.0 * intent_agree / n_all) if n_all else 0.0

    intent_cm = Counter()
    for h, m in joined:
        intent_cm[(_norm(h["human_intent"]), m["intent"])] += 1

    # ---- 2/3. gate metrics over BOTH-high-intent units --------------------
    both = [(h, m) for h, m in joined
            if _norm(h["human_intent"]) == "HIGH_INTENT" and m["intent"] == "HIGH_INTENT"]
    hg = [_norm(h["human_gate"]) for h, _ in both]
    mg = [m["primary_gate"] for _, m in both]

    gate_agree = sum(1 for a, b in zip(hg, mg) if a == b)
    gate_pct = (100.0 * gate_agree / len(both)) if both else 0.0
    kappa = cohens_kappa(hg, mg, GATES) if both else float("nan")

    cm = confusion_matrix(hg, mg, GATES)

    # ---- 5. other rates ---------------------------------------------------
    n_hi_model = sum(1 for _, m in joined if m["intent"] == "HIGH_INTENT")
    n_8a = sum(1 for _, m in joined
               if m["intent"] == "HIGH_INTENT" and m["primary_gate"] == "OTHER"
               and m["other_subtype"] == "INSUFFICIENT_INFO")
    n_8b = sum(1 for _, m in joined
               if m["intent"] == "HIGH_INTENT" and m["primary_gate"] == "OTHER"
               and m["other_subtype"] == "TAXONOMY_FAILURE")
    pct_8a = (100.0 * n_8a / n_hi_model) if n_hi_model else 0.0
    pct_8b = (100.0 * n_8b / n_hi_model) if n_hi_model else 0.0

    # ---- 6. decision rule -------------------------------------------------
    kappa_ok = (kappa == kappa) and kappa >= KAPPA_THRESHOLD  # NaN-safe
    tax_ok = pct_8b <= TAXONOMY_FAILURE_THRESHOLD
    verdict = "PASS" if (kappa_ok and tax_ok) else "FAIL"

    # ---- report -----------------------------------------------------------
    L = []
    A = L.append
    A("# Validation Report")
    A("")
    A("- Codebook: " + CODEBOOK_VERSION + " (fingerprint " + codebook_fingerprint() + ")")
    A("- Model: " + model_name + ", temperature 0, one unit per call")
    A("- Units hand-coded: " + str(len(coded)))
    A("- Units successfully classified: " + str(len(model_rows)))
    if hard_failures:
        A("- **Classification failures: " + str(len(hard_failures)) + "** (listed at end)")
    A("- Validation draw seed: " + str(config.RANDOM_SEED))
    A("")
    A("## VERDICT: " + verdict)
    A("")
    A("```")
    A("kappa >= 0.70  AND  8B <= 5%   -> PASS")
    A("")
    A("  Cohen's kappa : " + format(kappa, ".3f") + "   -> " + ("ok" if kappa_ok else "FAIL"))
    A("  8B rate       : " + format(pct_8b, ".1f") + "%    -> " + ("ok" if tax_ok else "FAIL"))
    A("```")
    A("")
    if verdict == "FAIL":
        A("> **On FAIL, the prompt must NOT be tuned to raise this score.** That")
        A("> would be fitting the classifier to the hand-coded labels and it")
        A("> invalidates the exercise. The diagnosis below identifies which")
        A("> confusion cell is bleeding. **The PM decides the codebook fix**, the")
        A("> codebook is re-frozen as v1.2, and only then is anything re-coded.")
        A("")

    A("## 1. Exclusion agreement (reported first, spec 6.5.1)")
    A("")
    A("Human vs model on the section 4.1 intent filter, over all "
      + str(n_all) + " units.")
    A("")
    A("- **Agreement: " + format(intent_pct, ".1f") + "%** ("
      + str(intent_agree) + "/" + str(n_all) + ")")
    A("")
    A("| human \\ model | HIGH_INTENT | EXCLUDE |")
    A("|---|---|---|")
    for h in ("HIGH_INTENT", "EXCLUDE"):
        A("| " + h + " | " + str(intent_cm[(h, "HIGH_INTENT")])
          + " | " + str(intent_cm[(h, "EXCLUDE")]) + " |")
    A("")
    A("This matters on its own: if the intent filter does not agree, the gate")
    A("metrics below are computed over a set the two coders do not even agree")
    A("is in scope.")
    A("")

    A("## 2. Gate raw agreement")
    A("")
    A("Over the " + str(len(both)) + " units BOTH parties marked HIGH_INTENT.")
    A("")
    A("- **Raw agreement: " + format(gate_pct, ".1f") + "%** ("
      + str(gate_agree) + "/" + str(len(both)) + ")")
    A("")

    A("## 3. Cohen's kappa")
    A("")
    A("- **kappa = " + format(kappa, ".3f") + "** across the 8 classes, over the same "
      + str(len(both)) + " units.")
    A("")
    A("Raw agreement overstates performance when one class dominates; kappa")
    A("corrects for agreement expected by chance given both coders' marginals.")
    A("")

    A("## 4. Confusion matrix (8x8)")
    A("")
    A("Rows = your label. Columns = model label.")
    A("")
    A("```")
    A(render_matrix(cm, GATES))
    A("```")
    A("")
    A("### The six watched cells")
    A("")
    A("| pair | human->model | model->human | combined |")
    A("|---|---|---|---|")
    watched = []
    for a, b in WATCHED_CONFUSION_PAIRS:
        ab, ba = cm[a][b], cm[b][a]
        watched.append((a, b, ab + ba))
        A("| " + a + " <-> " + b + " | " + str(ab) + " | " + str(ba)
          + " | **" + str(ab + ba) + "** |")
    A("")

    A("## 5. Other rates")
    A("")
    A("As a percentage of the " + str(n_hi_model) + " units the model marked HIGH_INTENT.")
    A("")
    A("| subtype | n | % of high-intent |")
    A("|---|---|---|")
    A("| 8A insufficient information | " + str(n_8a) + " | " + format(pct_8a, ".1f") + "% |")
    A("| 8B taxonomy failure | " + str(n_8b) + " | " + format(pct_8b, ".1f") + "% |")
    A("")
    A("8A is a coverage limitation and is expected to be common -- it says the")
    A("evidence was thin, not that the taxonomy is wrong. 8B is the number that")
    A("judges the codebook: it is the rate at which a clearly-stated purchase")
    A("barrier fits none of the seven gates.")
    A("")

    A("## 6. Quote verification")
    A("")
    A("Every supporting_quote is checked programmatically as an exact substring")
    A("of the unit text. A miss is a hallucination signal.")
    A("")
    A("- **Failures: " + str(len(quote_failures)) + "** of " + str(len(model_rows)))
    A("")
    if quote_failures:
        for q in quote_failures:
            A("**" + q["unit_id"] + "**")
            A("")
            A("- claimed quote: `" + (q["quote"] or "")[:300] + "`")
            A("- not a substring of the unit text")
            A("")

    if verdict == "FAIL":
        A("## Diagnosis -- which cell is bleeding")
        A("")
        watched.sort(key=lambda x: -x[2])
        worst = [w for w in watched if w[2] > 0][:3]
        if worst:
            A("Ranked by disagreement volume:")
            A("")
            for a, b, n in worst:
                A("1. **" + a + " <-> " + b + "** -- " + str(n) + " disagreements")
            A("")
            A("The largest cell is **" + worst[0][0] + " <-> " + worst[0][1]
              + "**. The boundary between these two definitions is where the")
            A("codebook is underdetermined against real evidence.")
            A("")
        off = [(h, g, cm[h][g]) for h in GATES for g in GATES
               if h != g and cm[h][g] > 0]
        off.sort(key=lambda x: -x[2])
        unwatched = [o for o in off
                     if (o[0], o[1]) not in WATCHED_CONFUSION_PAIRS
                     and (o[1], o[0]) not in WATCHED_CONFUSION_PAIRS][:5]
        if unwatched:
            A("Disagreements OUTSIDE the six pre-registered cells:")
            A("")
            for h, g, n in unwatched:
                A("- human " + h + " -> model " + g + ": " + str(n))
            A("")
            A("These were not anticipated when the codebook was frozen and may")
            A("matter more than the watched cells.")
            A("")
        A("**Next step is yours.** Per spec 6.6: I report the diagnosis, you")
        A("decide the codebook fix, it is re-frozen as v1.2, then we re-code and")
        A("recalculate. I have not adjusted the prompt.")
        A("")

    if hard_failures:
        A("## Classification failures")
        A("")
        for uid, err in hard_failures:
            A("- " + uid + ": " + err[:200])
        A("")

    with open(config.VALIDATION_REPORT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(L))

    # ---- console summary --------------------------------------------------
    print("")
    print("=" * 74)
    print("VALIDATION COMPLETE -- verdict: " + verdict)
    print("=" * 74)
    print("  exclusion agreement : " + format(intent_pct, ".1f") + "%  ("
          + str(intent_agree) + "/" + str(n_all) + ")")
    print("  gate raw agreement  : " + format(gate_pct, ".1f") + "%  ("
          + str(gate_agree) + "/" + str(len(both)) + ")")
    print("  Cohen's kappa       : " + format(kappa, ".3f")
          + "   (threshold 0.70)")
    print("  8A insufficient info: " + format(pct_8a, ".1f") + "%")
    print("  8B taxonomy failure : " + format(pct_8b, ".1f")
          + "%   (threshold 5.0)")
    print("  quote failures      : " + str(len(quote_failures)))
    print("")
    print("  WROTE " + config.VALIDATION_REPORT_MD)
    if verdict == "FAIL":
        print("")
        print("  FAIL. Prompt NOT tuned. Read the Diagnosis section and decide")
        print("  the codebook fix yourself -- see spec 6.6.")


if __name__ == "__main__":
    main()
