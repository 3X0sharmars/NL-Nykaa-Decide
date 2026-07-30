import os
import json
import re
from datetime import datetime, timezone

from dotenv import load_dotenv
from flask import Flask, render_template, request, flash
from openai import OpenAI
import google.generativeai as genai

load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv("FLASK_SECRET_KEY", "blinkit-research-secret")

SEARCH_QUERIES = [
    "Blinkit groceries only habit users experience",
    "Blinkit vs Amazon vs FirstCry shopping behavior India",
    "Blinkit new categories trust discovery problems",
    "Blinkit parents toys baby care shopping",
    "quick commerce category exploration India users",
]

ANALYSIS_PROMPT = """You are a product research analyst. Analyze the following 
user discussions about Blinkit and answer these 5 questions 
with specific evidence from the text:

Q1: Why do users repeatedly buy only from grocery category 
on Blinkit?
Q2: What triggers users to switch to Amazon or FirstCry 
instead of exploring Blinkit categories?
Q3: What would make users trust Blinkit for non-grocery 
categories like toys and baby care?
Q4: Are there users who expanded beyond grocery on Blinkit? 
What changed for them?
Q5: What specific categories do parents mention wanting but 
not buying on Blinkit?

For each question provide:
- A direct answer in 2-3 sentences
- 2 specific quotes or examples from the data as evidence
- A confidence score (High/Medium/Low) based on how much 
  evidence exists in the data

Also identify the top 5 recurring themes across all 
discussions with frequency indicators.

At the end, identify 2-3 cases where the data was 
insufficient or contradictory - this is the failure 
analysis section."""

JSON_FORMAT_INSTRUCTIONS = """

Return your entire response as a single valid JSON object only (no markdown fences), using this schema:
{
  "questions": [
    {
      "id": "Q1",
      "question": "Why do users repeatedly buy only from grocery category on Blinkit?",
      "answer": "...",
      "evidence": ["quote or example 1", "quote or example 2"],
      "confidence": "High|Medium|Low"
    }
  ],
  "themes": [
    {
      "title": "theme name",
      "description": "short description",
      "frequency": "High|Medium|Low or a count/indicator"
    }
  ],
  "failure_analysis": [
    {
      "title": "short title",
      "description": "why data was insufficient or contradictory"
    }
  ]
}
Include exactly 5 questions (Q1-Q5), exactly 5 themes, and 2-3 failure analysis items.
"""


def get_grok_client():
    api_key = os.getenv("GROK_API_KEY")
    if not api_key or api_key.startswith("your_"):
        raise ValueError(
            "GROK_API_KEY is missing. Add it to your .env file (or Replit Secrets)."
        )
    return OpenAI(api_key=api_key, base_url="https://api.x.ai/v1")


def configure_gemini():
    api_key = os.getenv("GEMINI_API_KEY")
    if not api_key or api_key.startswith("your_"):
        raise ValueError(
            "GEMINI_API_KEY is missing. Add it to your .env file (or Replit Secrets)."
        )
    genai.configure(api_key=api_key)


def collect_raw_data():
    """PART 1: Collect discussion text via Grok (xAI) searches."""
    client = get_grok_client()
    collected = []
    search_details = []

    for i, query in enumerate(SEARCH_QUERIES, start=1):
        try:
            response = client.chat.completions.create(
                model="grok-3",
                messages=[
                    {
                        "role": "system",
                        "content": (
                            "You are a market research assistant with access to real-time "
                            "web and social discussions. Search for and summarize authentic "
                            "user discussions, forum posts, reviews, and social comments "
                            "related to the query. Include specific user quotes, complaints, "
                            "and behaviors when available. Be concrete and evidence-rich."
                        ),
                    },
                    {
                        "role": "user",
                        "content": (
                            f"Search for real-time discussions about: {query}\n\n"
                            "Return a detailed digest of what users are saying, with "
                            "as many concrete quotes and examples as possible."
                        ),
                    },
                ],
                temperature=0.7,
            )
            text = (response.choices[0].message.content or "").strip()
            if not text:
                text = f"[Search {i}] No content returned for query: {query}"
            block = f"=== SEARCH {i}: {query} ===\n{text}"
            collected.append(block)
            search_details.append(
                {"index": i, "query": query, "status": "ok", "chars": len(text)}
            )
        except Exception as exc:
            error_text = f"[Search {i} ERROR] Query: {query}\nError: {exc}"
            collected.append(f"=== SEARCH {i}: {query} ===\n{error_text}")
            search_details.append(
                {
                    "index": i,
                    "query": query,
                    "status": "error",
                    "error": str(exc),
                    "chars": 0,
                }
            )

    raw_data = "\n\n".join(collected)
    return raw_data, search_details


