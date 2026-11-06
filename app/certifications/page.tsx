import type { Metadata } from "next";
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
  title: "Certifications",
  description:
    "Recognised certifications delivered with leading academic institutions, built around real industry skills.",
};

const certs: { icon: IconName; title: string; text: string }[] = [
  {
    icon: "award",
    title: "Institution-certified programmes",
    text: "Credentials issued by our partner universities for Zenvogo-designed programmes.",
  },
  {
    icon: "crown",
    title: "Executive certificates",
    text: "Short-format certificates in leadership, strategy and management for senior professionals.",
  },
  {
    icon: "factory",
    title: "Industry skill certifications",
    text: "Sector-specific certifications shaped by the challenges practitioners face every day.",
  },
  {
    icon: "brain",
    title: "AI & digital certifications",
    text: "Practical credentials in AI, data and digital transformation for working professionals.",
  },
];

const steps = [
  { title: "Choose a programme", text: "Pick the certification that fits your role and goals." },
  { title: "Learn and apply", text: "Work through real cases, projects and expert sessions." },
  { title: "Get assessed", text: "Assessments designed to reflect real work, not rote recall." },
  { title: "Earn your credential", text: "Receive a certificate from the delivering institution." },
];

export default function CertificationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Certifications"
        crumbs={[{ label: "Certifications" }]}
        title="Credentials that carry weight"
        text="Certifications delivered with leading academic institutions — designed around the skills industry actually needs."
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/contact" arrow>
            Enquire About Certifications
          </Button>
        </div>
      </PageHero>

      <Section>
        <Container className="flex flex-col gap-12">
          <SectionHeading align="center" eyebrow="Certifications" title="What we offer" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {certs.map((c, i) => (
              <Reveal key={c.title} delay={i * 0.06} className="card-hover card p-7">
                <IconBadge name={c.icon} tone={i % 2 ? "orange" : "blue"} />
                <h3 className="mt-5 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.text}</p>
              </Reveal>
            ))}
          </div>

          <SectionHeading align="center" eyebrow="How it works" title="Your path to certification" />
          <ol className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <Reveal as="li" key={s.title} delay={i * 0.06} className="card p-7">
                <span className="text-sm font-bold text-orange">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      <CTASection />
    </>
  );
}
