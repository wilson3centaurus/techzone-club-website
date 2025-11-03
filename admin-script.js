// Admin Dashboard Script for TechZone Club
// This manages the admin panel and generates the site-content.json file

// Default credentials
const ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'techzone2025'
};

// Initialize with default data structure
let siteData = {
    general: {
        clubName: 'TechZone Club',
        universityName: 'MSUAS',
        clubMotto: '🎉 Where Algorithms Dance and Gadgets Throw a Party! 🤖',
        joinFormLink: 'https://forms.gle/HP96YjrMbTAWDTiV8',
        contactEmail: 'techzone@msuas.ac.zw',
        contactPhone: '+263 77 123 4567',
        meetingTime: 'Wednesdays 2:00 PM - 4:00 PM',
        location: 'MSUAS Campus, Mutare',
        logoPath: 'images/msuas.png'
    },
    about: {
        paragraph1: 'At TechZone Club, we are dedicated to fostering a passionate community of technology enthusiasts, innovators, and learners.',
        paragraph2: 'With scores of students joining MSUAS every year, TechZone Club aims to organize events that encourage students to connect and socialize.',
        paragraph3: 'In addition to our weekly meetups, we organize a variety of events throughout the semester.',
        handbookLink: 'https://drive.google.com/file/d/10q5kd1RJstqfrk_HNbf3q0yScRzaGrOE/view?usp=sharing'
    },
    events: [],
    projects: [],
    team: [],
    awards: [],
    sponsors: [],
    gallery: [],
    socialMedia: {
        facebook: '#',
        twitter: '#',
        instagram: '#',
        youtube: '#',
        whatsapp: '#',
        github: '#',
        linkedin: '#'
    },
    theme: {
        primary: '#470404',
        secondary: '#e53e3e',
        accent: '#2d3748',
        lightBg: '#fff0f0'
    }
};

// Load data from localStorage
const savedData = localStorage.getItem('techzoneAdminData');
if (savedData) {
    siteData = JSON.parse(savedData);
}

// Login functionality
document.getElementById('loginForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
        document.getElementById('loginScreen').style.display = 'none';
        document.getElementById('dashboard').classList.add('active');
        loadDashboard();
    } else {
        document.getElementById('loginError').style.display = 'block';
    }
});

// Logout functionality
document.getElementById('logoutBtn').addEventListener('click', () => {
    document.getElementById('dashboard').classList.remove('active');
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('loginForm').reset();
});

// Sidebar navigation
document.querySelectorAll('.menu-item').forEach(item => {
    item.addEventListener('click', () => {
        const section = item.dataset.section;
        
        document.querySelectorAll('.menu-item').forEach(m => m.classList.remove('active'));
        item.classList.add('active');
        
        document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
        document.getElementById(section + 'Section').classList.add('active');
        
        const titles = {
            overview: 'Dashboard Overview',
            general: 'General Settings',
            about: 'About Section',
            events: 'Manage Events',
            projects: 'Manage Projects',
            team: 'Team Members',
            awards: 'Awards & Achievements',
            sponsors: 'Partners & Sponsors',
            social: 'Social Media Links',
            theme: 'Theme Colors'
        };
        
        document.getElementById('pageTitle').textContent = titles[section];
    });
});

// Load dashboard data
function loadDashboard() {
    // Update stats
    document.getElementById('totalEvents').textContent = siteData.events.length;
    document.getElementById('totalProjects').textContent = siteData.projects.length;
    document.getElementById('totalTeam').textContent = siteData.team.length;
    document.getElementById('totalAwards').textContent = siteData.awards.length;

    // Load general settings
    document.getElementById('clubName').value = siteData.general.clubName;
    document.getElementById('universityName').value = siteData.general.universityName;
    document.getElementById('clubMotto').value = siteData.general.clubMotto;
    document.getElementById('joinFormLink').value = siteData.general.joinFormLink;
    document.getElementById('contactEmail').value = siteData.general.contactEmail;
    document.getElementById('contactPhone').value = siteData.general.contactPhone;
    document.getElementById('meetingTime').value = siteData.general.meetingTime;
    document.getElementById('location').value = siteData.general.location;
    document.getElementById('logoPath').value = siteData.general.logoPath;

    // Load about section
    document.getElementById('aboutPara1').value = siteData.about.paragraph1;
    document.getElementById('aboutPara2').value = siteData.about.paragraph2;
    document.getElementById('aboutPara3').value = siteData.about.paragraph3;
    document.getElementById('handbookLink').value = siteData.about.handbookLink;

    // Load social media
    document.getElementById('facebook').value = siteData.socialMedia.facebook;
    document.getElementById('twitter').value = siteData.socialMedia.twitter;
    document.getElementById('instagram').value = siteData.socialMedia.instagram;
    document.getElementById('youtube').value = siteData.socialMedia.youtube;
    document.getElementById('whatsapp').value = siteData.socialMedia.whatsapp;
    document.getElementById('github').value = siteData.socialMedia.github;
    document.getElementById('linkedin').value = siteData.socialMedia.linkedin;

    // Load theme colors
    document.getElementById('primaryColor').value = siteData.theme.primary;
    document.getElementById('primaryColorValue').textContent = siteData.theme.primary;
    document.getElementById('secondaryColor').value = siteData.theme.secondary;
    document.getElementById('secondaryColorValue').textContent = siteData.theme.secondary;
    document.getElementById('accentColor').value = siteData.theme.accent;
    document.getElementById('accentColorValue').textContent = siteData.theme.accent;
    document.getElementById('lightBg').value = siteData.theme.lightBg;
    document.getElementById('lightBgValue').textContent = siteData.theme.lightBg;

    document.getElementById('location').value = siteData.general.location || 'MSUAS Campus, Mutare';

    // Load lists
    renderEvents();
    renderProjects();
    renderTeam();
    renderAwards();
    renderSponsors();
}

