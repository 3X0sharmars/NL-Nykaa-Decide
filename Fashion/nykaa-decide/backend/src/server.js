import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env if present
const envPath = path.join(__dirname, '..', '.env');
if (fs.existsSync(envPath)) {
  try {
    const envContent = fs.readFileSync(envPath, 'utf8');
    for (const line of envContent.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx > 0) {
        const key = trimmed.slice(0, eqIdx).trim();
        const val = trimmed.slice(eqIdx + 1).trim();
        if (!process.env[key]) {
          process.env[key] = val;
        }
      }
    }
  } catch (e) {
    console.warn('Failed to parse .env', e.message);
  }
}

const PORT = process.env.PORT || 8731;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY || '';

// Dynamically import @google/genai if available
let GoogleGenAI = null;
try {
  const genaiModule = await import('@google/genai');
  GoogleGenAI = genaiModule.GoogleGenAI;
} catch (err) {
  console.warn('[@google/genai import warning]:', err.message);
}

// Helper: Call Gemini with model fallback
async function callGemini(prompt, responseMimeType = 'application/json') {
  if (!GEMINI_API_KEY || !GoogleGenAI) return null;
  const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });
  const modelsToTry = ['gemini-3.6-flash', 'gemini-3.8-flash', 'gemini-2.0-flash', 'gemini-1.5-flash'];
  for (const model of modelsToTry) {
    try {
      const response = await ai.models.generateContent({
        model: model,
        contents: prompt,
        config: { responseMimeType: responseMimeType }
      });
      return response.text.trim();
    } catch (err) {
      // Continue to next model
    }
  }
  return null;
}

