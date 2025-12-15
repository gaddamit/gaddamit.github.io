document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".projects-carousel").forEach((carousel) => {
    const slides = carousel.querySelectorAll(".carousel-slide");
    const prevBtn = carousel.querySelector(".prev");
    const nextBtn = carousel.querySelector(".next");
    let currentIndex = 0;

    function showSlide(index) {
      const width = slides[0].clientWidth;
      const container = carousel.querySelector(".carousel-container");
      container.style.transform = `translateX(${-width * index}px)`;
    }

    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    });

    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + slides.length) % slides.length;
      showSlide(currentIndex);
    });

    // Optional autoplay per carousel
    setInterval(() => {
      currentIndex = (currentIndex + 1) % slides.length;
      showSlide(currentIndex);
    }, 5000);
  });
});
