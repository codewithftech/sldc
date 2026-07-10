export const imageCarousels = (dataImageCaraousel) => {
  dataImageCaraousel.forEach((imageCarouselInstance) => {
    const swiperThumbnail = imageCarouselInstance.querySelector("[data-image-carousel-thumb]");
    const swiperMain = imageCarouselInstance.querySelector("[data-image-carousel-main]");
    const prevButton = imageCarouselInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = imageCarouselInstance.querySelector("[data-arrow-button]:last-of-type");
    const carouselCounter = imageCarouselInstance.querySelector("[data-carousel-counter]");
    const carouselImages = imageCarouselInstance.querySelectorAll(".image-carousel__image img");

    let swiperThumbnails;
    if (swiperThumbnail) {
      swiperThumbnails = new Swiper(swiperThumbnail, {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 8,
        autoHeight: true,
        breakpoints: {
          0: { slidesPerView: 3 },
          576: { slidesPerView: 3 },
          768: { spaceBetween: 20, slidesPerView: 3 },
          992: { slidesPerView: 3 },
          1400: { slidesPerView: 5 },
        },
        slideToClickedSlide: false,
      });
    }

    const swiperMains = new Swiper(swiperMain, {
      slidesPerView: 1,
      effect: swiperThumbnail ? "fade" : "slide",
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      thumbs: {
        swiper: swiperThumbnails || null,
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
          if (swiperThumbnails) {
            swiperThumbnails.update();
          }
          updatePaginationTop();
        },
      },
    });

    function updatePaginationTop() {
      const carouselPagination = swiperMain.querySelector(".carousel-arrow");
      if (carouselPagination && carouselImages.length > 0) {
        let maxHeight = 0;
        carouselImages.forEach((image) => {
          const height = image.offsetHeight;
          if (height > maxHeight) {
            maxHeight = height;
          }
        });
        carouselPagination.style.top = `${maxHeight - 32}px`;
      }
    }

    window.addEventListener("resize", () => swiperMains.update());
    window.addEventListener("orientationchange", () => swiperMains.update());
  });
};
