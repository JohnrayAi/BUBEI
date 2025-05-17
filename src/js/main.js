// main.js

import { fadeIn, slideIn } from './animations.js';

document.addEventListener('DOMContentLoaded', () => {
    // Initialize animations on page load
    fadeIn(document.querySelector('.welcome-message'));
    slideIn(document.querySelector('.gallery'));
    
    // Additional initialization code can go here
});