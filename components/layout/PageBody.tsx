import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Drawer from "@/components/layout/Drawer";
import HeaderBottomBar from "@/components/layout/HeaderBottomBar";
import Footer from "@/components/layout/Footer";
import SiteScripts from "@/components/layout/SiteScripts";

type PageBodyProps = {
  children: ReactNode;
  bodyClassName?: string;
};

export default function PageBody({ children, bodyClassName = "page-node" }: PageBodyProps) {
  return (
    <>
      <div className="page-wrapper dialog-off-canvas-main-canvas" data-off-canvas-main-canvas>
        <div className="backdrop js-backdrop" />
        <Header />
        <Drawer />
        <HeaderBottomBar />
        <main role="main" className="main">
          {children}
        </main>
        <Footer />
      </div>
      <SiteScripts bodyClassName={bodyClassName} />
    </>
  );
}
