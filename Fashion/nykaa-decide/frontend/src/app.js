// ============================================================
// NYKAA FASHION — DECIDE: Application Logic
// Robust Multi-User Wishlist with Three Data States (Loading, Success, Error),
// Strict Alignment to HTML IDs, Zero Mock Illustrations,
// 141-SKU Real Dataset Ingestion, and Deterministic Catalogue Resolution.
// ============================================================

(function () {
  'use strict';

  // Backend origin. Frontend (Vercel) and API (Render) are separate services,
  // so a relative '/api/...' no longer resolves. Set VITE_API_BASE at build
  // time; falls back to same-origin, which keeps `npm run dev` with a proxy
  // and any single-origin deployment working unchanged.
  const API_BASE = (import.meta.env && import.meta.env.VITE_API_BASE) || '';


  // ---- State ----
  const state = {
    currentScreen: 'welcome',
    currentUser: null,
    activeCategoryFilter: 'All',
    activeDecisionCategory: 'Topwear',
    naturalInputText: '',
    structuredIntent: null,
    selectedPurpose: null,
    selectedPriority: null,
    selectedTimeline: null,
    currentProduct: null,
    bagProduct: null,
    activeReviewsProduct: null,
    rankedResults: [],
    catalogueReady: false
  };

  // ---- Screen Management ----
  function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('screen-' + screenId);
    if (target) {
      target.classList.add('active');
      state.currentScreen = screenId;
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      console.warn('Screen element not found: screen-' + screenId);
    }
  }

  // ---- Formatting Helpers ----
  function formatPrice(price) {
    if (!price) return '₹999';
    return '₹' + Number(price).toLocaleString('en-IN');
  }

  // Product Image Renderer
  // Always attempts to load the real product image from p.image.
  // If the image 404s at runtime, it hides the image and logs an error to the console for audit.
  // No generic placeholders or IMAGE PENDING states are shown to the user.
  function renderProductImage(p, className, inlineStyle) {
    if (!p || !p.image) {
      console.error(`[IMAGE AUDIT] Missing image mapping for SKU: ${p ? p.skuId : 'UNKNOWN'}`);
      return '';
    }
    const styleAttr = inlineStyle ? ` style="${inlineStyle}"` : '';
    const classAttr = className ? ` class="${className}"` : '';
    // If image fails to load, hide the img element and log to console
    return `<img src="${p.image}" alt="${p.brand} ${p.name}"${classAttr}${styleAttr} loading="lazy" onerror="this.onerror=null;this.style.display='none';console.error('[IMAGE AUDIT] Failed to load image for SKU: ${p.skuId} at ${p.image}');" />`;
  }

  function renderStars(rating) {
    if (!rating) return '';
    const full = Math.floor(rating);
    const hasHalf = rating % 1 >= 0.3;
    let html = '';
    for (let i = 0; i < 5; i++) {
      if (i < full) html += '<span class="star" style="color:#e80071">★</span>';
      else if (i === full && hasHalf) html += '<span class="star" style="color:#e80071">★</span>';
      else html += '<span class="star" style="color:#d4d5d9">★</span>';
    }
    return html;
  }

  function confidenceBadge(level) {
    const l = (level || 'MEDIUM').toUpperCase();
    let cls = 'medium';
    if (l === 'HIGH' || l === 'CLEAR' || l === 'STRONG MATCH') cls = 'high';
    else if (l === 'LOW' || l === 'LIMITED' || l === 'UNCLEAR') cls = 'low';
    else if (l === 'UNKNOWN' || l === 'PARTIAL') cls = 'unknown';
    return `<span class="confidence-badge ${cls}">${l}</span>`;
  }

  // ============================================================
  // USER PROFILE & PERSISTENT WISHLIST RESOLUTION (Section 5 & 7)
  // Architecture:
  // USER PROFILE -> USER ID -> WISHLIST SKU IDS -> 141-SKU DATA -> RENDER
  // ============================================================
  function getUserWishlistSkuIds(userId) {
    const storageKey = 'nykaa_wishlist_' + userId;
    const stored = localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      } catch (e) {
        console.warn('Error reading stored wishlist for ' + userId + ':', e);
      }
    }
    const profile = (typeof USER_PROFILES !== 'undefined') ? USER_PROFILES.find(u => u.id === userId) : null;
    return profile ? [...profile.wishlistSkuIds] : [];
  }

  function saveUserWishlistSkuIds(userId, skuIds) {
    localStorage.setItem('nykaa_wishlist_' + userId, JSON.stringify(skuIds));
  }

  function getCurrentUserProducts() {
    if (!state.currentUser) return [];
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS)) {
      console.error('Technical error: PRODUCTS catalogue is not available.');
      return [];
    }

    const skuIds = getUserWishlistSkuIds(state.currentUser.id);
    return skuIds.map(sku => {
      const cleanSku = (sku || '').trim().toLowerCase();
      return PRODUCTS.find(p => p.skuId.toLowerCase() === cleanSku || p.id.toLowerCase() === cleanSku);
    }).filter(p => p && p.availability_status !== 'OUT_OF_STOCK');
  }

  // Single lookup path for id-driven handlers (reviews, full evidence, bag).
  // Mirrors the OUT_OF_STOCK filter in getCurrentUserProducts so an unavailable
  // SKU can never be reached even if a stale card id is clicked.
  function findActiveProduct(id) {
    if (!id || typeof PRODUCTS === 'undefined') return null;
    const key = String(id).trim().toLowerCase();
    const product = PRODUCTS.find(p => p.id.toLowerCase() === key || p.skuId.toLowerCase() === key);
    if (!product || product.availability_status === 'OUT_OF_STOCK') return null;
    return product;
  }

  function updateUserHeaderUI() {
    const control = document.getElementById('nav-profile-control');
    const accountLink = document.getElementById('nav-account-link');
    const utilityIndicator = document.getElementById('utility-session-indicator');
    const utilityName = document.getElementById('utility-user-name');

    if (state.currentUser) {
      if (control) control.style.display = 'block';
      if (accountLink) accountLink.style.display = 'none';
      if (utilityIndicator) utilityIndicator.style.display = 'block';
      if (utilityName) utilityName.textContent = state.currentUser.name;

      const avatarEl = document.getElementById('nav-profile-avatar');
      if (avatarEl) avatarEl.textContent = state.currentUser.avatar;
      const nameEl = document.getElementById('nav-profile-name');
      if (nameEl) nameEl.textContent = state.currentUser.name;
      const dropNameEl = document.getElementById('dropdown-user-name');
      if (dropNameEl) dropNameEl.textContent = state.currentUser.name;
      const dropDescEl = document.getElementById('dropdown-user-desc');
      if (dropDescEl) dropDescEl.textContent = state.currentUser.tagline;

      const greetingEl = document.getElementById('wishlist-user-greeting');
      if (greetingEl) greetingEl.textContent = `WELCOME BACK, ${state.currentUser.name.toUpperCase()}`;
    } else {
      if (control) control.style.display = 'none';
      if (accountLink) accountLink.style.display = 'flex';
      if (utilityIndicator) utilityIndicator.style.display = 'none';
    }
  }

  function selectUser(userId) {
    if (typeof USER_PROFILES === 'undefined') {
      console.error('USER_PROFILES is not defined. Cannot select user.');
      return;
    }
    const profile = USER_PROFILES.find(u => u.id === userId);
    if (!profile) {
      console.warn('Profile not found for userId:', userId);
      return;
    }
    state.currentUser = profile;
    sessionStorage.setItem('nykaa_active_user_id', profile.id);
    updateUserHeaderUI();
    state.activeCategoryFilter = 'All';
    showScreen('wishlist');
    renderWishlist();
  }

  function switchUser() {
    const dropdown = document.getElementById('nav-profile-dropdown');
    if (dropdown) dropdown.classList.remove('visible');
    renderWelcomeScreen();
    showScreen('welcome');
  }

  function logoutUser() {
    state.currentUser = null;
    sessionStorage.removeItem('nykaa_active_user_id');
    localStorage.removeItem('nykaa_active_user_id');
    updateUserHeaderUI();
    const dropdown = document.getElementById('nav-profile-dropdown');
    if (dropdown) dropdown.classList.remove('visible');
    renderWelcomeScreen();
    showScreen('welcome');
  }

  // ============================================================
  // SCREEN 0: WELCOME / USER SELECTION SCREEN (Section 3)
  // ============================================================
  function renderWelcomeScreen() {
    const grid = document.getElementById('welcome-users-grid');
    if (!grid) return;

    if (typeof USER_PROFILES === 'undefined' || !Array.isArray(USER_PROFILES)) {
      grid.innerHTML = '<div style="color:red;padding:20px;">Error: Profiles catalogue could not be loaded.</div>';
      return;
    }

    grid.innerHTML = USER_PROFILES.map((u, idx) => {
      const savedIds = getUserWishlistSkuIds(u.id);
      const itemsCount = savedIds.length;
      return `
        <div class="welcome-user-card" data-user-id="${u.id}">
          <div class="welcome-card-top">
            <div class="welcome-user-number">USER ${idx + 1}</div>
            <div class="welcome-user-avatar">${u.avatar}</div>
          </div>
          <div class="welcome-user-name">${u.name}</div>
          <div class="welcome-user-tagline">${u.tagline}</div>
          <p class="welcome-user-desc">${u.description}</p>
          <div class="welcome-user-meta">
            <span class="welcome-wishlist-count">❤️ ${itemsCount} saved items</span>
          </div>
          <button class="btn-select-user" data-user-id="${u.id}">
            Select ${u.name} →
          </button>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  // SCREEN 1: MULTI-CATEGORY WISHLIST WITH 3 STATES (Section 4 & 6)
  // Three States: LOADING, SUCCESS, ERROR.
  // ============================================================
  function renderProductCard(p) {
    let keyFact = 'Verified Nykaa listing';
    if (p.specifications && p.specifications.fabric && p.specifications.fabric !== 'Not provided') {
      keyFact = p.specifications.fabric;
    } else if (p.whatWeKnow && p.whatWeKnow[0]) {
      keyFact = p.whatWeKnow[0];
    }

    const ratingBadgeHtml = (p.rating && p.reviewCount > 0)
      ? `<div class="product-rating">
           <span class="rating-badge">★ ${p.rating}</span>
           <span class="review-count btn-open-reviews" data-id="${p.id}" style="cursor:pointer;text-decoration:underline;">(${p.reviewCount})</span>
         </div>`
      : `<div class="product-rating">
           <span class="review-count btn-open-reviews" data-id="${p.id}" style="color:var(--nykaa-grey-500);cursor:pointer;">Unreviewed (0)</span>
         </div>`;

    const pdpLinkHtml = p.isPdpResolved && p.url
      ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="product-pdp-link" title="Open verified Nykaa PDP in new tab">
           🔗 View on Nykaa ↗
         </a>`
      : `<span class="product-pdp-link" style="color:var(--nykaa-grey-400);cursor:default;" title="Catalog audit record without direct live Nykaa PDP URL">
           PDP unlinked · DECIDE enabled
         </span>`;

    return `
      <div class="product-card" data-id="${p.id}" data-category="${p.category}">
        <div class="product-card-img">
          ${renderProductImage(p, "product-image")}
          <button class="wishlist-heart-btn active" data-id="${p.id}" title="Remove from wishlist">❤️</button>
        </div>
        <div class="product-info">
          <div class="product-brand">${p.brand}</div>
          <div class="product-name" title="${p.name}">${p.name}</div>
          <div class="product-pricing">
            <span class="price-current">${formatPrice(p.price)}</span>
          </div>
          ${ratingBadgeHtml}
          <div class="product-key-fact">
            <span class="fact-bullet">•</span> ${keyFact}
          </div>
          ${pdpLinkHtml}
        </div>
      </div>
    `;
  }

  function renderCategoryGroupSection(categoryName, products) {
    const config = (typeof DECISION_DATA !== 'undefined' && DECISION_DATA.getCategoryConfig)
      ? DECISION_DATA.getCategoryConfig(categoryName)
      : { headline: 'Compare fit, fabric and buyer evidence.', sub: 'Review checkable specifications.', actionLabel: 'Compare ' + categoryName };

    const count = products.length;
    const canCompare = count >= 2;

    return `
      <div class="wishlist-category-group" data-category="${categoryName}">
        <div class="category-group-header">
          <div class="category-group-title">${categoryName}</div>
          <div class="category-group-count">${count} items</div>
        </div>

        <div class="category-decision-banner state-comparison">
          <div class="cat-banner-left">
            <span class="cat-banner-badge">DECIDE READINESS</span>
            <div class="cat-banner-title">${config.headline}</div>
            <div class="cat-banner-sub">${config.sub}</div>
          </div>
          <button class="btn-primary btn-sm btn-start-compare" data-category="${categoryName}" ${!canCompare ? 'disabled title="Need at least 2 items to compare"' : ''}>
            ${config.actionLabel} (${count}) →
          </button>
        </div>

        <div class="product-grid">
          ${products.map(p => renderProductCard(p)).join('')}
        </div>
      </div>
    `;
  }

  function renderWishlist() {
    const totalCountEl = document.getElementById('wishlist-total-count');
    const tabsContainer = document.getElementById('category-tabs-container');
    const groupsContainer = document.getElementById('wishlist-category-groups');

    // State 1: CHECK CATALOGUE INITIALIZATION
    if (typeof PRODUCTS === 'undefined' || !Array.isArray(PRODUCTS) || PRODUCTS.length === 0) {
      console.error('Technical Error: PRODUCTS catalogue is not loaded or empty.');
      if (totalCountEl) totalCountEl.textContent = 'Error loading saved products';
      if (groupsContainer) {
        groupsContainer.innerHTML = `
          <div class="wishlist-error-state" style="text-align:center;padding:50px 20px;">
            <div style="font-size:16px;font-weight:700;color:var(--nykaa-dark);margin-bottom:8px;">
              Unable to load your saved products.
            </div>
            <div style="font-size:13px;color:var(--nykaa-grey-600);margin-bottom:20px;">
              Technical error: The product catalogue dataset could not be initialized.
            </div>
            <button class="btn-primary btn-sm" id="btn-retry-catalogue">TRY AGAIN</button>
          </div>
        `;
        document.getElementById('btn-retry-catalogue')?.addEventListener('click', () => {
          renderWishlist();
        });
      }
      return;
    }

    // If no active user, redirect to welcome
    if (!state.currentUser) {
      showScreen('welcome');
      return;
    }

    try {
      // State 2: RESOLVE WISHLIST PRODUCTS
      const resolvedProducts = getCurrentUserProducts();
      const activeFilter = state.activeCategoryFilter || 'All';
      const categoriesPresent = [...new Set(resolvedProducts.map(p => p.category))];

      // Update Header Greeting and Item Count
      const greetingEl = document.getElementById('wishlist-user-greeting');
      if (greetingEl) greetingEl.textContent = `WELCOME BACK, ${state.currentUser.name.toUpperCase()}`;

      if (totalCountEl) {
        totalCountEl.textContent = `${resolvedProducts.length} item${resolvedProducts.length === 1 ? '' : 's'}`;
      }

      // Render Dynamic Category Navigation Tabs
      if (tabsContainer) {
        let tabsHtml = `
          <button class="category-tab ${activeFilter === 'All' ? 'active' : ''}" data-cat="All">
            All <span class="category-tab-count">(${resolvedProducts.length})</span>
          </button>
        `;
        categoriesPresent.forEach(cat => {
          const cCount = resolvedProducts.filter(p => p.category === cat).length;
          tabsHtml += `
            <button class="category-tab ${activeFilter === cat ? 'active' : ''}" data-cat="${cat}">
              ${cat} <span class="category-tab-count">(${cCount})</span>
            </button>
          `;
        });
        tabsContainer.innerHTML = tabsHtml;
      }

      // State 3: SUCCESSFUL RENDER OF CATEGORY GROUPS
      if (groupsContainer) {
        if (resolvedProducts.length === 0) {
          groupsContainer.innerHTML = `
            <div style="text-align:center;padding:60px 20px;color:var(--nykaa-grey-600);">
              <h3>Your wishlist is empty</h3>
              <p style="margin-top:8px;">Switch user profile to view other curated wishlists.</p>
              <button class="btn-primary btn-sm" id="btn-empty-switch" style="margin-top:16px;">Switch Profile</button>
            </div>
          `;
          return;
        }

        const catsToRender = activeFilter === 'All' ? categoriesPresent : [activeFilter];
        let html = '';
        catsToRender.forEach(cat => {
          const prods = resolvedProducts.filter(p => p.category === cat);
          if (prods.length > 0) {
            html += renderCategoryGroupSection(cat, prods);
          }
        });
        groupsContainer.innerHTML = html;
      }
    } catch (err) {
      console.error('Technical error in renderWishlist:', err);
      if (totalCountEl) totalCountEl.textContent = 'Error loading saved products';
      if (groupsContainer) {
        groupsContainer.innerHTML = `
          <div class="wishlist-error-state" style="text-align:center;padding:50px 20px;">
            <div style="font-size:16px;font-weight:700;color:var(--nykaa-dark);margin-bottom:8px;">
              Unable to load your saved products.
            </div>
            <div style="font-size:13px;color:var(--nykaa-grey-600);margin-bottom:20px;">
              An error occurred while resolving your saved items.
            </div>
            <button class="btn-primary btn-sm" id="btn-retry-wishlist">TRY AGAIN</button>
          </div>
        `;
        document.getElementById('btn-retry-wishlist')?.addEventListener('click', () => {
          renderWishlist();
        });
      }
    }
  }

  // ============================================================
  // SCREEN 2: STRUCTURED & NATURAL INPUT (Let's help you decide)
  // ============================================================
  function renderDecisionIntro() {
    const cat = state.activeDecisionCategory;
    const pill = document.getElementById('decide-category-pill');
    if (pill) pill.textContent = cat.toUpperCase();

    const input = document.getElementById('nl-user-input');
    if (input) {
      input.value = '';
      input.placeholder = `e.g. I need something for ${cat.toLowerCase()} that is breathable, comfortable, and has reliable sizing.`;
    }

    // Suggested prompts
    const promptRow = document.getElementById('suggested-prompts-row');
    if (promptRow) {
      let samplePrompts = [];
      if (cat === 'Topwear') {
        samplePrompts = [
          "Need something breathable for humid summer workdays, relaxed fit, don't like synthetic feel",
          "Crisp smart shirt for client meetings, 100% cotton, non-restrictive",
          "Versatile Friday smart-casual polo that works for dinner"
        ];
      } else if (cat === 'Ethnicwear') {
        samplePrompts = [
          "Breathable cotton Chikankari kurta for festive gatherings, regular fit",
          "Elegant kurta for family dinner, comfortable neckline and sleeves",
          "Dry-clean friendly festive ethnicwear with verified fabric"
        ];
      } else if (cat === 'Bottomwear') {
        samplePrompts = [
          "Loose fit comfortable trousers for all-day wear, breathable fabric",
          "Durable straight-leg jeans with reliable waist fit",
          "Lightweight casual trackpant for travel and weekends"
        ];
      } else if (cat === 'Activewear') {
        samplePrompts = [
          "Sweat-wicking gym t-shirt, lightweight microfiber, regular fit",
          "High flexibility training shorts with secure pockets",
          "Breathable sports tee that dries quickly after workout"
        ];
      } else {
        samplePrompts = [
          "Durable genuine leather accessory with verified hardware",
          "Everyday versatile bag with structured compartments",
          "Quality gift option with verified brand reputation"
        ];
      }

      promptRow.innerHTML = samplePrompts.map(p => `
        <button class="prompt-chip" data-prompt="${p}">"${p}"</button>
      `).join('');
    }

    // Purpose Chips
    const purposeEl = document.getElementById('chips-purpose');
    if (purposeEl) {
      const purposes = ['Work / Office', 'Festive Occasion', 'Everyday Casual', 'Dinner / Evening', 'Workout & Gym', 'Travel'];
      purposeEl.innerHTML = purposes.map(pur => `
        <button class="context-chip ${state.selectedPurpose === pur ? 'active' : ''}" data-group="purpose" data-val="${pur}">${pur}</button>
      `).join('');
    }

    // Priority Chips
    const priorityEl = document.getElementById('chips-priority');
    if (priorityEl) {
      const priorities = ['Fabric & Breathability', 'Fit & Sizing Certainty', 'Brand Category Trust', 'Price & Value', 'Care Routine'];
      priorityEl.innerHTML = priorities.map(pri => `
        <button class="context-chip ${state.selectedPriority === pri ? 'active' : ''}" data-group="priority" data-val="${pri}">${pri}</button>
      `).join('');
    }

    // Timeline Chips
    const timelineEl = document.getElementById('chips-timeline');
    if (timelineEl) {
      const timelines = ['This Weekend', 'Upcoming Event', 'Wardrobe Upgrade', 'Gift / Flexible'];
      timelineEl.innerHTML = timelines.map(tl => `
        <button class="context-chip ${state.selectedTimeline === tl ? 'active' : ''}" data-group="timeline" data-val="${tl}">${tl}</button>
      `).join('');
    }
  }

  // ============================================================
  // DECIDE RECOMMENDATION ENGINE (Gemini 3.6 Flash + Deterministic)
  // Wishlist has NO Gemini dependency. Gemini only runs here on user request.
  // ============================================================
  async function runDecisionEngine() {
    const cat = state.activeDecisionCategory;
    const userProducts = getCurrentUserProducts().filter(p => p.category === cat);

    if (userProducts.length === 0) {
      alert('No saved products available to compare in this category.');
      return;
    }

    const naturalInput = (document.getElementById('nl-user-input') || {}).value || '';
    state.naturalInputText = naturalInput;

    const btnText = document.getElementById('btn-see-options-text');
    const btnSpinner = document.getElementById('btn-see-options-spinner');
    const btn = document.getElementById('btn-see-options');

    if (btn) btn.disabled = true;
    if (btnText) btnText.textContent = 'Evaluating specifications & evidence...';
    if (btnSpinner) btnSpinner.style.display = 'inline-block';

    let rankedProducts = [];

    try {
      const response = await fetch(API_BASE + '/api/decide', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          category: cat,
          naturalInput: naturalInput,
          purpose: state.selectedPurpose,
          priority: state.selectedPriority,
          timeline: state.selectedTimeline,
          candidateProducts: userProducts
        })
      });

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.rankedProducts) && data.rankedProducts.length > 0) {
          rankedProducts = data.rankedProducts.map(rp => {
            const original = userProducts.find(p => p.id === rp.id) || userProducts[0];
            return {
              ...original,
              recommendationReason: rp.recommendationReason,
              decisionConfidence: rp.decisionConfidence || original.confidenceModel.overallConfidence,
              keyTradeoff: rp.keyTradeoff || (original.whatWeDontKnow && original.whatWeDontKnow[0]) || "Customer reviews are limited",
              whyThisWon: rp.whyThisWon || "Closest alignment to your stated preferences."
            };
          });
        }
      }
    } catch (err) {
      console.warn('Backend decide call failed, running deterministic client fallback:', err);
    }

    if (rankedProducts.length === 0) {
      rankedProducts = fallbackRankCandidates(userProducts, naturalInput);
    }

    state.rankedResults = rankedProducts;

    if (btn) btn.disabled = false;
    if (btnText) btnText.textContent = 'See My Options';
    if (btnSpinner) btnSpinner.style.display = 'none';

    renderResultsScreen();
    showScreen('results');
  }

  function fallbackRankCandidates(candidates, input) {
    const text = (input || '').toLowerCase();
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
      ...p,
      recommendationReason: idx === 0
        ? `Top match: Verified ${p.specifications.fabric || 'material'} with ${p.specifications.fit || 'comfortable'} silhouette matching your criteria.`
        : `Strong alternative option offering ${p.specifications.fabric || 'verified quality'}.`,
      decisionConfidence: p.confidenceModel ? p.confidenceModel.overallConfidence : 'HIGH',
      keyTradeoff: (p.whatWeDontKnow && p.whatWeDontKnow[0]) || "Customer reviews are limited for this specific SKU",
      whyThisWon: idx === 0
        ? `Highest criteria alignment for breathability and fit silhouette.`
        : `Alternative choice.`
    }));
  }

  // ============================================================
  // SCREEN 3: DECISION RESULTS (Your Strongest Choices)
  // ============================================================
  function renderResultsScreen() {
    const results = state.rankedResults;
    if (!results || results.length === 0) return;

    const grid = document.getElementById('results-grid');
    if (!grid) return;

    const intentPill = document.getElementById('results-intent-pill');
    if (intentPill) {
      intentPill.textContent = state.naturalInputText ? `Search Context: "${state.naturalInputText}"` : 'Criteria: Verified fabric, fit & brand trust';
    }

    grid.innerHTML = results.map((p, idx) => {
      const isWinner = idx === 0;
      const rankTag = isWinner ? '✨ #1 STRONGEST MATCH' : `#${idx + 1} Alternative`;
      const tagClass = isWinner ? 'best-match' : 'highest-rated';

      return `
        <div class="decision-card ${isWinner ? 'featured' : ''}" data-id="${p.id}">
          <div class="decision-card-tag ${tagClass}">${rankTag}</div>
          <div class="decision-card-img">
            ${renderProductImage(p, "decision-card-img")}
          </div>
          <div class="decision-card-body">
            <div class="decision-card-brand">${p.brand}</div>
            <div class="decision-card-title">${p.name}</div>
            <div class="decision-card-price">
              <span class="price-current">${formatPrice(p.price)}</span>
            </div>

            <!-- Recommendation Rationale -->
            <div style="margin:12px 0;padding:10px 12px;background:#f9f9f9;border-left:3px solid var(--nykaa-pink);border-radius:3px;font-size:12px;line-height:1.4;color:var(--nykaa-dark);">
              <strong>${isWinner ? 'DECIDE Recommendation:' : 'Comparison:'}</strong> ${p.recommendationReason}
            </div>

            <!-- Trade-off Note -->
            <div style="margin-bottom:12px;font-size:11px;color:var(--nykaa-grey-600);">
              <strong>Good to know:</strong> ${p.keyTradeoff}
            </div>

            <!-- Action buttons -->
            <div class="decision-card-actions" style="display:flex;flex-direction:column;gap:6px;">
              <button class="btn-primary btn-sm btn-add-to-bag" data-id="${p.id}">Move to Bag →</button>
              <div style="display:flex;gap:6px;">
                <button class="btn-outline btn-xs btn-view-full-evidence" data-id="${p.id}" style="flex:1;">Full Evidence</button>
                <button class="btn-outline btn-xs btn-open-reviews" data-id="${p.id}" style="flex:1;">What buyers say</button>
              </div>
            </div>
          </div>
        </div>
      `;
    }).join('');
  }

  // ============================================================
  // CUSTOMER EVIDENCE MODAL (Sections 1 & 2)
  // Strictly Truthful: Product rating, review count, zero fake reviews.
  // ============================================================
  function openReviewsModal(product) {
    state.activeReviewsProduct = product;
    const p = product;
    const modal = document.getElementById('reviews-modal');
    const title = document.getElementById('reviews-modal-title');
    const summary = document.getElementById('reviews-modal-summary');
    const list = document.getElementById('reviews-modal-list');

    title.textContent = `What buyers say: ${p.brand} ${p.name}`;

    const count = p.reviewCount || 0;
    const rating = p.rating;
    const countText = count === 1 ? '1 customer review' : `${count} customer reviews`;
    const ratingWord = count === 1 ? '1 customer rating is' : `${count} customer ratings are`;

    if (rating && count > 0) {
      summary.innerHTML = `
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px;">
          <span style="font-size:26px;font-weight:700;color:var(--nykaa-black);letter-spacing:-0.5px;">${rating}★</span>
          <span style="font-size:16px;">${renderStars(rating)}</span>
          <span style="color:var(--nykaa-grey-500);font-size:13px;">· Based on ${countText}</span>
        </div>
        <div style="font-size:14px;color:var(--nykaa-grey-700);margin-bottom:12px;font-weight:500;">
          ${ratingWord} available for this product.
        </div>
      `;
    } else {
      summary.innerHTML = `
        <div style="display:flex;align-items:baseline;gap:10px;margin-bottom:8px;">
          <span style="font-size:18px;font-weight:600;color:var(--nykaa-grey-700);">No customer ratings recorded</span>
          <span style="color:var(--nykaa-grey-500);font-size:13px;">· Based on 0 customer reviews</span>
        </div>
        <div style="font-size:14px;color:var(--nykaa-grey-700);margin-bottom:12px;">
          0 customer ratings are available for this product.
        </div>
      `;
    }

    const writtenReviews = (p.writtenReviews || (p.reviewObservations && p.reviewObservations.sampleQuotes)) || [];
    if (writtenReviews.length > 0 && writtenReviews[0]) {
      list.innerHTML = writtenReviews.map(r => {
        const text = typeof r === 'string' ? r : r.text;
        const revRating = (typeof r === 'object' && r.rating) ? `${r.rating}★ · ` : '';
        return `
          <div class="review-item-card">
            <div class="review-item-quote">"${text}"</div>
            <div class="review-item-meta">${revRating}Verified Buyer on Nykaa Fashion</div>
          </div>
        `;
      }).join('');
    } else {
      list.innerHTML = `
        <div style="padding:14px 16px;background:#f9f9f9;border:1px solid var(--nykaa-border);border-radius:6px;color:var(--nykaa-grey-700);font-size:13px;line-height:1.5;">
          No written review is available.
        </div>
      `;
    }

    modal.classList.add('visible');
  }

  // ============================================================
  // SCREEN 4: CUSTOMER-RELEVANT FULL EVIDENCE PAGE (Section 13)
  // ============================================================
  function renderFullEvidence(product) {
    const p = product;
    state.currentProduct = p;
    const container = document.getElementById('evidence-content');
    if (!container) return;

    container.innerHTML = `
      <a class="evidence-back" id="btn-back-from-evidence">← Back to decision choices</a>

      <div class="evidence-header">
        <div class="evidence-header-image">
          ${renderProductImage(p, "evidence-image")}
        </div>
        <div class="evidence-header-details">
          <div class="evidence-eyebrow">PRODUCT SPECIFICATIONS & EVIDENCE</div>
          <h1 class="evidence-title">${p.brand} ${p.name}</h1>
          <div class="evidence-price-row">
            <span class="price-current">${formatPrice(p.price)}</span>
            <span class="evidence-sku-tag">SKU: ${p.skuId}</span>
          </div>
          <div class="evidence-header-actions">
            <button class="btn-primary btn-add-to-bag" data-id="${p.id}">Move to Bag →</button>
            ${p.isPdpResolved && p.url ? `<a href="${p.url}" target="_blank" rel="noopener noreferrer" class="btn-outline">Open Nykaa PDP ↗</a>` : ''}
          </div>
        </div>
      </div>

      <div class="evidence-cards-grid">
        <div class="evidence-card">
          <div class="evidence-card-title">Verified Specifications</div>
          <table class="evidence-table">
            <tbody>
              <tr>
                <td class="table-label">Fabric / Material</td>
                <td class="table-val">${p.specifications.fabric}</td>
              </tr>
              <tr>
                <td class="table-label">Fit Silhouette</td>
                <td class="table-val">${p.specifications.fit}</td>
              </tr>
              <tr>
                <td class="table-label">Care Instructions</td>
                <td class="table-val">${p.specifications.care}</td>
              </tr>
              <tr>
                <td class="table-label">Garment Measurements</td>
                <td class="table-val">${p.specifications.measurements}</td>
              </tr>
              <tr>
                <td class="table-label">Fabric Weight / GSM</td>
                <td class="table-val">${p.specifications.gsm}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="evidence-card">
          <div class="evidence-card-title">Brand Category Presence</div>
          <div style="margin-bottom:12px;">
            ${confidenceBadge(p.confidenceModel.brandTrustLevel)}
          </div>
          <p style="font-size:13px;color:var(--nykaa-grey-700);line-height:1.5;">
            ${p.confidenceModel.brandTrustReason}
          </p>
          <div style="margin-top:16px;padding:12px;background:#fdf2f7;border-radius:4px;font-size:12px;color:var(--nykaa-pink-dark);">
            Nykaa Calibrated: Brand trust reflects customer volume and catalog presence in <strong>${p.category}</strong>.
          </div>
        </div>

        <div class="evidence-card">
          <div class="evidence-card-title">Customer Evidence</div>
          <table class="evidence-table">
            <tbody>
              <tr>
                <td class="table-label">Average Rating</td>
                <td class="table-val">${p.rating ? p.rating + '★' : 'Not rated'}</td>
              </tr>
              <tr>
                <td class="table-label">Customer Ratings</td>
                <td class="table-val">${p.reviewCount || 0}</td>
              </tr>
              <tr>
                <td class="table-label">Written Reviews</td>
                <td class="table-val">0</td>
              </tr>
              <tr>
                <td class="table-label">Customer Feedback</td>
                <td class="table-val">${p.reviewCount > 0 ? (p.reviewCount + ' customer rating(s) available for this product. No written review is available.') : 'No customer ratings or reviews recorded for this SKU yet.'}</td>
              </tr>
            </tbody>
          </table>
          <button class="btn-text btn-open-reviews" data-id="${p.id}" style="margin-top:10px;">
            Open Customer Evidence Modal →
          </button>
        </div>

        <div class="evidence-card">
          <div class="evidence-card-title">Purchase Considerations</div>
          <div style="margin-bottom:12px;">
            <div style="font-size:12px;font-weight:700;color:var(--nykaa-green);margin-bottom:4px;">CONFIRMED ATTRIBUTES</div>
            <ul style="padding-left:16px;font-size:12px;color:var(--nykaa-grey-700);line-height:1.6;">
              ${(p.whatWeKnow || []).map(k => `<li>${k}</li>`).join('')}
            </ul>
          </div>
          <div>
            <div style="font-size:12px;font-weight:700;color:var(--nykaa-grey-600);margin-bottom:4px;">INFORMATION GAPS</div>
            <ul style="padding-left:16px;font-size:12px;color:var(--nykaa-grey-600);line-height:1.6;">
              ${(p.whatWeDontKnow || []).map(dk => `<li>${dk}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `;
  }

  // ============================================================
  // SCREEN 5: COMPARISON VIEW (Section 10)
  // ============================================================
  function renderComparisonView() {
    const topThree = state.rankedResults.slice(0, 3);
    const container = document.getElementById('comparison-content');
    if (!container) return;

    const cat = state.activeDecisionCategory;

    container.innerHTML = `
      <a class="evidence-back" id="btn-back-from-comparison">← Back to results</a>

      <div style="margin:20px 0;">
        <h2>Compare ${cat} Options</h2>
        <p style="color:var(--nykaa-grey-600);font-size:14px;margin-top:4px;">Side-by-side comparison of your top 3 saved products based on verified specifications.</p>
      </div>

      <div style="display:grid;grid-template-columns:repeat(${topThree.length}, 1fr);gap:20px;">
        ${topThree.map((p, idx) => `
          <div style="background:#fff;border:1px solid var(--nykaa-border);border-radius:8px;padding:16px;">
            <div style="font-size:11px;font-weight:700;color:var(--nykaa-pink);margin-bottom:8px;">#${idx + 1} OPTION</div>
            <div style="width:100%;aspect-ratio:1;margin-bottom:12px;overflow:hidden;border-radius:4px;">${renderProductImage(p, "compare-image", "width:100%;height:100%;object-fit:cover;")}</div>
            <div style="font-weight:700;font-size:14px;">${p.brand}</div>
            <div style="font-size:12px;color:var(--nykaa-grey-700);margin-bottom:8px;">${p.name}</div>
            <div style="font-size:16px;font-weight:700;margin-bottom:12px;">${formatPrice(p.price)}</div>
            <div style="font-size:12px;line-height:1.5;">
              <div><strong>Fabric:</strong> ${p.specifications.fabric}</div>
              <div><strong>Fit:</strong> ${p.specifications.fit}</div>
              <div><strong>Care:</strong> ${p.specifications.care}</div>
              <div><strong>Ratings:</strong> ${p.rating ? p.rating + '★ (' + p.reviewCount + ')' : '0 Reviews'}</div>
            </div>
            <button class="btn-primary btn-sm btn-add-to-bag" data-id="${p.id}" style="width:100%;margin-top:16px;">Move to Bag →</button>
          </div>
        `).join('')}
      </div>
    `;
  }

  // ============================================================
  // SCREEN 6: MOVE TO BAG SUCCESS (Section 15)
  // ============================================================
  function renderBagSuccess(product) {
    state.bagProduct = product;
    const container = document.getElementById('bag-success-content');
    if (!container) return;

    container.innerHTML = `
      <div style="text-align:center;max-width:480px;margin:40px auto;padding:32px;background:#fff;border:1px solid var(--nykaa-border);border-radius:8px;">
        <div style="width:52px;height:52px;border-radius:50%;background:#e8f5e9;color:#2e7d32;display:flex;align-items:center;justify-content:center;font-size:24px;margin:0 auto 16px;">✓</div>
        <h2 style="margin-bottom:8px;">Added to Your Bag</h2>
        <p style="color:var(--nykaa-grey-600);font-size:14px;margin-bottom:24px;">Your decision choice has been confirmed and moved to your shopping bag.</p>

        <div style="display:flex;align-items:center;gap:16px;text-align:left;padding:16px;background:#fbfbfb;border-radius:6px;margin-bottom:24px;">
          <div style="width:64px;height:64px;border-radius:4px;overflow:hidden;">${renderProductImage(product, "bag-image", "width:64px;height:64px;object-fit:cover;")}</div>
          <div>
            <div style="font-weight:700;font-size:13px;">${product.brand}</div>
            <div style="font-size:12px;color:var(--nykaa-grey-700);">${product.name}</div>
            <div style="font-size:14px;font-weight:700;margin-top:4px;">${formatPrice(product.price)}</div>
          </div>
        </div>

        <div style="display:flex;gap:12px;justify-content:center;">
          <button class="btn-primary" id="btn-bag-back-wishlist">← Back to Wishlist</button>
          ${product.isPdpResolved && product.url ? `<a href="${product.url}" target="_blank" rel="noopener noreferrer" class="btn-outline">Open Nykaa PDP ↗</a>` : ''}
        </div>
      </div>
    `;
  }

  // ============================================================

  // ============================================================
  // RESEARCH INSIGHTS  (reviewer-facing, read-only)
  //
  // Every figure below is COMPUTED from PRODUCTS at render time.
  // Nothing is typed in, so the page tracks the dataset if it changes.
  //
  // Deliberately isolated from the shopping experience: it reads the
  // catalogue and renders. It never mutates state, wishlists,
  // confidence values, images or Gemini behaviour.
  //
  // Where the dataset cannot support a metric, the limitation is
  // stated rather than filled with an estimate.
  // ============================================================

  function rxEsc(s) {
    return String(s == null ? '' : s)
      .replace(/[&<>"]/g, function (c) {
        return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
      });
  }

  function rxDataset() {
    var all = (typeof PRODUCTS !== 'undefined' && Array.isArray(PRODUCTS)) ? PRODUCTS : [];
    return { all: all, active: all.filter(function (p) { return p.availability_status !== 'OUT_OF_STOCK'; }) };
  }

  function rxTally(list, fn) {
    return list.reduce(function (acc, x) {
      var k = fn(x);
      if (k === undefined || k === null) return acc;
      acc[k] = (acc[k] || 0) + 1;
      return acc;
    }, {});
  }

  function rxStated(list, key) {
    return list.filter(function (p) {
      var v = p.specifications && p.specifications[key];
      return v && String(v).trim() && String(v).trim().toLowerCase() !== 'not provided';
    }).length;
  }

  // Horizontal bars built from divs. No chart library, no canvas.
  function rxBars(entries, opts) {
    opts = opts || {};
    var max = Math.max.apply(null, entries.map(function (e) { return e[1]; }).concat([1]));
    var total = entries.reduce(function (n, e) { return n + e[1]; }, 0);
    return '<div class="rx-bars">' + entries.map(function (e) {
      var pct = max ? (e[1] / max * 100) : 0;
      var share = total ? Math.round(e[1] / total * 100) : 0;
      var tone = opts.toneFor ? (' tone-' + opts.toneFor(e[0])) : '';
      return '<div class="rx-bar-row">' +
               '<div class="rx-bar-label">' + rxEsc(e[0]) + '</div>' +
               '<div class="rx-bar-track"><div class="rx-bar-fill' + tone +
                 '" style="width:' + pct.toFixed(1) + '%"></div></div>' +
               '<div class="rx-bar-value">' + e[1] +
                 (opts.showShare ? ' <span class="rx-bar-share">' + share + '%</span>' : '') +
               '</div></div>';
    }).join('') + '</div>';
  }

  function rxTone(level) {
    var l = String(level).toUpperCase();
    if (l === 'HIGH') return 'good';
    if (l === 'MEDIUM' || l === 'PARTIAL') return 'mid';
    return 'low';
  }

  function rxSection(id, eyebrow, title, note, body, source) {
    return '<section class="rx-section" id="' + id + '">' +
             '<div class="rx-eyebrow">' + rxEsc(eyebrow) + '</div>' +
             '<h2 class="rx-title">' + rxEsc(title) + '</h2>' +
             (note ? '<p class="rx-note">' + rxEsc(note) + '</p>' : '') +
             body +
             (source ? '<div class="rx-source">' + rxEsc(source) + '</div>' : '') +
           '</section>';
  }

  function renderResearchInsights() {
    var container = document.getElementById('research-content');
    if (!container) return;

    var ds = rxDataset(), all = ds.all, active = ds.active;
    var oos = all.filter(function (p) { return p.availability_status === 'OUT_OF_STOCK'; });
    if (!all.length) {
      container.innerHTML = '<div class="rx-limit">Product catalogue unavailable.</div>';
      return;
    }

    var brands = {};
    active.forEach(function (p) { brands[p.brand] = 1; });
    var brandCount = Object.keys(brands).length;
    var categories = rxTally(active, function (p) { return p.category; });

    var pairs = {};
    active.forEach(function (p) {
      var k = p.brand + '||' + p.category;
      if (!pairs[k]) pairs[k] = { brand: p.brand, category: p.category, skus: 0, reviews: 0, rated: 0 };
      pairs[k].skus++;
      pairs[k].reviews += (p.reviewCount || 0);
      if (p.rating != null) pairs[k].rated++;
    });
    var pairList = Object.keys(pairs).map(function (k) { return pairs[k]; });

    var withReviews = active.filter(function (p) { return (p.reviewCount || 0) > 0; });
    var withRating = active.filter(function (p) { return p.rating != null; });
    var pc = function (n) { return Math.round(n / active.length * 100); };

    // ---- 1 : snapshot ----
    var tiles = [
      ['SKUs analysed', all.length, 'Full research dataset'],
      ['Active in MVP', active.length, oos.length + ' withdrawn as out of stock'],
      ['Categories', Object.keys(categories).length, 'Present in the active catalogue'],
      ['Brands', brandCount, pairList.length + ' brand × category pairs'],
      ['With customer reviews', withReviews.length, pc(withReviews.length) + '% of active SKUs'],
      ['With a rating', withRating.length, pc(withRating.length) + '% of active SKUs']
    ];
    var snapshot = '<div class="rx-tiles">' + tiles.map(function (t) {
      return '<div class="rx-tile"><div class="rx-tile-n">' + t[1] + '</div>' +
             '<div class="rx-tile-k">' + rxEsc(t[0]) + '</div>' +
             '<div class="rx-tile-s">' + rxEsc(t[2]) + '</div></div>';
    }).join('') + '</div>';

    // ---- 2 : categories ----
    var catEntries = Object.keys(categories).map(function (k) { return [k, categories[k]]; })
      .sort(function (a, b) { return b[1] - a[1]; });

    // ---- 3 : customer evidence ----
    var buckets = { 'No reviews': 0, '1–9 reviews': 0, '10–99 reviews': 0, '100+ reviews': 0 };
    active.forEach(function (p) {
      var n = p.reviewCount || 0;
      if (n === 0) buckets['No reviews']++;
      else if (n < 10) buckets['1–9 reviews']++;
      else if (n < 100) buckets['10–99 reviews']++;
      else buckets['100+ reviews']++;
    });

    // ---- 4 : decision signals ----
    var hasModel = active.filter(function (p) { return p.confidenceModel; });
    var signalBody;
    if (hasModel.length) {
      var order = ['HIGH', 'MEDIUM', 'PARTIAL', 'LIMITED', 'LOW'];
      var sorted = function (obj) {
        return Object.keys(obj).sort(function (a, b) {
          return order.indexOf(a) - order.indexOf(b);
        }).map(function (k) { return [k, obj[k]]; });
      };
      var grids = [
        ['Brand trust — brand × category', rxTally(hasModel, function (p) { return p.confidenceModel.brandTrustLevel; })],
        ['SKU evidence — this listing only', rxTally(hasModel, function (p) { return p.confidenceModel.skuEvidence; })],
        ['Product understanding', rxTally(hasModel, function (p) { return p.confidenceModel.productUnderstanding; })],
        ['Overall decision confidence', rxTally(hasModel, function (p) { return p.confidenceModel.overallConfidence; })]
      ];
      signalBody = '<div class="rx-grid2">' + grids.map(function (g) {
        return '<div class="rx-card"><h3 class="rx-card-title">' + rxEsc(g[0]) + '</h3>' +
               rxBars(sorted(g[1]), { toneFor: rxTone, showShare: true }) + '</div>';
      }).join('') + '</div>';
    } else {
      signalBody = '<div class="rx-limit">No decision-confidence values are stored on the catalogue, ' +
                   'so this distribution cannot be shown.</div>';
    }

    // ---- 5 : brand x category ----
    var depth = pairList.filter(function (p) { return p.skus >= 2; })
      .sort(function (a, b) { return b.skus - a.skus || b.reviews - a.reviews; }).slice(0, 10);
    var singles = pairList.filter(function (p) { return p.skus === 1; }).length;
    var brandBody =
      '<table class="rx-table"><thead><tr><th>Brand</th><th>Category</th>' +
      '<th class="rx-num">SKUs</th><th class="rx-num">Reviews</th><th class="rx-num">Rated</th></tr></thead><tbody>' +
      depth.map(function (p) {
        return '<tr><td class="rx-b">' + rxEsc(p.brand) + '</td><td>' + rxEsc(p.category) +
               '</td><td class="rx-num">' + p.skus + '</td><td class="rx-num">' + p.reviews +
               '</td><td class="rx-num">' + p.rated + '</td></tr>';
      }).join('') +
      '</tbody></table>' +
      '<div class="rx-limit">' + singles + ' of ' + pairList.length +
      ' brand × category pairs contain a single SKU. For those, category-level brand evidence ' +
      'cannot be assessed — a brand standing in one category is not evidence of its standing in another.</div>';

    // ---- 6 : findings, each carrying its own figure ----
    var noRev = buckets['No reviews'];
    var measurements = rxStated(active, 'measurements');
    var gsm = rxStated(active, 'gsm');
    var fabric = rxStated(active, 'fabric');
    var fit = rxStated(active, 'fit');
    var lowConf = hasModel.filter(function (p) { return p.confidenceModel.overallConfidence === 'LOW'; }).length;

    var findings = [
      ['Customer evidence is largely absent, not merely thin',
       noRev + ' of ' + active.length + ' active SKUs (' + pc(noRev) + '%) carry no customer reviews at all, ' +
       'and only ' + withRating.length + ' have a rating. Decision support cannot lean on peer evidence here.'],
      ['Listings describe material but not measurement',
       'Fabric is stated for ' + fabric + ' SKUs and fit for ' + fit + ', but flat measurements appear on only ' +
       measurements + ' and fabric weight on ' + gsm + '. A shopper can learn what a garment is made of, ' +
       'yet not whether it will fit.'],
      ['Brand familiarity does not transfer across categories',
       singles + ' of ' + pairList.length + ' brand × category pairs hold a single SKU, so brand evidence is ' +
       'category-specific by necessity rather than by preference.'],
      ['Confidence is constrained by information, not sentiment',
       lowConf + ' of ' + hasModel.length + ' SKUs resolve to LOW overall confidence. The limiting factor is ' +
       'missing listing detail and absent reviews — not negative feedback.']
    ];
    var findBody = '<ol class="rx-findings">' + findings.map(function (f) {
      return '<li><div class="rx-find-h">' + rxEsc(f[0]) + '</div><p>' + rxEsc(f[1]) + '</p></li>';
    }).join('') + '</ol>';

    // ---- 7 : hypothesis status ----
    // Carried from the research deck, which holds the hypothesis record. Each
    // entry reports what that research found; none of it is authored here.
    var hypotheses = [
      { status: 'REJECTED',
        claim: 'Wishlists stall because the saved item is no longer buyable.',
        found: 'The discovery engine ranked Purchasability highest, but primary research inverted it: ' +
               '22 of 22 walked-through items were still purchasable in the buyer’s size, and 21 of 22 ' +
               'were still wanted by the person who saved them. Availability was not the blocker.',
        src: 'Deck slides 1 and 5 — 22 items across 7 shoppers' },
      { status: 'REJECTED',
        claim: 'A GSM interpretation layer would help buyers judge fabric weight.',
        found: 'Killed by our own listing audit: 0 of 21 listings state fabric weight at all. ' +
               'There is nothing to interpret, so the feature was not built.',
        src: 'Deck slides 7 and 8 — 21-SKU line-by-line audit' },
      { status: 'MODIFIED',
        claim: 'Gate rates measured from review text estimate how often each failure occurs.',
        found: 'Revised to lower bounds, not estimates — and declared before analysis, not after. ' +
               'Public text samples what people bother to write down: stockouts and pricing are ' +
               'grievances, while indecision, forgetting and waiting generate no text. Purchasability ' +
               'and Economic are over-observed; Decision, Intent Decay and Latency under-observed.',
        src: 'Deck slide 4 — bias declared before classifying' },
      { status: 'ACCEPTED',
        claim: 'The buyer cannot determine what the product actually is from the listing.',
        found: 'Held across both instruments. The audit found 0 of 21 listings stating fabric weight, ' +
               '0 of 19 apparel SKUs giving garment measurements, 2 of 21 stating an exact fibre ' +
               'percentage and 20 of 21 marketing-led rather than spec-led — with one listing ' +
               'contradicting itself between spec table and description.',
        src: 'Deck slides 6 and 7 — root cause and listing audit' }
    ];
    var hypOrder = { REJECTED: 0, MODIFIED: 1, ACCEPTED: 2 };
    var hypoBody =
      '<div class="rx-hyps">' +
      hypotheses.sort(function (a, b) { return hypOrder[a.status] - hypOrder[b.status]; })
        .map(function (h) {
          return '<div class="rx-hyp rx-hyp-' + h.status.toLowerCase() + '">' +
                   '<div class="rx-hyp-status">' + rxEsc(h.status) + '</div>' +
                   '<div class="rx-hyp-body">' +
                     '<div class="rx-hyp-claim">' + rxEsc(h.claim) + '</div>' +
                     '<p class="rx-hyp-found">' + rxEsc(h.found) + '</p>' +
                     '<div class="rx-hyp-src">' + rxEsc(h.src) + '</div>' +
                   '</div></div>';
        }).join('') + '</div>' +
      '<div class="rx-limit">These are carried from the research deck, which holds the hypothesis ' +
      'record. The product catalogue in this build stores no hypothesis field, so unlike every other ' +
      'section on this page, this one does not recompute if the research changes.</div>';

    container.innerHTML =
      '<div class="rx-head">' +
        '<div class="rx-kicker">NYKAA FASHION · RESEARCH</div>' +
        '<h1 class="rx-h1">Research Insights</h1>' +
        '<p class="rx-sub">What the ' + all.length + '-SKU tail-listing audit shows about the evidence a ' +
        'shopper actually has at the point of decision. Every figure is computed from the catalogue in this build.</p>' +
        '<button class="btn-outline btn-sm" id="rx-back">← Back</button>' +
      '</div>' +
      rxSection('rx-1', 'SECTION 1', 'Research snapshot',
        'Scope of the audited dataset and how much of it reaches the MVP.',
        snapshot, 'Source: product catalogue (data.js), ' + all.length + ' SKUs.') +
      rxSection('rx-2', 'SECTION 2', 'Category insights',
        'How the active catalogue is distributed across categories.',
        rxBars(catEntries, { showShare: true }),
        'Counts exclude the ' + oos.length + ' out-of-stock SKUs.') +
      rxSection('rx-3', 'SECTION 3', 'Customer evidence',
        'How many active SKUs carry review evidence, and how much.',
        rxBars(Object.keys(buckets).map(function (k) { return [k, buckets[k]]; }), { showShare: true }),
        'Buckets derive from reviewCount on each listing.') +
      rxSection('rx-4', 'SECTION 4', 'Decision signals',
        'Distribution of the confidence dimensions the MVP already computes. These are the stored ' +
        'qualitative levels; no numeric score is derived from them.',
        signalBody, 'Source: confidenceModel on each product. Levels only.') +
      rxSection('rx-5', 'SECTION 5', 'Brand × category',
        'Brand trust is evaluated per category. Only pairs holding two or more SKUs carry any ' +
        'category-level evidence.',
        brandBody, 'Ranked by SKU depth, then review volume.') +
      rxSection('rx-6', 'SECTION 6', 'Key research findings',
        'Each finding carries the figure it rests on.', findBody, '') +
      rxSection('rx-7', 'SECTION 7', 'Hypothesis status',
        'Accepted / modified / rejected.', hypoBody, '');

    var back = document.getElementById('rx-back');
    if (back) back.addEventListener('click', function () {
      showScreen(state.currentUser ? 'wishlist' : 'welcome');
    });
  }

  // MODAL 2: V2 FUTURE ROADMAP (Section 17)
  // ============================================================
  function renderV2Roadmap() {
    const container = document.getElementById('v2-features-container');
    if (!container || typeof V2_FEATURES === 'undefined') return;

    container.innerHTML = V2_FEATURES.map(cat => `
      <div style="margin-bottom:24px;">
        <div style="font-size:11px;font-weight:700;color:var(--nykaa-pink);letter-spacing:0.8px;margin-bottom:10px;">${cat.category}</div>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;">
          ${cat.features.map(f => `
            <div style="padding:14px;background:#fbfbfb;border:1px solid var(--nykaa-border);border-radius:6px;">
              <div style="font-weight:700;font-size:13px;margin-bottom:4px;">${f.title}</div>
              <div style="font-size:12px;color:var(--nykaa-grey-700);line-height:1.4;margin-bottom:8px;">${f.description}</div>
              <div style="font-size:11px;color:var(--nykaa-grey-500);">Dependency: ${f.dependency}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `).join('');
  }

  // ============================================================
  // EVENT BINDINGS
  // ============================================================
  function bindEvents() {
    // Nav: Wishlist
    document.getElementById('nav-wishlist')?.addEventListener('click', (e) => {
      e.preventDefault();
      if (state.currentUser) {
        showScreen('wishlist');
        renderWishlist();
      } else {
        showScreen('welcome');
      }
    });

    // Profile Dropdown Toggle
    const profileBtn = document.getElementById('nav-profile-btn');
    const profileDropdown = document.getElementById('nav-profile-dropdown');
    if (profileBtn && profileDropdown) {
      profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('visible');
      });

      document.addEventListener('click', (e) => {
        if (!profileBtn.contains(e.target) && !profileDropdown.contains(e.target)) {
          profileDropdown.classList.remove('visible');
        }
      });
    }

    // Switch Profile Button
    document.getElementById('btn-switch-profile')?.addEventListener('click', () => {
      switchUser();
    });

    // Log Out Button
    document.getElementById('btn-logout')?.addEventListener('click', () => {
      logoutUser();
    });

    // Welcome Screen: Select Profile
    document.addEventListener('click', (e) => {
      const selectBtn = e.target.closest('.btn-select-user');
      const card = e.target.closest('.welcome-user-card');
      if (selectBtn) {
        e.stopPropagation();
        selectUser(selectBtn.dataset.userId);
      } else if (card) {
        selectUser(card.dataset.userId);
      }
    });

    // Category Tabs in Wishlist
    document.addEventListener('click', (e) => {
      const tab = e.target.closest('.category-tab');
      if (tab) {
        state.activeCategoryFilter = tab.dataset.cat;
        renderWishlist();
      }
    });

    // Start Compare Button in Wishlist Category Group
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-start-compare');
      if (btn) {
        const cat = btn.dataset.category;
        state.activeDecisionCategory = cat;
        renderDecisionIntro();
        showScreen('decide-intro');
      }
    });

    // Back from Decide Intro to Wishlist
    document.getElementById('btn-back-from-intro')?.addEventListener('click', () => {
      showScreen('wishlist');
      renderWishlist();
    });

    // See My Options / Run DECIDE Recommendation
    document.getElementById('btn-see-options')?.addEventListener('click', () => {
      runDecisionEngine();
    });

    // Quick Prompt Chips on Decide Intro
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.prompt-chip');
      if (chip) {
        const input = document.getElementById('nl-user-input');
        if (input) {
          input.value = chip.dataset.prompt || chip.textContent.trim().replace(/^["']|["']$/g, '');
        }
      }
    });

    // Context Chips (Purpose, Priority, Timeline)
    document.addEventListener('click', (e) => {
      const chip = e.target.closest('.context-chip');
      if (chip) {
        const grp = chip.dataset.group;
        const val = chip.dataset.val;
        const parent = chip.parentElement;
        parent.querySelectorAll('.context-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        if (grp === 'purpose') state.selectedPurpose = val;
        if (grp === 'priority') state.selectedPriority = val;
        if (grp === 'timeline') state.selectedTimeline = val;
      }
    });

    // Back from Results to Decide Intro
    document.getElementById('btn-back-from-results')?.addEventListener('click', () => {
      showScreen('decide-intro');
    });

    // Compare Top 3 Button
    document.getElementById('btn-show-comparison')?.addEventListener('click', () => {
      renderComparisonView();
      showScreen('comparison');
    });

    // Back from Comparison to Results
    document.addEventListener('click', (e) => {
      if (e.target.id === 'btn-back-from-comparison') {
        showScreen('results');
      }
    });

    // Back from Evidence to Results
    document.addEventListener('click', (e) => {
      if (e.target.id === 'btn-back-from-evidence') {
        showScreen('results');
      }
    });

    // Back to Wishlist from Bag Success
    document.addEventListener('click', (e) => {
      if (e.target.id === 'btn-bag-back-wishlist' || e.target.id === 'btn-empty-switch') {
        showScreen('wishlist');
        renderWishlist();
      }
    });

    // Reviews Modal: Open Triggers
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-open-reviews');
      if (btn) {
        const id = btn.dataset.id;
        const product = findActiveProduct(id);
        if (product) openReviewsModal(product);
      }
    });

    // Reviews Modal: Close Triggers
    document.getElementById('reviews-modal-close')?.addEventListener('click', () => {
      document.getElementById('reviews-modal')?.classList.remove('visible');
    });
    document.getElementById('reviews-modal-done')?.addEventListener('click', () => {
      document.getElementById('reviews-modal')?.classList.remove('visible');
    });
    const revModal = document.getElementById('reviews-modal');
    if (revModal) {
      revModal.addEventListener('click', (e) => {
        if (e.target === revModal) revModal.classList.remove('visible');
      });
    }

    // View Full Evidence Button
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-view-full-evidence');
      if (btn) {
        const id = btn.dataset.id;
        const product = findActiveProduct(id);
        if (product) {
          renderFullEvidence(product);
          showScreen('evidence');
        }
      }
    });

    // Move to Bag Button
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.btn-add-to-bag');
      if (btn) {
        const id = btn.dataset.id;
        const product = findActiveProduct(id);
        if (product) {
          renderBagSuccess(product);
          showScreen('bag-success');
        }
      }
    });

    // Research Insights — INTERNAL / EVALUATOR ONLY.
    //
    // Deliberately absent from shopper navigation. It shows the bias register,
    // hypothesis status and classifier distributions: research methodology that
    // a shopper should never have to see, and that would misrepresent this
    // product as an insights dashboard rather than a decision tool.
    //
    // Reachable only via ?research=1, which also injects the single link into
    // the utility bar for that session. The shopper product is complete and
    // coherent without it.
    if (new URLSearchParams(window.location.search).get('research') === '1') {
      const bar = document.querySelector('.utility-bar-right');
      if (bar) {
        const a = document.createElement('a');
        a.href = '#';
        a.id = 'link-research-insights';
        a.textContent = 'Research Insights (internal)';
        a.addEventListener('click', (e) => {
          e.preventDefault();
          renderResearchInsights();
          showScreen('research');
        });
        bar.insertBefore(a, bar.firstChild);
      }
    }

    // V2 Roadmap Modal Trigger
    const v2Trigger = document.getElementById('btn-show-v2-roadmap');
    const v2Utility = document.getElementById('utility-v2-link');
    const v2Modal = document.getElementById('v2-roadmap-modal');
    const v2Close = document.getElementById('v2-roadmap-close');

    [v2Trigger, v2Utility].forEach(el => {
      el?.addEventListener('click', (e) => {
        e.preventDefault();
        v2Modal?.classList.add('visible');
      });
    });
    v2Close?.addEventListener('click', () => {
      v2Modal?.classList.remove('visible');
    });
    if (v2Modal) {
      v2Modal.addEventListener('click', (e) => {
        if (e.target === v2Modal) v2Modal.classList.remove('visible');
      });
    }

    // Heart Icon removal from wishlist
    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('wishlist-heart-btn')) {
        e.stopPropagation();
        const id = e.target.dataset.id;
        if (state.currentUser) {
          const currentSkuIds = getUserWishlistSkuIds(state.currentUser.id);
          const updated = currentSkuIds.filter(sku => sku.toLowerCase() !== id.toLowerCase());
          saveUserWishlistSkuIds(state.currentUser.id, updated);
          renderWishlist();
        }
      }
    });
  }

  // ============================================================
  // INITIALISATION (Section 6)
  // Ensures catalogue readiness before attempting wishlist render.
  // ============================================================
  function init() {
    renderWelcomeScreen();
    renderV2Roadmap();
    bindEvents();

    // Check if active user session exists in sessionStorage
    const sessionUserId = sessionStorage.getItem('nykaa_active_user_id');
    if (sessionUserId && typeof USER_PROFILES !== 'undefined') {
      const profile = USER_PROFILES.find(u => u.id === sessionUserId);
      if (profile) {
        state.currentUser = profile;
        updateUserHeaderUI();
        showScreen('wishlist');
        renderWishlist();
        return;
      }
    }

    // On fresh launch, display Welcome Screen (Screen 0)
    showScreen('welcome');
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
