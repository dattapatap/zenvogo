import { siteConfig } from "@/config/site";
import { faqs } from "@/lib/data/content";
import { destinations } from "@/lib/data/immersions";
import { insights } from "@/lib/data/insights";
import { getCategory, institutions, programmeHref, programmesOf } from "@/lib/data/programmes";
import { absoluteUrl } from "@/lib/seo";

/**
 * /llms.txt — a plain-markdown summary of the site for AI assistants and answer engines
 * (GEO), following the llmstxt.org convention. Built from the same data as the pages, so it
 * stays in sync automatically. Prerendered at build time (no request data is used).
 */
export function GET() {
  const link = (title: string, path: string, note?: string) =>
    `- [${title}](${absoluteUrl(path)})${note ? `: ${note}` : ""}`;

  const catalogue = (kind: "programme" | "certification") =>
    programmesOf(kind)
      .map((p) =>
        link(p.title, programmeHref(p), `${getCategory(p.category)?.name} — ${p.summary}`),
      )
      .join("\n");

  const body = `# ${siteConfig.name}

> ${siteConfig.description}

${siteConfig.name} (${siteConfig.tagline}) is an India-based learning company, part of ${siteConfig.parent}. It researches the real challenges of industries, designs curricula with empanelled faculty, and delivers executive programmes and professional certifications with leading academic institutions — currently in development with ${institutions.map((i) => i.name).join(" and ")}. It also runs global immersion programmes and Zenvogo AI Ventures, which helps AI startups incubate, find mentors and prepare for funding.

Contact: ${siteConfig.contact.email} · ${siteConfig.contact.phone} · ${siteConfig.contact.address} · ${siteConfig.contact.hours}

## Key pages
${link("Home", "/")}
${link("About Zenvogo", "/about-us", "vision, mission and team")}
${link("Our approach", "/approach", "how industry challenges become programmes")}
${link("Executive programmes", "/programs")}
${link("Professional certifications", "/certifications")}
${link("Global immersion programmes", "/immersion-programs")}
${link("Partners", "/partners", "academic institutions and industry organisations")}
${link("AI Ventures", "/ai-ventures", "AI startup incubation, mentoring and funding readiness")}
${link("FAQ", "/faq")}
${link("Contact", "/contact")}

## Executive programmes
${catalogue("programme")}

## Professional certifications
${catalogue("certification")}

## Global immersion programmes
${destinations.map((d) => link(`${d.name} — ${d.title}`, `/immersion-programs/${d.slug}`, d.text)).join("\n")}

## Frequently asked questions
${faqs.map((f) => `### ${f.q}\n${f.a}`).join("\n\n")}

## Blog
${insights.map((p) => link(p.title, `/blogs/${p.slug}`, p.excerpt)).join("\n")}

## Optional
${link("Careers", "/careers")}
${link("Sitemap", "/sitemap.xml")}
`;

  return new Response(body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
}
