export const largeSignposts = (largeSignpostInstances) => {
  largeSignpostInstances.forEach((largeSignpostInstance) => {
    const swiperInstance = largeSignpostInstance.querySelector("[data-large-signpost-swiper]");
    const prevButton = largeSignpostInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = largeSignpostInstance.querySelector("[data-arrow-button]:last-of-type");
    const largeSignpostSwiper = new Swiper(swiperInstance, {
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
    });
  });
};
