/* About Us Page JavaScript */

// 1. Dynamic Year in Footer
const yearSpan = document.getElementById('currentYear');
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// 2. Team Members Data (with fixed emojis and added email)
const teamMembers = {
    1: {
        name: "Pasang Sherpa",
        role: "Founder & Lead Guide",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop",
        email: "pasang@gatewaytreks.com",
        linkedin: "#",
        bio: "With over 20 years of guiding experience in the Himalayas, Pasang founded Gateway Treks with a vision to provide authentic, safe, and sustainable trekking experiences. Born in Namche Bazaar, he grew up surrounded by the Everest peaks and has summited Everest twice. Fluent in Nepali, English, Tibetan, Hindi, and German, Pasang brings cultural depth and mountaineering expertise to every expedition.",
        details: [
            { icon: "🏔️", label: "Specialization", value: "Everest & Manaslu Regions" },
            { icon: "📜", label: "Certification", value: "UIAGM Certified Mountain Guide" },
            { icon: "🗣️", label: "Languages", value: "Nepali, English, Tibetan, Hindi, German" },
            { icon: "⭐", label: "Experience", value: "20+ Years, 500+ Treks Led" }
        ]
    },
    2: {
        name: "Dawa Lama",
        role: "Operations Manager",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=800&h=600&fit=crop",
        email: "dawa@gatewaytreks.com",
        linkedin: "#",
        bio: "Dawa ensures every logistical detail is flawlessly executed. With a background in hospitality management and 12 years in trekking operations, he coordinates everything from permits to teahouse bookings. His meticulous planning and problem-solving skills have earned him the trust of thousands of trekkers.",
        details: [
            { icon: "📋", label: "Specialization", value: "Logistics & Safety Management" },
            { icon: "🎓", label: "Education", value: "BBA in Hospitality Management" },
            { icon: "🏥", label: "Training", value: "Wilderness First Responder" },
            { icon: "✅", label: "Track Record", value: "100% Safety Record" }
        ]
    },
    3: {
        name: "Nima Tamang",
        role: "Senior Guide",
        image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=800&h=600&fit=crop",
        email: "nima@gatewaytreks.com",
        linkedin: "#",
        bio: "Nima's expertise lies in the Annapurna and Langtang regions. A nature enthusiast and photography lover, he has an encyclopedic knowledge of local flora, fauna, and cultural heritage sites. His warm personality and attention to detail make him a favorite among solo travelers and families alike.",
        details: [
            { icon: "🏔️", label: "Specialization", value: "Annapurna & Langtang Regions" },
            { icon: "🏥", label: "Certification", value: "Wilderness First Responder" },
            { icon: "📸", label: "Interest", value: "Nature Photography & Botany" },
            { icon: "⭐", label: "Experience", value: "15 Years, 400+ Treks" }
        ]
    },
    4: {
        name: "Mingmar Sherpa",
        role: "Mountain Guide",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=800&h=600&fit=crop",
        email: "mingmar@gatewaytreks.com",
        linkedin: "#",
        bio: "Mingmar specializes in high-altitude expeditions and challenging treks. Having summited multiple 8000m peaks, he brings technical expertise and calm leadership to demanding situations. His knowledge of altitude acclimatization and risk management is unmatched.",
        details: [
            { icon: "🏔️", label: "Specialization", value: "High Altitude & Expeditions" },
            { icon: "🏆", label: "Achievement", value: "3x Everest Summit, 5x 8000m Peaks" },
            { icon: "🎓", label: "Certification", value: "IFMGA Mountain Guide" },
            { icon: "⛏️", label: "Skills", value: "Ice Climbing, Avalanche Safety" }
        ]
    },
    5: {
        name: "Sunita Gurung",
        role: "Customer Relations",
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&h=600&fit=crop",
        email: "sunita@gatewaytreks.com",
        linkedin: "#",
        bio: "Sunita is your first point of contact and the heart of our customer service. With exceptional communication skills and deep product knowledge, she helps craft personalized itineraries that match your dreams and abilities. Her follow-up care ensures you feel supported from inquiry to return.",
        details: [
            { icon: "💬", label: "Role", value: "Trip Planning & Communication" },
            { icon: "🗣️", label: "Languages", value: "Nepali, English, Japanese" },
            { icon: "💼", label: "Experience", value: "8 Years in Tourism" },
            { icon: "✨", label: "Specialty", value: "Personalized Itinerary Design" }
        ]
    },
    6: {
        name: "Raj Kumar",
        role: "Logistics Coordinator",
        image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=600&fit=crop",
        email: "raj@gatewaytreks.com",
        linkedin: "#",
        bio: "Raj manages the complex web of permits, domestic flights, and ground transportation that makes every trek possible. His relationships with local suppliers and airlines ensure smooth operations even during peak season challenges. He's the unsung hero behind every successful departure.",
        details: [
            { icon: "✈️", label: "Responsibility", value: "Flights & Permits Coordination" },
            { icon: "🚚", label: "Management", value: "Ground Transportation" },
            { icon: "🤝", label: "Network", value: "50+ Local Partners" },
            { icon: "⚡", label: "Efficiency", value: "99.8% On-Time Performance" }
        ]
    }
};

