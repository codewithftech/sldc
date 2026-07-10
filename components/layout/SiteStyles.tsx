import Script from "next/script";

const stylesheets = [
  "/themes/contrib/stable/css/core/components/progress.module.css",
  "/themes/contrib/stable/css/core/components/ajax-progress.module.css",
  "/themes/contrib/stable/css/system/components/align.module.css",
  "/themes/contrib/stable/css/system/components/fieldgroup.module.css",
  "/themes/contrib/stable/css/system/components/container-inline.module.css",
  "/themes/contrib/stable/css/system/components/clearfix.module.css",
  "/themes/contrib/stable/css/system/components/details.module.css",
  "/themes/contrib/stable/css/system/components/hidden.module.css",
  "/themes/contrib/stable/css/system/components/item-list.module.css",
  "/themes/contrib/stable/css/system/components/js.module.css",
  "/themes/contrib/stable/css/system/components/nowrap.module.css",
  "/themes/contrib/stable/css/system/components/position-container.module.css",
  "/themes/contrib/stable/css/system/components/reset-appearance.module.css",
  "/themes/contrib/stable/css/system/components/resize.module.css",
  "/themes/contrib/stable/css/system/components/system-status-counter.css",
  "/themes/contrib/stable/css/system/components/system-status-report-counters.css",
  "/themes/contrib/stable/css/system/components/system-status-report-general-info.css",
  "/themes/contrib/stable/css/system/components/tablesort.module.css",
  "/profiles/custom/connectid/modules/custom/id_content_lock/css/common.css",
  "https://assets.investisdigital.com/cookiemanager/v3.1/latest/css/invd-cm-theme.css",
  "/profiles/custom/connectid/modules/custom/id_cookie_consent/css/id-cookie-consent.css",
  "/profiles/custom/connectid/modules/custom/id_custom/css/backend_custom.css",
  "/profiles/custom/connectid/modules/custom/id_imce/css/imce.ckeditor.css",
  "/profiles/custom/connectid/modules/custom/id_layout_builder/modules/id_layout_builder_banner/css/styles.css",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/css/style.css",
  "/profiles/custom/connectid/modules/custom/mid_solr_search/css/solrstrap.css",
  "/modules/contrib/social_media_links/css/social_media_links.theme.css",
  "https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css",
  "/modules/contrib/we_megamenu/assets/css/we_megamenu_backend.css",
  "/sites/sldc/themes/investis_project/css/main.css",
  "/sites/sldc/themes/investis_project/css/swiper-bundle.min.css",
  "/sites/sldc/themes/investis_project/css/magnific-popup.css",
  "https://cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.css",
  "https://cdn.jsdelivr.net/npm/select2@4.1.0-rc.0/dist/css/select2.min.css",
];

export default function SiteStyles() {
  return (
    <>
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link
        href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet"
      />
      {stylesheets.map((href) => (
        <link key={href} rel="stylesheet" media="all" href={href} />
      ))}
    </>
  );
}
