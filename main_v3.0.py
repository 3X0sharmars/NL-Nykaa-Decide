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


def fetch_app_store_reviews():
    """Collect Apple App Store reviews via the public iTunes RSS review feed
    (no API key required). Paginates across the first several pages and
    filters by the same research keywords used for Play Store.

    Blinkit's App Store ID (960335206) was resolved from the live
    "Blinkit: Groceries & more" listing on apps.apple.com.

    Returns:
        tuple: (formatted_text, review_count, source_status)
    """
    APP_STORE_ID = "960335206"
    source_status = {
        "source": "Apple App Store",
        "app_id": APP_STORE_ID,
        "pages_attempted": [],
        "total_fetched": 0,
        "duplicates_removed": 0,
        "keyword_matched": 0,
        "errors": [],
    }

    all_entries = []
    # Apple's RSS review feed only exposes ~10 pages (~500 reviews) before it
    # starts repeating; that's plenty for a research sample.
    for page in range(1, 6):
        url = (
            f"https://itunes.apple.com/in/rss/customerreviews/"
            f"page={page}/id={APP_STORE_ID}/sortby=mostrecent/json"
        )
        try:
            resp = requests.get(url, timeout=15, headers={"User-Agent": "Mozilla/5.0"})
            resp.raise_for_status()
            payload = resp.json()
            entries = payload.get("feed", {}).get("entry", [])
            # The first "entry" on page 1 is app metadata, not a review, when
            # the feed is short — guard for both list and dict shapes.
            if isinstance(entries, dict):
                entries = [entries]
            reviews_only = [e for e in entries if "im:rating" in e]
            all_entries.extend(reviews_only)
            source_status["pages_attempted"].append({
                "page": page, "returned": len(reviews_only), "status": "ok"
            })
            if not reviews_only:
                break  # no more pages available
        except Exception as e:
            source_status["pages_attempted"].append({
                "page": page, "returned": 0, "status": "error", "error": str(e)
            })
            source_status["errors"].append(f"App Store fetch (page {page}) failed: {e}")
            break

    # Deduplicate by review text
    seen_content = set()
    unique_entries = []
    for e in all_entries:
        content = (e.get("content", {}).get("label") or "").strip()
        if content and content not in seen_content:
            seen_content.add(content)
            unique_entries.append(e)

    source_status["total_fetched"] = len(all_entries)
    source_status["duplicates_removed"] = len(all_entries) - len(unique_entries)

    filtered = []
    for e in unique_entries:
        content = e.get("content", {}).get("label") or ""
        text = content.lower()
        if any(kw in text for kw in ALL_KEYWORDS):
            rating = e.get("im:rating", {}).get("label", "N/A")
            date = e.get("updated", {}).get("label", "N/A")
            filtered.append(f"Rating: {rating} | Date: {date}\n{content}")

    source_status["keyword_matched"] = len(filtered)
    count = len(filtered)
    header = f"Filtered App Store Reviews ({count} of {len(unique_entries)} unique reviews):\n"
    body = "\n---\n".join(filtered) if filtered else "(No reviews matched the research keywords.)"

    return header + body, count, source_status


def fetch_reddit_posts():
    """Collect Reddit discussion via Reddit's public search JSON endpoint.
    No API key/OAuth required for basic public search — a descriptive
    User-Agent is required by Reddit's API terms, or requests get blocked.

    Returns:
        tuple: (formatted_text, post_count, source_status)
    """
    source_status = {
        "source": "Reddit",
        "queries_attempted": [],
        "total_fetched": 0,
        "duplicates_removed": 0,
        "keyword_matched": 0,
        "errors": [],
    }

    headers = {"User-Agent": "consumer-insight-engine/1.0 (grad project research tool)"}
    queries = ["blinkit", "blinkit vs zepto", "blinkit categories", "quick commerce india"]

    all_posts = []
    for q in queries:
        try:
            resp = requests.get(
                "https://www.reddit.com/search.json",
                params={"q": q, "sort": "relevance", "limit": 25, "t": "year"},
                headers=headers,
                timeout=15,
            )
            resp.raise_for_status()
            children = resp.json().get("data", {}).get("children", [])
            posts = [c.get("data", {}) for c in children]
            all_posts.extend(posts)
            source_status["queries_attempted"].append({
                "query": q, "returned": len(posts), "status": "ok"
            })
        except Exception as e:
            source_status["queries_attempted"].append({
                "query": q, "returned": 0, "status": "error", "error": str(e)
            })
            source_status["errors"].append(f"Reddit search ('{q}') failed: {e}")

    # Deduplicate by post id
    seen_ids = set()
    unique_posts = []
    for p in all_posts:
        pid = p.get("id")
        if pid and pid not in seen_ids:
            seen_ids.add(pid)
            unique_posts.append(p)

    source_status["total_fetched"] = len(all_posts)
    source_status["duplicates_removed"] = len(all_posts) - len(unique_posts)

    # Reddit search is already query-targeted, but still apply the same
    # keyword gate for consistency with the other sources.
    filtered = []
    for p in unique_posts:
        title = p.get("title", "") or ""
        body = p.get("selftext", "") or ""
        text = f"{title} {body}".lower()
        if any(kw in text for kw in ALL_KEYWORDS) or "blinkit" in text:
            score = p.get("score", 0)
            subreddit = p.get("subreddit", "N/A")
            combined = f"{title}\n{body}".strip()
            if combined:
                filtered.append(
                    f"Subreddit: r/{subreddit} | Upvotes: {score}\n{combined[:1500]}"
                )

    source_status["keyword_matched"] = len(filtered)
    count = len(filtered)
    header = f"Filtered Reddit Posts ({count} of {len(unique_posts)} unique posts):\n"
    body = "\n---\n".join(filtered) if filtered else "(No posts matched the research keywords.)"

    return header + body, count, source_status