// 3. Dynamically Generate Team Cards
const teamGrid = document.getElementById('teamGrid');
if (teamGrid) {
    Object.keys(teamMembers).forEach(key => {
        const member = teamMembers[key];
        const card = document.createElement('div');
        card.className = 'team-card reveal';
        card.setAttribute('data-member', key);
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.innerHTML = `
            <div class="team-media">
                <img src="${member.image}" alt="${member.name}" loading="lazy">
                <div class="team-overlay">
                    <div class="team-social">
                        <a href="${member.linkedin}" aria-label="LinkedIn ${member.name}" onclick="event.stopPropagation()">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                        </a>
                        <a href="mailto:${member.email}" aria-label="Email ${member.name}" onclick="event.stopPropagation()">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                        </a>
                    </div>
                </div>
            </div>
            <div class="team-body">
                <h3>${member.name}</h3>
                <p class="team-role">${member.role}</p>
                <p class="team-bio">${member.bio.substring(0, 80)}...</p>
                <button class="team-btn" type="button">Learn More</button>
            </div>
        `;
        teamGrid.appendChild(card);
    });
}

// 4. Team Modal Functionality
const teamModal = $('#teamModal');
const teamModalClose = $('#teamModalClose');
const teamModalContent = $('#teamModalContent');

// Open team modal
document.addEventListener('click', (e) => {
    const card = e.target.closest('.team-card');
    if (!card) return;
    
    // Prevent opening if clicking the social links or button directly (handled by their own logic/stopPropagation)
    if (e.target.closest('.team-social a') || e.target.closest('.team-btn')) return;

    const memberId = card.dataset.member;
    const member = teamMembers[memberId];
    
    if (!member) return;
    
    // Build modal content
    let detailsHtml = '';
    member.details.forEach(detail => {
        detailsHtml += `
            <div class="team-detail-item">
                <div class="team-detail-icon">${detail.icon}</div>
                <div class="team-detail-text">
                    <strong>${detail.label}</strong>
                    <small>${detail.value}</small>
                </div>
            </div>
        `;
    });
    
    teamModalContent.innerHTML = `
        <div class="team-modal-header">
            <img src="${member.image}" alt="${member.name}">
        </div>
        <div class="team-modal-body">
            <h3>${member.name}</h3>
            <p class="team-modal-role">${member.role}</p>
            <p class="team-modal-bio">${member.bio}</p>
            <div class="team-modal-details">
                ${detailsHtml}
            </div>
        </div>
    `;
    
    teamModal.style.display = 'flex';
    document.body.classList.add('no-scroll');
});

// Close team modal
if (teamModalClose) {
    teamModalClose.addEventListener('click', closeTeamModal);
}

function closeTeamModal() {
    teamModal.style.display = 'none';
    document.body.classList.remove('no-scroll');
}

// Close modal on overlay click
teamModal.addEventListener('click', (e) => {
    if (e.target === teamModal) {
        closeTeamModal();
    }
});

// 5. Accessibility: Keyboard support for cards
document.addEventListener('keydown', (e) => {
    if ((e.target.classList.contains('team-card') || e.target.classList.contains('info-card')) && (e.key === 'Enter' || e.key === ' ')) {
        e.preventDefault();
        e.target.click();
    }
});

// Info cards click handlers
$$('.info-card').forEach(card => {
    if (!card.classList.contains('info-card-cta')) {
        card.addEventListener('click', () => {
            const cardType = card.dataset.card;
            showToast(`Opening ${cardType} information...`);
        });
    }
});

// Smooth scroll for team link
const teamLink = $('[href="#team"]');
if (teamLink) {
    teamLink.addEventListener('click', (e) => {
        e.preventDefault();
        const teamSection = $('#team');
        if (teamSection) {
            teamSection.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// 6. Animated Stat Counters via IntersectionObserver
const statCards = document.querySelectorAll('.stat-card');
const statObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const card = entry.target;
            const target = parseFloat(card.dataset.target);
            const suffix = card.dataset.suffix || '';
            const numberEl = card.querySelector('.stat-number');
            
            const duration = 1500; // 1.5 seconds
            const startTime = performance.now();

            const animate = (currentTime) => {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Ease-out quad function
                const easeProgress = 1 - (1 - progress) * (1 - progress);
                const current = target * easeProgress;

                if (Number.isInteger(target)) {
                    numberEl.textContent = Math.floor(current) + suffix;
                } else {
                    numberEl.textContent = current.toFixed(1) + suffix;
                }

                if (progress < 1) {
                    requestAnimationFrame(animate);
                } else {
                    // Ensure exact final value
                    numberEl.textContent = (Number.isInteger(target) ? Math.floor(target) : target.toFixed(1)) + suffix;
                }
            };
            
            requestAnimationFrame(animate);
            statObserver.unobserve(card); // Only animate once
        }
    });
}, { threshold: 0.5 });

statCards.forEach(card => statObserver.observe(card));

// 7. Reveal animations for about page (Reusing existing pattern)
if ("IntersectionObserver" in window) {
    const aboutObserver = new IntersectionObserver(
        (entries) => entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("in");
                aboutObserver.unobserve(e.target);
            }
        }),
        { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    
    $$('.stat-card, .info-card, .team-card, .value-card').forEach(el => {
        aboutObserver.observe(el);
    });
}