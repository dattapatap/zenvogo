import type { Metadata } from "next";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { IconBadge } from "@/components/ui/IconBadge";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/sections/PageHero";
import type { IconName } from "@/lib/icons";

export const metadata: Metadata = {
  title: "Careers",
  description: `Join ${siteConfig.name} and help build industry-led learning and AI ventures.`,
};

const perks: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "target",
    title: "Meaningful work",
    text: "Build learning that solves real industry problems.",
  },
  {
    icon: "network",
    title: "Industry & academia",
    text: "Work with leaders, professors and institutions.",
  },
  {
    icon: "rocket",
    title: "Startup energy",
    text: "Help shape a growing company and its AI ventures.",
  },
  { icon: "growth", title: "Room to grow", text: "Real ownership and the chance to grow with us." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="Careers"
        crumbs={[{ label: "Careers" }]}
        title="Help build the future of learning"
        text={`${siteConfig.name} brings together people from management schools and leading learning companies. If you care about learning that matters, we'd love to hear from you.`}
      />

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading align="center" eyebrow="Why join us" title="Life at Zenvogo" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {perks.map((p, i) => (
              <Reveal key={p.title} delay={i * 0.06} className="card-hover card p-7">
                <IconBadge name={p.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="mt-5 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{p.text}</p>
              </Reveal>
            ))}
          </div>

          <Reveal className="dark-section rounded-2xl bg-navy p-10 text-center text-white/75 sm:p-14">
            <h2 className="text-[29px] font-bold">No open roles right now</h2>
            <p className="mx-auto mt-3 max-w-xl">
              We&apos;re not actively hiring at the moment, but we&apos;re always keen to meet great
              people in programme design, partnerships and growth. Send us your CV.
            </p>
            <div className="mt-7 flex flex-wrap justify-center gap-3">
              <Button href={`mailto:${siteConfig.contact.email}?subject=CV%20submission`} arrow>
                Send Your CV
              </Button>
              <Button href="/contact" variant="outline-light">
                Talk to Us
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
