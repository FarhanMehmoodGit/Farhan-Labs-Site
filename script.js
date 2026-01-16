// 1. Initial State & Variable Definitions
const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeText = document.getElementById('theme-text');
const backToTopBtn = document.getElementById('backToTop');

// 2. Typewriter Engine
const typeElement = (element) => {
    const text = element.getAttribute('data-text');
    if (!text) return;
    let index = 0;
    element.innerHTML = ''; 
    element.classList.add('typing');
    const writer = () => {
        if (index < text.length) {
            element.innerHTML += text.charAt(index);
            index++;
            setTimeout(writer, 35);
        } else {
            element.classList.remove('typing');
        }
    };
    writer();
};

// 3. Theme Logic Function
const setMode = (isLight) => {
    if (isLight) {
        body.classList.add('light-mode');
        if (themeIcon) themeIcon.textContent = '☀️';
        if (themeText) themeText.textContent = 'LIGHT';
    } else {
        body.classList.remove('light-mode');
        if (themeIcon) themeIcon.textContent = '🌙';
        if (themeText) themeText.textContent = 'DARK';
    }
};

// 4. Scroll Observer
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

// 5. Theme Event Listener (With Fade Effect)
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        body.style.opacity = '0.9'; // Quick fade effect
        
        setTimeout(() => {
            const isCurrentlyLight = body.classList.contains('light-mode');
            const nextMode = !isCurrentlyLight;
            
            setMode(nextMode);
            localStorage.setItem('theme', nextMode ? 'light' : 'dark');
            
            body.style.opacity = '1';
        }, 150);
    });
}

// 6. Loader & Initializer
window.addEventListener('load', () => {
    const loader = document.getElementById('loader-wrapper');
    const progress = document.querySelector('.progress');
    
    // Check saved theme immediately on load
    const savedTheme = localStorage.getItem('theme');
    setMode(savedTheme === 'light');

    if (progress) progress.style.width = '100%';
    
    setTimeout(() => {
        if (loader) {
            loader.style.opacity = '0';
            setTimeout(() => {
                loader.style.visibility = 'hidden';
                body.style.overflow = 'auto';
                // Observe elements after loader is gone
                document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));
                document.querySelectorAll('.typewriter-trigger').forEach(el => scrollObserver.observe(el));
            }, 800);
        } else {
            document.querySelectorAll('.reveal').forEach(el => scrollObserver.observe(el));
            document.querySelectorAll('.typewriter-trigger').forEach(el => scrollObserver.observe(el));
        }
    }, 1000);
});

// 7. Back to Top Logic
if (backToTopBtn) {
    window.addEventListener('scroll', () => {
        backToTopBtn.style.display = window.pageYOffset > 300 ? "block" : "none";
    });
}