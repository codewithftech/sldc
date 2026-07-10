import HeroBanner from "@/components/pages/home/HeroBanner";
import KeyProofPoints from "@/components/pages/home/KeyProofPoints";
import WhatWeDo from "@/components/pages/home/WhatWeDo";
import GeographicSnapshot from "@/components/pages/home/GeographicSnapshot";
import OurCommitments from "@/components/pages/home/OurCommitments";
import FurtherLinks from "@/components/pages/home/FurtherLinks";
import PopupControls from "@/components/pages/home/PopupControls";

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
              <article about="/home">
                <div>
                  <HeroBanner />
                  <KeyProofPoints />
                  <WhatWeDo />
                  <GeographicSnapshot />
                  <OurCommitments />
                  <FurtherLinks />
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
