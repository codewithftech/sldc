import PageBanner from "@/components/pages/about-sldc/PageBanner";
import WhoWeAre from "@/components/pages/about-sldc/WhoWeAre";
import WhatDefinesUs from "@/components/pages/about-sldc/WhatDefinesUs";
import FastFacts from "@/components/pages/about-sldc/FastFacts";
import PopupControls from "@/components/pages/about-sldc/PopupControls";

export default function PageContent() {
  return (
    <>
      <a id="main-content" tabIndex={-1} />
      <div className="layout-content-top" />
      <div className="layout-content">
        <div>
          <div data-drupal-messages-fallback className="hidden" />
          <div id="block-investis-project-mainpagecontent">
            <div className="block-main__wrapper">
              <article about="/about-sldc">
                <div>
                  <PageBanner />
                  <WhoWeAre />
                  <WhatDefinesUs />
                  <FastFacts />
                </div>
              </article>
              <PopupControls />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
