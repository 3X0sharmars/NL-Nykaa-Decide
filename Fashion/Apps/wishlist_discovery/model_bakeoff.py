# -*- coding: utf-8 -*-
"""
Qualify a classifier against the 11-case adversarial set.

Run:  python model_bakeoff.py                          # all candidates, batch 1
      python model_bakeoff.py --models a,b,c
      python model_bakeoff.py --batch-sizes 1,5,10 --models <winner>

SELECTION RULE (fixed by the PM, applied mechanically here):
    the classifier is the cheapest-quota model scoring 11/11 with ZERO
    classification failures. If none reaches 11/11, report and STOP.

Two failure kinds are counted separately and never merged:
    transport      -- API/parse; says nothing about the codebook
    classification -- model returned a label and crossed a boundary

For each classification failure the report names the boundary crossed
(expected -> got), because that is what the PM needs in order to decide a
codebook fix. This script NEVER edits the codebook or the prompt.

Batch mode additionally verifies, at every batch size, that each
supporting_quote is an exact substring of ITS OWN unit, and flags
cross-contamination between units sharing a call.
"""

import argparse
import json
import os
import time
from collections import Counter

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import config
import providers
import batch_classify
from adversarial_test import ADVERSARIAL_SET
from codebook import CODEBOOK_VERSION, codebook_fingerprint

DEFAULT_CANDIDATES = [
    "nvidia/nemotron-3-ultra-550b-a55b",
    "nvidia/nemotron-3-super-120b-a12b",
    "nvidia/llama-3.3-nemotron-super-49b-v1.5",
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3-flash-preview",
]


def _expected(exp_gate, exp_intent, exp_sub):
    if exp_intent == "EXCLUDE":
        return "EXCLUDE"
    return exp_gate + ("/" + exp_sub if exp_sub else "")


def _got(r):
    if r.get("intent") == "EXCLUDE":
        return "EXCLUDE"
    g = r.get("primary_gate") or "?"
    return g + ("/" + str(r["other_subtype"]) if r.get("other_subtype") else "")


def _passed(r, exp_gate, exp_intent, exp_sub):
    if exp_intent == "EXCLUDE":
        return r.get("intent") == "EXCLUDE"
    if r.get("intent") != "HIGH_INTENT":
        return False
    if r.get("primary_gate") != exp_gate:
        return False
    if exp_sub and r.get("other_subtype") != exp_sub:
        return False
    return True


def run_model(model, batch_size, spacing=4.0):
    """Returns a dict summarising this model at this batch size."""
    units = [{"unit_id": "adv_" + str(i).zfill(2), "text": t}
             for i, (t, _, _, _) in enumerate(ADVERSARIAL_SET, 1)]
    expect = {"adv_" + str(i).zfill(2): (g, it, s)
              for i, (_, g, it, s) in enumerate(ADVERSARIAL_SET, 1)}

    got_by_id = {}
    transport = []
    all_issues = []

    for chunk in batch_classify.chunked(units, batch_size):
        try:
            results, issues = batch_classify.classify_batch(chunk, model)
            all_issues.extend(issues)
            for r in results:
                got_by_id[r["unit_id"]] = r
        except providers.TransportError as exc:
            for u in chunk:
                transport.append({"unit_id": u["unit_id"], "status": exc.status,
                                  "permanent": exc.permanent, "msg": str(exc)[:180]})
            if exc.permanent:
                break
        except SystemExit:
            raise
        except Exception as exc:
            for u in chunk:
                transport.append({"unit_id": u["unit_id"], "status": None,
                                  "permanent": False,
                                  "msg": exc.__class__.__name__ + ": " + str(exc)[:150]})
        time.sleep(spacing)

    n_pass = 0
    boundary_failures = []
    for uid, (g, it, s) in expect.items():
        r = got_by_id.get(uid)
        if r is None:
            continue
        if _passed(r, g, it, s):
            n_pass += 1
        else:
            boundary_failures.append({
                "unit_id": uid,
                "text": next(t for t, gg, ii, ss in ADVERSARIAL_SET
                             if "adv_" + str(ADVERSARIAL_SET.index((t, gg, ii, ss)) + 1).zfill(2) == uid),
                "expected": _expected(g, it, s),
                "got": _got(r),
                "reason": (r.get("gate_reason") or "")[:200],
            })

    quote_bad = [i for i in all_issues if i["type"] == "quote_not_verbatim"]
    cross = [i for i in all_issues if i["type"] == "CROSS_CONTAMINATION"]
    id_issues = [i for i in all_issues
                 if i["type"] in ("missing_from_response", "duplicate_unit_id",
                                  "unknown_unit_id")]

    return {
        "model": model,
        "batch_size": batch_size,
        "total": len(ADVERSARIAL_SET),
        "passed": n_pass,
        "classification_failures": len(boundary_failures),
        "transport_failures": len(transport),
        "boundary_failures": boundary_failures,
        "transport": transport,
        "quote_not_verbatim": len(quote_bad),
        "cross_contamination": len(cross),
        "cross_detail": cross,
        "id_issues": len(id_issues),
    }


