import PageBanner from "@/components/pages/terms-use/PageBanner";
import MainContent from "@/components/pages/terms-use/MainContent";
import PopupControls from "@/components/pages/terms-use/PopupControls";

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
              <article about="/terms-use">
                <div>
                  <PageBanner />
                  <MainContent />
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
