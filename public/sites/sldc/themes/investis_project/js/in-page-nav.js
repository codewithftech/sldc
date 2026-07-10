export const inPageNav = (inPageNavInstance) => {
  if (inPageNavInstance) {
    const $links = jQuery('.in-page-nav').find("a.tabs__link");

    if ($links.length) {
      $links.on("click", function (e) {
        e.preventDefault();

        // Remove 'active' from all, add to clicked
        $links.removeClass("active");
        jQuery(this).addClass("active");

        // Scroll to target smoothly
        const targetId = jQuery(this).attr("href");
        const $target = jQuery(targetId);

        if ($target.length) {
          jQuery("html, body").animate(
            {
              scrollTop: $target.offset().top,
            },
            500 // duration in ms
          );
        }
      });
    }
  }
};
