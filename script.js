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


// Modals functionsality

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
  
  const learnMoreButtons = document.querySelectorAll('.reserve-button');
  learnMoreButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const imageSrc = button.closest('.event-card').querySelector('.event-image').src;
      openModal(imageSrc);
      event.stopPropagation();
    });
  });
  
  
const imageSources = [
   'images/_452360.jpg',
   'images/arduino.png',
   'images/web-event.webp',
];

let currentIndex = 0;

function updateImage() {
    const imageElement = document.querySelector('.project-image');
    imageElement.src = imageSources[currentIndex];
}

function prevImage() {
    currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
    updateImage();
}

function nextImage() {
    currentIndex = (currentIndex + 1) % imageSources.length;
    updateImage();
}
