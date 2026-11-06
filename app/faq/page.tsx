import type { Metadata } from "next";
import { faqs } from "@/lib/data/content";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Answers to common questions about Zenvogo's programmes, partnerships and AI Ventures.",
};

export default function FaqPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
      <PageHero
        eyebrow="FAQ"
        crumbs={[{ label: "FAQ" }]}
        title="Frequently asked questions"
        text="How we work, who we work with and how to get started."
      />
      <Section tone="light">
        <Container className="max-w-4xl">
          <Reveal>
            <Accordion items={faqs} />
          </Reveal>
        </Container>
      </Section>
      <CTASection />
    </>
  );
}
