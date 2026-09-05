# Bias Register

Known, named distortions in the evidence corpus. Each entry states the bias,
which gate it distorts, and in which direction.

**These are not netted into a correction factor.** Two biases pulling opposite
ways on the same gate do not cancel — they are different populations making
different errors, and averaging them would manufacture a false precision the
evidence cannot support. Each is carried separately into interpretation.

Codebook v1.1 (fingerprint `2016b7d4d97ffbd8`). Last updated 2026-08-22,
Phase 1B.

> **Numbering note.** The Phase 1B directive reassigned B3, B4 and B5. Entries
> that previously held B4 and B5 have been renumbered to B6 and B7 and are
> unchanged in substance; nothing was dropped.

---

## B1 — App-store reviews under-observe DECISION

**Source affected:** `playstore`, `appstore` — currently **100%** of the corpus

**Direction:** Decision / Uncertainty **under-observed**.

People write app-store reviews to complain about the app or request features.
The genre rewards grievance about the product-as-software: crashes, wishlist
capacity limits, sort options, items vanishing. It does not reward introspection
about one's own hesitation. Nobody opens the Play Store to write "I still want
this kurta but I can't tell if the fit will work."

Decision failures are internal, unresolved, and nobody's fault — precisely the
experience that generates no complaint. Gates with an identifiable villain
(Purchasability: "my size was gone"; Economic: "the price jumped") are
over-represented by the same logic.

**Expected distortion:** Decision suppressed; Purchasability and Economic
inflated relative to their true share.

---

## B2 — Fashion communities over-observe DECISION

**Source affected:** `reddit` — **currently absent from the corpus** (see B3)

**Direction:** Decision / Uncertainty **over-observed**, *if that source is ever
added*.

Enthusiast communities exist to deliberate: whether a cut suits a body type,
whether a fabric justifies the price, whether to size up. Members deliberate far
more than the median shopper and post *in order to* resolve exactly the
uncertainty that defines the Decision gate.

**Status:** currently inert. Recorded because it is the counterweight to B1, and
because it will activate the moment any community-prose source is added.

---

## B1 ⇄ B2 — the opposing pair

B1 and B2 act on the **same gate in opposite directions**.

    app reviews        ---- Decision under-observed ---->
    fashion subreddits <--- Decision over-observed  -----

They must never be combined into a net adjustment. Right now **only B1 is
live**, so any Decision rate measured today is a **floor, not an estimate**. If
community prose is ever added, the Decision rate will rise for two inseparable
reasons at once — real signal and B2 — with no principled way to split them from
this data.

Report Decision by source stratum. Never as a single pooled figure.

---

## B3 — Reddit is absent from this corpus

Reddit is absent from this corpus. Every free route was blocked:
unauthenticated endpoints return 403 since May 2026; the archival mirror
explicitly refuses automated traffic and was not evaded; API credential
registration could not be completed. The corpus is therefore app reviews,
short-form social, and web forums — with no long-form community prose in any
source. Decision, Intent Decay and Latency are systematically under-observed.
Measured rates for these three gates are LOWER BOUNDS, not estimates.

**Current state, stricter than the above:** short-form social and web forums are
also absent, because Modules A and B could not run for want of credentials. The
corpus is **app reviews only**. This is the single largest threat to validity and
outranks every other entry here.

---

## B4 — X and short-form social are absent from this corpus

X and short-form social are absent from this corpus. The available route (Grok
x_search) returns model synthesis rather than raw posts and is pay-per-use; it
was not used. The corpus therefore contains no short-form social genre,
alongside no long-form community prose. Substitution and Latency lose their most
visible source; their measured rates are lower bounds.

**Why synthesis could not substitute for posts.** Grok's x_search returns the
model's *summary* of what people said, with citations. A summary is not an
evidence unit: it has no verbatim author text, so `supporting_quote` could not be
verified as a substring of anything real, and the anti-fabrication rule would be
violated the moment it entered the corpus. Most cited x.com URLs also auth-wall
on fetch, so the two-stage recovery used in Module B was not available either.
The xAI API was never called.

