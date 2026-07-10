import PageBanner from "@/components/pages/leadership/PageBanner";
import Leadership from "@/components/pages/leadership/Leadership";
import PopupControls from "@/components/pages/leadership/PopupControls";

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
              <article about="/leadership">
                <div>
                  <PageBanner />
                  <Leadership />
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
