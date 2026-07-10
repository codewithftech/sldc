export const globalVideoPlayer = (videoInstances) => {
  if (videoInstances.length) {
    videoInstances.forEach((videoInstance, index) => {
      const videoId = videoInstance.getAttribute("data-video-id");
      const videoFrame = videoInstance.querySelector("[data-video-frame]");
      const videoType = videoInstance.getAttribute("data-video-type");
      const targetButton = videoInstance.querySelector("[data-video-trigger]");
      const isBackgroundPlayer =
        videoInstance.getAttribute("data-background-player") === "true";
      const isAutoPlay =
        videoInstance.getAttribute("data-video-autoplay") === "true";
      if (videoType === "youtube") {
        const waitForYTApi = () => {
          if (!window.YT) {
            setTimeout(waitForYTApi, 1000);
          } else {
            let player;
            window.YT.ready(function () {
              if (YT) {
                videoFrame.setAttribute("id", videoType + index);
                videoFrame.setAttribute("tabindex", '-1');
                player = new YT.Player(videoFrame, {
                  height: "100%",
                  width: "100%",
                  videoId,
                  host: "https://www.youtube-nocookie.com",
                  playerVars: {
                    origin: window.location.host,
                    autoplay: isBackgroundPlayer || isAutoPlay ? 1 : 0,
                    disablekb: isBackgroundPlayer ? 1 : 0,
                    controls: isBackgroundPlayer ? 0 : 1,
                    showinfo: isBackgroundPlayer ? 0 : 1,
                    modestbranding: isBackgroundPlayer ? 1 : 0,
                    loop: isBackgroundPlayer ? 1 : 0,
                    fs: isBackgroundPlayer ? 0 : 1,
                    playsinline: isBackgroundPlayer ? 1 : 0,
                    rel: 0,
                    enablejsapi: 1,
                    playlist: videoId,
                  },
                  events: {
                    onReady: isBackgroundPlayer ? onPlayerReady : "",
                  },
                });
              }
              function onPlayerReady(event) {
                setTimeout(() => {
                  event.target.mute();
                  event.target.playVideo();
                }, 500);
              }
            });
          }
        };
        waitForYTApi();
      }

      if (videoType === "vimeo") {
        const waitForVimeoApi = () => {
          if (!window.Vimeo) {
            setTimeout(waitForVimeoApi, 1000);
          } else {
            const videoOptions = {
              id: videoId,
              autoplay: isBackgroundPlayer || isAutoPlay,
              background: isBackgroundPlayer,
            };
            const player = new Vimeo.Player(videoFrame, videoOptions);
          }
        };
        waitForVimeoApi();
      }
    });
  }
};
