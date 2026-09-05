# -*- coding: utf-8 -*-
"""
Measure the ACTUAL free-tier request budget per model.

Run:  python quota_probe.py                    # all candidates
      python quota_probe.py --backend gemini
      python quota_probe.py --cap 40

Issues trivial calls with fixed spacing until the provider returns 429, and
reports how many completed first. Writes artefacts/quota_probe.csv and
artefacts/quota_probe.md.

WHY THIS EXISTS
---------------
The observed "9 calls exhausted a model" figure was polluted by a retry loop
that fired 4 requests per logical call against a permanent 404. That bug is
fixed (4xx no longer retried), so this probe measures the real budget.

WHAT THE NUMBERS MEAN
---------------------
  exhausted_at = N   -> N calls succeeded, call N+1 returned 429. A real
                        measured ceiling for the period.
  ">= cap"           -> the cap was reached without a 429. A FLOOR, not a
                        ceiling. Reported as such and never rounded up into a
                        claim about the true limit.

COST WARNING: probing to exhaustion CONSUMES the day's allowance for that
model. Run it on models you are not about to benchmark, or accept that the
benchmark waits for the quota window to roll over.
"""

import argparse
import csv
import os
import time
from datetime import datetime, timezone

try:
    from dotenv import load_dotenv
    load_dotenv(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".env"))
except ImportError:
    pass

import requests

import config

GEMINI_CANDIDATES = [
    "gemini-3.7-flash",
    "gemini-3.6-flash",
    "gemini-3-flash-preview",
]

# Largest models reachable on this NVIDIA key. 8B-class is deliberately
# excluded: it collapses Intent Decay into Decision.
NVIDIA_CANDIDATES = [
    "nvidia/nemotron-3-ultra-550b-a55b",
    "nvidia/nemotron-3-super-120b-a12b",
    "nvidia/llama-3.3-nemotron-super-49b-v1.5",
]

NVIDIA_URL = "https://integrate.api.nvidia.com/v1/chat/completions"
PROBE_PROMPT = "Reply with the single word: ok"


def probe_gemini(model, cap, spacing):
    from google import genai
    from google.genai import types
    client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])
    cfg = types.GenerateContentConfig(temperature=0, max_output_tokens=2048)
    n = 0
    for i in range(cap):
        try:
            client.models.generate_content(model=model, contents=PROBE_PROMPT,
                                           config=cfg)
            n += 1
        except Exception as exc:
            s = str(exc)
            if "429" in s[:24]:
                per_day = "PerDay" in s
                return n, "429", ("per-day" if per_day else "per-minute")
            if "404" in s[:24]:
                return n, "404", "model not available"
            return n, exc.__class__.__name__, s[:100]
        if i < cap - 1:
            time.sleep(spacing)
    return n, "cap", "no 429 within cap"


def probe_nvidia(model, cap, spacing):
    key = os.environ["NVIDIA_API_KEY"]
    headers = {"Authorization": "Bearer " + key, "Accept": "application/json"}
    n = 0
    for i in range(cap):
        try:
            r = requests.post(NVIDIA_URL, headers=headers, timeout=90, json={
                "model": model,
                "messages": [{"role": "user", "content": PROBE_PROMPT}],
                "temperature": 0, "max_tokens": 2048})
        except Exception as exc:
            return n, exc.__class__.__name__, "network"
        if r.status_code == 200:
            n += 1
        elif r.status_code == 429:
            return n, "429", r.text[:100]
        else:
            return n, str(r.status_code), r.text[:100]
        if i < cap - 1:
            time.sleep(spacing)
    return n, "cap", "no 429 within cap"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--backend", choices=["gemini", "nvidia", "both"], default="both")
    ap.add_argument("--cap", type=int, default=40)
    ap.add_argument("--spacing", type=float, default=6.0)
    args = ap.parse_args()

    jobs = []
    if args.backend in ("gemini", "both"):
        jobs += [("gemini", m) for m in GEMINI_CANDIDATES]
    if args.backend in ("nvidia", "both"):
        jobs += [("nvidia", m) for m in NVIDIA_CANDIDATES]

    rows = []
    print("Probing with " + str(args.spacing) + "s spacing, cap "
          + str(args.cap) + " per model.\n")

    for backend, model in jobs:
        print("  probing " + backend + " / " + model + " ...", flush=True)
        t0 = time.time()
        if backend == "gemini":
            n, status, detail = probe_gemini(model, args.cap, args.spacing)
        else:
            n, status, detail = probe_nvidia(model, args.cap, args.spacing)
        dt = time.time() - t0

        if status == "cap":
            verdict = ">= " + str(n) + " (floor -- cap reached, no 429)"
        elif status == "429":
            verdict = str(n) + " (measured ceiling)"
        else:
            verdict = str(n) + " then " + status

        print("     completed " + str(n) + " calls in " + format(dt, ".0f")
              + "s -> " + verdict)
        print("     " + str(detail)[:140] + "\n", flush=True)

        rows.append({
            "backend": backend, "model": model,
            "calls_completed": n, "stop_status": status,
            "verdict": verdict, "detail": str(detail)[:300],
            "spacing_s": args.spacing, "cap": args.cap,
            "probed_at": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        })

    path = os.path.join(config.ARTEFACTS_DIR, "quota_probe.csv")
    with open(path, "w", newline="", encoding="utf-8-sig") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()))
        w.writeheader()
        w.writerows(rows)

    md = ["# Free-Tier Quota Probe", "",
          "Probed " + datetime.now(timezone.utc).isoformat(timespec="seconds"),
          "Spacing " + str(args.spacing) + "s, cap " + str(args.cap) + " per model.",
          "",
          "`>= N` is a FLOOR (cap reached without a 429), not a measured limit.",
          "",
          "| backend | model | calls completed | result |",
          "|---|---|---:|---|"]
    for r in rows:
        md.append("| " + r["backend"] + " | `" + r["model"] + "` | "
                  + str(r["calls_completed"]) + " | " + r["verdict"] + " |")
    md.append("")
    md.append("## Stop detail")
    md.append("")
    for r in rows:
        md.append("- **" + r["model"] + "**: " + r["detail"][:200])
    with open(os.path.join(config.ARTEFACTS_DIR, "quota_probe.md"), "w",
              encoding="utf-8") as f:
        f.write("\n".join(md))

    print("WROTE " + path)


if __name__ == "__main__":
    main()
