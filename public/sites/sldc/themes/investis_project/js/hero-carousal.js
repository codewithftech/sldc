export const heroCarousel = (heroCarouselInstances) => {
  heroCarouselInstances.forEach((heroCarouselInstance) => {
    const swiperInstance = heroCarouselInstance.querySelector("[data-hero-swiper]");
    const prevButton = heroCarouselInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = heroCarouselInstance.querySelector("[data-arrow-button]:last-of-type");
    const carouselPagination = heroCarouselInstance.querySelector("[data-carousel-pagination]");
    const carouselCounter = heroCarouselInstance?.querySelector("[data-carousel-counter]");
    const galleryThumbs =heroCarouselInstance.querySelector("[gallery-thumbs]");
    let thumbs;

    if (galleryThumbs) {
      thumbs = new Swiper(galleryThumbs, {
        spaceBetween: 0,
        slidesPerView: "auto",
        freeMode: true,
        watchSlidesProgress: true,
        on: {
          init(swiper) {
            if (swiper.slides.length) {
              swiper.slides[0].classList.remove("panel-light");
              swiper.slides[0].classList.add("panel-dark");
            }
          },
          tap(swiper) {
            swiper.slides.forEach((slide) => {
              slide.classList.remove("panel-dark");
              slide.classList.add("panel-light");
            });
            swiper.clickedSlide.classList.remove("panel-light");
            swiper.clickedSlide.classList.add("panel-dark");
          },
        },
      });
    }

    const heroCarouselSwiper = new Swiper(swiperInstance, {
      slidesPerView: 1,
      freeMode: false,
      loop: false,
      spaceBetween: 0,
      autoHeight: true,
      loopedSlides: 1,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      pagination: {
        el: carouselPagination,
        clickable: true,
      },
      thumbs: {
        swiper: thumbs,
      },
      on: {
        init(sw) {
          if (carouselCounter) {
            carouselCounter.querySelector("[data-carousel-total]").textContent = sw.slides.length;
            carouselCounter.querySelector("[data-carousel-current]").textContent =
              sw.activeIndex + 1;
          }
        },
        slideChange(sw) {
          if (carouselCounter) {
            carouselCounter.querySelector("[data-carousel-current]").textContent =
              sw.activeIndex + 1;
          }
        },
      },
    });
  });
};
