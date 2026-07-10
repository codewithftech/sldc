import PageBanner from "@/components/pages/hse-quality/PageBanner";
import SafetyIsNonNegotiable from "@/components/pages/hse-quality/SafetyIsNonNegotiable";
import OurHSEApproach from "@/components/pages/hse-quality/OurHSEApproach";
import QualityAndAssurance from "@/components/pages/hse-quality/QualityAndAssurance";
import MainContent from "@/components/pages/hse-quality/MainContent";
import PopupControls from "@/components/pages/hse-quality/PopupControls";

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
              <article about="/hse-quality">
                <div>
                  <PageBanner />
                  <SafetyIsNonNegotiable />
                  <OurHSEApproach />
                  <QualityAndAssurance />
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
