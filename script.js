
const slideshowImages = [
    'images/background/background1.jpg',
    'images/background/background2.jpg',
    'images/background/background3.jpg',
    'images/background/background4.jpg',
    'images/background/background5.jpg',
    'images/background/background6.jpg',
    'images/background/background7.jpg',
    'images/background/background8.jpg',
    'images/background/background9.jpg',
    'images/background/background10.jpg',
    'images/background/background11.jpg',
    'images/background/background12.jpg',
    'images/background/background13.jpg',
    'images/background/background14.jpg',
    'images/background/background15.jpg',
    'images/background/background16.jpg',
    'images/background/background17.jpg',
    'images/background/background18.jpg',
    'images/background/background19.jpg',
    'images/background/background20.jpg',
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

setInterval(changeBackground, 3000);

