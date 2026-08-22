# Wishlist Non-Conversion Discovery Engine

Evidence pipeline that classifies public user commentary about Indian fashion
e-commerce into a pre-registered taxonomy of eight wishlist failure modes.

**Codebook v1.1 is FROZEN.** It lives in `codebook.py` and is injected verbatim
into the classification prompt. It is not edited by this code, and it should not
be edited by anyone except the PM, via an explicit re-freeze to v1.2.

---

## The validation gate

This pipeline is built around one rule: **the PM hand-codes 120 units blind,
before seeing any model output.**

    Phase 1  retrieval          ->  corpus_raw.csv
    Phase 2  sample 120         ->  validation_set_BLANK.csv
    ----------------------------------------------------------------
                    HUMAN VALIDATION GATE -- you code, blind
    ----------------------------------------------------------------
    Phase 3  classify + metrics ->  validation_report.md

`phase3_classify.py` checks for `artefacts/validation_set_CODED.csv` and exits
with an error if it is missing. It classifies nothing and calls no API until
your labels exist on disk. This is deliberate: if you saw model labels first,
the agreement statistics would measure anchoring, not agreement.

---

## Setup

```bash
pip install -r requirements.txt
```

Phases 1 and 2 need no API key. Phase 3 does:

```bash
cp .env.example .env
# then edit .env and add your ANTHROPIC_API_KEY
```

---

## Running it

```bash
python phase1_retrieve.py --reddit-backend skip
```

Builds the corpus. Takes roughly 15-20 minutes, most of it paging through app
reviews. Writes `corpus_raw.csv`, `query_log.csv`, `retrieval_report.md`.

`--reddit-backend` options:

| backend | submissions | comments | status |
|---|---|---|---|
| `skip` | — | — | records the block without retrying (current default) |
| `public_json` | yes | no | **HTTP 403** — bot-walled from this environment |
| `official_api` | yes | **no** | sanctioned; needs free credentials in `.env` |
| `pullpush` | yes | yes | **HTTP 429** — operator refuses agent traffic |

**Reddit comment search is unavailable.** Reddit's official `/search` accepts
`type=link,sr,user` only. Comment retrieval is a Pushshift-family capability,
and the pullpush mirror returns 429 with an explicit refusal of automated
agents. The comment code path is implemented and ready, but unreachable. This
is recorded as bias **B4**, not silently dropped.

`pullpush` additionally requires `--ack-pullpush`, so it can never be selected
by accident. No evasion of that refusal is implemented — no UA rotation, no
proxying, no rate-limbo.

### Reddit retrieval design

- **Subreddit-scoped:** 15 behaviour queries × 12 subreddits
- **Site-wide:** 8 domain-anchored queries (bare `wishlist` would pull in Steam
  sales and gift registries)
- `config.audit_queries()` guards the whole set against reason-anchored terms
  and is re-run on every import

```bash
python phase2_sample.py
```

Draws 120 units with a fixed seed and writes `validation_set_BLANK.csv` with the
human columns empty. Prints your coding instructions.

**Then you hand-code**, and save as `artefacts/validation_set_CODED.csv`.

```bash
python adversarial_test.py     # 11 boundary cases -- must all pass first
python phase3_classify.py      # only runs once the coded file exists
```

---

## Files

| file | what it is |
|---|---|
| `codebook.py` | **The frozen codebook v1.1.** Verbatim. Fingerprinted. |
| `config.py` | Paths, app IDs, the behaviour-anchored query set |
| `util.py` | Unit IDs, dedup, the query log, CSV IO |
| `sources/playstore.py` | Play Store reviews (Myntra, AJIO, Nykaa Fashion) |
| `sources/appstore.py` | App Store reviews via Apple's first-party RSS |
| `sources/reddit.py` | Reddit — **currently blocked**; fails loudly, never substitutes |
| `sources/webforums.py` | Public review sites; measured and largely dry |
| `phase1_retrieve.py` | Builds the corpus |
| `phase2_sample.py` | Exports the blind 120 |
| `classifier.py` | Prompt + single-unit Anthropic call, forced JSON schema |
| `adversarial_test.py` | 11 hard-coded boundary cases (spec 6.4) |
| `phase3_classify.py` | Hard gate, classification, agreement metrics |
| `inspect_corpus.py` | Diagnostic: what is actually in the corpus |
| `artefacts/bias_register.md` | Named distortions, never netted into a number |

---

## Design commitments

These are enforced in code, not just intended:

**Gate-agnostic retrieval.** Queries anchor on the *behaviour* (saving,
shortlisting, not buying), never on the *reason*. No query anywhere in
`config.BEHAVIOUR_QUERIES` names fit, stock, price, or forgetting. Searching for
a reason would retrieve that reason and turn the study into a readout of its own
keyword list.

**Nothing is fabricated.** Every corpus row traces to a real API response or URL.
No unit is invented, simulated, or written as an "example".

**Nothing is padded.** Where a source underdelivers, the shortfall is reported in
`retrieval_report.md` with the actual counts and the reason. No query was
loosened to hit a number.

**No silent source substitution.** Reddit is blocked from this environment. The
Reddit module raises `RedditBlocked` and the pipeline reports zero units rather
than quietly swapping in a scraper or a third-party mirror.

**Two-layer corpus, never pooled.** Every unit carries `platform_mentioned`, and
category-level and Nykaa-specific counts are always reported as separate rows.

**One unit, one gate.** The tool schema permits exactly one `primary_gate`.
Downstream events go in `secondary_metadata` and carry no gate vote.

**Quotes are verified, not trusted.** Every `supporting_quote` is checked
programmatically as an exact substring of the source text. Misses are flagged as
hallucination signals and counted in the validation report.

**On FAIL, the prompt is not tuned.** Raising kappa by editing the prompt after
seeing the hand-coded labels is fitting the classifier to those labels. Phase 3
reports which confusion cell is bleeding and stops. The codebook fix is the PM's
decision.

---

## Later (not built)

A thin Flask/FastAPI wrapper for a public reviewer-testable endpoint. The code is
structured for it — retrieval, classification and metrics are already separate
modules with no CLI coupling — but it is deliberately not built yet.
