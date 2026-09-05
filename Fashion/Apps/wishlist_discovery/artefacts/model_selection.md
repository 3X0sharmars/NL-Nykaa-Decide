# Classifier Selection — Quota, Accuracy, Batching

Codebook v1.1 (fingerprint `2016b7d4d97ffbd8`). All runs temperature 0.
Measured 2026-08-23. No paid API used at any point.

---

## 1. Measured free-tier quota

Trivial calls at 6s spacing until 429, cap 40 per model.
`>= N` is a **floor** (cap reached without a 429), not a measured ceiling.

| backend | model | calls before limit | limit type |
|---|---|---:|---|
| gemini | `gemini-3.7-flash` | 0 | per-day, already exhausted |
| gemini | `gemini-3.6-flash` | **19** | **per-day** |
| gemini | `gemini-3-flash-preview` | 6 | per-minute; **per-day also hit at ~22** |
| nvidia | `nemotron-3-ultra-550b-a55b` | 4 | HTTP 503 overload, **not** quota |
| nvidia | `nemotron-3-super-120b-a12b` | **>= 40** | no limit hit |
| nvidia | `llama-3.3-nemotron-super-49b-v1.5` | **>= 40** | no limit hit |

**Gemini free tier is roughly 20 requests per model per day.** NVIDIA showed no
ceiling within the probe cap.

The earlier "9 calls exhausted a model" figure was inflated by a retry loop that
fired four requests per logical call against a permanent 404. That bug is fixed
(4xx no longer retried), so these numbers are clean.

---

## 2. Adversarial bake-off — 11 cases, batch size 1

| model | passed | classification failures | transport failures | non-verbatim quotes | cross-contamination |
|---|---:|---:|---:|---:|---:|
| **`gemini-3-flash-preview`** | **11/11** | **0** | 0 | 0 | 0 |
| `nvidia/nemotron-3-ultra-550b-a55b` | 10/11 | 1 | 0 | 0 | 0 |
| `nvidia/llama-3.3-nemotron-super-49b-v1.5` | 9/11 | 2 | 0 | 0 | 0 |
| `nvidia/nemotron-3-super-120b-a12b` | 6/11 | 5 | 0 | 0 | 0 |
| `gemini-3.7-flash` | 9/11 (earlier run) | 0 | 2 | 0 | 0 |
| `gemini-3.6-flash` | not tested | — | — | — | quota spent on probe |

### Boundaries crossed

**`nemotron-3-super-120b` — 5 failures, all the same error.** It sent RETURN,
INTENT_DECAY (x2), LATENCY and OTHER/INSUFFICIENT_INFO to **EXCLUDE**. It is not
confusing gates with each other; it is failing the §4.1 intent filter and
discarding units that have clear purchase intent. That is the most damaging
possible failure here, because excluded units never reach the taxonomy at all.

**`llama-3.3-nemotron-49b` — 2 failures.** One is arguably a scoring artifact:
it answered `RETURN / RE-ENGAGEMENT`, the full class name as written in codebook
§4.2, where the enum value is `RETURN`. The concept was right; the string did
not match. NVIDIA's `json_object` mode does not enforce enums the way Gemini's
`response_schema` does. **This has NOT been normalised away** — normalising it
would raise the score, and score-raising edits are not mine to make. With enum
normalisation this model would be 10/11.

**All three NVIDIA models failed the same case:** "Saved it but didn't buy."
→ `EXCLUDE` instead of `OTHER / INSUFFICIENT_INFO`. They read thin evidence as
absence of intent. The codebook is explicit that this case is a **coverage
limitation, not an intent failure**, and expects it to be common. A classifier
that excludes these would silently shrink the denominator of every gate share.

`gemini-3-flash-preview` handled all of them, including the frozen hard-case
rule ("kept looking → lost interest" → INTENT_DECAY) and the ordering rule
("came back → size gone → bought elsewhere" → PURCHASABILITY, not Substitution).

---

## 3. Batch size, on the winning model

| batch | passed | classification failures | transport failures | cross-contamination |
|---:|---:|---:|---:|---:|
| 1 | **11/11** | **0** | 0 | 0 |
| 5 | 10/11 | **0** | 1 | **0** |
| 10 | 0/11 | 0 | 11 | — |

**Batch 5 lost no accuracy.** Every unit that came back was labelled correctly,
every `unit_id` echoed exactly once, and every `supporting_quote` was an exact
substring of its own unit. The single miss was a 429 on the trailing chunk of 1,
not a wrong label.

**Batch 10 is untested, not failed.** All 11 units were lost to transport (429)
because the daily quota ran out mid-test. It reports 0/11, which must not be
read as an accuracy result.

**Cross-contamination: zero observed at batch 5.** The check is active at every
batch size — a quote matching a *different* unit in the same call is flagged
separately from an ordinary bad quote — and it fired on nothing.

