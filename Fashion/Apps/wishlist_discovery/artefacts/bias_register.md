# Bias Register

Known, named distortions in the evidence corpus. Each entry states the bias,
which gate it distorts, and in which direction.

**These are not netted into a correction factor.** Two biases pulling opposite
ways on the same gate do not cancel — they are different populations making
different errors, and averaging them would manufacture a false precision that
the evidence cannot support. Each is carried separately into interpretation.

Codebook v1.1. Last updated 2026-08-22.

---

## B1 — App-store reviews under-observe DECISION

**Source affected:** `playstore`, `appstore` (currently 100% of the corpus)

**Direction:** Decision / Uncertainty is **under-observed**.

**Mechanism.** People write app-store reviews to complain about the app or to
request features. The genre rewards grievance about the product-as-software:
crashes, wishlist capacity limits, sort options, items vanishing from the saved
list. It does not reward introspection about one's own purchase hesitation.
Nobody opens the Play Store to write "I still want this kurta but I can't tell
if the fit will work."

Decision failures are internal, unresolved, and not anybody's fault — precisely
the class of experience that generates no complaint. Gates that have an
identifiable villain (Purchasability: "my size was gone"; Economic: "the price
jumped after I saved it") are over-represented in this register by the same
logic.

**Expected distortion:** Decision suppressed. Purchasability and Economic
inflated relative to their true share.

---

## B2 — Fashion communities over-observe DECISION

**Source affected:** `reddit`, specifically r/IndianFashionAddicts,
r/femalefashionadvice, r/malefashionadvice, r/IndianFashion

**Direction:** Decision / Uncertainty is **over-observed**.

**Mechanism.** These are communities of enthusiasts. Their whole purpose is
deliberation — asking whether a cut suits a body type, whether a fabric is worth
the money, whether to size up. Members deliberate about fit, styling and quality
far more than the median shopper, and they post *in order to* resolve exactly
the uncertainty that defines the Decision gate.

Subreddit scoping sharpens precision but narrows the sampling frame onto this
population. The general-interest subreddits in the list (r/india, r/bangalore,
r/mumbai, r/delhi, r/IndiaSpeaks, r/TwoXIndia) partially offset this, and
r/Frugal_Ind pulls the other way toward Economic and Latency — but they do not
neutralise it.

**Expected distortion:** Decision inflated. Return / Re-engagement suppressed,
because forgetting an item is unremarkable and rarely worth a post.

---

## B1 ⇄ B2 — the opposing pair

B1 and B2 act on the **same gate in opposite directions**.

    app reviews        ---- Decision under-observed ---->
    fashion subreddits <--- Decision over-observed  -----

They must not be combined into a net adjustment. The corpus is currently 100%
app reviews (B1 only, uncorrected), so any Decision rate measured today is a
**floor**, not an estimate. If Reddit is later added, the Decision rate will
rise — and that rise will be partly real signal and partly B2, with no principled
way to separate the two from this data.

Report the Decision rate by source stratum. Never as a single pooled figure.

---

## B3 — Corpus is single-source

**Direction:** Whole-taxonomy distortion.

At the time of writing the corpus is **100% Google Play reviews**. Reddit is
blocked, forums are dry, and the App Store contributed nothing on the last run.
Every gate proportion currently reflects the app-review genre described in B1.

This is the single largest threat to the study's validity and outranks every
other entry here.

---

## B4 — Comment-level narratives are absent

**Direction:** Return / Re-engagement and Intent Decay **under-observed**.

The richest first-person non-conversion evidence — "same, I had 40 things saved
and never bought any of them" — appears in Reddit *comment replies*, not
submissions. Reddit's official API supports no comment search
(`type` accepts `link`, `sr`, `user`), and the Pushshift mirror that does
support it refuses automated agent traffic.

Casual admissions of forgetting and drifting interest are made in comments;
submissions are written with more deliberation and skew toward posts with a
concrete, articulable problem. Excluding comments therefore suppresses exactly
the two gates defined by the absence of a concrete problem.

---

## B5 — Behaviour-anchored retrieval requires vocabulary

**Direction:** All gates, toward the articulate.

A unit enters the corpus only if the author used a saving-behaviour word
("wishlist", "saved for later", "shortlisted"). Someone who abandoned a purchase
without ever naming the mechanic is invisible.

This is an accepted and deliberate cost of gate-agnostic retrieval: anchoring on
behaviour instead of reason is what stops the study becoming a readout of its
own keyword list. It is recorded here as a known limitation, not a defect.

---

## B6 — English-only, Indian storefront

**Direction:** Demographic skew.

Play and App Store pulls are `lang=en`, `country=in`. Hinglish and regional
language commentary is excluded, skewing toward urban, English-writing, likely
higher-income shoppers. This plausibly suppresses the Economic gate relative to
the true Indian fashion e-commerce population.

---

## B7 — Nykaa Fashion subset is under-target and near source exhaustion

**Direction:** Precision, not bias — but limits subgroup claims.

The Nykaa Fashion subset stands at **74 units against an 80 target**. The Play
listing (`com.fsn.nds`) holds ~35,400 reviews in total and 30,000 were already
scanned, so this source is close to exhausted; more depth will not move the
number much.

Nykaa-specific gate proportions rest on a small base and should carry explicit
uncertainty. Category-level and Nykaa-level counts are reported as separate
columns throughout and are never pooled.
