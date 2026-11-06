import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { solutions } from "@/lib/data/solutions";
import { insights } from "@/lib/data/insights";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const pages = [
    "",
    "/about",
    "/solutions",
    "/approach",
    "/academic-partners",
    "/ai-ventures",
    "/insights",
    "/faq",
    "/careers",
    "/contact",
  ];
  return [
    ...pages.map((p) => ({ url: `${base}${p}` })),
    ...solutions.map((s) => ({ url: `${base}/solutions/${s.slug}` })),
    ...insights.map((p) => ({ url: `${base}/insights/${p.slug}`, lastModified: p.date })),
  ];
}
