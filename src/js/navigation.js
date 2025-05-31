const pages = [
    'letter.html',
    'gallery.html',
    'Invitation.html',
    'components/final-surprise.html'
];

let currentPage = 0;

// Function to get current page index based on current URL
function getCurrentPageIndex() {
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop();
    return pages.findIndex(page => page.endsWith(pageName));
}

function nextPage() {
    currentPage = getCurrentPageIndex();
    console.log('Current page index:', currentPage);
    
    if (currentPage < pages.length - 1) {
        fadeOut(() => {
            currentPage++;
            console.log('Navigating to:', pages[currentPage]);
            window.location.href = pages[currentPage];
        });
    }
}

function previousPage() {
    currentPage = getCurrentPageIndex();
    console.log('Current page index:', currentPage);
    
    if (currentPage > 0) {
        fadeOut(() => {
            currentPage--;
            console.log('Navigating to:', pages[currentPage]);
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
    // Set initial current page
    currentPage = getCurrentPageIndex();
    console.log('Initial page index:', currentPage);
    
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