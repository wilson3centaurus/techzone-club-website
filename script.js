// Home background slideshow 
const slideshowImages = [
    'images/background/background1.jpg',
    'images/background/background2.jpg',
    'images/background/background3.jpg',
    'images/background/background4.jpg',
    'images/background/background5.jpg',
    'images/background/background6.jpg',
];

let currentImageIndex = 0;

function changeBackground() {
    document.getElementById('home').style.backgroundImage = `url('${slideshowImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
}

function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + slideshowImages.length) % slideshowImages.length;
    changeBackground();
}

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
    changeBackground();
}

setInterval(changeBackground, 6000);

// Gallery modal
const galleryModal = document.getElementById('galleryModal');
const galleryModalImg = document.getElementById('galleryModalImage');

function closeGalleryModal() {
    galleryModal.style.display = 'none';
}

// Open the gallery modal when clicking on a gallery image
document.querySelectorAll('.gallery-image').forEach(image => {
    image.addEventListener('click', function() {
        galleryModal.style.display = 'flex';
        galleryModalImg.src = this.src;
    });
});

// Close the gallery modal when clicking on the close button or outside the modal
window.onclick = function(event) {
    if (event.target === galleryModal) {
        closeGalleryModal();
    }
};

// Event modal
const eventModal = document.getElementById('eventModal');
const eventModalImg = document.getElementById('eventModalImage');

function closeEventModal() {
    eventModal.style.display = 'none';
}

// Open the event modal when clicking on an event image
document.querySelectorAll('.event-image').forEach(image => {
    image.addEventListener('click', function() {
        eventModal.style.display = 'flex';
        eventModalImg.src = this.src;
    });
});

// Close the event modal when clicking on the close button or outside the modal
window.onclick = function(event) {
    if (event.target === eventModal) {
        closeEventModal();
    }
};
  
const imageSources = [
   'images/_452360.jpg',
   'images/arduino.png',
   'images/web-event.webp',
];

// Variables for the first card
let currentImageIndex1 = 0;
const slideshowImages1 = ['images/_452360.jpg', 'images/image2.jpg'];

// Variables for the second card
let currentImageIndex2 = 0;
const slideshowImages2 = ['images/image2.jpg', 'images/_452360.jpg'];

// Function for the first card
function changeBackground1() {
    document.querySelector('.project-image1').src = slideshowImages1[currentImageIndex1];
}

// Function for the second card
function changeBackground2() {
    document.querySelector('.project-image2').src = slideshowImages2[currentImageIndex2];
}

function prevImage1() {
    currentImageIndex1 = (currentImageIndex1 - 1 + slideshowImages1.length) % slideshowImages1.length;
    changeBackground1();
}

function nextImage1() {
    currentImageIndex1 = (currentImageIndex1 + 1) % slideshowImages1.length;
    changeBackground1();
}

function prevImage2() {
    currentImageIndex2 = (currentImageIndex2 - 1 + slideshowImages2.length) % slideshowImages2.length;
    changeBackground2();
}

function nextImage2() {
    currentImageIndex2 = (currentImageIndex2 + 1) % slideshowImages2.length;
    changeBackground2();
}

function showMore() {
    const showMoreBtn = document.querySelector('.show-more');

    if (showMoreBtn.innerText === 'Show More') {
        document.querySelector('#gallery').style.height = 'auto';
        document.querySelector('.gallery-container').style.height = 'auto';
        showMoreBtn.innerHTML = 
        `
            <button class="show-more-btn" onclick="showMore()">Show Less</button>
        `;
    } else if (showMoreBtn.innerText === 'Show Less') {
        document.querySelector('#gallery').style.height = '100vh';
        document.querySelector('.gallery-container').style.height = '370px';
        showMoreBtn.innerHTML = 
        `
            <button class="show-more-btn" onclick="showMore()">Show More</button>
        `;
    }

}