let currentIndex = 0;
const wrapper = document.getElementById('mainCarousel');
const slides = document.querySelectorAll('.carousel-slide');

function moveSlide(direction) {
    if (!wrapper) return;
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    resetAutoplay();
}

let autoPlay = setInterval(() => moveSlide(1), 5000);
function resetAutoplay() { clearInterval(autoPlay); autoPlay = setInterval(() => moveSlide(1), 5000); }

function toggleGallery(show) {
    const popup = document.getElementById('galleryPopup');
    const items = document.querySelectorAll('.gallery-item');
    if (show) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
        items.forEach((item, i) => item.style.transitionDelay = `${i * 0.1}s`);
    } else {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
document.querySelectorAll('.zoom-trigger').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        lightboxImg.src = img.src;
        lightbox.classList.add('active');
    });
});
if (lightbox) lightbox.addEventListener('click', () => lightbox.classList.remove('active'));