// Color picker updates
document.querySelectorAll('.color-picker').forEach(picker => {
    picker.addEventListener('input', (e) => {
        const valueSpan = document.getElementById(e.target.id + 'Value');
        valueSpan.textContent = e.target.value;
    });
});

// Render functions for each section
function renderEvents() {
    const list = document.getElementById('eventsList');
    list.innerHTML = '';
    
    siteData.events.forEach(event => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${event.title}</h4>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editEvent(${event.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteEvent(${event.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <p><strong>Date:</strong> ${event.date}</p>
            <p><strong>Location:</strong> ${event.location}</p>
            <p>${event.description}</p>
        `;
        list.appendChild(card);
    });
}

function renderProjects() {
    const list = document.getElementById('projectsList');
    list.innerHTML = '';
    
    siteData.projects.forEach(project => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${project.title}</h4>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editProject(${project.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteProject(${project.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <p>${project.description}</p>
            <p><strong>Tech:</strong> ${project.technologies.join(', ')}</p>
            <p><strong>Team:</strong> ${project.teamMembers.join(', ')}</p>
        `;
        list.appendChild(card);
    });
}

function renderTeam() {
    const list = document.getElementById('teamList');
    list.innerHTML = '';
    
    siteData.team.forEach(member => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${member.name}</h4>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editTeamMember(${member.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteTeamMember(${member.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <p><strong>Role:</strong> ${member.role}</p>
        `;
        list.appendChild(card);
    });
}

function renderAwards() {
    const list = document.getElementById('awardsList');
    list.innerHTML = '';
    
    siteData.awards.forEach(award => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${award.title}</h4>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editAward(${award.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteAward(${award.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <p><strong>Date:</strong> ${award.date}</p>
            <p><strong>Category:</strong> ${award.category}</p>
            <p>${award.description}</p>
        `;
        list.appendChild(card);
    });
}

function renderSponsors() {
    const list = document.getElementById('sponsorsList');
    list.innerHTML = '';
    
    siteData.sponsors.forEach(sponsor => {
        const card = document.createElement('div');
        card.className = 'item-card';
        card.innerHTML = `
            <div class="item-header">
                <h4>${sponsor.name}</h4>
                <div class="item-actions">
                    <button class="btn-small btn-edit" onclick="editSponsor(${sponsor.id})">
                        <i class="fas fa-edit"></i> Edit
                    </button>
                    <button class="btn-small btn-delete" onclick="deleteSponsor(${sponsor.id})">
                        <i class="fas fa-trash"></i> Delete
                    </button>
                </div>
            </div>
            <p><strong>Logo:</strong> ${sponsor.logo}</p>
        `;
        list.appendChild(card);
    });
}

// Modal functions
function closeModal() {
    document.getElementById('itemModal').classList.remove('active');
}

// Add Event
document.getElementById('addEventBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add New Event';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label>Event Title</label>
            <input type="text" id="eventTitle" required>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" id="eventDate" placeholder="e.g., Nov 15, 2025" required>
        </div>
        <div class="form-group">
            <label>Location</label>
            <input type="text" id="eventLocation" placeholder="e.g., Lecture Room 2" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="eventDescription" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label>Image Path</label>
            <input type="text" id="eventImage" placeholder="images/event.jpg">
        </div>
    `;
    
    document.getElementById('itemModal').classList.add('active');
    document.getElementById('saveItemBtn').onclick = () => {
        const newEvent = {
            id: Date.now(),
            title: document.getElementById('eventTitle').value,
            date: document.getElementById('eventDate').value,
            location: document.getElementById('eventLocation').value,
            description: document.getElementById('eventDescription').value,
            image: document.getElementById('eventImage').value
        };
        
        siteData.events.push(newEvent);
        renderEvents();
        closeModal();
        showSuccess();
        updateStats();
    };
});

// Similar functions for Projects, Team, Awards, Sponsors
// (Due to length, I'll include the key ones - you can follow the same pattern)

// Add Project
document.getElementById('addProjectBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add New Project';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label>Project Title</label>
            <input type="text" id="projectTitle" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="projectDescription" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label>Technologies (comma-separated)</label>
            <input type="text" id="projectTech" placeholder="JavaScript, Node.js, MySQL">
        </div>
        <div class="form-group">
            <label>Team Members (comma-separated)</label>
            <input type="text" id="projectTeam" placeholder="John, Jane, Bob">
        </div>
        <div class="form-group">
            <label>Image Path</label>
            <input type="text" id="projectImage" placeholder="images/project.jpg">
        </div>
        <div class="form-group">
            <label>Live Link (optional)</label>
            <input type="url" id="projectLive">
        </div>
        <div class="form-group">
            <label>Code Link (optional)</label>
            <input type="url" id="projectCode">
        </div>
        <div class="form-group">
            <label>Video Link (optional)</label>
            <input type="url" id="projectVideo">
        </div>
    `;
    
    document.getElementById('itemModal').classList.add('active');
    document.getElementById('saveItemBtn').onclick = () => {
        const newProject = {
            id: Date.now(),
            title: document.getElementById('projectTitle').value,
            description: document.getElementById('projectDescription').value,
            technologies: document.getElementById('projectTech').value.split(',').map(s => s.trim()),
            teamMembers: document.getElementById('projectTeam').value.split(',').map(s => s.trim()),
            image: document.getElementById('projectImage').value,
            liveLink: document.getElementById('projectLive').value,
            codeLink: document.getElementById('projectCode').value,
            videoLink: document.getElementById('projectVideo').value
        };
        
        siteData.projects.push(newProject);
        renderProjects();
        closeModal();
        showSuccess();
        updateStats();
    };
});

// Add Team Member
document.getElementById('addTeamBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add Team Member';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label>Name</label>
            <input type="text" id="memberName" required>
        </div>
        <div class="form-group">
            <label>Role/Position</label>
            <input type="text" id="memberRole" placeholder="e.g., President" required>
        </div>
        <div class="form-group">
            <label>Image Path</label>
            <input type="text" id="memberImage" placeholder="images/team/member.jpg">
        </div>
        <div class="form-group">
            <label>Twitter Link</label>
            <input type="url" id="memberTwitter">
        </div>
        <div class="form-group">
            <label>GitHub Link</label>
            <input type="url" id="memberGithub">
        </div>
        <div class="form-group">
            <label>LinkedIn Link</label>
            <input type="url" id="memberLinkedin">
        </div>
    `;
    
    document.getElementById('itemModal').classList.add('active');
    document.getElementById('saveItemBtn').onclick = () => {
        const newMember = {
            id: Date.now(),
            name: document.getElementById('memberName').value,
            role: document.getElementById('memberRole').value,
            image: document.getElementById('memberImage').value,
            twitter: document.getElementById('memberTwitter').value,
            github: document.getElementById('memberGithub').value,
            linkedin: document.getElementById('memberLinkedin').value
        };
        
        siteData.team.push(newMember);
        renderTeam();
        closeModal();
        showSuccess();
        updateStats();
    };
});

// Add Award
document.getElementById('addAwardBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add New Award';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label>Award Title</label>
            <input type="text" id="awardTitle" required>
        </div>
        <div class="form-group">
            <label>Date</label>
            <input type="text" id="awardDate" placeholder="e.g., October 2023" required>
        </div>
        <div class="form-group">
            <label>Category/Place</label>
            <input type="text" id="awardCategory" placeholder="e.g., 1st Place" required>
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea id="awardDescription" rows="3" required></textarea>
        </div>
        <div class="form-group">
            <label>Image Path</label>
            <input type="text" id="awardImage" placeholder="images/awards/award.jpg">
        </div>
    `;
    
    document.getElementById('itemModal').classList.add('active');
    document.getElementById('saveItemBtn').onclick = () => {
        const newAward = {
            id: Date.now(),
            title: document.getElementById('awardTitle').value,
            date: document.getElementById('awardDate').value,
            category: document.getElementById('awardCategory').value,
            description: document.getElementById('awardDescription').value,
            image: document.getElementById('awardImage').value
        };
        
        siteData.awards.push(newAward);
        renderAwards();
        closeModal();
        showSuccess();
        updateStats();
    };
});

// Add Sponsor
document.getElementById('addSponsorBtn').addEventListener('click', () => {
    document.getElementById('modalTitle').textContent = 'Add New Partner';
    document.getElementById('modalBody').innerHTML = `
        <div class="form-group">
            <label>Partner Name</label>
            <input type="text" id="sponsorName" required>
        </div>
        <div class="form-group">
            <label>Logo Path</label>
            <input type="text" id="sponsorLogo" placeholder="images/sponsors/logo.png" required>
        </div>
    `;
    
    document.getElementById('itemModal').classList.add('active');
    document.getElementById('saveItemBtn').onclick = () => {
        const newSponsor = {
            id: Date.now(),
            name: document.getElementById('sponsorName').value,
            logo: document.getElementById('sponsorLogo').value
        };
        
        siteData.sponsors.push(newSponsor);
        renderSponsors();
        closeModal();
        showSuccess();
    };
});

// Delete functions (make them global so onclick can access them)
window.deleteEvent = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
        siteData.events = siteData.events.filter(e => e.id !== id);
        renderEvents();
        showSuccess();
        updateStats();
    }
};

window.deleteProject = (id) => {
    if (confirm('Are you sure you want to delete this project?')) {
        siteData.projects = siteData.projects.filter(p => p.id !== id);
        renderProjects();
        showSuccess();
        updateStats();
    }
};

window.deleteTeamMember = (id) => {
    if (confirm('Are you sure you want to delete this team member?')) {
        siteData.team = siteData.team.filter(m => m.id !== id);
        renderTeam();
        showSuccess();
        updateStats();
    }
};

window.deleteAward = (id) => {
    if (confirm('Are you sure you want to delete this award?')) {
        siteData.awards = siteData.awards.filter(a => a.id !== id);
        renderAwards();
        showSuccess();
        updateStats();
    }
};

window.deleteSponsor = (id) => {
    if (confirm('Are you sure you want to delete this partner?')) {
        siteData.sponsors = siteData.sponsors.filter(s => s.id !== id);
        renderSponsors();
        showSuccess();
    }
};

// Edit functions (simplified - follow same pattern as add)
window.editEvent = window.editProject = window.editTeamMember = window.editAward = window.editSponsor = () => {
    alert('Edit functionality follows same pattern as add. Implement based on your needs.');
};

// Save All Changes
document.getElementById('saveAllBtn').addEventListener('click', () => {
    // Update general settings
    siteData.general.clubName = document.getElementById('clubName').value;
    siteData.general.universityName = document.getElementById('universityName').value;
    siteData.general.clubMotto = document.getElementById('clubMotto').value;
    siteData.general.joinFormLink = document.getElementById('joinFormLink').value;
    siteData.general.logoPath = document.getElementById('logoPath').value;
    siteData.general.contactEmail = document.getElementById('contactEmail').value;
    siteData.general.contactPhone = document.getElementById('contactPhone').value;
    siteData.general.meetingTime = document.getElementById('meetingTime').value;
    siteData.general.location = document.getElementById('location').value;

    // Update about section
    siteData.about.paragraph1 = document.getElementById('aboutPara1').value;
    siteData.about.paragraph2 = document.getElementById('aboutPara2').value;
    siteData.about.paragraph3 = document.getElementById('aboutPara3').value;
    siteData.about.handbookLink = document.getElementById('handbookLink').value;

    // Update social media
    siteData.socialMedia.facebook = document.getElementById('facebook').value;
    siteData.socialMedia.twitter = document.getElementById('twitter').value;
    siteData.socialMedia.instagram = document.getElementById('instagram').value;
    siteData.socialMedia.youtube = document.getElementById('youtube').value;
    siteData.socialMedia.whatsapp = document.getElementById('whatsapp').value;
    siteData.socialMedia.github = document.getElementById('github').value;
    siteData.socialMedia.linkedin = document.getElementById('linkedin').value;

    // Update theme
    siteData.theme.primary = document.getElementById('primaryColor').value;
    siteData.theme.secondary = document.getElementById('secondaryColor').value;
    siteData.theme.accent = document.getElementById('accentColor').value;
    siteData.theme.lightBg = document.getElementById('lightBg').value;

    siteData.general.location = document.getElementById('location').value;

    // Save to localStorage
    localStorage.setItem('techzoneAdminData', JSON.stringify(siteData));
    
    showSuccess();
});

// Download JSON file
document.getElementById('downloadBtn').addEventListener('click', () => {
    const dataStr = JSON.stringify(siteData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'site-content.json';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    
    alert('✅ site-content.json downloaded! Upload this file to your website root folder.');
});

// Show success message
function showSuccess() {
    const msg = document.getElementById('successMessage');
    msg.classList.add('show');
    setTimeout(() => {
        msg.classList.remove('show');
    }, 3000);
}

// Update statistics
function updateStats() {
    document.getElementById('totalEvents').textContent = siteData.events.length;
    document.getElementById('totalProjects').textContent = siteData.projects.length;
    document.getElementById('totalTeam').textContent = siteData.team.length;
    document.getElementById('totalAwards').textContent = siteData.awards.length;
}
