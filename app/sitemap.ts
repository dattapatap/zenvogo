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
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...programmes.map((p) => ({ url: `${base}${programmeHref(p)}` })),
    ...destinations.map((d) => ({ url: `${base}/immersion-programs/${d.slug}` })),
    ...insights.map((p) => ({ url: `${base}/blogs/${p.slug}`, lastModified: p.date })),
  ];
}