def extract_json(text):
    """Pull a JSON object out of a model response that may include fences."""
    text = text.strip()
    if text.startswith("```"):
        text = re.sub(r"^```(?:json)?\s*", "", text)
        text = re.sub(r"\s*```$", "", text)

    try:
        return json.loads(text)
    except json.JSONDecodeError:
        match = re.search(r"\{.*\}", text, re.DOTALL)
        if match:
            return json.loads(match.group(0))
        raise


def analyze_with_gemini(raw_data):
    """PART 2: Analyze collected text with Gemini Pro."""
    configure_gemini()
    model = genai.GenerativeModel("gemini-1.5-pro")

    full_prompt = (
        f"{ANALYSIS_PROMPT}\n\n"
        f"--- USER DISCUSSION DATA ---\n{raw_data}\n--- END DATA ---\n"
        f"{JSON_FORMAT_INSTRUCTIONS}"
    )

    response = model.generate_content(full_prompt)
    response_text = (getattr(response, "text", None) or "").strip()
    if not response_text:
        raise ValueError("Gemini returned an empty response.")

    try:
        parsed = extract_json(response_text)
    except (json.JSONDecodeError, ValueError) as exc:
        # Fallback so the UI still shows something useful
        parsed = {
            "questions": [
                {
                    "id": f"Q{i}",
                    "question": q,
                    "answer": "Could not parse structured answer from Gemini. See raw analysis.",
                    "evidence": ["Parser fallback — see raw analysis text."],
                    "confidence": "Low",
                }
                for i, q in enumerate(
                    [
                        "Why do users repeatedly buy only from grocery category on Blinkit?",
                        "What triggers users to switch to Amazon or FirstCry instead of exploring Blinkit categories?",
                        "What would make users trust Blinkit for non-grocery categories like toys and baby care?",
                        "Are there users who expanded beyond grocery on Blinkit? What changed for them?",
                        "What specific categories do parents mention wanting but not buying on Blinkit?",
                    ],
                    start=1,
                )
            ],
            "themes": [
                {
                    "title": f"Theme {i}",
                    "description": "Gemini response could not be parsed as JSON.",
                    "frequency": "N/A",
                }
                for i in range(1, 6)
            ],
            "failure_analysis": [
                {
                    "title": "JSON parse failure",
                    "description": f"Could not parse Gemini JSON ({exc}). Raw response is shown below.",
                }
            ],
            "raw_analysis": response_text,
        }

    return parsed, response_text


def run_pipeline():
    """Run data collection + analysis and return view model for the template."""
    collected_at = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")
    errors = []

    try:
        raw_data, search_details = collect_raw_data()
    except Exception as exc:
        return {
            "success": False,
            "error": f"Data collection failed: {exc}",
            "collected_at": collected_at,
            "search_count": len(SEARCH_QUERIES),
            "text_volume": 0,
            "search_details": [],
            "themes": [],
            "questions": [],
            "failure_analysis": [],
            "raw_analysis": None,
        }

    failed_searches = [s for s in search_details if s.get("status") == "error"]
    if failed_searches:
        errors.append(
            f"{len(failed_searches)} of {len(search_details)} Grok searches failed."
        )

    analysis = None
    raw_analysis = None
    try:
        analysis, raw_analysis = analyze_with_gemini(raw_data)
    except Exception as exc:
        return {
            "success": False,
            "error": f"Analysis failed: {exc}",
            "collected_at": collected_at,
            "search_count": len(SEARCH_QUERIES),
            "text_volume": len(raw_data),
            "search_details": search_details,
            "themes": [],
            "questions": [],
            "failure_analysis": [],
            "raw_analysis": None,
            "warnings": errors,
        }

    themes = analysis.get("themes", [])[:5]
    questions = analysis.get("questions", [])
    failure_analysis = analysis.get("failure_analysis", [])

    # Pad themes to 5 slots if model returned fewer
    while len(themes) < 5:
        themes.append(
            {
                "title": f"Theme {len(themes) + 1}",
                "description": "Not enough distinct themes returned by the model.",
                "frequency": "Low",
            }
        )

    return {
        "success": True,
        "error": None,
        "warnings": errors,
        "collected_at": collected_at,
        "search_count": len(SEARCH_QUERIES),
        "text_volume": len(raw_data),
        "search_details": search_details,
        "themes": themes,
        "questions": questions,
        "failure_analysis": failure_analysis,
        "raw_analysis": analysis.get("raw_analysis") or raw_analysis,
    }


@app.route("/", methods=["GET", "POST"])
def index():
    result = None
    auto_run = request.args.get("autorun") == "1"

    if request.method == "POST" or auto_run:
        result = run_pipeline()
        if result.get("error"):
            flash(result["error"], "error")
        for warning in result.get("warnings") or []:
            flash(warning, "warning")

    return render_template(
        "index.html",
        result=result,
        search_queries=SEARCH_QUERIES,
    )


if __name__ == "__main__":
    port = int(os.getenv("PORT", 5000))
    app.run(host="0.0.0.0", port=port, debug=True)
