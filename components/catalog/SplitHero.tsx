import Image from "next/image";
import Link from "next/link";
import { CheckCircle2, ChevronRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

type Props = {
  crumbs: { label: string; href?: string }[];
  badges?: React.ReactNode;
  title: React.ReactNode;
  tagline?: string;
  text?: React.ReactNode;
  bullets?: string[];
  /** Extra content under the copy (facts, buttons…). */
  children?: React.ReactNode;
  /** Right column — usually an enquiry form. */
  aside?: React.ReactNode;
  /** Optional photo behind the hero (darkened). */
  image?: string;
};

/** Navy hero for catalogue pages: breadcrumb + copy on the left, a form card on the right. */
export function SplitHero({
  crumbs,
  badges,
  title,
  tagline,
  text,
  bullets,
  children,
  aside,
  image,
}: Props) {
  return (
    <section className="dark-section relative isolate overflow-hidden bg-navy text-white/75">
      {image ? (
        <>
          <Image src={image} alt="" fill priority sizes="100vw" className="-z-20 object-cover" />
          <div
            aria-hidden
            className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(7_26_66/0.97)_0%,rgb(7_26_66/0.9)_45%,rgb(7_26_66/0.55)_100%)]"
          />
        </>
      ) : (
        <>
          <div aria-hidden className="absolute inset-0 -z-10 dot-grid-light opacity-60" />
          <div
            aria-hidden
            className="absolute -top-40 -right-32 -z-10 size-[32rem] rounded-full bg-blue/30 blur-[120px]"
          />
          <div
            aria-hidden
            className="absolute -bottom-40 -left-32 -z-10 size-96 rounded-full bg-orange/15 blur-[120px]"
          />
        </>
      )}
      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent"
      />

      <Container
        className={cn(
          "grid gap-10 py-12 sm:py-16 lg:py-20",
          aside && "lg:grid-cols-[1fr_380px] lg:items-center xl:gap-16",
        )}
      >
        <div className="flex flex-col gap-5">
          <Reveal y={8}>
            <nav aria-label="Breadcrumb">
              <ol className="flex flex-wrap items-center gap-1.5 text-sm text-white/60">
                <li>
                  <Link href="/" className="hover:text-white">
                    Home
                  </Link>
                </li>
                {crumbs.map((c) => (
                  <li key={c.label} className="flex items-center gap-1.5">
                    <ChevronRight className="size-3.5" />
                    {c.href ? (
                      <Link href={c.href} className="hover:text-white">
                        {c.label}
                      </Link>
                    ) : (
                      <span className="line-clamp-1 text-white">{c.label}</span>
                    )}
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
          {badges && (
            <Reveal delay={0.04} className="flex flex-wrap gap-2">
              {badges}
            </Reveal>
          )}
          <Reveal delay={0.08}>
            <h1 className="text-[32px] leading-[1.12] font-bold text-balance text-white sm:text-[42px] lg:text-[50px]">
              {title}
            </h1>
          </Reveal>
          {tagline && (
            <Reveal delay={0.12}>
              <p className="text-lg font-semibold text-gold sm:text-xl">{tagline}</p>
            </Reveal>
          )}
          {text && (
            <Reveal delay={0.16}>
              <p className="max-w-2xl text-[17px] text-pretty lg:text-lg">{text}</p>
            </Reveal>
          )}
          {bullets && (
            <Reveal delay={0.2}>
              <ul className="flex flex-col gap-2.5">
                {bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5 text-[15px] text-white/85">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-orange" />
                    {b}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
          {children && <Reveal delay={0.24}>{children}</Reveal>}
        </div>
        {aside && (
          <Reveal delay={0.15} id="apply" className="scroll-mt-40">
            {aside}
          </Reveal>
        )}
      </Container>
    </section>
  );
}

/** Small pill used in hero badge rows. */
export function HeroBadge({
  children,
  tone = "glass",
}: {
  children: React.ReactNode;
  tone?: "glass" | "orange" | "green";
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
        tone === "glass" && "border border-white/20 bg-white/10 text-white",
        tone === "orange" && "bg-orange text-white",
        tone === "green" && "bg-emerald-400/15 text-emerald-300 ring-1 ring-emerald-300/30",
      )}
    >
      {children}
    </span>
  );
}

/** Row of stat tiles that sits under a hero. */
export function StatStrip({ stats }: { stats: { value: string; label: string }[] }) {
  return (
    <div className="relative z-10 -mt-px border-b border-border bg-white">
      <Container className="grid grid-cols-2 divide-border lg:grid-cols-4 lg:divide-x">
        {stats.map((s) => (
          <div key={s.label} className="flex flex-col gap-0.5 px-2 py-6 sm:px-6">
            <span className="text-2xl font-bold text-navy sm:text-[28px]">{s.value}</span>
            <span className="text-sm text-muted-foreground">{s.label}</span>
          </div>
        ))}
      </Container>
    </div>
  );
}
