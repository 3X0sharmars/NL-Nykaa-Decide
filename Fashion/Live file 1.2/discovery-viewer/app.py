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
    
    # 2. Source breakdown
    df = get_cached_csv('corpus_raw.csv')
    breakdown = []
    total_rows = 0
    if df is not None:
        total_rows = len(df)
        if 'source' in df.columns and 'platform_mentioned' in df.columns:
            breakdown_df = df.groupby(['source', 'platform_mentioned']).size().reset_index(name='count')
            breakdown = breakdown_df.to_dict('records')
        
    return render_template('overview.html', headline_html=headline_html, breakdown=breakdown, total_rows=total_rows)

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
        'adversarial_report': 'adversarial_report.md'
    }
    if report_name not in allowed_reports:
        return render_template('error.html', message="Invalid report requested.")
    
    filename = allowed_reports[report_name]
    md_content = safe_read_markdown(filename)
    if not md_content:
        return render_template('error.html', message=f"{filename} not found.")
    
    html_content = markdown.markdown(md_content, extensions=['tables'])
    return render_template('report.html', title=report_name.replace('_', ' ').title(), html_content=html_content)

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
    else:
        data = []
        
    return render_template('query_log.html', data=data)

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
