export const verticaltabs = (verticaltabInstances) => {
  const initializeVerticalTabs = () => {
    verticaltabInstances.forEach((verticaltabInstance) => {
      const slideLength = verticaltabInstance.querySelectorAll(".swiper-slide").length;
      const prevButton = verticaltabInstance.querySelector("[data-arrow-button]:first-of-type");
      const nextButton = verticaltabInstance.querySelector("[data-arrow-button]:last-of-type");

      if (slideLength.length < 1) {
        return;
      }

      // Destroy any existing Swiper instance to avoid duplication
      if (verticaltabInstance.swiper) {
        verticaltabInstance.swiper.destroy(true, true);
      }

      // Initialize Swiper instance based on window width
      if (window.innerWidth < 768) {
        verticaltabInstance.swiper = new Swiper(verticaltabInstance, {
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
          direction: "horizontal",
          slidesPerView: 1,
        });
        if (prevButton) {
          prevButton.addEventListener("click", () => {
            const currentSlide =
              verticaltabInstance.swiper.slides[verticaltabInstance.swiper.activeIndex];
            const prevSlideChildButton = currentSlide.querySelector("[data-bs-target]");
            if (prevSlideChildButton) {
              prevSlideChildButton.click();
            }
          });
        }
        if (nextButton) {
          nextButton.addEventListener("click", () => {
            const currentSlide =
              verticaltabInstance.swiper.slides[verticaltabInstance.swiper.activeIndex];
            const nextSlideChildButton = currentSlide.querySelector("[data-bs-target]");
            if (nextSlideChildButton) {
              nextSlideChildButton.click();
            }
          });
        }
      }
    });
  };

  // Initial call to set up Swiper instances
  initializeVerticalTabs();

  // Add resize event listener to handle window resizing
  window.addEventListener("resize", () => {
    initializeVerticalTabs();
  });
};


//To handle aria-selected and active class dynamically

jQuery(document).ready(function () {
  jQuery('.tabbed-feature-content__tab-item').on('click', function () {
    jQuery('.tabbed-feature-content__tab-item').attr('aria-selected', 'false').removeClass('active');
    jQuery('.tabbed-feature-content__pan').removeClass('active show h-100');

    jQuery(this).attr('aria-selected', 'true').addClass('active');

    let targetPanel = jQuery(this).attr('aria-controls');

    jQuery('#' + targetPanel).addClass('active show h-100');
  });

  jQuery('.tabbed-feature-content__tab-item').first().attr('aria-selected', 'true').addClass('active');
  let firstPanelId = jQuery('.tabbed-feature-content__tab-item').first().attr('aria-controls');
  jQuery('#' + firstPanelId).addClass('active show h-100');

  
  jQuery('.swiper-backface-hidden .arrow-button').on('click', function () {
    jQuery('.swiper-backface-hidden .swiper-slide.swiper-slide-active .tabbed-feature-content__tab-item').trigger('click');
  });
});