---

## 4. The tension this creates

The only model that clears the accuracy bar has the tightest quota; the models
with generous quota fail the intent filter.

| option | accuracy | quota | 400 units at batch 5 |
|---|---|---|---|
| `gemini-3-flash-preview` | 11/11 clean | ~20 calls/day | 80 calls → **~4 days** |
| `nvidia/nemotron-3-ultra-550b` | 10/11 | >= 40, no ceiling found | possibly one sitting |

Batch 5 changes the arithmetic decisively: 400 units becomes 80 calls rather
than 400. If batch 10 verifies clean tomorrow it becomes 40 calls, or about two
days on Gemini.

---

## 5. Recommendation

**`gemini-3-flash-preview` at batch size 5**, chunked across days.

It is the only candidate meeting the fixed selection rule (11/11, zero
classification failures). Batch 5 is verified accuracy-neutral and
contamination-free; batch 10 needs one more run tomorrow before it can be
trusted, and would halve the calendar cost again if it holds.

Open items requiring a decision:

1. **Batch 10 retest** tomorrow — worth 2 calls, halves the run length.
2. **Enum normalisation** for NVIDIA-style responses. Legitimate output parsing,
   but it raises a score, so it is flagged rather than applied.
3. **`gemini-3.6-flash` untested** — its 19-call daily budget went entirely to
   the quota probe. It may also score 11/11 and would add a second ~20-call
   daily budget, shortening the run.

---

# Update — 2026-08-23 (second session)

## The real quota number: 20 requests/day/model

The earlier probe read "19" and "6" as ceilings. The exact figure is now known
from the quota violation body itself:

    quotaId: GenerateRequestsPerDayPerProjectPerModel-FreeTier
    limit: 20

**20 requests per model per day.** Not per project — per *model* — so three
qualified Gemini models would give 60/day in aggregate.

## Retries consume the daily budget — policy bug, fixed

Each 429 retry spends one of the 20. The retry policy blanket-retried 429 four
times, turning one logical call into five daily requests. Three batch chunks
therefore erased a model's entire day before a single classification landed.

This is the same class of error as the 404 retry loop: permanent failures
being retried. Fixed by distinguishing the two kinds of 429:

| 429 kind | retried? | why |
|---|---|---|
| `...PerDayPerProjectPerModel` | **no** | permanent for the day; retrying only burns budget |
| `...PerMinutePerProjectPerModel` | yes, with backoff | genuinely transient |

Verified: per-day 429 → not retried; per-minute 429 → retried; 500 → retried;
404 → not retried.

## Tasks A / B / C status

| task | model | status |
|---|---|---|
| A — batch-10 retest | `gemini-3-flash-preview` | **BLOCKED** — still per-day exhausted; quota resets are staggered per model |
| B — qualify second instrument | `gemini-3.6-flash` | **INCONCLUSIVE** — budget consumed by the retry bug before any unit was classified |
| C — qualify third instrument | `gemini-3.7-flash` | **INCONCLUSIVE** — same |

B and C returned `0/11` with 11 transport failures and **zero classification
failures**. That is not an accuracy result and must not be read as one: no unit
ever reached the model. Both remain unqualified and untested.

With the retry fix in place, each retest now costs 3 requests instead of ~15.

## Qualified instruments

| model | status | daily budget |
|---|---|---|
| `gemini-3-flash-preview` | **qualified** — 11/11, zero classification failures | 20 |
| `gemini-3.6-flash` | untested | 20 (if it qualifies) |
| `gemini-3.7-flash` | untested | 20 (if it qualifies) |
| all NVIDIA candidates | **disqualified** — intent-filter failures | n/a |

## Projected days to complete 120 validation + 200 sample

The 120 must come from ONE model (20/day). The 200 may be split across
qualified models.

| batch size | 120 validation | 200 sample (1 model) | 200 sample (3 models) | total, best case |
|---:|---|---|---|---|
| 1 | 120 calls → 6 days | 200 calls → 10 days | ~4 days | 16 days |
| **5 (verified)** | 24 calls → **2 days** | 40 calls → 2 days | ~1 day | **3 days** |
| 10 (unverified) | 12 calls → **1 day** | 20 calls → 1 day | ~1 day | **2 days** |

Batch size dominates everything else. Verifying batch 10 is worth 2 requests
and removes roughly a day.

## Enforcement added

- `phase3_classify.py` writes `validation_model.lock` on first run and refuses
  to continue the 120 under a different model. A kappa cannot be assembled from
  two instruments, and an interrupted run must resume on the same one.
- `phase4_sample_classify.py` records the model per unit and, when more than one
  instrument is used, prints a gate-by-gate share comparison. A spread of
  >= 10 pp is reported as a **material divergence finding**, not averaged away.
