import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, CheckCircle2 } from "lucide-react";
import {
  audiences,
  experienceIntro,
  experiences,
  formats,
  lifecycle,
  whyChoose,
  type Destination,
} from "@/lib/data/immersions";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";

export const institutionRoles = [
  "University / business school",
  "Higher education institution",
  "Executive education provider",
  "Corporate L&D team",
  "Industry association / professional body",
  "Student group / professional cohort",
];

/** Large photo card for a destination. */
export function DestinationCard({
  d,
  className,
  tall,
}: {
  d: Destination;
  className?: string;
  tall?: boolean;
}) {
  return (
    <Link
      href={`/immersion-programs/${d.slug}`}
      className={cn(
        "group relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-navy p-6 text-white",
        tall ? "min-h-80 sm:min-h-[26rem]" : "min-h-72 sm:min-h-80",
        className,
      )}
    >
      <Image
        src={d.image}
        alt={`${d.name} immersion programme`}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="-z-20 object-cover transition-transform duration-700 group-hover:scale-105"
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-gradient-to-t from-navy via-navy/55 to-navy/0"
      />
      <span className="absolute top-5 left-5 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold backdrop-blur">
        {d.region}
      </span>
      <span className="absolute top-5 right-5 grid size-10 place-items-center rounded-full bg-white/15 backdrop-blur transition-all group-hover:rotate-45 group-hover:bg-orange">
        <ArrowUpRight className="size-5" />
      </span>
      <p className="text-2xl font-bold sm:text-[28px]">{d.name}</p>
      <p className="mt-1 font-semibold text-gold">{d.title}</p>
      <p className="mt-2 line-clamp-2 max-w-md text-sm text-white/75">{d.text}</p>
      <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold">
        Explore {d.name}{" "}
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
      </span>
    </Link>
  );
}

