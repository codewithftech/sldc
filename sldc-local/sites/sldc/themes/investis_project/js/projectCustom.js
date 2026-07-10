(function ($, Drupal, drupalSettings) {
  "use strict";
  Drupal.behaviors.IDXDesignSystem = {
    attach: function (context, drupalSettings) {
      globalJS();
      jsForLargeScreen();
      financialCalandarAccordion();
      tabClick();
      tabsIntoSlider();
      bodPopupWithSlider();
      videoPopup();
      videoPlayPause();
      tabActive();
      mediaGalleryPopup();
      submenuClose();

      selectToSelect2();
      if (jQuery("#timer-not-found").length > 0) {
        countDown();
      }
      // Resize JS
      jQuery(window).resize(function () {
        jsForLargeScreen();
      });

      // Window width below 1200px
      if (jQuery(window).width() > 1200) {
        jsForLargeScreen();
      }
    },
  };
})(jQuery, Drupal, drupalSettings);

// Tab Clicking
function tabClick() {
  jQuery(".tab-list .tab").each(function () {
    jQuery(this).on("click", function (e) {
      e.preventDefault();
      var $selectItem = jQuery(this);
      var $ariaControls = $selectItem.attr("aria-controls");
      $selectItem
        .parents(".tab-list")
        .find(".tab")
        .attr("aria-selected", "false");
      $selectItem.attr("aria-selected", "true");
      $selectItem
        .parents(".tabs")
        .find(".tab-panel")
        .hide()
        .attr("hidden", true);
      $selectItem
        .parents(".tabs")
        .find("#" + $ariaControls)
        .show()
        .removeAttr("hidden");
    });
  });
}

// BOD Card Popup with Slider
function bodPopupWithSlider() {
  jQuery(".bod--popup").each(function () {
    var $popupWrapper = jQuery(this);

    $popupWrapper
      .find(".modal .icon-chevron-left, .modal .icon-chevron-right")
      .each(function () {
        jQuery(this).removeAttr("disabled");
      });

    $popupWrapper
      .find(".profiles__wrapper .profile-card")
      .on("click", function () {
        var modalId = jQuery(this).attr("data-bs-target");
        var $modal = $popupWrapper.find(modalId);
        if ($modal.length) {
          openModal($modal);
        }
      });

    $popupWrapper.find(".modal .icon-chevron-right").on("click", function () {
      var $currentModal = jQuery(this).closest(".modal");
      var $allModals = $popupWrapper.find(".modal");
      var currentIndex = $allModals.index($currentModal);
      var nextIndex = (currentIndex + 1) % $allModals.length;
      var $nextModal = $allModals.eq(nextIndex);

      closeModal($currentModal);
      openModal($nextModal);
    });

    $popupWrapper.find(".modal .icon-chevron-left").on("click", function () {
      var $currentModal = jQuery(this).closest(".modal");
      var $allModals = $popupWrapper.find(".modal");
      var currentIndex = $allModals.index($currentModal);

      var prevIndex =
        (currentIndex - 1 + $allModals.length) % $allModals.length;
      var $prevModal = $allModals.eq(prevIndex);

      closeModal($currentModal);
      openModal($prevModal);
    });

    $popupWrapper
      .find(".modal .icon-close, .modal .action-button")
      .on("click", function () {
        var $currentModal = jQuery(this).closest(".modal");
        closeModal($currentModal);
      });

    $popupWrapper.find(".modal").on("click", function (event) {
      if (jQuery(event.target).is(".modal")) {
        closeModal(jQuery(this));
      }
    });

    function openModal($modal) {
      if ($modal.length) {
        $modal.fadeIn(300).addClass("custom-modal-open");
        jQuery("body").addClass("modal-open").css("overflow", "hidden");
      }
    }

    function closeModal($modal) {
      if ($modal.length) {
        $modal.fadeOut(300).removeClass("custom-modal-open");
        if (jQuery(".modal.custom-modal-open").length === 0) {
          jQuery("body").removeClass("modal-open").css("overflow", "");
        }
      }
    }
  });
}

