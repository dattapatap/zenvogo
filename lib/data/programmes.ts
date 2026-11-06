import type { IconName } from "@/lib/icons";

/**
 * Programmes & Professional Certifications.
 *
 * Source: client document "Program Tab & Certification Tab".
 * Everything here is PRE-LAUNCH: institutions are a "programme development focus",
 * curricula are indicative and dates / fees / certification are to be announced.
 * When a programme is confirmed, set `status: "open"`, fill in `facts`, `faculty`
 * and replace the indicative `modules` with the final syllabus.
 */

/* ───────────────────────── Categories ───────────────────────── */

export type CategorySlug =
  | "leadership-management"
  | "technology-ai"
  | "banking-finance"
  | "marketing-business"
  | "industry-operations"
  | "entrepreneurship";

export type Category = {
  slug: CategorySlug;
  name: string;
  icon: IconName;
  themes: string;
  image: string;
};

export const categories: Category[] = [
  {
    slug: "leadership-management",
    name: "Leadership & Management",
    icon: "crown",
    themes: "Strategic leadership, general management, decision-making",
    image: "/images/immersion/format-executive.webp",
  },
  {
    slug: "technology-ai",
    name: "Technology & AI",
    icon: "brain",
    themes: "Generative AI, data analytics, digital transformation",
    image: "/images/immersion/experience-academic.webp",
  },
  {
    slug: "banking-finance",
    name: "Banking & Finance",
    icon: "bank",
    themes: "Banking operations, financial management, risk management",
    image: "/images/programs/classroom-executive.webp",
  },
  {
    slug: "marketing-business",
    name: "Marketing & Business",
    icon: "chart",
    themes: "Strategic marketing, sales leadership, customer experience",
    image: "/images/programs/coming-soon-classroom.webp",
  },
  {
    slug: "industry-operations",
    name: "Industry & Operations",
    icon: "factory",
    themes: "Real estate, logistics, healthcare and supply chain",
    image: "/images/immersion/format-industry.webp",
  },
  {
    slug: "entrepreneurship",
    name: "Entrepreneurship",
    icon: "rocket",
    themes: "Start-up management, innovation and business growth",
    image: "/images/immersion/experience-industry.webp",
  },
];

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

/* ───────────────────────── Institutions ───────────────────────── */

export type Institution = {
  slug: "iim-kozhikode" | "iit-dharwad";
  name: string;
  monogram: string;
  focus: string;
  areas: string[];
  logo?: string;
  image: string;
};

export const institutions: Institution[] = [
  {
    slug: "iim-kozhikode",
    name: "IIM Kozhikode",
    monogram: "IIMK",
    focus: "Executive education and management development",
    areas: [
      "Leadership and strategic management",
      "Business analytics and decision-making",
      "Finance and banking",
      "Marketing and customer experience",
      "Entrepreneurship and innovation",
    ],
    logo: "/images/institutions/iim-kozhikode-logo.webp",
    image: "/images/institutions/iim-kozhikode-campus.webp",
  },
  {
    slug: "iit-dharwad",
    name: "IIT Dharwad",
    monogram: "IIT",
    focus: "Technology, innovation and future skills",
    areas: [
      "Artificial Intelligence and Generative AI",
      "Data science and business analytics",
      "Emerging technologies",
      "Digital transformation",
      "Technology and innovation management",
    ],
    image: "/images/programs/campus-tower.webp",
  },
];

export const getInstitution = (slug?: string) => institutions.find((i) => i.slug === slug);

/* ───────────────────────── Programmes ───────────────────────── */

export type ProgrammeKind = "programme" | "certification";

export type Programme = {
  slug: string;
  kind: ProgrammeKind;
  title: string;
  category: CategorySlug;
  institution?: Institution["slug"];
  status: "coming-soon" | "open";
  summary: string;
  overview: string;
  audience: string[];
  outcomes: string[];
  /** Indicative until launch. */
  modules: { title: string; text: string }[];
  facts?: Partial<Facts>;
  faculty?: { name: string; role: string; image?: string }[];
};

export type Facts = {
  format: string;
  mode: string;
  duration: string;
  location: string;
  schedule: string;
  eligibility: string;
  certificate: string;
  fee: string;
};

const TBA = "To be announced";

export function getFacts(p: Programme): Facts {
  const inst = getInstitution(p.institution);
  return {
    format: p.kind === "programme" ? "Executive education programme" : "Professional certification",
    mode: "Online / blended — to be confirmed",
    duration: TBA,
    location: inst ? `Online & ${inst.name} campus — to be confirmed` : "Online — to be confirmed",
    schedule: "Designed for working professionals",
    eligibility: "Graduates and working professionals — details at launch",
    certificate: TBA,
    fee: TBA,
    ...p.facts,
  };
}

