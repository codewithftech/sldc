import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PeopleCareersPageContent from "@/components/pages/PeopleCareersPageContent";

export const metadata: Metadata = {
  title: "People &amp; Careers | SLDC",
  description: "Our people are our strength. We create an environment where individuals are respected, supported, and expected to perform to high standards.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PeopleCareersPageContent />
    </PageBody>
  );
}
