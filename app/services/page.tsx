import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import ServicesPageContent from "@/components/pages/ServicesPageContent";

export const metadata: Metadata = {
  title: "Services | SLDC",
  description: "SLDC provides end-to-end drilling and completion services, delivered through disciplined planning, competent execution, and robust operational controls.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <ServicesPageContent />
    </PageBody>
  );
}