export const kindLabel = {
  programme: { singular: "Programme", plural: "Programmes", base: "/programs" },
  certification: { singular: "Certification", plural: "Certifications", base: "/certifications" },
} as const;

export const programmeHref = (p: Programme) => `${kindLabel[p.kind].base}/${p.slug}`;

export const programmes: Programme[] = [
  /* ── IIM Kozhikode: executive education & management development ── */
  {
    slug: "leadership-strategic-management",
    kind: "programme",
    title: "Executive Programme in Leadership & Strategic Management",
    category: "leadership-management",
    institution: "iim-kozhikode",
    status: "coming-soon",
    summary:
      "Strengthen strategic thinking and lead teams and organisations through change with confidence.",
    overview:
      "Designed for experienced managers and senior leaders, this programme focuses on the decisions leaders actually face — setting direction, allocating resources, leading people through change and building organisations that perform.",
    audience: [
      "Senior and middle managers preparing for larger roles",
      "Functional heads moving into general management",
      "Founders and business owners scaling their organisations",
      "High-potential professionals on a leadership track",
    ],
    outcomes: [
      "Formulate and execute competitive strategy",
      "Lead teams and stakeholders through change",
      "Make better decisions under uncertainty",
      "Build a personal leadership roadmap",
    ],
    modules: [
      {
        title: "Strategic Thinking & Analysis",
        text: "Industry analysis, competitive positioning and strategic choice.",
      },
      {
        title: "Leading People & Teams",
        text: "Motivation, influence and building high-performing teams.",
      },
      {
        title: "Leading Change",
        text: "Managing transformation, resistance and organisational culture.",
      },
      {
        title: "Decision-Making for Leaders",
        text: "Frameworks for judgement, risk and trade-offs.",
      },
      {
        title: "Strategy Execution",
        text: "Turning strategy into goals, metrics and accountability.",
      },
      {
        title: "Capstone: Leadership Action Plan",
        text: "Apply the learning to a real challenge from your organisation.",
      },
    ],
  },
  {
    slug: "business-analytics-decision-making",
    kind: "programme",
    title: "Executive Programme in Business Analytics & Decision-Making",
    category: "leadership-management",
    institution: "iim-kozhikode",
    status: "coming-soon",
    summary:
      "Use data and analytics to frame problems, evaluate options and make sharper business decisions.",
    overview:
      "A practical programme for managers who need to use data to make decisions — without becoming data scientists. Learn to ask the right questions, interpret analysis and turn insight into action.",
    audience: [
      "Managers who rely on reports and dashboards to decide",
      "Professionals moving into analytics-driven roles",
      "Business leaders building data-driven teams",
    ],
    outcomes: [
      "Frame business problems as analytical questions",
      "Interpret descriptive and predictive analysis",
      "Use data to evaluate options and risk",
      "Communicate insights to stakeholders",
    ],
    modules: [
      {
        title: "Data-Driven Decision-Making",
        text: "Why decisions fail and how evidence improves them.",
      },
      {
        title: "Descriptive Analytics & Visualisation",
        text: "Summarising and presenting data clearly.",
      },
      { title: "Statistics for Managers", text: "Sampling, inference and avoiding common traps." },
      {
        title: "Predictive Analytics",
        text: "Regression, forecasting and an introduction to machine learning.",
      },
      { title: "Decision Models", text: "Optimisation, scenarios and decision trees." },
      { title: "Analytics in Action", text: "Cases from marketing, operations and finance." },
    ],
  },
  {
    slug: "finance-banking",
    kind: "programme",
    title: "Executive Programme in Finance & Banking",
    category: "banking-finance",
    institution: "iim-kozhikode",
    status: "coming-soon",
    summary:
      "Build a strong foundation in corporate finance, banking and financial decision-making.",
    overview:
      "For professionals in and around financial services, this programme connects the fundamentals of finance with how banks and financial institutions operate, manage risk and create value.",
    audience: [
      "Banking and financial services professionals",
      "Non-finance managers who manage budgets and P&Ls",
      "Professionals preparing for finance leadership roles",
    ],
    outcomes: [
      "Read and analyse financial statements",
      "Evaluate investments and capital decisions",
      "Understand banking operations and regulation",
      "Assess and manage financial risk",
    ],
    modules: [
      {
        title: "Financial Accounting & Analysis",
        text: "Statements, ratios and financial health.",
      },
      { title: "Corporate Finance", text: "Valuation, capital budgeting and cost of capital." },
      {
        title: "Banking Operations & Regulation",
        text: "How banks work, lend and stay compliant.",
      },
      {
        title: "Financial Markets & Instruments",
        text: "Equity, debt, derivatives and market dynamics.",
      },
      { title: "Risk Management", text: "Credit, market and operational risk." },
      {
        title: "Fintech & the Future of Banking",
        text: "Digital banking, payments and disruption.",
      },
    ],
  },
  {
    slug: "marketing-customer-experience",
    kind: "programme",
    title: "Executive Programme in Marketing & Customer Experience",
    category: "marketing-business",
    institution: "iim-kozhikode",
    status: "coming-soon",
    summary:
      "Design marketing strategies and customer experiences that build brands and drive growth.",
    overview:
      "A programme for marketers and business leaders who want to connect strategy, brand and customer experience — using insight and data to win and keep customers.",
    audience: [
      "Marketing, brand and sales professionals",
      "Customer experience and service leaders",
      "Business owners responsible for growth",
    ],
    outcomes: [
      "Build customer-centric marketing strategy",
      "Design and measure customer journeys",
      "Use digital channels and analytics effectively",
      "Strengthen brand positioning",
    ],
    modules: [
      { title: "Marketing Strategy", text: "Segmentation, targeting and positioning." },
      { title: "Consumer Insight", text: "Understanding behaviour, needs and decision journeys." },
      { title: "Brand Management", text: "Building and measuring brand equity." },
      { title: "Customer Experience Design", text: "Journeys, touchpoints and service quality." },
      {
        title: "Digital & Data-Driven Marketing",
        text: "Channels, performance marketing and analytics.",
      },
      { title: "Growth & Retention", text: "Loyalty, lifetime value and customer success." },
    ],
  },
  {
    slug: "entrepreneurship-innovation",
    kind: "programme",
    title: "Executive Programme in Entrepreneurship & Innovation",
    category: "entrepreneurship",
    institution: "iim-kozhikode",
    status: "coming-soon",
    summary:
      "Turn ideas into ventures and lead innovation inside new and established organisations.",
    overview:
      "For founders, aspiring entrepreneurs and intrapreneurs, this programme covers how to identify opportunities, validate ideas, build business models and grow ventures sustainably.",
    audience: [
      "Founders and early-stage entrepreneurs",
      "Professionals planning to start a venture",
      "Innovation and new-business leaders in companies",
    ],
    outcomes: [
      "Identify and validate business opportunities",
      "Design scalable business models",
      "Understand funding and investor readiness",
      "Lead innovation in an organisation",
    ],
    modules: [
      { title: "Opportunity Discovery", text: "Finding problems worth solving." },
      { title: "Validation & Lean Experiments", text: "Testing ideas quickly with customers." },
      { title: "Business Model Design", text: "Value proposition, revenue and unit economics." },
      { title: "Funding & Investor Readiness", text: "Bootstrapping, angels, VCs and pitching." },
      { title: "Corporate Innovation", text: "Driving new initiatives inside organisations." },
      { title: "Scaling the Venture", text: "Teams, processes and growth strategy." },
    ],
  },

  /* ── IIT Dharwad: technology, innovation & future skills ── */
  {
    slug: "artificial-intelligence-generative-ai",
    kind: "programme",
    title: "Executive Programme in Artificial Intelligence & Generative AI",
    category: "technology-ai",
    institution: "iit-dharwad",
    status: "coming-soon",
    summary:
      "Understand AI and Generative AI, and apply them to real business and technology problems.",
    overview:
      "A programme for professionals who want a rigorous, practical understanding of AI — from machine learning foundations to large language models — and how to apply it responsibly at work.",
    audience: [
      "Technology professionals moving into AI",
      "Managers leading AI initiatives",
      "Product, data and engineering teams",
    ],
    outcomes: [
      "Understand core machine learning concepts",
      "Work with Generative AI and large language models",
      "Identify and scope AI use cases",
      "Apply AI responsibly and ethically",
    ],
    modules: [
      {
        title: "Foundations of AI & Machine Learning",
        text: "Key concepts, models and how they learn.",
      },
      { title: "Deep Learning", text: "Neural networks for vision, language and more." },
      { title: "Generative AI & LLMs", text: "How large language models work and where they fit." },
      {
        title: "Prompting & Building with GenAI",
        text: "Practical tools, workflows and applications.",
      },
      {
        title: "AI Strategy & Use Cases",
        text: "Prioritising, scoping and measuring AI projects.",
      },
      { title: "Responsible AI", text: "Ethics, governance, bias and risk." },
    ],
  },
  {
    slug: "data-science-business-analytics",
    kind: "programme",
    title: "Programme in Data Science & Business Analytics",
    category: "technology-ai",
    institution: "iit-dharwad",
    status: "coming-soon",
    summary: "Build hands-on data science skills and apply them to business analytics problems.",
    overview:
      "A hands-on programme covering the data science workflow — from data preparation and statistics to modelling and communicating results — grounded in real business use cases.",
    audience: [
      "Analysts and engineers building data skills",
      "Professionals moving into data roles",
      "Managers who work closely with data teams",
    ],
    outcomes: [
      "Clean, explore and visualise data",
      "Build and evaluate predictive models",
      "Apply analytics to business problems",
      "Communicate findings clearly",
    ],
    modules: [
      { title: "Programming for Data Science", text: "Python and essential libraries." },
      { title: "Statistics & Probability", text: "The foundations behind every model." },
      { title: "Data Wrangling & Visualisation", text: "Preparing and exploring real datasets." },
      { title: "Machine Learning", text: "Supervised and unsupervised methods." },
      {
        title: "Business Analytics Applications",
        text: "Marketing, operations and finance cases.",
      },
      { title: "Capstone Project", text: "An end-to-end analytics project." },
    ],
  },
  {
    slug: "emerging-technologies",
    kind: "programme",
    title: "Programme in Emerging Technologies",
    category: "technology-ai",
    institution: "iit-dharwad",
    status: "coming-soon",
    summary:
      "Understand the technologies reshaping industries — and how to evaluate and adopt them.",
    overview:
      "A broad, future-focused programme exploring the technologies changing how businesses operate — cloud, IoT, blockchain, automation and more — and how to assess their impact.",
    audience: [
      "Technology and innovation leaders",
      "Managers evaluating new technologies",
      "Professionals who want future-ready skills",
    ],
    outcomes: [
      "Understand key emerging technologies",
      "Evaluate technology readiness and impact",
      "Identify adoption opportunities",
      "Build a technology roadmap",
    ],
    modules: [
      { title: "Cloud & Edge Computing", text: "Infrastructure for modern digital business." },
      { title: "IoT & Industry 4.0", text: "Connected devices, sensors and smart operations." },
      { title: "Blockchain & Web3", text: "Distributed ledgers and real-world uses." },
      { title: "Automation & Robotics", text: "Process automation and intelligent systems." },
      { title: "Cybersecurity Essentials", text: "Protecting systems in a connected world." },
      { title: "Technology Assessment", text: "Evaluating and prioritising new technology." },
    ],
  },
  {
    slug: "digital-transformation",
    kind: "programme",
    title: "Executive Programme in Digital Transformation",
    category: "technology-ai",
    institution: "iit-dharwad",
    status: "coming-soon",
    summary: "Lead digital transformation — strategy, technology, people and change — end to end.",
    overview:
      "For leaders responsible for digital change, this programme connects strategy, technology and organisational change so transformation delivers measurable business outcomes.",
    audience: [
      "Business and technology leaders driving change",
      "Transformation, IT and operations heads",
      "Consultants and programme managers",
    ],
    outcomes: [
      "Shape a digital transformation strategy",
      "Select and integrate the right technologies",
      "Lead people and culture through change",
      "Measure transformation outcomes",
    ],
    modules: [
      { title: "Digital Strategy", text: "Business models and digital value creation." },
      { title: "Technology Foundations", text: "Cloud, data, AI and platforms." },
      { title: "Process & Customer Transformation", text: "Redesigning operations and journeys." },
      { title: "Data & AI for Transformation", text: "Using data as a strategic asset." },
      { title: "Change Leadership", text: "Culture, capability and adoption." },
      { title: "Governance & Measurement", text: "Roadmaps, KPIs and value tracking." },
    ],
  },
  {
    slug: "technology-innovation-management",
    kind: "programme",
    title: "Programme in Technology & Innovation Management",
    category: "technology-ai",
    institution: "iit-dharwad",
    status: "coming-soon",
    summary:
      "Manage technology, R&D and innovation portfolios to create lasting competitive advantage.",
    overview:
      "A programme for professionals who manage technology and innovation — covering R&D strategy, product development, intellectual property and commercialisation.",
    audience: [
      "R&D, engineering and product leaders",
      "Innovation and technology managers",
      "Entrepreneurs in technology-led ventures",
    ],
    outcomes: [
      "Manage innovation portfolios",
      "Lead technology and product development",
      "Understand IP and commercialisation",
      "Align technology with business strategy",
    ],
    modules: [
      { title: "Innovation Strategy", text: "Types of innovation and portfolio choices." },
      { title: "R&D Management", text: "Planning, funding and governing research." },
      { title: "Product Development", text: "From concept to launch." },
      { title: "Intellectual Property", text: "Patents, protection and licensing." },
      { title: "Technology Commercialisation", text: "Taking innovation to market." },
      {
        title: "Ecosystems & Partnerships",
        text: "Working with start-ups, academia and industry.",
      },
    ],
  },

  /* ── Professional certifications ── */
  {
    slug: "general-management",
    kind: "certification",
    title: "Professional Certification in General Management",
    category: "leadership-management",
    status: "coming-soon",
    summary: "A rounded foundation in managing people, operations, finance and strategy.",
    overview:
      "A professional certification covering the core disciplines every manager needs — people, operations, finance, marketing and strategy — in one practical, applied format.",
    audience: [
      "New and first-time managers",
      "Specialists moving into management",
      "Professionals preparing for broader roles",
    ],
    outcomes: [
      "Manage teams and performance",
      "Understand business finance",
      "Improve operational efficiency",
      "Think and plan strategically",
    ],
    modules: [
      { title: "Managing People", text: "Goals, feedback and team performance." },
      { title: "Operations Essentials", text: "Processes, quality and productivity." },
      { title: "Finance for Managers", text: "Budgets, P&L and financial decisions." },
      { title: "Marketing Essentials", text: "Customers, markets and value." },
      { title: "Strategy Basics", text: "Planning and competitive advantage." },
    ],
  },
  {
    slug: "strategic-decision-making",
    kind: "certification",
    title: "Professional Certification in Strategic Decision-Making",
    category: "leadership-management",
    status: "coming-soon",
    summary: "Make better, faster and more defensible decisions in complex situations.",
    overview:
      "A focused certification on structured decision-making — framing problems, weighing evidence and managing risk — for professionals who make high-stakes calls.",
    audience: [
      "Managers and team leads",
      "Consultants and analysts",
      "Leaders facing complex choices",
    ],
    outcomes: [
      "Structure complex problems",
      "Weigh evidence and trade-offs",
      "Avoid cognitive biases",
      "Communicate decisions clearly",
    ],
    modules: [
      { title: "Framing the Problem", text: "Defining the real decision." },
      { title: "Evidence & Analysis", text: "Using data and judgement together." },
      { title: "Biases & Behavioural Traps", text: "How good decision-makers go wrong." },
      { title: "Risk & Uncertainty", text: "Scenarios, probabilities and options." },
      { title: "Deciding Together", text: "Group decisions and stakeholder alignment." },
    ],
  },
  {
    slug: "generative-ai-for-professionals",
    kind: "certification",
    title: "Professional Certification in Generative AI",
    category: "technology-ai",
    status: "coming-soon",
    summary: "Practical Generative AI skills to work smarter across every function.",
    overview:
      "A hands-on certification for non-technical and technical professionals alike — learn how Generative AI tools work and apply them safely to everyday work.",
    audience: [
      "Professionals in any function",
      "Managers adopting AI in teams",
      "Educators and trainers",
    ],
    outcomes: [
      "Use GenAI tools effectively",
      "Write effective prompts",
      "Automate everyday tasks",
      "Use AI responsibly",
    ],
    modules: [
      { title: "How Generative AI Works", text: "Models, capabilities and limits." },
      { title: "Prompting Techniques", text: "Getting reliable, useful output." },
      { title: "GenAI for Productivity", text: "Writing, analysis, research and presentations." },
      { title: "Workflows & Automation", text: "Connecting AI to everyday processes." },
      { title: "Responsible Use", text: "Privacy, accuracy and governance." },
    ],
  },
  {
    slug: "data-analytics-for-business",
    kind: "certification",
    title: "Professional Certification in Data Analytics",
    category: "technology-ai",
    status: "coming-soon",
    summary: "Analyse and visualise data to answer real business questions.",
    overview:
      "A practical certification covering the analytics toolkit — spreadsheets, SQL, visualisation and storytelling — to turn data into decisions.",
    audience: [
      "Aspiring and junior analysts",
      "Business professionals working with data",
      "Managers who want data fluency",
    ],
    outcomes: [
      "Query and prepare data",
      "Build clear dashboards",
      "Apply basic statistics",
      "Tell stories with data",
    ],
    modules: [
      { title: "Analytics Foundations", text: "The analytics process and mindset." },
      { title: "Spreadsheets for Analysis", text: "Formulas, pivots and modelling." },
      { title: "SQL Essentials", text: "Querying business data." },
      { title: "Visualisation & Dashboards", text: "Designing views people use." },
      { title: "Data Storytelling", text: "Presenting insight that drives action." },
    ],
  },
  {
    slug: "banking-operations",
    kind: "certification",
    title: "Professional Certification in Banking Operations",
    category: "banking-finance",
    status: "coming-soon",
    summary: "Understand how modern banks operate — from products to compliance.",
    overview:
      "A certification for current and aspiring banking professionals covering retail and corporate banking operations, payments, compliance and customer service.",
    audience: [
      "Early-career banking professionals",
      "Graduates preparing for banking careers",
      "Operations and service teams",
    ],
    outcomes: [
      "Understand banking products and processes",
      "Apply KYC and compliance norms",
      "Handle payments and settlements",
      "Deliver better customer service",
    ],
    modules: [
      { title: "Banking Fundamentals", text: "The role and structure of banks." },
      { title: "Retail & Corporate Products", text: "Deposits, loans and services." },
      { title: "Payments & Settlements", text: "Systems, channels and digital payments." },
      { title: "Compliance & KYC", text: "Regulation, AML and controls." },
      {
        title: "Customer Service Excellence",
        text: "Service standards and relationship management.",
      },
    ],
  },
  {
    slug: "financial-management",
    kind: "certification",
    title: "Professional Certification in Financial Management",
    category: "banking-finance",
    status: "coming-soon",
    summary: "Plan, analyse and control finances to support better business decisions.",
    overview:
      "A practical certification in financial planning, analysis and control for finance professionals and managers who own budgets.",
    audience: [
      "Finance and accounts professionals",
      "Managers responsible for budgets",
      "Entrepreneurs managing their finances",
    ],
    outcomes: [
      "Analyse financial statements",
      "Build budgets and forecasts",
      "Evaluate investments",
      "Manage working capital",
    ],
    modules: [
      { title: "Financial Statements", text: "Reading and analysing the numbers." },
      { title: "Budgeting & Forecasting", text: "Planning and variance analysis." },
      { title: "Investment Appraisal", text: "NPV, IRR and capital decisions." },
      { title: "Working Capital", text: "Cash, receivables and inventory." },
      { title: "Financial Control", text: "Reporting, controls and governance." },
    ],
  },
  {
    slug: "risk-management",
    kind: "certification",
    title: "Professional Certification in Risk Management",
    category: "banking-finance",
    status: "coming-soon",
    summary: "Identify, measure and manage financial and operational risk.",
    overview:
      "A certification covering the principles and practice of risk management in financial services and businesses — from frameworks to measurement and mitigation.",
    audience: [
      "Risk, audit and compliance professionals",
      "Banking and finance professionals",
      "Managers responsible for controls",
    ],
    outcomes: [
      "Apply risk management frameworks",
      "Measure credit and market risk",
      "Manage operational risk",
      "Report risk effectively",
    ],
    modules: [
      { title: "Risk Management Frameworks", text: "Principles, appetite and governance." },
      { title: "Credit Risk", text: "Assessment, scoring and mitigation." },
      { title: "Market & Liquidity Risk", text: "Measurement and hedging." },
      { title: "Operational Risk", text: "Processes, people and systems." },
      { title: "Risk Reporting", text: "Dashboards, regulators and boards." },
    ],
  },
  {
    slug: "strategic-marketing",
    kind: "certification",
    title: "Professional Certification in Strategic Marketing",
    category: "marketing-business",
    status: "coming-soon",
    summary: "Build marketing strategies that create value for customers and the business.",
    overview:
      "A certification for marketers who want to think strategically — connecting market insight, positioning and the marketing mix to business goals.",
    audience: [
      "Marketing executives and managers",
      "Brand and product professionals",
      "Founders responsible for growth",
    ],
    outcomes: [
      "Analyse markets and competitors",
      "Craft positioning and value propositions",
      "Plan integrated campaigns",
      "Measure marketing ROI",
    ],
    modules: [
      { title: "Market Analysis", text: "Customers, competitors and context." },
      { title: "Positioning & Value", text: "Standing out in crowded markets." },
      { title: "Marketing Mix", text: "Product, price, place and promotion." },
      { title: "Integrated Campaigns", text: "Planning across channels." },
      { title: "Marketing Metrics", text: "Measuring what matters." },
    ],
  },
  {
    slug: "sales-leadership",
    kind: "certification",
    title: "Professional Certification in Sales Leadership",
    category: "marketing-business",
    status: "coming-soon",
    summary: "Lead high-performing sales teams and build predictable revenue.",
    overview:
      "A certification for sales managers and leaders covering sales strategy, team leadership, pipeline management and key account growth.",
    audience: [
      "Sales managers and team leads",
      "Senior sales professionals",
      "Business development leaders",
    ],
    outcomes: [
      "Design a sales strategy",
      "Coach and lead sales teams",
      "Manage pipeline and forecasts",
      "Grow key accounts",
    ],
    modules: [
      { title: "Sales Strategy", text: "Segments, territories and targets." },
      { title: "Leading Sales Teams", text: "Hiring, coaching and motivation." },
      { title: "Pipeline & Forecasting", text: "Process, CRM and predictability." },
      { title: "Key Account Management", text: "Growing strategic customers." },
      { title: "Negotiation", text: "Creating and capturing value." },
    ],
  },
  {
    slug: "customer-experience-management",
    kind: "certification",
    title: "Professional Certification in Customer Experience Management",
    category: "marketing-business",
    status: "coming-soon",
    summary: "Design and manage customer experiences that build loyalty.",
    overview:
      "A certification on understanding, designing and measuring customer experience across touchpoints — and building a customer-centric culture.",
    audience: [
      "CX, service and support professionals",
      "Marketing and product teams",
      "Operations leaders",
    ],
    outcomes: [
      "Map customer journeys",
      "Design better service experiences",
      "Measure CX with the right metrics",
      "Build a customer-centric culture",
    ],
    modules: [
      { title: "Customer Experience Foundations", text: "Why CX drives growth." },
      { title: "Journey Mapping", text: "Seeing the experience through customers' eyes." },
      { title: "Service Design", text: "Designing touchpoints and recovery." },
      { title: "Voice of the Customer", text: "NPS, CSAT and feedback loops." },
      { title: "CX Culture & Leadership", text: "Embedding customer focus." },
    ],
  },
  {
    slug: "real-estate-management",
    kind: "certification",
    title: "Professional Certification in Real Estate Management",
    category: "industry-operations",
    status: "coming-soon",
    summary: "Understand real estate development, investment and asset management.",
    overview:
      "A certification covering the real estate value chain — markets, development, finance, regulation and asset management.",
    audience: [
      "Real estate and construction professionals",
      "Investors and advisers",
      "Professionals entering the sector",
    ],
    outcomes: [
      "Analyse real estate markets",
      "Understand project development",
      "Evaluate real estate investments",
      "Navigate regulation",
    ],
    modules: [
      { title: "Real Estate Markets", text: "Segments, cycles and demand." },
      { title: "Project Development", text: "From land to completion." },
      { title: "Real Estate Finance", text: "Funding, valuation and returns." },
      { title: "Regulation & Compliance", text: "Approvals, RERA and contracts." },
      { title: "Asset & Facility Management", text: "Operating and maximising assets." },
    ],
  },
  {
    slug: "logistics-supply-chain",
    kind: "certification",
    title: "Professional Certification in Logistics & Supply Chain Management",
    category: "industry-operations",
    status: "coming-soon",
    summary: "Plan and run efficient, resilient supply chains.",
    overview:
      "A certification covering supply chain planning, procurement, logistics and digital supply chains — with a focus on efficiency and resilience.",
    audience: [
      "Supply chain and logistics professionals",
      "Procurement and operations teams",
      "Manufacturing and retail managers",
    ],
    outcomes: [
      "Plan demand and supply",
      "Optimise logistics and inventory",
      "Manage suppliers",
      "Build resilient supply chains",
    ],
    modules: [
      { title: "Supply Chain Strategy", text: "Design, trade-offs and performance." },
      { title: "Demand & Supply Planning", text: "Forecasting and S&OP." },
      { title: "Procurement & Sourcing", text: "Suppliers, contracts and cost." },
      { title: "Logistics & Warehousing", text: "Transport, distribution and inventory." },
      { title: "Digital & Resilient Supply Chains", text: "Visibility, technology and risk." },
    ],
  },
  {
    slug: "healthcare-management",
    kind: "certification",
    title: "Professional Certification in Healthcare Management",
    category: "industry-operations",
    status: "coming-soon",
    summary: "Manage healthcare operations, quality and patient experience.",
    overview:
      "A certification for professionals managing healthcare organisations — covering operations, quality, finance and patient experience.",
    audience: [
      "Hospital and clinic administrators",
      "Clinicians moving into management",
      "Healthcare business professionals",
    ],
    outcomes: [
      "Improve healthcare operations",
      "Apply quality and safety standards",
      "Understand healthcare finance",
      "Enhance patient experience",
    ],
    modules: [
      { title: "Healthcare Systems", text: "Structure, stakeholders and policy." },
      { title: "Hospital Operations", text: "Capacity, flow and efficiency." },
      { title: "Quality & Patient Safety", text: "Standards, accreditation and outcomes." },
      { title: "Healthcare Finance", text: "Costing, revenue and insurance." },
      { title: "Patient Experience", text: "Service, communication and trust." },
    ],
  },
  {
    slug: "start-up-management",
    kind: "certification",
    title: "Professional Certification in Start-up Management",
    category: "entrepreneurship",
    status: "coming-soon",
    summary: "The essentials of starting, running and funding a start-up.",
    overview:
      "A practical certification for founders and early team members covering the core of running a start-up — from idea and team to funding and operations.",
    audience: [
      "Aspiring and first-time founders",
      "Early start-up team members",
      "Professionals joining start-ups",
    ],
    outcomes: [
      "Validate a start-up idea",
      "Build an MVP and go-to-market",
      "Understand start-up finance and funding",
      "Build and lead an early team",
    ],
    modules: [
      { title: "From Idea to Opportunity", text: "Problem, customer and market." },
      { title: "MVP & Product-Market Fit", text: "Building, testing and learning." },
      { title: "Go-to-Market", text: "First customers and early growth." },
      { title: "Start-up Finance & Funding", text: "Runway, metrics and investors." },
      { title: "Team & Operations", text: "Hiring, culture and execution." },
    ],
  },
  {
    slug: "innovation-business-growth",
    kind: "certification",
    title: "Professional Certification in Innovation & Business Growth",
    category: "entrepreneurship",
    status: "coming-soon",
    summary: "Find new growth opportunities and turn innovation into results.",
    overview:
      "A certification on systematic innovation and growth — from spotting opportunities to scaling new products, markets and business models.",
    audience: [
      "Business owners and SME leaders",
      "Growth and strategy professionals",
      "Innovation managers",
    ],
    outcomes: [
      "Identify growth opportunities",
      "Apply innovation methods",
      "Test and scale new ideas",
      "Build a growth plan",
    ],
    modules: [
      { title: "Growth Strategy", text: "Where to play and how to win." },
      { title: "Design Thinking", text: "Human-centred innovation." },
      { title: "Business Model Innovation", text: "New ways to create and capture value." },
      { title: "Experimentation", text: "Testing ideas before scaling." },
      { title: "Scaling Up", text: "Systems, teams and markets." },
    ],
  },
];

