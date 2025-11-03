// Content Loader for TechZone Website
// This file loads content from site-content.json and updates the website dynamically

let siteContent = null;

// Load content from JSON file
async function loadSiteContent() {
    try {
        const response = await fetch('site-content.json');
        siteContent = await response.json();
        updateWebsite();
    } catch (error) {
        console.error('Error loading site content:', error);
        // Fallback to default content if JSON fails to load
    }
}

// Update all website content
function updateWebsite() {
    if (!siteContent) return;

    updateGeneral();
    updateAbout();
    updateEvents();
    updateProjects();
    updateTeam();
    updateAwards();
    updateSponsors();
    updateContact();
    updateFooter();
    updateTheme();
}

// Update general settings
function updateGeneral() {
    const { general } = siteContent;
    
    // Update page title
    document.title = `${general.clubName} - ${general.universityName}`;
    
    // Update logo
    const logos = document.querySelectorAll('.logo img');
    logos.forEach(logo => {
        if (general.logoPath) logo.src = general.logoPath;
    });
    
    // Update hero section
    const heroTitle = document.querySelector('.hero h1');
    if (heroTitle) heroTitle.textContent = `Welcome to ${general.clubName}`;
    
    // Update motto in hero section
    const heroSubtitle = document.querySelector('.hero p');
    if (heroSubtitle && general.clubMotto) {
        heroSubtitle.textContent = general.clubMotto;
    }
    
    // Update join links
    const joinLinks = document.querySelectorAll('a[href*="forms.gle"], .btn-secondary');
    joinLinks.forEach(link => {
        if (general.joinFormLink && link.href.includes('forms.gle')) {
            link.href = general.joinFormLink;
        }
    });
}

// Update about section
function updateAbout() {
    const { about } = siteContent;
    
    const aboutSection = document.querySelector('#about .about-text');
    if (aboutSection) {
        const paragraphs = aboutSection.querySelectorAll('p');
        if (paragraphs.length >= 3) {
            paragraphs[0].textContent = about.paragraph1;
            paragraphs[1].textContent = about.paragraph2;
            paragraphs[2].textContent = about.paragraph3;
        }
    }
    
    // Update handbook link
    const handbookLink = document.querySelector('a[href*="drive.google.com"]');
    if (handbookLink && about.handbookLink) {
        handbookLink.href = about.handbookLink;
    }
}

