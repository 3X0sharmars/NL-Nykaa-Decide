import os
import json
import re
import requests
from datetime import datetime, timezone
from dotenv import load_dotenv
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from google_play_scraper import reviews, Sort

load_dotenv()

app = Flask(__name__)
CORS(app)
# --- Thematic keyword groups for review filtering ---

CATEGORY_KEYWORDS = [
    "toys", "beauty", "personal care", "books", "electronics",
    "fashion", "sports", "baby", "pet", "pharmacy", "medicine",
    "cosmetics", "skincare", "grooming", "stationery", "gadgets",
]

COMPETITOR_KEYWORDS = [
    "amazon", "flipkart", "myntra", "nykaa", "firstcry",
    "meesho", "bigbasket", "jiomart", "swiggy instamart",
]

BEHAVIOR_KEYWORDS = [
    "explore", "discover", "new category", "never knew",
    "only groceries", "just groceries", "more than grocery",
    "variety", "selection", "trust", "quality", "range",
    "habit", "always order", "never tried", "didn't realize",
    "switched", "shifting", "started buying", "stopped using",
    "why not", "wish they had", "should add", "don't trust",
]

ALL_KEYWORDS = CATEGORY_KEYWORDS + COMPETITOR_KEYWORDS + BEHAVIOR_KEYWORDS


def fetch_play_store_reviews():
    """Collect Google Play Store reviews using multiple sort strategies,
    deduplicate, and filter by research-relevant keywords.

    Returns:
        tuple: (formatted_text, review_count, source_status)
            - formatted_text: string of filtered reviews for NVIDIA analysis
            - review_count: number of filtered reviews
            - source_status: dict with collection metadata and any errors
    """
    source_status = {
        "source": "Google Play Store",
        "app_id": "com.grofers.customerapp",
        "sorts_attempted": [],
        "total_fetched": 0,
        "duplicates_removed": 0,
        "keyword_matched": 0,
        "errors": [],
    }

    all_reviews = []

    # Fetch with multiple sort strategies for broader coverage
    sort_strategies = [
        (Sort.NEWEST, 400, "newest"),
        (Sort.MOST_RELEVANT, 400, "most_relevant"),
    ]

    for sort_type, count, label in sort_strategies:
        try:
            result_reviews, _ = reviews(
                "com.grofers.customerapp",
                lang="en",
                country="in",
                sort=sort_type,
                count=count,
            )
            all_reviews.extend(result_reviews)
            source_status["sorts_attempted"].append({
                "sort": label,
                "requested": count,
                "returned": len(result_reviews),
                "status": "ok",
            })
        except Exception as e:
            source_status["sorts_attempted"].append({
                "sort": label,
                "requested": count,
                "returned": 0,
                "status": "error",
                "error": str(e),
            })
            source_status["errors"].append(
                f"Play Store fetch ({label}) failed: {e}"
            )

    # Deduplicate by review content
    seen_content = set()
    unique_reviews = []
    for r in all_reviews:
        content = (r.get("content") or "").strip()
        if content and content not in seen_content:
            seen_content.add(content)
            unique_reviews.append(r)

    source_status["total_fetched"] = len(all_reviews)
    source_status["duplicates_removed"] = len(all_reviews) - len(unique_reviews)

    # Filter by keyword relevance
    filtered = []
    for r in unique_reviews:
        text = (r.get("content") or "").lower()
        if any(kw in text for kw in ALL_KEYWORDS):
            rating = r.get("score", "N/A")
            date = r.get("at", "N/A")
            thumbs = r.get("thumbsUpCount", 0)
            review_text = r.get("content", "")
            filtered.append(
                f"Rating: {rating} | Date: {date} | ThumbsUp: {thumbs}\n{review_text}"
            )

    source_status["keyword_matched"] = len(filtered)

    count = len(filtered)
    header = f"Filtered Play Store Reviews ({count} of {len(unique_reviews)} unique reviews):\n"
    body = "\n---\n".join(filtered) if filtered else "(No reviews matched the research keywords.)"

    return header + body, count, source_status


