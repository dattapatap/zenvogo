import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
    // Inline the (small, Tailwind) CSS into <head>: removes the render-blocking stylesheet
    // request that PageSpeed flagged (~540–750 ms on mobile).
    inlineCss: true,
  },
  images: {
    // AVIF is ~20% smaller than WebP; browsers without it still get WebP.
    formats: ["image/avif", "image/webp"],
    // Allowed `quality` values (required list since Next.js 16). 60 is used for decorative
    // and illustration images, 75 is the default.
    qualities: [60, 75],
    // Default widths plus 480 so ~400–450px cards don't jump to the 640px file.
    imageSizes: [32, 48, 64, 96, 128, 256, 384, 480],
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
