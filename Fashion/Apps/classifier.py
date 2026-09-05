"""
Listing Transparency Layer — v1 classifier
Reads the tail-SKU audit CSV and produces, per SKU, the three buckets
(Committed / Claimed-but-unbacked / Not-stated) plus a contradiction flag.

IMPORTANT SCOPE NOTE (read before treating this as the production classifier):
This audit CSV contains *pre-extracted, human-curated* fields
(marketing_adjectives_verbatim, what_tool_could_say, etc.) rather than raw
listing text. That means:
  - Committed / Not-stated buckets CAN be built and tested against this data,
    because they come straight from the structured spec-table columns
    (fabric_composition_stated, weight_gsm_stated, flat_measurements_stated,
    fit_descriptor_verbatim, care_instructions_stated) — this is exactly
    what a scraper would hand the classifier in production.
  - The Claimed-but-unbacked bucket in this script classifies the adjective
    phrases that a human already pulled out (marketing_adjectives_verbatim).
    A production classifier has to extract those phrases itself from raw
    description text first — that extraction step is NOT testable against
    this CSV, because raw description text isn't a column here. Flag this
    as a fast-follow, not a v1 blocker: the "Not-stated" bucket, driven purely
    by structured fields, is doing the load-bearing work either way.
  - Contradiction detection: only SKU21 in this audit has a documented
    material contradiction, and it's spelled out inside the
    fabric_composition_verbatim field itself ("Table says X; description
    says Y"). The regex below catches that pattern. A general-purpose
    version needs raw description text as a second input, so it can diff
    the spec-table material class against material words mentioned in the
    description — see `material_conflict()` for the intended production logic,
    included here but currently unexercised beyond SKU21 (N=1 case in this data).
"""

import csv
import json
import re

INPUT_CSV = "/mnt/user-data/uploads/tail_sku_audit_filled_corrected.csv"
OUTPUT_JSON = "/home/claude/transparency_layer_output.json"

# Fields a buyer needs but that never appear in this audit — grounded in
# (a) what's absent across the 21 SKUs and (b) the interview quote each maps to.
NOT_STATED_CATALOG = {
    "fibre_percentage": "Unsure on quality of leather",
    "weight_gsm": "Unsure on the quality for the premium paid",
    "flat_measurements": "What am I getting exactly?",
    "colour_accuracy_statement": "colour will match the one visible on screen",
}

# Material-class ontology for contradiction detection (production intent:
# compare spec-table material class vs. material words found in raw description).
MATERIAL_CLASSES = {
    "cotton": ["cotton"],
    "leather": ["leather"],
    "synthetic_leather": ["synthetic leather", "faux leather", "pu leather"],
    "denim": ["denim"],
    "polyester": ["polyester", "microfiber", "micro polyester"],
    "nylon": ["nylon"],
    "wool": ["wool"],
}

# Synonyms/subtypes that must NOT fire a contradiction (fix #3 from review).
SAME_CLASS_OK = {
    ("cotton", "cotton"),
    ("leather", "synthetic_leather"),  # grade dispute, not a class conflict
}


def classify_material(text):
    text = (text or "").lower()
    found = []
    for cls, keywords in MATERIAL_CLASSES.items():
        if any(kw in text for kw in keywords):
            found.append(cls)
    return found


def material_conflict(spec_text, description_text):
    """Production rule: fire only on genuine cross-family conflicts
    (e.g. cotton vs leather), never on synonyms/subtypes (cotton vs cotton-blend)."""
    spec_classes = set(classify_material(spec_text))
    desc_classes = set(classify_material(description_text))
    if not spec_classes or not desc_classes:
        return False
    for s in spec_classes:
        for d in desc_classes:
            if s == d:
                return False
            if (s, d) in SAME_CLASS_OK or (d, s) in SAME_CLASS_OK:
                continue
            return True
    return False


EMBEDDED_CONTRADICTION_RE = re.compile(
    r'table says[^;]+;\s*description says', re.IGNORECASE
)


def parse_adjectives(raw):
    if not raw:
        return []
    if ";" in raw or '"' in raw:
        parts = re.findall(r'"([^"]+)"', raw)
        if not parts:
            parts = [p.strip() for p in raw.split(";") if p.strip()]
    else:
        parts = [p.strip() for p in raw.split(",") if p.strip()]
    return parts


# Marketing words that sellers sometimes embed directly inside the spec-table
# material cell itself (not just the free-text description). Found by hand-verifying
# all 21 classifier outputs against the audit: SKU05 "High-Quality Cotton", SKU06
# "durable nylon blend", SKU08 "high quality cotton" — 3/21 contaminated (85.7% clean
# before this fix). Strip these from the Committed value; surface them separately
# in claimed_but_unbacked instead of silently keeping or silently dropping them.
MATERIAL_FIELD_MARKETING_TERMS = [
    "high-quality", "high quality", "durable", "premium", "superior",
    "finest", "luxurious", "top quality",
]


