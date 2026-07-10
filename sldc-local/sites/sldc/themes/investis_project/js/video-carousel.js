export const videoCaraousels = (videoCaraouselInstances) => {
  videoCaraouselInstances.forEach((videoCaraouselInstance) => {
    const swiperThumbnail = videoCaraouselInstance.querySelector(
      "[data-video-caraousel-thumbnail]"
    );
    const swiperMain = videoCaraouselInstance.querySelector("[data-video-caraousel-main]");
    const prevButton = videoCaraouselInstance.querySelector("[data-arrow-button]:first-of-type");
    const nextButton = videoCaraouselInstance.querySelector("[data-arrow-button]:last-of-type");

    if (swiperThumbnail) {
      const swiperThumbnails = new Swiper(swiperThumbnail, {
        slidesPerView: 3,
        centeredSlides: false,
        spaceBetween: 8,
        autoHeight: true,
        direction: "horizontal",
        slideToClickedSlide: true,
        mousewheel: true,
        freeMode: true,
        breakpoints: {
          768: {
            spaceBetween: 24,
            direction: "vertical",
            slidesPerView: "auto",
            scrollbar: {
              el: videoCaraouselInstance.querySelector(".swiper-scrollbar"),
              
            },
          },
        },
      });

      if (swiperMain) {
        const swiperMains = new Swiper(swiperMain, {
          slidesPerView: 1,
          effect: "slide",
          navigation: {
            nextEl: nextButton,
            prevEl: prevButton,
          },
          thumbs: {
            swiper: swiperThumbnails,
          },
          on: {
            init() {
              setTimeout(() => {
                autoplayVideo(this);
              }, 300);
            },
            slideChange() {
              stopAllVideos(this);
              autoplayVideo(this);
            },
          },
        });
      }
    }

    function stopAllVideos(swiper) {
      swiper.slides.forEach((slide) => {
        const iframe = slide.querySelector("iframe");
        if (iframe) {
          const videoType = iframe.getAttribute("data-video-type");
          if (videoType === "youtube") {
            iframe.contentWindow.postMessage(
              '{"event":"command","func":"pauseVideo","args":""}',
              "*"
            );
          } else if (videoType === "vimeo") {
            iframe.contentWindow.postMessage(JSON.stringify({ method: "pause" }), "*");
          }
        }
      });
    }

    function autoplayVideo(swiper) {
      const activeSlide = swiper.slides[swiper.activeIndex];
      if (activeSlide) {
        const videoInstance = activeSlide.querySelector("[data-video-wrapper]");
        if (videoInstance) {
          const videoFrame = videoInstance.querySelector("iframe");
          if (videoFrame) {
            const videoType = videoInstance.getAttribute("data-video-type");

            if (videoType === "youtube") {
              videoFrame.contentWindow.postMessage(
                '{"event":"command","func":"playVideo","args":""}',
                "*"
              );
            } else if (videoType === "vimeo") {
              videoFrame.contentWindow.postMessage(JSON.stringify({ method: "play" }), "*");
            }
          }
        }
      }
    }
  });
};
