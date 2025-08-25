document.addEventListener('DOMContentLoaded', () => {
  const mainDisplay = document.querySelector('.main-display');
  const mainImage = mainDisplay.querySelector('img');
  const mainVideo = mainDisplay.querySelector('video');
  const thumbnails = document.querySelectorAll('.thumbnails .thumbnail');
  
  // Description elements
  const descriptionTitle = document.querySelector('.description-title');
  const descriptionText = document.querySelector('.description-text');
  const techTags = document.querySelector('.tech-tags');

  function updateDescription(thumbnail) {
    const title = thumbnail.dataset.title || 'Project Title';
    const description = thumbnail.dataset.description || 'Project description goes here.';
    const tech = thumbnail.dataset.tech || 'Technologies used';

    descriptionTitle.textContent = title;
    descriptionText.textContent = description;
    techTags.textContent = tech;
  }

  thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', () => {
      // Remove active class from all thumbnails
      thumbnails.forEach(t => t.classList.remove('active'));
      thumbnail.classList.add('active');

      const contentType = thumbnail.dataset.type;
      const videoSrc = thumbnail.dataset.video;
      const imageSrc = thumbnail.dataset.image;

      // Update description
      updateDescription(thumbnail);

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

  // Initialize with first thumbnail's description
  if (thumbnails.length > 0) {
    updateDescription(thumbnails[0]);
    
    // Initialize the display with the first thumbnail's content
    const firstThumbnail = thumbnails[0];
    const firstContentType = firstThumbnail.dataset.type;
    const firstVideoSrc = firstThumbnail.dataset.video;
    const firstImageSrc = firstThumbnail.dataset.image;
    
    if (firstContentType === 'video' && firstVideoSrc) {
      // Initialize with video content
      mainVideo.querySelector('source').src = firstVideoSrc;
      mainVideo.load();
      mainVideo.play();
      mainVideo.style.opacity = 1;
      mainImage.style.opacity = 0;
    } else if (firstContentType === 'image' && firstImageSrc) {
      // Initialize with image content
      mainVideo.style.opacity = 0;
      mainImage.src = firstImageSrc;
      mainImage.style.opacity = 1;
    }
  }

  // Video controls hover functionality - improved
  // Start with controls hidden
  mainVideo.removeAttribute('controls');
  
  mainDisplay.addEventListener('mouseenter', () => {
    // Add controls when hovering over the display area
    mainVideo.setAttribute('controls', 'true');
  });
  
  mainDisplay.addEventListener('mouseleave', () => {
    // Remove controls when leaving the display area
    mainVideo.removeAttribute('controls');
  });

  // Also add direct video hover for better responsiveness
  mainVideo.addEventListener('mouseenter', () => {
    mainVideo.setAttribute('controls', 'true');
  });
  
  mainVideo.addEventListener('mouseleave', () => {
    mainVideo.removeAttribute('controls');
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