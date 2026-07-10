import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PrivacyPolicyPageContent from "@/components/pages/PrivacyPolicyPageContent";

export const metadata: Metadata = {
  title: "Privacy Policy | SLDC",
  description: "Sea and Land Drilling Company LLC (“SLDC”, “we”, “our”, “us”) is committed to protecting the privacy of visitors to our website. This Privacy Policy explains how we collect, use, disclose, and protect personal information in accordance with applicable laws and regulations of the United Arab Emirates.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PrivacyPolicyPageContent />
    </PageBody>
  );
}
