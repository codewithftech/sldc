import PageBanner from "@/components/pages/people-careers/PageBanner";
import LifeAtSLDC from "@/components/pages/people-careers/LifeAtSLDC";
import DevelopmentAndCompetence from "@/components/pages/people-careers/DevelopmentAndCompetence";
import Careers from "@/components/pages/people-careers/Careers";
import PopupControls from "@/components/pages/people-careers/PopupControls";

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
              <article about="/people-careers">
                <div>
                  <PageBanner />
                  <LifeAtSLDC />
                  <DevelopmentAndCompetence />
                  <Careers />
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
