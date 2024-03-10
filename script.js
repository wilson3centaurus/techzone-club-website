
const slideshowImages = [
    'images/image1.jpg',
    'images/image2.jpg',
    'images/image3.jpg',
];

let currentImageIndex = 0;

function changeBackground() {
    document.getElementById('home').style.backgroundImage = `url('${slideshowImages[currentImageIndex]}')`;
    currentImageIndex = (currentImageIndex + 1) % slideshowImages.length;
}

setInterval(changeBackground, 5000); //Change the image every 5 seconds (adjust as needed)

