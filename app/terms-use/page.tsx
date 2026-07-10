import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import TermsUsePageContent from "@/components/pages/TermsUsePageContent";

export const metadata: Metadata = {
  title: "Terms of Use | SLDC",
  description: "Read the terms and conditions for using our website and services.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <TermsUsePageContent />
    </PageBody>
  );
}
