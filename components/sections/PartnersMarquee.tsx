import { featuredPartners } from "@/lib/data/partners";
import { Container } from "@/components/ui/Container";
import { LogoMarquee } from "@/components/ui/LogoMarquee";
import { cn } from "@/lib/utils";

/** Homepage strip of featured partner logos, contained to the page width. */
export function PartnersMarquee({
  title = "Trusted by leading institutions & industry partners",
  className,
}: {
  title?: string;
  /** Overrides the section's background / vertical padding. */
  className?: string;
}) {
  return (
    <section
      aria-labelledby="partners-heading"
      className={cn("bg-section pt-14 sm:pt-16 lg:pt-20", className)}
    >
      <Container className="flex flex-col items-center gap-6 sm:gap-8">
        <h2
          id="partners-heading"
          className="flex items-center gap-4 text-center font-sans text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:text-[13px]"
        >
          <span aria-hidden className="hidden h-px w-10 bg-border sm:block" />
          {title}
          <span aria-hidden className="hidden h-px w-10 bg-border sm:block" />
        </h2>

        <div className="w-full overflow-hidden rounded-2xl border border-border/70 bg-white py-5 shadow-[var(--shadow-card)] sm:py-6">
          <LogoMarquee items={featuredPartners} />
        </div>
      </Container>
    </section>
  );
}