// Convert Tabs into Slider
function tabsIntoSlider() {
  if (jQuery(".tab-list").find(".tab.link").length > 3) {
    jQuery(".tab-list")
      .not(".slick-initialized")
      .slick({
        dots: false,
        infinite: false,
        speed: 300,
        arrows: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        // focusOnSelect: false,
        prevArrow:
          '<button type="button" class="icon-chevron-left arrow-button arrow-button--transparent"></button>',
        nextArrow:
          '<button type="button" class="icon-chevron-right arrow-button arrow-button--transparent"></button>',
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 2,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
            },
          },
        ],
      });
  }
}

// Financial Calendar Accordion
function financialCalandarAccordion() {
  jQuery(".accordion__button")
    .attr("aria-expanded", "false")
    .addClass("collapsed");
  jQuery(".accordion__content").css("display", "none");

  jQuery(".accordion__button")
    .off("click")
    .on("click", function () {
      var button = jQuery(this);
      var content = button
        .closest(".accordion__item")
        .find(".accordion__content");

      var isExpanded = button.attr("aria-expanded") === "true";

      jQuery(".accordion__button")
        .attr("aria-expanded", "false")
        .addClass("collapsed");
      jQuery(".accordion__content").css("display", "none");

      if (!isExpanded) {
        button.attr("aria-expanded", "true").removeClass("collapsed");
        content.css("display", "block");
      }
    });
}

// Global JS
function globalJS() {
  jQuery('[description="cookieSettingLink"] a').attr('id', 'cc-CookieSetting');
  jQuery('[description="cookieSettingLink"] a').attr('href', 'javascript:void(0);');
  jQuery('[description="cookieSettingLink"] a').removeAttr('title')
  jQuery(".tab-list div.more-tabs").remove();
  jQuery(".inpage-nav-main--wrapper").append(jQuery(".in-page-nav").detach());
  jQuery('.tab-panel, .tabs__content ').attr('tabindex', '-1');
}

// Footer Social Media Detach and Append
function jsForLargeScreen() {
  jQuery("#block-investis-project-socialmedialinks")
    .detach()
    .appendTo("#block-investis-project-contact");
}

// Video Play-Pause
function videoPlayPause() {
  jQuery("[data-video-trigger], [data-action-button]").on("click", function () {
    var $button = jQuery(this);
    var $videoInstance = $button.closest("[data-video-wrapper]");
    var videoType = $videoInstance.attr("data-video-type");
    var $videoFrame = $videoInstance.find("iframe");
    var $html5Video = $videoInstance.find("video");
    var currentStatus = $button.attr("data-current-status");

    if (currentStatus === "pause") {
      $button
        .attr("data-current-status", "play")
        .removeClass("icon-pause")
        .addClass("icon-play");

      // Handle YouTube & Vimeo
      if (videoType === "youtube" || videoType === "vimeo") {
        if ($videoFrame.length) {
          var message =
            videoType === "youtube"
              ? { event: "command", func: "pauseVideo", args: "" }
              : { method: "pause" };

          $videoFrame[0].contentWindow.postMessage(
            JSON.stringify(message),
            "*"
          );
        }
      }
      // Handle Brightcove & HTML5 Videos
      else if (
        (videoType === "brightcove" || videoType === "html5") &&
        $html5Video.length
      ) {
        $html5Video[0].pause();
      }
    } else if (currentStatus === "play") {
      $button
        .attr("data-current-status", "pause")
        .removeClass("icon-play")
        .addClass("icon-pause");

      // Handle YouTube & Vimeo
      if (videoType === "youtube" || videoType === "vimeo") {
        if ($videoFrame.length) {
          var message =
            videoType === "youtube"
              ? { event: "command", func: "playVideo", args: "" }
              : { method: "play" };

          $videoFrame[0].contentWindow.postMessage(
            JSON.stringify(message),
            "*"
          );
        }
      }
      // Handle Brightcove & HTML5 Videos
      else if (
        (videoType === "brightcove" || videoType === "html5") &&
        $html5Video.length
      ) {
        $html5Video[0].play();
      }
    }
  });
}

