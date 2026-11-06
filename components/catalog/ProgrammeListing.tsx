"use client";

import { AnimatePresence, motion } from "motion/react";
import { SlidersHorizontal, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  categories,
  institutions,
  kindLabel,
  programmesOf,
  type ProgrammeKind,
} from "@/lib/data/programmes";
import { cn } from "@/lib/utils";

const PAGE = 9;

/**
 * Filterable grid of programmes / certifications. The selected category is kept in
 * the URL (?category=…) so mega-menu links and shared links open pre-filtered.
 * Cards are rendered on the server and passed in, keyed by slug.
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
  const [institution, setInstitution] = useState("all");
  const [limit, setLimit] = useState(PAGE);

  const all = programmesOf(kind);
  const label = kindLabel[kind];
  const usedInstitutions = institutions.filter((i) => all.some((p) => p.institution === i.slug));
  const visibleCategories = categories.filter((c) => all.some((p) => p.category === c.slug));

  const filtered = all.filter(
    (p) =>
      (category === "all" || p.category === category) &&
      (institution === "all" || p.institution === institution),
  );
  const shown = filtered.slice(0, limit);

  const setCategory = (slug: string) => {
    setLimit(PAGE);
    const q = new URLSearchParams(params);
    if (slug === "all") q.delete("category");
    else q.set("category", slug);
    const qs = q.toString();
    router.replace(`${pathname}${qs ? `?${qs}` : ""}`, { scroll: false });
  };

  const activeName = visibleCategories.find((c) => c.slug === category)?.name;

  return (
    <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
      {/* Filters — sidebar on desktop, chips on mobile */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <p className="mb-3 hidden items-center gap-2 text-sm font-semibold text-navy lg:flex">
          <SlidersHorizontal className="size-4" /> Filter
        </p>
        <div className="flex flex-col gap-6 lg:rounded-2xl lg:border lg:border-border lg:bg-white lg:p-4">
          <FilterGroup title="Category">
            <FilterOption
              active={category === "all"}
              onClick={() => setCategory("all")}
              count={all.length}
            >
              All {label.plural.toLowerCase()}
            </FilterOption>
            {visibleCategories.map((c) => (
              <FilterOption
                key={c.slug}
                active={category === c.slug}
                onClick={() => setCategory(c.slug)}
                count={all.filter((p) => p.category === c.slug).length}
              >
                {c.name}
              </FilterOption>
            ))}
          </FilterGroup>
          {usedInstitutions.length > 0 && (
            <FilterGroup title="Institution">
              <FilterOption active={institution === "all"} onClick={() => setInstitution("all")}>
                All institutions
              </FilterOption>
              {usedInstitutions.map((i) => (
                <FilterOption
                  key={i.slug}
                  active={institution === i.slug}
                  onClick={() => {
                    setLimit(PAGE);
                    setInstitution(i.slug);
                  }}
                  count={all.filter((p) => p.institution === i.slug).length}
                >
                  {i.name}
                </FilterOption>
              ))}
            </FilterGroup>
          )}
        </div>
      </aside>

      <div className="flex min-w-0 flex-col gap-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-muted-foreground">
            Showing <span className="font-semibold text-navy">{filtered.length}</span>{" "}
            {filtered.length === 1 ? label.singular.toLowerCase() : label.plural.toLowerCase()}
            {activeName && (
              <>
                {" "}
                in <span className="font-semibold text-navy">{activeName}</span>
              </>
            )}
          </p>
          {(category !== "all" || institution !== "all") && (
            <button
              type="button"
              onClick={() => {
                setInstitution("all");
                setCategory("all");
              }}
              className="inline-flex items-center gap-1 text-sm font-semibold text-orange"
            >
              <X className="size-4" /> Clear filters
            </button>
          )}
        </div>

        <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {shown.map((p) => (
              <motion.div
                key={p.slug}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
              >
                {cards[p.slug]}
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No {label.plural.toLowerCase()} match these filters yet.
          </p>
        )}

        {filtered.length > limit && (
          <button
            type="button"
            onClick={() => setLimit((l) => l + PAGE)}
            className="mx-auto inline-flex h-11 items-center rounded-lg border border-border px-6 text-sm font-semibold text-navy transition-colors hover:border-blue hover:text-blue"
          >
            View more ({filtered.length - limit})
          </button>
        )}
      </div>
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-semibold tracking-wider text-muted-foreground uppercase lg:px-2">
        {title}
      </p>
      <div className="-mx-4 no-scrollbar flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0.5 lg:overflow-visible lg:px-0">
        {children}
      </div>
    </div>
  );
}

function FilterOption({
  active,
  onClick,
  count,
  children,
}: {
  active: boolean;
  onClick: () => void;
  count?: number;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "flex shrink-0 items-center justify-between gap-3 rounded-full border px-4 py-2 text-left text-sm whitespace-nowrap transition-colors lg:rounded-lg lg:border-0 lg:px-3 lg:whitespace-normal",
        active
          ? "border-orange bg-orange/10 font-semibold text-orange"
          : "border-border bg-white text-navy/80 hover:bg-section hover:text-navy",
      )}
    >
      {children}
      {count !== undefined && (
        <span className={cn("text-xs", active ? "text-orange" : "text-muted-foreground")}>
          {count}
        </span>
      )}
    </button>
  );
}
