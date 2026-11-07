"use client";

import { GraduationCap, Landmark, Sparkles, type LucideIcon } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import { Button } from "@/components/ui/Button";
import { ScribbleUnderline } from "@/components/ui/ScribbleUnderline";

const ease = [0.22, 1, 0.36, 1] as const;

const features: { icon: LucideIcon; label: string }[] = [
  { icon: GraduationCap, label: "Industry-led Programme Design" },
  { icon: Landmark, label: "Delivered with Leading Institutions" },
];

export function HeroContent() {
  const reduce = useReducedMotion();

  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 22 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
  };

  return (
    <motion.div
      variants={list}
      initial="hidden"
      animate="show"
      className="relative z-10 flex max-w-2xl min-w-0 flex-col items-start gap-5 sm:gap-6 lg:gap-7 xl:max-w-none"
    >
      <motion.p
        variants={item}
        className="-mb-1 inline-flex items-center gap-2.5 rounded-full border border-white bg-white/85 py-1 pr-4 pl-1 shadow-[0_10px_28px_-14px_rgb(8_29_72/0.35),0_0_0_1px_rgb(8_102_217/0.1)] backdrop-blur"
      >
        <span
          aria-hidden
          className="grid size-7 place-items-center rounded-full bg-[linear-gradient(135deg,#ffa063,#ff6818)] text-white shadow-[0_4px_10px_-3px_rgb(255_104_24/0.65)]"
        >
          <Sparkles className="size-3.5" strokeWidth={2.2} />
        </span>
        <span className="font-display text-[13px] font-bold tracking-[0.01em] text-navy sm:text-sm">
          Learning{" "}
          <span className="bg-[linear-gradient(90deg,#0866d9,#ff6818)] bg-clip-text text-transparent">
            Beyond Boundaries
          </span>
        </span>
      </motion.p>

      <motion.h1
        id="hero-heading"
        variants={item}
        className="text-[30px] leading-[1.15] font-extrabold text-balance text-navy sm:text-[44px] lg:text-[44px] xl:w-[120%] xl:text-[52px] xl:leading-[1.1]"
      >
        Industry-Led Programs to Learn, Build, and <ScribbleUnderline>Upgrade</ScribbleUnderline>{" "}
        Your Career
      </motion.h1>

      <motion.p
        variants={item}
        className="max-w-xl text-[15px] text-pretty text-muted-foreground sm:text-[17px] xl:text-lg"
      >
        Hands-on training, advanced labs, AI infrastructure, prestigious academic exposure with
        IITs, global immersions, and recognised certifications — all in one learning journey.
      </motion.p>

      <motion.div
        variants={item}
        // Phones: both buttons share one row at half width each (compact text, no arrow).
        className="flex w-full gap-3 sm:w-auto sm:flex-wrap"
      >
        <Button
          href="/programs"
          arrow
          className="min-w-0 flex-1 px-3 text-[13px] whitespace-nowrap hover:shadow-[0_14px_30px_-10px_rgb(255_104_24/0.65)] sm:flex-none max-sm:[&_svg]:hidden"
        >
          <span>
            Explore <span className="max-sm:hidden">Our </span>Programs
          </span>
        </Button>
        <Button
          href="/contact?type=institution"
          variant="outline"
          className="min-w-0 flex-1 border-blue/35 bg-white px-3 text-[13px] whitespace-nowrap hover:-translate-y-0.5 hover:border-blue hover:shadow-[0_14px_30px_-14px_rgb(8_102_217/0.5)] sm:flex-none"
        >
          Partner With Us
        </Button>
      </motion.div>

      <motion.ul
        variants={item}
        className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:gap-0"
      >
        {features.map(({ icon: Icon, label }) => (
          <li
            key={label}
            className="flex items-center gap-2.5 text-sm font-medium text-navy/85 sm:not-first:ml-5 sm:not-first:border-l sm:not-first:border-border sm:not-first:pl-5"
          >
            <Icon aria-hidden className="size-5 shrink-0 text-orange" strokeWidth={1.8} />
            {label}
          </li>
        ))}
      </motion.ul>
    </motion.div>
  );
}
