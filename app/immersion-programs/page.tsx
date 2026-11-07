import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Globe2 } from "lucide-react";
import {
  approach,
  destinations,
  formatsIntro,
  immersionCta,
  immersionFaqs,
  immersionIntro,
  lifecycleIntro,
} from "@/lib/data/immersions";
import { icons } from "@/lib/icons";
import { Accordion } from "@/components/ui/Accordion";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
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
import { HeroBadge, SplitHero, StatStrip } from "@/components/catalog/SplitHero";

export const metadata: Metadata = {
  title: "Global Immersion Programmes",
  description: immersionIntro.text,
};

export default function ImmersionProgrammesPage() {
  return (
    <>
      <SplitHero
        image="/images/immersion/hero-cohort.webp"
        crumbs={[{ label: "Immersion Programs" }]}
        badges={
          <>
            <HeroBadge tone="orange">
              <Globe2 className="size-3.5" /> International & domestic
            </HeroBadge>
            <HeroBadge>{immersionIntro.sectionTitle}</HeroBadge>
          </>
        }
        title={immersionIntro.title}
        tagline={immersionIntro.tagline}
        text={immersionIntro.text}
        aside={
          <EnquiryForm
            interest="Immersion programme (general)"
            title="Plan an immersion"
            subtitle="Tell us about your cohort and we'll propose a programme."
            roles={institutionRoles}
            organisation
            button="Enquire Now"
          />
        }
      >
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap gap-2">
            {destinations.map((d) => (
              <Link
                key={d.slug}
                href={`/immersion-programs/${d.slug}`}
                className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-sm font-medium text-white backdrop-blur transition-colors hover:border-orange hover:bg-orange"
              >
                {d.name}
              </Link>
            ))}
          </div>
          <div className="btn-group">
            <Button href="#destinations" arrow>
              Explore Destinations
            </Button>
            <Button href="#apply" variant="outline-light">
              <span className="sm:hidden">Enquire Now</span>
              <span className="max-sm:hidden">{immersionCta.button}</span>
            </Button>
          </div>
        </div>
      </SplitHero>
      <StatStrip
        stats={[
          { value: String(destinations.length), label: "Global destinations" },
          { value: "4", label: "Flexible programme formats" },
          { value: "6-stage", label: "End-to-end programme management" },
          { value: "1", label: "Single partner, concept to closure" },
        ]}
      />

      {/* Intro + approach */}
      <Section>
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <Reveal className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image
                src="/images/immersion/hero-students.webp"
                alt="Students on an international campus"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -right-4 -bottom-8 hidden w-1/2 overflow-hidden rounded-2xl border-4 border-white shadow-xl sm:block">
              <div className="relative aspect-[4/3]">
                <Image
                  src="/images/immersion/experience-culture.webp"
                  alt=""
                  fill
                  sizes="25vw"
                  className="object-cover"
                />
              </div>
            </div>
          </Reveal>
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="Global immersion programmes"
              title={immersionIntro.sectionText}
              text={immersionIntro.partnerText}
            />
            <Reveal>
              <p className="mb-4 font-semibold text-navy">Our approach combines:</p>
              <ul className="grid gap-3 sm:grid-cols-2">
                {approach.map((a) => {
                  const Icon = icons[a.icon];
                  return (
                    <li key={a.text} className="flex items-start gap-3 text-sm sm:text-[15px]">
                      <span className="grid size-9 shrink-0 place-items-center rounded-lg bg-orange/10 text-orange">
                        <Icon className="size-[18px]" strokeWidth={1.75} />
                      </span>
                      <span className="pt-1">{a.text}</span>
                    </li>
                  );
                })}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Destinations */}
      <Section id="destinations" tone="light" className="scroll-mt-24">
        <Container className="flex flex-col gap-10">
          <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
            <SectionHeading eyebrow="Our global destinations" title="Where learning travels" />
            <Reveal>
              <p className="text-muted-foreground">{immersionIntro.destinationsText}</p>
            </Reveal>
          </div>
          <div className="grid gap-5 md:grid-cols-6">
            {destinations.map((d, i) => (
              <Reveal
                key={d.slug}
                delay={i * 0.06}
                className={i < 3 ? "md:col-span-2" : "md:col-span-3"}
              >
                <DestinationCard d={d} tall={i >= 3} className="h-full" />
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <ExperienceSection />
      <FormatsSection id="formats" intro={formatsIntro} />
      <LifecycleSection
        title={lifecycleIntro.title}
        tagline={lifecycleIntro.tagline}
        text={lifecycleIntro.text}
      />
      <AudienceSection />

      {/* FAQs */}
      <Section tone="light">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.4fr]">
          <SectionHeading eyebrow="FAQs" title="Frequently asked questions" />
          <Accordion items={immersionFaqs()} />
        </Container>
      </Section>

      <ImmersionApplyBand
        title={immersionCta.title}
        text={immersionCta.text}
        text2={immersionCta.text2}
        image={immersionCta.image}
        form={
          <EnquiryForm
            interest="Immersion programme (general)"
            title={immersionCta.button}
            subtitle="Our team will respond within one business day."
            roles={institutionRoles}
            organisation
            button="Send Enquiry"
          />
        }
      />
    </>
  );
}
