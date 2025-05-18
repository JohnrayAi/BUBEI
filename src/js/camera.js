let currentStream;
let currentPhotoTarget;

async function openCamera(photoId) {
    currentPhotoTarget = photoId;
    const modal = document.getElementById('camera-modal');
    const video = document.getElementById('camera-feed');

    try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: 'environment' }, 
            audio: false 
        });
        currentStream = stream;
        video.srcObject = stream;
        modal.style.display = 'flex';
    } catch (err) {
        console.error('Camera error:', err);
        alert('Could not access camera. Please make sure you have granted camera permissions.');
    }
}

function takePhoto() {
    const video = document.getElementById('camera-feed');
    const canvas = document.getElementById('photo-canvas');
    const photo = document.getElementById(currentPhotoTarget);

    // Set canvas size to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    canvas.getContext('2d').drawImage(video, 0, 0);

    // Convert to base64 and save to localStorage
    const imageData = canvas.toDataURL('image/jpeg', 0.8); // Compress to 80% quality
    localStorage.setItem(`photo_${currentPhotoTarget}`, imageData);
    
    // Update the image on screen
    photo.src = imageData;

    closeCamera();
}

// Load saved photos when page loads
function loadSavedPhotos() {
    const photoIds = ['activity1-photo', 'activity2-photo', 'activity3-photo'];
    
    photoIds.forEach(id => {
        const savedPhoto = localStorage.getItem(`photo_${id}`);
        if (savedPhoto) {
            document.getElementById(id).src = savedPhoto;
        }
    });
}

document.addEventListener('DOMContentLoaded', loadSavedPhotos);

function closeCamera() {
    const modal = document.getElementById('camera-modal');
    if (currentStream) {
        currentStream.getTracks().forEach(track => track.stop());
    }
    modal.style.display = 'none';
}

function downloadPhoto(photoId) {
    const imageData = localStorage.getItem(`photo_${photoId}`);
    if (imageData) {
        const link = document.createElement('a');
        link.href = imageData;
        link.download = `date_photo_${Date.now()}.jpg`;
        link.click();
    }
}

// Add download button to each photo container
function addDownloadButtons() {
    const photoContainers = document.querySelectorAll('.photo-container');
    photoContainers.forEach(container => {
        const downloadBtn = document.createElement('button');
        downloadBtn.className = 'download-btn';
        downloadBtn.innerHTML = '💾 Save Photo';
        downloadBtn.onclick = () => downloadPhoto(container.querySelector('img').id);
        container.appendChild(downloadBtn);
    });
}

document.addEventListener('DOMContentLoaded', addDownloadButtons);