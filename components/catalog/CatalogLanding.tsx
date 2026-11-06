import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import {
  categories,
  institutions,
  kindLabel,
  programmesIntro,
  programmesOf,
  type ProgrammeKind,
} from "@/lib/data/programmes";
import { icons } from "@/lib/icons";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { EnquiryForm } from "./EnquiryForm";
import { InstitutionMark, ProgrammeCard } from "./ProgrammeCard";
import { ProgrammeListing } from "./ProgrammeListing";
import { HeroBadge, SplitHero, StatStrip } from "./SplitHero";

export const learnerRoles = [
  "Working professional",
  "Manager / business leader",
  "Student / recent graduate",
  "Organisation (team enquiry)",
  "Academic institution",
];

const copy = {
  programme: {
    title: "Executive Education Programmes",
    bullets: [
      "Industry-focused executive education for professionals and leaders",
      "Programme development with IIM Kozhikode and IIT Dharwad",
      "Designed around the evolving needs of organisations",
    ],
    listTitle: "Explore all programmes",
  },
  certification: {
    title: "Professional Certifications",
    bullets: [
      "Practical certifications across six industry domains",
      "Developed with academic experts and industry practitioners",
      "Built for working professionals who want to upskill fast",
    ],
    listTitle: "Explore all certifications",
  },
} as const;

const reasons = [
  {
    title: "Industry-led design",
    text: "Every programme starts with the real challenges professionals and organisations face.",
  },
  {
    title: "Leading institutions",
    text: "Programme development with reputed institutions including IIM Kozhikode and IIT Dharwad.",
  },
  {
    title: "Practical learning",
    text: "Cases, projects and applied learning you can use at work straight away.",
  },
  {
    title: "Built for professionals",
    text: "Formats planned around the schedules of working professionals.",
  },
  {
    title: "Experts & practitioners",
    text: "Learn from academic faculty, subject-matter experts and industry practitioners.",
  },
  {
    title: "Global perspective",
    text: "Connected to Zenvogo's international immersion and institutional network.",
  },
];

const faqs = [
  {
    q: "When will Zenvogo programmes and certifications launch?",
    a: "Programme announcements, academic collaborations and enrolment details will be released soon. Register your interest on any programme page and we'll notify you first.",
  },
  {
    q: "What is the difference between a programme and a certification?",
    a: "Executive education programmes are deeper, longer learning journeys developed with academic institutions. Professional certifications are focused, skill-specific credentials you can complete faster.",
  },
  {
    q: "Which institutions is Zenvogo working with?",
    a: "Zenvogo's programme development focus includes IIM Kozhikode (executive education and management development) and IIT Dharwad (technology, innovation and future skills). We also intend to explore opportunities with other reputed universities, business schools and technical institutions in India and internationally.",
  },
  {
    q: "Can organisations enrol teams or request a custom programme?",
    a: "Yes. We work with organisations on team cohorts and customised programmes. Share your requirements through the enquiry form.",
  },
  {
    q: "Will programmes be online or on campus?",
    a: "Formats will be confirmed at launch and may include online, blended and on-campus learning, designed for working professionals.",
  },
];

