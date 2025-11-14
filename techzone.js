// Gallery System
const galleryImages = [
    'images/gallery/image (1).jpg',
    'images/gallery/image (2).jpg',
    'images/gallery/image (3).jpg',
    'images/gallery/image (4).jpg',
    'images/gallery/image (5).jpg',
    'images/gallery/image (6).jpg',
    'images/gallery/image (7).jpg',
    'images/gallery/image (8).jpg',
    'images/gallery/image (9).jpg',
    'images/gallery/image (10).jpg',
    'images/gallery/image (11).jpg',
    'images/gallery/image (12).jpg',
    'images/gallery/image (13).jpg',
    'images/gallery/image (14).jpg',
    'images/gallery/image (15).jpg',
    'images/gallery/image (16).jpg',
    'images/gallery/image (17).jpg',
    'images/gallery/image (18).jpg',
    'images/gallery/image (19).jpg',
    '/images/gallery/image (20).jpg',
    '/images/gallery/image (21).jpg',
    '/images/gallery/image (22).jpg',
    '/images/gallery/image (23).jpg',
    '/images/gallery/image (24).jpg',
    '/images/gallery/image (25).jpg',
    '/images/gallery/image (26).jpg',
    '/images/gallery/image (27).jpg',
    '/images/gallery/image (29).jpg',
    '/images/gallery/image (30).jpg',
    '/images/gallery/image (31).jpg'
];

let visibleImages = 8;
const galleryGrid = document.getElementById('galleryGrid');
const showMoreBtn = document.getElementById('showMoreBtn');
const showLessBtn = document.getElementById('showLessBtn');
const modal = document.getElementById('galleryModal');
const modalImg = document.getElementById('modalImage');
const closeModal = document.querySelector('.modal-close');

// Render gallery images
function renderGallery(count) {
    galleryGrid.innerHTML = '';
    const imagesToShow = galleryImages.slice(0, count);
    
    imagesToShow.forEach((src, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.innerHTML = `
            <img src="${src}" alt="Gallery Image ${index + 1}">
            <div class="gallery-overlay">
                <i class="fas fa-search-plus"></i>
            </div>
        `;
        
        // Add click event to open modal
        galleryItem.addEventListener('click', () => {
            modal.style.display = 'block';
            modalImg.src = src;
        });
        
        galleryGrid.appendChild(galleryItem);
    });
    
    updateButtons(count);
}

// Update button visibility
function updateButtons(count) {
    if (count >= galleryImages.length) {
        showMoreBtn.style.display = 'none';
    } else {
        showMoreBtn.style.display = 'inline-block';
    }
    
    if (count > 8) {
        showLessBtn.style.display = 'inline-block';
    } else {
        showLessBtn.style.display = 'none';
    }
}

// Show more images
showMoreBtn.addEventListener('click', () => {
    visibleImages += 8;
    renderGallery(visibleImages);
});

// Show less images
showLessBtn.addEventListener('click', () => {
    visibleImages = 8;
    renderGallery(visibleImages);
    // Scroll to gallery section
    document.getElementById('gallery').scrollIntoView({ behavior: 'smooth' });
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close modal when clicking outside image
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'block') {
        modal.style.display = 'none';
    }
});

// Initialize gallery with 8 images
renderGallery(visibleImages);


// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navMenu = document.querySelector('.nav-menu');

mobileMenuBtn.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileMenuBtn.innerHTML = navMenu.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.backgroundColor = 'var(--msuas-white)';
        header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Slideshow functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.slide');

function showSlide(n) {
    slides.forEach(slide => slide.classList.remove('active'));
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

function nextSlide() {
    showSlide(currentSlide + 1);
}

// Change slide every 5 seconds
setInterval(nextSlide, 5000);