**What is lost, specifically.** Short-form social is where single-beat
non-conversion statements live — "bought it cheaper elsewhere" (Substitution),
"waiting for the sale" (Latency). Those fit in one clause and are stated
publicly. Their absence removes the genre in which those two gates are most
visible.

Conversely, the format never carried Decision or Intent Decay well: both require
a *before and after* — wanting something, then the wanting changing — which a
short post cannot hold. So B4 depresses Substitution and Latency without
offsetting the Decision suppression described in B1.

**Combined effect with B3:** Substitution and Latency are lower bounds by B4;
Decision, Intent Decay and Latency are lower bounds by B3. **Latency is
suppressed by both**, and is the least trustworthy rate in the study.

---

## B5 — Beauty units excluded by the vertical gate

**Measured count: 0 beauty units. 269 `unclear` units excluded.**

Nykaa Beauty wishlist behaviour — replenishment cycles, shade matching, sale
stacking — is a different problem from Nykaa Fashion, and would have inflated
Economic and Latency if pooled. Replenishment makes deferral rational rather
than a failure, and shade uncertainty resembles Decision while arising from a
different mechanism entirely.

**Why the beauty count is zero, honestly.** Not because the gate found and
removed beauty units, but because beauty was excluded *at source*: the Play
package `com.fsn.nykaa` (Nykaa **Beauty**) was deliberately never scraped, and
only `com.fsn.nds` (Nykaa **Fashion**) was. The vertical gate is therefore a
safety net that caught nothing, not a filter that did work. It remains necessary:
Modules A and B draw from open sources where beauty content is unavoidable.

**What the gate did exclude: 269 Myntra units, tagged `unclear`.** Myntra is
fashion-dominant but also sells beauty, so a Myntra review naming no product
could be either. Rather than guess, those units are tagged `unclear` and excluded
from gate analysis, per the directive that unclear is never guessed.

AJIO and Nykaa Fashion units with no product term are tagged `fashion` on
catalogue grounds — those storefronts sell no beauty at all, so this is evidence
rather than inference. That distinction is what keeps 467 units in the analysis
that a blunter rule would have discarded.

| vertical | units | in gate analysis |
|---|---:|---|
| fashion | 796 | yes |
| mixed | 4 | yes |
| unclear | 269 | **no** |
| beauty | 0 | no |
| **gate-eligible** | **800** | |

---

## B6 — Behaviour-anchored retrieval requires vocabulary

*(previously B5)*

**Direction:** all gates, toward the articulate.

A unit enters the corpus only if its author used a saving-behaviour word
("wishlist", "saved for later", "shortlisted"). Someone who abandoned a purchase
without naming the mechanic is invisible.

This is a deliberate, accepted cost of gate-agnostic retrieval: anchoring on
behaviour instead of reason is what stops the study becoming a readout of its own
keyword list. Recorded as a known limitation, not a defect.

---

## B7 — Reddit comment-level narratives are absent

*(previously B4; largely absorbed by the revised B3, retained for specificity)*

**Direction:** Return / Re-engagement and Intent Decay **under-observed**.

The richest first-person evidence — "same, I had 40 things saved and never bought
any of them" — appears in comment *replies*. Reddit's official API supports no
comment search (`type` accepts `link`, `sr`, `user`), and the Pushshift mirror
that does refuses automated traffic.

Casual admissions of forgetting and drifting interest are made in comments;
submissions are written more deliberately and skew toward posts with a concrete,
articulable problem. Excluding comments suppresses exactly the two gates defined
by the *absence* of a concrete problem.

---

## B8 — English-only, Indian storefront

**Direction:** demographic skew.