def print_summary(rows):
    print("")
    print("=" * 96)
    print("ADVERSARIAL BAKE-OFF -- codebook " + CODEBOOK_VERSION
          + " (" + codebook_fingerprint() + ")")
    print("=" * 96)
    hdr = ("model".ljust(44) + "batch".rjust(6) + "passed".rjust(8)
           + "classif".rjust(9) + "transp".rjust(8) + "quote!".rjust(8)
           + "cross".rjust(7))
    print(hdr)
    print("-" * len(hdr))
    for r in rows:
        print(r["model"].ljust(44)
              + str(r["batch_size"]).rjust(6)
              + (str(r["passed"]) + "/" + str(r["total"])).rjust(8)
              + str(r["classification_failures"]).rjust(9)
              + str(r["transport_failures"]).rjust(8)
              + str(r["quote_not_verbatim"]).rjust(8)
              + str(r["cross_contamination"]).rjust(7))
    print("")
    for r in rows:
        if r["boundary_failures"]:
            print("  " + r["model"] + " (batch " + str(r["batch_size"])
                  + ") -- boundaries crossed:")
            for b in r["boundary_failures"]:
                print("     expected " + b["expected"].ljust(24)
                      + " got " + b["got"])
                print("        " + b["text"][:90])
                print("        model reason: " + b["reason"][:140])
        if r["cross_detail"]:
            print("  " + r["model"] + " (batch " + str(r["batch_size"])
                  + ") -- CROSS-CONTAMINATION:")
            for c in r["cross_detail"]:
                print("     " + c["unit_id"] + " quoted from "
                      + c["quote_belongs_to"] + ": " + repr(c["quote"][:70]))


def write_report(rows, path=None):
    path = path or os.path.join(config.ARTEFACTS_DIR, "model_bakeoff.md")
    L = ["# Classifier Bake-Off", "",
         "Codebook " + CODEBOOK_VERSION + " (fingerprint " + codebook_fingerprint() + ")",
         "Temperature 0. 11-case adversarial set.", "",
         "Selection rule: cheapest-quota model scoring **11/11 with zero "
         "classification failures**.", "",
         "| model | batch | passed | classification failures | transport failures "
         "| non-verbatim quotes | cross-contamination |",
         "|---|---:|---:|---:|---:|---:|---:|"]
    for r in rows:
        L.append("| `" + r["model"] + "` | " + str(r["batch_size"]) + " | "
                 + str(r["passed"]) + "/" + str(r["total"]) + " | "
                 + str(r["classification_failures"]) + " | "
                 + str(r["transport_failures"]) + " | "
                 + str(r["quote_not_verbatim"]) + " | "
                 + str(r["cross_contamination"]) + " |")
    L.append("")
    for r in rows:
        if r["boundary_failures"] or r["cross_detail"] or r["transport"]:
            L.append("## `" + r["model"] + "` batch " + str(r["batch_size"]))
            L.append("")
        for b in r["boundary_failures"]:
            L.append("**Boundary crossed** — expected `" + b["expected"]
                     + "`, got `" + b["got"] + "`")
            L.append("")
            L.append("> " + b["text"])
            L.append("")
            L.append("Model's stated reason: " + b["reason"])
            L.append("")
        for c in r["cross_detail"]:
            L.append("**CROSS-CONTAMINATION** — `" + c["unit_id"]
                     + "` returned a quote belonging to `"
                     + c["quote_belongs_to"] + "`: `" + c["quote"] + "`")
            L.append("")
        if r["transport"]:
            L.append("Transport failures: " + str(len(r["transport"]))
                     + " — e.g. " + r["transport"][0]["msg"][:160])
            L.append("")
    with open(path, "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    print("WROTE " + path)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--models", default=",".join(DEFAULT_CANDIDATES))
    ap.add_argument("--batch-sizes", default="1")
    ap.add_argument("--spacing", type=float, default=4.0)
    ap.add_argument("--out", default=None)
    args = ap.parse_args()

    models = [m.strip() for m in args.models.split(",") if m.strip()]
    sizes = [int(s) for s in args.batch_sizes.split(",")]

    rows = []
    for m in models:
        for b in sizes:
            print("\n>>> " + m + "  batch=" + str(b), flush=True)
            try:
                r = run_model(m, b, spacing=args.spacing)
            except SystemExit as exc:
                print("    REFUSED: " + str(exc)[:200])
                continue
            rows.append(r)
            print("    passed " + str(r["passed"]) + "/" + str(r["total"])
                  + "  classif=" + str(r["classification_failures"])
                  + "  transport=" + str(r["transport_failures"])
                  + "  cross=" + str(r["cross_contamination"]), flush=True)

    if rows:
        print_summary(rows)
        write_report(rows, args.out)
        clean = [r for r in rows
                 if r["passed"] == r["total"] and r["classification_failures"] == 0]
        print("")
        if clean:
            print("Models meeting the 11/11 zero-classification-failure bar:")
            for r in clean:
                print("   " + r["model"] + " (batch " + str(r["batch_size"]) + ")")
        else:
            print("NO model reached 11/11 with zero classification failures.")
            print("Per the selection rule: reporting and stopping. PM decides.")


if __name__ == "__main__":
    main()