def split_material_value(raw):
    """Returns (clean_material_value, [stripped_marketing_terms])."""
    text = raw or ""
    stripped = []
    clean = text
    for term in MATERIAL_FIELD_MARKETING_TERMS:
        pattern = re.compile(re.escape(term), re.IGNORECASE)
        if pattern.search(clean):
            stripped.append(term)
            clean = pattern.sub("", clean)
    # tidy up leftover punctuation/whitespace from the strip
    clean = re.sub(r'\s{2,}', ' ', clean).strip(" ;,")
    # dedupe segments like "Nylon; nylon blend" -> "Nylon blend" after stripping adjectives
    segments = [s.strip() for s in clean.split(";") if s.strip()]
    seen_lower = []
    deduped = []
    for seg in segments:
        if seg.lower() not in seen_lower:
            deduped.append(seg)
            seen_lower.append(seg.lower())
    clean = "; ".join(deduped) if len(deduped) > 1 else (deduped[0] if deduped else clean)
    return clean, stripped


def build_committed(row):
    committed = []
    contaminants = []
    if row["fabric_composition_stated"] == "Y" and not EMBEDDED_CONTRADICTION_RE.search(
        row["fabric_composition_verbatim"] or ""
    ):
        clean_material, stripped_terms = split_material_value(row["fabric_composition_verbatim"])
        committed.append({"field": "material", "value": clean_material})
        contaminants = stripped_terms
    if row["weight_gsm_stated"] == "Y" and row["weight_gsm_verbatim"]:
        committed.append({"field": "fabric_weight_gsm", "value": row["weight_gsm_verbatim"]})
    if row["flat_measurements_stated"] == "Y" and row["measurements_verbatim"]:
        committed.append({"field": "flat_measurements", "value": row["measurements_verbatim"]})
    fit_val = (row["fit_descriptor_verbatim"] or "").strip()
    if fit_val and fit_val.upper() != "N/A" and "(" not in fit_val:
        committed.append({"field": "fit", "value": fit_val})
    if row["care_instructions_stated"] == "Y":
        committed.append({"field": "care_instructions", "value": "stated in spec table"})
    return committed, contaminants


def build_not_stated(row):
    not_stated = []
    if row["weight_gsm_stated"] != "Y":
        not_stated.append({"field": "weight_gsm", "resolves_quote": NOT_STATED_CATALOG["weight_gsm"]})
    if row["flat_measurements_stated"] != "Y":
        not_stated.append(
            {"field": "flat_measurements", "resolves_quote": NOT_STATED_CATALOG["flat_measurements"]}
        )
    fabric_text = row["fabric_composition_verbatim"] or ""
    if row["fabric_composition_stated"] != "Y" or "%" not in fabric_text:
        not_stated.append(
            {"field": "fibre_percentage", "resolves_quote": NOT_STATED_CATALOG["fibre_percentage"]}
        )
    not_stated.append(
        {"field": "colour_accuracy_statement", "resolves_quote": NOT_STATED_CATALOG["colour_accuracy_statement"]}
    )
    return not_stated


def classify_row(row):
    is_contradiction = bool(EMBEDDED_CONTRADICTION_RE.search(row["fabric_composition_verbatim"] or ""))
    rc = row["review_count"]
    committed, spec_table_contaminants = build_committed(row)
    not_stated = build_not_stated(row)
    claimed_unbacked = parse_adjectives(row["marketing_adjectives_verbatim"]) + spec_table_contaminants
    return {
        "sku_id": row["sku_id"],
        "category": row["category"],
        "review_count": rc if rc else "0/unconfirmed",
        "is_genuinely_tail": not (rc.isdigit() and int(rc) >= 20),
        "committed": committed,
        "claimed_but_unbacked": claimed_unbacked,
        "not_stated": not_stated,
        "not_stated_count": len(not_stated),
        "contradiction_flag": is_contradiction,
        "contradiction_detail": row["fabric_composition_verbatim"] if is_contradiction else None,
    }


def main():
    with open(INPUT_CSV, newline="", encoding="utf-8") as f:
        rows = list(csv.DictReader(f))

    results = [classify_row(r) for r in rows]

    with open(OUTPUT_JSON, "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)

    n = len(results)
    n_tail = sum(r["is_genuinely_tail"] for r in results)
    n_contradiction = sum(r["contradiction_flag"] for r in results)
    n_empty_committed = sum(len(r["committed"]) == 0 for r in results)
    avg_not_stated = sum(r["not_stated_count"] for r in results) / n

    print(f"SKUs processed: {n}")
    print(f"Genuinely tail (<20 reviews): {n_tail}  |  Not tail (swap out): {n - n_tail}")
    print(f"Contradiction flags fired: {n_contradiction}")
    print(f"SKUs with zero committed facts: {n_empty_committed}")
    print(f"Average not-stated fields per SKU: {avg_not_stated:.2f}")
    print(f"Output written to {OUTPUT_JSON}")


if __name__ == "__main__":
    main()
