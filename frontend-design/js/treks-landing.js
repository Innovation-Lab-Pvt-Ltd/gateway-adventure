/* ============================================================
   Gateway Treks — Treks Landing Page JavaScript
   Depends on treks-data.js being loaded first (REGIONS, TREKS,
   TRIP_OF_THE_MONTH, SEASONS, REVIEWS, DEPARTURES).
   Uses the site's existing $ / $$ helpers from index.js.
   ============================================================ */

/* ---------------- helpers ---------------- */
const money = (n) => `$${n.toLocaleString()}`;
const initials = (name) => name.split(" ").map(w => w[0]).join("").slice(0, 2);
const difficultyLabel = (d) => d.charAt(0).toUpperCase() + d.slice(1);

/* ============================================================
   2. REGION-WISE TREKS — tablist + filtered grid + URL state
   ============================================================ */
const regionTabsEl = document.getElementById("regionTabs");
const regionGridEl = document.getElementById("regionGrid");
let activeRegion = "all";

function buildRegionTabs() {
    const all = [{ id: "all", name: "All" }, ...REGIONS];
    regionTabsEl.innerHTML = all.map((r, i) => `
        <button class="tl-tab"
            role="tab"
            id="tab-${r.id}"
            aria-selected="${r.id === activeRegion}"
            tabindex="${r.id === activeRegion ? 0 : -1}"
            data-region="${r.id}">${r.name}</button>
    `).join("");
}

function renderRegionGrid() {
    const filtered = activeRegion === "all"
        ? REGIONS
        : REGIONS.filter(r => r.id === activeRegion);

    const cards = [...regionGridEl.querySelectorAll(".tl-region-card")];

    const paint = () => {
        regionGridEl.innerHTML = filtered.map(r => `
            <a href="#" class="tl-region-card" data-region="${r.id}" aria-label="View ${r.name} treks">
                <img src="${r.image}" alt="${r.name} region" loading="lazy">
                <div class="tl-region-card-shade"></div>
                <div class="tl-region-card-body">
                    <div class="tl-region-card-count">${r.count} Treks</div>
                    <h3>${r.name}</h3>
                    <p class="tl-region-card-blurb">${r.blurb}</p>
                    <span class="tl-region-card-link">View Treks
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                    </span>
                </div>
            </a>
        `).join("");
    };

    if (cards.length === 0) {
        paint();
        return;
    }

    // staggered fade-out, then paint + rely on CSS transition for fade-in
    cards.forEach((card, i) => {
        setTimeout(() => card.classList.add("tl-fade-out"), i * 50);
    });
    setTimeout(paint, cards.length * 50 + 220);
}

function setActiveRegion(id, { pushState = true } = {}) {
    activeRegion = id;
    buildRegionTabs();
    renderRegionGrid();

    const label = id === "all" ? "All Regions" : REGIONS.find(r => r.id === id)?.name || id;
    document.title = id === "all"
        ? "Trekking Adventures in Nepal — Gateway Treks Adventure And Expedition"
        : `${label} Treks — Gateway Treks Adventure And Expedition`;

    if (pushState) {
        const url = new URL(window.location);
        if (id === "all") {
            url.searchParams.delete("region");
        } else {
            url.searchParams.set("region", id);
        }
        history.pushState({ region: id }, "", url);
    }
}

regionTabsEl.addEventListener("click", (e) => {
    const btn = e.target.closest(".tl-tab");
    if (!btn) return;
    setActiveRegion(btn.dataset.region);
});

regionGridEl.addEventListener("click", (e) => {
    const card = e.target.closest(".tl-region-card");
    if (!card) return;
    e.preventDefault();
    setActiveRegion(card.dataset.region);
    regionTabsEl.scrollIntoView({ behavior: "smooth", block: "start" });
});

