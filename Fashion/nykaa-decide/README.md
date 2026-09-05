# Nykaa DECIDE

A wishlist decision-support layer for Nykaa Fashion. It does not tell a shopper
what to buy — it shows what the listing commits to, what it merely claims, what
it never states, and how confident that leaves the decision.

## Layout

```
nykaa-decide/
├── frontend/     static app — deploys to Vercel
├── backend/      API service — deploys to Render
├── data/         source research dataset (141 audited SKUs)
└── docs/         research deck and supporting material
```

Frontend and backend deploy independently. The frontend serves its own assets,
including `/product-images`; the backend is API-only.

## Running locally

Two terminals.

```bash
# backend — http://localhost:8731
cd backend
cp .env.example .env        # add your GEMINI_API_KEY
npm install
npm start
```

```bash
# frontend — http://localhost:5173
cd frontend
npm install
npm run dev
```

The Vite dev server proxies `/api/*` to `localhost:8731`, so `VITE_API_BASE`
can stay empty for local work.

## Deploying

**Frontend → Vercel.** Root directory `frontend`. Framework preset Vite; build
`npm run build`; output `dist`. Set `VITE_API_BASE` to the Render URL, with no
trailing slash.

**Backend → Render.** Root directory `backend`. Build `npm install`; start
`npm start`. Set `GEMINI_API_KEY`, and `ALLOWED_ORIGINS` to the Vercel domain.
Render supplies `PORT` on its own.

Deploy the backend first — the frontend build needs its URL.

## API

| method | path | purpose |
|---|---|---|
| GET | `/api/status` | health and whether a Gemini key is configured |
| POST | `/api/decide` | ranks saved products against stated user context |
| POST | `/api/intent` | parses a free-text need into structured intent |
| POST | `/api/explain` | plain-language account of a recommendation |

`GET /` returns a service descriptor. Everything else returns JSON 404.

## Data

`data/tail_sku_audit_filled_corrected_141.csv` is the source audit: 141 SKUs
examined line by line. `frontend/src/data.js` is generated from it.

Seven SKUs are marked `availability_status: "OUT_OF_STOCK"` — SKU14, SKU18,
SKU85, SKU102, SKU121, SKU131, SKU134. They stay in the dataset for
traceability and are filtered out of every customer-facing surface, leaving
**134 active SKUs**.

## A note on the confidence model

Four dimensions are kept deliberately separate and are never averaged into a
score:

- **Brand trust** — evaluated as brand × *category*. A brand established in one
  category is not evidence about another.
- **Product evidence** — this listing's own reviews. Nothing else.
- **Product understanding** — how much of the listing is checkable on arrival.
- **Use-case match** — blank until the shopper says what they need.

Where a listing does not state something, the interface says so rather than
estimating it.
