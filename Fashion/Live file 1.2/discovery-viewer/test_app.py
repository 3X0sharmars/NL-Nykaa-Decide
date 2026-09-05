import time
import threading
import urllib.request
import urllib.error
import urllib.parse
from app import app

def run_server():
    app.run(host='127.0.0.1', port=5000, debug=False, use_reloader=False)

def test_routes():
    time.sleep(2)  # Give the server a moment to start
    base_url = 'http://127.0.0.1:5000'
    routes = [
        '/',
        '/sample',
        '/sample?q=wishlist',
        '/query_log',
        '/report/bias_register',
        '/report/adversarial_report',
        '/validation'
    ]
    
    for route in routes:
        url = base_url + route
        print(f"Testing {route} ...")
        try:
            req = urllib.request.Request(url)
            with urllib.request.urlopen(req) as response:
                html = response.read().decode('utf-8')
                status = response.getcode()
                print(f"  Status: {status}")
                # Print some summary text to prove it's real data
                if route == '/':
                    import re
                    match = re.search(r'Total raw items scanned:\s*<strong>(\d+)</strong>', html)
                    if match:
                        print(f"  Overview Total Rows: {match.group(1)}")
                elif route == '/sample':
                    import re
                    match = re.search(r'Showing (\d+) rows on this page \(total matches: (\d+)\)', html)
                    if match:
                        print(f"  Sample Table Rows: {match.group(1)} (Total: {match.group(2)})")
        except urllib.error.URLError as e:
            print(f"  Failed: {e}")
            
    print("Test completed.")
    # In a real test script, we would shut down the Flask server here, 
    # but since it's running in a daemon thread, it will die when the main script ends.

if __name__ == '__main__':
    server_thread = threading.Thread(target=run_server)
    server_thread.daemon = True
    server_thread.start()
    
    test_routes()
