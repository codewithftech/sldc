import type { Metadata } from "next";
import PageBody from "@/components/layout/PageBody";
import HomePageContent from "@/components/pages/HomePageContent";

export const metadata: Metadata = {
  title: "Home | SLDC",
  description: "SLDC provides safe, reliable onshore drilling and completion services across Oman and Kuwait, combining regional operational strength with global capability.",
};

export default function Page() {
  return (
    <PageBody bodyClassName="page-node content-lock-not-locked no-js path-frontpage page-node-type-bricky">
      <HomePageContent />
    </PageBody>
  );
}
