export const tabs = (tabInstances) => {
  tabInstances?.forEach((tabInstance) => {
    const slideLength = tabInstance.querySelectorAll(".swiper-slide").length;
    if (!slideLength) {
      return;
    }
    const swiperInstance = tabInstance.querySelector("[data-tabs-swiper]");
    const slidesOnMobile =
      tabInstance.getAttribute("data-slides-mobile") === "auto"
        ? "auto"
        : parseInt(tabInstance.getAttribute("data-slides-mobile"), 10);
    const slidesOnTablet =
      tabInstance.getAttribute("data-slides-tablet") === "auto"
        ? "auto"
        : parseInt(tabInstance.getAttribute("data-slides-tablet"), 10);
    const slidesOnDesktop =
      tabInstance.getAttribute("data-slides-desktop") === "auto"
        ? "auto"
        : parseInt(tabInstance.getAttribute("data-slides-desktop"), 10);
    const prevButton = tabInstance?.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = tabInstance?.querySelector("[data-arrow-button]:last-of-type");
    const isDeepLinkingEnabled = tabInstance.hasAttribute("data-enable-deeplinking");
    const tabButtonList = swiperInstance.querySelectorAll("button");
    
    // Initialize Swiper
    const swiper = new Swiper(swiperInstance, {
      keyboard: true,
      autoScrollOffset: 2,
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
          slidesPerView: slidesOnDesktop > slideLength ? slideLength : slidesOnDesktop,
          enabled: !(slideLength <= slidesOnDesktop),
        },
      },
      navigation: {
        nextEl: nextButton,
        prevEl: prevButton,
      },
      autoHeight: true,
    });
    const addNavigationClickEvents = () => {
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
          // Optionally trigger child button click for the next slide
          const currentSlide = swiper.slides[swiper.activeIndex];
          const nextSlideChildButton = currentSlide.querySelector("button[data-bs-target]");
          if (nextSlideChildButton) {
            nextSlideChildButton.click();
          }
        });
      }
    };
    //addNavigationClickEvents();

    if (isDeepLinkingEnabled) {
      const tabButtons = swiperInstance.querySelectorAll("button[data-bs-toggle='tab']");
      if (tabButtons.length) {
        tabButtons.forEach((tabButton) => {
          tabButton.addEventListener("click", () => {
            const hash = tabButton.getAttribute("data-bs-target");
            window.history.replaceState(null, null, hash);
          });
        });

        const currentHash = window.location.hash;
        const targetTab = swiperInstance.querySelector(`button[data-bs-target='${currentHash}']`);
        if (targetTab) {
          targetTab.click();
        }
      }
    }

    // Tabs accessibility
    tabButtonList.forEach((currentTabButton) => {
      currentTabButton.addEventListener("click", () => {
        tabButtonList.forEach((tabButton) => {
          tabButton.setAttribute("tabindex", -1);
        });
        currentTabButton.removeAttribute("tabindex");
      });
      currentTabButton.addEventListener("focus", () => {
        tabButtonList.forEach((tabButton) => {
          tabButton.removeAttribute("tabindex");
        });
      });
    });
  });
};
