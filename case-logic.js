// 1. MAIN CAROUSEL LOGIC
let currentIndex = 0;
const wrapper = document.getElementById('mainCarousel');
const slides = document.querySelectorAll('.carousel-slide');

function moveSlide(direction) {
    if (!wrapper || slides.length === 0) return;
    
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
    resetAutoplay();
}

// Autoplay
let autoPlay = setInterval(() => moveSlide(1), 5000);
function resetAutoplay() { 
    clearInterval(autoPlay); 
    autoPlay = setInterval(() => moveSlide(1), 5000); 
}

// 2. GALLERY POPUP LOGIC
function toggleGallery(show) {
    const popup = document.getElementById('galleryPopup');
    if (show) {
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    } else {
        popup.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// 3. LIGHTBOX LOGIC
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

document.querySelectorAll('.zoom-trigger').forEach(img => {
    img.addEventListener('click', (e) => {
        e.stopPropagation();
        if (lightboxImg) {
            lightboxImg.src = img.src;
            lightbox.classList.add('active');
        }
    });
});

if (lightbox) {
    lightbox.addEventListener('click', () => {
        lightbox.classList.remove('active');
    });
}