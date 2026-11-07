import Link from "next/link";
import {
  ArrowRight,
  Award,
  CalendarClock,
  CheckCircle2,
  Clock,
  GraduationCap,
  Info,
  Laptop,
  MapPin,
  Wallet,
  Layers,
  UserCheck,
} from "lucide-react";
import {
  getCategory,
  getFacts,
  getInstitution,
  kindLabel,
  programmeFaqs,
  programmesOf,
  type Programme,
} from "@/lib/data/programmes";
import { icons, type IconName } from "@/lib/icons";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { learnerRoles } from "./CatalogLanding";
import { DetailNav, MobileApplyBar } from "./DetailNav";
import { EnquiryForm } from "./EnquiryForm";
import { InstitutionMark, ProgrammeCard } from "./ProgrammeCard";
import { HeroBadge, SplitHero } from "./SplitHero";

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "highlights", label: "Highlights" },
  { id: "audience", label: "Who It's For" },
  { id: "curriculum", label: "Curriculum" },
  { id: "faculty", label: "Faculty & Mentors" },
  { id: "details", label: "Programme Details" },
  { id: "faqs", label: "FAQs" },
];

export function ProgrammeDetail({ programme: p }: { programme: Programme }) {
  const cat = getCategory(p.category)!;
  const inst = getInstitution(p.institution);
  const facts = getFacts(p);
  const label = kindLabel[p.kind];
  const CatIcon = icons[cat.icon];
  const related = programmesOf(p.kind)
    .filter((x) => x.slug !== p.slug)
    .sort((a, b) => Number(b.category === p.category) - Number(a.category === p.category))
    .slice(0, 3);

  const highlights: { icon: IconName; title: string; text: string }[] = [
    {
      icon: "target",
      title: "Industry-focused curriculum",
      text: "Built around the real challenges professionals face at work.",
    },
    inst
      ? {
          icon: "bank",
          title: `Developed with ${inst.name}`,
          text: `Programme development focus: ${inst.focus.toLowerCase()}.`,
        }
      : {
          icon: "handshake",
          title: "Academic & industry experts",
          text: "Developed with subject-matter experts and industry practitioners.",
        },
    {
      icon: "presentation",
      title: "Faculty & practitioners",
      text: "Learn from academic faculty and experienced industry leaders.",
    },
    {
      icon: "briefcase",
      title: "Cases & applied projects",
      text: "Apply every concept to practical cases and your own context.",
    },
    {
      icon: "users",
      title: "Peer learning",
      text: "Learn alongside professionals from different industries and roles.",
    },
    {
      icon: "award",
      title:
        label.singular === "Programme" ? "Certificate on completion" : "Professional credential",
      text: "Certification details will be confirmed at launch.",
    },
  ];

  const factRows: { icon: React.ElementType; label: string; value: string }[] = [
    { icon: Layers, label: "Format", value: facts.format },
    { icon: Laptop, label: "Mode", value: facts.mode },
    { icon: MapPin, label: "Where", value: facts.location },
    { icon: Clock, label: "Duration", value: facts.duration },
    { icon: CalendarClock, label: "Timings", value: facts.schedule },
    { icon: UserCheck, label: "Eligibility", value: facts.eligibility },
    { icon: Award, label: "Certificate", value: facts.certificate },
    { icon: Wallet, label: "Fee", value: facts.fee },
  ];

  const cta = { label: "Register Interest", href: "#apply" };

  return (
    <>
      <SplitHero
        crumbs={[
          { label: `Our ${label.plural}`, href: label.base },
          { label: cat.name, href: `${label.base}?category=${cat.slug}` },
          { label: p.title },
        ]}
        badges={
          <>
            <HeroBadge tone="orange">Coming soon</HeroBadge>
            <HeroBadge>
              <CatIcon className="size-3.5" /> {cat.name}
            </HeroBadge>
            <HeroBadge>{label.singular}</HeroBadge>
          </>
        }
        title={p.title}
        text={p.summary}
        bullets={p.outcomes.slice(0, 3)}
        aside={
          <EnquiryForm
            interest={p.title}
            title="Register your interest"
            subtitle="Be the first to know when enrolment opens."
            roles={learnerRoles}
          />
        }
      >
        <div className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: inst ? "Institution" : "Offered by", v: inst?.name ?? "Zenvogo" },
              { k: "Format", v: label.singular },
              { k: "Duration", v: "To be announced" },
              { k: "Modules", v: `${p.modules.length} (indicative)` },
            ].map((f) => (
              <div
                key={f.k}
                className="rounded-xl border border-white/10 bg-white/[0.06] px-4 py-3"
              >
                <dt className="text-xs text-white/55">{f.k}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="btn-group">
            <Button href="#apply" arrow>
              Register Interest
            </Button>
            <Button href="#curriculum" variant="outline-light">
              View Curriculum
            </Button>
          </div>
        </div>
      </SplitHero>

      <DetailNav tabs={tabs} cta={cta} />

      {/* Overview */}
      <Section id="overview" className="scroll-mt-36">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Overview"
              title={`About this ${label.singular.toLowerCase()}`}
            />
            <Reveal>
              <p className="text-base text-muted-foreground sm:text-lg">{p.overview}</p>
            </Reveal>
            <Reveal className="rounded-2xl bg-section p-6 sm:p-8">
              <p className="mb-4 text-base font-semibold text-navy sm:text-lg">
                What you&apos;ll learn
              </p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {p.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-2.5 text-sm sm:text-[15px]">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal className="flex flex-col gap-5 self-start rounded-2xl border border-border bg-white p-6 sm:p-8">
            {inst ? (
              <>
                <div className="flex items-center gap-3">
                  <InstitutionMark slug={inst.slug} size={56} />
                  <div>
                    <p className="text-lg font-bold text-navy">{inst.name}</p>
                    <span className="mt-0.5 inline-block rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                      Programme development focus
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{inst.focus}</p>
                <ul className="flex flex-col gap-1.5 text-sm text-muted-foreground">
                  {inst.areas.map((a) => (
                    <li key={a} className="flex gap-2">
                      <span className="mt-2 size-1.5 shrink-0 rounded-full bg-orange" />
                      {a}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <>
                <span className="grid size-14 place-items-center rounded-xl bg-blue/10 text-blue">
                  <GraduationCap className="size-7" strokeWidth={1.75} />
                </span>
                <p className="text-lg font-bold text-navy">A Zenvogo professional certification</p>
                <p className="text-sm text-muted-foreground">
                  Developed with academic institutions, subject-matter experts and industry
                  practitioners. Delivery and certification partners will be announced at launch.
                </p>
              </>
            )}
            <div className="flex items-start gap-2.5 rounded-xl bg-orange/5 p-4 text-sm text-navy/80">
              <Info className="mt-0.5 size-4 shrink-0 text-orange" />
              This {label.singular.toLowerCase()} is in development. Dates, fees and enrolment
              details will be announced soon.
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Highlights */}
      <Section id="highlights" tone="light" className="scroll-mt-36">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Key highlights"
            title={`Why this ${label.singular.toLowerCase()}`}
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((h, i) => {
              const Icon = icons[h.icon];
              return (
                <Reveal key={h.title} delay={i * 0.05} className="flex gap-4 card p-6">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-blue/10 text-blue">
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{h.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{h.text}</span>
                  </span>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Who it's for */}
      <Section id="audience" className="scroll-mt-36">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr] lg:items-center">
          <SectionHeading
            eyebrow="Who it's for"
            title="Is this right for you?"
            text={`${facts.eligibility}.`}
          />
          <div className="grid gap-4 sm:grid-cols-2">
            {p.audience.map((a, i) => (
              <Reveal
                key={a}
                delay={i * 0.06}
                className="flex items-start gap-3 rounded-2xl border border-border bg-white p-5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-orange/10 text-sm font-bold text-orange">
                  {i + 1}
                </span>
                <span className="pt-1.5 text-[15px] font-medium text-navy">{a}</span>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Curriculum */}
      <Section id="curriculum" tone="navy" className="scroll-mt-36 overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light opacity-40" />
        <Container className="relative flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading tone="dark" eyebrow="Curriculum" title="Indicative curriculum" />
            <p className="flex max-w-sm items-start gap-2 text-sm text-white/60">
              <Info className="mt-0.5 size-4 shrink-0 text-gold" />
              The final syllabus will be designed with academic experts and industry practitioners
              and published at launch.
            </p>
          </div>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {p.modules.map((m, i) => (
              <Reveal
                as="li"
                key={m.title}
                delay={i * 0.05}
                className="group rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-orange/40 hover:bg-white/[0.07]"
              >
                <span className="text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                  Module {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-lg font-semibold text-white">{m.title}</h3>
                <p className="mt-2 text-xs font-semibold tracking-wide text-white/40 uppercase">
                  Learning objective
                </p>
                <p className="mt-1 text-sm text-white/70">{m.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Faculty & mentors */}
      <Section id="faculty" className="scroll-mt-36">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Faculty & mentors"
            title="Learn from academics and practitioners"
            text={
              p.faculty?.length
                ? undefined
                : "Faculty and mentors will be announced at launch. Every programme brings together three kinds of expertise."
            }
          />
          {p.faculty?.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {p.faculty.map((f) => (
                <Reveal key={f.name} className="card p-6">
                  <p className="font-semibold text-navy">{f.name}</p>
                  <p className="text-sm text-muted-foreground">{f.role}</p>
                </Reveal>
              ))}
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: "graduation" as IconName,
                  title: "Academic faculty",
                  text: inst
                    ? `Faculty and subject experts associated with ${inst.name}.`
                    : "Faculty from reputed universities and business schools.",
                },
                {
                  icon: "briefcase" as IconName,
                  title: "Industry practitioners",
                  text: "Senior professionals who bring real cases and current practice.",
                },
                {
                  icon: "users" as IconName,
                  title: "Programme mentors",
                  text: "Guidance and support to help you apply the learning at work.",
                },
              ].map((f, i) => {
                const Icon = icons[f.icon];
                return (
                  <Reveal
                    key={f.title}
                    delay={i * 0.06}
                    className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-section/50 p-6 text-center sm:p-8"
                  >
                    <span className="grid size-16 place-items-center rounded-full bg-white text-blue shadow-sm">
                      <Icon className="size-7" strokeWidth={1.6} />
                    </span>
                    <p className="font-semibold text-navy">{f.title}</p>
                    <p className="text-sm text-muted-foreground">{f.text}</p>
                    <span className="rounded-full bg-white px-3 py-1 text-xs font-medium text-muted-foreground">
                      Announced at launch
                    </span>
                  </Reveal>
                );
              })}
            </div>
          )}
        </Container>
      </Section>

      {/* Details */}
      <Section id="details" tone="light" className="scroll-mt-36">
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="Programme details" title="Where, when & how" />
          <Reveal className="grid overflow-hidden rounded-2xl border border-border bg-white sm:grid-cols-2 lg:grid-cols-4">
            {factRows.map((f) => (
              <div key={f.label} className="flex gap-3 border-b border-border p-6 sm:border-r">
                <f.icon className="mt-0.5 size-5 shrink-0 text-orange" />
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
                    {f.label}
                  </p>
                  <p className="mt-1 text-[15px] font-medium text-navy">{f.value}</p>
                </div>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      {/* FAQs */}
      <Section id="faqs" className="scroll-mt-36">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <Accordion items={programmeFaqs(p)} />
        </Container>
      </Section>

      {/* Apply band */}
      <Section tone="navy" className="overflow-hidden">
        <div
          aria-hidden
          className="absolute -top-32 -right-32 size-96 rounded-full bg-blue/30 blur-[120px]"
        />
        <Container className="relative grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
          <div className="flex flex-col gap-5">
            <span className="w-fit rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white">
              Apply now
            </span>
            <h2 className="text-[26px] font-bold text-white sm:text-[40px]">
              Be first in line when enrolment opens
            </h2>
            <p className="max-w-xl text-[15px] text-white/70 sm:text-lg">
              Register your interest in the {p.title}. We&apos;ll share the final curriculum, dates
              and fees as soon as they&apos;re announced.
            </p>
            <p className="text-sm text-white/60">
              Enquiring for a team?{" "}
              <Link
                href="/contact?type=industry"
                className="font-semibold text-gold hover:underline"
              >
                Talk to us about a cohort
              </Link>
            </p>
          </div>
          <EnquiryForm
            interest={p.title}
            title="Register your interest"
            subtitle="No commitment — we'll keep you posted."
            roles={learnerRoles}
          />
        </Container>
      </Section>

      {/* Related */}
      <Section>
        <Container className="flex flex-col gap-10">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow={`More ${label.plural.toLowerCase()}`}
              title="You may also like"
            />
            <Link
              href={label.base}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue"
            >
              View all {label.plural.toLowerCase()} <ArrowRight className="size-4" />
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ProgrammeCard key={r.slug} programme={r} />
            ))}
          </div>
        </Container>
      </Section>

      <MobileApplyBar title={p.title} cta={cta} />
    </>
  );
}
