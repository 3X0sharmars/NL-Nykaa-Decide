import os
import time
import pandas as pd
import markdown
from flask import Flask, render_template, request

app = Flask(__name__)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
ARTEFACTS_DIR = os.path.join(os.path.dirname(BASE_DIR), 'artefacts')

CACHE = {}
CACHE_TTL = 60

def get_cached_csv(filename):
    now = time.time()
    if filename in CACHE:
        data, timestamp = CACHE[filename]
        if now - timestamp < CACHE_TTL:
            return data
    path = os.path.join(ARTEFACTS_DIR, filename)
    if not os.path.exists(path):
        return None
    try:
        df = pd.read_csv(path)
        df = df.fillna('')
        CACHE[filename] = (df, now)
        return df
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return None

def safe_read_markdown(filename):
    path = os.path.join(ARTEFACTS_DIR, filename)
    if not os.path.exists(path):
        return None
    try:
        with open(path, 'r', encoding='utf-8') as f:
            return f.read()
    except Exception as e:
        print(f"Error reading {filename}: {e}")
        return None

# Audited empirical dataset metrics (from the 141-SKU audit & interview deck)
CATALOG_METRICS = {
    'total_skus': 141,
    'active_skus': 134,
    'oos_skus': 7,
    'personas': 7,
    'interviews': 7,
    'scanned_reviews': 823598,
    'queries_executed': 75,
    'categories': [
        {'name': 'Topwear', 'count': 46, 'share': 32.6},
        {'name': 'Activewear', 'count': 33, 'share': 23.4},
        {'name': 'Ethnicwear', 'count': 26, 'share': 18.4},
        {'name': 'Bottomwear', 'count': 18, 'share': 12.8},
        {'name': 'Bags & Accessories', 'count': 13, 'share': 9.2},
        {'name': 'Footwear', 'count': 5, 'share': 3.5}
    ],
    'review_buckets': [
        {'label': 'No reviews', 'count': 125, 'share': 88.7},
        {'label': '1–9 reviews', 'count': 10, 'share': 7.1},
        {'label': '10–99 reviews', 'count': 4, 'share': 2.8},
        {'label': '100+ reviews', 'count': 2, 'share': 1.4}
    ],
    'spec_transparency': [
        {'attribute': 'Fabric / Material stated', 'count': 141, 'share': 100.0, 'status': 'HIGH'},
        {'attribute': 'Fit descriptor stated', 'count': 138, 'share': 97.9, 'status': 'HIGH'},
        {'attribute': 'Garment measurements provided', 'count': 11, 'share': 7.8, 'status': 'LOW'},
        {'attribute': 'Fabric weight / GSM stated', 'count': 0, 'share': 0.0, 'status': 'ABSENT'}
    ],
    'decision_signals': [
        {'dimension': 'Brand × Category Trust', 'detail': '36 distinct brand × category pairs. 28 contain a single SKU, showing brand equity does not transfer universally across categories.', 'tone': 'good'},
        {'dimension': 'SKU Listing Evidence', 'detail': 'Material composition stated on all listings, but vital structural measurements and fabric thickness are largely missing.', 'tone': 'mid'},
        {'dimension': 'Product Understanding', 'detail': 'Technical trade terms (e.g. 2-ply compact cotton, rigid denim) require practical translation for user confidence.', 'tone': 'mid'},
        {'dimension': 'Decision Confidence Score', 'detail': 'Constrained primarily by information gaps and zero peer reviews on tail SKUs, not by negative sentiment.', 'tone': 'low'}
    ],
    'hypotheses': [
        {
            'num': '01',
            'status': 'REJECTED',
            'claim': 'Wishlists stall because the saved item is no longer buyable.',
            'found': 'The discovery engine ranked Purchasability highest, but primary research inverted it: 22 of 22 walked-through items were still purchasable in the buyer’s size, and 21 of 22 were still wanted by the person who saved them. Availability was not the blocker.',
            'src': 'Deck slides 1 and 5 — 22 items across 7 shoppers',
            'supported_by': ['Interviews (7/7)', 'MVP Walkthroughs', '141-SKU Audit']
        },
        {
            'num': '02',
            'status': 'REJECTED',
            'claim': 'A GSM interpretation layer would help buyers judge fabric weight.',
            'found': 'Killed by our own listing audit: 0 of 21 listings state fabric weight at all. There is nothing to interpret, so the feature was not built.',
            'src': 'Deck slides 7 and 8 — 21-SKU line-by-line audit',
            'supported_by': ['141-SKU Catalog Audit', 'Specification Analysis']
        },
        {
            'num': '03',
            'status': 'MODIFIED',
            'claim': 'Gate rates measured from review text estimate how often each failure occurs.',
            'found': 'Revised to lower bounds, not estimates — and declared before analysis, not after. Public text samples what people bother to write down: stockouts and pricing are grievances, while indecision, forgetting and waiting generate no text. Purchasability and Economic are over-observed; Decision, Intent Decay and Latency under-observed.',
            'src': 'Deck slide 4 — bias declared before classifying',
            'supported_by': ['Bias Register (B1–B10)', 'Adversarial Test Suite']
        },
        {
            'num': '04',
            'status': 'ACCEPTED',
            'claim': 'The buyer cannot determine what the product actually is from the listing.',
            'found': 'Held across both instruments. The audit found 0 of 21 listings stating fabric weight, 0 of 19 apparel SKUs giving garment measurements, 2 of 21 stating an exact fibre percentage and 20 of 21 marketing-led rather than spec-led — with one listing contradicting itself between spec table and description.',
            'src': 'Deck slides 6 and 7 — root cause and listing audit',
            'supported_by': ['User Interviews', 'Listing Audit (141 SKUs)', 'Play Store Signals']
        }
    ]
}

