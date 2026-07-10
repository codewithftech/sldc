import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PageContent from "@/components/pages/hse-quality";

export const metadata: Metadata = {
  title: "HSE &amp; Quality | SLDC",
  description: "The safety of our people is our highest priority. Every task is planned, every risk is assessed, and every individual is empowered to stop work if something is not right.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PageContent />
    </PageBody>
  );
}
