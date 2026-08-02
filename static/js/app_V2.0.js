/* ==========================================================================
   Consumer Insight Engine — frontend logic
   Talks to the existing Flask routes (/collect, /analyze) exactly as the
   old inline script did. Nothing about the request/response contract
   changed here — only how the results are rendered.
   ========================================================================== */

const RUN_STEPS = [
  { id: "collect", label: "Reading collected reviews", description: "Loading the Play Store data gathered in step 1." },
  { id: "prompt", label: "Grounding the research questions", description: "Sending reviews + questions to the analysis model." },
  { id: "extract", label: "Extracting themes & evidence", description: "Parsing themes, segments and confidence scores." },
  { id: "finalize", label: "Finalizing the report", description: "Normalizing fields for display." },
];
const STEP_MS = 1400; // purely cosmetic pacing, real work happens in parallel

let storedRawData = null;
let timelineInterval = null;

/* ---------------------------------------------------------------------- */
/* Element refs                                                            */
/* ---------------------------------------------------------------------- */

const collectBtn = document.getElementById("collectBtn");
const analyzeBtn = document.getElementById("analyzeBtn");
const collectStatus = document.getElementById("collectStatus");
const collectionSummary = document.getElementById("collectionSummary");
const summaryGrid = document.getElementById("summaryGrid");
const timelineSection = document.getElementById("timelineSection");
const timelineSteps = document.getElementById("timelineSteps");
const timelineFill = document.getElementById("timelineFill");
const timelineCountdown = document.getElementById("timelineCountdown");
const resultsSection = document.getElementById("results");
const emptyState = document.getElementById("emptyState");
const toastStack = document.getElementById("toast-stack");

/* ---------------------------------------------------------------------- */
/* Toasts + inline status                                                  */
/* ---------------------------------------------------------------------- */

function showToast(message, kind = "info") {
  const el = document.createElement("div");
  el.className = `toast ${kind === "error" ? "toast-error" : kind === "success" ? "toast-success" : ""}`;
  el.textContent = message;
  toastStack.appendChild(el);
  setTimeout(() => el.remove(), 4500);
}

function setInlineStatus(kind, message) {
  collectStatus.className = `status-inline visible is-${kind}`;
  collectStatus.innerHTML =
    kind === "loading" ? `<span class="btn-spinner-inline"></span> ${message}` : message;
}

function hideInlineStatus() {
  collectStatus.className = "status-inline";
}

/* ---------------------------------------------------------------------- */
/* Formatting helpers                                                      */
/* ---------------------------------------------------------------------- */

function pillClassForFrequency(level) {
  const l = (level || "").toLowerCase();
  if (l === "high") return "pill-high";
  if (l === "medium") return "pill-medium";
  return "pill-low";
}

function pillClassForConfidence(level) {
  return pillClassForFrequency(level);
}

function sentimentLabel(score) {
  if (score > 15) return { text: "Favorable", cls: "pill-positive" };
  if (score < -15) return { text: "Frustrated", cls: "pill-negative" };
  return { text: "Mixed", cls: "pill-neutral" };
}

function escapeHtml(str) {
  const div = document.createElement("div");
  div.textContent = str ?? "";
  return div.innerHTML;
}

/* ---------------------------------------------------------------------- */
/* Step 1: Collect                                                         */
/* ---------------------------------------------------------------------- */

