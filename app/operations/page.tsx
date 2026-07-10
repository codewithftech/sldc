import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import OperationsPageContent from "@/components/pages/OperationsPageContent";

export const metadata: Metadata = {
  title: "Operations | SLDC",
  description: "SLDC operates a fully active onshore portfolio across Oman and Kuwait, delivering drilling and completion services under longterm contractual arrangements.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <OperationsPageContent />
    </PageBody>
  );
}