REDDIT_CURATED_DATA = """
Source: r/bangalore — "Fraud by Blinkit in Bangalore" (u/Adventurous-Parsnip3)
Ordered 5L + 1L oil combo for Rs 1072; only 5L delivered. Blinkit offered a Rs 100
coupon against a pro-rata loss of Rs 178.83, citing an internal policy cap. User
escalated via @BlinkitCares on X and eventually got a Rs 180 refund after public
pressure. Quote: "Blinkit makes Rs. 178 more on every unit sold for customers who
don't notice... and Rs. 78 on every customer who they get to agree."

Source: r/india — "Frustrated with Blinkit/Zepto's customer service"
Users describe repeated financial losses from missing/damaged items with no human
escalation path. Quote: "I've already lost money multiple times because of missing
or faulty items... there's no proper way to escalate the issue."

Source: r/india — "PSA: Beware of Blinkit. They're as shitty and scammy as Zepto"
User spent over Rs 2,000 on premium cat food; wrong items delivered, and the return
was denied because the order was flagged as a "bulk" purchase. Quote: "How was I
responsible for their fuck up?"

Source: r/india — "Pls check your Blinkit deliveries"
Multiple users report underweight produce and tampered packaging, suspecting
systemic pilferage by delivery staff on low-value items. Quote: "I feel this isn't
by accident but a rather thought out way to scam."

Source: r/bangalore — "Blinkit is no good either"
Users describe support chat being hard to find, then agents pushing redelivery
instead of refunds. Quote: "I had to treasure hunt to find the chat support...
they said no, raise query again after sometime and then we will deliver."

Source: r/bangalore — "Blinkit's Shady Refund Tactics" (u/Abhishek4996)
Refunds for platform errors issued as 30-day expiring promo codes rather than to
the original payment method, without clear disclosure. Quote: "The SMS wording
implies it's a free gift, not a refund."

Source: r/india — "Blinkit will deliver Sony PlayStation 5 in just 10 minutes.
But why, asks Internet"
Community reaction to Blinkit listing premium consoles, mocking the mismatch
between grocery-grade logistics and luxury retail. Quote: "How to solve a problem
which does not exist."

Source: r/bangalore — "People on iOS better uninstall Zepto"
Users allege Zepto charges iOS users up to 20% more than Android users for
identical items. Quote: "That charge more because they can, because they believe
Apple users spend more."

Source: r/ps5india — "Be careful buying ps5 from blinkit"
Delivery agent arrived with a Rs 55,000 console, then Blinkit cancelled the order
without handing it over; refund was delayed until the user filed a legal
complaint. Quote: "My friend filed a consumer complaint against them and within
24 hours they initiated the refund."

Source: r/ps5india — "Ordered PS5 from Blinkit, packaging completely damaged"
Console arrived with severely torn packaging; no replacement available, forcing a
lengthy return. Quote: "Looks like opened box (used)."

Source: r/ps5india — "Shall I order ps5 controller from blinkit? Or go to local
stores..."
Community unanimously advises against high-value purchases on quick commerce due
to unreliable returns. Quote: "Don't buy anything expensive from Blinkit or Zepto
because their returns are not reliable. I have been burned a couple of times."

Source: r/ps5india — "My PS5 Blinkit Buying Experience – A Wild Ride!"
User tried to visually inspect stock at a dark store before buying; was refused,
then had their account suspended for "irregular shopping patterns" after
completing the purchase. Quote: "Bruhh?? I paid. I got the item. What's the
issue?"

Source: r/IndianSkincareAddicts — "Got this for 123rs in zepto. Is it authentic?"
User suspects counterfeit skincare due to greasy, degraded packaging on a heavily
discounted item. Quote: "I feel it's either old stock or they spilled something
in the warehouse hence trying to get rid of it."

Source: r/IndianBeautyDeals — "Olaplex for B1G1 at zepto"
Users found new manufacturing-date stickers layered over original batch codes,
implying expired haircare was relabeled and resold. Quote: "They are most likely
printing new import labels with new dates and selling off expired items."

Source: r/IndianSkincareAddicts — "Beware! Zepto selling fake beauty care
products!"
Comparison against a specialty retailer found the quick-commerce skincare patches
thin and ineffective. Quote: "Don't buy from Zepto. They'll send you fake
products and probably ruin your skin even more."

Source: r/IndianBeautyDeals — "Why are zepto products always dirty"
Widespread complaints of personal-care items arriving coated in warehouse dust and
grime. Quote: "If you see their warehouse then you won't buy anything from them."

Source: r/bangalore — "Made a simple tool to search grocery & medicine across
multiple [apps]"
A user built a price-comparison scraper because manually checking prices across
quick-commerce apps was too tedious. Quote: "I was tired of manually searching for
the same product across multiple stores to compare prices."

Source: r/LegalAdviceIndia — "Please advise what I should do — I received an
empty box from Zepto"
User gave the delivery OTP before inspecting an open-box item; box was empty, and
Zepto closed the ₹15,600 dispute on a procedural technicality. Quote: "Zepto duped
me by trusting me and taking no accountability."

Source: r/FuckZepto — "I ordered a Marshall speaker worth 8k on Zepto and got a
fake box with a Diya"
User received a decorative clay lamp instead of an ₹8,000 speaker; community
response blamed the user for buying electronics via quick commerce at all. Quote:
"Who the f*** orders an 8k speaker from Zepto? Bro go outside or use Amazon!"

Source: r/delhi — "Got scammed by Blinkit"
User ordered a 1-gram gold coin, received 0.5 grams; the standard 20-minute
dispute window (designed for groceries) had already lapsed by the time it was
noticed, blocking all support. Quote: "3 out of 5 times they give me broken eggs
tray and you guys trust them for gold."

Source: r/bangalore — selective fulfillment on damaged goods (u/deleted)
User provided photo proof of 15+ broken eggs in an order; Blinkit refunded only 6
of them despite the evidence.

Source: r/bangalore — dark-pattern cart additions (u/ANYTHIN6)
A discounted, non-returnable ~Rs 2,000 item was automatically added to the user's
cart without clear consent, then couldn't be removed or returned.

Source: r/delhi — high-value order fulfillment failure (u/Dum_reptile)
User ordered ~Rs 5,000 worth of goods, received roughly Rs 2,000 worth. Quote:
"I will probably never order again from Blinkit in large amounts."

Source: r/ps5india — relative trust in gaming category (u/Raijjin)
Notably, some users see Blinkit's 10-minute window as *safer* than Amazon/Flipkart
for game discs specifically, reasoning that the short transit window limits
opportunities for tampering/swapping. Quote: "We can feel safe ordering from them
and not getting scammed compared to Flipkart/Amazon."
""".strip()


