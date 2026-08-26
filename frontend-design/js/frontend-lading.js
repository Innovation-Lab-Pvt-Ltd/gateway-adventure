// treks-landing.js

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initHeaderScroll();
    initRegionFilter();
    initBestSellers();
    initReviewsSlider();
    initDeparturesFilter();
    initScrollAnimations();
});

// Header scroll behavior
function initHeaderScroll() {
    const header = document.getElementById('siteHeader');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
}

// Region filter functionality
function initRegionFilter() {
    const filterButtons = document.querySelectorAll('.region-filter');
    const regionsGrid = document.getElementById('regionsGrid');
    
    // Get initial region from URL
    const urlParams = new URLSearchParams(window.location.search);
    const initialRegion = urlParams.get('region') || 'all';
    
    // Set initial active state
    filterButtons.forEach(btn => {
        if (btn.dataset.region === initialRegion) {
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
        } else {
            btn.classList.remove('active');
            btn.setAttribute('aria-selected', 'false');
        }
    });
    
    // Render initial regions
    renderRegions(initialRegion);
    
    // Add click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const region = btn.dataset.region;
            
            // Update active state
            filterButtons.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');
            
            // Update URL
            const newUrl = region === 'all' 
                ? window.location.pathname 
                : `${window.location.pathname}?region=${region}`;
            window.history.pushState({}, '', newUrl);
            
            // Render filtered regions
            renderRegions(region);
        });
    });
    
    function renderRegions(region) {
        const regions = region === 'all' 
            ? treksData.regions 
            : treksData.regions.filter(r => r.id === region);
        
        // Fade out existing cards
        const existingCards = regionsGrid.querySelectorAll('.region-card');
        existingCards.forEach(card => card.classList.add('fade-out'));
        
        setTimeout(() => {
            regionsGrid.innerHTML = regions.map(region => `
                <div class="region-card fade-in">
                    <div class="region-card-image">
                        <img src="${region.image}" alt="${region.name}" loading="lazy">
                        <div class="region-card-overlay">
                            <span class="region-card-count">${region.trekCount} treks available</span>
                        </div>
                    </div>
                    <div class="region-card-content">
                        <h3 class="region-card-title">${region.name}</h3>
                        <p class="region-card-desc">${region.description}</p>
                        <a href="#" class="region-card-link">
                            View Treks
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M7 7l5 5-5 5"/>
                            </svg>
                        </a>
                    </div>
                </div>
            `).join('');
            
            // Trigger fade in
            setTimeout(() => {
                const newCards = regionsGrid.querySelectorAll('.region-card');
                newCards.forEach(card => card.classList.remove('fade-out'));
            }, 50);
        }, 300);
    }
}

// Best sellers grid
function initBestSellers() {
    const grid = document.getElementById('bestSellersGrid');
    
    grid.innerHTML = treksData.bestSellers.map(trek => `
        <div class="trek-card">
            <div class="trek-card-image">
                <img src="${trek.image}" alt="${trek.title}" loading="lazy">
                <div class="trek-card-badges">
                    <span class="trek-badge">${trek.duration}</span>
                    <span class="trek-badge difficulty">${trek.difficulty}</span>
                </div>
                ${trek.bestSeller ? '<div class="best-seller-ribbon">Best Seller</div>' : ''}
            </div>
            <div class="trek-card-content">
                <h3 class="trek-card-title">${trek.title}</h3>
                <div class="trek-card-rating">
                    <span class="stars">${'★'.repeat(trek.rating)}${'☆'.repeat(5 - trek.rating)}</span>
                    <span class="review-count">(${trek.reviews} reviews)</span>
                </div>
                <div class="trek-card-price">
                    <span class="price-from">From</span>
                    <span class="price-amount">$${trek.price}</span>
                    <span class="price-per">per person</span>
                </div>
            </div>
        </div>
    `).join('');
}

