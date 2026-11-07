import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { WaveField } from "@/components/three";

export default function NotFound() {
  return (
    <section className="dark-section relative isolate flex min-h-[75svh] items-center overflow-hidden bg-navy text-white/75">
      <div className="absolute inset-0 -z-10 opacity-80">
        <WaveField crystal={false} />
      </div>
      <Container className="flex flex-col items-center gap-5 py-16 text-center sm:gap-6 sm:py-20">
        <p className="font-display text-7xl font-extrabold text-orange sm:text-9xl">404</p>
        <h1 className="text-[28px] font-bold sm:text-[34px]">This page doesn&apos;t exist</h1>
        <p className="max-w-md">
          The page you&apos;re looking for may have moved. Let&apos;s get you back on track.
        </p>
        <div className="btn-group w-full justify-center sm:w-auto">
          <Button href="/" arrow>
            Back to Home
          </Button>
          <Button href="/contact" variant="outline-light">
            Contact Us
          </Button>
        </div>
      </Container>
    </section>
  );
}