def fetch_reddit_discussions():
    """Return manually curated Reddit discussion snippets.

    Live automated Reddit collection (via Reddit API and via Grok's web_search
    tool) was attempted and blocked by auth issues within this project's
    timeline. This is a deliberate, disclosed scope decision: Play Store
    reviews are collected live via API; Reddit signal is manually curated for
    this MVP, with automated ingestion identified as a next iteration.
    """
    source_status = {
        "source": "Reddit (manually curated for MVP scope)",
        "total_fetched": REDDIT_CURATED_DATA.count("Source:"),
        "errors": [],
    }
    count = source_status["total_fetched"]
    header = f"Reddit Discussions (manually curated, {count} threads):\n"
    return header + REDDIT_CURATED_DATA, count, source_status


def validate_collected_data(reviews_text, source_status):
    """Data quality gate: ensure only clean, real user data reaches NVIDIA.

    - Strips any lines that look like error messages
    - Validates minimum data thresholds
    - Returns clean data and a separate status report

    Args:
        reviews_text: raw formatted review text from Play Store scraper
        source_status: dict with collection metadata

    Returns:
        tuple: (clean_data, quality_report)
            - clean_data: sanitized text safe to send to NVIDIA
            - quality_report: dict describing data quality
    """
    # Defensive: strip any lines that look like error strings
    error_patterns = [
        r"^.*(?:API error|Error:|Exception:|Traceback|status_code|Resource exhausted).*$",
    ]
    lines = reviews_text.split("\n")
    clean_lines = []
    stripped_count = 0
    for line in lines:
        is_error = False
        for pattern in error_patterns:
            if re.match(pattern, line, re.IGNORECASE):
                is_error = True
                stripped_count += 1
                break
        if not is_error:
            clean_lines.append(line)

    clean_data = "\n".join(clean_lines)

    review_count = source_status.get("keyword_matched", 0)
    quality_report = {
        "is_sufficient": review_count >= 5,
        "review_count": review_count,
        "error_lines_stripped": stripped_count,
        "source_errors": source_status.get("errors", []),
        "data_chars": len(clean_data),
    }

    if not quality_report["is_sufficient"]:
        quality_report["warning"] = (
            f"Only {review_count} reviews matched research keywords. "
            "Analysis may have limited evidence."
        )

    return clean_data, quality_report


