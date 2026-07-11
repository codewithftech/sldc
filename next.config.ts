import type { NextConfig } from "next";

const solrOrigin =
  process.env.NEXT_PUBLIC_SOLR_ORIGIN ?? "https://sldc.sid2-e1.investis.com";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  async rewrites() {
    return [
      { source: "/solrSearch", destination: `${solrOrigin}/solrSearch` },
      {
        source: "/searchautocomplete",
        destination: `${solrOrigin}/searchautocomplete`,
      },
      {
        source: "/searchfacettag",
        destination: `${solrOrigin}/searchfacettag`,
      },
    ];
  },
};

export default nextConfig;
