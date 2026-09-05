# Live File 1.2

This directory contains the deploy-ready versions of the two final artifacts for the Nykaa Fashion — Decide project:

## `mvp/`
A cleaned, static version of the **Nykaa Fashion — Decide MVP**.
- **Role**: Shopper-facing prototype for validating product discovery decisions.
- **Data**: Uses a frozen snapshot of 21 test SKUs (`data.js`).
- **Deployment**: Configured to deploy instantly to **Vercel** as a static site (using `vercel.json`).

## `discovery-viewer/`
A read-only web viewer for the **Wishlist Discovery evidence corpus**.
- **Role**: Evaluator/internal-facing viewer for the data pipeline's outputs without running Python scripts.
- **Data**: Reads directly from the `artefacts/` snapshot included alongside it.
- **Deployment**: A minimal Python/Flask application configured to deploy easily to **Render** via the included `requirements.txt` and `Procfile`.