def _budget_raw_data(raw_data, limit=9000):
    """Split raw_data on its 'SOURCE NAME:' headers and give each source an
    equal share of `limit` characters, so one long source can't silently
    starve another out of the LLM's context window."""
    parts = re.split(r"(?=^[A-Z][A-Z \-]+:\n)", raw_data, flags=re.MULTILINE)
    parts = [p for p in parts if p.strip()]
    if len(parts) <= 1:
        return raw_data[:limit]
    per_source = limit // len(parts)
    return "\n\n".join(p[:per_source] for p in parts)


def run_analysis(raw_data):
    url = "https://integrate.api.nvidia.com/v1/chat/completions"

    api_key = os.getenv("NVIDIA_API_KEY", "").strip()


    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }

    analysis_prompt = (
        "You are a senior product research analyst specializing in "
        "Indian quick commerce consumer behavior. "
        "Respond ONLY with pure valid JSON. "
        "No markdown. No backticks. No explanation. Pure JSON only.\n\n"
        "Analyze this data about Blinkit user behavior.\n\n"
        "CRITICAL TYPE RULES:\n"
        "- questions MUST be a JSON array of objects\n"
        "- each question's evidence MUST be a JSON array of strings\n"
        "- themes MUST be a JSON array of objects\n"
        "- segments MUST be a JSON array of strings\n"
        "- failure_analysis MUST be a JSON array of objects\n"
        "- validation_gaps MUST be a JSON array of strings\n\n"
        "Return exactly this JSON structure:\n"
        "{\n"
        '  "questions": [\n'
        '    {\n'
        '      "id": "Q1",\n'
        '      "question": "string",\n'
        '      "answer": "2-3 sentence string",\n'
        '      "evidence": ["string quote 1", "string quote 2"],\n'
        '      "confidence_score": "High or Medium or Low",\n'
        '      "confidence_explanation": "one line string",\n'
        '      "confidence_pct": integer 0-100, your numeric estimate matching confidence_score '
        '(High is roughly 75-95, Medium roughly 45-74, Low roughly 10-44)\n'
        '    }\n'
        "  ],\n"
        '  "themes": [\n'
        '    {\n'
        '      "name": "string",\n'
        '      "frequency": "High or Medium or Low",\n'
        '      "description": "one line string",\n'
        '      "sentiment_score": -100 to 100 integer, negative means users are frustrated/critical about this theme, positive means favorable,\n'
        '      "verbatim_count": integer, your best estimate of how many reviews in the raw data actually touch this theme\n'
        '    }\n'
        "  ],\n"
        '  "segments": ["string1", "string2"],\n'
        '  "failure_analysis": [\n'
        '    {\n'
        '      "case": "string",\n'
        '      "resolution": "string"\n'
        '    }\n'
        "  ],\n"
        '  "validation_gaps": ["string1", "string2", "string3", "string4"]\n'
        "}\n\n"
        "Answer these 5 research questions with evidence:\n"
        "Q1: Why do frequent Blinkit users buy only groceries "
        "despite Beauty Personal Care Books Electronics "
        "Fashion Sports Toys being available?\n"
        "Q2: What triggers switching to Amazon FirstCry "
        "Nykaa Myntra instead of exploring Blinkit?\n"
        "Q3: What would build trust for non-grocery "
        "categories on Blinkit?\n"
        "Q4: Have users expanded beyond grocery on Blinkit? "
        "What changed their behavior?\n"
        "Q5: Which non-grocery categories are most mentioned "
        "as unmet needs on Blinkit?\n\n"
        "Include exactly 5 questions, 5 themes, "
        "3 failure analysis cases, 4 validation gaps.\n\n"
        "RAW DATA:\n" + _budget_raw_data(raw_data, limit=9000)
    )

    payload = {
        "model": "meta/llama-3.1-8b-instruct",
        "messages": [
            {
                "role": "system",
                "content": "You are a product research analyst. Always respond with pure valid JSON only. No markdown, no backticks, no explanation."
            },
            {
                "role": "user",
                "content": analysis_prompt
            }
        ],
        "temperature": 0.2,
        "max_tokens": 2000
    }

    print("========== REQUEST INFO ==========")
    print("API Key Exists:", bool(api_key))
    print("API Key Length:", len(api_key))
    print("Model:", payload["model"])
    print("Raw Data Length:", len(raw_data))
    print("==================================")

    response = requests.post(
        url,
        headers=headers,
        json=payload,
        timeout=120
    )

    if response.status_code != 200:
        print("========== NVIDIA ERROR ==========")
        print("Status:", response.status_code)
        print("Headers:", dict(response.headers))
        print("Response Body:")
        print(response.text)
        print("Request Model:", payload.get("model"))
        print("Request URL:", url)
        print("==================================")

    response.raise_for_status()
    data = response.json()
    content = data["choices"][0]["message"]["content"]

    # Clean any markdown if model adds it
    content = content.strip()
    if content.startswith("```"):
        content = re.sub(r"^```(?:json)?\s*", "", content)
        content = re.sub(r"\s*```$", "", content)

    parsed = json.loads(content)
    return normalize_analysis(parsed)


