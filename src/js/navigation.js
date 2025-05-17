const pages = [
    'components/letter.html',
    /**'components/memory-timeline.html',*/
    'gallery.html',
    'final-surprise.html'
];

let currentPage = 0;

function nextPage() {
    if (currentPage < pages.length - 1) {
        fadeOut(() => {
            currentPage++;
            window.location.href = pages[currentPage];
        });
    }
}

function previousPage() {
    if (currentPage > 0) {
        fadeOut(() => {
            currentPage--;
            window.location.href = pages[currentPage];
        });
    }
}

function fadeOut(callback) {
    document.body.classList.add('fade-out');
    setTimeout(() => {
        callback();
    }, 1000);
}

// Add navigation controls to each page
document.addEventListener('DOMContentLoaded', () => {
    const nav = document.createElement('div');
    nav.className = 'navigation-controls';
    
    if (currentPage > 0) {
        const prevBtn = document.createElement('button');
        prevBtn.innerHTML = '❮ Previous';
        prevBtn.onclick = previousPage;
        nav.appendChild(prevBtn);
    }
    
    if (currentPage < pages.length - 1) {
        const nextBtn = document.createElement('button');
        nextBtn.innerHTML = 'Next ❯';
        nextBtn.onclick = nextPage;
        nav.appendChild(nextBtn);
    }
    
    document.body.appendChild(nav);
});