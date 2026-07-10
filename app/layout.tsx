import type { Metadata } from "next";
import SiteStyles from "@/components/layout/SiteStyles";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://sldc.sid2-e1.investis.com"),
  title: {
    default: "SLDC",
    template: "%s | SLDC",
  },
  icons: {
    icon: "/sites/sldc/files/sldc/favicon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        <SiteStyles />
      </head>
      <body className="page-node content-lock-not-locked no-js path-frontpage page-node-type-bricky">
        <a href="#main-content" className="visually-hidden focusable">
          Skip to main content
        </a>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5Z52PVG2"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {children}
      </body>
    </html>
  );
}
