"use client";

import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { industries } from "@/lib/data/content";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const CYCLE_MS = 3200;

/**
 * Interactive industry showcase: a numbered list on the left and a large,
 * 3D-layered visual on the right. The active industry advances automatically
 * while the section is on screen; hovering or focusing an item selects it.
 */
export function IndustryShowcase() {
  const root = useRef<HTMLDivElement>(null);
  const inView = useInView(root, { margin: "-20% 0px" });
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!inView || paused || reduce) return;
    const id = setInterval(() => setActive((a) => (a + 1) % industries.length), CYCLE_MS);
    return () => clearInterval(id);
  }, [inView, paused, reduce]);

  const current = industries[active];
  const Icon = icons[current.icon];

  return (
    <div
      ref={root}
      className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.15fr] lg:gap-12"
      onMouseLeave={() => setPaused(false)}
    >
      {/* List */}
      <ol className="flex flex-col" onMouseEnter={() => setPaused(true)}>
        {industries.map((ind, i) => {
          const I = icons[ind.icon];
          const on = i === active;
          return (
            <li key={ind.name} className="border-b border-border first:border-t">
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onClick={() => setActive(i)}
                aria-pressed={on}
                className="group relative flex w-full items-center gap-5 py-4 text-left sm:py-5"
              >
                {/* progress bar for the active item */}
                {on && !reduce && !paused && (
                  <motion.span
                    key={`bar-${active}`}
                    className="absolute bottom-[-1px] left-0 h-0.5 bg-orange"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: CYCLE_MS / 1000, ease: "linear" }}
                  />
                )}
                {on && (paused || reduce) && (
                  <span className="absolute bottom-[-1px] left-0 h-0.5 w-full bg-orange" />
                )}
                <span
                  className={cn(
                    "w-8 font-display text-sm font-bold transition-colors",
                    on ? "text-orange" : "text-muted-foreground/60",
                  )}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  className={cn(
                    "grid size-11 shrink-0 place-items-center rounded-xl transition-all duration-300",
                    on ? "bg-navy text-white" : "bg-section-2 text-blue group-hover:bg-blue/10",
                  )}
                >
                  <I className="size-5" strokeWidth={1.75} />
                </span>
                <span
                  className={cn(
                    "flex-1 font-display text-lg font-semibold transition-all duration-300 sm:text-xl",
                    on ? "translate-x-1 text-navy" : "text-navy/60 group-hover:text-navy",
                  )}
                >
                  {ind.name}
                </span>
                <ArrowUpRight
                  className={cn(
                    "size-5 transition-all duration-300",
                    on ? "translate-x-0 text-orange opacity-100" : "-translate-x-2 opacity-0",
                  )}
                />
              </button>
            </li>
          );
        })}
      </ol>

      {/* Visual */}
      <div className="dark-section relative isolate min-h-[22rem] overflow-hidden rounded-2xl bg-navy [perspective:1100px] lg:min-h-0">
        <div aria-hidden className="absolute inset-0 -z-10 dot-grid-light" />
        <div
          aria-hidden
          className="absolute -right-24 -bottom-24 -z-10 size-96 rounded-full bg-blue/35 blur-[110px]"
        />
        <div
          aria-hidden
          className="absolute -top-24 -left-24 -z-10 size-72 rounded-full bg-orange/15 blur-[100px]"
        />

        {/* orbit rings */}
        <div
          aria-hidden
          className="absolute top-1/2 left-1/2 size-[26rem] [transform:translate(-50%,-50%)_rotateX(65deg)] rounded-full border border-white/10"
        />
        <motion.div
          aria-hidden
          className="absolute top-1/2 left-1/2 size-[18rem] rounded-full border border-dashed border-orange/30"
          style={{ x: "-50%", y: "-50%", rotateX: 65 }}
          animate={reduce ? undefined : { rotateZ: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={current.name}
            className="absolute inset-0 grid place-items-center"
            initial={{ opacity: 0, y: 30, rotateX: 20 }}
            animate={{ opacity: 1, y: 0, rotateX: 0 }}
            exit={{ opacity: 0, y: -30, rotateX: -20 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* isometric stacked plates */}
            <div className="relative size-40 [transform:rotateX(58deg)_rotateZ(-42deg)] [transform-style:preserve-3d] sm:size-48">
              <span className="absolute inset-0 [transform:translateZ(0px)] rounded-3xl border border-white/15 bg-white/5" />
              <span className="absolute inset-0 [transform:translateZ(26px)] rounded-3xl border border-white/20 bg-[#8fc1ff]/15 backdrop-blur-sm" />
              <span className="absolute inset-0 [transform:translateZ(52px)] rounded-3xl border border-white/25 bg-[#8fc1ff]/20" />
              <span className="absolute inset-0 grid [transform:translateZ(84px)] place-items-center rounded-3xl bg-gradient-to-br from-orange to-[#ff8a4c] text-white shadow-[0_30px_60px_-15px_rgb(0_0_0/0.6)]">
                <Icon className="size-16 [transform:rotateZ(42deg)] sm:size-20" strokeWidth={1.4} />
              </span>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* caption */}
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6 sm:p-8">
          <AnimatePresence mode="wait">
            <motion.p
              key={current.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.35 }}
              className="font-display text-2xl font-bold text-white sm:text-3xl"
            >
              {current.name}
            </motion.p>
          </AnimatePresence>
          <span className="shrink-0 font-display text-sm font-semibold text-white/50">
            <span className="text-gold">{String(active + 1).padStart(2, "0")}</span> /{" "}
            {String(industries.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </div>
  );
}
