import type { Metadata } from "next";
import { aiVentures, approach, credentials } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { HeroSection } from "@/components/sections/home/hero/HeroSection";
import { LearningPortfolio } from "@/components/sections/home/LearningPortfolio";
import { CaseStudySection } from "@/components/sections/home/CaseStudySection";
import { WorkWithUs } from "@/components/sections/home/WorkWithUs";
import { BlogsSection } from "@/components/sections/home/BlogsSection";
import { PartnersMarquee } from "@/components/sections/PartnersMarquee";
import { ApproachTimeline } from "@/components/sections/ApproachTimeline";
import { IndustryShowcase } from "@/components/sections/IndustryShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { AIVentureScene } from "@/components/three";

export const metadata: Metadata = {
  // Search-result title: what Zenvogo offers, not just the tagline (kept under ~60 chars).
  title: { absolute: "Zenvogo | Industry-Led Executive Programmes & Certifications" },
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      {/* 01 · Hero, with 02 · Trust & credibility straddling its bottom edge */}
      <HeroSection>
        <div className="grid overflow-hidden rounded-2xl border border-border bg-white/95 shadow-[0_24px_60px_-20px_rgb(8_29_72/0.3)] backdrop-blur-xl sm:grid-cols-2 lg:grid-cols-4">
          {credentials.map((c, i) => (
            <Reveal
              key={c.title}
              delay={i * 0.06}
              className="flex items-start gap-4 border-border p-5 not-last:border-b sm:p-6 sm:odd:border-r lg:border-b-0 lg:p-7 lg:not-last:border-r"
            >
              <IconBadge name={c.icon} className="size-12" />
              <div>
                <h3 className="text-base font-semibold">{c.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </HeroSection>

      <PartnersMarquee />

      {/* 03 · Learning portfolio: programmes, immersions, certifications (pins on desktop) */}
      <LearningPortfolio />

      {/* 04 · Approach */}
      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <Container className="relative flex flex-col gap-10 sm:gap-14">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="Our Approach"
            title={
              <>
                From industry challenges to <Accent>curated learning.</Accent>
              </>
            }
          />
          <ApproachTimeline steps={approach} />
          <Reveal className="flex justify-center">
            <Button href="/approach" variant="outline-light" arrow className="w-full sm:w-auto">
              See How We Work
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 05 · Case study */}
      <CaseStudySection />

      {/* 07 · Industries (scroll-driven) */}
      <IndustryShowcase />

      {/* 08 · AI Ventures */}
      <Section tone="navy" className="overflow-hidden py-10 sm:py-14 lg:py-18">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <div
          aria-hidden
          className="absolute top-1/2 right-0 size-[30rem] -translate-y-1/2 rounded-full bg-blue/20 blur-[130px]"
        />
        <Container className="relative grid items-center gap-8 lg:grid-cols-[1fr_1.1fr] lg:gap-10">
          <div className="flex flex-col gap-6">
            <SectionHeading
              tone="dark"
              eyebrow="Zenvogo AI Ventures"
              title={
                <>
                  Turning AI ideas into <Accent>real-world impact.</Accent>
                </>
              }
              text="A dedicated vertical that helps AI startups incubate, find mentors, access industry and prepare for funding."
            />
            <div className="grid gap-3 sm:grid-cols-2">
              {aiVentures.offerings.map((o, i) => (
                <Reveal
                  key={o.title}
                  delay={i * 0.06}
                  className="flex items-center gap-3 panel p-4"
                >
                  <IconBadge name={o.icon} tone="light" className="size-10 [&_svg]:size-5" />
                  <span className="font-semibold text-white">{o.title}</span>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <Button href="/ai-ventures" arrow className="w-full sm:w-auto">
                Explore AI Ventures
              </Button>
            </Reveal>
          </div>
          <div className="relative flex h-60 items-center justify-center sm:h-88 lg:h-[26rem]">
            <AIVentureScene />
          </div>
        </Container>
      </Section>

      {/* 09 · Who we work with */}
      <WorkWithUs />

      {/* 10 · Blogs */}
      <BlogsSection />

      <CTASection />
    </>
  );
}
