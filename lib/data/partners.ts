import type { IconName } from "@/lib/icons";

export type PartnerCategory = "academic" | "abroad" | "tech" | "finance" | "industry";

export type Partner = {
  name: string;
  category: PartnerCategory;
  /** Location or sector shown under the name. */
  meta: string;
  logo: string;
  /** Intrinsic size of the logo file. */
  width: number;
  height: number;
  /** Rendered height in px, tuned so wide wordmarks and square emblems feel the same size. */
  size: number;
  /** Shown in the homepage logo strip. */
  featured?: boolean;
};

export const partnerCategories: {
  id: PartnerCategory;
  label: string;
  title: string;
  text: string;
  icon: IconName;
}[] = [
  {
    id: "academic",
    label: "Academic",
    title: "Academic partners",
    text: "Leading Indian institutes that co-design, deliver and certify our programmes.",
    icon: "graduation",
  },
  {
    id: "abroad",
    label: "Abroad",
    title: "International partners",
    text: "Universities and business schools that host Zenvogo global immersions.",
    icon: "plane",
  },
  {
    id: "tech",
    label: "Tech Industry",
    title: "Technology partners",
    text: "Technology leaders who bring AI, cloud and digital expertise into the classroom.",
    icon: "brain",
  },
  {
    id: "finance",
    label: "Financial",
    title: "Financial partners",
    text: "Banks, fintechs and payment networks shaping finance and analytics programmes.",
    icon: "wallet",
  },
  {
    id: "industry",
    label: "Industry",
    title: "Industry partners",
    text: "Organisations that bring real challenges, practitioners and career pathways.",
    icon: "factory",
  },
];

/**
 * Partner logos (files live in /public/images/partners).
 * Placeholders until official artwork is added: Myntra, the IITs and all "abroad" entries.
 * Replace the SVG file in place, keeping the file name (update width/height if proportions change).
 */
