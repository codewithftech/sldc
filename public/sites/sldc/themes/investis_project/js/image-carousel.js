export const imageCarousel = (imageCarouselInstances) => {
  imageCarouselInstances.forEach((imageCarouselInstance) => {
    const mainCarouselInstance = imageCarouselInstance.querySelector("[data-image-carousel-main]");
    const thumbnailCarouselInstance = imageCarouselInstance.querySelector(
      "[data-image-carousel-thumb]"
    );
    const prevButton = imageCarouselInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = imageCarouselInstance.querySelector("[data-arrow-button]:last-of-type");
    const carouselCounter = imageCarouselInstance.querySelector("[data-carousel-counter]");
    let thumbnailCarousel;
    if (thumbnailCarouselInstance) {
      const thumbNextButton = thumbnailCarouselInstance.nextElementSibling;
      const thumbPrevButton = thumbnailCarouselInstance.previousElementSibling;

      thumbnailCarousel = new Swiper(thumbnailCarouselInstance, {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 8,
        autoHeight: true,
        navigation: {
          nextEl: thumbNextButton,
          prevEl: thumbPrevButton,
        },
        breakpoints: {
          768: { spaceBetween: 20 },
          1200: { spaceBetween: 24, slidesPerView: 5 },
        },
        slideToClickedSlide: true,
      });
    }

    const mainCarousel = new Swiper(mainCarouselInstance, {
      slidesPerView: 1,
      autoHeight: true,
      effect: thumbnailCarouselInstance ? "fade" : "slide",
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      thumbs: {
        swiper: thumbnailCarousel || null,
      },
      on: {
        init(sw) {
          if (carouselCounter) {
            carouselCounter.querySelector("[data-carousel-total]").textContent = sw.slides.length;
            carouselCounter.querySelector("[data-carousel-current]").textContent =
              sw.activeIndex + 1;
          }
          updatePaginationTop();
        },
        slideChange(sw) {
          if (carouselCounter) {
            carouselCounter.querySelector("[data-carousel-current]").textContent =
              sw.activeIndex + 1;
          }
        },
        resize(sw) {
          if (thumbnailCarousel) {
            thumbnailCarousel.update();
          }
          updatePaginationTop();
        },
      },
    });

    function updatePaginationTop() {
      if (carouselCounter) {
        if (window.matchMedia("(max-width: 767px)").matches) {
          const imageHeight =
            imageCarouselInstance.querySelector(".swiper-slide > div").offsetHeight;
          carouselCounter.parentElement.style.top = `${imageHeight - 34}px`;
          carouselCounter.parentElement.style.bottom = "auto";
        } else {
          carouselCounter.parentElement.style.top = "auto";
          carouselCounter.parentElement.style.bottom = "0px";
        }
      }
    }
    window.addEventListener("resize", () => mainCarousel.update());
    window.addEventListener("orientationchange", () => mainCarousel.update());
  });
};


