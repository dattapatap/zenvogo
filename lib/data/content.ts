import type { IconName } from "@/lib/icons";

type Item = { title: string; text: string; icon: IconName };

/** The five-step Zenvogo approach. */
export const approach: Item[] = [
  {
    title: "Understand industry challenges",
    text: "We survey senior professionals in a sector to uncover the problems they're really trying to solve.",
    icon: "search",
  },
  {
    title: "Engage industry leaders",
    text: "Leaders and practitioners validate the challenges and shape what the programme must deliver.",
    icon: "users",
  },
  {
    title: "Collaborate with academic experts",
    text: "Our empanelled professors from Indian and international universities translate challenges into learning.",
    icon: "graduation",
  },
  {
    title: "Design a custom curriculum",
    text: "A programme built for the brief — content, format, faculty and assessment — not lifted from a catalogue.",
    icon: "design",
  },
  {
    title: "Deliver through leading institutions",
    text: "We partner with leading institutions to deliver and certify the programme, then bring it back to the industry.",
    icon: "award",
  },
];

/** Credentials shown in the trust strip. ⚠️ Confirm wording with the founders. */
export const credentials: Item[] = [
  {
    title: "Founded by IAM alumni",
    text: "A leadership team with management-school roots.",
    icon: "graduation",
  },
  {
    title: "EdTech leadership experience",
    text: "Team members from UpGrad, Emeritus and Great Learning.",
    icon: "briefcase",
  },
  {
    title: "Empanelled faculty",
    text: "Professors from leading Indian and UK universities.",
    icon: "book",
  },
  { title: "Part of Zen Voyage", text: "Backed by Zen Voyage Travel Solutions.", icon: "plane" },
];

/** How Zenvogo differs from catalogue-led learning platforms. */
export const comparison = {
  them: [
    "Resell programmes institutions already offer",
    "One catalogue for every industry",
    "Learner chooses from what exists",
    "Content rarely reflects sector challenges",
  ],
  us: [
    "Programmes designed from industry research",
    "Curricula built for a specific sector",
    "Industry defines what needs to be learned",
    "Faculty and institutions brought to the brief",
  ],
};

export const industries: { name: string; icon: IconName }[] = [
  { name: "Real Estate & Construction", icon: "hardhat" },
  { name: "Banking & Financial Services", icon: "bank" },
  { name: "Manufacturing", icon: "factory" },
  { name: "Healthcare & Life Sciences", icon: "health" },
  { name: "Technology & IT Services", icon: "network" },
  { name: "Logistics & Supply Chain", icon: "logistics" },
  { name: "Retail & Consumer", icon: "briefcase" },
  { name: "Energy & Infrastructure", icon: "idea" },
];

/** Illustrative case study from the founder brief. */
export const caseStudy = {
  sector: "Real estate & construction",
  title: "Designing a programme for the builder community",
  intro:
    "An example of how a Zenvogo programme comes to life — starting with the people who'll use it.",
  steps: [
    {
      title: "Survey",
      text: "We ask senior management across builder firms about their biggest challenges.",
    },
    {
      title: "Synthesise",
      text: "Responses are distilled into the themes that matter most to the sector.",
    },
    {
      title: "Design",
      text: "Empanelled professors build a curriculum and programme around those themes.",
    },
    {
      title: "Partner",
      text: "We approach leading institutions to prepare and certify the course.",
    },
    {
      title: "Offer",
      text: "We return to the industry with a ready programme and a credible institution.",
    },
  ],
};

/** Who Zenvogo works with — used for audience paths. */
export const paths: (Item & { cta: string; href: string })[] = [
  {
    title: "Industries & enterprises",
    text: "Tell us your challenges. We'll design learning that addresses them.",
    icon: "building",
    cta: "Discuss your needs",
    href: "/contact?type=industry",
  },
  {
    title: "Academic institutions",
    text: "Co-create and deliver industry-relevant programmes with us.",
    icon: "graduation",
    cta: "Partner with us",
    href: "/contact?type=institution",
  },
  {
    title: "Senior professionals",
    text: "Join programmes built for the realities of your sector.",
    icon: "crown",
    cta: "Explore programmes",
    href: "/solutions",
  },
  {
    title: "AI startups",
    text: "Incubation, mentorship and funding support for AI founders.",
    icon: "rocket",
    cta: "Apply to AI Ventures",
    href: "/ai-ventures",
  },
];

