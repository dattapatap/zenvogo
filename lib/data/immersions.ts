import type { IconName } from "@/lib/icons";

/**
 * Zenvogo Global Immersion Programmes.
 * Source: client document "Zenvogo Global Immersion Programmes - content".
 */

export const immersionIntro = {
  title: "Zenvogo Global Immersion Programmes",
  tagline: "Learn Beyond Borders. Experience the World.",
  text: "We design and deliver international and domestic immersion experiences that connect academic learning with global industries, leading institutions, cultural perspectives and real-world opportunities.",
  sectionTitle: "Global Immersion Programmes",
  sectionText:
    "Take learning beyond the classroom with thoughtfully designed academic and industry immersion experiences across international destinations.",
  partnerText:
    "Zenvogo partners with universities, educational institutions and organisations to create meaningful learning journeys that combine academic sessions, corporate interactions, institutional visits, cultural experiences and professional networking.",
  destinationsText:
    "Whether it is exploring Europe's business landscape, experiencing India's emerging industries, understanding Vietnam's fast-growing economy, discovering Malaysia's multicultural business environment or engaging with Dubai's global business ecosystem, every programme is designed to create a lasting learning experience.",
};

export const approach: { icon: IconName; text: string }[] = [
  {
    icon: "graduation",
    text: "Academic sessions with international faculty and industry experts.",
  },
  { icon: "building", text: "Corporate visits and real-world business exposure." },
  { icon: "handshake", text: "University interactions and institutional collaborations." },
  { icon: "compass", text: "Cultural exploration and experiential learning." },
  { icon: "network", text: "Professional networking and peer engagement." },
  { icon: "plane", text: "End-to-end programme planning and coordination." },
];

export type Destination = {
  slug: string;
  name: string;
  title: string;
  /** Full heading, e.g. "Europe – Business, Innovation & Global Perspectives". */
  heading: string;
  text: string;
  themes: string[];
  image: string;
  region: string;
};

export const destinations: Destination[] = [
  {
    slug: "europe",
    name: "Europe",
    title: "Business, Innovation & Global Perspectives",
    heading: "Europe – Business, Innovation & Global Perspectives",
    text: "Explore Europe's diverse business environment through university engagements, academic interactions, corporate exposure and cultural experiences.",
    themes: [
      "International business and management",
      "Luxury, fashion and brand management",
      "Finance and global markets",
      "Innovation, entrepreneurship and sustainability",
      "European business and cultural ecosystems",
    ],
    image: "/images/immersion/europe.webp",
    region: "Europe",
  },
  {
    slug: "india",
    name: "India",
    title: "Emerging Markets & Business Transformation",
    heading: "India – Emerging Markets & Business Transformation",
    text: "Understand India's dynamic economic landscape through industry interactions, academic engagements and exposure to one of the world's most diverse business environments.",
    themes: [
      "Entrepreneurship and start-up ecosystems",
      "Digital transformation and technology",
      "Banking and financial services",
      "Manufacturing and supply chain",
      "Healthcare and business operations",
    ],
    image: "/images/immersion/india.webp",
    region: "South Asia",
  },
  {
    slug: "vietnam",
    name: "Vietnam",
    title: "Growth, Manufacturing & Entrepreneurship",
    heading: "Vietnam – Growth, Manufacturing & Entrepreneurship",
    text: "Experience one of Southeast Asia's evolving economies and explore its growing role in global trade, manufacturing and innovation.",
    themes: [
      "International trade and business",
      "Manufacturing and supply chain management",
      "Entrepreneurship and start-up ecosystems",
      "Emerging market strategies",
      "Economic development and sustainability",
    ],
    image: "/images/immersion/vietnam.webp",
    region: "Southeast Asia",
  },
  {
    slug: "malaysia",
    name: "Malaysia",
    title: "Multicultural Business & Regional Opportunities",
    heading: "Malaysia – Multicultural Business & Regional Opportunities",
    text: "Discover Malaysia's position as a regional business hub through institutional engagements, industry exposure and cross-cultural learning.",
    themes: [
      "International business and trade",
      "Islamic finance and banking",
      "Tourism and hospitality management",
      "Technology and digital business",
      "Multicultural leadership and management",
    ],
    image: "/images/immersion/malaysia.webp",
    region: "Southeast Asia",
  },
  {
    slug: "dubai",
    name: "Dubai",
    title: "Global Business, Innovation & Entrepreneurship",
    heading: "Dubai – Global Business, Innovation & Entrepreneurship",
    text: "Explore Dubai's international business ecosystem, where global commerce, innovation, entrepreneurship and diverse industries converge.",
    themes: [
      "Global trade and international business",
      "Real estate and infrastructure",
      "Finance and investment",
      "Entrepreneurship and innovation",
      "Luxury, tourism and hospitality",
    ],
    image: "/images/immersion/dubai.webp",
    region: "Middle East",
  },
];

