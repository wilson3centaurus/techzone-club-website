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



// JavaScript to open and close the modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('modalImage');
const images = document.querySelectorAll('.gallery-image');

images.forEach(img => {
    img.addEventListener('click', () => {
        modal.style.display = 'block';
        modalImg.src = img.src;
    });
});

function closeModal() {
    modal.style.display = 'none';
}

    window.onclick = function(event) {
        if (event.target === modal) {
            closeModal();
        }
    };

// JavaScript to open and close the modal for events
const eventModal = document.getElementById('eventModal');
const eventModalImg = document.getElementById('eventModalImage');

// Add event listeners to open the modal when clicking on the event images
// and to close the modal when clicking on the close button or outside the modal
// (similar to how it was done for the gallery modal)
// Update the closeModal function to handle closing the event modal

function closeEventModal() {
    eventModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target === eventModal) {
        closeEventModal();
    }
};

// Modals functionsality
/*
function openModal(imageSrc) {
    const modal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    
    modal.style.display = 'flex';
    modalImage.src = imageSrc;
  }
  
  function closeModal() {
    const modal = document.getElementById('imageModal');
    modal.style.display = 'none';
  }
  
// Events Modals 

const learnMoreButton = document.querySelectorAll('.reserve-button');
learnMoreButton.forEach(button => {
    button.addEventListener('click', (event) => {
        const imageSrc = button.closest('.event-card').querySelector('.event-image').src;
        openModal(imageSrc);
        event.stopPropagation();
    });
});

// Gallery Modals
const galleryButton = document.querySelectorAll('.galleryModal');
galleryButton.forEach(button => {
    button.addEventListener('click', (event) => {
        const imageSrc = button.closest('.gallery-container').querySelector('.gallery-image').src;
        openModal(imageSrc);
        event.stopPropagation();
    });
});  */
  
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