def fetch_web_search_snippets():
    """Collect forum/discussion snippets (Quora, blogs, community threads)
    via a search API. Quora itself blocks scraping and has no public API,
    so this is the only reliable path to that content: search results that
    surface Quora/forum threads, using the snippet text search engines
    already index — not a scrape of the source page.

    Gated behind SERPAPI_KEY. If it's not set, this source is skipped
    cleanly rather than the whole /collect call failing.

    Returns:
        tuple: (formatted_text, result_count, source_status)
    """
    source_status = {
        "source": "Web Search (Quora/forums/blogs)",
        "queries_attempted": [],
        "total_fetched": 0,
        "keyword_matched": 0,
        "errors": [],
        "skipped": False,
    }

    api_key = os.getenv("SERPAPI_KEY", "").strip()
    if not api_key:
        source_status["skipped"] = True
        source_status["errors"].append(
            "SERPAPI_KEY not set — web search source skipped. "
            "Get a free key at https://serpapi.com to enable this source."
        )
        return "", 0, source_status

    queries = [
        "site:quora.com blinkit",
        "site:reddit.com blinkit new categories",
        "blinkit quick commerce user habits forum discussion",
    ]

    all_results = []
    for q in queries:
        try:
            resp = requests.get(
                "https://serpapi.com/search",
                params={"q": q, "engine": "google", "api_key": api_key, "num": 10},
                timeout=15,
            )
            resp.raise_for_status()
            organic = resp.json().get("organic_results", [])
            all_results.extend(organic)
            source_status["queries_attempted"].append({
                "query": q, "returned": len(organic), "status": "ok"
            })
        except Exception as e:
            source_status["queries_attempted"].append({
                "query": q, "returned": 0, "status": "error", "error": str(e)
            })
            source_status["errors"].append(f"Web search ('{q}') failed: {e}")

    source_status["total_fetched"] = len(all_results)

    filtered = []
    for r in all_results:
        title = r.get("title", "") or ""
        snippet = r.get("snippet", "") or ""
        link = r.get("link", "") or ""
        if title or snippet:
            filtered.append(f"Source: {link}\nTitle: {title}\nSnippet: {snippet}")

    source_status["keyword_matched"] = len(filtered)
    count = len(filtered)
    header = f"Web Search Snippets — Quora/Forums ({count} results):\n"
    body = "\n---\n".join(filtered) if filtered else "(No web search results found.)"

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
        "Analyze this data about Blinkit user behavior. The data below may "
        "include Play Store reviews, App Store reviews, Reddit discussions, "
        "and web search snippets from forums like Quora — each block is "
        "labeled with its source. Weigh evidence across all available "
        "sources rather than treating any single source as definitive.\n\n"
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


def collect_all_sources():
    """Runs all four collectors independently — a failure or empty result in
    one source never blocks the others. Returns combined raw_data plus a
    per-source breakdown so the UI (and your deck) can show exactly what
    succeeded, what was skipped, and why.
    """
    sources_meta = []
    data_blocks = []
    total_matched = 0

    collectors = [
        ("Play Store", fetch_play_store_reviews),
        ("App Store", fetch_app_store_reviews),
        ("Reddit", fetch_reddit_posts),
        ("Web Search (Quora/forums)", fetch_web_search_snippets),
    ]

    for label, fn in collectors:
        try:
            text, count, status = fn()
            clean_text, quality_report = validate_collected_data(text, status)

            block_status = "skipped" if status.get("skipped") else (
                "ok" if count > 0 else "empty"
            )
            sources_meta.append({
                "name": label,
                "status": block_status,
                "matched_count": count,
                "total_fetched": status.get("total_fetched", 0),
                "errors": status.get("errors", []),
            })

            if not status.get("skipped") and count > 0:
                data_blocks.append(f"=== {label.upper()} ===\n{clean_text}")
                total_matched += count

        except Exception as e:
            # A whole collector crashing (not just returning 0 results)
            # still must not take down the other three sources.
            sources_meta.append({
                "name": label,
                "status": "error",
                "matched_count": 0,
                "total_fetched": 0,
                "errors": [str(e)],
            })

    raw_data = "\n\n".join(data_blocks) if data_blocks else ""
    return raw_data, total_matched, sources_meta


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/collect", methods=["POST"])
def collect():
    try:
        raw_data, total_matched, sources_meta = collect_all_sources()

        response_payload = {
            "status": "success",
            "raw_data": raw_data,
            "meta": {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "total_matched": total_matched,
                "total_chars": len(raw_data),
                "sources": sources_meta,
            },
        }

        if total_matched < 5:
            response_payload["meta"]["quality_warning"] = (
                f"Only {total_matched} items matched research keywords across all sources. "
                "Analysis may have limited evidence."
            )

        failed_or_skipped = [
            s["name"] for s in sources_meta if s["status"] in ("error", "skipped")
        ]
        if failed_or_skipped:
            response_payload["meta"]["sources_unavailable"] = failed_or_skipped

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
            # Re-collect from all sources if no data was passed
            raw_data, total_matched, sources_meta = collect_all_sources()
        else:
            total_matched = raw_data.count("\n---\n") + raw_data.count("=== ")

        analysis = run_analysis(raw_data)

        return jsonify({
            "status": "success",
            "data": analysis,
            "meta": {
                "timestamp": datetime.now(timezone.utc).isoformat(),
                "total_matched": total_matched,
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
