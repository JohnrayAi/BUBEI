// Heart beat animation
function createHeartbeat() {
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.classList.add('heartbeat');
    }
}

// Text typing effect
function typeWriter(elementId, text, speed = 30, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (!element) return resolve();

            element.innerHTML = '';
            element.classList.remove('hidden');
            element.classList.add('typing');
            
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing');
                    element.classList.add('typed');
                    resolve();
                }
            }
            type();
        }, delay);
    });
}

async function animateLetterContent() {
    const contents = [
        { id: 'typed-text-1', delay: 300 },
        { id: 'typed-text-2', delay: 600 },
        { id: 'typed-text-3', delay: 600 },
        { id: 'typed-text-4', delay: 600 },
        { id: 'typed-text-5', delay: 600 },
        { id: 'typed-text-6', delay: 800 }
    ];

    for (const content of contents) {
        const element = document.getElementById(content.id);
        if (element) {
            const text = element.textContent;
            await typeWriter(content.id, text, 30, content.delay);
        }
    }
}

// Image fade-in effect
function fadeInImages() {
    const images = document.querySelectorAll('.gallery-item img');
    images.forEach((img, index) => {
        setTimeout(() => {
            img.classList.add('fade-in');
        }, index * 300);
    });
}

// Optimize animations with requestAnimationFrame
let animationFrame;

// Debounced function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Enhanced floating hearts and butterflies
function createFloatingHeartsAndButterflies() {
    const container = document.querySelector('.background-hearts');
    if (!container) return;
    container.innerHTML = '';
    // More hearts
    for (let i = 0; i < 28; i++) {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDelay = (Math.random() * 8) + 's';
        heart.style.opacity = Math.random() * 0.5 + 0.3;
        heart.style.width = heart.style.height = (Math.random() * 16 + 16) + 'px';
        heart.style.animationDuration = (Math.random() * 8 + 8) + 's';
        container.appendChild(heart);
    }
    // Butterflies with lively movement
    const butterflies = [];
    for (let i = 0; i < 12; i++) {
        const butterfly = document.createElement('div');
        butterfly.className = 'butterfly';
        // Initial random position
        const startLeft = Math.random() * 100;
        const startTop = Math.random() * 80;
        butterfly.dataset.baseLeft = startLeft;
        butterfly.dataset.baseTop = startTop;
        butterfly.style.left = startLeft + 'vw';
        butterfly.style.top = startTop + 'vh';
        butterfly.style.animationDelay = (Math.random() * 10) + 's';
        butterfly.style.opacity = Math.random() * 0.5 + 0.5;
        butterfly.style.width = butterfly.style.height = (Math.random() * 18 + 18) + 'px';
        butterfly.style.animationDuration = (Math.random() * 12 + 10) + 's';
        // Random direction: 1 for right, -1 for left
        const direction = Math.random() < 0.5 ? 1 : -1;
        butterfly.dataset.direction = direction;
        butterfly.style.transform = (direction === 1)
            ? 'scaleX(-1) rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateY(0px)'
            : 'scaleX(1) rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateY(0px)';
        // Add wings and bits
        for (let w = 0; w < 2; w++) {
            const wing = document.createElement('div');
            wing.className = 'wing';
            for (let b = 0; b < 2; b++) {
                const bit = document.createElement('div');
                bit.className = 'bit';
                wing.appendChild(bit);
            }
            butterfly.appendChild(wing);
        }
        container.appendChild(butterfly);
        // Add shadow
        const shadow = document.createElement('div');
        shadow.className = 'shadow';
        shadow.style.left = butterfly.style.left;
        shadow.style.top = butterfly.style.top;
        container.appendChild(shadow);
        // Store for animation
        butterflies.push({ butterfly, shadow, baseLeft: startLeft, baseTop: startTop, phase: Math.random() * Math.PI * 2, speed: Math.random() * 0.5 + 0.2, direction });
    }
    // Animate butterflies
    function animateButterflies() {
        const t = Date.now() / 1000;
        butterflies.forEach(obj => {
            // Sine/cosine path for lively movement
            const x = obj.baseLeft + Math.sin(t * obj.speed + obj.phase) * 10;
            const y = obj.baseTop + Math.cos(t * obj.speed * 0.7 + obj.phase) * 8;
            obj.butterfly.style.left = x + 'vw';
            obj.butterfly.style.top = y + 'vh';
            obj.shadow.style.left = x + 'vw';
            obj.shadow.style.top = (y + 8) + 'vh';
            // Keep direction consistent
            obj.butterfly.style.transform = (obj.direction === 1)
                ? 'scaleX(-1) rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateY(0px)'
                : 'scaleX(1) rotateX(50deg) rotateY(20deg) rotateZ(-50deg) translateY(0px)';
        });
        requestAnimationFrame(animateButterflies);
    }
    animateButterflies();
}

// Optimized music player
function initMusicPlayer() {
    const bgMusic = document.getElementById('bgMusic');
    const musicToggle = document.getElementById('musicToggle');

    if (musicToggle && bgMusic) {
        musicToggle.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().catch(() => {
                    console.log('Music playback failed');
                });
                musicToggle.textContent = '🎵 Pause Music';
            } else {
                bgMusic.pause();
                musicToggle.textContent = '🎵 Play Music';
            }
        });
    }
}

// Remove envelope click logic and trigger letter animation automatically
// Initialize everything with performance in mind
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;

    if (currentPath.includes('index.html')) {
        createHeartbeat();
    }

    if (currentPath.includes('letter.html')) {
        // Show the letter and start typing automatically
        const letter = document.querySelector('.letter-content');
        if (letter) {
            letter.style.opacity = '1';
            letter.style.transform = 'translateY(0)';
            setTimeout(animateLetterContent, 500);
        }
    }

    if (currentPath.includes('gallery.html')) {
        fadeInImages();
    }

    // Delay non-critical animations
    setTimeout(() => {
        createFloatingHeartsAndButterflies();
        initMusicPlayer();
    }, 100);
});