import type { Metadata } from "next";
import { approach, caseStudy, comparison } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { ApproachTimeline } from "@/components/sections/ApproachTimeline";
import { CareerGrowthScene } from "@/components/three";
import { CTASection } from "@/components/sections/CTASection";
import { Check, X } from "lucide-react";

export const metadata: Metadata = {
  title: "Our Approach",
  description:
    "How Zenvogo turns real industry challenges into curated programmes delivered by leading institutions.",
};

export default function ApproachPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Approach"
        crumbs={[{ label: "Our Approach" }]}
        title="From industry challenges to curated learning"
        scene={<CareerGrowthScene labels={false} />}
        text="We don't start with a course catalogue. We start with the people who'll use what we build — and work backwards to the programme they need."
      />

      <Section>
        <Container className="grid items-start gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="The gap we close"
            title={
              <>
                Learning that&apos;s <Accent>designed, not resold.</Accent>
              </>
            }
            text="The Indian learning market is full of platforms selling programmes that institutions already offer. What's missing is learning designed exclusively around what an industry actually needs. That is the gap Zenvogo was built to close."
          />
          <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
            <div className="card p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                Catalogue-led
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {comparison.them.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-muted-foreground">
                    <X className="mt-0.5 size-4 shrink-0" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            <div className="card border-blue/30 bg-section-2 p-6">
              <p className="text-xs font-semibold tracking-[0.14em] text-blue uppercase">
                Industry-led
              </p>
              <ul className="mt-4 flex flex-col gap-3">
                {comparison.us.map((t) => (
                  <li key={t} className="flex gap-2.5 text-sm text-navy">
                    <Check className="mt-0.5 size-4 shrink-0 text-orange" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <Container className="relative flex flex-col gap-14">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Five steps"
            title="How every Zenvogo programme is built"
          />
          <ApproachTimeline steps={approach} />
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            align="center"
            eyebrow={`Case study · ${caseStudy.sector}`}
            title={caseStudy.title}
            text={caseStudy.intro}
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {caseStudy.steps.map((s, i) => (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.06}
                className="relative card-hover card p-6"
              >
                <span className="grid size-10 place-items-center rounded-lg bg-orange font-display text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="flex justify-center">
            <Button href="/contact?type=industry" arrow>
              Start With Your Industry
            </Button>
          </Reveal>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
