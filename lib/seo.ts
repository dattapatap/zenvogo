/**
 * SEO / AEO / GEO helpers: absolute URLs and schema.org JSON-LD builders.
 *
 * Structured data tells search engines (rich results) and AI answer engines (ChatGPT,
 * Perplexity, Gemini, Google AI Overviews) exactly who Zenvogo is and what each page offers.
 * Validate changes with https://validator.schema.org and https://search.google.com/test/rich-results
 */
import { siteConfig } from "@/config/site";
import type { Destination } from "@/lib/data/immersions";
import type { Insight } from "@/lib/data/insights";
import {
  getCategory,
  getFacts,
  getInstitution,
  programmeHref,
  type Programme,
} from "@/lib/data/programmes";

/** Absolute URL for a site path ("/programs" → "https://…/programs"). */
export const absoluteUrl = (path = "/") =>
  `${siteConfig.url}${path === "/" ? "" : path.startsWith("/") ? path : `/${path}`}`;

const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;
const LOGO = absoluteUrl("/images/brand/zenvogo-logo.png");

/** Reference to the organisation node defined once in the root layout. */
const orgRef = { "@id": ORG_ID };

/** The organisation (rendered once, site-wide). */
export function organizationSchema() {
  const { contact } = siteConfig;
  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "EducationalOrganization"],
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    logo: { "@type": "ImageObject", url: LOGO },
    slogan: siteConfig.tagline,
    description: siteConfig.description,
    email: contact.email,
    telephone: contact.phone.replace(/\s/g, ""),
    address: {
      "@type": "PostalAddress",
      streetAddress: "33rd, 1354, Main, 9th Cross Rd, 1st Phase, J. P. Nagar",
      addressLocality: "Bengaluru",
      addressRegion: "Karnataka",
      postalCode: "560078",
      addressCountry: "IN",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: contact.email,
      telephone: contact.phone.replace(/\s/g, ""),
      areaServed: "IN",
      availableLanguage: ["en"],
    },
    parentOrganization: { "@type": "Organization", name: siteConfig.parent },
    areaServed: "Worldwide",
    knowsAbout: [
      "Executive education",
      "Industry-led learning programmes",
      "Professional certifications",
      "Global immersion programmes",
      "Leadership development",
      "Artificial intelligence",
      "Banking and finance",
      "AI startup incubation",
    ],
    // Add real profile URLs here once available (siteConfig.socials are placeholders).
    // sameAs: ["https://www.linkedin.com/company/…"],
  };
}

/** The website itself (rendered once, site-wide). */
export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": SITE_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en-IN",
    publisher: orgRef,
  };
}

/** Breadcrumb trail. "Home" is added automatically; the last crumb may omit its href. */
export function breadcrumbSchema(crumbs: { label: string; href?: string }[], current?: string) {
  const items = [{ label: "Home", href: "/" }, ...crumbs];
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((c, i) => {
      const href = c.href ?? (i === items.length - 1 ? current : undefined);
      return {
        "@type": "ListItem",
        position: i + 1,
        name: c.label,
        ...(href && { item: absoluteUrl(href) }),
      };
    }),
  };
}

/** Question / answer list — the format AI answer engines quote most readily. */
export function faqSchema(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

/** A programme or certification. */
export function courseSchema(p: Programme) {
  const inst = getInstitution(p.institution);
  const cat = getCategory(p.category);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${absoluteUrl(programmeHref(p))}#course`,
    name: p.title,
    description: p.summary,
    url: absoluteUrl(programmeHref(p)),
    provider: orgRef,
    ...(inst && {
      contributor: { "@type": "CollegeOrUniversity", name: inst.name },
    }),
    ...(cat && { about: cat.name }),
    educationalLevel: "Professional",
    audience: { "@type": "EducationalAudience", audienceType: p.audience.join(", ") },
    teaches: p.outcomes,
    syllabusSections: p.modules.map((m) => ({
      "@type": "Syllabus",
      name: m.title,
      description: m.text,
    })),
    // Delivery mode is still "to be confirmed", so describe the format instead of courseMode.
    learningResourceType: getFacts(p).format,
    inLanguage: "en",
  };
}

/** A destination immersion programme. */
export function immersionSchema(d: Destination) {
  const url = absoluteUrl(`/immersion-programs/${d.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    "@id": `${url}#course`,
    name: `${d.name} Immersion Programme – ${d.title}`,
    description: d.text,
    url,
    image: absoluteUrl(d.image),
    provider: orgRef,
    courseMode: "Onsite",
    teaches: d.themes,
    about: d.region,
    inLanguage: "en",
  };
}

/** A blog post. */
export function articleSchema(post: Insight) {
  const url = absoluteUrl(`/blogs/${post.slug}`);
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    url,
    mainEntityOfPage: url,
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: "en-IN",
    image: absoluteUrl("/opengraph-image"),
    author: orgRef,
    publisher: orgRef,
  };
}

/** A list of linked items, e.g. all programmes on a listing page. */
export function itemListSchema(name: string, items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name,
    numberOfItems: items.length,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.href),
    })),
  };
}
