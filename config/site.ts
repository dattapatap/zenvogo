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
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

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
  children?: { label: string; href: string; text: string }[];
};

export const mainNav: NavItem[] = [
  {
    label: "Our Programs",
    href: "/solutions",
    children: [
      {
        label: "Executive & Leadership Development",
        href: "/solutions/executive-leadership",
        text: "Programmes for senior management and future leaders.",
      },
      {
        label: "Industry-Curated Learning",
        href: "/solutions/industry-curated-learning",
        text: "Curricula designed around your sector's real challenges.",
      },
      {
        label: "Global Education & Exchange",
        href: "/solutions/global-education-exchange",
        text: "International exposure, exchanges and immersions.",
      },
      {
        label: "Corporate Learning",
        href: "/solutions/corporate-learning",
        text: "Enterprise-wide capability building, end to end.",
      },
    ],
  },
  { label: "Immersion Programs", href: "/immersion-programs" },
  { label: "Certifications", href: "/certifications" },
  { label: "About Us", href: "/about-us" },
  { label: "Our Approach", href: "/approach" },
  { label: "Partners", href: "/partners" },
  { label: "Contact Us", href: "/contact" },
];

export const primaryCta = { label: "Let's Talk", href: "/contact" };
