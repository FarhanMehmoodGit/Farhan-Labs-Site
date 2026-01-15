/**
 * TYPEWRITER ENGINE
 */
const typeElement = (element) => {
    const text = element.getAttribute('data-text');
    let index = 0;
    element.innerHTML = ''; 
    element.classList.add('typing');

    const writer = () => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(writer, element.tagName === 'P' ? 10 : 35);
        } else {
            element.classList.remove('typing');
        }
    };
    writer();
};

/**
 * THEME LOGIC
 */
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');

const setMode = (isLight) => {
    if (isLight) {
        document.body.classList.add('light-mode');
        themeIcon.textContent = '☀️';
        themeText.textContent = 'LIGHT';
        localStorage.setItem('theme', 'light');
    } else {
        document.body.classList.remove('light-mode');
        themeIcon.textContent = '🌙';
        themeText.textContent = 'DARK';
        localStorage.setItem('theme', 'dark');
    }
};

// Init Theme
if (localStorage.getItem('theme') === 'light') setMode(true);

themeToggle.addEventListener('click', () => {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    setMode(!isCurrentlyLight);
});

/**
 * SCROLL OBSERVER
 */
const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('reveal')) {
                entry.target.classList.add('active');
            }
            if (entry.target.classList.contains('typewriter-trigger') && !entry.target.classList.contains('has-played')) {
                entry.target.classList.add('has-played');
                typeElement(entry.target);
            }
        }
    });
}, { threshold: 0.15 });

/**
 * PARALLAX
 */
window.addEventListener('scroll', () => {
    const img = document.querySelector('.solutions-image img');
    if (img) {
        const scrolled = window.pageYOffset;
        img.style.transform = `translateY(${scrolled * 0.05}px)`;
    }
});

/**
 * LOADER HANDLER
 */
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.visibility = 'hidden';
            document.body.style.overflow = 'auto';
            document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));
            document.querySelectorAll('.typewriter-trigger').forEach(el => scrollObserver.observe(el));
        }, 800);
    }, 1200);
});
/**
 * BACK TO TOP LOGIC
 */
const backToTopBtn = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('show');
    } else {
        backToTopBtn.classList.remove('show');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});