import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import type { IconName } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Immersion Programs",
  description:
    "International immersions, study tours and exchanges that bring global perspective to students, professionals and leaders.",
};

const formats: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "globe",
    title: "International immersions",
    text: "Short, intensive programmes abroad with campus sessions, industry visits and cultural exposure.",
  },
  {
    icon: "building",
    title: "Industry study tours",
    text: "Curated visits to leading companies and clusters to see how a sector works in another market.",
  },
  {
    icon: "graduation",
    title: "Student exchanges",
    text: "Semester and summer exchanges with partner institutions in India and overseas.",
  },
  {
    icon: "crown",
    title: "Leadership immersions",
    text: "Bespoke journeys for senior teams to learn from global peers and institutions.",
  },
];

const included = [
  "Academic design with partner institutions",
  "Industry visits and expert sessions",
  "Certification where applicable",
  "Travel, stay and on-ground support",
  "Pre-departure briefing and orientation",
  "Post-programme reflection and reporting",
];

export default function ImmersionProgramsPage() {
  return (
    <>
      <PageHero
        eyebrow="Immersion Programs"
        crumbs={[{ label: "Immersion Programs" }]}
        title="Learn by being there"
        text="Immersion programmes that take students, professionals and leaders into new markets, campuses and companies — with the travel expertise of our parent company behind every journey."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" arrow>
            Plan an Immersion
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading align="center" eyebrow="Formats" title="Ways to immerse" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {formats.map((f, i) => (
              <Reveal key={f.title} delay={i * 0.06} className="card-hover card p-7">
                <IconBadge name={f.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="card p-8 sm:p-10">
            <h2 className="text-[26px] font-bold">What&apos;s included</h2>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {included.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-orange" />
                  {item}
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
