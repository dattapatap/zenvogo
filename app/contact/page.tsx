import type { Metadata } from "next";
import { Suspense } from "react";
import { Building2, Clock, GraduationCap, Mail, MapPin, Phone, Rocket } from "lucide-react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PageHero } from "@/components/sections/PageHero";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { ContactForm, ContactFormFallback } from "./ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Discuss your learning needs, partner with us as an institution, or apply to Zenvogo AI Ventures.",
};

const reasons = [
  {
    icon: Building2,
    title: "Industries",
    text: "Design a programme around your sector's challenges.",
  },
  {
    icon: GraduationCap,
    title: "Institutions",
    text: "Co-create and deliver industry-led programmes.",
  },
  { icon: Rocket, title: "AI startups", text: "Incubation, mentorship and funding support." },
];

export default function ContactPage() {
  const { contact } = siteConfig;
  return (
    <>
      <PageHero
        eyebrow="Contact Us"
        crumbs={[{ label: "Contact" }]}
        title="Let's start a conversation"
        text="Whether you represent an industry, an institution or an emerging venture, we'd love to hear what you're working on."
        crystal={false}
      />

      <Section tone="light">
        <Container className="grid gap-10 lg:grid-cols-[1fr_1.5fr]">
          <div className="flex flex-col gap-6">
            <Reveal className="flex flex-col gap-4">
              {reasons.map(({ icon: I, title, text }) => (
                <div key={title} className="flex items-start gap-4 card p-5">
                  <span className="grid size-11 shrink-0 place-items-center rounded-lg bg-blue/10 text-blue">
                    <I className="size-5" />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">{title}</h2>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="dark-section rounded-2xl bg-navy p-7 text-white/80">
              <h2 className="text-lg font-semibold">Reach us directly</h2>
              <ul className="mt-5 flex flex-col gap-4 text-sm">
                <li>
                  <a
                    href={`mailto:${contact.email}`}
                    className="flex items-center gap-3 hover:text-white"
                  >
                    <Mail className="size-4 text-orange" /> {contact.email}
                  </a>
                </li>
                <li>
                  <a href={contact.phoneHref} className="flex items-center gap-3 hover:text-white">
                    <Phone className="size-4 text-orange" /> {contact.phone}
                  </a>
                </li>
                <li>
                  <a
                    href={contact.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start gap-3 leading-relaxed hover:text-white"
                  >
                    <MapPin className="mt-1 size-4 shrink-0 text-orange" />
                    <address className="not-italic">{contact.address}</address>
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Clock className="size-4 text-orange" /> {contact.hours}
                </li>
              </ul>
              <div className="mt-6 border-t border-white/10 pt-5">
                <p className="mb-3 text-xs font-semibold tracking-[0.14em] text-gold uppercase">
                  Follow us
                </p>
                <SocialLinks />
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.05}>
            <Suspense fallback={<ContactFormFallback />}>
              <ContactForm />
            </Suspense>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
