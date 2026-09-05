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
        '      "confidence_explanation": "one line string"\n'
        '    }\n'
        "  ],\n"
        '  "themes": [\n'
        '    {\n'
        '      "name": "string",\n'
        '      "frequency": "High or Medium or Low",\n'
        '      "description": "one line string"\n'
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
        "RAW DATA:\n" + raw_data[:5000]
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


def normalize_analysis(data):
    """Ensure every field the frontend iterates over is a proper array."""
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

    # Ensure theme objects have required fields
    for t in data.get("themes", []):
        if isinstance(t, dict):
            t.setdefault("name", "")
            t.setdefault("frequency", "Medium")
            t.setdefault("description", "")

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
        play_data, ps_count, source_status = fetch_play_store_reviews()

        # Run data through quality gate
        clean_data, quality_report = validate_collected_data(play_data, source_status)

        raw_data = f"PLAY STORE REVIEWS:\n{clean_data}"

        response_payload = {
            "status": "success",
            "raw_data": raw_data,
            "meta": {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "play_store_reviews": ps_count,
                "total_fetched": source_status.get("total_fetched", 0),
                "duplicates_removed": source_status.get("duplicates_removed", 0),
                "total_chars": len(raw_data),
            },
        }

        # Surface data quality warnings without polluting the data
        if quality_report.get("warning"):
            response_payload["meta"]["quality_warning"] = quality_report["warning"]
        if quality_report.get("error_lines_stripped", 0) > 0:
            response_payload["meta"]["error_lines_stripped"] = quality_report["error_lines_stripped"]
        if source_status.get("errors"):
            response_payload["meta"]["source_errors"] = source_status["errors"]

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
            # Re-collect from Play Store if no data was passed
            play_data, ps_count, source_status = fetch_play_store_reviews()
            clean_data, quality_report = validate_collected_data(play_data, source_status)
            raw_data = f"PLAY STORE REVIEWS:\n{clean_data}"
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
