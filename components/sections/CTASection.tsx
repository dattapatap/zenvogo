import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Accent } from "@/components/ui/SectionHeading";
import { Orb } from "@/components/three";

type Props = {
  title?: React.ReactNode;
  text?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
};

export function CTASection({
  title = (
    <>
      Let&apos;s build the future of learning <Accent>together.</Accent>
    </>
  ),
  text = "Whether you represent an industry, an institution or an emerging venture, let's explore what we can build together.",
  primary = { label: "Start a Conversation", href: "/contact" },
  secondary = { label: "Explore Programs", href: "/solutions" },
}: Props) {
  return (
    <section className="bg-background py-14 sm:py-[72px] lg:py-[100px]">
      <Container>
        <Reveal className="dark-section relative isolate grid overflow-hidden rounded-2xl bg-navy lg:grid-cols-[1.2fr_1fr]">
          <div aria-hidden className="absolute inset-0 -z-10 dot-grid-light" />
          <div
            aria-hidden
            className="absolute -bottom-24 -left-24 -z-10 size-80 rounded-full bg-blue/30 blur-[100px]"
          />
          <div className="flex flex-col justify-center gap-6 p-8 sm:p-12 lg:p-16">
            <h2 className="text-[29px] font-bold text-balance sm:text-[38px]">{title}</h2>
            <p className="max-w-lg text-white/70 sm:text-lg">{text}</p>
            <div className="flex flex-wrap gap-3">
              <Button href={primary.href} arrow>
                {primary.label}
              </Button>
              <Button href={secondary.href} variant="outline-light">
                {secondary.label}
              </Button>
            </div>
          </div>
          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[24rem]">
            <Orb />
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