// Video Popup
function videoPopup() {
  // YouTube & Vimeo
  jQuery(".button--youtube, .button--vimeo").magnificPopup({
    type: "iframe",
    mainClass: "mfp-fade",
    removalDelay: 300,
    preloader: false,
    fixedContentPos: false,
  });

  // Brightcove (Handled as an iframe)

  setTimeout(() => {
    jQuery(".button--brightcove, .button--html5").each(function () {
      var videoSrc = jQuery(this).parents(".simple-hero-banner__content, .carousel-banner__content").prev(".simple-hero-banner__bg, .carousel-banner__bg").find("source").attr("src");
      jQuery(this).attr("data-video-src", videoSrc);
    });
  }, 1000);
  jQuery(".button--brightcove, .button--html5").each(function () {
    var videoSrc = jQuery(this).parents(".simple-hero-banner__content, .carousel-banner__content").prev(".simple-hero-banner__bg, .carousel-banner__bg").find("source").attr("src");
    jQuery(this).attr("data-video-src", videoSrc);
  });
  jQuery(".button--brightcove, .button--html5").on("click", function (e) {
    e.preventDefault();
    var videoSrc = jQuery(this).data("video-src");

    if (!videoSrc) {
      return;
    }

    $.magnificPopup.open({
      items: {
        src:
          '<div class="mfp-video-container">' +
          '<video controls autoplay style="max-width:100%;">' +
          '<source src="' +
          videoSrc +
          '" type="video/mp4">' +
          "</video>" +
          "</div>",
        type: "inline",
      },
      midClick: true,
      mainClass: "mfp-fade",
      removalDelay: 300,
      callbacks: {
        close: function () {
          jQuery(".mfp-video-container").html("");
        },
      },
    });
  });
}

//select to Select2 for search page
function selectToSelect2() {
  if (jQuery("#sortlist").length > 0) {
    jQuery("#sortlist").select2({
      minimumResultsForSearch: -1,
    });
  }
}

var count = 30;
//  Page not Found
function countDown() {
  var redirect = document.location.origin;
  var timer = document.getElementById("timer-not-found");
  if (count > 0) {
    count--;
    timer.innerHTML = count;
    setTimeout(function () {
      countDown();
    }, 1000);
  } else window.location.href = redirect;
}

function tabActive() {
  jQuery(document).ready(function () {
    jQuery(".history-timeline-tabs__tab-wrapper .tabs__link").on("click", function (event) {
      event.preventDefault();

      jQuery(".tabs__link").removeClass("active").attr("aria-selected", "false");
      jQuery(".tabs__content").removeClass("active show");

      jQuery(this).addClass("active").attr("aria-selected", "true");

      let targetId = jQuery(this).attr("data-bs-target");
      jQuery(targetId).addClass("active show");
    });

    jQuery(".tabs__link").first().trigger("click");
  });
}

