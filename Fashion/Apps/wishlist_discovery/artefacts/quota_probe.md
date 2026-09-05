# Free-Tier Quota Probe

Probed 2026-08-23T04:31:16+00:00
Spacing 6.0s, cap 40 per model.

`>= N` is a FLOOR (cap reached without a 429), not a measured limit.

| backend | model | calls completed | result |
|---|---|---:|---|
| gemini | `gemini-3.7-flash` | 0 | 0 (measured ceiling) |
| gemini | `gemini-3.6-flash` | 19 | 19 (measured ceiling) |
| gemini | `gemini-3-flash-preview` | 6 | 6 (measured ceiling) |
| nvidia | `nvidia/nemotron-3-ultra-550b-a55b` | 4 | 4 then 503 |
| nvidia | `nvidia/nemotron-3-super-120b-a12b` | 40 | >= 40 (floor -- cap reached, no 429) |
| nvidia | `nvidia/llama-3.3-nemotron-super-49b-v1.5` | 40 | >= 40 (floor -- cap reached, no 429) |

## Stop detail

- **gemini-3.7-flash**: per-day
- **gemini-3.6-flash**: per-day
- **gemini-3-flash-preview**: per-minute
- **nvidia/nemotron-3-ultra-550b-a55b**: {"error":{"message":"Service temporarily overloaded","type":"Service Unavailable","code":503}}
- **nvidia/nemotron-3-super-120b-a12b**: no 429 within cap
- **nvidia/llama-3.3-nemotron-super-49b-v1.5**: no 429 within cap