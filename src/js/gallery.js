document.addEventListener('DOMContentLoaded', () => {
    const track = document.getElementById('carouselTrack');
    const slides = Array.from(track.children);
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');
    let current = 0;

    function updateActive() {
        slides.forEach((slide, idx) => {
            slide.classList.remove('active', 'prev', 'next');
            if (idx === current) {
                slide.classList.add('active');
            } else if (idx === (current - 1 + slides.length) % slides.length) {
                slide.classList.add('prev');
            } else if (idx === (current + 1) % slides.length) {
                slide.classList.add('next');
            }
        });
        // Scroll to center the active slide
        slides[current].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    prevBtn.addEventListener('click', () => {
        current = (current - 1 + slides.length) % slides.length;
        updateActive();
    });
    nextBtn.addEventListener('click', () => {
        current = (current + 1) % slides.length;
        updateActive();
    });

    // Only enable drag/swipe on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
        let startX = 0;
        let isDragging = false;
        track.addEventListener('pointerdown', e => {
            isDragging = true;
            startX = e.clientX;
        });
        track.addEventListener('pointerup', e => {
            if (!isDragging) return;
            const dx = e.clientX - startX;
            if (dx > 50) prevBtn.click();
            else if (dx < -50) nextBtn.click();
            isDragging = false;
        });
        track.addEventListener('pointerleave', () => { isDragging = false; });
    }

    // Keyboard navigation
    document.addEventListener('keydown', e => {
        if (e.key === 'ArrowLeft') prevBtn.click();
        if (e.key === 'ArrowRight') nextBtn.click();
    });

    // Initialize
    updateActive();
});