collectBtn.addEventListener("click", async () => {
  collectBtn.disabled = true;
  analyzeBtn.disabled = true;
  resultsSection.classList.add("hidden");
  collectionSummary.classList.add("hidden");
  setInlineStatus("loading", "Collecting Play Store reviews — this can take 30–60 seconds.");

  try {
    const res = await fetch("/collect", { method: "POST" });
    const resp = await res.json();

    if (resp.status === "success") {
      storedRawData = resp.raw_data;
      analyzeBtn.disabled = false;

      const m = resp.meta;
      summaryGrid.innerHTML = `
        <div class="surface-card kpi-card">
          <p class="label">Collected at</p>
          <p class="value" style="font-size:0.95rem;">${escapeHtml(m.timestamp.split("T")[1]?.slice(0, 8) || m.timestamp)}</p>
        </div>
        <div class="surface-card kpi-card">
          <p class="label">Reviews fetched</p>
          <p class="value">${(m.total_fetched || 0).toLocaleString()}</p>
        </div>
        <div class="surface-card kpi-card">
          <p class="label">Matched reviews</p>
          <p class="value">${(m.play_store_reviews || 0).toLocaleString()}</p>
          <p class="hint">Relevant to your research keywords</p>
        </div>
        <div class="surface-card kpi-card">
          <p class="label">Data volume</p>
          <p class="value">${(m.total_chars || 0).toLocaleString()}</p>
          <p class="hint">characters collected</p>
        </div>
      `;
      collectionSummary.classList.remove("hidden");
      collectionSummary.classList.add("fade-in");

      if (m.quality_warning) {
        showToast(m.quality_warning, "error");
      }
      setInlineStatus("success", "Data collected. Click \u201cRun Analysis\u201d to continue.");
    } else {
      setInlineStatus("error", `Collection failed: ${resp.message}`);
      showToast(`Collection failed: ${resp.message}`, "error");
    }
  } catch (err) {
    setInlineStatus("error", `Network error during collection: ${err.message}`);
    showToast("Network error during collection.", "error");
  } finally {
    collectBtn.disabled = false;
  }
});

/* ---------------------------------------------------------------------- */
/* Step 2: Analyze (with cosmetic timeline, real fetch runs in parallel)   */
/* ---------------------------------------------------------------------- */

function renderTimelineSteps(activeIndex, done) {
  timelineSteps.innerHTML = RUN_STEPS.map((step, i) => {
    const state = done ? "done" : i < activeIndex ? "done" : i === activeIndex ? "active" : "pending";
    const icon =
      state === "done"
        ? "&#10003;"
        : state === "active"
          ? `<span class="btn-spinner-inline" style="border-color:color-mix(in oklab, currentColor 30%, transparent); border-top-color:currentColor;"></span>`
          : String(i + 1);
    return `
      <li class="timeline-step ${state}">
        <div class="rail">
          <span class="dot">${icon}</span>
          ${i < RUN_STEPS.length - 1 ? '<span class="connector"></span>' : ""}
        </div>
        <div class="content">
          <p class="title">${escapeHtml(step.label)}</p>
          <p class="desc">${escapeHtml(step.description)}</p>
        </div>
      </li>`;
  }).join("");
}

function startTimeline() {
  timelineSection.classList.remove("hidden");
  const total = RUN_STEPS.length * STEP_MS;
  const startedAt = Date.now();
  renderTimelineSteps(0, false);

  timelineInterval = setInterval(() => {
    const elapsed = Date.now() - startedAt;
    const progress = Math.min(1, elapsed / total);
    timelineFill.style.width = `${progress * 100}%`;

    const remaining = Math.max(0, total - elapsed);
    const secs = Math.ceil(remaining / 1000);
    timelineCountdown.textContent = `0:${String(secs).padStart(2, "0")}`;

    const activeIndex = Math.min(RUN_STEPS.length - 1, Math.floor(elapsed / STEP_MS));
    renderTimelineSteps(activeIndex, false);
  }, 150);
}

function finishTimeline() {
  clearInterval(timelineInterval);
  timelineFill.style.width = "100%";
  timelineCountdown.textContent = "0:00";
  renderTimelineSteps(RUN_STEPS.length, true);
}

analyzeBtn.addEventListener("click", async () => {
  collectBtn.disabled = true;
  analyzeBtn.disabled = true;
  resultsSection.classList.add("hidden");
  emptyState.classList.add("hidden");
  startTimeline();

  try {
    const res = await fetch("/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ raw_data: storedRawData }),
    });
    const resp = await res.json();

    finishTimeline();

    if (resp.status === "success") {
      renderResults(resp.data, resp.meta);
      resultsSection.classList.remove("hidden");
      resultsSection.classList.add("fade-in");
      resultsSection.scrollIntoView({ behavior: "smooth", block: "start" });
      showToast("Analysis complete.", "success");
    } else {
      showToast(`Analysis failed: ${resp.message}`, "error");
      emptyState.classList.remove("hidden");
    }
  } catch (err) {
    finishTimeline();
    showToast(`Network error during analysis: ${err.message}`, "error");
    emptyState.classList.remove("hidden");
  } finally {
    collectBtn.disabled = false;
    analyzeBtn.disabled = false;
  }
});

