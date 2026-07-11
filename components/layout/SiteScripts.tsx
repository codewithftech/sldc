"use client";

import { useEffect } from "react";
import Script from "next/script";
import SvgSprites from "@/components/layout/SvgSprites";

// Replaced by public/js/site.js (+ swiper bundle). Legacy paths kept for reference.
// const localScripts = [
//   "/profiles/custom/connectid/modules/custom/nojs/js/nojs.js",
//   "/core/assets/vendor/jquery/jquery.min.js",
//   "/core/assets/vendor/once/once.min.js",
//   "/core/misc/drupalSettingsLoader.js",
//   "/core/misc/drupal.js",
//   "/core/misc/drupal.init.js",
//   "/core/assets/vendor/tabbable/index.umd.min.js",
//   "/profiles/custom/connectid/modules/custom/id_cookie_consent/js/id-cookie-consent.js",
//   "/profiles/custom/connectid/themes/custom/investis_front/js/header.js",
//   "/profiles/custom/connectid/themes/custom/investis_front/js/we-mega-menu.js",
//   "/core/assets/vendor/loadjs/loadjs.min.js",
//   "/core/misc/debounce.js",
//   "/profiles/custom/connectid/themes/custom/investis_front/js/objectFitImage.js",
//   "/profiles/custom/connectid/themes/custom/investis_front/js/detectDevice.js",
//   "/profiles/custom/connectid/themes/custom/investis_front/js/loader.js",
//   "/sites/sldc/themes/investis_project/js/lazyload.js",
//   "/sites/sldc/themes/investis_project/js/magnific-popup.js",
//   "/sites/sldc/themes/investis_project/js/global-animations.js",
//   "/sites/sldc/themes/investis_project/js/back-to-top.js",
//   "/sites/sldc/themes/investis_project/js/swiper-bundle.min.js",
//   "/sites/sldc/themes/investis_project/js/app.js",
//   "/sites/sldc/themes/investis_project/js/projectCustom.js",
//   "/modules/contrib/we_megamenu/assets/js/we_mobile_menu.js",
//   "/modules/contrib/we_megamenu/assets/js/we_megamenu_frontend.js",
//   "/profiles/custom/connectid/modules/custom/mid_solr_search/js/dist/handlebars.min.js",
//   "/profiles/custom/connectid/modules/custom/mid_solr_search/js/jquery.autocomplete.js",
//   "/profiles/custom/connectid/modules/custom/mid_solr_search/js/mid_solr_search.js",
//   "/profiles/custom/connectid/modules/custom/mid_solr_search/js/mid_solr_search_auto.js",
//   "/profiles/custom/connectid/modules/custom/mid_solr_search/js/dist/jstree.min.js",
// ];

type SiteScriptsProps = {
  bodyClassName?: string;
};

export default function SiteScripts({ bodyClassName }: SiteScriptsProps) {
  useEffect(() => {
    if (bodyClassName) {
      document.body.className = bodyClassName.replace(/\bno-js\b/, "has-js");
    }
    document.documentElement.classList.add("js");
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
      {/* Cookie manager — site.js wires Cookie Settings link to this plugin */}
      <Script
        src="https://assets.investisdigital.com/cookiemanager/v3.1/latest/js/invd-cm-plugin.min.js"
        strategy="afterInteractive"
      />
      <Script src="https://www.youtube.com/iframe_api" strategy="lazyOnload" />
      <Script src="https://player.vimeo.com/api/player.js" strategy="lazyOnload" />
      {/* Swiper library (used by site.js for carousels) */}
      <Script
        src="/sites/sldc/themes/investis_project/js/swiper-bundle.min.js"
        strategy="beforeInteractive"
      />
      {/* Single consolidated site behaviors */}
      <Script src="/js/site.js" strategy="afterInteractive" />
    </>
  );
}
