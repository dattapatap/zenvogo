"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MoveRight, Sparkles } from "lucide-react";
import {
  MotionConfig,
  motion,
  useMotionValueEvent,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { industries, type Industry } from "@/lib/data/content";
import { programmes } from "@/lib/data/programmes";
import { icons } from "@/lib/icons";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, Eyebrow } from "@/components/ui/SectionHeading";
import { cn } from "@/lib/utils";

/** Sticky header height on desktop. */
const HEADER = 80;

/** Illustration gradient per industry, in `industries` order. */
const palettes: [string, string][] = [
  ["#ff9a4d", "#ff6818"], // Real estate & construction
  ["#2f7ff0", "#0c2a63"], // Banking & financial services
  ["#4a6493", "#0c2a63"], // Manufacturing
  ["#1cb59c", "#0b7f6f"], // Healthcare & life sciences
  ["#5b8cff", "#4b3fd0"], // Technology & IT services
  ["#ffc043", "#ff7a1a"], // Logistics & supply chain
  ["#f0567d", "#c0265e"], // Retail & consumer
  ["#33bd7d", "#0e7a5a"], // Energy & infrastructure
];

/** Related programmes / certifications for an industry, and where to browse them. */
function related(ind: Industry) {
  const inCat = programmes.filter((p) => p.category === ind.category);
  const progs = inCat.filter((p) => p.kind === "programme").length;
  const certs = inCat.length - progs;
  const base = progs > 0 ? "/programs" : "/certifications";
  return {
    progs,
    certs,
    href: inCat.length ? `${base}?category=${ind.category}#all` : "/contact?type=industry",
  };
}

const heading = (
  <>
    Programmes shaped by the <Accent>sectors we serve.</Accent>
  </>
);

/**
 * Industries we serve.
 * Desktop: the section pins and vertical scrolling slides a gallery of industry cards sideways.
 * Tablet / mobile: the same cards in a swipeable row.
 */
export function IndustryShowcase() {
  const pinnable = useMediaQuery("(min-width: 1024px) and (min-height: 680px)");
  return (
    <MotionConfig reducedMotion="user">
      <section aria-label="Industries we serve" className="relative overflow-x-clip bg-background">
        {pinnable ? <PinnedGallery /> : <SwipeGallery />}
      </section>
    </MotionConfig>
  );
}

/* ───────────────────────── Desktop: scroll-driven horizontal gallery ───────────────────────── */

