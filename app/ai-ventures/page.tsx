import type { Metadata } from "next";
import { Sparkles } from "lucide-react";
import { aiVentures } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { AIVentureScene } from "@/components/three";

export const metadata: Metadata = {
  title: "AI Ventures",
  description:
    "Zenvogo AI Ventures helps AI startups incubate, find mentors, access industry partners and prepare for funding.",
};

export default function AiVenturesPage() {
  return (
    <>
      <PageHero
        eyebrow="Zenvogo AI Ventures"
        crumbs={[{ label: "AI Ventures" }]}
        title={
          <>
            Turning AI ideas into <Accent>real-world impact.</Accent>
          </>
        }
        text="We incubate, nurture and help fund the next generation of AI startups — connecting founders with mentors, industry partners and investors."
        scene={<AIVentureScene />}
      >
        <div className="btn-group">
          <Button href="/contact?type=startup" arrow>
            Apply as a Startup
          </Button>
          <Button href="#offerings" variant="outline-light">
            What We Offer
          </Button>
        </div>
      </PageHero>

      <Section id="offerings">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            align="center"
            eyebrow="What we offer"
            title="Everything an early AI startup needs to grow"
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {aiVentures.offerings.map((o, i) => (
              <Reveal key={o.title} delay={i * 0.06} className="card-hover card p-6 sm:p-7">
                <IconBadge name={o.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="mt-5 text-lg font-semibold sm:text-xl">{o.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{o.text}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="overflow-hidden">
        <div aria-hidden className="absolute inset-0 dot-grid-light" />
        <Container className="relative flex flex-col gap-12">
          <SectionHeading
            tone="dark"
            align="center"
            eyebrow="The journey"
            title="From application to investment-ready"
          />
          <ol className="relative grid gap-4 md:grid-cols-5">
            <div
              aria-hidden
              className="absolute top-7 right-[10%] left-[10%] hidden h-0.5 bg-gradient-to-r from-blue via-orange to-gold md:block"
            />
            {aiVentures.stages.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.08} className="relative text-center">
                <span className="relative mx-auto grid size-14 place-items-center rounded-full border-2 border-orange bg-navy font-display text-lg font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/70">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <Section tone="light">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <SectionHeading
            eyebrow="Focus areas"
            title="Where we're looking"
            text="We're especially interested in founders applying AI to real industry problems — the same industries our learning programmes serve."
          />
          <Reveal delay={0.1} className="grid gap-4 sm:grid-cols-2">
            {aiVentures.focus.map((f) => (
              <div key={f} className="flex items-center gap-3 card p-5">
                <Sparkles className="size-5 shrink-0 text-orange" />
                <span className="font-semibold text-navy">{f}</span>
              </div>
            ))}
          </Reveal>
        </Container>
      </Section>

      <CTASection
        title={
          <>
            Building something in AI? <Accent>Let&apos;s talk.</Accent>
          </>
        }
        text="Tell us about your idea, your team and where you need help. We'll get back to you to discuss how Zenvogo AI Ventures can support you."
        primary={{ label: "Apply as a Startup", href: "/contact?type=startup" }}
        secondary={{ label: "Read Blogs", href: "/blogs" }}
      />
    </>
  );
}
