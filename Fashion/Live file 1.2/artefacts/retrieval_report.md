# Retrieval Report -- Wishlist Non-Conversion Discovery Engine

Generated: 2026-08-22T16:05:36+00:00
Codebook: v1.1 (fingerprint 2016b7d4d97ffbd8)

## Headline

- **Total units retained: 1069**  (spec target 600-700)
- **Nykaa Fashion subset: 74**  (spec target >= 80)
- Raw items scanned across all sources: 823598
- Duplicates removed: 1 exact, 1 near-identical

> **SHORTFALL: the Nykaa Fashion subset is below the 80-unit target** (74). This is a stated limitation of the study, not a
> presentation problem. Nykaa-specific and category-level counts are
> reported separately throughout and are never pooled.

## Source status

| Source | Status | Units | Detail |
|---|---|---|---|
| Reddit | **BLOCKED** | 0 | Skipped by --reddit-backend skip. Public JSON endpoint is bot-walled (HTTP 403); see probe output in retrieval_report. |
| Play Store | OK | 1070 | Myntra, AJIO, Nykaa Fashion (com.fsn.nds); India/English; bulk pull + behaviour filter |
| App Store | OK | 1 | Apple first-party RSS; hard-capped at ~500 reviews per app |
| Forums / review sites | **DRY** | 0 | MouthShut/Trustpilot/Quora return HTTP 403; reachable complaint boards contain no wishlist discussion |

## Counts by source

| source | units | target |
|---|---|---|
| playstore | 1068 | 200 |
| appstore | 1 | (shared 200 app-review target) |
| **total** | **1069** | **600-700** |

## Counts by source detail

| source_detail | units |
|---|---|
| AJIO (Android) | 598 |
| Myntra (Android) | 395 |
| Nykaa Fashion (Android) | 75 |
| AJIO (iOS) | 1 |

## Two-layer corpus: counts by platform_mentioned (spec 3.4)

Category corpus = all units. Nykaa Fashion subset = the Nykaa Fashion row.
These are reported separately and are never silently pooled.

| platform_mentioned | units | % of corpus |
|---|---|---|
| AJIO | 583 | 54.5% |
| Myntra | 404 | 37.8% |
| Nykaa Fashion | 74 | 6.9% |
| Multiple | 8 | 0.7% |

## Deduplication

- Exact duplicates removed (normalised text identical): 1
- Near-identical removed (token Jaccard >= 0.90): 1
- Texts under 6 tokens are exempt from near-duplicate removal: short
  statements like "Saved it but didn't buy" are genuinely distinct units
  from different people, not copies.

## Query strategy

All queries are behaviour-anchored (saving / shortlisting / not buying).
No query names a failure reason -- no fit, stock, price, or forgetting
terms appear anywhere in the query set. Searching for a reason would
retrieve that reason and reduce the study to a readout of our own keyword
list (spec 3.1).

The executed query set is the ALLOWED list from spec 3.1, unextended.
Full per-query results, including zero-yield queries, are in query_log.csv.

### A note on what 'query' means per source

Reddit supports real server-side search, so each behaviour anchor is a
genuine query. The Play Store and App Store review endpoints have **no
server-side search at all** -- you can only page through reviews in bulk
and filter locally. For those sources `raw_results_returned` is the number
of reviews *scanned*, and the behaviour anchor is applied as a local regex.
This distinction is recorded in the `method` column of query_log.csv.

## Reproducibility

- Validation draw seed (used in phase 2): 20260822
- unit_id is a content hash, so re-running retrieval assigns the
  same id to the same text and hand-coded labels stay joinable.
