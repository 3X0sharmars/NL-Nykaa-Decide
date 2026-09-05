# Wishlist Discovery Viewer

A minimal read-only web viewer for the Wishlist Discovery evidence corpus pipeline.

## Run Locally

1. Ensure you have Python installed.
2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
3. Run the application:
   ```bash
   python app.py
   ```
   (Alternatively: `flask run` or `gunicorn app:app`)
4. Open your browser and navigate to `http://localhost:5000`.

## Render Deploy Steps

To deploy this viewer to Render:

1. Create a **New Web Service** on Render.
2. Point it at this repository.
3. Set the **Root Directory** to `Apps/wishlist_discovery/viewer`.
4. Set the **Build Command** to:
   ```bash
   pip install -r requirements.txt
   ```
5. Set the **Start Command** to:
   ```bash
   gunicorn app:app
   ```
6. Deploy! Render will automatically inject the `PORT` environment variable, which the app will bind to.
