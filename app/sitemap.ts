import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { insights } from "@/lib/data/insights";
import { programmeHref, programmes } from "@/lib/data/programmes";
import { destinations } from "@/lib/data/immersions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = [
    "",
    "/about-us",
    "/programs",
    "/approach",
    "/partners",
    "/ai-ventures",
    "/immersion-programs",
    "/certifications",
    "/blogs",
    "/faq",
    "/careers",
    "/contact",
  ];
  // Priority hints (used by Bing; Google ignores them): home and catalogue pages first.
  const key = new Set(["", "/programs", "/certifications", "/immersion-programs"]);
  return [
    ...pages.map((p) => ({
      url: `${base}${p}`,
      priority: p === "" ? 1 : key.has(p) ? 0.9 : 0.6,
    })),
    ...programmes.map((p) => ({ url: `${base}${programmeHref(p)}`, priority: 0.8 })),
    ...destinations.map((d) => ({
      url: `${base}/immersion-programs/${d.slug}`,
      priority: 0.8,
    })),
    ...insights.map((p) => ({
      url: `${base}/blogs/${p.slug}`,
      lastModified: p.date,
      priority: 0.6,
    })),
  ];
}