function mediaGalleryPopup() {
  jQuery(".media-card__wrapper").on("click", function (e) {
    e.stopPropagation();
    const modal = jQuery(this).closest(".media-card").find(".media_gallery_modal");
    pauseAllVideos(); 
    openModal(modal);
    resetMedia(modal); 
  });

  jQuery(document).on("click", ".media-arrow.icon-chevron-right", function (e) {
    e.stopPropagation();
    const $currentModal = jQuery(this).closest(".media_gallery_modal");
    const $allModals = jQuery(".media_gallery_modal");
    const currentIndex = $allModals.index($currentModal);
    const nextIndex = (currentIndex + 1) % $allModals.length;
    const $nextModal = $allModals.eq(nextIndex);

    closeModal($currentModal);
    openModal($nextModal);
    resetMedia($nextModal);
  });

  jQuery(document).on("click", ".media-arrow.icon-chevron-left", function (e) {
    e.stopPropagation();
    const $currentModal = jQuery(this).closest(".media_gallery_modal");
    const $allModals = jQuery(".media_gallery_modal");
    const currentIndex = $allModals.index($currentModal);
    const prevIndex = (currentIndex - 1 + $allModals.length) % $allModals.length;
    const $prevModal = $allModals.eq(prevIndex);

    closeModal($currentModal);
    openModal($prevModal);
    resetMedia($prevModal);
  });

  jQuery(document).on("click", ".action-button, .icon-close", function (e) {
    e.stopPropagation();
    const $currentModal = jQuery(this).closest(".media_gallery_modal");
    closeModal($currentModal);
  });

  jQuery(document).on("click", function (e) {
    if (!jQuery(e.target).closest(".modal-content, .media-card__wrapper").length) {
      closeModal(jQuery(".media_gallery_modal.custom-modal"));
    }
  });

  function openModal($modal) {
    if ($modal.length) {
      $modal.fadeIn(300).addClass("custom-modal");
      jQuery("body").addClass("modal-open").css("overflow", "hidden");
      pauseAllVideos(); 
    }
  }

  function closeModal($modal) {
    if ($modal.length) {
      $modal.fadeOut(300).removeClass("custom-modal");
      if (!jQuery(".media_gallery_modal.custom-modal").length) {
        jQuery("body").removeClass("modal-open").css("overflow", "");
      }
      pauseAllVideos(); 
    }
  }

  function resetMedia($modal) {
    // YouTube
    const youtubeWrapper = $modal.find(".video__frame-wrapper")[0];
    if (youtubeWrapper && youtubeWrapper.id) {
      const youtubePlayer = YT.get(youtubeWrapper.id);
      if (youtubePlayer && youtubePlayer.pauseVideo) {
        youtubePlayer.pauseVideo(); 
      }
    }

    // Vimeo
    const vimeoIframe = $modal.find(".vimeo-video")[0];
    if (vimeoIframe) {
      const vimeoPlayer = new Vimeo.Player(vimeoIframe);
      vimeoPlayer.pause().catch(function (error) {
        console.error("Vimeo Pause failed:", error);
      });
    }

     // Brightcove
     const brightcoveVideo = $modal.find("video")[0];
     if (brightcoveVideo) {
       brightcoveVideo.pause(); 
       brightcoveVideo.currentTime = 0; 
     }
  }

  function pauseAllVideos() { 
    jQuery(".video__frame-wrapper").each(function () {
      if (this.id) {
        const youtubePlayer = YT.get(this.id);
        if (youtubePlayer && youtubePlayer.pauseVideo) {
          youtubePlayer.pauseVideo();
        }
      }
    });

    jQuery(".vimeo-video").each(function () {
      const vimeoPlayer = new Vimeo.Player(this);
      vimeoPlayer.pause().catch(function (error) {
        console.error("Vimeo Pause failed:", error);
      });
    });

    jQuery("video").each(function () {
      this.pause();
      this.currentTime = 0; 
    });
  }

  jQuery(document).on("click", ".media_gallery_modal .video__frame-wrapper", function (e) {
    e.stopPropagation();
    if (this.id) {
      const youtubePlayer = YT.get(this.id);
      if (youtubePlayer && youtubePlayer.playVideo) {
        youtubePlayer.playVideo();
      }
    }
  });

  jQuery(document).on("click", ".media_gallery_modal .vimeo-video", function (e) {
    e.stopPropagation();
    const vimeoPlayer = new Vimeo.Player(this);
    vimeoPlayer.play().catch(function (error) {
      console.error("Vimeo Play failed:", error);
    });
  });

  jQuery(document).on("click", ".media_gallery_modal video", function (e) {
    e.stopPropagation();
    this.play(); 
  });
}

function submenuClose() {
  jQuery(document).ready(function () {
    // Toggle class on close icon click
    jQuery('header.header .we-mega-menu-submenu.large i.icon.icon-close').on('click', function () {
      jQuery(this).closest('.we-mega-menu-submenu').addClass('submenu-close');
    });
  
    // Remove class on hover
    jQuery('header.header .we-mega-menu-li[data-level="0"]').hover(function () {
      jQuery(this).find('.we-mega-menu-submenu').removeClass('submenu-close');
    });
  });
}


function handleTableWrap() {
  document.querySelectorAll("table").forEach((table) => {
    if (window.innerWidth < 768) {
      if (!table.parentElement.classList.contains("table-responsive")) {
        const wrapper = document.createElement("div");
        wrapper.classList.add("table-responsive");

        table.parentNode.insertBefore(wrapper, table);
        wrapper.appendChild(table);
      }
    }
  });
}

handleTableWrap();
window.addEventListener("resize", handleTableWrap);

document.querySelectorAll('p').forEach(p => {
  const content = p.innerHTML
    .replace(/&nbsp;/g, '')
    .replace(/<br\s*\/?>/gi, '')
    .trim();

  if (!content) {
    p.remove();
    console.log("removed...")
  }
});