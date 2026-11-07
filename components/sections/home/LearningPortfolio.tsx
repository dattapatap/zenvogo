"use client";

import Image from "next/image";
import Link from "next/link";
import { useId, useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Award,
  BookOpen,
  GraduationCap,
  Plane,
  type LucideIcon,
} from "lucide-react";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { destinations, formats } from "@/lib/data/immersions";
import {
  getCategory,
  getInstitution,
  institutions,
  kindLabel,
  programmeHref,
  programmes,
  programmesOf,
  type Programme,
} from "@/lib/data/programmes";
import { icons } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Accent, Eyebrow, SectionHeading } from "@/components/ui/SectionHeading";
import { InstitutionMark, ProgrammeCard } from "@/components/catalog/ProgrammeCard";
import { cn } from "@/lib/utils";

type TabId = "programmes" | "immersions" | "certifications";

/** Sticky header height on desktop. */
const HEADER = 80;
/** Scroll distance spent on each category while the section is pinned, in viewport heights. */
const STEP_VH = 70;

const pick = (slugs: string[]) =>
  slugs.map((s) => programmes.find((p) => p.slug === s)).filter((p) => p !== undefined);

const featuredProgrammes = pick([
  "leadership-strategic-management",
  "artificial-intelligence-generative-ai",
  "finance-banking",
]);
const featuredCertifications = pick([
  "generative-ai-for-professionals",
  "general-management",
  "data-analytics-for-business",
]);

const tabs: {
  id: TabId;
  label: string;
  icon: LucideIcon;
  count: number;
  unit: string;
}[] = [
  {
    id: "programmes",
    label: "Executive Programmes",
    icon: GraduationCap,
    count: programmesOf("programme").length,
    unit: "programmes",
  },
  {
    id: "immersions",
    label: "Global Immersions",
    icon: Plane,
    count: destinations.length,
    unit: "destinations",
  },
  {
    id: "certifications",
    label: "Certifications",
    icon: Award,
    count: programmesOf("certification").length,
    unit: "certifications",
  },
];

const title = (
  <>
    One learning journey, <Accent>three ways to grow.</Accent>
  </>
);

/**
 * Learning portfolio: programmes, immersions and certifications.
 * On desktop the section pins and scrolling steps through the three categories
 * (each tab's bar shows progress); elsewhere the tabs switch on click.
 */
export function LearningPortfolio() {
  const pinnable = useMediaQuery("(min-width: 1024px) and (min-height: 680px)");
  return (
    <MotionConfig reducedMotion="user">
      <section aria-label="Learning portfolio" className="relative bg-section">
        {pinnable ? <PinnedPortfolio /> : <StaticPortfolio />}
      </section>
    </MotionConfig>
  );
}

/* ───────────────────────── Pinned (desktop) ───────────────────────── */

