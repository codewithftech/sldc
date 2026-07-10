"use client";

import { useEffect } from "react";
import Script from "next/script";
import SvgSprites from "@/components/layout/SvgSprites";

const localScripts = [
  "/profiles/custom/connectid/modules/custom/nojs/js/nojs.js",
  "/core/assets/vendor/jquery/jquery.min.js",
  "/core/assets/vendor/once/once.min.js",
  "/core/misc/drupalSettingsLoader.js",
  "/core/misc/drupal.js",
  "/core/misc/drupal.init.js",
  "/core/assets/vendor/tabbable/index.umd.min.js",
  "/profiles/custom/connectid/modules/custom/id_content_lock/js/common.js",
  "/profiles/custom/connectid/modules/custom/id_cookie_consent/js/id-cookie-consent.js",
  "/profiles/custom/connectid/themes/custom/investis_front/js/header.js",
  "/profiles/custom/connectid/themes/custom/investis_front/js/we-mega-menu.js",
  "/core/misc/progress.js",
  "/core/assets/vendor/loadjs/loadjs.min.js",
  "/core/misc/debounce.js",
  "/core/misc/announce.js",
  "/core/misc/message.js",
  "/core/misc/ajax.js",
  "/themes/contrib/stable/js/ajax.js",
  "/profiles/custom/connectid/themes/custom/investis_front/js/objectFitImage.js",
  "/profiles/custom/connectid/themes/custom/investis_front/js/detectDevice.js",
  "/profiles/custom/connectid/themes/custom/investis_front/js/loader.js",
  "/sites/sldc/themes/investis_project/js/lazyload.js",
  "/sites/sldc/themes/investis_project/js/magnific-popup.js",
  "/sites/sldc/themes/investis_project/js/iframe-resizer.js",
  "/sites/sldc/themes/investis_project/js/frame-mngr.js",
  "/sites/sldc/themes/investis_project/js/global-animations.js",
  "/sites/sldc/themes/investis_project/js/magicHeight.js",
  "/sites/sldc/themes/investis_project/js/back-to-top.js",
  "/sites/sldc/themes/investis_project/js/midFileSize.js",
  "/sites/sldc/themes/investis_project/js/swiper-bundle.min.js",
  "/sites/sldc/themes/investis_project/js/app.js",
  "/sites/sldc/themes/investis_project/js/tab-slider.js",
  "/sites/sldc/themes/investis_project/js/projectCustom.js",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/js/dist/handlebars.min.js",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/js/jquery.autocomplete.js",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/js/mid_solr_search.js",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/js/mid_solr_search_auto.js",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/js/dist/jstree.min.js",
  "/modules/contrib/we_megamenu/assets/js/we_mobile_menu.js",
  "/modules/contrib/we_megamenu/assets/js/we_megamenu_frontend.js",
];

type SiteScriptsProps = {
  bodyClassName?: string;
};

export default function SiteScripts({ bodyClassName }: SiteScriptsProps) {
  useEffect(() => {
    if (bodyClassName) {
      document.body.className = bodyClassName;
    }
    document.body.classList.remove("no-js");

    const yearEl = document.getElementById("copyright-year");
    if (yearEl) {
      yearEl.textContent = String(new Date().getFullYear());
    }
  }, [bodyClassName]);

  return (
    <>
      <SvgSprites />
      <Script
        id="gtm"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5Z52PVG2');`,
        }}
      />
      <Script src="https://assets.investisdigital.com/cookiemanager/v3.1/latest/js/invd-cm-plugin.min.js" strategy="afterInteractive" />
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      <Script
        src="https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js"
        strategy="afterInteractive"
      />
      {localScripts.map((src) => (
        <Script key={src} src={src} strategy="afterInteractive" />
      ))}
    </>
  );
}
