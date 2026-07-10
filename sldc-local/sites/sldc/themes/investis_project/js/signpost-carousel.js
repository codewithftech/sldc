export const signpostCarousel = (signpostCarouselInstances) => {
  signpostCarouselInstances.forEach((signpostCarouselInstance) => {
    const swiperInstance = signpostCarouselInstance.querySelector("[data-signpost-carousel]");
    const prevButton = signpostCarouselInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = signpostCarouselInstance.querySelector("[data-arrow-button]:last-of-type");
    const signpostSwiper = new Swiper(swiperInstance, {
      slidesPerView: 1.355,
      spaceBetween: 16,
      breakpoints: {
        360: {
          slidesPerView: 1.355,
          spaceBetween: 16,
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 16,
        },
        992: {
          slidesPerView: "auto",
          spaceBetween: 32,
        },
      },
      centeredSlides: false,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      keyboard: {
        enabled: true,
      },
    });
  });
};

 