export const academicNetwork = {
  pillars: [
    {
      title: "Empanelled professors",
      text: "Faculty from leading universities in India and the United Kingdom who design and review our curricula.",
      icon: "graduation",
    },
    {
      title: "Leading institutions",
      text: "Institutions that deliver and certify Zenvogo-designed programmes, giving learners recognised credentials.",
      icon: "bank",
    },
    {
      title: "Industry practitioners",
      text: "Senior professionals who bring real cases, context and accountability into every programme.",
      icon: "briefcase",
    },
  ] satisfies Item[],
  benefits: [
    "Access to industry-validated programme briefs",
    "Co-designed curricula with real-world relevance",
    "New learner audiences across sectors",
    "Joint certification and research opportunities",
  ],
};

export const aiVentures = {
  offerings: [
    {
      title: "Incubation",
      text: "A structured environment to take AI ideas from concept to a working product.",
      icon: "sprout",
    },
    {
      title: "Mentorship",
      text: "Guidance from operators, technologists and academics who've built and scaled businesses.",
      icon: "chat",
    },
    {
      title: "Industry access",
      text: "Introductions to enterprises and sectors in our network looking for AI solutions.",
      icon: "handshake",
    },
    {
      title: "Funding facilitation",
      text: "Support preparing for investment and connections to investors and funding partners.",
      icon: "wallet",
    },
  ] satisfies Item[],
  stages: [
    { title: "Apply", text: "Share your idea, team and progress." },
    { title: "Evaluate", text: "We assess fit, potential and support needs." },
    { title: "Incubate", text: "Build with mentorship and resources." },
    { title: "Grow", text: "Pilot with industry partners." },
    { title: "Fund", text: "Get investment-ready and meet investors." },
  ],
  focus: [
    "Applied AI for industry",
    "AI in education & learning",
    "Enterprise automation",
    "Data & analytics",
  ],
};

export const values: Item[] = [
  {
    title: "Industry first",
    text: "Every programme begins with a real challenge, not a product to sell.",
    icon: "target",
  },
  {
    title: "Academic rigour",
    text: "Expert faculty and leading institutions behind everything we build.",
    icon: "book",
  },
  {
    title: "Global outlook",
    text: "Perspectives and partnerships that cross borders.",
    icon: "globe",
  },
  {
    title: "Innovation",
    text: "Backing the AI founders and ideas shaping the future of work.",
    icon: "idea",
  },
];

export const faqs = [
  {
    q: "How is Zenvogo different from other online learning platforms?",
    a: "Most platforms sell programmes that institutions already offer. Zenvogo starts with the industry: we research the challenges senior professionals face, work with empanelled professors to design a curriculum, and partner with leading institutions to deliver and certify it.",
  },
  {
    q: "Who are your programmes for?",
    a: "Primarily senior and mid-level professionals and the organisations they work for. We also run global education and exchange programmes for students, and support AI startups through Zenvogo AI Ventures.",
  },
  {
    q: "Can you design a programme for our organisation or industry body?",
    a: "Yes — that's what we do best. Get in touch and we'll begin with a conversation about your challenges, then propose a programme design, faculty and delivering institution.",
  },
  {
    q: "Which institutions do you work with?",
    a: "We work with empanelled faculty from leading universities in India and the UK, and partner with institutions to deliver and certify programmes. Partners are chosen to fit each programme's brief.",
  },
  {
    q: "Are programmes online or in person?",
    a: "Both. Depending on the audience we design cohort-based online programmes, in-person residencies, blended journeys and international immersions.",
  },
  {
    q: "How does AI Ventures support startups?",
    a: "Zenvogo AI Ventures helps AI startups incubate, find mentors, access industry partners and prepare for funding. Founders can apply through the AI Ventures page.",
  },
];

/** Cities plotted on the 3D globe (lat, lng in degrees). India is the hub. */
export const globalNetwork = [
  { name: "Hyderabad", lat: 17.39, lng: 78.49, hub: true },
  { name: "London", lat: 51.5, lng: -0.12 },
  { name: "Liverpool", lat: 53.41, lng: -2.98 },
  { name: "Singapore", lat: 1.35, lng: 103.82 },
  { name: "Dubai", lat: 25.2, lng: 55.27 },
  { name: "Boston", lat: 42.36, lng: -71.06 },
  { name: "San Francisco", lat: 37.77, lng: -122.42 },
  { name: "Toronto", lat: 43.65, lng: -79.38 },
  { name: "Sydney", lat: -33.87, lng: 151.21 },
  { name: "Berlin", lat: 52.52, lng: 13.4 },
  { name: "Tokyo", lat: 35.68, lng: 139.69 },
  { name: "Bengaluru", lat: 12.97, lng: 77.59 },
];

/** Leadership profiles — add real profiles when available. */
export const teamBackgrounds = ["IAM alumni", "UpGrad", "Emeritus", "Great Learning"];
