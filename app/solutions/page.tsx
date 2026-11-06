import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { solutions } from "@/lib/data/solutions";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Our Programs",
  description:
    "Executive education, industry-curated learning, global education and corporate learning — designed around real industry challenges.",
};

export default function SolutionsPage() {
  return (
    <>
      <PageHero
        eyebrow="Our Programs"
        crumbs={[{ label: "Our Programs" }]}
        title="Learning solutions that move industries forward"
        text="Four ways we help organisations, professionals and institutions grow — each one designed around real needs rather than an off-the-shelf catalogue."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?type=industry" arrow>
            Discuss Your Learning Needs
          </Button>
        </div>
      </PageHero>

      {solutions.map((s, i) => (
        <Section key={s.slug} tone={i % 2 ? "light" : "white"}>
          <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal className={i % 2 ? "lg:order-2" : ""}>
              <span className="font-display text-sm font-bold text-orange">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="mt-2 text-[29px] font-bold sm:text-[38px]">{s.title}</h2>
              <p className="mt-2 text-lg font-medium text-blue">{s.tagline}</p>
              <p className="mt-4 text-muted-foreground">{s.summary}</p>
              <div className="mt-7">
                <Button href={`/solutions/${s.slug}`} variant="secondary" arrow>
                  Explore Solution
                </Button>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="card p-7 sm:p-8">
              <div className="flex items-center gap-4">
                <IconBadge name={s.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="text-lg font-semibold">Key outcomes</h3>
              </div>
              <ul className="mt-6 flex flex-col gap-3">
                {s.outcomes.map((o) => (
                  <li key={o} className="flex gap-3 text-sm">
                    <Check className="mt-0.5 size-4 shrink-0 text-orange" />
                    {o}
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-wrap gap-2 border-t border-border pt-6">
                {s.formats.map((f) => (
                  <span
                    key={f}
                    className="rounded-md bg-section-2 px-3 py-1 text-xs font-medium text-navy"
                  >
                    {f}
                  </span>
                ))}
              </div>
              <Link
                href={`/solutions/${s.slug}`}
                className="group mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-blue"
              >
                Learn more
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Reveal>
          </Container>
        </Section>
      ))}

      <CTASection />
    </>
  );
}
