import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CheckCircle2, MapPin } from "lucide-react";
import {
  approach,
  destinations,
  formatsIntro,
  getDestination,
  immersionCta,
  immersionFaqs,
  immersionIntro,
  lifecycleIntro,
} from "@/lib/data/immersions";
import { icons, type IconName } from "@/lib/icons";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DetailNav, MobileApplyBar } from "@/components/catalog/DetailNav";
import { EnquiryForm } from "@/components/catalog/EnquiryForm";
import {
  AudienceSection,
  DestinationCard,
  ExperienceSection,
  FormatsSection,
  ImmersionApplyBand,
  LifecycleSection,
  institutionRoles,
} from "@/components/catalog/ImmersionBlocks";
import { HeroBadge, SplitHero } from "@/components/catalog/SplitHero";

/** Icons for learning themes, matched by keyword. */
const themeIcon = (t: string): IconName => {
  const s = t.toLowerCase();
  if (s.includes("finance") || s.includes("banking") || s.includes("invest")) return "bank";
  if (s.includes("entrepreneur") || s.includes("start-up")) return "rocket";
  if (s.includes("manufactur") || s.includes("supply")) return "factory";
  if (s.includes("digital") || s.includes("technology")) return "brain";
  if (s.includes("luxury") || s.includes("fashion") || s.includes("brand")) return "design";
  if (s.includes("tourism") || s.includes("hospitality")) return "plane";
  if (s.includes("real estate") || s.includes("infrastructure")) return "building";
  if (s.includes("health")) return "health";
  if (s.includes("sustainab") || s.includes("development")) return "sprout";
  if (s.includes("leadership")) return "crown";
  if (s.includes("trade") || s.includes("international") || s.includes("global")) return "globe";
  return "compass";
};

const tabs = [
  { id: "overview", label: "Overview" },
  { id: "themes", label: "Learning Themes" },
  { id: "experience", label: "Experience" },
  { id: "formats", label: "Formats" },
  { id: "process", label: "How It Works" },
  { id: "audience", label: "Who It's For" },
  { id: "faqs", label: "FAQs" },
];

export function generateStaticParams() {
  return destinations.map((d) => ({ slug: d.slug }));
}

export async function generateMetadata(
  props: PageProps<"/immersion-programs/[slug]">,
): Promise<Metadata> {
  const { slug } = await props.params;
  const d = getDestination(slug);
  return d
    ? {
        title: `${d.name} Immersion Programme`,
        description: d.text,
        openGraph: { images: [d.image] },
      }
    : {};
}

