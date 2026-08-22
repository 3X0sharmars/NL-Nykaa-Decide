# -*- coding: utf-8 -*-
"""
THE FROZEN CODEBOOK v1.1

This file is the specification. The string CODEBOOK_V1_1 below is reproduced
VERBATIM from the build spec, Section 4 -- including every arrow, em dash,
rupee sign and code fence -- and is injected verbatim into the classification
prompt.

DO NOT edit, extend, reword, merge or "improve" any class definition,
inclusion test, or ordering rule in this file. If a definition appears flawed,
raise it with the PM and stop. A codebook change requires an explicit re-freeze
to v1.2 by the PM.

Integrity: CODEBOOK_VERSION and the SHA-256 in codebook_fingerprint() are
written into every artefact so a reviewer can prove which codebook version
produced which numbers. If anyone edits the text below, the fingerprint changes
and the artefacts stop matching -- that is the point.
"""

import hashlib

CODEBOOK_VERSION = "v1.1"

# ---------------------------------------------------------------------------
# BEGIN FROZEN TEXT -- verbatim reproduction of spec Section 4. DO NOT EDIT.
# ---------------------------------------------------------------------------
CODEBOOK_V1_1 = """### 4.1 Intent filter — applied BEFORE gate classification

A unit is **HIGH INTENT** only if it concerns a **specific product/item** AND
contains at least one purchase-oriented signal:

- explicit intention to buy
- product-level evaluation for purchase
- checking size, fit, reviews, availability, or return policy
- cart or checkout activity
- explicit deferred purchase
- explicit comparison of purchase options

**Does NOT qualify:** generic browsing, admiration, mood-board behaviour, large
wishlist size alone, "I love browsing fashion", "my wishlist is my mood board".

Decision rule:

```
Does the unit concern a specific product/item?
   NO  → EXCLUDE
   YES ↓
Is there evidence of purchase-oriented consideration?
   NO  → EXCLUDE
   YES → HIGH INTENT → apply gate taxonomy
```

A wishlist mention alone is insufficient.

### 4.2 The eight gate classes

**1. RETURN / RE-ENGAGEMENT**
- *Definition:* The user had high-intent consideration but fails to meaningfully
  return to the saved item, and non-return is the primary reason the purchase
  did not progress.
- *Inclusion test:* Did the user fail to re-engage with the saved item before
  any downstream failure occurred?
- *Belongs:* "I saved it and completely forgot about it."
- *Adjacent (→ Intent Decay):* "I went back several times but eventually didn't
  want it anymore."

**2. PURCHASABILITY**
- *Definition:* The user retains purchase intent but the exact saved SKU/variant
  cannot be purchased in the required form when they attempt to progress.
- *Inclusion test:* Did availability of the desired item/variant prevent the
  intended purchase?
- *Belongs:* "I came back to buy it but my size was sold out."
- *Adjacent (→ Decision):* "My size was available but I wasn't sure which size
  would fit."
- *Includes:* size unavailable, colour unavailable, SKU/variant unavailable,
  item delisted, cannot ship to location.

**3. INTENT DECAY**
- *Definition:* The user's initial desire to purchase disappears because the
  need, occasion, trend, preference or motivation changed.
- *Inclusion test:* Has the user stopped wanting/needing the item, rather than
  still wanting it but being unable to decide?
- *Belongs:* "The wedding passed, so I don't need the dress anymore."
- *Adjacent (→ Decision):* "The wedding is next month and I still want it, but
  I'm unsure whether it suits me."
- **FROZEN HARD-CASE RULE:** "I kept looking at it and eventually lost
  interest." → **Intent Decay**. Terminal state wins: loss of desire = Intent
  Decay, regardless of how much consideration preceded it.

**4. DECISION / UNCERTAINTY**
- *Definition:* The user still wants the item, but unresolved information, risk
  or choice prevents commitment.
- *Inclusion test:* Does desire survive while a decision-relevant uncertainty
  remains unresolved?
- *Belongs:* "I still love it but I'm unsure about the fit."
- *Adjacent (→ Intent Decay):* "I don't really want it anymore."
- **CRITICAL RULE:** If the text contains uncertainty language but does NOT
  establish continuing desire, do **not** infer Decision. Code
  **Other — insufficient information**.

**5. SUBSTITUTION**
- *Definition:* The user survives all upstream gates but ultimately chooses
  another product, retailer, platform or channel instead of the saved item.
- *Inclusion test:* After surviving Return → Purchasability → Intent Decay →
  Decision, did the transaction move elsewhere?
- *Belongs:* "My size was available, I still wanted it, but I bought it from
  Myntra because delivery was faster."
- *Adjacent (→ Purchasability):* "My size was gone, so I bought another dress
  elsewhere." — primary is Purchasability; buying elsewhere is metadata.
- Requires **actual or clearly intended displacement**, not mere comparison.

**6. LATENCY**
- *Definition:* The user retains purchase intent and the item remains viable,
  but deliberately postpones the purchase beyond the 30-day window because of
  timing.
- *Inclusion test:* Is timing the primary reason for delaying an otherwise
  intended purchase?
- *Belongs:* "I want it but I'll buy it after payday."
- *Adjacent (→ Decision):* "I'll wait because I'm not sure about the sizing."
- "Waiting for a sale" is Latency **when the user explicitly intends to buy
  later**.

**7. ECONOMIC / AFFORDABILITY**
- *Definition:* Desire, availability and decision readiness survive, but
  purchase is blocked by the item's price/cost, and the user does not actually
  substitute to another purchase.
- *Inclusion test:* Is the item's monetary cost itself the stated reason the
  intended purchase does not happen?
- *Belongs:* "I really want it but ₹8,000 is too expensive for me."
- *Adjacent (→ Substitution):* "It was ₹8,000 on Nykaa, so I bought it for
  ₹6,500 on Myntra."

**8A. OTHER — INSUFFICIENT INFORMATION**
- *Definition:* The evidence concerns a relevant wishlist/purchase experience
  but does not state enough information to identify the failure gate.
- *Belongs:* "Saved it but didn't buy."
- This is a **coverage limitation**, not a taxonomy problem. Expect it to be
  common. Do not force these into a gate.

**8B. OTHER — TAXONOMY FAILURE**
- *Definition:* The evidence clearly states a purchase barrier, but that barrier
  genuinely fits none of the seven defined gates.
- This is a **codebook failure** and must be reported separately.

### 4.3 FROZEN primary-gate ordering

```
HIGH-INTENT UNIT
   ↓
1. RETURN
2. PURCHASABILITY
3. INTENT DECAY
4. DECISION
5. SUBSTITUTION
6. LATENCY
7. ECONOMIC
8. OTHER
```

**FROZEN RULE:** Assign the **earliest gate at which the item's path actually
failed** — temporally and causally, NOT "which keyword appears first in the
text". Record downstream events as `secondary_metadata`, which gets **no gate
vote**.

Worked examples:
- "I came back → my size was gone → bought elsewhere"
  → primary: **Purchasability**; metadata: Substitution
- "I came back → size available → still wanted it → bought elsewhere because
  delivery was faster"
  → primary: **Substitution**

### 4.4 One unit, one primary gate

Never assign two gates. Never split a unit's vote. A unit that mentions three
failures still contributes exactly one gate observation."""
# ---------------------------------------------------------------------------
# END FROZEN TEXT
# ---------------------------------------------------------------------------

