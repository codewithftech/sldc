import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import ContactPageContent from "@/components/pages/ContactPageContent";

export const metadata: Metadata = {
  title: "Contact | SLDC",
  description: "Get in touch with us for any questions or support.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <ContactPageContent />
    </PageBody>
  );
}