// Update events section
function updateEvents() {
    const { events } = siteContent;
    const eventsContainer = document.querySelector('.events-grid');
    
    if (!eventsContainer || !events.length) return;
    
    eventsContainer.innerHTML = '';
    
    events.forEach(event => {
        const eventCard = document.createElement('div');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-image">
                <img src="${event.image || 'images/event-default.jpg'}" alt="${event.title}">
            </div>
            <div class="event-content">
                <h3>${event.title}</h3>
                <div class="event-meta">
                    <div class="event-date">
                        <i class="far fa-calendar-alt"></i>
                        <span>${event.date}</span>
                    </div>
                    <div class="event-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${event.location}</span>
                    </div>
                </div>
                <p>${event.description}</p>
                <a href="#" class="btn btn-primary">Learn More</a>
            </div>
        `;
        eventsContainer.appendChild(eventCard);
    });
}

// Update projects section
function updateProjects() {
    const { projects } = siteContent;
    const projectsContainer = document.querySelector('.projects-grid');
    
    if (!projectsContainer || !projects.length) return;
    
    projectsContainer.innerHTML = '';
    
    projects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = 'project-card';
        
        // Create tech icons
        const techIcons = project.technologies ? project.technologies.map(tech => {
            let iconClass = '';
            const techLower = tech.toLowerCase();
            
            if (techLower.includes('javascript') || techLower.includes('js')) iconClass = 'fab fa-js';
            else if (techLower.includes('node')) iconClass = 'fab fa-node-js';
            else if (techLower.includes('python')) iconClass = 'fab fa-python';
            else if (techLower.includes('react')) iconClass = 'fab fa-react';
            else if (techLower.includes('database') || techLower.includes('mysql')) iconClass = 'fas fa-database';
            else if (techLower.includes('mobile')) iconClass = 'fas fa-mobile-alt';
            else if (techLower.includes('arduino')) iconClass = 'fas fa-microchip';
            else iconClass = 'fas fa-code';
            
            return `<div class="tech-icon"><i class="${iconClass}"></i></div>`;
        }).join('') : '';
        
        projectCard.innerHTML = `
            <div class="project-image">
                <img src="${project.image || 'images/project-default.jpg'}" alt="${project.title}">
                <div class="project-tech">
                    ${techIcons}
                </div>
            </div>
            <div class="project-content">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-members">
                    ${project.teamMembers ? project.teamMembers.slice(0, 3).map(() => 
                        `<div class="member"><img src="images/image1.jpg" alt="Team Member"></div>`
                    ).join('') : ''}
                    ${project.teamMembers && project.teamMembers.length > 3 ? 
                        `<div class="member"><span>+${project.teamMembers.length - 3}</span></div>` : ''
                    }
                </div>
                <div class="project-actions">
                    ${project.liveLink ? `<a href="${project.liveLink}" class="btn btn-primary" target="_blank">View Demo</a>` : ''}
                    ${project.codeLink ? `<a href="${project.codeLink}" class="btn btn-outline" target="_blank">Source Code</a>` : ''}
                </div>
            </div>
        `;
        projectsContainer.appendChild(projectCard);
    });
}

// Update team section
function updateTeam() {
    const { team } = siteContent;
    const teamContainer = document.querySelector('.team-grid');
    
    if (!teamContainer || !team.length) return;
    
    teamContainer.innerHTML = '';
    
    team.forEach(member => {
        const memberCard = document.createElement('div');
        memberCard.className = 'team-member';
        memberCard.innerHTML = `
            <div class="member-image">
                <img src="${member.image || 'images/team-default.jpg'}" alt="${member.name}">
            </div>
            <div class="member-info">
                <h3>${member.name}</h3>
                <div class="member-role">${member.role}</div>
                <div class="member-social">
                    ${member.twitter ? `<a href="${member.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>` : ''}
                    ${member.github ? `<a href="${member.github}" target="_blank"><i class="fab fa-github"></i></a>` : ''}
                    ${member.linkedin ? `<a href="${member.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>` : ''}
                    ${!member.twitter && !member.github && !member.linkedin ? 
                        `<a href="#"><i class="fas fa-envelope"></i></a>` : ''}
                </div>
            </div>
        `;
        teamContainer.appendChild(memberCard);
    });
}

// Update awards section
function updateAwards() {
    const { awards } = siteContent;
    const awardsContainer = document.querySelector('.awards-grid');
    
    if (!awardsContainer || !awards.length) return;
    
    awardsContainer.innerHTML = '';
    
    awards.forEach(award => {
        const awardCard = document.createElement('div');
        awardCard.className = 'award-card';
        awardCard.innerHTML = `
            <div class="award-image">
                <img src="${award.image || 'images/award-default.jpg'}" alt="${award.title}">
            </div>
            <div class="award-content">
                <h3>${award.title}</h3>
                <div class="award-meta">
                    <div class="award-date">
                        <i class="far fa-calendar-alt"></i>
                        <span>${award.date}</span>
                    </div>
                    <div class="award-category">
                        <i class="fas fa-trophy"></i>
                        <span>${award.category}</span>
                    </div>
                </div>
                <p>${award.description}</p>
            </div>
        `;
        awardsContainer.appendChild(awardCard);
    });
}

// Update sponsors section
function updateSponsors() {
    const { sponsors } = siteContent;
    const sponsorsContainer = document.querySelector('.sponsors-grid');
    
    if (!sponsorsContainer || !sponsors.length) return;
    
    sponsorsContainer.innerHTML = '';
    
    sponsors.forEach(sponsor => {
        const sponsorLogo = document.createElement('div');
        sponsorLogo.className = 'sponsor-logo';
        sponsorLogo.innerHTML = `<img src="${sponsor.logo || 'images/sponsor-default.png'}" alt="${sponsor.name}">`;
        sponsorsContainer.appendChild(sponsorLogo);
    });
}

// Update contact section
function updateContact() {
    const { general, socialMedia } = siteContent;
    
    if (!general) return;
    
    // Update contact cards
    const contactCards = document.querySelectorAll('.contact-card');
    contactCards.forEach(card => {
        const heading = card.querySelector('h3');
        if (heading) {
            if (heading.textContent.includes('Location') && general.location) {
                card.querySelectorAll('p')[1].textContent = general.location;
            }
            if (heading.textContent.includes('Email') && general.contactEmail) {
                card.querySelectorAll('p')[0].textContent = general.contactEmail;
            }
            if (heading.textContent.includes('Call') && general.contactPhone) {
                card.querySelectorAll('p')[0].textContent = general.contactPhone;
            }
            if (heading.textContent.includes('Meeting') && general.meetingTime) {
                card.querySelectorAll('p')[0].textContent = general.meetingTime;
            }
        }
    });
}

// Update footer
function updateFooter() {
    const { general, socialMedia } = siteContent;
    
    if (!general) return;
    
    // Update footer contact info
    const footerContact = document.querySelector('.footer-col:last-child .footer-links');
    if (footerContact) {
        const items = footerContact.querySelectorAll('li');
        items.forEach(item => {
            if (item.textContent.includes('@') && general.contactEmail) {
                item.innerHTML = `<i class="fas fa-envelope"></i> ${general.contactEmail}`;
            }
            if (item.textContent.includes('+263') && general.contactPhone) {
                item.innerHTML = `<i class="fas fa-phone-alt"></i> ${general.contactPhone}`;
            }
            if (item.textContent.includes('Wednesdays') && general.meetingTime) {
                item.innerHTML = `<i class="fas fa-clock"></i> ${general.meetingTime}`;
            }
            if (item.textContent.includes('MSUAS Campus') && general.location) {
                item.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${general.location}`;
            }
        });
    }
    
    // Update social media links
    const footerSocial = document.querySelector('.footer-social');
    if (footerSocial && socialMedia) {
        footerSocial.innerHTML = '';
        
        if (socialMedia.facebook && socialMedia.facebook !== '#') {
            footerSocial.innerHTML += `<a href="${socialMedia.facebook}" target="_blank"><i class="fab fa-facebook-f"></i></a>`;
        }
        if (socialMedia.twitter && socialMedia.twitter !== '#') {
            footerSocial.innerHTML += `<a href="${socialMedia.twitter}" target="_blank"><i class="fab fa-twitter"></i></a>`;
        }
        if (socialMedia.instagram && socialMedia.instagram !== '#') {
            footerSocial.innerHTML += `<a href="${socialMedia.instagram}" target="_blank"><i class="fab fa-instagram"></i></a>`;
        }
        if (socialMedia.linkedin && socialMedia.linkedin !== '#') {
            footerSocial.innerHTML += `<a href="${socialMedia.linkedin}" target="_blank"><i class="fab fa-linkedin-in"></i></a>`;
        }
        if (socialMedia.github && socialMedia.github !== '#') {
            footerSocial.innerHTML += `<a href="${socialMedia.github}" target="_blank"><i class="fab fa-github"></i></a>`;
        }
    }
}

