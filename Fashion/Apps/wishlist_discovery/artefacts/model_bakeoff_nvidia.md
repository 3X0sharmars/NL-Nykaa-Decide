# Classifier Bake-Off

Codebook v1.1 (fingerprint 2016b7d4d97ffbd8)
Temperature 0. 11-case adversarial set.

Selection rule: cheapest-quota model scoring **11/11 with zero classification failures**.

| model | batch | passed | classification failures | transport failures | non-verbatim quotes | cross-contamination |
|---|---:|---:|---:|---:|---:|---:|
| `nvidia/nemotron-3-super-120b-a12b` | 1 | 6/11 | 5 | 0 | 0 | 0 |
| `nvidia/llama-3.3-nemotron-super-49b-v1.5` | 1 | 9/11 | 2 | 0 | 0 | 0 |
| `nvidia/nemotron-3-ultra-550b-a55b` | 1 | 10/11 | 1 | 0 | 0 | 0 |

## `nvidia/nemotron-3-super-120b-a12b` batch 1

**Boundary crossed** — expected `RETURN`, got `EXCLUDE`

> I saved it and completely forgot about it.

Model's stated reason: 

**Boundary crossed** — expected `INTENT_DECAY`, got `EXCLUDE`

> The wedding passed so I don't need it anymore.

Model's stated reason: 

**Boundary crossed** — expected `LATENCY`, got `EXCLUDE`

> I'll buy it after salary comes in.

Model's stated reason: 

**Boundary crossed** — expected `INTENT_DECAY`, got `EXCLUDE`

> I kept looking at it and eventually just lost interest.

Model's stated reason: 

**Boundary crossed** — expected `OTHER/INSUFFICIENT_INFO`, got `EXCLUDE`

> Saved it but didn't buy.

Model's stated reason: 

## `nvidia/llama-3.3-nemotron-super-49b-v1.5` batch 1

**Boundary crossed** — expected `RETURN`, got `RETURN / RE-ENGAGEMENT`

> I saved it and completely forgot about it.

Model's stated reason: 

**Boundary crossed** — expected `OTHER/INSUFFICIENT_INFO`, got `EXCLUDE`

> Saved it but didn't buy.

Model's stated reason: 

## `nvidia/nemotron-3-ultra-550b-a55b` batch 1

**Boundary crossed** — expected `OTHER/INSUFFICIENT_INFO`, got `EXCLUDE`

> Saved it but didn't buy.

Model's stated reason: 
