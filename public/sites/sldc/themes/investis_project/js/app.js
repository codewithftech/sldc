const IDX_DS = {
  init: () => {
    const lazyLoadInstance = new LazyLoad({});
    // Global Animation
    const animatedElements = document.querySelectorAll("[data-animate]");
    /* if (animatedElements.length) {
      import("./global-animations.js").then((globalAnimationModule) => {
        globalAnimationModule.globalAnimation(animatedElements);
        window.addEventListener("scroll", () => {
          window.addEventListener(
            "scroll",
            globalAnimationModule.globalAnimation(animatedElements)
          );
        });
      });
    } */
      if (animatedElements.length) {
        import("./global-animations.js").then(() => {
          const animateOnScroll = () => window.globalAnimation(animatedElements);
          animateOnScroll();
          window.addEventListener("scroll", animateOnScroll);
        });
      }
    
    // Counting animation for all [data-counter] attribute elements
    const counterElements = document.querySelectorAll("[data-counter]:not(.counted)");
    if (!document.querySelector(".layout-builder")) {
      if (counterElements.length) {
        const interaction = new IntersectionObserver(
          (entries, observer) => {
            entries.forEach((entry) => {
              if (entry.intersectionRatio > 0) {
                IDX_DS.counterAnimation(entry.target, 0, entry.target.textContent, 2000);
                observer.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.25 }
        );
        counterElements.forEach((obs) => {
          if (!obs.classList.contains("counted")) {
            interaction.observe(obs);
          }
        });
      }
    }

    // Global Dropdowns
    const dropdownInstances = document.querySelectorAll("[data-dropdown]");
    if (dropdownInstances.length) {
      import("./dropdown.js").then((globalDropdownModule) => {
        globalDropdownModule.globalDropdown(dropdownInstances);
      });
    }

    // Hero Carousal
    const heroCarouselInstances = document.querySelectorAll("[data-hero-carousel]");
    if (heroCarouselInstances.length) {
      import("./hero-carousal.js").then((heroCarouselModule) => {
        heroCarouselModule.heroCarousel(heroCarouselInstances);
      });
    }

    // Signpost
    const signpostInstances = document.querySelectorAll("[signpost-carousel]");
    if (signpostInstances.length) {
      import("./signpost.js").then((signpostModule) => {
        signpostModule.signpost(signpostInstances);
      });
    }

    // Video Player
    const videoInstances = document.querySelectorAll("[data-video-wrapper]");
    if (videoInstances.length) {
      // loadScript("https://www.youtube.com/iframe_api"), // Load YouTube API
      // loadScript("https://player.vimeo.com/api/player.js"), // Load Vimeo API
      import("./video-player.js").then((videoPlayer) => {
        videoPlayer.globalVideoPlayer(videoInstances);
      });
    }

    // BOD popup
    const bodInstances = document.querySelectorAll("[data-bod]");
    if (bodInstances.length) {
      import("./board-of-director.js").then((bodModule) => {
        bodModule.bod(bodInstances);
      });
    }

    // Horizontal Tabs Swiper
    const tabInstances = document.querySelectorAll("[data-tabs]");
    if (tabInstances.length) {
      /* import("./tab.js").then((tabMolecule) => {
        tabMolecule.tabs(tabInstances);
      }); */
      import("./tabs-collection.js").then((tabModule) => {
        tabModule.tabs(tabInstances);
      });
    }

    // Static Tabs Swiper
    // const tabslider = document.querySelectorAll(".tabs-for-slider");
  
    // if (tabslider.length) {
    //   import("./tab-slider.js").then((module) => {
    //     module.tabs(tabslider);
    //   }).catch((error) => {
    //     console.error("Error loading tab-slider.js:", error);
    //   });
    // }
    

    // Vertical Tabs Swiper
    const verticaltabInstances = document.querySelectorAll("[data-vertical-tabs]");
    if (verticaltabInstances.length) {
      import("./vertical-tab.js").then((verticaltabModule) => {
        verticaltabModule.verticaltabs(verticaltabInstances);
      });
    }

    // Large Signpost Swiper
    const largeSignpostInstances = document.querySelectorAll("[data-large-signpost-carousel]");
    if (largeSignpostInstances.length) {
      import("./large-signpost.js").then((largeSignpostModule) => {
        largeSignpostModule.largeSignposts(largeSignpostInstances);
      });
    }

    // Table inside RTE
    const tableInstances = document.querySelectorAll(".rte table");
    if (tableInstances.length) {
      import("./rte.js").then((tableInstance) => {
        tableInstance.tables(tableInstances);
      });
    }

    // Large Image Accordion
    const largeImageAccordionInstances = document.querySelectorAll("[data-large-image-accordion]");
    if (largeImageAccordionInstances.length) {
      import("./large-image-accordion.js").then((largeImageAccordions) => {
        largeImageAccordions.largeImageAccordion(largeImageAccordionInstances);
      });
    }

    // Share buttons
    const shareInstances = document.querySelectorAll("[data-share-btns]");
    if (shareInstances.length) {
      import("./share-button.js").then((shareButtons) => {
        shareInstances.forEach((instance) => {
          shareButtons.attachShareListeners(instance);
        });
      });
    }

    // Financial calendar
    const financialCalendarCarouselInstances = document.querySelectorAll(
      "[data-financial-calendar-carousel]"
    );
    if (financialCalendarCarouselInstances.length) {
      import("./financial-calender.js").then((financialCalendarCarouselModule) => {
        financialCalendarCarouselModule.financialCalendarCarousel(
          financialCalendarCarouselInstances
        );
      });
    }

    // Signpost Carousel
   
    const signpostCarouselInstances = document.querySelectorAll("[data-signpost-carousel-wrapper]");
    if (signpostCarouselInstances.length) {
      import("./signpost-carousel.js").then((signpostCarousel) => {
        signpostCarousel.signpostCarousel(signpostCarouselInstances);
      });
    }
    // Image Carousel
    const imageCaraouselInstances = document.querySelectorAll("[data-image-carousel-wrapper]");
    if (imageCaraouselInstances.length) {
      import("./image-carousel.js").then((signpostCaraousel) => {
        signpostCaraousel.imageCaraousels(imageCaraouselInstances);
      });
    }
    // video Carousel
    const videoCaraouselInstances = document.querySelectorAll("[data-video-caraousel-wrapper]");
    if (videoCaraouselInstances.length) {
      import("./video-carousel.js").then((videoCarousel) => {
        videoCarousel.videoCaraousels(videoCaraouselInstances);
      });
    }
    // data Carousel
    const dataImageCarousel = document.querySelectorAll("[data-image-carousel]");
    if (dataImageCarousel.length) {
      import("./data-caraousel.js").then((module) => {
        module.imageCarousels(dataImageCarousel);
      });
    }
    // video Carousel
    const videoCarouselInstances = document.querySelectorAll("[data-video-carousel]");
    if (videoCarouselInstances.length) {
      import("./video-carousel-ns.js").then((videoCarouselModule) => {
        videoCarouselModule.videoCarousel(videoCarouselInstances);
      });
    }

    // Signpost Swipers
    const signpostSwiperInstances = document.querySelectorAll("[data-signpost-swiper]");
    if (signpostSwiperInstances.length) {
      import("./signpost-swiper.js").then((signpostSwiperModule) => {
        signpostSwiperModule.signpostSwiper(signpostSwiperInstances);
      });
    }

    // In Page Navigation
    const inPageNavInstance = document.querySelector("[data-in-page-nav]");
    if (inPageNavInstance) {
      import("./in-page-nav.js").then((inPageNavModule) => {
        inPageNavModule.inPageNav(inPageNavInstance);
      });
    }

    // Share Price Tracker
    const sharePriceCaraouselInstances = document.querySelectorAll("[data-share-price]");
    if (sharePriceCaraouselInstances.length) {
      import("./share-price-tracker.js").then((sharepriceCarousal) => {
        sharepriceCarousal.sharePriceCaraousels(sharePriceCaraouselInstances);
      });
    }
  },
  
  //Global counterAnimation
  counterAnimation(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      obj.innerHTML = Math.floor(progress * (end - start) + start);
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }

};
document.addEventListener("DOMContentLoaded", IDX_DS.init(), false);
