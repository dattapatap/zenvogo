import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { solutions } from "@/lib/data/solutions";
import { insights } from "@/lib/data/insights";
import { programmeHref, programmes } from "@/lib/data/programmes";
import { destinations } from "@/lib/data/immersions";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = [
    "",
    "/about-us",
    "/programs",
    "/solutions",
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
    ...solutions.map((s) => ({ url: `${base}/solutions/${s.slug}` })),
    ...programmes.map((p) => ({ url: `${base}${programmeHref(p)}` })),
    ...destinations.map((d) => ({ url: `${base}/immersion-programs/${d.slug}` })),
    ...insights.map((p) => ({ url: `${base}/blogs/${p.slug}`, lastModified: p.date })),
  ];
}
