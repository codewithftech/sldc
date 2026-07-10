import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PageContent from "@/components/pages/leadership";

export const metadata: Metadata = {
  title: "Leadership | SLDC",
  description: "Meet our leadership team and learn about them.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PageContent />
    </PageBody>
  );
}
