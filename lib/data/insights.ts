export type Insight = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string; // ISO
  readTime: string;
  sections: { heading?: string; body: string[] }[];
};

export const insights: Insight[] = [
  {
    slug: "why-off-the-shelf-programmes-fail-senior-leaders",
    title: "Why off-the-shelf programmes fail senior leaders",
    excerpt:
      "Senior professionals don't lack access to courses. They lack courses that reflect the problems on their desk.",
    category: "Executive Education",
    date: "2026-10-20",
    readTime: "5 min read",
    sections: [
      {
        body: [
          "There has never been more executive education available. Yet many senior leaders finish a programme with a certificate and very little they can apply on Monday morning. The issue usually isn't quality — it's relevance.",
        ],
      },
      {
        heading: "The catalogue problem",
        body: [
          "Most platforms sell what institutions already offer. A programme designed for a broad audience has to stay general, which means it rarely addresses the specific pressures of a sector — regulation in real estate, margins in manufacturing, risk in financial services.",
        ],
      },
      {
        heading: "Starting with the challenge",
        body: [
          "Effective leadership learning starts by asking leaders what they're struggling with. When a curriculum is built from documented industry challenges, every module earns its place — and participants recognise their own reality in the case studies.",
        ],
      },
      {
        heading: "Keeping academic rigour",
        body: [
          "Relevance shouldn't come at the expense of depth. The strongest programmes pair industry insight with experienced faculty and are delivered and certified by credible institutions.",
        ],
      },
    ],
  },
  {
    slug: "industry-curated-learning-explained",
    title: "Industry-curated learning, explained",
    excerpt:
      "What it means to design a programme from the industry outwards — and why it changes outcomes.",
    category: "Our Approach",
    date: "2026-09-28",
    readTime: "4 min read",
    sections: [
      {
        body: [
          "Industry-curated learning reverses the usual order. Instead of choosing from existing programmes, an industry defines what needs to be learned and the programme is built to match.",
        ],
      },
      {
        heading: "Research first",
        body: [
          "The process begins with structured conversations and surveys with senior professionals in a sector. Patterns emerge quickly: common skill gaps, recurring decisions and emerging pressures.",
        ],
      },
      {
        heading: "Design with experts",
        body: [
          "Those insights become a brief for academic experts, who design a curriculum, choose formats and build assessments that reflect real work.",
        ],
      },
      {
        heading: "Deliver with institutions",
        body: [
          "Finally, a leading institution prepares, delivers and certifies the programme — giving participants recognised credentials for learning that's genuinely useful.",
        ],
      },
    ],
  },
  {
    slug: "what-ai-founders-need-beyond-funding",
    title: "What AI founders need beyond funding",
    excerpt:
      "Capital matters, but early AI startups more often stall for lack of industry access and the right mentors.",
    category: "AI Ventures",
    date: "2026-08-15",
    readTime: "4 min read",
    sections: [
      {
        body: [
          "AI startups are being founded at a remarkable pace. Many have strong technology but struggle to turn it into a business. Funding is part of the answer — but rarely the first part.",
        ],
      },
      {
        heading: "Industry access",
        body: [
          "Applied AI needs real problems and real data. Founders who can pilot with industry partners early learn faster and build products customers actually need.",
        ],
      },
      {
        heading: "Mentorship that's been there",
        body: [
          "Experienced operators help founders avoid predictable mistakes in pricing, hiring and go-to-market — and open doors that are otherwise hard to reach.",
        ],
      },
      {
        heading: "Then, investment readiness",
        body: [
          "With traction and a clear story, conversations with investors become far more productive. That's why incubation, mentorship, industry access and funding work best together.",
        ],
      },
    ],
  },
];

export const getInsight = (slug: string) => insights.find((p) => p.slug === slug);

export const formatDate = (iso: string) =>
  new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(
    new Date(`${iso}T12:00:00Z`),
  );
