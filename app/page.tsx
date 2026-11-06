import Link from "next/link";
import { ArrowRight, Check, X } from "lucide-react";
import { solutions } from "@/lib/data/solutions";
import {
  academicNetwork,
  aiVentures,
  approach,
  caseStudy,
  comparison,
  credentials,
  paths,
} from "@/lib/data/content";
import { formatDate, insights } from "@/lib/data/insights";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Accent, Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TiltCard } from "@/components/ui/TiltCard";
import { Button } from "@/components/ui/Button";
import { IconBadge } from "@/components/ui/IconBadge";
import { Hero } from "@/components/sections/home/Hero";
import { ApproachTimeline } from "@/components/sections/ApproachTimeline";
import { IndustryShowcase } from "@/components/sections/IndustryShowcase";
import { CTASection } from "@/components/sections/CTASection";
import { AIVentureScene, CareerGrowthScene, HeroEducationScene } from "@/components/three";
import { LayeredVisual } from "@/components/ui/LayeredVisual";
import { ParallaxImage } from "@/components/ui/ParallaxImage";

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* 02 · Trust & credibility */}
      <section className="relative z-10 bg-section pb-6">
        <Container>
          <div className="-mt-14 grid overflow-hidden rounded-2xl border border-border bg-white/95 shadow-[0_24px_60px_-20px_rgb(8_29_72/0.3)] backdrop-blur-xl sm:grid-cols-2 lg:-mt-16 lg:grid-cols-4">
            {credentials.map((c, i) => (
              <Reveal
                key={c.title}
                delay={i * 0.06}
                className="flex items-start gap-4 border-border p-6 not-last:border-b sm:odd:border-r lg:border-b-0 lg:p-7 lg:not-last:border-r"
              >
                <IconBadge name={c.icon} className="size-12" />
                <div>
                  <h3 className="text-base font-semibold">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* 03 · About / the gap */}
      <Section tone="light">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow="About Zenvogo"
              title={
                <>
                  Beyond traditional <Accent>learning models.</Accent>
                </>
              }
              text="Most learning platforms sell what institutions already offer. Zenvogo starts with the industry — its people, its challenges, its future — and builds programmes around them with leading academic experts and institutions."
            />
            <Reveal className="flex flex-wrap gap-3">
              <Button href="/about" variant="secondary" arrow>
                About Us
              </Button>
              <Button href="/approach" variant="outline">
                Our Approach
              </Button>
            </Reveal>
          </div>

          <div className="relative">
            <Reveal>
              <ParallaxImage
                src="/images/3d/book-staircase.webp"
                alt="Books arranged as a staircase leading up to a graduation cap"
                className="aspect-[16/10] rounded-2xl bg-white shadow-[var(--shadow-card)]"
              />
            </Reveal>
            <Reveal
              delay={0.15}
              className="relative -mt-16 grid overflow-hidden card sm:mx-8 sm:grid-cols-2"
            >
              <div className="p-7">
                <p className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                  Typical platforms
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {comparison.them.map((t) => (
                    <li key={t} className="flex gap-3 text-sm text-muted-foreground">
                      <X className="mt-0.5 size-4 shrink-0 text-muted-foreground/60" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="dark-section bg-navy p-7 text-white/85">
                <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                  The Zenvogo way
                </p>
                <ul className="mt-5 flex flex-col gap-4">
                  {comparison.us.map((t) => (
                    <li key={t} className="flex gap-3 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-orange" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* 04 · Core solutions */}
      <Section>
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading
              eyebrow="Our Solutions"
              title={
                <>
                  Learning solutions that <Accent>move industries forward.</Accent>
                </>
              }
            />
            <Reveal>
              <Button href="/solutions" variant="outline" arrow>
                All Solutions
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.08}>
                <TiltCard>
                  <Link
                    href={`/solutions/${s.slug}`}
                    className="flex h-full flex-col gap-4 p-4 pb-7"
                  >
                    <LayeredVisual icon={s.icon} tone={i % 2 ? "orange" : "blue"} />
                    <span className="px-3 font-display text-xs font-bold text-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 className="-mt-2 px-3 text-xl font-semibold">{s.title}</h3>
                    <p className="px-3 text-sm text-muted-foreground">{s.summary}</p>
                    <span className="mt-auto inline-flex items-center gap-1.5 px-3 pt-2 text-sm font-semibold text-blue">
                      Explore Solution
                      <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Link>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 05 · Approach */}
      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <Container className="relative flex flex-col gap-14">
          <div className="grid items-center gap-8 lg:grid-cols-[1fr_1.1fr]">
            <SectionHeading
              tone="dark"
              eyebrow="Our Approach"
              title={
                <>
                  From industry challenges to <Accent>curated learning.</Accent>
                </>
              }
              text="Five steps that turn real business problems into programmes delivered by leading institutions."
            />
            <div className="relative -mx-5 h-72 sm:h-96 lg:mx-0 lg:h-[26rem]">
              <CareerGrowthScene />
            </div>
          </div>
          <ApproachTimeline steps={approach} />
          <Reveal className="flex justify-center">
            <Button href="/approach" variant="outline-light" arrow>
              See How We Work
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* 06 · Case study */}
      <Section tone="light">
        <Container className="grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div className="flex flex-col gap-6">
            <SectionHeading
              eyebrow={`Case study · ${caseStudy.sector}`}
              title={caseStudy.title}
              text={caseStudy.intro}
            />
            <Reveal>
              <Button href="/contact?type=industry" arrow>
                Design One for Your Industry
              </Button>
            </Reveal>
          </div>
          <ol className="relative flex flex-col gap-4">
            {caseStudy.steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.07}>
                <div className="flex card-hover items-start gap-5 card p-6">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-navy font-display text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold">{s.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* 07 · Industries */}
      <Section className="overflow-hidden">
        <Container className="flex flex-col gap-12">
          <SectionHeading eyebrow="Industries" title="Programmes shaped by the sectors we serve" />
          <IndustryShowcase />
        </Container>
      </Section>

      {/* 08 · Academic network */}
      <Section tone="light">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr]">
          <div className="flex flex-col gap-10">
            <SectionHeading
              eyebrow="Academic Network"
              title={
                <>
                  Knowledge powered by <Accent>global academia.</Accent>
                </>
              }
              text="Empanelled professors from leading Indian and UK universities, leading institutions and senior practitioners — working together on every programme."
            />
            <ul className="flex flex-col divide-y divide-border border-y border-border">
              {academicNetwork.pillars.map((p, i) => (
                <Reveal
                  as="li"
                  key={p.title}
                  delay={i * 0.08}
                  className="flex items-start gap-5 py-6"
                >
                  <IconBadge name={p.icon} tone={i === 1 ? "orange" : "blue"} className="size-12" />
                  <div>
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground">{p.text}</p>
                  </div>
                </Reveal>
              ))}
            </ul>
            <Reveal>
              <Button href="/academic-partners" variant="outline" arrow>
                Our Academic Network
              </Button>
            </Reveal>
          </div>
          <Reveal className="dark-section relative isolate h-[22rem] overflow-hidden rounded-2xl bg-navy sm:h-[30rem] lg:h-[36rem]">
            <div aria-hidden className="absolute inset-0 -z-10 dot-grid-light" />
            <HeroEducationScene />
          </Reveal>
        </Container>
      </Section>

      {/* 09 · AI Ventures */}
      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <div
          aria-hidden
          className="absolute top-1/2 right-0 size-[34rem] -translate-y-1/2 rounded-full bg-blue/20 blur-[140px]"
        />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
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
              <Button href="/ai-ventures" arrow>
                Explore AI Ventures
              </Button>
            </Reveal>
          </div>
          <div className="relative -mx-5 h-80 sm:h-[30rem] lg:mx-0 lg:h-[34rem]">
            <AIVentureScene />
          </div>
        </Container>
      </Section>

      {/* 10 · Who we work with */}
      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            align="center"
            eyebrow="Work With Us"
            title="One platform, four ways to grow"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {paths.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06}>
                <Link
                  href={p.href}
                  className="group flex h-full card-hover flex-col gap-4 card p-7"
                >
                  <IconBadge name={p.icon} tone="navy" />
                  <h3 className="text-lg font-semibold">{p.title}</h3>
                  <p className="text-sm text-muted-foreground">{p.text}</p>
                  <span className="mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-blue">
                    {p.cta}
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* 11 · Insights */}
      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <SectionHeading eyebrow="Insights" title="Ideas on learning, leadership and AI" />
            <Reveal>
              <Button href="/insights" variant="outline" arrow>
                All Insights
              </Button>
            </Reveal>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {insights.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.08}>
                <Link
                  href={`/insights/${p.slug}`}
                  className="group flex h-full card-hover flex-col card p-7"
                >
                  <Eyebrow>{p.category}</Eyebrow>
                  <h3 className="mt-4 text-xl font-semibold transition-colors group-hover:text-blue">
                    {p.title}
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
                  <p className="mt-auto pt-6 text-xs text-muted-foreground">
                    <time dateTime={p.date}>{formatDate(p.date)}</time> · {p.readTime}
                  </p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
