import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async redirects() {
    return [
      {
        source: "/solutions/global-education-exchange",
        destination: "/immersion-programs",
        permanent: true,
      },
      {
        source: "/solutions/:path*",
        destination: "/programs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