function PinnedGallery() {
  const track = useRef<HTMLDivElement>(null);
  const viewport = useRef<HTMLDivElement>(null);
  const rail = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const [active, setActive] = useState(0);
  const n = industries.length;

  // Horizontal distance the rail travels = how far the page scrolls while pinned.
  useEffect(() => {
    const measure = () => {
      if (!rail.current || !viewport.current) return;
      setDistance(Math.max(0, rail.current.scrollWidth - viewport.current.clientWidth));
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (rail.current) ro.observe(rail.current);
    if (viewport.current) ro.observe(viewport.current);
    return () => ro.disconnect();
  }, []);

  const { scrollYProgress } = useScroll({
    target: track,
    offset: [`start ${HEADER}px`, "end end"],
  });
  const raw = useTransform(scrollYProgress, (v) => -v * distance);
  const x = useSpring(raw, { stiffness: 220, damping: 40, mass: 0.4 });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(n - 1, Math.max(0, Math.floor(v * n))));
  });

  const goTo = (i: number) => {
    const el = track.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - HEADER;
    const travel = el.offsetHeight - (window.innerHeight - HEADER);
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clamped = Math.min(n - 1, Math.max(0, i));
    window.scrollTo({
      top: top + travel * ((clamped + 0.5) / n),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  return (
    <div className="pt-16 xl:pt-20">
      <div
        ref={track}
        className="relative"
        style={{
          height: distance
            ? `calc(100vh - ${HEADER}px + ${distance}px)`
            : `calc(100vh - ${HEADER}px + 2400px)`,
        }}
      >
        <div
          className="sticky flex flex-col justify-center gap-8 py-8 [@media(min-height:860px)]:gap-10"
          style={{ top: HEADER, height: `calc(100vh - ${HEADER}px)` }}
        >
          {/* Header */}
          <Container className="flex items-end justify-between gap-10">
            <div className="max-w-2xl">
              <Eyebrow>Industries</Eyebrow>
              <h2 className="mt-2 text-[32px] font-bold text-balance xl:text-[40px]">{heading}</h2>
            </div>
            <div className="flex shrink-0 items-center gap-5">
              <div className="flex flex-col items-end gap-2">
                <span className="font-display text-sm font-bold text-navy">
                  {String(active + 1).padStart(2, "0")}
                  <span className="text-muted-foreground"> / {String(n).padStart(2, "0")}</span>
                </span>
                <span className="relative h-1 w-40 overflow-hidden rounded-full bg-border">
                  <motion.span
                    style={{ scaleX: scrollYProgress }}
                    className="absolute inset-0 origin-left rounded-full bg-gradient-to-r from-blue to-orange"
                  />
                </span>
              </div>
              <div className="flex gap-2">
                <NavButton
                  label="Previous industry"
                  onClick={() => goTo(active - 1)}
                  disabled={active === 0}
                >
                  <ArrowLeft className="size-4" />
                </NavButton>
                <NavButton
                  label="Next industry"
                  onClick={() => goTo(active + 1)}
                  disabled={active === n - 1}
                >
                  <ArrowRight className="size-4" />
                </NavButton>
              </div>
            </div>
          </Container>

          {/* Gallery */}
          <div ref={viewport} className="relative w-full overflow-hidden py-4">
            <motion.div
              ref={rail}
              style={{ x }}
              className="flex w-max gap-6 pr-[max(20px,calc((100vw-1400px)/2+40px))] pl-[max(20px,calc((100vw-1400px)/2+40px))]"
            >
              <IntroCard />
              {industries.map((ind, i) => (
                <IndustryCard key={ind.name} industry={ind} index={i} highlight={i === active} />
              ))}
              <CtaCard />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

function NavButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className="grid size-11 place-items-center rounded-full border border-border bg-white text-navy transition-all hover:border-navy hover:bg-navy hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue disabled:opacity-40 disabled:hover:border-border disabled:hover:bg-white disabled:hover:text-navy"
    >
      {children}
    </button>
  );
}

/* ───────────────────────── Tablet / mobile: swipeable row ───────────────────────── */

function SwipeGallery() {
  return (
    <div className="flex flex-col gap-6 py-14 sm:gap-8 sm:py-[72px] lg:py-[100px]">
      <Container>
        <Reveal className="flex flex-col gap-4">
          <Eyebrow>Industries</Eyebrow>
          <h2 className="text-[26px] font-bold text-balance sm:text-[34px]">{heading}</h2>
          <p className="flex items-center gap-2 text-sm text-muted-foreground">
            Swipe to explore all {industries.length} industries
            <MoveRight aria-hidden className="size-4 text-orange" />
          </p>
        </Reveal>
      </Container>
      <Reveal className="no-scrollbar flex snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-1 pb-6 sm:scroll-px-7 sm:px-7">
        {industries.map((ind, i) => (
          <div key={ind.name} className="flex snap-start">
            <IndustryCard industry={ind} index={i} />
          </div>
        ))}
        <div className="flex snap-start">
          <CtaCard />
        </div>
      </Reveal>
    </div>
  );
}

/* ───────────────────────── Cards ───────────────────────── */

const cardSize =
  "w-[78vw] max-w-[340px] shrink-0 sm:w-[340px] lg:h-[min(540px,calc(100vh-330px))] lg:min-h-[380px] lg:w-[360px] xl:w-[380px]";

function IndustryCard({
  industry: ind,
  index,
  highlight,
}: {
  industry: Industry;
  index: number;
  highlight?: boolean;
}) {
  const Icon = icons[ind.icon];
  const [from, to] = palettes[index % palettes.length];
  const r = related(ind);

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-3xl border bg-white transition-all duration-500",
        "hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgb(8_29_72/0.45)]",
        highlight
          ? "border-navy/15 shadow-[0_30px_60px_-30px_rgb(8_29_72/0.45)]"
          : "border-border shadow-(--shadow-card)",
        cardSize,
      )}
    >
      {/* Illustration */}
      <div
        className="relative isolate h-44 shrink-0 overflow-hidden lg:h-auto lg:min-h-[150px] lg:flex-1"
        style={{ background: `linear-gradient(135deg, ${from}, ${to})` }}
      >
        <span aria-hidden className="absolute inset-0 -z-10 dot-grid-light opacity-60" />
        <span
          aria-hidden
          className="absolute -right-16 -bottom-20 -z-10 size-64 rounded-full border border-white/20"
        />
        <span
          aria-hidden
          className="absolute -right-4 -bottom-8 -z-10 size-40 rounded-full border border-white/25"
        />
        <span
          aria-hidden
          className="absolute -top-10 -left-10 -z-10 size-40 rounded-full bg-white/15 blur-2xl"
        />
        <span
          aria-hidden
          className="absolute top-4 right-5 font-display text-6xl leading-none font-extrabold text-white/25"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <div className="absolute inset-0 grid place-items-center">
          <span className="grid size-20 place-items-center rounded-3xl border border-white/35 bg-white/15 text-white shadow-[0_20px_40px_-14px_rgb(0_0_0/0.45)] backdrop-blur-md transition-transform duration-500 group-hover:-translate-y-1 group-hover:-rotate-6 xl:size-24">
            <Icon aria-hidden className="size-10 xl:size-11" strokeWidth={1.5} />
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col gap-3 p-5 lg:flex-none xl:p-6">
        <h3 className="text-lg leading-snug font-bold xl:text-xl">{ind.name}</h3>
        <p className="line-clamp-2 min-h-[2lh] text-sm text-muted-foreground">{ind.text}</p>
        <ul className="flex flex-wrap gap-1.5">
          {ind.themes.map((t) => (
            <li
              key={t}
              className="rounded-full bg-section px-2.5 py-1 text-[11px] font-semibold text-navy/75"
            >
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-border pt-4">
          <span className="text-xs text-muted-foreground">
            {r.progs > 0 && (
              <>
                <span className="font-semibold text-navy">{r.progs}</span>{" "}
                {r.progs === 1 ? "programme" : "programmes"}
              </>
            )}
            {r.progs > 0 && r.certs > 0 && " · "}
            {r.certs > 0 && (
              <>
                <span className="font-semibold text-navy">{r.certs}</span>{" "}
                {r.certs === 1 ? "certification" : "certifications"}
              </>
            )}
            {r.progs + r.certs === 0 && "Custom programmes"}
          </span>
          <Link
            href={r.href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-blue transition-colors after:absolute after:inset-0 hover:text-navy"
          >
            Explore
            <ArrowUpRight
              aria-hidden
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
            <span className="sr-only">programmes for {ind.name}</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

function IntroCard() {
  return (
    <div
      className={cn(
        "dark-section relative isolate flex flex-col justify-between overflow-hidden rounded-3xl bg-navy p-7 text-white/75 xl:p-8",
        cardSize,
        "lg:w-[320px] xl:w-[340px]",
      )}
    >
      <span aria-hidden className="absolute inset-0 -z-10 dot-grid-light" />
      <span
        aria-hidden
        className="absolute -top-20 -right-20 -z-10 size-64 rounded-full bg-blue/40 blur-[90px]"
      />
      <span
        aria-hidden
        className="absolute -bottom-24 -left-16 -z-10 size-56 rounded-full bg-orange/25 blur-[90px]"
      />
      <div>
        <span className="grid size-12 place-items-center rounded-2xl bg-orange text-white">
          <Sparkles aria-hidden className="size-6" />
        </span>
        <p className="mt-6 font-display text-6xl leading-none font-extrabold text-white">
          {industries.length}
        </p>
        <p className="mt-2 font-display text-xl font-bold text-white">industries we design for</p>
        <p className="mt-4 text-[15px]">
          Every programme starts with a sector&apos;s real challenges — researched with senior
          professionals and built with leading institutions.
        </p>
      </div>
      <p className="flex items-center gap-2 text-sm font-semibold text-gold">
        Keep scrolling
        <MoveRight aria-hidden className="size-4" />
      </p>
    </div>
  );
}

function CtaCard() {
  return (
    <div
      className={cn(
        "relative isolate flex flex-col justify-between gap-6 overflow-hidden rounded-3xl bg-[linear-gradient(135deg,#ff8a3d,#ff6818_55%,#e0500a)] p-6 text-white sm:p-7 xl:p-8",
        cardSize,
        "lg:w-[320px] xl:w-[340px]",
      )}
    >
      <span aria-hidden className="absolute inset-0 -z-10 dot-grid-light opacity-50" />
      <span
        aria-hidden
        className="absolute -right-16 -bottom-16 -z-10 size-64 rounded-full border border-white/25"
      />
      <div>
        <p className="text-xs font-semibold tracking-[0.14em] text-white/80 uppercase">
          Your sector
        </p>
        <p className="mt-4 font-display text-2xl leading-tight font-bold sm:text-[28px]">
          Don&apos;t see your industry?
        </p>
        <p className="mt-3 text-[15px] text-white/85">
          We research your sector&apos;s challenges and design a programme around them — with expert
          faculty and a leading institution.
        </p>
      </div>
      <Button
        href="/contact?type=industry"
        variant="secondary"
        arrow
        className="w-full bg-white text-navy hover:bg-navy hover:text-white"
      >
        Design a Programme
      </Button>
    </div>
  );
}
