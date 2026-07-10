import PageBanner from "@/components/pages/operations/PageBanner";
import MainContent from "@/components/pages/operations/MainContent";
import OmanOperations from "@/components/pages/operations/OmanOperations";
import OurCommitments from "@/components/pages/operations/OurCommitments";
import KuwaitOperations from "@/components/pages/operations/KuwaitOperations";
import PopupControls from "@/components/pages/operations/PopupControls";

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
              <article about="/operations">
                <div>
                  <PageBanner />
                  <MainContent />
                  <OmanOperations />
                  <OurCommitments />
                  <KuwaitOperations />
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
