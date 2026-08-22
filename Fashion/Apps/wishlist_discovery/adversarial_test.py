# -*- coding: utf-8 -*-
"""
PHASE 3 -- the adversarial test set (spec 6.4).

Run:  python adversarial_test.py

Eleven hand-built cases, hard-coded in the repo, run against every prompt
version. Each one targets a specific boundary the codebook has to hold:

    sold out          -> PURCHASABILITY   (not Decision)
    forgot            -> RETURN
    occasion passed   -> INTENT_DECAY
    bought cheaper    -> SUBSTITUTION
    can't decide      -> DECISION         (desire survives)
    after salary      -> LATENCY
    beyond budget     -> ECONOMIC         (no substitution occurred)
    lost interest     -> INTENT_DECAY     (FROZEN HARD-CASE RULE)
    gone, bought other-> PURCHASABILITY   (earliest actual failure; substitution
                                           is metadata, not the gate)
    saved, didn't buy -> OTHER/INSUFFICIENT_INFO
    pretty dresses    -> EXCLUDE          (intent filter)

These must all pass before the 120-unit run means anything. A failure here is
a prompt-fidelity problem, and it must be fixed BEFORE looking at the PM's
hand-coded labels -- fixing it afterwards would be fitting to those labels.

This script does NOT require validation_set_CODED.csv: it contains no corpus
units and reveals nothing about the PM's sample. It is safe to run before
hand-coding.
"""

import os
import sys

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import config
import classifier
from codebook import CODEBOOK_VERSION, codebook_fingerprint

# (text, expected_gate, expected_intent, expected_other_subtype)
ADVERSARIAL_SET = [
    ("I still wanted it but my size sold out.",
     "PURCHASABILITY", "HIGH_INTENT", None),
    ("I saved it and completely forgot about it.",
     "RETURN", "HIGH_INTENT", None),
    ("The wedding passed so I don't need it anymore.",
     "INTENT_DECAY", "HIGH_INTENT", None),
    ("Bought the same dress cheaper on Myntra.",
     "SUBSTITUTION", "HIGH_INTENT", None),
    ("Still want it but I can't decide if it'll suit me.",
     "DECISION", "HIGH_INTENT", None),
    ("I'll buy it after salary comes in.",
     "LATENCY", "HIGH_INTENT", None),
    ("I want it but ₹8,000 is beyond my budget right now.",
     "ECONOMIC", "HIGH_INTENT", None),
    ("I kept looking at it and eventually just lost interest.",
     "INTENT_DECAY", "HIGH_INTENT", None),
    ("I came back after two weeks, size was gone, so I bought another dress elsewhere.",
     "PURCHASABILITY", "HIGH_INTENT", None),
    ("Saved it but didn't buy.",
     "OTHER", "HIGH_INTENT", "INSUFFICIENT_INFO"),
    ("I save loads of dresses because they're pretty.",
     None, "EXCLUDE", None),
]


def run(model=classifier.DEFAULT_MODEL, write_report=True):
    client = classifier.get_client()
    results = []
    n_pass = 0

    print("")
    print("=" * 78)
    print("ADVERSARIAL TEST SET -- codebook " + CODEBOOK_VERSION
          + " (fingerprint " + codebook_fingerprint() + ")")
    print("model: " + model + "   temperature: 0")
    print("=" * 78)
    print("")

    for i, (text, exp_gate, exp_intent, exp_sub) in enumerate(ADVERSARIAL_SET, 1):
        uid = "adv_" + str(i).zfill(2)
        try:
            r = classifier.classify_unit(client, uid, text, model=model)
        except Exception as exc:
            print("  " + str(i).zfill(2) + ". ERROR  " + exc.__class__.__name__
                  + ": " + str(exc))
            results.append({"n": i, "text": text, "expected": exp_gate or "EXCLUDE",
                            "got": "ERROR", "passed": False, "reason": str(exc)[:200],
                            "quote_ok": False})
            continue

        got_intent = r["intent"]
        got_gate = r["primary_gate"]
        got_sub = r["other_subtype"]

        if exp_intent == "EXCLUDE":
            passed = got_intent == "EXCLUDE"
            expected_str = "EXCLUDE (intent filter)"
            got_str = got_intent if got_intent == "EXCLUDE" else \
                got_intent + " / " + got_gate
        else:
            passed = (got_intent == "HIGH_INTENT" and got_gate == exp_gate)
            if exp_sub:
                passed = passed and (got_sub == exp_sub)
            expected_str = exp_gate + ("/" + exp_sub if exp_sub else "")
            got_str = got_gate + ("/" + str(got_sub) if got_sub else "")
            if got_intent != "HIGH_INTENT":
                got_str = "EXCLUDE"

        n_pass += bool(passed)
        mark = "PASS" if passed else "FAIL"
        print("  " + str(i).zfill(2) + ". [" + mark + "]  expected "
              + expected_str.ljust(26) + " got " + got_str)
        print("       text : " + text)
        if not passed:
            print("       WHY  : " + r["gate_reason"])
        if not r["quote_verified"]:
            print("       !! QUOTE NOT VERBATIM: " + repr(r["supporting_quote"]))

        results.append({
            "n": i, "text": text, "expected": expected_str, "got": got_str,
            "passed": passed, "reason": r["gate_reason"],
            "quote_ok": r["quote_verified"],
        })

    total = len(ADVERSARIAL_SET)
    print("")
    print("-" * 78)
    print("RESULT: " + str(n_pass) + "/" + str(total) + " passed")
    if n_pass < total:
        print("")
        print("!! The adversarial set is NOT clean. Per spec 6.4 these must all pass")
        print("!! before the 120-unit validation run means anything.")
        print("!! Fix prompt fidelity NOW, before looking at any hand-coded labels.")
        print("!! Fixing it afterwards would be fitting the classifier to those labels.")
    print("-" * 78)

    if write_report:
        _write_report(results, n_pass, total, model)
    return results, n_pass, total


def _write_report(results, n_pass, total, model):
    L = []
    A = L.append
    A("# Adversarial Test Report")
    A("")
    A("- Codebook: " + CODEBOOK_VERSION + " (fingerprint " + codebook_fingerprint() + ")")
    A("- Model: " + model + ", temperature 0")
    A("- Result: **" + str(n_pass) + "/" + str(total) + " passed**")
    A("")
    A("| # | text | expected | got | result | quote verbatim |")
    A("|---|---|---|---|---|---|")
    for r in results:
        A("| " + str(r["n"]) + " | " + r["text"].replace("|", "/")
          + " | " + r["expected"] + " | " + r["got"]
          + " | " + ("PASS" if r["passed"] else "**FAIL**")
          + " | " + ("yes" if r["quote_ok"] else "**NO**") + " |")
    A("")
    if n_pass < total:
        A("## Failures")
        A("")
        for r in results:
            if not r["passed"]:
                A("**Case " + str(r["n"]) + "** -- expected " + r["expected"]
                  + ", got " + r["got"])
                A("")
                A("> " + r["text"])
                A("")
                A("Model's stated reason: " + r["reason"])
                A("")
    with open(config.ADVERSARIAL_REPORT_MD, "w", encoding="utf-8") as f:
        f.write("\n".join(L))
    print("WROTE " + config.ADVERSARIAL_REPORT_MD)


if __name__ == "__main__":
    model = sys.argv[1] if len(sys.argv) > 1 else classifier.DEFAULT_MODEL
    _, n_pass, total = run(model=model)
    sys.exit(0 if n_pass == total else 1)