/* ---------------------------------------------------------------------- */
/* Rendering the analysis report                                           */
/* ---------------------------------------------------------------------- */

function renderResults(data, meta) {
  document.getElementById("summaryHeadline").textContent =
    `${data.themes.length} themes, ${data.questions.length} research questions grounded across ${meta.play_store_reviews || 0} reviews.`;
  document.getElementById("summaryTimestamp").textContent =
    `Generated ${new Date(meta.timestamp).toLocaleString()}`;

  renderThemes(data.themes);
  renderQuestions(data.questions, data.themes);
  renderSegments(data.segments);
  renderFailureAnalysis(data.failure_analysis);
  renderValidationGaps(data.validation_gaps);
}

function renderThemes(themes) {
  const grid = document.getElementById("themesGrid");
  if (!themes.length) {
    grid.innerHTML = `<p class="hint">No distinct themes were returned for this run.</p>`;
    return;
  }
  grid.innerHTML = themes
    .map((t) => {
      const sentiment = sentimentLabel(t.sentiment_score ?? 0);
      return `
      <article class="surface-card evidence-card">
        <div class="tags">
          <span class="pill ${pillClassForFrequency(t.frequency)}">${escapeHtml(t.frequency || "Medium")} frequency</span>
          <span class="pill ${sentiment.cls}">${sentiment.text}</span>
          <span class="spacer">${(t.verbatim_count ?? 0).toLocaleString()} mentions</span>
        </div>
        <div>
          <h3>${escapeHtml(t.name)}</h3>
          <p class="detail">${escapeHtml(t.description)}</p>
        </div>
      </article>`;
    })
    .join("");
}

function renderQuestions(questions, themes) {
  const wrap = document.getElementById("questionsAccordion");
  if (!questions.length) {
    wrap.innerHTML = `<p class="hint" style="padding:1.25rem;">No research questions were returned for this run.</p>`;
    return;
  }
  wrap.innerHTML = questions
    .map((q, i) => {
      const bullets = (q.evidence || [])
        .map(
          (e) => `<li><span class="marker"></span><span>${escapeHtml(e)}</span></li>`
        )
        .join("");
      return `
      <div class="accordion-item ${i === 0 ? "open" : ""}">
        <button type="button" class="accordion-trigger" data-toggle>
          <span>${escapeHtml(q.id)}: ${escapeHtml(q.question)}</span>
          <span class="chevron">&#9660;</span>
        </button>
        <div class="accordion-content">
          <p class="answer">${escapeHtml(q.answer)}</p>
          <ul class="evidence-quote-list">${bullets}</ul>
          <div class="confidence-row">
            <div class="confidence-track">
              <div class="confidence-fill" style="width:${q.confidence_pct ?? 0}%;"></div>
            </div>
            <span class="figure">${q.confidence_pct ?? 0}%<span class="unit">confidence</span></span>
          </div>
        </div>
      </div>`;
    })
    .join("");

  wrap.querySelectorAll("[data-toggle]").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.closest(".accordion-item").classList.toggle("open");
    });
  });
}

function renderSegments(segments) {
  const wrap = document.getElementById("segmentsTags");
  if (!segments.length) {
    wrap.innerHTML = `<p class="hint">No distinct segments identified.</p>`;
    return;
  }
  wrap.innerHTML = segments
    .map((s) => `<span class="pill pill-outline">${escapeHtml(s)}</span>`)
    .join("");
}

function renderFailureAnalysis(items) {
  const box = document.getElementById("failureBox");
  if (!items.length) {
    box.innerHTML = `<p class="hint">No failure cases surfaced in this run.</p>`;
    return;
  }
  box.innerHTML = `<ul>${items
    .map((f) => `<li><strong>${escapeHtml(f.case)}</strong> — ${escapeHtml(f.resolution)}</li>`)
    .join("")}</ul>`;
}

function renderValidationGaps(gaps) {
  const box = document.getElementById("gapsBox");
  if (!gaps.length) {
    box.innerHTML = `<p class="hint">No validation gaps flagged.</p>`;
    return;
  }
  box.innerHTML =
    `<ul>${gaps.map((g) => `<li>${escapeHtml(g)}</li>`).join("")}</ul>` +
    `<p class="footer-note">These gaps are exactly what primary user interviews are for.</p>`;
}
