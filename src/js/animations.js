// Heart beat animation
function createHeartbeat() {
    const heart = document.querySelector('.heart');
    if (heart) {
        heart.classList.add('heartbeat');
    }
}

// Text typing effect
function typeWriter(elementId, text, speed = 50, delay = 0) {
    return new Promise(resolve => {
        setTimeout(() => {
            const element = document.getElementById(elementId);
            if (!element) return resolve();

            element.innerHTML = '';
            element.classList.add('typing');
            
            let i = 0;
            function type() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                    setTimeout(type, speed);
                } else {
                    element.classList.remove('typing');
                    element.classList.add('fade-in');
                    resolve();
                }
            }
            type();
        }, delay);
    });
}

async function animateLetterContent() {
    const contents = [
        { id: 'typed-text-1', delay: 0 },
        { id: 'typed-text-2', delay: 1000 },
        { id: 'typed-text-3', delay: 500 },
        { id: 'typed-text-4', delay: 500 },
        { id: 'typed-text-5', delay: 500 },
        { id: 'typed-text-6', delay: 1000 }
    ];

    for (const content of contents) {
        const element = document.getElementById(content.id);
        if (element) {
            const text = element.innerHTML;
            await typeWriter(content.id, text, 50, content.delay);
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

// Optimized floating hearts
function createFloatingHearts() {
    const container = document.querySelector('.background-hearts');
    if (container) {
        // Reduce number of hearts for better performance
        const fragment = document.createDocumentFragment();
        for (let i = 0; i < 8; i++) {
            const heart = document.createElement('div');
            heart.className = 'floating-heart';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDelay = (Math.random() * 5) + 's';
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            fragment.appendChild(heart);
        }
        container.appendChild(fragment);
    }
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

// Initialize everything with performance in mind
document.addEventListener('DOMContentLoaded', () => {
    const currentPath = window.location.pathname;
    
    if (currentPath.includes('index.html')) {
        createHeartbeat();
    }
    
    if (currentPath.includes('letter.html')) {
        animateLetterContent();
    }
    
    if (currentPath.includes('gallery.html')) {
        fadeInImages();
    }
    
    // Delay non-critical animations
    setTimeout(() => {
        createFloatingHearts();
        initMusicPlayer();
    }, 100);
});