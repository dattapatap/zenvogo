import type { Metadata } from "next";
import { academicNetwork } from "@/lib/data/content";
import type { IconName } from "@/lib/icons";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { Accent, SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";
import { PartnersHighlight } from "@/components/sections/partners/PartnersHighlight";
import { PartnerShowcase } from "@/components/sections/partners/PartnerShowcase";

export const metadata: Metadata = {
  title: "Partners",
  description:
    "The academic institutions, international universities and technology, financial and industry organisations that design and deliver Zenvogo programmes.",
};

/** Icons for `academicNetwork.benefits`, in the same order. */
const benefitIcons: IconName[] = ["target", "design", "users", "award"];

export default function PartnersPage() {
  return (
    <>
      <PageHero
        eyebrow="Partners"
        crumbs={[{ label: "Partners" }]}
        title="Knowledge powered by global academia and industry"
        text="Every Zenvogo programme is designed with leading institutions, international universities and industry organisations — so learners gain recognised credentials and real-world relevance."
        crystal={false}
        className="pb-36 sm:pb-40 lg:pb-48"
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact?type=institution" arrow>
            Become a Partner
          </Button>
          <Button href="#partner-showcase" variant="outline-light">
            Explore Partners
          </Button>
        </div>
      </PageHero>

      <PartnersHighlight />

      {/* Partner showcase with category badges */}
      <Section id="partner-showcase" tone="light" className="scroll-mt-20">
        <Container className="flex flex-col gap-10 lg:gap-12">
          <SectionHeading
            align="center"
            eyebrow="Partner showcase"
            title={
              <>
                Explore our <Accent>partner network.</Accent>
              </>
            }
            text="Filter by category to see the academic, international, technology, financial and industry partners behind our programmes."
          />

          <PartnerShowcase />

          <Reveal className="flex flex-col items-start gap-5 rounded-2xl border border-border bg-white p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8">
            <IconBadge name="handshake" tone="navy" />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">Want to see your institution here?</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Detailed profiles of our partner institutions and empanelled faculty are published
                with their permission. Join the network to co-create programmes with us.
              </p>
            </div>
            <Button href="/contact?type=institution" arrow className="shrink-0">
              Become a Partner
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* How the network works together */}
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
            text="Academia, institutions and industry work together on every programme — from the first brief to the final certificate."
          />
          <div className="grid gap-6 md:grid-cols-3">
            {academicNetwork.pillars.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.08} className="h-full">
                <div className="relative flex h-full card-hover flex-col overflow-hidden card p-8">
                  <span
                    aria-hidden
                    className="absolute top-6 right-7 font-display text-5xl font-extrabold text-navy/5"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <IconBadge name={p.icon} tone={i === 1 ? "orange" : "blue"} />
                  <h3 className="mt-6 text-[22px] font-semibold">{p.title}</h3>
                  <p className="mt-2 text-muted-foreground">{p.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Why institutions partner */}
      <Section tone="light">
        <Container className="grid items-center gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionHeading
              eyebrow="For institutions"
              title={
                <>
                  Why institutions <Accent>partner with Zenvogo</Accent>
                </>
              }
              text="We bring validated industry demand and a ready programme brief. You bring academic excellence and recognised certification. Together we create programmes that learners and employers value."
            />
            <Reveal>
              <Button href="/contact?type=institution" arrow>
                Become a Partner
              </Button>
            </Reveal>
          </div>

          <ul className="grid gap-4 sm:grid-cols-2 sm:gap-5">
            {academicNetwork.benefits.map((b, i) => (
              <Reveal as="li" key={b} delay={i * 0.07} className="h-full">
                <div className="flex h-full card-hover flex-col gap-4 card p-6">
                  <div className="flex items-center justify-between">
                    <IconBadge
                      name={benefitIcons[i] ?? "handshake"}
                      tone={i % 2 ? "orange" : "blue"}
                      className="size-12 [&_svg]:size-6"
                    />
                    <span className="font-display text-sm font-bold text-navy/25">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <p className="font-display text-[17px] leading-snug font-semibold text-navy">
                    {b}
                  </p>
                </div>
              </Reveal>
            ))}
          </ul>
        </Container>
      </Section>

      <CTASection
        primary={{ label: "Partner With Us", href: "/contact?type=institution" }}
        secondary={{ label: "Our Approach", href: "/approach" }}
      />
    </>
  );
}