export const programmesOf = (kind: ProgrammeKind) => programmes.filter((p) => p.kind === kind);
export const getProgramme = (kind: ProgrammeKind, slug: string) =>
  programmes.find((p) => p.kind === kind && p.slug === slug);

/** Page copy (from the client document). */
export const programmesIntro = {
  title: "Programmes & Professional Certifications",
  tagline: "Learn. Upskill. Lead.",
  text: "Discover industry-focused executive education programmes, professional certifications and specialised learning experiences designed to meet the evolving needs of today's professionals and organisations.",
  text2:
    "Zenvogo aims to bring together academic expertise, industry knowledge and practical learning through collaborations with leading educational institutions, subject-matter experts and industry practitioners.",
  comingSoon: {
    title: "New Programmes & Certifications",
    text: "We are working towards developing a portfolio of specialised executive education programmes and professional certifications across management, technology, finance and emerging industry domains.",
    text2:
      "Programme announcements, academic collaborations and enrolment details will be released soon.",
  },
  otherCollaborations:
    "We also intend to explore programme development opportunities with other reputed universities, business schools and technical institutions in India and internationally.",
};

export const programmeFaqs = (p: Programme) => {
  const inst = getInstitution(p.institution);
  const k = kindLabel[p.kind].singular.toLowerCase();
  return [
    {
      q: `When will this ${k} launch?`,
      a: "This programme is currently in development. Launch dates, schedules and enrolment details will be announced soon. Register your interest and we'll notify you first.",
    },
    {
      q: "Who is this programme designed for?",
      a: `It is designed for ${p.audience[0].toLowerCase()} and others listed under "Who is this for". Final eligibility criteria will be published at launch.`,
    },
    {
      q: "Is the curriculum final?",
      a: "The curriculum shown is indicative. The final syllabus will be designed with academic experts and industry practitioners and published at launch.",
    },
    inst
      ? {
          q: `What is ${inst.name}'s role?`,
          a: `${inst.name} is a programme development focus for Zenvogo in ${inst.focus.toLowerCase()}. The nature of the academic collaboration and certification will be confirmed at launch.`,
        }
      : {
          q: "Who will deliver and certify this programme?",
          a: "Zenvogo is developing this certification with academic institutions, subject-matter experts and industry practitioners. Delivery and certification partners will be announced at launch.",
        },
    {
      q: "What will the fee and format be?",
      a: "Fees, duration and delivery format (online, blended or on-campus) will be announced with the programme launch.",
    },
    {
      q: "Can organisations enrol their teams?",
      a: "Yes. We welcome organisations interested in cohorts for their teams — and can discuss a customised version. Get in touch through the enquiry form.",
    },
  ];
};