/** "What makes a Zenvogo immersion different" — photos + learning framework. */
export function ExperienceSection({
  id,
  tone = "white",
}: {
  id?: string;
  tone?: "white" | "light";
}) {
  return (
    <Section id={id} tone={tone} className="scroll-mt-36">
      <Container className="flex flex-col gap-12">
        <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
          <SectionHeading eyebrow="The Zenvogo difference" title={experienceIntro.title} />
          <Reveal>
            <p className="text-base font-semibold text-navy sm:text-lg">
              {experienceIntro.tagline}
            </p>
            <p className="mt-2 text-muted-foreground">{experienceIntro.text}</p>
          </Reveal>
        </div>
        <div className="grid grid-cols-3 gap-3 sm:gap-5">
          {experienceIntro.images.map((src, i) => (
            <Reveal
              key={src}
              delay={i * 0.08}
              className={cn(
                "relative aspect-[4/3] overflow-hidden rounded-2xl",
                i === 1 && "sm:translate-y-6",
              )}
            >
              <Image
                src={src}
                alt=""
                fill
                sizes="(min-width: 1400px) 440px, 33vw"
                className="object-cover"
              />
            </Reveal>
          ))}
        </div>
        <div className="overflow-hidden rounded-2xl border border-border bg-white">
          <div className="hidden grid-cols-[1fr_1.4fr] bg-navy px-6 py-3 text-xs font-semibold tracking-wider text-white/70 uppercase sm:grid">
            <span>Experience</span>
            <span>What participants gain</span>
          </div>
          {experiences.map((e, i) => {
            const Icon = icons[e.icon];
            return (
              <Reveal
                key={e.title}
                delay={i * 0.04}
                className="grid gap-1 border-t border-border px-6 py-5 first:border-t-0 sm:grid-cols-[1fr_1.4fr] sm:items-center sm:gap-4"
              >
                <span className="flex items-center gap-3 font-semibold text-navy">
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  {e.title}
                </span>
                <span className="text-muted-foreground sm:text-[15px]">{e.gain}</span>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/** The four programme formats. */
export function FormatsSection({
  id,
  intro,
  tone = "light",
}: {
  id?: string;
  intro: string;
  tone?: "white" | "light";
}) {
  return (
    <Section id={id} tone={tone} className="scroll-mt-36">
      <Container className="flex flex-col gap-10">
        <SectionHeading eyebrow="Programme formats" title="Our Programme Formats" text={intro} />
        <div className="grid gap-6 sm:grid-cols-2">
          {formats.map((f, i) => {
            const Icon = icons[f.icon];
            return (
              <Reveal
                key={f.slug}
                id={f.slug}
                delay={i * 0.06}
                className="group grid scroll-mt-40 overflow-hidden rounded-2xl border border-border bg-white transition-shadow hover:shadow-[0_24px_50px_-24px_rgb(8_29_72/0.35)] lg:grid-cols-[0.9fr_1fr]"
              >
                <div className="relative min-h-48">
                  <Image
                    src={f.image}
                    alt=""
                    fill
                    sizes="(max-width: 1024px) 100vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-col gap-3 p-6">
                  <span className="grid size-11 place-items-center rounded-xl bg-orange/10 text-orange">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <h3 className="text-lg font-semibold text-navy">{f.title}</h3>
                  <p className="text-sm text-muted-foreground">{f.text}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

/** Six-stage end-to-end programme management timeline. */
export function LifecycleSection({
  id,
  title,
  tagline,
  text,
}: {
  id?: string;
  title: string;
  tagline: string;
  text: string;
}) {
  return (
    <Section id={id} tone="navy" className="scroll-mt-36 overflow-hidden">
      <div aria-hidden className="absolute inset-0 dot-grid-light opacity-40" />
      <div
        aria-hidden
        className="absolute -right-40 -bottom-40 size-[30rem] rounded-full bg-blue/25 blur-[120px]"
      />
      <Container className="relative flex flex-col gap-12">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <SectionHeading tone="dark" eyebrow="How it works" title={title} />
          <Reveal>
            <p className="text-lg font-semibold text-white">{tagline}</p>
            <p className="mt-2 text-white/65">{text}</p>
          </Reveal>
        </div>
        <ol className="relative grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {lifecycle.map((s, i) => {
            const Icon = icons[s.icon];
            return (
              <Reveal
                as="li"
                key={s.title}
                delay={i * 0.07}
                className="relative flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-orange/40"
              >
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-xl bg-white/10 text-gold">
                    <Icon className="size-6" strokeWidth={1.6} />
                  </span>
                  <span className="text-3xl font-bold text-white/10 sm:text-4xl">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-white">{s.title}</h3>
                <p className="text-sm text-white/65">{s.text}</p>
              </Reveal>
            );
          })}
        </ol>
      </Container>
    </Section>
  );
}

/** Who we work with + why choose Zenvogo. */
export function AudienceSection({ id }: { id?: string }) {
  return (
    <Section id={id} className="scroll-mt-36">
      <Container className="grid gap-12 lg:grid-cols-[1fr_1.3fr]">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow="Who we work with"
            title="Built for institutions and organisations"
          />
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
            {audiences.map((a, i) => {
              const Icon = icons[a.icon];
              return (
                <Reveal
                  as="li"
                  key={a.text}
                  delay={i * 0.04}
                  className="flex items-center gap-3 rounded-xl border border-border bg-white p-4"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <span className="font-medium text-navy">{a.text}</span>
                </Reveal>
              );
            })}
          </ul>
        </div>
        <div className="flex flex-col gap-8">
          <SectionHeading eyebrow={whyChoose.title} title={whyChoose.tagline} />
          <div className="grid gap-4 sm:grid-cols-2">
            {whyChoose.items.map((w, i) => {
              const Icon = icons[w.icon];
              return (
                <Reveal
                  key={w.title}
                  delay={i * 0.05}
                  className={cn("card p-6", i === whyChoose.items.length - 1 && "sm:col-span-2")}
                >
                  <span className="grid size-11 place-items-center rounded-xl bg-orange/10 text-orange">
                    <Icon className="size-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 font-semibold text-navy">{w.title}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{w.text}</p>
                </Reveal>
              );
            })}
          </div>
        </div>
      </Container>
    </Section>
  );
}

/** Photo-backed enquiry band. */
export function ImmersionApplyBand({
  title,
  text,
  text2,
  image,
  form,
}: {
  title: string;
  text: string;
  text2?: string;
  image: string;
  form: React.ReactNode;
}) {
  return (
    <section className="dark-section relative isolate overflow-hidden py-14 sm:py-20 lg:py-24">
      <Image src={image} alt="" fill sizes="100vw" className="-z-20 object-cover" />
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(7_26_66/0.96)_0%,rgb(7_26_66/0.88)_50%,rgb(7_26_66/0.7)_100%)]"
      />
      <Container className="grid gap-10 lg:grid-cols-[1fr_400px] lg:items-center">
        <Reveal className="flex flex-col gap-5">
          <span className="w-fit rounded-full bg-orange px-3 py-1 text-xs font-semibold text-white">
            Enquire now
          </span>
          <h2 className="text-[26px] leading-tight font-bold text-white sm:text-[42px]">{title}</h2>
          <p className="max-w-xl text-[15px] text-white/75 sm:text-lg">{text}</p>
          {text2 && (
            <p className="flex items-start gap-2 font-semibold text-gold">
              <CheckCircle2 className="mt-0.5 size-5 shrink-0" />
              {text2}
            </p>
          )}
        </Reveal>
        <Reveal delay={0.1}>{form}</Reveal>
      </Container>
    </section>
  );
}
