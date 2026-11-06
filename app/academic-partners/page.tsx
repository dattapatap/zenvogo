import type { Metadata } from "next";
import { Check } from "lucide-react";
import { academicNetwork } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { GlobalEducationScene } from "@/components/three";

export const metadata: Metadata = {
  title: "Academic Partners",
  description:
    "Empanelled faculty, leading institutions and industry practitioners who design and deliver Zenvogo programmes.",
};

export default function AcademicPartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Academic Partners"
        crumbs={[{ label: "Academic Partners" }]}
        title="Knowledge powered by global academia"
        scene={<GlobalEducationScene />}
        text="Every Zenvogo programme is designed with empanelled professors from leading universities in India and the United Kingdom, and delivered with institutions that certify the learning."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?type=institution" arrow>
            Become a Partner
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading
            align="center"
            eyebrow="Our network"
            title={
              <>
                Three groups, <Accent>one programme.</Accent>
              </>
            }
          />
          <div className="grid gap-6 md:grid-cols-3">
            {academicNetwork.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="card-hover card p-8">
                <IconBadge name={p.icon} tone={i === 1 ? "orange" : "blue"} />
                <h2 className="mt-5 text-[22px] font-semibold">{p.title}</h2>
                <p className="mt-2 text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="For institutions"
            title="Why institutions partner with Zenvogo"
            text="We bring validated industry demand and a ready programme brief. You bring academic excellence and recognised certification. Together we create programmes that learners and employers value."
          />
          <Reveal delay={0.1} className="card p-8">
            <ul className="flex flex-col gap-4">
              {academicNetwork.benefits.map((b) => (
                <li key={b} className="flex gap-3">
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-orange/10">
                    <Check className="size-3.5 text-orange" />
                  </span>
                  <span className="text-navy">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container>
          <Reveal className="rounded-2xl border border-dashed border-border bg-section p-10 text-center">
            <h2 className="text-[26px] font-bold">Faculty &amp; institution profiles</h2>
            <p className="mx-auto mt-3 max-w-2xl text-muted-foreground">
              Profiles of our empanelled professors and partner institutions will be published here
              with their permission.
            </p>
            <div className="mt-6 flex justify-center">
              <Button href="/contact?type=institution" variant="outline" arrow>
                Join Our Faculty Network
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <CTASection
        primary={{ label: "Partner With Us", href: "/contact?type=institution" }}
        secondary={{ label: "Our Approach", href: "/approach" }}
      />
    </>
  );
}
