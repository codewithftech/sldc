"use client";

import { useEffect } from "react";
import Script from "next/script";
import SvgSprites from "@/components/layout/SvgSprites";

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
      <Script id="swiper-bundle" src="/js/swiper-bundle.min.js" strategy="beforeInteractive" />
      {/* Single consolidated site behaviors (after Swiper) */}
      <Script id="site-js" src="/js/site.js" strategy="afterInteractive" />
    </>
  );
}