function PinnedPortfolio() {
  const track = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const n = tabs.length;

  const { scrollYProgress } = useScroll({
    target: track,
    offset: [`start ${HEADER}px`, "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER;
    const distance = el.offsetHeight - (window.innerHeight - HEADER);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // Land just past the start of the category so its content is fully shown.
    window.scrollTo({
      top: top + distance * ((i + 0.08) / n),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="pt-12 xl:pt-16">
      <div
        ref={track}
        className="relative"
        style={{ height: `calc(100vh - ${HEADER}px + ${n * STEP_VH}vh)` }}
      >
        <div className="sticky" style={{ top: HEADER, height: `calc(100vh - ${HEADER}px)` }}>
          <Container className="flex h-full flex-col gap-5 py-6 [@media(min-height:860px)]:gap-6 [@media(min-height:860px)]:py-8">
            {/* Heading */}
            <div>
              <Eyebrow>Learning portfolio</Eyebrow>
              <h2 className="mt-2 text-[32px] font-bold text-balance xl:text-[38px]">{title}</h2>
            </div>

            <Tabs active={active} onSelect={goTo} progress={scrollYProgress} compact />

            {/* Panel: fills the remaining height so the footer button always stays visible */}
            <div className="relative min-h-0 flex-1">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  id={`portfolio-panel-${tabs[active].id}`}
                  role="tabpanel"
                  aria-labelledby={`portfolio-tab-${tabs[active].id}`}
                  className="absolute inset-0 flex flex-col gap-4 [@media(min-height:860px)]:gap-5"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Panel id={tabs[active].id} fill />
                </motion.div>
              </AnimatePresence>
            </div>
          </Container>
        </div>
      </div>
    </div>
  );
}

/* ───────────────────────── Static (tablet / mobile) ───────────────────────── */

function StaticPortfolio() {
  const [active, setActive] = useState(0);
  return (
    <Container className="flex flex-col gap-8 pt-14 pb-14 sm:gap-10 sm:pt-16 sm:pb-[72px] lg:pt-20 lg:pb-[100px]">
      <SectionHeading eyebrow="Learning portfolio" title={title} />
      <div className="flex flex-col gap-6 sm:gap-8">
        <Tabs active={active} onSelect={setActive} />
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={active}
            id={`portfolio-panel-${tabs[active].id}`}
            role="tabpanel"
            aria-labelledby={`portfolio-tab-${tabs[active].id}`}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-8"
          >
            <Panel id={tabs[active].id} />
          </motion.div>
        </AnimatePresence>
      </div>
    </Container>
  );
}

/* ───────────────────────── Tabs ───────────────────────── */

function Tabs({
  active,
  onSelect,
  progress,
  compact,
}: {
  active: number;
  onSelect: (i: number) => void;
  /** Overall scroll progress (pinned mode): each tab's bar fills across its share. */
  progress?: MotionValue<number>;
  compact?: boolean;
}) {
  const uid = useId();
  return (
    <div
      role="tablist"
      aria-label="Learning portfolio"
      className="grid shrink-0 grid-cols-3 gap-2.5 sm:gap-4"
    >
      {tabs.map((t, i) => {
        const on = active === i;
        const Icon = t.icon;
        return (
          <button
            key={t.id}
            id={`portfolio-tab-${t.id}`}
            role="tab"
            type="button"
            aria-selected={on}
            aria-controls={on ? `portfolio-panel-${t.id}` : undefined}
            tabIndex={on ? 0 : -1}
            onClick={() => onSelect(i)}
            onKeyDown={(e) => {
              const next =
                e.key === "ArrowRight"
                  ? (i + 1) % tabs.length
                  : e.key === "ArrowLeft"
                    ? (i - 1 + tabs.length) % tabs.length
                    : e.key === "Home"
                      ? 0
                      : e.key === "End"
                        ? tabs.length - 1
                        : -1;
              if (next < 0) return;
              e.preventDefault();
              onSelect(next);
              document.getElementById(`portfolio-tab-${tabs[next].id}`)?.focus();
            }}
            className={cn(
              "group relative flex flex-col items-start gap-3 overflow-hidden rounded-2xl border p-3 text-left transition-all duration-300 sm:p-5 lg:flex-row lg:items-center lg:gap-4",
              compact ? "lg:px-5 lg:py-4" : "lg:p-6",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
              on
                ? "dark-section border-navy bg-navy text-white shadow-[0_24px_50px_-24px_rgb(8_29_72/0.6)]"
                : "border-border bg-white hover:-translate-y-0.5 hover:border-blue/30 hover:shadow-(--shadow-card)",
            )}
          >
            <span
              className={cn(
                "grid size-10 shrink-0 place-items-center rounded-xl transition-colors sm:size-12",
                on ? "bg-orange text-white" : "bg-blue/10 text-blue group-hover:bg-blue/15",
              )}
            >
              <Icon aria-hidden className="size-5 sm:size-6" />
            </span>
            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="font-display text-[13px] leading-tight font-bold sm:text-base lg:text-lg">
                {t.label}
              </span>
              <span
                className={cn("text-xs sm:text-sm", on ? "text-white/70" : "text-muted-foreground")}
              >
                <span className={cn("font-semibold", on ? "text-gold" : "text-navy")}>
                  {t.count}
                </span>{" "}
                {t.unit}
              </span>
            </span>

            {progress ? (
              <TabProgress progress={progress} index={i} on={on} />
            ) : (
              on && (
                <motion.span
                  layoutId={`${uid}-bar`}
                  className="absolute inset-x-0 bottom-0 h-1 bg-orange"
                  transition={{ type: "spring", stiffness: 380, damping: 34 }}
                />
              )
            )}
          </button>
        );
      })}
    </div>
  );
}

/** Bottom bar of a tab that fills while the page scrolls through that category. */
function TabProgress({
  progress,
  index,
  on,
}: {
  progress: MotionValue<number>;
  index: number;
  on: boolean;
}) {
  const n = tabs.length;
  const scaleX = useTransform(progress, [index / n, (index + 1) / n], [0, 1], { clamp: true });
  return (
    <span
      aria-hidden
      className={cn("absolute inset-x-0 bottom-0 h-1", on ? "bg-white/10" : "bg-transparent")}
    >
      <motion.span style={{ scaleX }} className="absolute inset-0 origin-left bg-orange" />
    </span>
  );
}

/* ───────────────────────── Panels ───────────────────────── */

function Panel({ id, fill }: { id: TabId; fill?: boolean }) {
  if (id === "immersions") return <ImmersionsPanel fill={fill} />;
  const isProgrammes = id === "programmes";
  const items = isProgrammes ? featuredProgrammes : featuredCertifications;
  const total = programmesOf(isProgrammes ? "programme" : "certification").length;

  return (
    <>
      {fill ? (
        <div className="grid min-h-0 flex-1 grid-cols-3 gap-5 xl:gap-6">
          {items.map((p) => (
            <CompactCard key={p.slug} programme={p} />
          ))}
        </div>
      ) : (
        <div className="-mx-5 no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 sm:pb-0 lg:grid-cols-3 lg:gap-6">
          {items.map((p) => (
            <div key={p.slug} className="w-[85%] shrink-0 snap-start sm:w-auto">
              <ProgrammeCard programme={p} />
            </div>
          ))}
        </div>
      )}

      <PanelFooter
        fill={fill}
        cta={
          <Button href={isProgrammes ? "/programs" : "/certifications"} arrow>
            View all {total} {isProgrammes ? "programmes" : "certifications"}
          </Button>
        }
      >
        {isProgrammes ? (
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
            <span className="text-sm font-semibold text-navy">In development with</span>
            {institutions.map((i) => (
              <span key={i.slug} className="flex items-center gap-2.5">
                <InstitutionMark slug={i.slug} size={36} />
                <span className="text-sm leading-tight">
                  <span className="block font-semibold text-navy">{i.name}</span>
                  <span className="text-xs text-muted-foreground">{i.focus}</span>
                </span>
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            <span className="font-semibold text-navy">Short, focused and career-ready.</span>{" "}
            Certifications across leadership, AI, analytics, banking and finance — designed for
            working professionals.
          </p>
        )}
      </PanelFooter>
    </>
  );
}

function PanelFooter({
  children,
  cta,
  fill,
}: {
  children: React.ReactNode;
  cta: React.ReactNode;
  fill?: boolean;
}) {
  return (
    <div
      className={cn(
        "flex shrink-0 flex-col gap-5 rounded-2xl border border-border bg-white sm:flex-row sm:items-center sm:justify-between",
        fill ? "px-5 py-3.5 [@media(min-height:860px)]:py-4" : "p-5 sm:p-6",
      )}
    >
      <div className="min-w-0">{children}</div>
      <div className="shrink-0 max-sm:*:w-full">{cta}</div>
    </div>
  );
}

/** Height-flexible programme / certification card for the pinned layout: the image absorbs spare space. */
function CompactCard({ programme: p }: { programme: Programme }) {
  const cat = getCategory(p.category)!;
  const inst = getInstitution(p.institution);
  const href = programmeHref(p);
  const CatIcon = icons[cat.icon];

  return (
    <article className="group flex min-h-0 flex-col overflow-hidden rounded-2xl border border-border bg-white transition-all duration-300 hover:-translate-y-1 hover:border-blue/30 hover:shadow-[0_24px_50px_-24px_rgb(8_29_72/0.35)]">
      <Link
        href={href}
        tabIndex={-1}
        className="relative min-h-[88px] flex-1 overflow-hidden bg-section"
      >
        <Image
          src={cat.image}
          alt=""
          fill
          sizes="33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <span
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent"
        />
        <span className="absolute top-3 left-3 rounded-full bg-orange px-2.5 py-1 text-[11px] font-semibold text-white">
          Coming soon
        </span>
        <span className="absolute bottom-3 left-3 inline-flex items-center gap-1.5 rounded-full bg-white/15 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur">
          <CatIcon className="size-3.5" aria-hidden /> {cat.name}
        </span>
      </Link>

      <div className="flex shrink-0 flex-col gap-2 p-4 xl:p-5">
        <div className="flex items-center gap-2.5">
          <InstitutionMark slug={p.institution} size={28} />
          <span className="truncate text-xs text-muted-foreground">
            {inst ? (
              <>
                In development with <span className="font-semibold text-navy">{inst.name}</span>
              </>
            ) : (
              <>
                Zenvogo{" "}
                <span className="font-semibold text-navy">{kindLabel[p.kind].singular}</span>
              </>
            )}
          </span>
        </div>
        <h3 className="line-clamp-2 min-h-[2lh] text-[16px] leading-snug font-semibold text-navy xl:text-[17px]">
          <Link href={href} className="transition-colors hover:text-blue">
            {p.title}
          </Link>
        </h3>
        <p className="line-clamp-2 min-h-[2lh] text-sm text-muted-foreground [@media(max-height:800px)]:hidden">
          {p.summary}
        </p>
        <div className="mt-1 flex items-center justify-between border-t border-border pt-3 text-xs text-muted-foreground">
          <span className="inline-flex items-center gap-1.5">
            <BookOpen className="size-3.5" aria-hidden /> {p.modules.length} modules
          </span>
          <Link
            href={href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue hover:text-navy"
          >
            View {kindLabel[p.kind].singular}
            <ArrowRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </article>
  );
}

function ImmersionsPanel({ fill }: { fill?: boolean }) {
  return (
    <>
      <ul
        className={cn(
          "grid gap-3 sm:gap-4 lg:gap-5",
          fill ? "min-h-0 flex-1 grid-cols-6 grid-rows-2" : "grid-cols-2 lg:grid-cols-6",
        )}
      >
        {destinations.map((d, i) => (
          <li
            key={d.slug}
            className={cn(
              "min-h-0",
              i === 0 && "col-span-2 lg:col-span-3",
              i === 1 && "col-span-2 sm:col-span-1 lg:col-span-3",
              i > 1 && "lg:col-span-2",
              i === 4 && "col-span-2 sm:col-span-1",
              fill && i < 2 && "col-span-3",
              fill && i >= 2 && "col-span-2",
            )}
          >
            <Link
              href={`/immersion-programs/${d.slug}`}
              className={cn(
                "group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl p-4 text-white sm:p-5",
                fill ? "h-full" : cn("h-48 sm:h-56", i < 2 && "lg:h-72"),
              )}
            >
              <Image
                src={d.image}
                alt=""
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="-z-10 object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span
                aria-hidden
                className="absolute inset-0 -z-10 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent"
              />
              <span className="absolute top-4 left-4 rounded-full bg-navy/60 px-2.5 py-1 text-[11px] font-semibold backdrop-blur">
                {d.region}
              </span>
              <span className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-white/15 backdrop-blur transition-colors group-hover:bg-orange">
                <ArrowUpRight aria-hidden className="size-4" />
              </span>
              <span className="font-display text-lg font-bold sm:text-2xl">{d.name}</span>
              <span className="mt-0.5 line-clamp-1 text-sm text-white/80">{d.title}</span>
            </Link>
          </li>
        ))}
      </ul>

      <PanelFooter
        fill={fill}
        cta={
          <Button href="/immersion-programs" arrow>
            Explore all {destinations.length} destinations
          </Button>
        }
      >
        <div className="flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm font-semibold text-navy">Formats:</span>
          {formats.map((f) => (
            <Link
              key={f.slug}
              href={`/immersion-programs#${f.slug}`}
              className="inline-flex items-center gap-1 rounded-full border border-border bg-section px-3 py-1.5 text-xs font-semibold text-navy transition-colors hover:border-blue/40 hover:text-blue"
            >
              {f.title.replace(/ Programmes$/, "").replace(/ Immersions?$/, "")}
              <ArrowRight aria-hidden className="size-3" />
            </Link>
          ))}
        </div>
      </PanelFooter>
    </>
  );
}
