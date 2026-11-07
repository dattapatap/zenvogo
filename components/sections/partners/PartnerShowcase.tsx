"use client";

import Image from "next/image";
import { useState } from "react";
import { useCenterActive } from "@/hooks/useCenterActive";
import { ChevronDown, LayoutGrid } from "lucide-react";
import { AnimatePresence, MotionConfig, motion } from "motion/react";
import { icons } from "@/lib/icons";
import { interleave, partnerCategories, partners, type PartnerCategory } from "@/lib/data/partners";
import { cn } from "@/lib/utils";
import { categoryStyles } from "./categoryStyles";

type Filter = "all" | PartnerCategory;

const allPartners = interleave(partners);
/** Cards shown under "All Partners" before "View all" (a multiple of 2, 3 and 4 columns). */
const PREVIEW_COUNT = 12;
const labelOf = Object.fromEntries(partnerCategories.map((c) => [c.id, c.label])) as Record<
  PartnerCategory,
  string
>;

/** Filterable partner grid: category badges on top, logo cards tagged with their category. */
export function PartnerShowcase() {
  const [filter, setFilter] = useState<Filter>("all");
  const [expanded, setExpanded] = useState(false);
  const badgeRow = useCenterActive<HTMLDivElement>(filter);
  const active = partnerCategories.find((c) => c.id === filter);
  const full = filter === "all" ? allPartners : partners.filter((p) => p.category === filter);
  const collapsed = filter === "all" && !expanded && full.length > PREVIEW_COUNT;
  const list = collapsed ? full.slice(0, PREVIEW_COUNT) : full;

  const tabs: { id: Filter; label: string; count: number; Icon: React.ElementType }[] = [
    { id: "all", label: "All Partners", count: partners.length, Icon: LayoutGrid },
    ...partnerCategories.map((c) => ({
      id: c.id,
      label: c.label,
      count: partners.filter((p) => p.category === c.id).length,
      Icon: icons[c.icon],
    })),
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="flex flex-col gap-8">
        {/* Category badges */}
        <div
          ref={badgeRow}
          role="group"
          aria-label="Filter partners by category"
          className="-mx-5 no-scrollbar flex gap-2.5 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:justify-center sm:overflow-visible sm:px-0"
        >
          {tabs.map(({ id, label, count, Icon }) => {
            const on = filter === id;
            return (
              <button
                key={id}
                type="button"
                aria-pressed={on}
                onClick={() => setFilter(id)}
                className={cn(
                  "relative inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-semibold transition-colors duration-200",
                  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
                  on
                    ? "border-navy text-white"
                    : "border-border bg-white text-navy hover:border-blue/40 hover:text-blue",
                )}
              >
                {on && (
                  <motion.span
                    layoutId="partner-filter"
                    className="absolute inset-0 -z-0 rounded-full bg-navy"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <Icon aria-hidden className="relative size-4" />
                <span className="relative">{label}</span>
                <span
                  className={cn(
                    "relative grid min-w-6 place-items-center rounded-full px-1.5 text-xs",
                    on ? "bg-white/15 text-white" : "bg-section text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Active category summary */}
        <p
          aria-live="polite"
          className="-mt-2 text-center text-sm text-pretty text-muted-foreground"
        >
          {active ? (
            <>
              <span className="font-semibold text-navy">{active.title}</span> — {active.text}
            </>
          ) : (
            <>
              Showing all <span className="font-semibold text-navy">{partners.length}</span>{" "}
              partners across {partnerCategories.length} categories.
            </>
          )}
        </p>

        {/* Logo cards */}
        <motion.ul layout className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {list.map((p) => (
              <motion.li
                key={p.name}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <article className="group flex h-full card-hover flex-col card p-3 sm:p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold",
                        categoryStyles[p.category].chip,
                      )}
                    >
                      <span
                        aria-hidden
                        className={cn("size-1.5 rounded-full", categoryStyles[p.category].accent)}
                      />
                      {labelOf[p.category]}
                    </span>
                  </div>
                  <div className="mt-3 grid h-24 place-items-center rounded-xl bg-section/70 px-3 transition-colors duration-300 group-hover:bg-blue/5 sm:h-28">
                    <Image
                      src={p.logo}
                      alt={p.name}
                      width={p.width}
                      height={p.height}
                      style={{ height: Math.round(p.size * 1.1) }}
                      className="w-auto max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <h3 className="mt-3 px-1 font-display text-[15px] leading-snug font-semibold text-navy">
                    {p.name}
                  </h3>
                  <p className="px-1 pb-1 text-xs text-muted-foreground">{p.meta}</p>
                </article>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>

        {collapsed && (
          <div className="flex justify-center">
            <button
              type="button"
              onClick={() => setExpanded(true)}
              className="group inline-flex h-12 items-center gap-2 rounded-lg border border-blue/35 bg-white px-6 text-[15px] font-semibold text-blue transition-all duration-250 hover:-translate-y-0.5 hover:border-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue"
            >
              View all {full.length} partners
              <ChevronDown
                aria-hidden
                className="size-4 transition-transform group-hover:translate-y-0.5"
              />
            </button>
          </div>
        )}
      </div>
    </MotionConfig>
  );
}