def _ensure_list(val):
    """Coerce a value into a list. Arrays pass through, strings wrap, nulls become []."""
    if isinstance(val, list):
        return val
    if val is None:
        return []
    if isinstance(val, str):
        return [val]
    if isinstance(val, dict):
        return [val]
    return [str(val)]


def _safe_pct(val, fallback):
    """Coerce a value into an int clamped to 0-100. Falls back on bad/missing input."""
    try:
        n = int(round(float(val)))
    except (TypeError, ValueError):
        return fallback
    return max(0, min(100, n))


def _safe_signed_pct(val, fallback=0):
    """Coerce a value into an int clamped to -100..100. Falls back on bad/missing input."""
    try:
        n = int(round(float(val)))
    except (TypeError, ValueError):
        return fallback
    return max(-100, min(100, n))


def _safe_count(val, fallback=0):
    """Coerce a value into a non-negative int. Falls back on bad/missing input."""
    try:
        n = int(round(float(val)))
    except (TypeError, ValueError):
        return fallback
    return max(0, n)


# Maps the qualitative High/Medium/Low label to a numeric midpoint, used only
# when the model returns confidence_score but omits confidence_pct.
_CONFIDENCE_PCT_FALLBACK = {"high": 85, "medium": 60, "low": 30}


def normalize_analysis(data):
    """Ensure every field the frontend iterates over is a proper array,
    and every numeric field is a safe, clamped number (never a stray string
    or None that would break the UI's progress bars / charts)."""
    if not isinstance(data, dict):
        print(f"[WARN] NVIDIA returned non-dict top-level type: {type(data)}")
        return data

    # Top-level arrays
    for key in ("questions", "themes", "segments", "failure_analysis", "validation_gaps"):
        data[key] = _ensure_list(data.get(key))

    # Nested: each question's evidence array
    for q in data.get("questions", []):
        if isinstance(q, dict):
            q["evidence"] = _ensure_list(q.get("evidence"))
            # Ensure string fields have fallbacks
            q.setdefault("id", "")
            q.setdefault("question", "")
            q.setdefault("answer", "")
            q.setdefault("confidence_score", "Low")
            q.setdefault("confidence_explanation", "")

            fallback_pct = _CONFIDENCE_PCT_FALLBACK.get(
                str(q.get("confidence_score", "Low")).lower(), 30
            )
            q["confidence_pct"] = _safe_pct(q.get("confidence_pct"), fallback_pct)

    # Ensure theme objects have required fields
    for t in data.get("themes", []):
        if isinstance(t, dict):
            t.setdefault("name", "")
            t.setdefault("frequency", "Medium")
            t.setdefault("description", "")
            t["sentiment_score"] = _safe_signed_pct(t.get("sentiment_score"), 0)
            t["verbatim_count"] = _safe_count(t.get("verbatim_count"), 0)

    # Ensure failure_analysis objects have required fields
    for f in data.get("failure_analysis", []):
        if isinstance(f, dict):
            f.setdefault("case", "")
            f.setdefault("resolution", "")

    return data


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/collect", methods=["POST"])
def collect():
    try:
        play_data, ps_count, ps_status = fetch_play_store_reviews()
        reddit_data, reddit_count, reddit_status = fetch_reddit_discussions()

        # Run each source through the quality gate separately so one
        # source's errors can't silently swallow the other's data
        clean_play, ps_quality = validate_collected_data(play_data, ps_status)
        clean_reddit, reddit_quality = validate_collected_data(reddit_data, reddit_status)

        raw_data = (
            f"PLAY STORE REVIEWS:\n{clean_play}\n\n"
            f"REDDIT DISCUSSIONS:\n{clean_reddit}"
        )

        response_payload = {
            "status": "success",
            "raw_data": raw_data,
            "meta": {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "play_store_reviews": ps_count,
                "reddit_sources": reddit_count,
                "total_fetched": ps_status.get("total_fetched", 0),
                "duplicates_removed": ps_status.get("duplicates_removed", 0),
                "total_chars": len(raw_data),
            },
        }

        # Surface data quality warnings without polluting the data
        warnings = []
        if ps_quality.get("warning"):
            warnings.append(f"Play Store: {ps_quality['warning']}")
        if reddit_quality.get("warning"):
            warnings.append(f"Reddit: {reddit_quality['warning']}")
        if warnings:
            response_payload["meta"]["quality_warning"] = " | ".join(warnings)

        source_errors = ps_status.get("errors", []) + reddit_status.get("errors", [])
        if source_errors:
            response_payload["meta"]["source_errors"] = source_errors

        return jsonify(response_payload)

    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
        })