// Reviews slider
function initReviewsSlider() {
    const track = document.getElementById('reviewsTrack');
    const dotsContainer = document.getElementById('sliderDots');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    
    let currentIndex = 0;
    let slidesToShow = 3;
    let autoSlideInterval;
    
    // Render reviews
    track.innerHTML = treksData.reviews.map(review => `
        <div class="review-card">
            <div class="review-header">
                <div class="review-avatar">${review.avatar}</div>
                <div class="review-info">
                    <div class="review-name">${review.name}</div>
                    <div class="review-country">${review.country}</div>
                </div>
            </div>
            <div class="review-rating">${'★'.repeat(review.rating)}</div>
            <div class="review-trek">${review.trek}</div>
            <p class="review-text">${review.text}</p>
        </div>
    `).join('');
    
    function updateSlidesToShow() {
        if (window.innerWidth <= 700) {
            slidesToShow = 1;
        } else if (window.innerWidth <= 960) {
            slidesToShow = 2;
        } else {
            slidesToShow = 3;
        }
    }
    
    function createDots() {
        const totalDots = Math.ceil(treksData.reviews.length / slidesToShow);
        dotsContainer.innerHTML = '';
        
        for (let i = 0; i < totalDots; i++) {
            const dot = document.createElement('div');
            dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }
    
    function goToSlide(index) {
        const totalSlides = Math.ceil(treksData.reviews.length / slidesToShow);
        currentIndex = index % totalSlides;
        
        const slideWidth = 100 / slidesToShow;
        const offset = currentIndex * slidesToShow * slideWidth;
        track.style.transform = `translateX(-${offset}%)`;
        
        // Update dots
        const dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentIndex);
        });
    }
    
    function nextSlide() {
        const totalSlides = Math.ceil(treksData.reviews.length / slidesToShow);
        goToSlide((currentIndex + 1) % totalSlides);
    }
    
    function prevSlide() {
        const totalSlides = Math.ceil(treksData.reviews.length / slidesToShow);
        goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
    }
    
    function startAutoSlide() {
        autoSlideInterval = setInterval(nextSlide, 6000);
    }
    
    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }
    
    // Event listeners
    nextBtn.addEventListener('click', () => {
        nextSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    prevBtn.addEventListener('click', () => {
        prevSlide();
        stopAutoSlide();
        startAutoSlide();
    });
    
    // Pause on hover
    const slider = document.getElementById('reviewsSlider');
    slider.addEventListener('mouseenter', stopAutoSlide);
    slider.addEventListener('mouseleave', startAutoSlide);
    
    // Handle resize
    window.addEventListener('resize', () => {
        updateSlidesToShow();
        createDots();
        goToSlide(0);
    });
    
    // Initialize
    updateSlidesToShow();
    createDots();
    startAutoSlide();
}

// Departures filter
function initDeparturesFilter() {
    const monthFilter = document.getElementById('monthFilter');
    const departuresList = document.getElementById('departuresList');
    
    function renderDepartures(month = 'all') {
        let departures = treksData.departures;
        
        if (month !== 'all') {
            departures = departures.filter(d => d.date.startsWith(month));
        }
        
        departuresList.innerHTML = departures.map(dep => {
            const date = new Date(dep.date);
            const formattedDate = date.toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
            });
            
            return `
                <div class="departure-card">
                    <div class="departure-info">
                        <h3>${dep.trek}</h3>
                        <div class="departure-date">${formattedDate}</div>
                    </div>
                    <div class="departure-duration">
                        <div class="departure-label">Duration</div>
                        <div class="departure-value">${dep.duration}</div>
                    </div>
                    <div class="departure-seats">
                        <div class="departure-label">Seats Left</div>
                        <div class="departure-value">${dep.seatsAvailable} of ${dep.totalSeats}</div>
                    </div>
                    <div class="departure-price">
                        <div class="departure-label">Price</div>
                        <div class="departure-value">$${dep.price}</div>
                    </div>
                    <a href="#contact" class="btn btn-primary">Join This Group</a>
                </div>
            `;
        }).join('');
        
        if (departures.length === 0) {
            departuresList.innerHTML = '<p style="text-align: center; padding: var(--spacing-xl);">No departures available for the selected month.</p>';
        }
    }
    
    monthFilter.addEventListener('change', (e) => {
        renderDepartures(e.target.value);
    });
    
    // Initial render
    renderDepartures();
}

// Scroll animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);
    
    // Observe sections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.classList.add('fade-in');
        observer.observe(section);
    });
}

// Mobile navigation toggle
const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

if (navToggle) {
    navToggle.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });
}