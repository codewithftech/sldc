import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import PageContent from "@/components/pages/news-updates";

export const metadata: Metadata = {
  title: "News &amp; Updates | SLDC",
  description: "This section provides official news, announcements, and updates relating to SLDC’s operations, partnerships, milestones, and safety performance.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-node page-node-type-bricky">
      <PageContent />
    </PageBody>
  );
}
