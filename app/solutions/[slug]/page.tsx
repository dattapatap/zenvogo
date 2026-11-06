import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, Check, Users } from "lucide-react";
import { getSolution, solutions } from "@/lib/data/solutions";
import { approach } from "@/lib/data/content";
import { icons } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { AIVentureScene, CareerGrowthScene, GlobalEducationScene } from "@/components/three";

const scenes: Record<string, React.ReactNode> = {
  "executive-leadership": <CareerGrowthScene labels={false} />,
  "global-education-exchange": <GlobalEducationScene />,
  "corporate-learning": <CareerGrowthScene labels={false} />,
  "industry-curated-learning": <AIVentureScene />,
};

export function generateStaticParams() {
  return solutions.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: PageProps<"/solutions/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  const s = getSolution(slug);
  return s ? { title: s.title, description: s.summary } : {};
}

export default async function SolutionPage(props: PageProps<"/solutions/[slug]">) {
  const { slug } = await props.params;
  const solution = getSolution(slug);
  if (!solution) notFound();

  const others = solutions.filter((s) => s.slug !== solution.slug);

  return (
    <>
      <PageHero
        eyebrow="Solution"
        crumbs={[{ label: "Our Programs", href: "/solutions" }, { label: solution.short }]}
        title={solution.title}
        text={solution.tagline}
        scene={scenes[solution.slug]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?type=industry" arrow>
            Discuss Your Learning Needs
          </Button>
          <Button href="/solutions" variant="outline-light">
            All Programs
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <div className="flex flex-col gap-10">
            <Reveal className="flex flex-col gap-5 text-lg text-pretty text-muted-foreground">
              {solution.body.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </Reveal>
            <Reveal>
              <h2 className="text-[26px] font-bold">Outcomes</h2>
              <ul className="mt-6 grid gap-4 sm:grid-cols-2">
                {solution.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 card p-5 text-sm">
                    <Check className="mt-0.5 size-5 shrink-0 text-orange" />
                    {o}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">
            <Reveal className="card p-7">
              <div className="flex items-center gap-4">
                <IconBadge name={solution.icon} />
                <h2 className="text-lg font-semibold">Who it&apos;s for</h2>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {solution.audience.map((a) => (
                  <li key={a} className="flex gap-3 text-sm">
                    <Users className="mt-0.5 size-4 shrink-0 text-blue" />
                    {a}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal delay={0.08} className="dark-section rounded-2xl bg-navy p-7 text-white/80">
              <h2 className="text-lg font-semibold">Formats</h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {solution.formats.map((f) => (
                  <span key={f} className="rounded-md bg-white/10 px-3 py-1 text-xs font-medium">
                    {f}
                  </span>
                ))}
              </div>
            </Reveal>
          </aside>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            align="center"
            eyebrow="How we build it"
            title="Our five-step design process"
          />
          <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {approach.map((step, i) => {
              const I = icons[step.icon];
              return (
                <Reveal as="li" key={step.title} delay={i * 0.06} className="card p-6">
                  <div className="flex items-center justify-between">
                    <I className="size-6 text-blue" strokeWidth={1.75} />
                    <span className="font-display text-sm font-bold text-orange">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-semibold">{step.title}</h3>
                </Reveal>
              );
            })}
          </ol>
        </Container>
      </Section>

      <Section>
        <Container>
          <h2 className="text-[26px] font-bold">Other programs</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {others.map((s) => (
              <Link
                key={s.slug}
                href={`/solutions/${s.slug}`}
                className="group flex card-hover items-center gap-4 card p-5"
              >
                <IconBadge name={s.icon} className="size-11 [&_svg]:size-5" />
                <span className="font-semibold text-navy">{s.short}</span>
                <ArrowRight className="ml-auto size-4 text-blue transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