export const partners: Partner[] = [
  // Academic
  {
    name: "IIT Madras",
    category: "academic",
    meta: "Chennai, India",
    logo: "/images/partners/iit-madras.svg",
    width: 126,
    height: 40,
    size: 40,
    featured: true,
  },
  {
    name: "IIT Delhi",
    category: "academic",
    meta: "New Delhi, India",
    logo: "/images/partners/iit-delhi.svg",
    width: 121,
    height: 40,
    size: 40,
    featured: true,
  },
  {
    name: "IIT Dharwad",
    category: "academic",
    meta: "Karnataka, India",
    logo: "/images/partners/iit-dharwad.svg",
    width: 137,
    height: 40,
    size: 40,
    featured: true,
  },
  {
    name: "IIM Kozhikode",
    category: "academic",
    meta: "Kerala, India",
    logo: "/images/institutions/iim-kozhikode-logo.webp",
    width: 108,
    height: 108,
    size: 52,
    featured: true,
  },

  // Abroad
  {
    name: "UK University Partner",
    category: "abroad",
    meta: "United Kingdom",
    logo: "/images/partners/abroad-uk.svg",
    width: 175,
    height: 40,
    size: 40,
  },
  {
    name: "European Business School",
    category: "abroad",
    meta: "Europe",
    logo: "/images/partners/abroad-europe.svg",
    width: 167,
    height: 40,
    size: 40,
  },
  {
    name: "Dubai Business School",
    category: "abroad",
    meta: "Dubai, UAE",
    logo: "/images/partners/abroad-dubai.svg",
    width: 167,
    height: 40,
    size: 40,
  },
  {
    name: "Malaysia University Partner",
    category: "abroad",
    meta: "Kuala Lumpur, Malaysia",
    logo: "/images/partners/abroad-malaysia.svg",
    width: 175,
    height: 40,
    size: 40,
  },
  {
    name: "Vietnam University Partner",
    category: "abroad",
    meta: "Ho Chi Minh City, Vietnam",
    logo: "/images/partners/abroad-vietnam.svg",
    width: 175,
    height: 40,
    size: 40,
  },

  // Tech industry
  {
    name: "Microsoft",
    category: "tech",
    meta: "Cloud & AI",
    logo: "/images/partners/microsoft.svg",
    width: 512,
    height: 110,
    size: 28,
    featured: true,
  },
  {
    name: "Google",
    category: "tech",
    meta: "Search, cloud & AI",
    logo: "/images/partners/google.svg",
    width: 512,
    height: 168,
    size: 30,
    featured: true,
  },
  {
    name: "Adobe",
    category: "tech",
    meta: "Creative & digital experience",
    logo: "/images/partners/adobe.svg",
    width: 512,
    height: 134,
    size: 30,
    featured: true,
  },
  {
    name: "IBM",
    category: "tech",
    meta: "Enterprise technology",
    logo: "/images/partners/ibm.svg",
    width: 512,
    height: 205,
    size: 28,
  },
  {
    name: "NVIDIA",
    category: "tech",
    meta: "AI computing",
    logo: "/images/partners/nvidia.svg",
    width: 512,
    height: 98,
    size: 26,
  },
  {
    name: "Oracle",
    category: "tech",
    meta: "Databases & cloud",
    logo: "/images/partners/oracle.svg",
    width: 512,
    height: 67,
    size: 18,
  },
  {
    name: "Infosys",
    category: "tech",
    meta: "IT services & consulting",
    logo: "/images/partners/infosys.svg",
    width: 100,
    height: 37,
    size: 30,
    featured: true,
  },
  {
    name: "TCS",
    category: "tech",
    meta: "IT services & consulting",
    logo: "/images/partners/tcs.svg",
    width: 100,
    height: 63,
    size: 30,
  },

  // Financial
  {
    name: "HDFC Bank",
    category: "finance",
    meta: "Banking",
    logo: "/images/partners/hdfcbank.svg",
    width: 152,
    height: 28,
    size: 28,
    featured: true,
  },
  {
    name: "ICICI Bank",
    category: "finance",
    meta: "Banking",
    logo: "/images/partners/icicibank.svg",
    width: 129,
    height: 28,
    size: 28,
  },
  {
    name: "Axis Bank",
    category: "finance",
    meta: "Banking",
    logo: "/images/partners/axisbank.svg",
    width: 149,
    height: 28,
    size: 28,
  },
  {
    name: "Paytm",
    category: "finance",
    meta: "Digital payments",
    logo: "/images/partners/paytm.svg",
    width: 100,
    height: 32,
    size: 26,
  },
  {
    name: "Razorpay",
    category: "finance",
    meta: "Payments infrastructure",
    logo: "/images/partners/razorpay.svg",
    width: 118,
    height: 28,
    size: 28,
  },
  {
    name: "Zerodha",
    category: "finance",
    meta: "Investing & broking",
    logo: "/images/partners/zerodha.svg",
    width: 136,
    height: 28,
    size: 26,
  },
  {
    name: "Visa",
    category: "finance",
    meta: "Payments network",
    logo: "/images/partners/visa.svg",
    width: 256,
    height: 83,
    size: 26,
  },
  {
    name: "Mastercard",
    category: "finance",
    meta: "Payments network",
    logo: "/images/partners/mastercard.svg",
    width: 256,
    height: 199,
    size: 42,
  },

  // Industry
  {
    name: "Flipkart",
    category: "industry",
    meta: "E-commerce",
    logo: "/images/partners/flipkart.svg",
    width: 113,
    height: 28,
    size: 30,
    featured: true,
  },
  {
    name: "Myntra",
    category: "industry",
    meta: "Fashion retail",
    logo: "/images/partners/myntra.svg",
    width: 83,
    height: 30,
    size: 28,
    featured: true,
  },
  {
    name: "Airtel",
    category: "industry",
    meta: "Telecommunications",
    logo: "/images/partners/airtel.svg",
    width: 87,
    height: 28,
    size: 30,
    featured: true,
  },
  {
    name: "Tata",
    category: "industry",
    meta: "Diversified conglomerate",
    logo: "/images/partners/tata.svg",
    width: 107,
    height: 28,
    size: 28,
  },
  {
    name: "Mahindra",
    category: "industry",
    meta: "Automotive & manufacturing",
    logo: "/images/partners/mahindra.svg",
    width: 100,
    height: 12,
    size: 15,
  },
  {
    name: "Swiggy",
    category: "industry",
    meta: "Consumer technology",
    logo: "/images/partners/swiggy.svg",
    width: 93,
    height: 28,
    size: 28,
  },
];

/** Interleave categories so a scrolling strip never shows one category in a long run. */
export function interleave(list: Partner[]): Partner[] {
  const buckets = partnerCategories.map((c) => list.filter((p) => p.category === c.id));
  const out: Partner[] = [];
  for (let i = 0; out.length < list.length; i++) {
    for (const b of buckets) if (b[i]) out.push(b[i]);
  }
  return out;
}

export const featuredPartners = interleave(partners.filter((p) => p.featured));
