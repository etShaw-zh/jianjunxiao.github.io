(function () {
  function initCarousel(carousel) {
    const slides = Array.from(carousel.querySelectorAll('[data-homepage-slide]'));
    const prevButton = carousel.querySelector('[data-homepage-prev]');
    const nextButton = carousel.querySelector('[data-homepage-next]');
    const dotsContainer = carousel.querySelector('[data-homepage-dots]');

    if (!slides.length || !prevButton || !nextButton || !dotsContainer) {
      return;
    }

    let activeIndex = Math.max(0, slides.findIndex(slide => slide.classList.contains('is-active')));
    if (activeIndex < 0) {
      activeIndex = 0;
    }

    const dots = slides.map((slide, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'selected-paper-carousel__dot';
      dot.setAttribute('aria-label', `Go to publication ${index + 1}`);
      dot.addEventListener('click', function () {
        setActive(index);
      });
      dotsContainer.appendChild(dot);
      return dot;
    });

    function setActive(index) {
      activeIndex = (index + slides.length) % slides.length;

      slides.forEach((slide, slideIndex) => {
        const isActive = slideIndex === activeIndex;
        slide.classList.toggle('is-active', isActive);
        slide.setAttribute('aria-hidden', String(!isActive));
      });

      dots.forEach((dot, dotIndex) => {
        dot.classList.toggle('is-active', dotIndex === activeIndex);
        dot.setAttribute('aria-pressed', String(dotIndex === activeIndex));
      });
    }

    prevButton.addEventListener('click', function () {
      setActive(activeIndex - 1);
    });

    nextButton.addEventListener('click', function () {
      setActive(activeIndex + 1);
    });

    carousel.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        setActive(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        setActive(activeIndex + 1);
      }
    });

    carousel.tabIndex = 0;
    setActive(activeIndex);
  }

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-homepage-carousel]').forEach(initCarousel);
  });
})();
