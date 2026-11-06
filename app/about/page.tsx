import type { Metadata } from "next";
import { Eye, Flag } from "lucide-react";
import { siteConfig } from "@/config/site";
import { teamBackgrounds, values } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "About Us",
  description: `The vision, mission and team behind ${siteConfig.name}, a part of ${siteConfig.parent}.`,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="About Zenvogo"
        crumbs={[{ label: "About Us" }]}
        title="Bridging industry, academia and innovation"
        text={`${siteConfig.name} is an Indian company and a part of ${siteConfig.parent}. We exist to make professional learning genuinely useful — by designing it around the challenges industries actually face.`}
      />

      <Section>
        <Container className="grid gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Our story"
            title={
              <>
                Built by people who know <Accent>learning from the inside.</Accent>
              </>
            }
          />
          <Reveal className="flex flex-col gap-5 text-lg text-muted-foreground">
            <p>
              Zenvogo was started by a team of {siteConfig.founders}, joined by professionals who
              have helped build some of India&apos;s best-known learning companies. We&apos;ve seen
              first-hand how learning is sold — and where it falls short.
            </p>
            <p>
              Most platforms resell what institutions already offer. Very few design programmes
              exclusively around what an industry needs. So we built a company that does exactly
              that: research the challenge, design the curriculum with expert faculty, and deliver
              it through leading institutions.
            </p>
            <p>
              Alongside learning, we help AI startups incubate, grow and raise funding — because the
              future of work will be shaped by both.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid gap-6 md:grid-cols-2">
          <Reveal className="card p-8 sm:p-10">
            <span className="grid size-12 place-items-center rounded-xl bg-blue/10 text-blue">
              <Eye className="size-6" />
            </span>
            <h2 className="mt-5 text-[26px] font-bold">Our vision</h2>
            <p className="mt-3 text-muted-foreground">
              A world where every professional programme is designed around real industry needs —
              connecting people, institutions and ideas across borders.
            </p>
          </Reveal>
          <Reveal
            delay={0.08}
            className="dark-section rounded-2xl bg-navy p-8 text-white/75 sm:p-10"
          >
            <span className="grid size-12 place-items-center rounded-xl bg-orange/15 text-orange">
              <Flag className="size-6" />
            </span>
            <h2 className="mt-5 text-[26px] font-bold">Our mission</h2>
            <p className="mt-3">
              To bring industries, academic experts and leading institutions together to create
              learning that solves real business challenges — and to back the AI ventures building
              what comes next.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading align="center" eyebrow="What drives us" title="Our values" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.06} className="card-hover card p-7">
                <IconBadge name={v.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="mt-5 text-lg font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <Container className="relative grid items-center gap-10 lg:grid-cols-2">
          <SectionHeading
            tone="dark"
            eyebrow="Leadership"
            title="Experience from across the learning industry"
            text="Our founding and leadership team brings together management-school alumni and professionals from leading EdTech companies."
          />
          <Reveal delay={0.1} className="grid grid-cols-2 gap-4">
            {teamBackgrounds.map((t) => (
              <div
                key={t}
                className="grid h-24 place-items-center panel p-4 text-center font-display text-lg font-bold text-white"
              >
                {t}
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="text-center">
          <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4">
            <p className="text-sm font-semibold tracking-[0.14em] text-blue uppercase">
              A part of {siteConfig.parent}
            </p>
            <p className="text-muted-foreground">
              Our parent company&apos;s travel expertise powers the international exchanges,
              immersions and study tours in our Global Education &amp; Exchange programmes.
            </p>
            <Button href="/solutions/global-education-exchange" variant="outline" arrow>
              Global Education &amp; Exchange
            </Button>
          </Reveal>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
