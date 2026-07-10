export const financialCalendarCarousel = (financialCalendarCarouselInstances) => {
    if (financialCalendarCarouselInstances.length) {
      financialCalendarCarouselInstances.forEach((financialCalendarCarouselInstance) => {
        let financialCalendarCarouselSwiper;
        if (window.innerWidth <= 767) {
          financialCalendarCarouselSwiper = new Swiper(financialCalendarCarouselInstance, {
            spaceBetween: 20,
            slidesPerView: 1.3,
            slidesOffsetAfter: 28,
          });
        }
        window.addEventListener("resize", () => {
          if (window.innerWidth >= 768) {
            financialCalendarCarouselSwiper.destroy(true, true);
          }
        });
      });
    }
  };
  