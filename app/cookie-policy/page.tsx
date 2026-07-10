import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import CookiePolicyPageContent from "@/components/pages/CookiePolicyPageContent";

export const metadata: Metadata = {
  title: "Cookie Policy | SLDC",
  description: "Learn how we use cookies to improve your experience on our website.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <CookiePolicyPageContent />
    </PageBody>
  );
}