export const getDestination = (slug: string) => destinations.find((d) => d.slug === slug);

export const experienceIntro = {
  title: "What Makes a Zenvogo Immersion Experience Different?",
  tagline: "Learning that connects knowledge with experience.",
  text: "Every immersion programme is developed around a carefully planned learning framework.",
  images: [
    "/images/immersion/experience-industry.webp",
    "/images/immersion/experience-academic.webp",
    "/images/immersion/experience-culture.webp",
  ],
};

export const experiences: { icon: IconName; title: string; gain: string }[] = [
  {
    icon: "graduation",
    title: "Academic engagements",
    gain: "Insights from university faculty and subject experts",
  },
  {
    icon: "factory",
    title: "Industry exposure",
    gain: "Understanding of business operations and industry practices",
  },
  {
    icon: "briefcase",
    title: "Corporate interactions",
    gain: "Perspectives from business leaders and professionals",
  },
  {
    icon: "building",
    title: "Institutional visits",
    gain: "Exposure to international education and innovation ecosystems",
  },
  {
    icon: "globe",
    title: "Cultural experiences",
    gain: "Understanding of local traditions and global perspectives",
  },
  {
    icon: "users",
    title: "Networking",
    gain: "Opportunities to connect with peers and professionals",
  },
];

export type Format = { slug: string; title: string; text: string; image: string; icon: IconName };

export const formatsIntro =
  "We understand that every institution and organisation has different learning objectives. Zenvogo offers flexible programme formats.";

export const formats: Format[] = [
  {
    slug: "academic-immersion",
    title: "Academic Immersion Programmes",
    text: "Short-term international and domestic academic experiences designed around specific disciplines, management themes and institutional learning objectives.",
    image: "/images/immersion/format-academic.webp",
    icon: "graduation",
  },
  {
    slug: "executive-leadership-immersion",
    title: "Executive & Leadership Immersions",
    text: "Experiential learning journeys for senior professionals, managers and business leaders, combining faculty interactions and corporate exposure.",
    image: "/images/immersion/format-executive.webp",
    icon: "crown",
  },
  {
    slug: "industry-corporate-immersion",
    title: "Industry & Corporate Immersions",
    text: "Sector-specific programmes offering insights into industries, business models, operational practices and emerging technologies.",
    image: "/images/immersion/format-industry.webp",
    icon: "factory",
  },
  {
    slug: "customised-institutional-immersion",
    title: "Customised Institutional Immersions",
    text: "Bespoke programmes for universities, business schools and educational institutions, tailored to their academic calendars and cohort requirements.",
    image: "/images/immersion/format-customised.webp",
    icon: "design",
  },
];

export const lifecycleIntro = {
  title: "Our End-to-End Programme Management",
  tagline: "From programme concept to on-ground execution, we manage the details.",
  text: "Zenvogo supports institutions and organisations throughout the immersion lifecycle.",
};

