import PageBanner from "@/components/pages/news-updates/PageBanner";
import MainContent from "@/components/pages/news-updates/MainContent";
import PopupControls from "@/components/pages/news-updates/PopupControls";

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
              <article about="/news-updates">
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
