import PageBanner from "@/components/pages/services/PageBanner";
import OnshoreDrillingServices from "@/components/pages/services/OnshoreDrillingServices";
import DrillingServices from "@/components/pages/services/DrillingServices";
import WorkoverAndCompletionServices from "@/components/pages/services/WorkoverAndCompletionServices";
import PopupControls from "@/components/pages/services/PopupControls";

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
              <article about="/services">
                <div>
                  <PageBanner />
                  <OnshoreDrillingServices />
                  <DrillingServices />
                  <WorkoverAndCompletionServices />
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
