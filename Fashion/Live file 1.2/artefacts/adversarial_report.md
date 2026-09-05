# Adversarial Test Report

- Codebook: v1.1 (fingerprint 2016b7d4d97ffbd8)
- Model: gemini-3.7-flash, temperature 0
- Result: **9/11 passed**
- Transport failures (API/parse): **2**
- Classification failures (wrong boundary): **0**

These are different problems. A transport failure says nothing about
whether the codebook works; only classification failures bear on the
taxonomy.

| # | text | expected | got | result | failure type | quote verbatim |
|---|---|---|---|---|---|---|
| 1 | I still wanted it but my size sold out. | PURCHASABILITY | PURCHASABILITY | PASS | - | yes |
| 2 | I saved it and completely forgot about it. | RETURN | RETURN | PASS | - | yes |
| 3 | The wedding passed so I don't need it anymore. | INTENT_DECAY | INTENT_DECAY | PASS | - | yes |
| 4 | Bought the same dress cheaper on Myntra. | SUBSTITUTION | SUBSTITUTION | PASS | - | yes |
| 5 | Still want it but I can't decide if it'll suit me. | DECISION | DECISION | PASS | - | yes |
| 6 | I'll buy it after salary comes in. | LATENCY | TRANSPORT-FAIL | **FAIL** | transport | n/a |
| 7 | I want it but ₹8,000 is beyond my budget right now. | ECONOMIC | ECONOMIC | PASS | - | yes |
| 8 | I kept looking at it and eventually just lost interest. | INTENT_DECAY | INTENT_DECAY | PASS | - | yes |
| 9 | I came back after two weeks, size was gone, so I bought another dress elsewhere. | PURCHASABILITY | PURCHASABILITY | PASS | - | yes |
| 10 | Saved it but didn't buy. | OTHER/INSUFFICIENT_INFO | OTHER/INSUFFICIENT_INFO | PASS | - | yes |
| 11 | I save loads of dresses because they're pretty. | EXCLUDE | TRANSPORT-FAIL | **FAIL** | transport | n/a |

## Failures

**Case 6** -- expected LATENCY, got TRANSPORT-FAIL

> I'll buy it after salary comes in.

Model's stated reason: transient API error persisted after 4 attempts: ClientError HTTP 429: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limit

**Case 11** -- expected EXCLUDE, got TRANSPORT-FAIL

> I save loads of dresses because they're pretty.

Model's stated reason: transient API error persisted after 4 attempts: ClientError HTTP 429: 429 RESOURCE_EXHAUSTED. {'error': {'code': 429, 'message': 'You exceeded your current quota, please check your plan and billing details. For more information on this error, head to: https://ai.google.dev/gemini-api/docs/rate-limit