@app.route('/')
def overview():
    # 1. Headline stats
    md_content = safe_read_markdown('retrieval_report.md')
    headline_html = None
    if md_content:
        lines = md_content.split('\n')
        in_headline = False
        headline_lines = []
        for line in lines:
            if line.startswith('## Headline'):
                in_headline = True
                headline_lines.append(line)
            elif in_headline and line.startswith('## '):
                break
            elif in_headline:
                headline_lines.append(line)
        if headline_lines:
            headline_html = markdown.markdown('\n'.join(headline_lines), extensions=['tables'])

    # 2. Source breakdown from corpus
    df = get_cached_csv('corpus_raw.csv')
    breakdown = []
    total_rows = 0
    source_stats = {}
    platform_stats = {}
    if df is not None:
        total_rows = len(df)
        if 'source' in df.columns and 'platform_mentioned' in df.columns:
            breakdown_df = df.groupby(['source', 'platform_mentioned']).size().reset_index(name='count')
            breakdown = breakdown_df.to_dict('records')
            source_stats = df['source'].value_counts().to_dict()
            platform_stats = df['platform_mentioned'].value_counts().to_dict()

    return render_template('overview.html',
                           headline_html=headline_html,
                           breakdown=breakdown,
                           total_rows=total_rows,
                           source_stats=source_stats,
                           platform_stats=platform_stats,
                           metrics=CATALOG_METRICS)

@app.route('/sample')
def sample():
    df = get_cached_csv('corpus_raw.csv')
    if df is None:
        return render_template('error.html', message="corpus_raw.csv not found.")

    query = request.args.get('q', '').strip()
    if query and 'text' in df.columns:
        # filter by text containing query
        df = df[df['text'].astype(str).str.contains(query, case=False, na=False)]

    try:
        page = int(request.args.get('page', 1))
    except ValueError:
        page = 1

    per_page = 50
    total_rows = len(df)
    total_pages = (total_rows + per_page - 1) // per_page
    if total_pages == 0:
        total_pages = 1
    if page < 1:
        page = 1
    if page > total_pages:
        page = total_pages

    start = (page - 1) * per_page
    end = start + per_page

    page_data = df.iloc[start:end].to_dict('records')
    return render_template('sample.html', data=page_data, page=page, total_pages=total_pages, q=query, total_rows=total_rows)

@app.route('/report/<report_name>')
def report(report_name):
    allowed_reports = {
        'bias_register': 'bias_register.md',
        'adversarial_report': 'adversarial_report.md',
        'retrieval_report': 'retrieval_report.md'
    }
    if report_name not in allowed_reports:
        return render_template('error.html', message="Invalid report requested.")

    filename = allowed_reports[report_name]
    md_content = safe_read_markdown(filename)
    if not md_content:
        return render_template('error.html', message=f"{filename} not found.")

    html_content = markdown.markdown(md_content, extensions=['tables', 'fenced_code'])
    return render_template('report.html', title=report_name.replace('_', ' ').title(), html_content=html_content, report_key=report_name)

@app.route('/query_log')
def query_log():
    df = get_cached_csv('query_log.csv')
    if df is None:
        return render_template('error.html', message="query_log.csv not found.")

    if 'source' in df.columns and 'raw_results_returned' in df.columns:
        df['raw_results_returned'] = pd.to_numeric(df['raw_results_returned'], errors='coerce').fillna(0)
        summary = df.groupby('source').agg(
            queries_run=('source', 'count'),
            zero_results=('raw_results_returned', lambda x: (x == 0).sum())
        ).reset_index()
        data = summary.to_dict('records')
        total_queries = len(df)
    else:
        data = []
        total_queries = 0

    return render_template('query_log.html', data=data, total_queries=total_queries)

@app.route('/validation')
def validation():
    # Validation tab: artefacts/validation_set_CODED.csv or artefacts/validation_report.md
    md_content = safe_read_markdown('validation_report.md')
    df = get_cached_csv('validation_set_CODED.csv')

    if md_content is None and df is None:
        return render_template('validation.html', status="not_run", message="Validation phase not yet run — awaiting hand-coded labels.")

    html_content = None
    if md_content:
        html_content = markdown.markdown(md_content, extensions=['tables'])

    csv_data = []
    if df is not None:
        csv_data = df.to_dict('records')

    return render_template('validation.html', status="run", html_content=html_content, csv_data=csv_data)

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
