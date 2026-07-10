import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import SpeakupHotlinePageContent from "@/components/pages/SpeakupHotlinePageContent";

export const metadata: Metadata = {
  title: "SpeakUp Hotline | SLDC",
  description: "Report concerns confidentially through our SpeakUp hotline.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <SpeakupHotlinePageContent />
    </PageBody>
  );
}
