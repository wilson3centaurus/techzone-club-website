
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