export default async function DestinationPage(props: PageProps<"/immersion-programs/[slug]">) {
  const { slug } = await props.params;
  const d = getDestination(slug);
  if (!d) notFound();

  const others = destinations.filter((x) => x.slug !== d.slug);
  const interest = `${d.name} immersion programme`;
  const cta = { label: "Enquire Now", href: "#apply" };

  return (
    <>
      <SplitHero
        image={d.image}
        crumbs={[{ label: "Immersion Programs", href: "/immersion-programs" }, { label: d.name }]}
        badges={
          <>
            <HeroBadge tone="orange">
              <MapPin className="size-3.5" /> {d.name}
            </HeroBadge>
            <HeroBadge>{d.region}</HeroBadge>
            <HeroBadge>Global Immersion Programme</HeroBadge>
          </>
        }
        title={
          <>
            {d.name} <span className="text-orange">–</span>{" "}
            <span className="block text-[0.72em] text-white/90">{d.title}</span>
          </>
        }
        text={d.text}
        aside={
          <EnquiryForm
            interest={interest}
            title={`Plan a ${d.name} immersion`}
            subtitle="Share your requirements — we'll design the programme around them."
            roles={institutionRoles}
            organisation
            button="Enquire Now"
          />
        }
      >
        <div className="flex flex-col gap-6">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { k: "Destination", v: d.name },
              { k: "Formats", v: "Academic · Executive · Industry · Custom" },
              { k: "Duration", v: "Tailored to your calendar" },
              { k: "Participants", v: "Student & professional cohorts" },
            ].map((f) => (
              <div
                key={f.k}
                className="rounded-xl border border-white/10 bg-white/[0.08] px-4 py-3 backdrop-blur"
              >
                <dt className="text-xs text-white/55">{f.k}</dt>
                <dd className="mt-0.5 text-sm font-semibold text-white">{f.v}</dd>
              </div>
            ))}
          </dl>
          <div className="btn-group">
            <Button href="#apply" arrow>
              {immersionCta.button}
            </Button>
            <Button href="#themes" variant="outline-light">
              Learning Themes
            </Button>
          </div>
        </div>
      </SplitHero>

      <DetailNav tabs={tabs} cta={cta} />

      {/* Overview */}
      <Section id="overview" className="scroll-mt-36">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading eyebrow="Overview" title={`Learning journeys in ${d.name}`} />
            <Reveal className="flex flex-col gap-4 text-base text-muted-foreground sm:text-lg">
              <p>{d.text}</p>
              <p>{immersionIntro.partnerText}</p>
            </Reveal>
          </div>
          <Reveal className="self-start rounded-2xl bg-section p-6 sm:p-8">
            <p className="mb-5 text-base font-semibold text-navy sm:text-lg">
              Every programme can combine
            </p>
            <ul className="flex flex-col gap-3.5">
              {approach.map((a) => {
                const Icon = icons[a.icon];
                return (
                  <li key={a.text} className="flex items-start gap-3 text-sm sm:text-[15px]">
                    <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-white text-orange shadow-sm">
                      <Icon className="size-4" strokeWidth={1.75} />
                    </span>
                    <span className="pt-1">{a.text}</span>
                  </li>
                );
              })}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Learning themes */}
      <Section id="themes" tone="light" className="scroll-mt-36">
        <Container className="flex flex-col gap-10">
          <SectionHeading
            eyebrow="Potential learning themes"
            title={`What participants explore in ${d.name}`}
            text="Each programme is built around the themes that matter to your cohort — these are where we typically start."
          />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {d.themes.map((t, i) => {
              const Icon = icons[themeIcon(t)];
              return (
                <Reveal
                  key={t}
                  delay={i * 0.06}
                  className="group flex flex-col gap-4 card p-6 transition-colors hover:border-orange/40"
                >
                  <div className="flex items-center justify-between">
                    <span className="grid size-12 place-items-center rounded-xl bg-blue/10 text-blue transition-colors group-hover:bg-orange group-hover:text-white">
                      <Icon className="size-6" strokeWidth={1.75} />
                    </span>
                    <span className="text-2xl font-bold text-navy/10">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-semibold text-navy">{t}</p>
                </Reveal>
              );
            })}
          </div>
          <Reveal className="flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-orange/40 bg-orange/5 p-6 sm:flex-row sm:items-center">
            <p className="flex items-start gap-2.5 text-navy">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange" />
              Need a different focus? Themes, visits and sessions are customised for every
              institution and cohort.
            </p>
            <Button href="#apply" variant="secondary" className="w-full shrink-0 sm:w-auto">
              Customise a programme
            </Button>
          </Reveal>
        </Container>
      </Section>

      <ExperienceSection id="experience" />
      <FormatsSection id="formats" intro={formatsIntro} />
      <LifecycleSection
        id="process"
        title={lifecycleIntro.title}
        tagline={lifecycleIntro.tagline}
        text={lifecycleIntro.text}
      />
      <AudienceSection id="audience" />

      {/* FAQs */}
      <Section id="faqs" tone="light" className="scroll-mt-36">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQs" title={`${d.name} immersion FAQs`} />
          <Accordion items={immersionFaqs(d)} />
        </Container>
      </Section>

      <ImmersionApplyBand
        title={immersionCta.title}
        text={immersionCta.text}
        text2={immersionCta.text2}
        image={d.image}
        form={
          <EnquiryForm
            interest={interest}
            title={immersionCta.button}
            subtitle="Our team will respond within one business day."
            roles={institutionRoles}
            organisation
            button="Send Enquiry"
          />
        }
      />

      {/* Other destinations */}
      <Section>
        <Container className="flex flex-col gap-10">
          <SectionHeading eyebrow="More destinations" title="Explore other destinations" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.06}>
                <DestinationCard d={o} />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <MobileApplyBar title={`${d.name} Immersion Programme`} cta={cta} />
    </>
  );
}
