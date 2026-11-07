"use client";

import { AnimatePresence, motion } from "motion/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useCenterActive } from "@/hooks/useCenterActive";
import { categories, kindLabel, programmesOf, type ProgrammeKind } from "@/lib/data/programmes";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

const PAGE = 12;

/**
 * Clean full-width grid of programmes / certifications with top badge/pill category selection.
 */
export function ProgrammeListing({
  kind,
  cards,
}: {
  kind: ProgrammeKind;
  cards: Record<string, React.ReactNode>;
}) {
  const params = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const category = params.get("category") ?? "all";
  const [limit, setLimit] = useState(PAGE);
  const pillRow = useCenterActive<HTMLDivElement>(category);

  const all = programmesOf(kind);
  const label = kindLabel[kind];
  const visibleCategories = categories.filter((c) => all.some((p) => p.category === c.slug));

  const filtered = all.filter((p) => category === "all" || p.category === category);
  const shown = filtered.slice(0, limit);

  const setCategory = (slug: string) => {
    setLimit(PAGE);
    const q = new URLSearchParams(params);
    if (slug === "all") q.delete("category");
    else q.set("category", slug);
    const qs = q.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  return (
    <div className="flex flex-col gap-6 sm:gap-8">
      {/* ── Category Badges / Pill Selection Bar ── */}
      <div className="flex flex-col gap-3">
        <div
          ref={pillRow}
          className="-mx-5 no-scrollbar flex items-center gap-2 overflow-x-auto px-5 pb-1 *:shrink-0 *:whitespace-nowrap sm:mx-0 sm:flex-wrap sm:gap-2.5 sm:overflow-visible sm:px-0 sm:pb-0"
        >
          <button
            type="button"
            onClick={() => setCategory("all")}
            aria-pressed={category === "all"}
            className={cn(
              "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
              category === "all"
                ? "bg-navy text-white shadow-sm ring-2 ring-navy/20"
                : "border border-border bg-white text-navy/80 hover:border-blue/40 hover:bg-blue/5 hover:text-blue",
            )}
          >
            <span>All {label.plural}</span>
            <span
              className={cn(
                "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold",
                category === "all" ? "bg-white/20 text-white" : "bg-section text-muted-foreground",
              )}
            >
              {all.length}
            </span>
          </button>

          {visibleCategories.map((c) => {
            const active = category === c.slug;
            const Icon = icons[c.icon];
            const count = all.filter((p) => p.category === c.slug).length;
            return (
              <button
                key={c.slug}
                type="button"
                onClick={() => setCategory(c.slug)}
                aria-pressed={active}
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-200",
                  active
                    ? "bg-navy text-white shadow-sm ring-2 ring-navy/20"
                    : "border border-border bg-white text-navy/80 hover:border-blue/40 hover:bg-blue/5 hover:text-blue",
                )}
              >
                {Icon && (
                  <Icon
                    className={cn("size-3.5", active ? "text-orange" : "text-muted-foreground")}
                  />
                )}
                <span>{c.name}</span>
                <span
                  className={cn(
                    "grid h-5 min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-semibold",
                    active ? "bg-white/20 text-white" : "bg-section text-muted-foreground",
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Count summary */}
        <p className="text-xs text-muted-foreground">
          Showing <span className="font-semibold text-navy">{filtered.length}</span>{" "}
          {filtered.length === 1 ? label.singular.toLowerCase() : label.plural.toLowerCase()}
        </p>
      </div>

      {/* ── Cards Grid ── */}
      <motion.div layout className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {shown.map((p) => (
            <motion.div
              key={p.slug}
              layout
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
            >
              {cards[p.slug]}
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <div className="rounded-2xl border border-dashed border-border bg-white/60 p-8 text-center text-muted-foreground sm:p-12">
          <p className="text-base font-semibold text-navy">No {label.plural.toLowerCase()} found</p>
          <p className="mt-1 text-sm">Please select another category above.</p>
        </div>
      )}

      {filtered.length > limit && (
        <div className="flex justify-center pt-4">
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="inline-flex h-11 items-center rounded-xl border border-border bg-white px-7 text-sm font-semibold text-navy shadow-sm transition-all hover:border-blue hover:text-blue hover:shadow-md"
          >
            View more ({filtered.length - limit})
          </button>
        </div>
      )}
    </div>
  );
}
