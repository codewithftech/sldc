import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PageContent from "@/components/pages/about-sldc";

export const metadata: Metadata = {
  title: "About SLDC | SLDC",
  description: "SLDC is a joint venture company established to deliver onshore drilling and completion services in Oman and Kuwait.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PageContent />
    </PageBody>
  );
}
