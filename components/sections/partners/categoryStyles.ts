import type { PartnerCategory } from "@/lib/data/partners";

/** Badge colours per partner category (chip background + text, and a solid accent). */
export const categoryStyles: Record<PartnerCategory, { chip: string; accent: string }> = {
  academic: { chip: "bg-blue/10 text-blue", accent: "bg-blue" },
  abroad: { chip: "bg-navy/8 text-navy", accent: "bg-navy" },
  tech: { chip: "bg-[#0e9f8a]/10 text-[#0b7f6f]", accent: "bg-[#0e9f8a]" },
  finance: { chip: "bg-gold/15 text-[#9a5f00]", accent: "bg-gold" },
  industry: { chip: "bg-orange/10 text-orange", accent: "bg-orange" },
};