GATES = [
    "RETURN",
    "PURCHASABILITY",
    "INTENT_DECAY",
    "DECISION",
    "SUBSTITUTION",
    "LATENCY",
    "ECONOMIC",
    "OTHER",
]

OTHER_SUBTYPES = ["INSUFFICIENT_INFO", "TAXONOMY_FAILURE", None]

INTENT_LABELS = ["HIGH_INTENT", "EXCLUDE"]

# The six confusion cells the PM specifically wants called out (spec 6.5.4).
WATCHED_CONFUSION_PAIRS = [
    ("RETURN", "INTENT_DECAY"),
    ("INTENT_DECAY", "DECISION"),
    ("PURCHASABILITY", "DECISION"),
    ("PURCHASABILITY", "SUBSTITUTION"),
    ("LATENCY", "INTENT_DECAY"),
    ("ECONOMIC", "SUBSTITUTION"),
]


def codebook_fingerprint() -> str:
    """SHA-256 of the frozen codebook text, so artefacts prove their provenance."""
    return hashlib.sha256(CODEBOOK_V1_1.encode("utf-8")).hexdigest()[:16]


if __name__ == "__main__":
    # Deliberately does not print the codebook body: some Windows consoles
    # cannot encode the arrows and rupee signs, and we will not transliterate
    # frozen text just to make a console happy.
    print("Codebook " + CODEBOOK_VERSION + "  fingerprint=" + codebook_fingerprint())
    print(str(len(CODEBOOK_V1_1)) + " chars, " + str(len(GATES)) + " gate classes")
    for ch, name in [("→", "arrow"), ("↓", "down-arrow"),
                     ("₹", "rupee"), ("—", "em-dash")]:
        print("  verbatim " + name + ": " + str(CODEBOOK_V1_1.count(ch)) + " occurrences")