Retrieval is `lang=en`, `country=in`. Hinglish and regional-language commentary
is excluded, skewing toward urban, English-writing, likely higher-income
shoppers. This plausibly suppresses the Economic gate relative to the true Indian
fashion e-commerce population.

---

## B9 — Nykaa Fashion subset is under-target and near source exhaustion

**Direction:** precision, not bias — but it limits subgroup claims.

The Nykaa Fashion subset stands at **74 units against an 80 target**. The Play
listing (`com.fsn.nds`) holds ~35,400 reviews and 30,000 were scanned, so the
source is close to exhausted; more depth will not move the number.

Nykaa-specific gate proportions rest on a small base and must carry explicit
uncertainty. Category-level and Nykaa-level counts are reported as separate
columns throughout and are never pooled.

---

## B10 — Genre monoculture

**Direction:** whole-taxonomy.

`source_genre` was added in Phase 1B to make genre effects visible. All 1,069
units are currently `app_review`. The schema can express three genres; the corpus
contains one.

Every gate proportion measured today is a proportion *within the app-review
genre*, and should be reported that way rather than as a proportion of Indian
fashion wishlist abandonment generally.

---

# Update — 2026-08-23, Phase 1C close. Retrieval permanently closed.

## B3 — NOT superseded. Reinforced.

B3 was to be superseded if Reddit and YouTube landed. **Neither landed.**

- **Reddit**: every route closed. Public JSON 403 since May 2026; the Pushshift
  mirror explicitly refuses automated agents and was not evaded; official API
  registration went unanswered for a month; the Apify route could not start
  (no token).
- **YouTube**: attempted and **measured dry** — 2,313 comments across 64 videos
  yielded 3 units, one arguably on-target.

The corpus remains **app reviews only**. Decision, Intent Decay and Latency stay
**lower bounds, not estimates**. No gate became newly observable.

## B4 — YouTube is now measured, not assumed

Previously B4 recorded short-form social as absent-by-decision. It is now absent
**by measurement**: 0.13% yield.

YouTube comments are addressed to the *creator*, not to the commenter's own
purchase history — "which lipstick is that?", not "I saved that and never bought
it". The genre is reaction, not recollection. Substitution and Latency therefore
gain no visibility from video comments, and their rates remain lower bounds.

## B11 — NEW: the non-conversion narrative is publicly unwritten

Eleven sources, three genres, ~95,000 items scanned. Four multi-token phrases
that would directly signal non-conversion — `saved it but`, `went to buy`,
`still haven't bought`, `meant to buy` — matched **zero** units in 1,069 app
reviews.

This is the study's most robust empirical finding and it is a finding about the
*phenomenon*, not about retrieval:

> People publish when something is done to them. Not buying a saved item wrongs
> nobody, so it produces almost no public text.

**Consequence for interpretation.** Every gate rate this corpus can produce is a
rate *among people who chose to write publicly about a wishlist*. That
population is dominated by the aggrieved. Gates with an external villain
(Purchasability, Economic) are structurally over-represented; gates that are
internal and blameless (Decision, Intent Decay, Return) are structurally
under-represented.

No amount of additional free-tier retrieval changes this. Closing the gap needs
a different instrument entirely — first-party wishlist telemetry, or primary
research such as a survey or diary study.

## B12 — NEW: retrieval precision is low and the intent filter is what carries quality

Measured precision of the base Play corpus is **16.7%** (n=30) by the same judge
used to gate new sources at 70%. New sources were therefore held to a bar the
existing corpus does not itself meet.

This asymmetry is recorded rather than resolved by quietly lowering the bar.
The defensible reading is that the 70% gate was a *retrieval-quality* screen for
admitting whole new genres, while unit-level quality is properly enforced
downstream by the codebook 4.1 intent filter — whose human-model agreement is
metric #1 of the validation report.

A reviewer should know both numbers: retrieval precision ~17%, with EXCLUDE
expected to be the largest single outcome at classification.
