import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PageContent from "@/components/pages/sitemap";

export const metadata: Metadata = {
  title: "Sitemap | SLDC",
  description: "SLDC delivers drilling and completion services designed around strong planning, competent crews, and consistent operating standards. Our approach is grounded in discipline, teamwork, and continuous improvement, because safe, predictable execution is what creates long term value.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="no-js path-sitemap">
      <PageContent />
    </PageBody>
  );
}
