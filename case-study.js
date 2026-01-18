document.addEventListener('DOMContentLoaded', () => {
    // 1. Progress Bar Scroll
    const bar = document.getElementById('cs-bar');
    window.addEventListener('scroll', () => {
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / height) * 100;
        if (bar) bar.style.width = scrolled + "%";
    });

    // 2. Exact Card Slider Logic
    const units = document.querySelectorAll('.cs-display-unit');
    units.forEach(unit => {
        const track = unit.querySelector('.cs-slider-track');
        const slides = unit.querySelectorAll('.cs-slide');
        const next = unit.querySelector('.next');
        const prev = unit.querySelector('.prev');
        const counter = unit.querySelector('.cs-counter');
        let index = 0;

        const move = () => {
            track.style.transform = `translateX(-${index * 100}%)`;
            if (counter) counter.innerText = `0${index + 1} / 0${slides.length}`;
        };

        if(next && prev) {
            next.onclick = () => { index = (index + 1) % slides.length; move(); };
            prev.onclick = () => { index = (index - 1 + slides.length) % slides.length; move(); };
        }
    });
});