// ---- Deterministic Rule-Based Intent Parser (Fallback) ----
function parseIntentDeterministically(text, category) {
  const lower = (text || '').toLowerCase();
  
  const occasions = [];
  if (/office|work|formal|meeting|business|presentation/i.test(lower)) occasions.push('office');
  if (/dinner|party|evening|date/i.test(lower)) occasions.push('dinner');
  if (/festive|wedding|puja|rakhi|festival|traditional/i.test(lower)) occasions.push('festive');
  if (/casual|everyday|daily|weekend|friday/i.test(lower)) occasions.push('everyday');
  if (/travel|vacation|trip|airport/i.test(lower)) occasions.push('travel');
  if (/gym|workout|running|sports|training|yoga/i.test(lower)) occasions.push('workout');
  if (/gift|gifting/i.test(lower)) occasions.push('gift');

  const priorities = [];
  if (/comfort|soft|cozy|breathable/i.test(lower)) priorities.push('comfort');
  if (/versatil|multipurpose|all-rounder|flexible/i.test(lower)) priorities.push('versatility');
  if (/durab|long-lasting|tough|quality/i.test(lower)) priorities.push('durability');
  if (/fit|sizing|silhouette/i.test(lower)) priorities.push('fit');
  if (/price|budget|value|cheap|affordable/i.test(lower)) priorities.push('price');
  if (/review|feedback|rating|buyers/i.test(lower)) priorities.push('reviews');
  if (/brand|trust|reputation/i.test(lower)) priorities.push('brand');

  let fit_preference = null;
  if (/don'?t like.*tight|avoid.*tight|not.*tight|relaxed|regular|comfortable fit|loose|roomy/i.test(lower)) {
    fit_preference = 'relaxed_or_regular';
  } else if (/slim|tapered|fitted/i.test(lower)) {
    fit_preference = 'slim';
  } else if (/wide|straight|flare|oversized/i.test(lower)) {
    fit_preference = 'wide_or_straight';
  }

  let material_preference = null;
  if (/cotton|linen|breathable/i.test(lower)) material_preference = 'natural';
  if (/stretch|spandex|elastane/i.test(lower)) material_preference = 'stretch';
  if (/poly|nylon|microfiber|dri-fit/i.test(lower)) material_preference = 'synthetic';

  let price_preference = null;
  if (/under\s*(\d+)|below\s*(\d+)|budget|cheap|affordable/i.test(lower)) {
    price_preference = 'budget_conscious';
  } else if (/premium|luxe|best quality|high end/i.test(lower)) {
    price_preference = 'premium';
  }

  const avoid = [];
  if (/don'?t like.*tight|avoid.*tight|not.*tight/i.test(lower)) avoid.push('tight');
  if (/avoid.*synth|don'?t like.*synth|not.*poly/i.test(lower)) avoid.push('synthetic');
  if (/avoid.*dry clean|machine wash only|no dry clean/i.test(lower)) avoid.push('dry_clean_only');
  if (/not.*black|avoid.*dark|no.*bright/i.test(lower)) avoid.push('color_constraints');

  let timeframe = null;
  if (/tomorrow|urgent|asap|this weekend|2 days/i.test(lower)) timeframe = 'urgent';

  return {
    occasion: occasions.length > 0 ? occasions : ['everyday'],
    priority: priorities.length > 0 ? priorities : ['comfort', 'fit'],
    fit_preference,
    material_preference,
    price_preference,
    avoid,
    timeframe,
    ambiguities: [],
    needs_clarification: false,
    source: 'deterministic_fallback'
  };
}

// Deterministic Candidate Ranker
function rankCandidatesDeterministically(candidates, naturalInput) {
  const text = (naturalInput || '').toLowerCase();
  const isBreathable = /breathable|cotton|summer|heat|sweat|humid|soft/i.test(text);
  const isRelaxed = /relax|loose|roomy|regular|comfortable fit/i.test(text);
  const avoidSynthetic = /avoid.*synth|don'?t like.*synth|not.*poly/i.test(text);

  return [...candidates].sort((a, b) => {
    let scoreA = 0;
    let scoreB = 0;

    const fabA = (a.specifications && a.specifications.fabric || '').toLowerCase();
    const fabB = (b.specifications && b.specifications.fabric || '').toLowerCase();
    const fitA = (a.specifications && a.specifications.fit || '').toLowerCase();
    const fitB = (b.specifications && b.specifications.fit || '').toLowerCase();

    if (isBreathable) {
      if (fabA.includes('cotton')) scoreA += 4;
      if (fabB.includes('cotton')) scoreB += 4;
    }
    if (avoidSynthetic) {
      if (fabA.includes('poly') || fabA.includes('nylon')) scoreA -= 5;
      if (fabB.includes('poly') || fabB.includes('nylon')) scoreB -= 5;
    }
    if (isRelaxed) {
      if (fitA.includes('regular') || fitA.includes('relaxed') || fitA.includes('loose')) scoreA += 3;
      if (fitB.includes('regular') || fitB.includes('relaxed') || fitB.includes('loose')) scoreB += 3;
    }
    if (a.confidenceModel && a.confidenceModel.overallConfidence === 'HIGH') scoreA += 2;
    if (b.confidenceModel && b.confidenceModel.overallConfidence === 'HIGH') scoreB += 2;

    return scoreB - scoreA;
  }).map((p, idx) => ({
    id: p.id,
    recommendationReason: idx === 0
      ? `Top match: Verified ${p.specifications ? p.specifications.fabric : 'material'} with ${p.specifications ? p.specifications.fit : 'comfortable'} silhouette matching your criteria.`
      : `Strong alternative option offering ${p.specifications ? p.specifications.fabric : 'verified quality'}.`,
    decisionConfidence: (p.confidenceModel && p.confidenceModel.overallConfidence) || 'HIGH',
    keyTradeoff: (p.whatWeDontKnow && p.whatWeDontKnow[0]) || "Customer reviews are limited for this specific SKU",
    whyThisWon: idx === 0
      ? `Highest criteria alignment for breathability and fit silhouette.`
      : `Alternative choice.`
  }));
}

// Origin allowlist. Set ALLOWED_ORIGINS on Render to your Vercel domain(s),
// comma-separated, e.g. "https://nykaa-decide.vercel.app".
// Left empty the service stays open, which is fine for a prototype but should
// be pinned before anything real is attached to it.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',').map(o => o.trim()).filter(Boolean);

function applyCors(req, res) {
  const origin = req.headers.origin;
  if (!ALLOWED_ORIGINS.length) {
    res.setHeader('Access-Control-Allow-Origin', '*');
  } else if (origin && ALLOWED_ORIGINS.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
  }
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

const server = http.createServer(async (req, res) => {
  applyCors(req, res);

  if (req.method === 'OPTIONS') {
    res.writeHead(204);
    res.end();
    return;
  }

  const url = new URL(req.url, `http://${req.headers.host}`);

  // ---- API: Status ----
  if (url.pathname === '/api/status' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      status: 'ok',
      hasGeminiApiKey: Boolean(GEMINI_API_KEY),
      model: 'gemini-3.6-flash',
      engine: 'Nykaa DECIDE MVP'
    }));
    return;
  }

  // ---- API: Decide (Main Recommendation Engine) ----
  if (url.pathname === '/api/decide' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { category, naturalInput, purpose, priority, timeline, candidateProducts } = payload;

        if (!candidateProducts || candidateProducts.length === 0) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ error: 'candidateProducts required' }));
          return;
        }

        let rankedProducts = [];

        // Try Gemini if API key is present
        if (GEMINI_API_KEY && GoogleGenAI) {
          try {
            const summaryCandidates = candidateProducts.map(p => ({
              id: p.id,
              skuId: p.skuId,
              name: p.name,
              brand: p.brand,
              price: p.price,
              fabric: p.specifications ? p.specifications.fabric : 'Not provided',
              fit: p.specifications ? p.specifications.fit : 'Not provided',
              care: p.specifications ? p.specifications.care : 'Not provided',
              brandTrust: p.confidenceModel ? p.confidenceModel.brandTrustLevel : 'MEDIUM',
              known: p.whatWeKnow || [],
              unknown: p.whatWeDontKnow || []
            }));

            const prompt = `You are the decision intelligence engine for Nykaa Fashion DECIDE.
Category: "${category}"
User Need: "${naturalInput}"
Purpose: "${purpose || 'Not specified'}"
Priority: "${priority || 'Not specified'}"
Timeline: "${timeline || 'Standard'}"

Candidate Products:
${JSON.stringify(summaryCandidates, null, 2)}

Rank these candidates from best match (#1) to lowest match based strictly on the user's needs and verified specs.
Never invent specifications or make up unstated facts.
Output JSON format:
{
  "rankedProducts": [
    {
      "id": "sku id matching candidate id",
      "recommendationReason": "1 concise sentence explaining why this matches user requirements",
      "decisionConfidence": "HIGH" | "MEDIUM" | "LOW",
      "whyThisWon": "1 sentence highlighting its strongest verified attribute",
      "keyTradeoff": "1 honest caveat or unverified specification"
    }
  ]
}`;

            const geminiRes = await callGemini(prompt, 'application/json');
            if (geminiRes) {
              const parsed = JSON.parse(geminiRes);
              if (parsed && Array.isArray(parsed.rankedProducts) && parsed.rankedProducts.length > 0) {
                rankedProducts = parsed.rankedProducts;
              }
            }
          } catch (geminiErr) {
            console.warn('[Gemini Decide Warning]:', geminiErr.message);
          }
        }

        // Fallback to deterministic ranker if Gemini did not return
        if (!rankedProducts || rankedProducts.length === 0) {
          rankedProducts = rankCandidatesDeterministically(candidateProducts, naturalInput);
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          rankedProducts: rankedProducts,
          source: rankedProducts.length > 0 ? 'decide_engine' : 'fallback'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ---- API: Interpret Natural Language User Intent ----
  if (url.pathname === '/api/intent' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const data = JSON.parse(body || '{}');
        const userPrompt = data.prompt || data.text || '';
        const category = data.category || 'Fashion';

        if (GEMINI_API_KEY && GoogleGenAI) {
          try {
            const prompt = `You are the intent interpretation engine for Nykaa Fashion DECIDE.
The user is considering saved products in the "${category}" category and expressed their needs in natural language:
"${userPrompt}"

Convert this into structured intent JSON.
Do not invent facts or make up unstated requirements.
Output ONLY valid JSON:
{
  "occasion": ["office", "dinner", "everyday", "festive", "workout", "travel", "gift"],
  "priority": ["comfort", "fit", "versatility", "durability", "price", "reviews", "brand"],
  "fit_preference": "relaxed_or_regular" | "slim" | "wide_or_straight" | null,
  "material_preference": string | null,
  "price_preference": string | null,
  "avoid": [string],
  "timeframe": string | null,
  "ambiguities": [string],
  "needs_clarification": false
}`;

            const geminiRes = await callGemini(prompt, 'application/json');
            if (geminiRes) {
              const parsed = JSON.parse(geminiRes);
              parsed.source = 'gemini_server_side';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(parsed));
              return;
            }
          } catch (geminiError) {
            console.warn('[Gemini API Call Warning]:', geminiError.message);
          }
        }

        const fallback = parseIntentDeterministically(userPrompt, category);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(fallback));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ---- API: Explain Choice ----
  if (url.pathname === '/api/explain' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk; });
    req.on('end', async () => {
      try {
        const payload = JSON.parse(body || '{}');
        const { product, intent, category } = payload;

        if (GEMINI_API_KEY && GoogleGenAI && product) {
          try {
            const prompt = `You are Nykaa DECIDE explaining why product "${product.name}" by "${product.brand}" stands out for a customer.
Customer Intent: ${JSON.stringify(intent)}
Category: ${category}
Verified Facts We Know: ${JSON.stringify(product.whatWeKnow)}
Unresolved Uncertainties We Don't Know: ${JSON.stringify(product.whatWeDontKnow)}
Customer Evidence: ${product.reviewObservations ? product.reviewObservations.summary : 'Limited'}
Brand Trust: ${product.confidenceModel ? product.confidenceModel.brandTrustLevel : 'MEDIUM'}

Write a grounded, concise customer explanation.
Rules:
1. Ground strictly in the provided verified facts.
2. DO NOT invent facts, review numbers, or guarantees.
3. Keep it to 2 concise bullet reasons and 1 honest uncertainty caveat.
Output JSON:
{
  "context": "Short sentence summarizing customer need",
  "reasons": ["Reason 1 grounded in facts", "Reason 2 grounded in evidence"],
  "caveat": "Honest limitation or missing spec"
}`;

            const geminiRes = await callGemini(prompt, 'application/json');
            if (geminiRes) {
              const parsed = JSON.parse(geminiRes);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify(parsed));
              return;
            }
          } catch (aiErr) {
            console.warn('[Gemini Explain Warning]:', aiErr.message);
          }
        }

        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({
          context: `You prioritised ${(intent && intent.priority && intent.priority[0]) || 'comfort and fit'}.`,
          reasons: [
            `Strong category presence and ${product.confidenceModel ? product.confidenceModel.brandTrustLevel : 'HIGH'} brand trust for ${product.brand}.`,
            product.whatWeKnow && product.whatWeKnow[0] ? product.whatWeKnow[0] : 'Verified specifications match your selected criteria.'
          ],
          caveat: (product.whatWeDontKnow && product.whatWeDontKnow[0]) || 'Garment measurements are not provided on the listing.'
        }));
      } catch (err) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: err.message }));
      }
    });
    return;
  }

  // ---- No static serving ----
  // The frontend is deployed separately (Vercel) and serves its own assets,
  // including /product-images. This service is API-only.
  if (url.pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({
      service: 'nykaa-decide-backend',
      status: 'ok',
      endpoints: ['/api/status', '/api/decide', '/api/intent', '/api/explain']
    }));
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ error: 'Not found', path: url.pathname }));
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`nykaa-decide backend listening on port ${PORT}`);
  console.log(`Gemini API key configured: ${Boolean(GEMINI_API_KEY)}`);
  console.log(`Allowed origins: ${ALLOWED_ORIGINS.length ? ALLOWED_ORIGINS.join(', ') : '* (open)'}`);
});
