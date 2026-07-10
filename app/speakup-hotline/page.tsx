import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PageContent from "@/components/pages/speakup-hotline";

export const metadata: Metadata = {
  title: "SpeakUp Hotline | SLDC",
  description: "Report concerns confidentially through our SpeakUp hotline.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PageContent />
    </PageBody>
  );
}
