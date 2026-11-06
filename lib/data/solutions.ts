import type { IconName } from "@/lib/icons";

export type Solution = {
  slug: string;
  title: string;
  short: string;
  icon: IconName;
  tagline: string;
  summary: string;
  body: string[];
  audience: string[];
  outcomes: string[];
  formats: string[];
};

export const solutions: Solution[] = [
  {
    slug: "executive-leadership",
    title: "Executive & Leadership Development",
    short: "Executive Education",
    icon: "crown",
    tagline: "For leaders who are shaping what comes next.",
    summary:
      "Programmes for senior management and high-potential leaders, built around the decisions they actually face.",
    body: [
      "Senior professionals don't need another generic leadership course. They need learning that reflects the pressures of their industry, the realities of their organisation and the decisions on their desk this quarter.",
      "Zenvogo works with industry leaders to surface those challenges, then partners with empanelled faculty and leading institutions to build executive programmes that are rigorous, relevant and immediately applicable.",
    ],
    audience: [
      "CXOs and senior management teams",
      "Business unit and functional heads",
      "High-potential leaders moving into senior roles",
      "Family-business successors and promoters",
    ],
    outcomes: [
      "Strategic thinking anchored in your industry's context",
      "Stronger decision-making in uncertain markets",
      "Leadership capability that teams can feel",
      "Certification from a leading academic institution",
    ],
    formats: [
      "Cohort programmes",
      "Executive residencies",
      "Blended learning",
      "Leadership masterclasses",
    ],
  },
  {
    slug: "industry-curated-learning",
    title: "Industry-Curated Learning",
    short: "Industry-Curated Learning",
    icon: "target",
    tagline: "Learning designed by your industry, for your industry.",
    summary:
      "Customised, sector-specific programmes designed from real industry challenges — not picked from an existing catalogue.",
    body: [
      "Most learning platforms resell programmes that institutions already offer. Zenvogo starts at the other end: with the industry. We survey senior professionals in a sector to understand the challenges they face, and turn those insights into a curriculum.",
      "Our empanelled professors design the programme, and we partner with leading institutions to deliver and certify it. The result is learning that answers your sector's questions — not someone else's.",
    ],
    audience: [
      "Industry bodies and associations",
      "Sector leaders such as real estate and construction",
      "Organisations with specialised skill gaps",
      "Professionals seeking sector-specific depth",
    ],
    outcomes: [
      "A curriculum mapped to documented industry challenges",
      "Programmes co-created with academic experts",
      "Delivery and certification through leading institutions",
      "Measurable relevance to day-to-day work",
    ],
    formats: ["Certificate programmes", "Sector cohorts", "Short courses", "Applied projects"],
  },
  {
    slug: "global-education-exchange",
    title: "Global Education & Exchange",
    short: "Global Learning & Exchange",
    icon: "globe",
    tagline: "Perspective that only comes from crossing borders.",
    summary:
      "International exchanges, immersions and study programmes that bring global perspective to students and professionals.",
    body: [
      "Exposure to other markets, cultures and ways of working changes how people think. Zenvogo designs student and professional exchange programmes with institutions in India and abroad — with the travel and logistics expertise of our parent company behind every journey.",
      "From short international immersions to semester exchanges, we handle the academic design, partnerships and on-ground experience end to end.",
    ],
    audience: [
      "Students seeking international exposure",
      "Universities building exchange partnerships",
      "Professionals on global immersion programmes",
      "Organisations sending leaders overseas",
    ],
    outcomes: [
      "Global perspective on industries and markets",
      "Academic credit or certification where applicable",
      "Networks across countries and institutions",
      "Seamless travel and on-ground support",
    ],
    formats: [
      "Student exchanges",
      "International immersions",
      "Study tours",
      "Global summer schools",
    ],
  },
  {
    slug: "corporate-learning",
    title: "Corporate Learning Solutions",
    short: "Corporate Learning",
    icon: "building",
    tagline: "Capability building that moves the business.",
    summary:
      "End-to-end learning programmes for organisations — diagnosed, designed and delivered around your business goals.",
    body: [
      "Every organisation's capability gaps are different. We begin with a diagnosis — conversations with leadership and teams — and design learning journeys that close the gaps that matter most to your business.",
      "Programmes are delivered with academic partners and industry practitioners, and can run across levels, from first-time managers to the leadership team.",
    ],
    audience: [
      "HR and L&D leaders",
      "Organisations scaling or transforming",
      "Teams adopting new technology such as AI",
      "Companies building leadership pipelines",
    ],
    outcomes: [
      "Learning needs mapped to business priorities",
      "Programmes for every level of the organisation",
      "Academic credibility with practical application",
      "Clear reporting on participation and impact",
    ],
    formats: ["In-company programmes", "Blended journeys", "Workshops", "Learning academies"],
  },
];

export const getSolution = (slug: string) => solutions.find((s) => s.slug === slug);