export const lifecycle: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "search",
    title: "Programme Conceptualisation",
    text: "Understanding learning objectives, participant profiles, destination preferences and programme requirements.",
  },
  {
    icon: "handshake",
    title: "Academic & Industry Partnerships",
    text: "Identifying universities, faculty, industry experts and corporate engagement opportunities.",
  },
  {
    icon: "design",
    title: "Itinerary & Experience Design",
    text: "Developing a structured schedule of academic sessions, visits, networking and cultural experiences.",
  },
  {
    icon: "plane",
    title: "Travel & Logistics Coordination",
    text: "Coordinating accommodation, ground transportation, meals and local programme arrangements.",
  },
  {
    icon: "compass",
    title: "On-Ground Programme Management",
    text: "Managing participant coordination, programme schedules, institutional interactions and execution.",
  },
  {
    icon: "award",
    title: "Programme Closure & Feedback",
    text: "Gathering participant feedback, documenting outcomes and identifying opportunities for future programmes.",
  },
];

export const audiences: { icon: IconName; text: string }[] = [
  { icon: "bank", text: "Universities and business schools" },
  { icon: "graduation", text: "Higher education institutions" },
  { icon: "presentation", text: "Online and executive education providers" },
  { icon: "briefcase", text: "Corporate learning and development teams" },
  { icon: "network", text: "Industry associations and professional bodies" },
  { icon: "users", text: "Student groups and professional cohorts" },
];

export const whyChoose = {
  title: "Why Choose Zenvogo?",
  tagline: "Global exposure. Thoughtful design. Seamless execution.",
  items: [
    {
      icon: "target" as IconName,
      title: "Curated experiences",
      text: "Programmes built around specific learning outcomes rather than generic travel itineraries.",
    },
    {
      icon: "globe" as IconName,
      title: "Global network",
      text: "Access to academic institutions, industry experts and corporate engagement opportunities.",
    },
    {
      icon: "design" as IconName,
      title: "Customised approach",
      text: "Experiences designed around the needs of each institution and cohort.",
    },
    {
      icon: "handshake" as IconName,
      title: "End-to-end coordination",
      text: "A single programme partner supporting planning and execution.",
    },
    {
      icon: "growth" as IconName,
      title: "Meaningful outcomes",
      text: "A focus on practical insights, professional connections and cross-cultural understanding.",
    },
  ],
};

export const immersionCta = {
  title: "Let's Create Your Next Global Learning Experience.",
  text: "Whether you are a university planning an international immersion, a business school looking to expand experiential learning, or an organisation developing global leadership capabilities, Zenvogo can help bring your vision to life.",
  text2: "Let's design an immersion programme that makes learning travel further.",
  button: "Enquire About an Immersion Programme",
  image: "/images/immersion/cta-cohort.webp",
};

export const immersionFaqs = (d?: Destination) => [
  {
    q: d
      ? `Who can join an immersion programme in ${d.name}?`
      : "Who are immersion programmes for?",
    a: "Our immersions are designed for universities and business schools, higher education institutions, executive education providers, corporate L&D teams, professional bodies and student or professional cohorts.",
  },
  {
    q: "How long is an immersion programme?",
    a: "Duration is planned around your learning objectives and academic calendar — from short-term study tours to longer academic or executive immersions.",
  },
  {
    q: "Can the programme be customised for our institution?",
    a: "Yes. Every programme is designed around your learning outcomes, participant profile, destination preferences and schedule. We also offer fully customised institutional immersions.",
  },
  {
    q: "What does Zenvogo manage?",
    a: "Everything from conceptualisation, academic and industry partnerships and itinerary design to travel, accommodation, ground transport, meals, on-ground programme management and post-programme feedback.",
  },
  {
    q: "Are academic sessions and corporate visits included?",
    a: "Programmes combine academic sessions with faculty and experts, corporate visits, institutional interactions, cultural experiences and networking — tailored to each cohort.",
  },
  {
    q: "How do we get started?",
    a: "Share your requirements through the enquiry form. Our team will understand your objectives and come back with a proposed programme concept.",
  },
];
