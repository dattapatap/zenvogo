"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, ArrowUpRight, Check, Layers, Sparkles, Users } from "lucide-react";
import { solutions } from "@/lib/data/solutions";
import { icons } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

/** Interactive "Solution Hub" showcase for Zenvogo's 4 core learning pillars. */
export function SolutionsSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeSolution = solutions[activeIdx];
  const ActiveIcon = icons[activeSolution.icon];

  return (
    <Section tone="light" className="overflow-hidden">
      <Container className="flex flex-col gap-10 lg:gap-14">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Our Solutions"
            title={
              <>
                Learning solutions that <Accent>move industries forward.</Accent>
              </>
            }
            text="Beyond open programmes, we design learning with and for organisations — from leadership cohorts to sector-wide curricula and global exchanges."
          />
          <Reveal className="shrink-0">
            <Button href="/solutions" variant="outline" arrow>
              View All Solutions
            </Button>
          </Reveal>
        </div>

        {/* Interactive Split-Screen Hub */}
        <div className="grid items-stretch gap-6 lg:grid-cols-[1.1fr_1.6fr] lg:gap-8">
          {/* Left Column: Solution Selectors */}
          <div className="flex flex-col gap-3">
            {solutions.map((s, idx) => {
              const Icon = icons[s.icon];
              const isSelected = idx === activeIdx;

              return (
                <button
                  key={s.slug}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={cn(
                    "group relative flex items-start gap-4 rounded-2xl border p-4.5 text-left transition-all duration-200 sm:p-5",
                    isSelected
                      ? "border-navy bg-navy text-white shadow-[0_16px_36px_-12px_rgb(8_29_72/0.45)]"
                      : "border-[#d8e2ef] bg-white text-navy hover:border-blue/40 hover:bg-white/90",
                  )}
                >
                  {/* Active highlight bar */}
                  {isSelected && (
                    <motion.span
                      layoutId="solution-pill-glow"
                      className="absolute inset-y-3 left-0 w-1.5 rounded-r-full bg-orange"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}

                  {/* Icon badge */}
                  <span
                    className={cn(
                      "grid size-12 shrink-0 place-items-center rounded-xl transition-transform duration-300 group-hover:scale-105",
                      isSelected
                        ? "bg-orange text-white"
                        : "bg-blue/10 text-blue group-hover:bg-blue group-hover:text-white",
                    )}
                  >
                    <Icon className="size-6" strokeWidth={1.75} aria-hidden />
                  </span>

                  {/* Text meta */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "text-xs font-semibold tracking-[0.14em] uppercase",
                          isSelected ? "text-gold" : "text-blue",
                        )}
                      >
                        {String(idx + 1).padStart(2, "0")} · {s.short}
                      </span>
                      <ArrowRight
                        className={cn(
                          "size-4 shrink-0 transition-transform duration-200",
                          isSelected
                            ? "translate-x-0.5 text-orange opacity-100"
                            : "text-muted-foreground/60 opacity-0 group-hover:opacity-100",
                        )}
                      />
                    </div>
                    <h3
                      className={cn(
                        "mt-1 text-base font-bold sm:text-lg",
                        isSelected ? "text-white" : "text-navy",
                      )}
                    >
                      {s.title}
                    </h3>
                    <p
                      className={cn(
                        "mt-1 line-clamp-1 text-xs sm:text-sm",
                        isSelected ? "text-white/70" : "text-muted-foreground",
                      )}
                    >
                      {s.tagline}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Dynamic Stage */}
          <div className="relative flex flex-col justify-between overflow-hidden rounded-3xl border border-[#c4d3e5] bg-white p-6 shadow-[0_20px_50px_-20px_rgb(8_29_72/0.12)] sm:p-9 lg:p-10">
            {/* Background subtle brand accents */}
            <div
              aria-hidden
              className="pointer-events-none absolute -top-20 -right-20 size-72 rounded-full bg-blue/10 blur-[80px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -bottom-20 -left-20 size-72 rounded-full bg-orange/10 blur-[80px]"
            />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeSolution.slug}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.28, ease: "easeOut" }}
                className="relative z-10 flex h-full flex-col justify-between gap-7"
              >
                {/* Header info */}
                <div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-blue/20 bg-blue/10 px-3 py-1 text-xs font-semibold text-blue">
                      <ActiveIcon className="size-3.5" />
                      Pillar {String(activeIdx + 1).padStart(2, "0")}
                    </span>
                    <span className="text-xs font-medium text-muted-foreground">
                      Co-created with Leading Academia
                    </span>
                  </div>

                  <h3 className="mt-4 text-2xl font-bold tracking-tight text-navy sm:text-3xl lg:text-[34px] lg:leading-tight">
                    {activeSolution.title}
                  </h3>

                  <p className="mt-2 text-base font-semibold text-orange sm:text-lg">
                    &ldquo;{activeSolution.tagline}&rdquo;
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                    {activeSolution.summary}
                  </p>
                </div>

                {/* Key Outcomes & Audience Grid */}
                <div className="grid gap-6 border-y border-[#e2eaf4] py-6 sm:grid-cols-2">
                  {/* Measurable Outcomes */}
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-navy uppercase">
                      <Sparkles className="size-4 text-orange" />
                      Measurable Outcomes
                    </span>
                    <ul className="flex flex-col gap-2.5 text-sm text-foreground/90">
                      {activeSolution.outcomes.slice(0, 3).map((item) => (
                        <li key={item} className="flex items-start gap-2.5 leading-snug">
                          <span className="mt-0.5 grid size-4 shrink-0 place-items-center rounded-full bg-blue/10 text-blue">
                            <Check className="size-2.5 stroke-[3]" />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Target Audience */}
                  <div className="flex flex-col gap-3">
                    <span className="flex items-center gap-2 text-xs font-bold tracking-[0.12em] text-navy uppercase">
                      <Users className="size-4 text-blue" />
                      Who It&apos;s For
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {activeSolution.audience.slice(0, 4).map((aud) => (
                        <span
                          key={aud}
                          className="rounded-lg border border-[#dce5f1] bg-[#f8fafc] px-3 py-1.5 text-xs font-medium text-navy/85"
                        >
                          {aud}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Delivery formats & CTAs */}
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
                      <Layers className="size-3.5" />
                      Formats:
                    </span>
                    {activeSolution.formats.slice(0, 3).map((fmt) => (
                      <span
                        key={fmt}
                        className="rounded-full bg-navy/5 px-2.5 py-0.5 text-xs font-medium text-navy"
                      >
                        {fmt}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-3">
                    <Button href={`/solutions/${activeSolution.slug}`} arrow>
                      Explore Solution
                    </Button>
                    <Button href="/contact?type=industry" variant="outline">
                      Discuss Requirements
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Bottom helper prompt */}
        <Reveal className="flex flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground sm:flex-row">
          Looking for a custom learning program tailored to your industry?
          <Link
            href="/contact?type=industry"
            className="group inline-flex items-center gap-1 font-semibold text-blue hover:text-navy"
          >
            Schedule a co-creation session
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </Reveal>
      </Container>
    </Section>
  );
}
