document.addEventListener('DOMContentLoaded', () => {
  const mainDisplay = document.querySelector('.main-display');
  const mainImage = mainDisplay.querySelector('img');
  const mainVideo = mainDisplay.querySelector('video');
  const thumbnails = document.querySelectorAll('.thumbnails .thumbnail');

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnail.classList.add('active');

      const contentType = thumbnail.dataset.type;
      const videoSrc = thumbnail.dataset.video;
      const imageSrc = thumbnail.dataset.image;

      if (contentType === 'video' && videoSrc) {
        // Show video content
        mainVideo.querySelector('source').src = videoSrc;
        mainVideo.load();
        mainVideo.play();
        mainVideo.style.opacity = 1;
        mainImage.style.opacity = 0;
      } else if (contentType === 'image' && imageSrc) {
        // Show image content
        mainVideo.pause();
        mainVideo.style.opacity = 0;
        mainImage.src = imageSrc;
        mainImage.style.opacity = 1;
      }
    });
  });

  // Optional: Auto-play video on hover for thumbnails
  thumbnails.forEach(thumbnail => {
    if (thumbnail.dataset.type === 'video') {
      thumbnail.addEventListener('mouseenter', () => {
        // You could add a small preview effect here
        thumbnail.style.transform = 'scale(1.05)';
      });
      
      thumbnail.addEventListener('mouseleave', () => {
        thumbnail.style.transform = 'scale(1)';
      });
    }
  });
});