export const videoCarousel = (videoCarouselInstances) => {
  videoCarouselInstances.forEach((videoCarouselInstance) => {
    const thumbnailCarouselInstance = videoCarouselInstance.querySelector(
      "[data-video-carousel-thumbnail]"
    );
    const mainCarouselInstance = videoCarouselInstance.querySelector("[data-video-carousel-main]");
    const prevButton = videoCarouselInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = videoCarouselInstance.querySelector("[data-arrow-button]:last-of-type");

    if (thumbnailCarouselInstance) {
      
      const slides = thumbnailCarouselInstance.querySelectorAll('.swiper-slide');
      const enableScrollbar = slides.length > 4; // Enable scrollbar only if more than 4 slides
      const thumbnailCarousel = new Swiper(thumbnailCarouselInstance, {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 8,
        autoHeight: true,
        direction: "horizontal",
        slideToClickedSlide: true,
        mousewheel: true,
        freeMode: true,
        navigation: {
          nextEl: nextButton,
          prevEl: prevButton,
        },
        breakpoints: {
          768: {
            spaceBetween: 24,
            direction: "vertical",
            slidesPerView: "auto",
            scrollbar: enableScrollbar
              ? {
                  el: videoCarouselInstance.querySelector(".swiper-scrollbar"),
                  draggable: true,
                }
              : false, // Disable scrollbar if 4 or fewer items
          },
        },
      });
      //   breakpoints: {
      //     768: {
      //       spaceBetween: 24,
      //       direction: "vertical",
      //       slidesPerView: "auto",
      //       scrollbar: {
      //         el: videoCarouselInstance.querySelector(".swiper-scrollbar"),
      //       },
      //     },
      //   },
      // });

      if (mainCarouselInstance) {
        const mainCarousel = new Swiper(mainCarouselInstance, {
          slidesPerView: 1,
          effect: "slide",

          thumbs: {
            swiper: thumbnailCarousel,
          },
          on: {
            slideChange() {
              autoplayVideo(this);
            },
          },
        });
      }
    }

    function autoplayVideo(mainSwiperInstance) {
      mainSwiperInstance.slides.forEach((slide) => {
        const videoInstance = slide.querySelector("[data-video-wrapper]");
        videoController(videoInstance, "pause");
      });
      const activeSlide = mainSwiperInstance.slides[mainSwiperInstance.activeIndex];
      if (activeSlide) {
        const videoInstance = activeSlide.querySelector("[data-video-wrapper]");
        videoController(videoInstance, "play");
      }
    }

    function videoController(videoInstance, triggerType) {
      if (videoInstance) {
        const videoFrame = videoInstance.querySelector("iframe");
        const videoType = videoInstance.getAttribute("data-video-type");
        if (videoFrame) {
          if (videoType === "youtube") {
            if (triggerType === "play") {
              videoFrame.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            }
            if (triggerType === "pause") {
              videoFrame.contentWindow.postMessage(
                '{"event":"command","func":"pauseVideo","args":""}',
                "*"
              );
            }
          } else if (videoType === "vimeo") {
            if (triggerType === "play") {
              videoFrame.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
            }
            if (triggerType === "pause") {
              videoFrame.contentWindow.postMessage(JSON.stringify({ method: "pause" }), "*");
            }
          }
        } else {
          if (videoType === "brightcove") {
            const brightcovePlayer = videoInstance.querySelector(".inv_playerContainer");
            const brightcovePlayerInstance = $j(brightcovePlayer);
            brightcovePlayerInstance.InvPlayer().done((e) => {
              if (triggerType === "play") {
                e.playVideo();
              }
              if (triggerType === "pause") {
                e.pauseVideo();
              }
            });
          }
          if (videoType === "html5") {
            const videoElement = videoInstance.querySelector("video");
            if (triggerType === "play") {
              videoElement.play();
            }
            if (triggerType === "pause") {
              videoElement.pause();
            }
          }
        }
      }
    }
  });
};
