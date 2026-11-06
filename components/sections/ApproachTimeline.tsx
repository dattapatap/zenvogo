"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { icons, type IconName } from "@/lib/icons";

type Step = { title: string; text: string; icon: IconName };

/**
 * Five-stage process timeline for navy sections.
 * Horizontal on desktop, vertical on mobile. The track fills and each stage
 * lights up as it scrolls into view (GSAP ScrollTrigger).
 */
export function ApproachTimeline({ steps }: { steps: Step[] }) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(
        {
          desktop: "(min-width: 1024px)",
          mobile: "(max-width: 1023px)",
          motion: "(prefers-reduced-motion: no-preference)",
        },
        (ctx) => {
          const { desktop, motion } = ctx.conditions as Record<string, boolean>;
          if (!motion) {
            gsap.set("[data-step]", { autoAlpha: 1 });
            gsap.set("[data-fill]", { scaleX: 1, scaleY: 1 });
            gsap.set("[data-node]", { "--lit": 1 });
            return;
          }

          gsap.fromTo("[data-fill]", desktop ? { scaleX: 0 } : { scaleY: 0 }, {
            ...(desktop ? { scaleX: 1 } : { scaleY: 1 }),
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: desktop ? "top 70%" : "top 75%",
              end: desktop ? "bottom 60%" : "bottom 70%",
              scrub: 0.6,
            },
          });

          gsap.utils.toArray<HTMLElement>("[data-step]").forEach((el, i) => {
            const node = el.querySelector("[data-node]");
            gsap
              .timeline({
                scrollTrigger: {
                  trigger: desktop ? root.current : el,
                  start: desktop ? `top+=${i * 40} 72%` : "top 80%",
                  toggleActions: "play none none reverse",
                },
              })
              .fromTo(
                el,
                { autoAlpha: 0, y: 40 },
                {
                  autoAlpha: 1,
                  y: 0,
                  duration: 0.7,
                  delay: desktop ? i * 0.15 : 0,
                  ease: "power3.out",
                },
              )
              .fromTo(node, { "--lit": 0 }, { "--lit": 1, duration: 0.5 }, "-=0.3");
          });
        },
      );

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="relative">
      {/* Track */}
      <div className="absolute top-0 bottom-0 left-7 w-px bg-white/15 lg:top-7 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-px lg:w-auto" />
      <div
        data-fill
        className="absolute top-0 bottom-0 left-7 w-0.5 origin-top bg-gradient-to-b from-blue via-orange to-gold lg:top-7 lg:right-[10%] lg:bottom-auto lg:left-[10%] lg:h-0.5 lg:w-auto lg:origin-left lg:bg-gradient-to-r"
      />

      <ol className="relative grid gap-10 lg:grid-cols-5 lg:gap-6">
        {steps.map((s, i) => {
          const I = icons[s.icon];
          return (
            <li key={s.title} data-step className="js-hide relative pl-20 lg:pl-0 lg:text-center">
              <span
                data-node
                style={{ "--lit": 0 } as React.CSSProperties}
                className="absolute top-0 left-0 grid size-14 place-items-center rounded-2xl border border-white/15 bg-navy-2 text-white shadow-[0_0_calc(var(--lit)*32px)_calc(var(--lit)*2px)_rgb(255_104_24/0.5)] lg:relative lg:mx-auto"
              >
                <span
                  className="absolute inset-0 rounded-2xl bg-orange"
                  style={{ opacity: "var(--lit)" }}
                />
                <I className="relative size-6" strokeWidth={1.75} />
              </span>
              <div className="lg:mt-6">
                <span className="font-display text-sm font-bold text-gold">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 text-lg font-semibold sm:text-xl">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.text}</p>
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
