export const signpost = (signpostInstances) => {
  signpostInstances.forEach((signpostInstance) => {
    const swiperInstance = signpostInstance.querySelector("[signpost-swiper]");
    const prevButton = signpostInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = signpostInstance.querySelector("[data-arrow-button]:last-of-type");
    const signpostPagination = signpostInstance.querySelector("[data-carousel-pagination]");

    const slidesPerViewAttr = swiperInstance.getAttribute("slides-per-view");
    const tabletSlidesPerViewAttr = swiperInstance.getAttribute("tablet-slides-per-view");
    const mobileSlidesPerViewAttr = swiperInstance.getAttribute("mobile-slides-per-view");
    const disableSwiperOnDesktop = swiperInstance.hasAttribute("disableslider-desktop");

    const defaultSlidesPerView = parseInt(slidesPerViewAttr, 10) || 2;
    const tabletSlidesPerView = parseInt(tabletSlidesPerViewAttr, 10) || defaultSlidesPerView;
    const mobileSlidesPerView = parseFloat(mobileSlidesPerViewAttr) || 1.4;

    const swiperConfig = {
      autoHeight: false,
      paginationClickable: true,
      centeredSlides: false,
      slidesPerView: defaultSlidesPerView,
      spaceBetween: 16,
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
        },
        768: {
          slidesPerView: tabletSlidesPerView,
          spaceBetween: 16,
        },
        992: {
          slidesPerView: defaultSlidesPerView,
          spaceBetween: 32,
        },
      },
    };
    if (!disableSwiperOnDesktop || (disableSwiperOnDesktop && window.innerWidth < 1024)) {
      const signpostCarousel = new Swiper(swiperInstance, swiperConfig);
    }
  });

  // signpost hover Animation
  const signposts = document.querySelectorAll(".bg-signpost");
  signposts?.forEach((signpost) => {
    const title = signpost.querySelector(".bg-signpost__title");
    const description = signpost.querySelector(".bg-signpost__description");
    signpost.addEventListener("mouseenter", function () {
      const descriptionHeight = description.offsetHeight;
      title.style.bottom = `${descriptionHeight}px`;
    });
    signpost.addEventListener("mouseleave", function () {
      title.style.bottom = "";
    });
  });
};
