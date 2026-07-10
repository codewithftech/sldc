document.addEventListener("DOMContentLoaded", () => {
  var tabsContainer = document.querySelector('.tabs-for-slider');

  if (tabsContainer) {
      var tabsWrapper = tabsContainer.querySelector('.container .row');
      var swiperWrapper = tabsContainer.querySelector('.tab-list');
      var swiperSlides = tabsContainer.querySelectorAll('.tab.link');

      // Ensure the row is a Swiper container
      if (tabsWrapper) {
          tabsWrapper.classList.add('swiper');
      }

      // Ensure the tab list is the Swiper wrapper
      if (swiperWrapper) {
          swiperWrapper.classList.add('swiper-wrapper');
      }

      // Ensure each tab is a Swiper slide
      swiperSlides.forEach(function (slide) {
          slide.classList.add('swiper-slide');
      });

      // Function to add navigation buttons inside .tabs-for-slider .swiper
      function addNavigationButtons(tabsContainer) {
          const swiperContainer = tabsContainer.querySelector(".swiper");

          if (swiperContainer) {
              const prevButton = document.createElement('div');
              prevButton.classList.add('swiper-button-prev');

              const nextButton = document.createElement('div');
              nextButton.classList.add('swiper-button-next');

              // Append buttons inside .swiper (not .swiper-wrapper)
              swiperContainer.appendChild(prevButton);
              swiperContainer.appendChild(nextButton);

              return { prevButton, nextButton };
          }
          return {};
      }

      const tabs = (tabInstances) => {
          tabInstances?.forEach((tabInstance) => {
              const slidesOnMobile = parseInt(tabInstance.getAttribute("data-slides-mobile"), 10) || 1;
              const slidesOnTablet = parseInt(tabInstance.getAttribute("data-slides-tablet"), 10) || 2;
              const slidesOnDesktop = parseInt(tabInstance.getAttribute("data-slides-desktop"), 10) || 5;
              const tabsList = tabInstance.querySelector(".tab-list");
              const slideLength = tabInstance.querySelectorAll(".swiper-slide").length;

              // Add next/prev buttons inside .swiper
              const { prevButton, nextButton } = addNavigationButtons(tabsContainer);

              // Initialize Swiper
              const swiper = new Swiper(tabInstance, {
                  slidesPerView: slideLength > slidesOnDesktop ? slidesOnDesktop : 3,
                  spaceBetween: 10,
                  breakpoints: {
                      320: {
                          slidesPerView: slidesOnMobile,
                          enabled: !(slideLength <= slidesOnMobile),
                      },
                      768: {
                          slidesPerView: slidesOnTablet,
                          enabled: !(slideLength <= slidesOnTablet),
                      },
                      1024: {
                          slidesPerView: slideLength > slidesOnDesktop ? slidesOnDesktop : 3,
                          enabled: !(slideLength <= slidesOnDesktop),
                      },
                  },
                  navigation: {
                      nextEl: nextButton,
                      prevEl: prevButton,
                  },
                  autoHeight: true,
                  on: {
                      init() {
                          updateTabsWidth();
                      },
                      resize() {
                          updateTabsWidth();
                      },
                      slideChange() {
                          updateTabsWidth();
                      },
                  },
              });

              const addNavigationClickEvents = () => {
                  if (window.innerWidth <= 768) {
                      if (prevButton) {
                          prevButton.addEventListener("click", () => {
                              swiper.slidePrev();
                              const currentSlide = swiper.slides[swiper.activeIndex];
                              const prevSlideChildButton = currentSlide.querySelector("button[data-bs-target]");
                              if (prevSlideChildButton) {
                                  prevSlideChildButton.click();
                              }
                          });
                      }
                      if (nextButton) {
                          nextButton.addEventListener("click", () => {
                              swiper.slideNext();
                              const currentSlide = swiper.slides[swiper.activeIndex];
                              const nextSlideChildButton = currentSlide.querySelector("button[data-bs-target]");
                              if (nextSlideChildButton) {
                                  nextSlideChildButton.click();
                              }
                          });
                      }
                  }
              };

              // Function to update the width of the tabs and tab-list
              function updateTabsWidth() {
                  if (tabsList) {
                      const isNextButtonDisabled =
                          nextButton?.classList.contains("swiper-button-disabled") &&
                          prevButton?.classList.contains("swiper-button-disabled");

                      if (isNextButtonDisabled) {
                          tabInstance.classList.add("full-width");
                          tabInstance.classList.remove("reduced-width");
                          tabsList.classList.add("full-width");
                          tabsList.classList.remove("reduced-width");
                      } else {
                          tabInstance.classList.add("reduced-width");
                          tabInstance.classList.remove("full-width");
                          tabsList.classList.add("reduced-width");
                          tabsList.classList.remove("full-width");
                      }
                  }
              }

              // Initial check and set width
              updateTabsWidth();
              if (window.innerWidth <= 768) {
                  addNavigationClickEvents();
              }
          });
      };

      // Initialize tabs when the DOM is fully loaded
      const tabInstances = document.querySelectorAll(".swiper");
      tabs(tabInstances);
  }
});
