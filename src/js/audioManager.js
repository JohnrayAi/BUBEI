class AudioManager {
    constructor() {
        this.isPlaying = false;
        this.currentTime = 0;
    }

    static getInstance() {
        if (!AudioManager.instance) {
            AudioManager.instance = new AudioManager();
        }
        return AudioManager.instance;
    }

    async initializeAudio() {
        const audio = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');
        
        if (audio && musicToggle) {
            // Make sure audio is loaded
            await audio.load();
            
            musicToggle.addEventListener('click', async () => {
                try {
                    if (audio.paused) {
                        await audio.play();
                        this.isPlaying = true;
                        musicToggle.textContent = '🎵 Pause Music';
                        musicToggle.classList.add('playing');
                    } else {
                        audio.pause();
                        this.isPlaying = false;
                        musicToggle.textContent = '🎵 Play Music';
                        musicToggle.classList.remove('playing');
                    }
                    this.saveState();
                } catch (error) {
                    console.error('Audio playback failed:', error);
                    alert('Please ensure your audio file exists at ../assets/music/bgm.mp3');
                }
            });

            // Add error handling
            audio.addEventListener('error', (e) => {
                console.error('Audio loading error:', e);
                alert('Error loading audio file. Please check if the file exists.');
            });
        }
    }

    saveState() {
        const audio = document.getElementById('bgMusic');
        if (audio) {
            localStorage.setItem('musicPlaying', this.isPlaying);
            localStorage.setItem('musicTime', audio.currentTime);
        }
    }

    loadState() {
        const audio = document.getElementById('bgMusic');
        const musicToggle = document.getElementById('musicToggle');
        
        if (audio && musicToggle) {
            const wasPlaying = localStorage.getItem('musicPlaying') === 'true';
            const savedTime = parseFloat(localStorage.getItem('musicTime') || '0');

            audio.currentTime = savedTime;
            
            if (wasPlaying) {
                audio.play().then(() => {
                    this.isPlaying = true;
                    musicToggle.textContent = '🎵 Pause Music';
                    musicToggle.classList.add('playing');
                }).catch(console.error);
            }
        }
    }
}

// Initialize when document loads
document.addEventListener('DOMContentLoaded', () => {
    const audioManager = AudioManager.getInstance();
    audioManager.initializeAudio();
    audioManager.loadState();
});