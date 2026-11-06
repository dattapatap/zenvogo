import Image from "next/image";
import { cn } from "@/lib/utils";

/** Image shown in place of a 3D scene when WebGL is unavailable. */
export function StaticFallback({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <div className={cn("relative h-full w-full", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 1024px) 100vw, 50vw"
        className="object-contain"
      />
    </div>
  );
}
