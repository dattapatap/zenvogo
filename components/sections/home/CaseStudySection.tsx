"use client";

import { useRef } from "react";
import { Building2 } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { caseStudy } from "@/lib/data/content";
import { icons } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

/** Case study: summary card plus a five-step process whose connector fills as you scroll. */
export function CaseStudySection() {
  const timeline = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: timeline, offset: ["start 85%", "end 55%"] });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const progress = reduce ? 1 : fill;

  return (
    <Section tone="light" className="overflow-hidden">
      <Container className="flex flex-col gap-10 sm:gap-12 lg:gap-16">
        <div className="grid items-center gap-8 lg:grid-cols-[1.15fr_1fr] lg:gap-14">
          <Reveal className="flex flex-col gap-5">
            <Eyebrow>{`Case study · ${caseStudy.sector}`}</Eyebrow>
            <h2 className="text-[26px] font-bold text-balance sm:text-[34px] lg:text-[40px]">
              Designing a programme for the <Accent>builder community.</Accent>
            </h2>
            <p className="max-w-xl text-base text-pretty text-muted-foreground sm:text-[17px] lg:text-lg">
              {caseStudy.intro} Here&apos;s how we took a sector-wide challenge in real estate and
              construction from first conversation to a certified programme.
            </p>
            <div className="btn-group pt-1">
              <Button href="/contact?type=industry" arrow>
                <span className="sm:hidden">Design a Programme</span>
                <span className="max-sm:hidden">Design One for Your Industry</span>
              </Button>
              <Button href="/approach" variant="outline" className="bg-white">
                Our Approach
              </Button>
            </div>
          </Reveal>

          <Reveal
            delay={0.1}
            className="dark-section relative isolate overflow-hidden rounded-3xl bg-navy p-6 text-white/75 shadow-[0_30px_70px_-30px_rgb(8_29_72/0.7)] sm:p-8"
          >
            <span
              aria-hidden
              className="absolute -top-20 -right-20 -z-10 size-56 rounded-full bg-blue/40 blur-[80px]"
            />
            <span
              aria-hidden
              className="absolute -bottom-24 -left-16 -z-10 size-48 rounded-full bg-orange/20 blur-[80px]"
            />
            <div className="flex items-center gap-3">
              <span className="grid size-11 place-items-center rounded-xl bg-orange text-white">
                <Building2 aria-hidden className="size-5" />
              </span>
              <div>
                <p className="text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                  At a glance
                </p>
                <p className="font-display text-lg font-bold text-white">
                  {caseStudy.sector.replace(/^\w/, (c) => c.toUpperCase())}
                </p>
              </div>
            </div>
            <dl className="mt-6 grid gap-px overflow-hidden rounded-2xl bg-white/10 sm:grid-cols-2">
              {caseStudy.glance.map((g) => (
                <div key={g.label} className="bg-navy/95 p-4">
                  <dt className="text-xs font-semibold tracking-wide text-white/50 uppercase">
                    {g.label}
                  </dt>
                  <dd className="mt-1 text-[15px] font-semibold text-white">{g.value}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-5 flex items-start gap-2 text-sm">
              <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-orange" />
              Outcome: a ready, certified programme the sector asked for — delivered with a credible
              institution.
            </p>
          </Reveal>
        </div>

        {/* Process timeline */}
        <div>
          <p className="mb-8 text-center text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
            How it came together — in {caseStudy.steps.length} steps
          </p>
          <ol ref={timeline} className="relative grid gap-6 lg:grid-cols-5 lg:gap-6">
            {/* connector: horizontal on desktop, vertical on mobile */}
            <span
              aria-hidden
              className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-border lg:block"
            />
            <motion.span
              aria-hidden
              style={{ scaleX: progress }}
              className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 origin-left bg-gradient-to-r from-blue to-orange lg:block"
            />
            <span
              aria-hidden
              className="absolute top-7 bottom-7 left-7 w-0.5 bg-border lg:hidden"
            />
            <motion.span
              aria-hidden
              style={{ scaleY: progress }}
              className="absolute top-7 bottom-7 left-7 w-0.5 origin-top bg-gradient-to-b from-blue to-orange lg:hidden"
            />

            {caseStudy.steps.map((s, i) => {
              const Icon = icons[s.icon];
              return (
                <Reveal
                  as="li"
                  key={s.title}
                  delay={i * 0.1}
                  className="relative flex gap-4 sm:gap-5 lg:flex-col lg:items-center lg:gap-0 lg:text-center"
                >
                  <span className="relative z-10 grid size-14 shrink-0 place-items-center rounded-2xl border-4 border-section bg-white text-blue shadow-[0_10px_24px_-10px_rgb(8_29_72/0.35)]">
                    <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                    <span className="absolute -top-2 -right-2 grid size-6 place-items-center rounded-full bg-orange font-display text-[11px] font-bold text-white">
                      {i + 1}
                    </span>
                  </span>
                  <div className="flex-1 card p-4 sm:p-5 lg:mt-5 lg:w-full">
                    <h3 className="text-base font-semibold sm:text-lg">{s.title}</h3>
                    <p className="mt-1.5 text-sm text-muted-foreground">{s.text}</p>
                  </div>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </Container>
    </Section>
  );
}