// Update theme colors
function updateTheme() {
    const { theme } = siteContent;
    
    if (!theme) return;
    
    // Create or update CSS variables
    const root = document.documentElement;
    root.style.setProperty('--msuas-primary', theme.primary);
    root.style.setProperty('--msuas-secondary', theme.secondary);
    root.style.setProperty('--msuas-accent', theme.accent);
    root.style.setProperty('--msuas-light', theme.lightBg);
    
    // Also update any inline styles or specific elements that use theme colors
    const style = document.createElement('style');
    style.textContent = `
        .btn-primary { background-color: ${theme.secondary}; }
        .btn-primary:hover { background-color: ${adjustColor(theme.secondary, -20)}; }
        .btn-secondary { background-color: ${theme.primary}; }
        .btn-secondary:hover { background-color: ${adjustColor(theme.primary, -20)}; }
        .btn-outline { border-color: ${theme.primary}; color: ${theme.primary}; }
        .btn-outline:hover { background-color: ${theme.primary}; color: white; }
        
        .section-title h2::after { background-color: ${theme.secondary}; }
        .nav-menu a:hover { color: ${theme.secondary}; }
        .nav-menu a::after { background: linear-gradient(90deg, ${theme.primary}, ${theme.secondary}); }
        .event-date i, .event-location i, .award-date i, .award-category i { color: ${theme.secondary}; }
    `;
    
    // Remove existing theme style if it exists
    const existingStyle = document.getElementById('dynamic-theme');
    if (existingStyle) {
        existingStyle.remove();
    }
    style.id = 'dynamic-theme';
    document.head.appendChild(style);
}

// Helper function to adjust color brightness
function adjustColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => 
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2)
    );
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadSiteContent);
} else {
    loadSiteContent();
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { loadSiteContent, siteContent };
}