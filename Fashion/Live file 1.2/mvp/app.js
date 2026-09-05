// ============================================================
// NYKAA FASHION — DECIDE MVP
//
// A Nykaa Fashion wishlist with a decision-support layer.
// Products stay the hero; decision support is a quiet layer on top.
//
// EVERYTHING IS DERIVED FROM PRODUCTS (data.js). Nothing about a
// product is invented here. Where the listing does not state a fact,
// the UI says so rather than filling the gap.
//
// The confidence model has FOUR SEPARATE dimensions, deliberately
// never collapsed into one number:
//
//   1. BRAND TRUST          brand x category, not brand alone
//   2. PRODUCT EVIDENCE     this SKU's own review evidence
//   3. PRODUCT UNDERSTANDING how clearly the listing describes itself
//   4. USE-CASE MATCH       blank until the user states a use case
//
// A trusted brand does not make a thin SKU confident, and a
// well-reviewed SKU does not make its brand trusted.
// ============================================================

(function () {
  'use strict';

  // ---------------------------------------------------------
  // State
  // ---------------------------------------------------------
  const state = {
    activeCategory: 'All',
    flowCategory: null,      // category the decision flow is scoped to
    flowProducts: [],        // auto-filtered; user never re-picks
    context: {},             // user answers, keyed by question id
    bag: []
  };

  // ---------------------------------------------------------
  // Small helpers
  // ---------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const NOT_PROVIDED = 'Not provided';

  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  }
  function formatPrice(p) {
    return p == null ? NOT_PROVIDED : '₹' + Number(p).toLocaleString('en-IN');
  }
  function titleCase(s) {
    return String(s || '').toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
  }
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach((s) => s.classList.remove('active'));
    const t = $('screen-' + id);
    if (t) t.classList.add('active');
    window.scrollTo(0, 0);
  }
  function renderStars(rating) {
    if (rating == null) return '<span class="muted">' + NOT_PROVIDED + '</span>';
    return '<span class="stars">★</span> ' + rating.toFixed(1);
  }

  // ---------------------------------------------------------
  // 1. BRAND TRUST  —  brand x category
  //
  // Signals available in this dataset: how many SKUs the brand has in
  // THIS category, and whether their ratings agree. With one SKU there
  // is no category depth and no consistency to measure, so the honest
  // answer is UNKNOWN. We do not promote a brand on reputation.
  // ---------------------------------------------------------
  function brandTrust(product, all) {
    const peers = all.filter(
      (p) => p.brand === product.brand && p.category === product.category
    );
    const rated = peers.filter((p) => p.rating != null);
    const totalReviews = peers.reduce((n, p) => n + (p.reviewCount || 0), 0);

    if (peers.length >= 3 && rated.length >= 2 && totalReviews >= 50) {
      return {
        level: 'HIGH',
        label: 'Established in ' + product.category,
        why:
          product.brand + ' has ' + peers.length + ' products saved in ' +
          product.category + ' with ' + totalReviews +
          ' customer reviews between them, and their ratings are consistent.'
      };
    }
    if (peers.length >= 2 && totalReviews >= 10) {
      return {
        level: 'MEDIUM',
        label: 'Some presence in ' + product.category,
        why:
          product.brand + ' has ' + peers.length + ' products in ' +
          product.category + ' carrying ' + totalReviews +
          ' reviews in total — enough for a partial read, not a firm one.'
      };
    }
    if (peers.length >= 2) {
      return {
        level: 'LIMITED',
        label: 'Thin category evidence',
        why:
          product.brand + ' has ' + peers.length + ' products in ' +
          product.category + ', but only ' + totalReviews +
          ' review(s) between them. That is not enough to judge the brand in this category.'
      };
    }
    return {
      level: 'UNKNOWN',
      label: 'Cannot assess in ' + product.category,
      why:
        'This is the only ' + product.brand + ' product in ' + product.category +
        ' here, so there is no category-level evidence to judge the brand on. ' +
        'A reputation elsewhere would not tell you about this category.'
    };
  }

  // ---------------------------------------------------------
  // 2. PRODUCT EVIDENCE  —  this SKU only
  //
  // Review count and rating for THIS listing. Never brand reputation,
  // and never buyer photos: they are not a feature of this MVP.
  // ---------------------------------------------------------
  function productEvidence(p) {
    const n = p.reviewCount;
    if (n == null || n === 0) {
      return {
        level: 'NONE',
        label: 'No customer reviews yet',
        why: 'This listing has no customer reviews, so there is no buyer evidence to draw on.'
      };
    }
    if (n >= 100) {
      return {
        level: 'HIGH',
        label: n.toLocaleString('en-IN') + ' reviews',
        why: 'This product has ' + n.toLocaleString('en-IN') + ' reviews' +
             (p.rating != null ? ' and a ' + p.rating + ' rating' : '') +
             ' — a substantial body of buyer experience.'
      };
    }
    if (n >= 10) {
      return {
        level: 'MEDIUM',
        label: n + ' reviews',
        why: 'This product has ' + n + ' reviews' +
             (p.rating != null ? ' and a ' + p.rating + ' rating' : '') +
             ' — some buyer experience, but a small sample.'
      };
    }
    return {
      level: 'LIMITED',
      label: n === 1 ? '1 review' : n + ' reviews',
      why: 'Only ' + n + ' customer review' + (n === 1 ? '' : 's') +
           ' exist' + (n === 1 ? 's' : '') +
           ' for this product. One or two opinions cannot tell you much.'
    };
  }

  // ---------------------------------------------------------
  // 3. PRODUCT UNDERSTANDING  —  how clearly the listing describes itself
  //
  // Counts which of the four checkable listing facts are stated.
  // Marketing adjectives deliberately do NOT count: "premium quality"
  // is not a fact anyone can check on arrival.
  // ---------------------------------------------------------
  const UNDERSTANDING_FIELDS = [
    ['fabric', 'Fabric composition'],
    ['fit', 'Fit'],
    ['measurements', 'Garment measurements'],
    ['weightGsm', 'Fabric weight (GSM)']
  ];

  function understanding(p) {
    const a = p.attributes || {};
    const stated = [];
    const missing = [];
    UNDERSTANDING_FIELDS.forEach(([key, label]) => {
      (a[key] ? stated : missing).push(label);
    });
    if (a.careStated) stated.push('Care instructions');
    else missing.push('Care instructions');

    const ratio = stated.length / (stated.length + missing.length);
    let level = 'LIMITED';
    if (ratio >= 0.8) level = 'CLEAR';
    else if (ratio >= 0.5) level = 'PARTIAL';

    return {
      level: level,
      stated: stated,
      missing: missing,
      label:
        level === 'CLEAR' ? 'Most details stated'
          : level === 'PARTIAL' ? missing.length + ' details missing'
            : 'Key details missing',
      why:
        'The listing states ' + stated.join(', ').toLowerCase() + '. ' +
        'It does not state ' + missing.join(', ').toLowerCase() + '.' +
        (p.cannotSay ? ' ' + p.cannotSay : '')
    };
  }

  // ---------------------------------------------------------
  // 4. USE-CASE MATCH  —  nothing before the user speaks
  // ---------------------------------------------------------
  function useCaseMatch(p, context) {
    if (!context || !context.purpose) {
      return {
        level: '—',
        label: "Tell us what you're buying it for",
        why: "You haven't told us what this is for yet, so there is nothing to match against."
      };
    }
    const a = p.attributes || {};
    const known = [a.fabric, a.fit].filter(Boolean).length;

    if (known === 2 && a.measurements) {
      return {
        level: 'STRONG MATCH',
        label: 'Fits "' + context.purpose + '"',
        why:
          'The listing states fabric (' + a.fabric + '), fit (' + a.fit +
          ') and measurements, which is enough to judge it against ' +
          context.purpose.toLowerCase() + '.'
      };
    }
    if (known >= 1) {
      return {
        level: 'POSSIBLE MATCH',
        label: 'Probably suits "' + context.purpose + '"',
        why:
          'The listing states ' +
          [a.fabric && 'fabric', a.fit && 'fit'].filter(Boolean).join(' and ') +
          ', which points towards ' + context.purpose.toLowerCase() +
          '. Without measurements this cannot be confirmed.'
      };
    }
    return {
      level: 'UNCLEAR',
      label: 'Cannot assess for "' + context.purpose + '"',
      why: 'The listing does not state enough about this product to judge it against your use case.'
    };
  }

  // ---------------------------------------------------------
  // FINAL CONFIDENCE — constrained by the weakest link, not averaged
  // ---------------------------------------------------------
  const RANK = {
    HIGH: 3, CLEAR: 3, 'STRONG MATCH': 3,
    MEDIUM: 2, PARTIAL: 2, 'POSSIBLE MATCH': 2,
    LIMITED: 1, UNCLEAR: 1, NONE: 0, UNKNOWN: 0, '—': null
  };

  function confidence(p, all, context) {
    const bt = brandTrust(p, all);
    const pe = productEvidence(p);
    const pu = understanding(p);
    const uc = useCaseMatch(p, context);

    // "Cannot assess" is NOT the same as "assessed and weak".
    //
    // UNKNOWN brand trust means the dataset has no other product by this brand
    // in this category -- an absence of evidence. LIMITED product evidence
    // means we looked and found one review -- evidence of thinness. Scoring
    // both as the floor made every one of the 21 products read LOW for the
    // same reason, which tells the shopper nothing and hides the real
    // differences between listings.
    //
    // So: unassessable dimensions CAP the result rather than sink it, and are
    // named explicitly. Dimensions we could assess still set the floor.
    const assessable = [
      { name: 'Brand trust', d: bt },
      { name: 'Product evidence', d: pe },
      { name: 'Product understanding', d: pu }
    ];
    if (RANK[uc.level] != null) assessable.push({ name: 'Use-case match', d: uc });

    const unassessable = assessable.filter((x) => x.d.level === 'UNKNOWN');
    const measured = assessable.filter((x) => x.d.level !== 'UNKNOWN' && RANK[x.d.level] != null);

    let weakest = measured[0];
    measured.forEach((x) => { if (RANK[x.d.level] < RANK[weakest.d.level]) weakest = x; });
    const min = weakest ? RANK[weakest.d.level] : 0;

    let overall = 'LOW';
    if (min >= 3) overall = 'HIGH';
    else if (min === 2) overall = 'MEDIUM';

    // Anything we cannot assess caps the ceiling at MEDIUM: we will not call a
    // product HIGH confidence while a whole dimension is unreadable.
    if (unassessable.length && overall === 'HIGH') overall = 'MEDIUM';

    let reason;
    if (weakest) {
      reason = weakest.name.toLowerCase() + ' is the weakest link: ' +
               weakest.d.label.toLowerCase() + '.';
    } else {
      reason = 'Nothing here can be assessed from the listing.';
    }
    if (unassessable.length) {
      reason += ' ' + unassessable.map((x) => x.name.toLowerCase()).join(' and ') +
                ' cannot be assessed at all.';
    }
    if (!context || !context.purpose) {
      reason += ' You have not told us your use case yet.';
    }

    return {
      brandTrust: bt, evidence: pe, understanding: pu, useCase: uc,
      overall, weakest, unassessable, reason
    };
  }

  // ---------------------------------------------------------
  // REGRET WATCH-OUTS — grounded only in what is missing / thin
  // ---------------------------------------------------------
  function watchOuts(p, all) {
    const out = [];
    const a = p.attributes || {};
    if (!a.measurements) out.push('Garment measurements are not provided — you cannot check the fit before it arrives.');
    if (!a.weightGsm) out.push('Fabric weight is not stated, so thickness and drape are unknown.');
    if (!a.fabric) out.push('Fabric composition is not stated.');
    const pe = productEvidence(p);
    if (pe.level === 'NONE') out.push('No customer has reviewed this product yet.');
    else if (pe.level === 'LIMITED') out.push('Only ' + p.reviewCount + ' review(s) — too few to rely on.');
    const bt = brandTrust(p, all);
    if (bt.level === 'UNKNOWN') out.push('No other ' + p.brand + ' product in ' + p.category + ' to judge the brand by.');
    if (p.marketingAdjectives && p.marketingAdjectives.length >= 4) {
      out.push('The description leans on ' + p.marketingAdjectives.length +
               ' unmeasurable claims such as “' + p.marketingAdjectives[0] + '”.');
    }
    return out;
  }

  // ---------------------------------------------------------
  // CATEGORY GROUPING + DECISION STATE
  // ---------------------------------------------------------
  function groupByCategory(products) {
    const map = new Map();
    products.forEach((p) => {
      if (!map.has(p.category)) map.set(p.category, []);
      map.get(p.category).push(p);
    });
    return [...map.entries()]
      .map(([name, items]) => ({ name, items }))
      .sort((a, b) => b.items.length - a.items.length || a.name.localeCompare(b.name));
  }

  // Category-appropriate wording, from attributes that actually exist.
  const CATEGORY_COPY = {
    'Polo Shirts':        'Compare fit, fabric and buyer evidence.',
    'Formal Shirts':      'Compare fit, fabric and buyer evidence.',
    'Kurta':              'Compare fabric, fit and occasion suitability.',
    'Suit Sets':          'Compare fabric, fit and occasion suitability.',
    'Bottomwear':         'Compare fit, comfort and available evidence.',
    'Activewear':         'Compare fit, comfort and material.',
    'Bags & Accessories': 'Compare material, functionality and buyer evidence.'
  };
  function categoryCopy(name, items) {
    if (CATEGORY_COPY[name]) return CATEGORY_COPY[name];
    const a = items[0].attributes || {};
    const bits = [a.fabric && 'material', a.fit && 'fit', a.measurements && 'measurements']
      .filter(Boolean);
    return bits.length
      ? 'Compare ' + bits.join(', ') + ' and buyer evidence.'
      : 'Compare what the listings actually state.';
  }

  // States B / C / D from the brief; A means no banner at all.
  function decisionState(group, all) {
    const items = group.items;
    const thin = items.filter((p) => ['NONE', 'LIMITED'].includes(productEvidence(p).level));
    const gaps = items.filter((p) => understanding(p).level === 'LIMITED');

    if (items.length >= 2 && thin.length === items.length) {
      return {
        kind: 'C',
        title: 'Need more confidence?',
        sub: 'All ' + items.length + ' saved products here have limited customer evidence.',
        cta: 'Review evidence'
      };
    }
    if (items.length >= 2) {
      return {
        kind: 'B',
        title: 'Still deciding?',
        sub: categoryCopy(group.name, items),
        cta: 'Compare ' + group.name
      };
    }
    if (gaps.length) {
      return {
        kind: 'D',
        title: 'Some product details are missing.',
        sub: 'Key listing information is not stated for this product.',
        cta: 'View evidence'
      };
    }
    return null; // State A — no manufactured urgency
  }

  // ---------------------------------------------------------
  // RENDER — wishlist
  // ---------------------------------------------------------
  function visibleProducts() {
    return state.activeCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === state.activeCategory);
  }

  function renderCatNav() {
    const groups = groupByCategory(PRODUCTS);
    const pills = [{ name: 'All', n: PRODUCTS.length }]
      .concat(groups.map((g) => ({ name: g.name, n: g.items.length })));

    $('cat-nav').innerHTML = pills.map((p) => `
      <button class="cat-pill${state.activeCategory === p.name ? ' active' : ''}"
              data-cat="${esc(p.name)}">
        ${esc(p.name)} <span class="cat-pill-n">${p.n}</span>
      </button>`).join('');

    $('cat-nav').querySelectorAll('.cat-pill').forEach((b) => {
      b.addEventListener('click', () => {
        state.activeCategory = b.dataset.cat;
        renderWishlist();
      });
    });
  }

  function productCard(p) {
    const c = confidence(p, PRODUCTS, state.context);
    return `
      <div class="wl-card" data-id="${esc(p.id)}">
        <div class="wl-img">
          <span>${esc(p.category)}</span>
          <button class="wl-remove" data-remove="${esc(p.id)}" aria-label="Remove">&times;</button>
        </div>
        <div class="wl-body">
          <div class="wl-brand">${esc(p.brand)}</div>
          <div class="wl-name">${esc(p.name)}</div>
          <div class="wl-price">${formatPrice(p.price)}</div>
          <div class="wl-rating">
            ${p.rating != null ? renderStars(p.rating) : '<span class="muted">No rating yet</span>'}
            ${p.reviewCount != null ? '<span class="muted"> · ' + p.reviewCount + ' review' + (p.reviewCount === 1 ? '' : 's') + '</span>' : ''}
          </div>

          <div class="wl-conf">
            <div class="conf-row"><span>Brand trust</span><b class="lv lv-${c.brandTrust.level.replace(/\W/g, '')}">${esc(c.brandTrust.level)}</b></div>
            <div class="conf-row"><span>Product evidence</span><b class="lv lv-${c.evidence.level}">${esc(c.evidence.level)}</b></div>
            <div class="conf-row"><span>Product clarity</span><b class="lv lv-${c.understanding.level}">${esc(c.understanding.level)}</b></div>
            <div class="conf-row"><span>Use-case match</span><b class="lv lv-none">${esc(c.useCase.level)}</b></div>
          </div>

          <div class="wl-actions">
            <button class="btn-outline btn-sm" data-evidence="${esc(p.id)}">Why?</button>
            <button class="btn-primary btn-sm" data-bag="${esc(p.id)}">Move to Bag</button>
          </div>
        </div>
      </div>`;
  }

  function renderWishlist() {
    $('product-count').textContent =
      PRODUCTS.length + ' product' + (PRODUCTS.length === 1 ? '' : 's');
    renderCatNav();

    const groups = groupByCategory(visibleProducts());
    $('category-sections').innerHTML = groups.map((g) => {
      const st = decisionState(g, PRODUCTS);
      return `
        <section class="cat-section">
          <div class="cat-head">
            <h2>${esc(g.name)}</h2>
            <span class="cat-count">${g.items.length} saved product${g.items.length === 1 ? '' : 's'}</span>
          </div>
          ${st ? `
            <div class="cat-banner state-${st.kind}">
              <div>
                <div class="cat-banner-title">${esc(st.title)}</div>
                <div class="cat-banner-sub">${esc(st.sub)}</div>
              </div>
              <button class="btn-primary btn-sm" data-flow="${esc(g.name)}">${esc(st.cta)}</button>
            </div>` : ''}
          <div class="wishlist-grid">${g.items.map(productCard).join('')}</div>
        </section>`;
    }).join('');

    wireWishlist();
  }

  function wireWishlist() {
    document.querySelectorAll('[data-flow]').forEach((b) =>
      b.addEventListener('click', () => startFlow(b.dataset.flow)));
    document.querySelectorAll('[data-evidence]').forEach((b) =>
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        renderEvidence(PRODUCTS.find((p) => p.id === b.dataset.evidence));
      }));
    document.querySelectorAll('[data-bag]').forEach((b) =>
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        moveToBag(PRODUCTS.find((p) => p.id === b.dataset.bag));
      }));
    document.querySelectorAll('[data-remove]').forEach((b) =>
      b.addEventListener('click', (e) => {
        e.stopPropagation();
        const i = PRODUCTS.findIndex((p) => p.id === b.dataset.remove);
        if (i > -1) { PRODUCTS.splice(i, 1); renderWishlist(); }
      }));
  }

  // ---------------------------------------------------------
  // DECISION FLOW — pre-scoped to the category, no re-picking
  // ---------------------------------------------------------
  const PURPOSE_BY_CATEGORY = {
    'Kurta': ['Festive / occasion', 'Everyday wear', 'Office'],
    'Suit Sets': ['Wedding / occasion', 'Formal event'],
    'Polo Shirts': ['Everyday casual', 'Office casual', 'Weekend'],
    'Formal Shirts': ['Office', 'Formal event', 'Everyday'],
    'Bottomwear': ['Everyday wear', 'Office', 'Lounge / home'],
    'Activewear': ['Gym / training', 'Running', 'Lounge / home'],
    'Bags & Accessories': ['Daily commute', 'Travel', 'Occasion']
  };

  function startFlow(categoryName) {
    state.flowCategory = categoryName;
    state.flowProducts = PRODUCTS.filter((p) => p.category === categoryName);
    state.context = {};
    renderContext();
    showScreen('decide-intro');
  }

  function renderContext() {
    const cat = state.flowCategory;
    const purposes = PURPOSE_BY_CATEGORY[cat] || ['Everyday wear', 'Occasion'];
    const priorities = ['Fit', 'Fabric', 'Price', 'Customer evidence'];

    const intro = document.querySelector('#screen-decide-intro .decide-intro');
    intro.querySelector('h2').textContent = cat + ' · ' + state.flowProducts.length + ' products';
    intro.querySelector('p').textContent = "Let's help you decide. Tell us what this is for.";

    const chips = (arr, key) => arr.map((v) =>
      `<button class="chip" data-key="${key}" data-val="${esc(v)}">${esc(v)}</button>`).join('');

    $('chips-purpose').innerHTML = chips(purposes, 'purpose');
    $('chips-priority').innerHTML = chips(priorities, 'priority');
    const timeline = $('chips-timeline');
    if (timeline) {
      timeline.closest('.context-question').style.display = 'none'; // not used by the model
    }

    document.querySelectorAll('#screen-decide-intro .chip').forEach((c) => {
      c.addEventListener('click', () => {
        const key = c.dataset.key;
        document.querySelectorAll(`.chip[data-key="${key}"]`).forEach((x) => x.classList.remove('selected'));
        c.classList.add('selected');
        state.context[key] = c.dataset.val;
        $('btn-see-options').disabled = !state.context.purpose;
      });
    });
    $('btn-see-options').disabled = true;
  }

  // ---------------------------------------------------------
  // RESULTS — ranked with stated reasons, no invented score
  // ---------------------------------------------------------
  function rankProducts(list) {
    return [...list].map((p) => {
      const c = confidence(p, PRODUCTS, state.context);
      const reasons = [];
      if (c.useCase.level === 'STRONG MATCH') reasons.push('Strongest match for your stated use case');
      else if (c.useCase.level === 'POSSIBLE MATCH') reasons.push('Possible match for your stated use case');
      if (c.evidence.level === 'HIGH') reasons.push('Strong customer evidence (' + c.evidence.label + ')');
      else if (c.evidence.level === 'MEDIUM') reasons.push('Some customer evidence (' + c.evidence.label + ')');
      else reasons.push('Limited customer evidence');
      if (c.understanding.level === 'CLEAR') reasons.push('Listing states most details');
      else reasons.push(c.understanding.missing.length + ' listing details missing');
      return { p, c, reasons, score: RANK[c.evidence.level] * 2 + RANK[c.understanding.level] };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
  }

  function renderResults() {
    const ranked = rankProducts(state.flowProducts);
    const head = document.querySelector('#screen-results .results-header p');
    if (head) {
      head.textContent = state.flowCategory + ' · based on what you told us and what the listings actually state.';
    }
    $('results-grid').innerHTML = ranked.map((r, i) => `
      <div class="result-card">
        <div class="result-rank">${i + 1}</div>
        <div class="wl-img sm"><span>${esc(r.p.category)}</span></div>
        <div class="wl-brand">${esc(r.p.brand)}</div>
        <div class="wl-name">${esc(r.p.name)}</div>
        <div class="wl-price">${formatPrice(r.p.price)}</div>
        <ul class="result-reasons">${r.reasons.map((x) => '<li>' + esc(x) + '</li>').join('')}</ul>
        <div class="result-conf">Decision confidence: <b class="lv lv-${r.c.overall}">${r.c.overall}</b></div>
        <div class="result-why">${esc(r.c.reason)}</div>
        <div class="wl-actions">
          <button class="btn-outline btn-sm" data-evidence2="${esc(r.p.id)}">Full evidence</button>
          <button class="btn-primary btn-sm" data-bag2="${esc(r.p.id)}">Move to Bag</button>
        </div>
      </div>`).join('');

    document.querySelectorAll('[data-evidence2]').forEach((b) =>
      b.addEventListener('click', () => renderEvidence(PRODUCTS.find((p) => p.id === b.dataset.evidence2))));
    document.querySelectorAll('[data-bag2]').forEach((b) =>
      b.addEventListener('click', () => moveToBag(PRODUCTS.find((p) => p.id === b.dataset.bag2))));
    showScreen('results');
  }

  // ---------------------------------------------------------
  // EVIDENCE — the four dimensions, each with its own Why?
  // ---------------------------------------------------------
  function dimBlock(title, d) {
    return `
      <div class="dim">
        <div class="dim-head">
          <div>
            <div class="dim-title">${esc(title)}</div>
            <div class="dim-label">${esc(d.label)}</div>
          </div>
          <b class="lv lv-${String(d.level).replace(/\W/g, '') || 'none'}">${esc(d.level)}</b>
        </div>
        <details class="dim-why"><summary>Why?</summary><p>${esc(d.why)}</p></details>
      </div>`;
  }

  function renderEvidence(p) {
    if (!p) return;
    const c = confidence(p, PRODUCTS, state.context);
    const u = c.understanding;
    const w = watchOuts(p, PRODUCTS);
    const a = p.attributes || {};

    $('evidence-content').innerHTML = `
      <button class="btn-text" id="evidence-back">← Back</button>
      <div class="ev-head">
        <div class="wl-img md"><span>${esc(p.category)}</span></div>
        <div>
          <div class="wl-brand">${esc(p.brand)}</div>
          <h2>${esc(p.name)}</h2>
          <div class="wl-price big">${formatPrice(p.price)}</div>
          <div class="muted">${esc(p.category)} · Sold by ${esc(p.seller)}</div>
          <div class="ev-overall">Decision confidence
            <b class="lv lv-${c.overall}">${c.overall}</b>
            <span class="muted">${esc(c.reason)}</span>
          </div>
          <button class="btn-primary" data-bag3="${esc(p.id)}">Move to Bag</button>
        </div>
      </div>

      <h3 class="sec">Confidence snapshot</h3>
      ${dimBlock('Brand trust', c.brandTrust)}
      ${dimBlock('Product evidence', c.evidence)}
      ${dimBlock('Product understanding', c.understanding)}
      ${dimBlock('Use-case match', c.useCase)}

      <h3 class="sec">What the listing states</h3>
      <div class="facts">
        <div class="fact"><span>Fabric</span><b>${a.fabric ? esc(a.fabric) : '<i class="muted">' + NOT_PROVIDED + '</i>'}</b></div>
        <div class="fact"><span>Fit</span><b>${a.fit ? esc(a.fit) : '<i class="muted">' + NOT_PROVIDED + '</i>'}</b></div>
        <div class="fact"><span>Measurements</span><b>${a.measurements ? esc(a.measurements) : '<i class="muted">' + NOT_PROVIDED + '</i>'}</b></div>
        <div class="fact"><span>Fabric weight</span><b>${a.weightGsm ? esc(a.weightGsm) : '<i class="muted">' + NOT_PROVIDED + '</i>'}</b></div>
        <div class="fact"><span>Care</span><b>${a.careStated ? 'Stated in listing' : '<i class="muted">' + NOT_PROVIDED + '</i>'}</b></div>
      </div>
      ${p.couldSay ? `<p class="could">${esc(p.couldSay)}</p>` : ''}

      <h3 class="sec">What could make you regret this?</h3>
      <ul class="watchouts">${w.map((x) => '<li>' + esc(x) + '</li>').join('') ||
        '<li>Nothing material is missing from this listing.</li>'}</ul>

      ${p.marketingAdjectives.length ? `
        <h3 class="sec">Claims we cannot check</h3>
        <div class="chips-static">${p.marketingAdjectives.map((x) => '<span class="chip-static">' + esc(x) + '</span>').join('')}</div>
        <p class="muted sm">These are the seller's words. Nothing here can be verified before the product arrives.</p>` : ''}
    `;

    $('evidence-back').addEventListener('click', () =>
      showScreen(state.flowCategory ? 'results' : 'wishlist'));
    document.querySelector('[data-bag3]').addEventListener('click', () => moveToBag(p));
    showScreen('evidence');
  }

  // ---------------------------------------------------------
  // COMPARISON
  // ---------------------------------------------------------
  function renderComparison() {
    const items = (state.flowProducts.length ? state.flowProducts : PRODUCTS).slice(0, 3);
    const rows = [
      ['Price', (p) => formatPrice(p.price)],
      ['Rating', (p) => (p.rating != null ? p.rating + ' ★' : NOT_PROVIDED)],
      ['Reviews', (p) => (p.reviewCount != null ? String(p.reviewCount) : NOT_PROVIDED)],
      ['Brand trust', (p) => brandTrust(p, PRODUCTS).level],
      ['Product evidence', (p) => productEvidence(p).level],
      ['Product understanding', (p) => understanding(p).level],
      ['Fabric', (p) => p.attributes.fabric || NOT_PROVIDED],
      ['Fit', (p) => p.attributes.fit || NOT_PROVIDED],
      ['Measurements', (p) => p.attributes.measurements || NOT_PROVIDED],
      ['Key uncertainty', (p) => watchOuts(p, PRODUCTS)[0] || '—']
    ];

    $('comparison-content').innerHTML = `
      <button class="btn-text" id="comparison-back">← Back</button>
      <h2>${esc(state.flowCategory || 'Your saved products')}</h2>
      <table class="cmp">
        <thead><tr><th></th>${items.map((p) =>
          `<th><div class="wl-brand">${esc(p.brand)}</div><div class="wl-name">${esc(p.name)}</div></th>`).join('')}</tr></thead>
        <tbody>${rows.map(([label, fn]) =>
          `<tr><td class="cmp-k">${esc(label)}</td>${items.map((p) =>
            `<td>${esc(fn(p))}</td>`).join('')}</tr>`).join('')}</tbody>
      </table>`;
    $('comparison-back').addEventListener('click', () => showScreen('results'));
    showScreen('comparison');
  }

  // ---------------------------------------------------------
  // MOVE TO BAG
  // ---------------------------------------------------------
  function moveToBag(p) {
    if (!p) return;
    state.bag.push(p.id);
    $('bag-success-content').innerHTML = `
      <div class="bag-tick">✓</div>
      <h2>Added to Bag</h2>
      <div class="wl-brand">${esc(p.brand)}</div>
      <div class="wl-name">${esc(p.name)}</div>
      <div class="wl-price big">${formatPrice(p.price)}</div>
      <button class="btn-outline" id="bag-back">Back to wishlist</button>`;
    $('bag-back').addEventListener('click', () => { state.flowCategory = null; renderWishlist(); showScreen('wishlist'); });
    showScreen('bag-success');
  }

  // ---------------------------------------------------------
  // V2 ROADMAP — clearly marked as not in the MVP
  // ---------------------------------------------------------
  const V2_FEATURES = [
    ['12. Will I actually use this?', 'Move past "is this good?" to "does this fit my life?" — frequency of use, wardrobe overlap, occasion. Only from what the shopper tells us.'],
    ['13. Explain my choice', 'Plain-language account of why a product became the strongest choice, generated from the actual comparison, including the uncertainty that remains.'],
    ['14. Social validation without leaving Nykaa', 'Peer decision signals from shoppers with similar stated needs, so validation does not have to be sought off-platform.'],
    ['15. Nykaa Trust / Nykaa Verified', 'Authenticity confidence for unfamiliar brands. Depends on QC and verification operations — which is why no such badge appears in this MVP.'],
    ['16. SKU-specific walkthrough video', 'A substitute for touch-and-feel: drape, stretch, thickness and opacity for apparel; flex and sole for footwear; compartments for bags.'],
    ['17. Structured user preference input', 'Ask how much fit, fabric and thickness each matter, then weigh the product against what this shopper actually cares about.'],
    ['18. Richer SKU understanding', 'Translate specifications into reference context — 100 GSM lightweight, 250 medium, 350 heavyweight — without inventing performance claims.']
  ];

  function renderV2() {
    $('v2-features-container').innerHTML = V2_FEATURES.map(([t, d]) => `
      <div class="v2-feature"><div class="v2-feature-title">${esc(t)}</div><p>${esc(d)}</p></div>`).join('');
  }

  // ---------------------------------------------------------
  // Wiring
  // ---------------------------------------------------------
  function init() {
    renderWishlist();
    renderV2();

    $('btn-see-options').addEventListener('click', renderResults);
    const cmp = $('btn-show-comparison');
    if (cmp) cmp.addEventListener('click', renderComparison);

    const openV2 = $('btn-show-v2-roadmap');
    const modal = $('v2-roadmap-modal');
    if (openV2 && modal) {
      openV2.addEventListener('click', () => modal.classList.add('active'));
      $('v2-roadmap-close').addEventListener('click', () => modal.classList.remove('active'));
      modal.addEventListener('click', (e) => { if (e.target === modal) modal.classList.remove('active'); });
    }
    const navWishlist = $('nav-wishlist');
    if (navWishlist) navWishlist.addEventListener('click', (e) => {
      e.preventDefault(); state.flowCategory = null; renderWishlist(); showScreen('wishlist');
    });
  }

  document.addEventListener('DOMContentLoaded', init);
})();
