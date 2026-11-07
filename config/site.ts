import type { MegaMenuKey } from "@/lib/data/catalog";

/**
 * Global site configuration.
 *
 * ⚠️ PLACEHOLDERS: the social links point to each platform's home page. Replace them
 * with Zenvogo's own profile URLs before going live.
 */
export const siteConfig = {
  name: "Zenvogo",
  tagline: "Learning Beyond Boundaries.",
  subTagline: "Industry-led learning. Global expertise. Future-ready leadership.",
  description:
    "Zenvogo designs industry-led learning programmes with leading academic institutions — built around real business challenges — and helps AI startups incubate, grow and raise funding.",
  /**
   * Public site URL, used for canonical links, sitemap, robots, Open Graph and structured data.
   * Set NEXT_PUBLIC_SITE_URL to the final domain. Without it, Vercel builds fall back to the
   * project's production domain (never localhost, which search engines can't reach).
   */
  url: (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "http://localhost:3000")
  ).replace(/\/$/, ""),

  /** Parent company. */
  parent: "Zen Voyage Travel Solutions",
  /** ⚠️ Confirm wording with the founders (the brief says "IAM alumni"). */
  founders: "IAM alumni",
  country: "India",

  contact: {
    email: "hello@zenvogo.com",
    phone: "+91 99724 48899",
    phoneHref: "tel:+919972448899",
    address: "33rd, 1354, Main, 9th Cross Rd, 1st Phase, J. P. Nagar, Bengaluru, Karnataka 560078",
    mapUrl:
      "https://www.google.com/maps/search/?api=1&query=33rd%2C%201354%2C%20Main%2C%209th%20Cross%20Rd%2C%201st%20Phase%2C%20J.%20P.%20Nagar%2C%20Bengaluru%2C%20Karnataka%20560078",
    hours: "Mon – Sat · 9:30 – 18:30 IST",
  },

  /** Dummy links for now — swap in the real profile URLs. */
  socials: [
    { label: "LinkedIn", icon: "linkedin", href: "https://www.linkedin.com/" },
    { label: "Instagram", icon: "instagram", href: "https://www.instagram.com/" },
    { label: "Facebook", icon: "facebook", href: "https://www.facebook.com/" },
    { label: "X", icon: "x", href: "https://x.com/" },
    { label: "YouTube", icon: "youtube", href: "https://www.youtube.com/" },
  ],
} as const;

export type NavItem = {
  label: string;
  href: string;
  /** Opens the matching mega menu from lib/data/catalog.ts. */
  mega?: MegaMenuKey;
};

export const mainNav: NavItem[] = [
  { label: "Our Programs", href: "/programs", mega: "programs" },
  { label: "Immersion Programs", href: "/immersion-programs", mega: "immersion" },
  { label: "Certifications", href: "/certifications", mega: "certifications" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Approach", href: "/approach" },
  { label: "Partners", href: "/partners" },
  { label: "Contact Us", href: "/contact" },
];

export const primaryCta = { label: "Let's Talk", href: "/contact" };
