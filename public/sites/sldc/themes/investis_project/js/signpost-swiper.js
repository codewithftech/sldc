export const signpostSwiper = (signpostSwiperInstances) => {
  signpostSwiperInstances.forEach((signpostSwiperInstance) => {
    const noOfSlides = signpostSwiperInstance.querySelectorAll(".swiper-slide").length;
    if (!noOfSlides) {
      return;
    }

    // Get required ui elements for swiper
    const prevButton = signpostSwiperInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = signpostSwiperInstance.querySelector("[data-arrow-button]:last-of-type");
    const signpostPagination = signpostSwiperInstance.querySelector("[data-carousel-pagination]");

    // Settings for the swiper for diffrent devices
    const slidesPerViewAttr = signpostSwiperInstance.getAttribute("data-slides-per-view");
    const tabletSlidesPerViewAttr = signpostSwiperInstance.getAttribute(
      "data-tablet-slides-per-view"
    );
    const mobileSlidesPerViewAttr = signpostSwiperInstance.getAttribute(
      "data-mobile-slides-per-view"
    );
    const disableSwiperFromTablet = signpostSwiperInstance.hasAttribute(
      "data-disable-slider-tablet"
    );
    const disableSwiperOnDesktop = signpostSwiperInstance.hasAttribute(
      "data-disable-slider-desktop"
    );
    const withoutSpacing = signpostSwiperInstance.hasAttribute("data-without-spacing");

    // Set the slide configuration based on the settings
    const defaultSlidesPerView = parseInt(slidesPerViewAttr, 10) || 2;
    const tabletSlidesPerView = parseInt(tabletSlidesPerViewAttr, 10) || defaultSlidesPerView;
    const mobileSlidesPerView = parseFloat(mobileSlidesPerViewAttr) || 1.355;
    const spaceBetweenDesktop = withoutSpacing || noOfSlides < 2 ? 0 : 32;
    const spaceBetweenTablet = withoutSpacing || noOfSlides < 2 ? 0 : 16;
    const spaceBetweenmobile = withoutSpacing || noOfSlides < 2 ? 0 : 16;

    let swiper;

    const swiperConfig = {
      autoHeight: true,
      paginationClickable: true,
      centeredSlides: false,
      slidesPerView: defaultSlidesPerView,
      spaceBetween: 16,
      slidesOffsetAfter: 0,
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      pagination: {
        el: signpostPagination,
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: mobileSlidesPerView,
          spaceBetween: spaceBetweenmobile,
        },
        768: {
          slidesPerView: tabletSlidesPerView,
          spaceBetween: spaceBetweenTablet,
          slidesOffsetAfter: 0,
        },
        1200: {
          slidesPerView: defaultSlidesPerView,
          spaceBetween: spaceBetweenDesktop,
        },
      },
    };

    if (disableSwiperFromTablet && window.innerWidth < 768) {
      swiper = new Swiper(signpostSwiperInstance, swiperConfig);
    }

    if (
      (!disableSwiperOnDesktop || window.innerWidth < 1200) &&
      (!disableSwiperFromTablet || window.innerWidth < 768)
    ) {
      swiper = new Swiper(signpostSwiperInstance, swiperConfig);
    }
  });
};
