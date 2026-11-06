"use client";

import { useRef, useState } from "react";
import { MoveRight } from "lucide-react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useSpring } from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { icons, type IconName } from "@/lib/icons";
import { cn } from "@/lib/utils";

type Step = { title: string; text: string; icon: IconName };

/**
 * Horizontal process timeline for navy sections.
 * Desktop: the steps sit in one row; the connector fills as the page scrolls and each
 * step lights up when the line reaches it. Smaller screens: a swipeable row whose
 * connector follows the horizontal swipe instead.
 */
export function ApproachTimeline({ steps }: { steps: Step[] }) {
  const row = useRef<HTMLOListElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const reduce = useReducedMotion();
  const n = steps.length;

  const { scrollYProgress } = useScroll({ target: row, offset: ["start 80%", "end 55%"] });
  const { scrollXProgress } = useScroll({ container: scroller });
  const pageFill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  const swipeFill = useSpring(scrollXProgress, { stiffness: 160, damping: 30, restDelta: 0.001 });

  // Number of steps the connector has reached (the first is lit as soon as the row appears).
  const [lit, setLit] = useState(1);
  const update = (v: number) => setLit(Math.min(n, Math.floor(v * (n - 1) + 0.15) + 1));
  useMotionValueEvent(scrollYProgress, "change", (v) => desktop && update(v));
  useMotionValueEvent(scrollXProgress, "change", (v) => !desktop && update(v));

  const fill = reduce ? 1 : desktop ? pageFill : swipeFill;
  const litCount = reduce ? n : lit;

  return (
    <div className="flex flex-col gap-4">
      <div
        ref={scroller}
        className="-mx-5 no-scrollbar snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 pb-2 sm:-mx-7 sm:scroll-px-7 sm:px-7 lg:mx-0 lg:overflow-visible lg:px-0 lg:pb-0"
      >
        <ol
          ref={row}
          className="relative flex w-max gap-4 lg:grid lg:w-full lg:grid-cols-5 lg:gap-5 xl:gap-6"
        >
          {/* Connector: from the first node's centre to the last */}
          <span
            aria-hidden
            className="absolute top-7 right-[130px] left-[130px] h-0.5 rounded-full bg-white/12 lg:right-[10%] lg:left-[10%]"
          />
          <motion.span
            aria-hidden
            style={{ scaleX: fill }}
            className="absolute top-7 right-[130px] left-[130px] h-0.5 origin-left rounded-full bg-gradient-to-r from-blue via-orange to-gold lg:right-[10%] lg:left-[10%]"
          />

          {steps.map((s, i) => {
            const Icon = icons[s.icon];
            const on = i < litCount;
            const current = i === litCount - 1;
            return (
              <li
                key={s.title}
                className="group relative flex w-[260px] shrink-0 snap-start flex-col items-center sm:w-[280px] lg:w-auto"
              >
                {/* Node */}
                <span
                  className={cn(
                    "relative z-10 grid size-14 place-items-center rounded-2xl border transition-all duration-500",
                    on
                      ? "border-orange bg-orange text-white shadow-[0_0_32px_2px_rgb(255_104_24/0.45)]"
                      : "border-white/15 bg-navy-2 text-white/60",
                  )}
                >
                  <Icon aria-hidden className="size-6" strokeWidth={1.75} />
                  <span
                    className={cn(
                      "absolute -top-2 -right-2 grid size-6 place-items-center rounded-full font-display text-[11px] font-bold transition-colors duration-500",
                      on ? "bg-white text-orange" : "bg-navy text-white/60 ring-1 ring-white/15",
                    )}
                  >
                    {i + 1}
                  </span>
                </span>

                {/* Card */}
                <div
                  className={cn(
                    "relative mt-6 flex w-full flex-1 flex-col rounded-2xl border p-5 text-left transition-all duration-500 xl:p-6",
                    "bg-[#0c2556] group-hover:-translate-y-1 group-hover:border-white/25",
                    on ? "border-white/15 opacity-100" : "border-white/8 opacity-55",
                    current && "border-orange/50 shadow-[0_24px_50px_-24px_rgb(255_104_24/0.45)]",
                  )}
                >
                  {/* pointer up to the node */}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute -top-[7px] left-1/2 size-3.5 -translate-x-1/2 rotate-45 border-t border-l bg-[#0c2556] transition-colors duration-500",
                      current ? "border-orange/50" : on ? "border-white/15" : "border-white/8",
                    )}
                  />
                  <span
                    className={cn(
                      "text-[11px] font-semibold tracking-[0.16em] uppercase transition-colors duration-500",
                      on ? "text-gold" : "text-white/50",
                    )}
                  >
                    Step {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg leading-snug font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-white/70">{s.text}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <p className="flex items-center gap-2 text-sm text-white/60 lg:hidden">
        Swipe to see all {n} steps
        <MoveRight aria-hidden className="size-4 text-orange" />
      </p>
    </div>
  );
}
