# Classifier Bake-Off

Codebook v1.1 (fingerprint 2016b7d4d97ffbd8)
Temperature 0. 11-case adversarial set.

Selection rule: cheapest-quota model scoring **11/11 with zero classification failures**.

| model | batch | passed | classification failures | transport failures | non-verbatim quotes | cross-contamination |
|---|---:|---:|---:|---:|---:|---:|
| `gemini-3.6-flash` | 5 | 0/11 | 0 | 11 | 0 | 0 |
| `gemini-3.7-flash` | 5 | 0/11 | 0 | 11 | 0 | 0 |

## `gemini-3.6-flash` batch 5

Transport failures: 11 — e.g. transient error persisted after 4 attempts: ClientError HTTP 429: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, p

## `gemini-3.7-flash` batch 5

Transport failures: 11 — e.g. transient error persisted after 4 attempts: ClientError HTTP 429: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, p