/** Category landing page for programmes or certifications (upGrad-style listing). */
export function CatalogLanding({ kind }: { kind: ProgrammeKind }) {
  const items = programmesOf(kind);
  const label = kindLabel[kind];
  const c = copy[kind];
  const cards = Object.fromEntries(
    items.map((p) => [p.slug, <ProgrammeCard key={p.slug} programme={p} />]),
  );

  return (
    <>
      <SplitHero
        crumbs={[{ label: `Our ${label.plural}` }]}
        badges={
          <>
            <HeroBadge tone="green">
              <Sparkles className="size-3.5" /> New {label.plural.toLowerCase()} coming soon
            </HeroBadge>
            <HeroBadge>{programmesIntro.title}</HeroBadge>
          </>
        }
        title={c.title}
        tagline={programmesIntro.tagline}
        text={programmesIntro.text}
        bullets={[...c.bullets]}
        aside={
          <EnquiryForm
            interest={`All ${label.plural.toLowerCase()}`}
            title="Get launch updates"
            subtitle={`Hear first about new ${label.plural.toLowerCase()} and enrolment dates.`}
            roles={learnerRoles}
          />
        }
      />
      <StatStrip
        stats={[
          { value: String(items.length), label: `${label.plural} in development` },
          { value: "6", label: "Learning categories" },
          { value: "2", label: "Leading Indian institutions" },
          { value: "Online + Blended", label: "Formats planned" },
        ]}
      />

      {/* Listing */}
      <Section id="all" tone="light" className="scroll-mt-24">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow={`All ${label.plural}`}
            title={c.listTitle}
            text={programmesIntro.text2}
          />
          <Suspense
            fallback={
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((p) => (
                  <div key={p.slug}>{cards[p.slug]}</div>
                ))}
              </div>
            }
          >
            <ProgrammeListing kind={kind} cards={cards} />
          </Suspense>
        </Container>
      </Section>

      {/* Categories */}
      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="center"
            eyebrow="Programme categories"
            title="Explore by category"
            text="A growing portfolio across management, technology, finance and emerging industry domains."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((cat, i) => {
              const Icon = icons[cat.icon];
              const count = items.filter((p) => p.category === cat.slug).length;
              return (
                <Reveal key={cat.slug} delay={i * 0.05}>
                  <Link
                    href={`${label.base}?category=${cat.slug}#all`}
                    className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-white p-6 transition-all hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-[0_20px_40px_-24px_rgb(8_29_72/0.35)]"
                  >
                    <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-orange group-hover:text-white">
                      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="flex-1">
                      <span className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-navy">{cat.name}</span>
                        <span className="text-xs text-muted-foreground">{count}</span>
                      </span>
                      <span className="mt-1 block text-sm text-muted-foreground">{cat.themes}</span>
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Institutions */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Academic institutions"
            title="Academic institutions & programme development"
            text="Bringing academic expertise, industry knowledge and practical learning together."
          />
          <div className="grid gap-6 lg:grid-cols-3">
            {institutions.map((inst, i) => (
              <Reveal
                key={inst.slug}
                delay={i * 0.08}
                className="flex flex-col overflow-hidden rounded-2xl border border-border bg-white"
              >
                <div className="relative aspect-[16/7] bg-section">
                  <Image
                    src={inst.image}
                    alt={`${inst.name} campus`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center gap-3">
                    <InstitutionMark slug={inst.slug} size={52} />
                    <div>
                      <p className="text-lg font-bold text-navy">{inst.name}</p>
                      <span className="mt-0.5 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        Programme development focus
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{inst.focus}</p>
                  <div>
                    <p className="mb-2 text-sm font-semibold text-navy">
                      Potential programme areas
                    </p>
                    <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                      {inst.areas.map((a) => (
                        <li key={a} className="flex gap-2">
                          <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
            <Reveal
              delay={0.16}
              className="dark-section flex flex-col justify-between gap-6 rounded-2xl bg-navy p-8 text-white/75"
            >
              <div className="flex flex-col gap-4">
                <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-gold">
                  <Sparkles className="size-6" />
                </span>
                <p className="text-xl font-bold text-white">
                  Other Academic & Institutional Collaborations
                </p>
                <p>{programmesIntro.otherCollaborations}</p>
              </div>
              <Button href="/contact?type=institution" variant="outline-light" arrow>
                Partner with us
              </Button>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Coming soon */}
      <Section>
        <Container>
          <Reveal className="grid overflow-hidden rounded-3xl border border-border bg-white lg:grid-cols-2">
            <div className="relative min-h-64">
              <Image
                src="/images/programs/coming-soon-classroom.webp"
                alt="Professionals in an executive education classroom"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="flex flex-col justify-center gap-5 p-8 sm:p-12">
              <span className="w-fit rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold tracking-wider text-orange uppercase">
                Coming soon
              </span>
              <h2 className="text-[28px] font-bold sm:text-[34px]">
                {programmesIntro.comingSoon.title}
              </h2>
              <p className="text-muted-foreground">{programmesIntro.comingSoon.text}</p>
              <p className="text-muted-foreground">{programmesIntro.comingSoon.text2}</p>
              <div className="flex flex-wrap gap-3">
                <Button href="#apply" arrow>
                  Register Interest
                </Button>
                <Button href="/contact" variant="outline">
                  Talk to Us
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Why Zenvogo */}
      <Section tone="light">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            align="center"
            eyebrow="Why Zenvogo"
            title="Learning designed for what comes next"
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {reasons.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05} className="card p-7">
                <span className="text-3xl font-bold text-orange/80">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold">{r.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* FAQs */}
      <Section>
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-5">
            <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
            <Link
              href="/faq"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue"
            >
              More FAQs <ArrowRight className="size-4" />
            </Link>
          </div>
          <Accordion items={faqs} />
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