// Arrow-key / Home / End navigation for the tablist
regionTabsEl.addEventListener("keydown", (e) => {
    const tabs = [...regionTabsEl.querySelectorAll(".tl-tab")];
    const current = tabs.findIndex(t => t.getAttribute("aria-selected") === "true");
    let next = null;

    if (e.key === "ArrowRight") next = (current + 1) % tabs.length;
    else if (e.key === "ArrowLeft") next = (current - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = tabs.length - 1;
    else return;

    e.preventDefault();
    setActiveRegion(tabs[next].dataset.region);
    document.getElementById(`tab-${tabs[next].dataset.region}`)?.focus();
});

window.addEventListener("popstate", () => {
    const region = new URL(window.location).searchParams.get("region") || "all";
    setActiveRegion(region, { pushState: false });
});

/* ============================================================
   4. BEST SELLING TREKS — horizontal carousel
   ============================================================ */
function renderBestSellers() {
    const el = document.getElementById("bestSellerCarousel");
    const items = TREKS.filter(t => t.bestSeller);
    el.innerHTML = items.map(t => `
        <article class="tl-trek-card" tabindex="0" aria-label="${t.title}, from ${money(t.price)}">
            <div class="tl-trek-media">
                <img src="${t.image}" alt="${t.title}" loading="lazy">
                <span class="tl-badge">${t.duration} Days</span>
                <span class="tl-badge tl-badge-difficulty" data-level="${t.difficulty}">${difficultyLabel(t.difficulty)}</span>
                <span class="tl-ribbon">Best Seller</span>
            </div>
            <div class="tl-trek-body">
                <h3>${t.title}</h3>
                <div class="tl-trek-meta">
                    <span class="stars">★ ${t.rating}</span>
                    <span>(${t.reviews} reviews)</span>
                </div>
                <div class="tl-trek-price">from<strong>${money(t.price)}</strong></div>
            </div>
        </article>
    `).join("");
}

/* ============================================================
   5. TRIP OF THE MONTH
   ============================================================ */
function renderTripOfMonth() {
    const el = document.getElementById("tripOfMonth");
    const t = TRIP_OF_THE_MONTH;
    el.innerHTML = `
        <img src="${t.image}" alt="${t.title}" loading="lazy">
        <div class="tl-totm-shade"></div>
        <div class="tl-totm-body">
            <span class="tl-totm-badge">${t.label}</span>
            <h3>${t.title}</h3>
            <p>${t.description}</p>
            <ul class="tl-totm-highlights">
                ${t.highlights.map(h => `
                    <li>
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M20 6 9 17l-5-5"/></svg>
                        ${h}
                    </li>
                `).join("")}
            </ul>
            <div class="tl-totm-price">${money(t.price)} <small>per person</small></div>
            <div class="tl-totm-note">${t.note}</div>
            <a href="contact-us.html" class="btn btn-light">Book This Trek</a>
        </div>
    `;
}

/* ============================================================
   6. BEST TIME TO VISIT
   ============================================================ */
function renderSeasons() {
    const el = document.getElementById("seasonGrid");
    el.innerHTML = SEASONS.map(s => `
        <div class="tl-season-card ${s.featured ? "tl-featured" : ""}">
            ${s.featured ? '<span class="tl-season-featured-badge">Best Overall</span>' : ""}
            <div class="tl-season-icon">${s.icon}</div>
            <h3>${s.name}</h3>
            <div class="tl-season-months">${s.months}</div>
            <p>${s.description}</p>
            <div class="tl-season-temp">${s.temp}</div>
        </div>
    `).join("");
}

/* ============================================================
   7. REVIEWS — accessible carousel
   ============================================================ */
const reviewTrack = document.getElementById("reviewTrack");
const reviewDotsEl = document.getElementById("reviewDots");
let reviewPage = 0;
let reviewsPerView = 3;
let reviewAutoTimer = null;

function getReviewsPerView() {
    const w = window.innerWidth;
    if (w <= 700) return 1;
    if (w <= 1080) return 2;
    return 3;
}

function reviewPageCount() {
    return Math.ceil(REVIEWS.length / reviewsPerView);
}

function renderReviewCards() {
    reviewTrack.innerHTML = REVIEWS.map(r => `
        <article class="tl-review-card" role="group" aria-roledescription="slide">
            <div class="tl-review-top">
                <div class="tl-avatar">${initials(r.name)}</div>
                <div class="tl-review-name">
                    <strong>${r.name}</strong>
                    <small>${r.country}</small>
                </div>
            </div>
            <div class="tl-review-stars">${"★".repeat(r.rating)}${"☆".repeat(5 - r.rating)}</div>
            <div class="tl-review-trek">${r.trek}</div>
            <p class="tl-review-quote">${r.quote}</p>
        </article>
    `).join("");
}

function renderReviewDots() {
    const count = reviewPageCount();
    reviewDotsEl.innerHTML = Array.from({ length: count }, (_, i) => `
        <button class="tl-review-dot" aria-label="Go to review slide ${i + 1}" aria-current="${i === reviewPage}" data-page="${i}"></button>
    `).join("");
}

function goToReviewPage(page, { focusFirst = false } = {}) {
    const count = reviewPageCount();
    reviewPage = (page + count) % count;
    const cardWidth = reviewTrack.children[0]?.getBoundingClientRect().width || 0;
    const gap = 24;
    reviewTrack.scrollTo({ left: reviewPage * reviewsPerView * (cardWidth + gap), behavior: "smooth" });
    [...reviewDotsEl.children].forEach((d, i) => d.setAttribute("aria-current", i === reviewPage));

    if (focusFirst) {
        const firstIndex = reviewPage * reviewsPerView;
        reviewTrack.children[firstIndex]?.setAttribute("tabindex", "-1");
        reviewTrack.children[firstIndex]?.focus();
    }
}

function startReviewAutoplay() {
    stopReviewAutoplay();
    reviewAutoTimer = setInterval(() => goToReviewPage(reviewPage + 1), 6000);
}
function stopReviewAutoplay() {
    if (reviewAutoTimer) clearInterval(reviewAutoTimer);
}

function initReviews() {
    reviewsPerView = getReviewsPerView();
    renderReviewCards();
    renderReviewDots();
    startReviewAutoplay();
}

document.getElementById("reviewPrev").addEventListener("click", () => { goToReviewPage(reviewPage - 1); startReviewAutoplay(); });
document.getElementById("reviewNext").addEventListener("click", () => { goToReviewPage(reviewPage + 1); startReviewAutoplay(); });
reviewDotsEl.addEventListener("click", (e) => {
    const dot = e.target.closest(".tl-review-dot");
    if (!dot) return;
    goToReviewPage(Number(dot.dataset.page), { focusFirst: true });
    startReviewAutoplay();
});

const reviewCarousel = document.querySelector(".tl-review-carousel");
reviewCarousel.addEventListener("mouseenter", stopReviewAutoplay);
reviewCarousel.addEventListener("mouseleave", startReviewAutoplay);
reviewCarousel.addEventListener("focusin", stopReviewAutoplay);
reviewCarousel.addEventListener("focusout", startReviewAutoplay);

let reviewResizeTimer;
window.addEventListener("resize", () => {
    clearTimeout(reviewResizeTimer);
    reviewResizeTimer = setTimeout(() => {
        const nowPerView = getReviewsPerView();
        if (nowPerView !== reviewsPerView) {
            reviewsPerView = nowPerView;
            reviewPage = 0;
            renderReviewDots();
            goToReviewPage(0);
        }
    }, 200);
});

/* ============================================================
   8. UPCOMING DEPARTURES — table + filters
   ============================================================ */
const departuresBody = document.getElementById("departuresBody");
const departuresCards = document.getElementById("departuresCards");
const filterMonthEl = document.getElementById("filterMonth");
const filterRegionEl = document.getElementById("filterRegion");

function fmtDate(iso) {
    return new Date(iso + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function populateDepartureFilters() {
    const months = [...new Set(DEPARTURES.map(d => d.date.slice(0, 7)))];
    months.forEach(m => {
        const label = new Date(m + "-01T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" });
        filterMonthEl.insertAdjacentHTML("beforeend", `<option value="${m}">${label}</option>`);
    });
    REGIONS.forEach(r => {
        filterRegionEl.insertAdjacentHTML("beforeend", `<option value="${r.id}">${r.name}</option>`);
    });
}

function renderDepartures() {
    const month = filterMonthEl.value;
    const region = filterRegionEl.value;
    const filtered = DEPARTURES.filter(d =>
        (month === "all" || d.date.slice(0, 7) === month) &&
        (region === "all" || d.region === region)
    );

    departuresBody.innerHTML = filtered.map(d => `
        <tr>
            <td>${d.trek}</td>
            <td>${fmtDate(d.date)}</td>
            <td>${d.duration} Days</td>
            <td class="tl-seats ${d.seatsLeft <= 5 ? "tl-urgent" : ""}">${d.seatsLeft} of ${d.seatsTotal}</td>
            <td>${money(d.price)}</td>
            <td><a href="contact-us.html" class="btn btn-pine btn-sm">Join Group</a></td>
        </tr>
    `).join("") || `<tr><td colspan="6" style="text-align:center; color:var(--muted); padding:24px;">No departures match those filters.</td></tr>`;

    departuresCards.innerHTML = filtered.map(d => `
        <div class="tl-departure-card">
            <h4>${d.trek}</h4>
            <div class="tl-departure-row"><span>Date</span><strong>${fmtDate(d.date)}</strong></div>
            <div class="tl-departure-row"><span>Duration</span><strong>${d.duration} Days</strong></div>
            <div class="tl-departure-row"><span>Seats Left</span><strong class="${d.seatsLeft <= 5 ? "tl-urgent" : ""}">${d.seatsLeft} of ${d.seatsTotal}</strong></div>
            <div class="tl-departure-row"><span>Price</span><strong>${money(d.price)}</strong></div>
            <a href="contact-us.html" class="btn btn-pine btn-sm" style="margin-top:8px; text-align:center;">Join Group</a>
        </div>
    `).join("") || `<p style="text-align:center; color:var(--muted);">No departures match those filters.</p>`;
}

filterMonthEl.addEventListener("change", renderDepartures);
filterRegionEl.addEventListener("change", renderDepartures);

/* ============================================================
   Scroll-reveal — same IntersectionObserver pattern as about-us.js
   ============================================================ */
function initReveal() {
    if (!("IntersectionObserver" in window)) {
        document.querySelectorAll(".tl-reveal").forEach(el => el.classList.add("in"));
        return;
    }
    const tlObserver = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                tlObserver.unobserve(e.target);
            }
        }),
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".tl-reveal").forEach(el => tlObserver.observe(el));
}

/* ---------------- footer year ---------------- */
const footerYearEl = document.getElementById("footerYear");
if (footerYearEl) footerYearEl.textContent = new Date().getFullYear();

/* ---------------- init ---------------- */
(function init() {
    const initialRegion = new URL(window.location).searchParams.get("region") || "all";
    buildRegionTabs();
    setActiveRegion(initialRegion, { pushState: false });

    renderBestSellers();
    renderTripOfMonth();
    renderSeasons();
    initReviews();

    populateDepartureFilters();
    renderDepartures();

    initReveal();
})();