@app.route("/analyze", methods=["POST"])
def analyze():
    try:
        raw_data = request.json.get("raw_data", "")

        if not raw_data:
            # Re-collect from both sources if no data was passed
            play_data, ps_count, ps_status = fetch_play_store_reviews()
            reddit_data, reddit_count, reddit_status = fetch_reddit_discussions()
            clean_play, _ = validate_collected_data(play_data, ps_status)
            clean_reddit, _ = validate_collected_data(reddit_data, reddit_status)
            raw_data = (
                f"PLAY STORE REVIEWS:\n{clean_play}\n\n"
                f"REDDIT DISCUSSIONS:\n{clean_reddit}"
            )
        else:
            ps_count = raw_data.count("\n---\n") + 1

        analysis = run_analysis(raw_data)

        return jsonify({
            "status": "success",
            "data": analysis,
            "meta": {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "play_store_reviews": ps_count,
                "total_chars": len(raw_data),
            },
        })
    except Exception as e:
        return jsonify({
            "status": "error",
            "message": str(e),
        })


@app.route("/api/recommend", methods=["POST", "OPTIONS"])
def recommend():
    if request.method == "OPTIONS":
        response = jsonify({})
        response.headers.add("Access-Control-Allow-Origin", "*")
        response.headers.add("Access-Control-Allow-Headers", "Content-Type")
        response.headers.add("Access-Control-Allow-Methods", "POST, OPTIONS")
        return response
    
    try:
        data = request.json
        cart = data.get("cart", {})
        prompt = data.get("prompt", "")

        headers = {
            "Authorization": f"Bearer {os.getenv('NVIDIA_API_KEY')}",
            "Content-Type": "application/json"
        }

        payload = {
            "model": "meta/llama-3.1-8b-instruct",
            "messages": [
                {
                    "role": "system",
                    "content": "You are a product recommendation engine. Always respond with pure valid JSON only. No markdown. No backticks. No explanation."
                },
                {
                    "role": "user",
                    "content": prompt
                }
            ],
            "temperature": 0.4,
            "max_tokens": 1000
        }

        response = requests.post(
            "https://integrate.api.nvidia.com/v1/chat/completions",
            headers=headers,
            json=payload,
            timeout=60
        )
        response.raise_for_status()
        result = response.json()
        content = result["choices"][0]["message"]["content"]
        
        # Clean markdown if present
        content = content.strip()
        if content.startswith("```"):
            content = re.sub(r"^```(?:json)?\s*", "", content)
            content = re.sub(r"\s*```$", "", content)
        
        resp = jsonify({
            "status": "success",
            "data": json.loads(content)
        })
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp
        
    except Exception as e:
        resp = jsonify({
            "status": "error",
            "message": str(e)
        })
        resp.headers.add("Access-Control-Allow-Origin", "*")
        return resp, 500


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)
