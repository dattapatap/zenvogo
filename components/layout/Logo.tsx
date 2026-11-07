import Image from "next/image";
import logo from "@/public/images/brand/zenvogo-logo.png";
import logoLight from "@/public/images/brand/zenvogo-logo-light.png";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Zenvogo logo. Use `variant="light"` on navy backgrounds. */
export function Logo({
  variant = "default",
  className,
  priority,
}: {
  variant?: "default" | "light";
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={variant === "light" ? logoLight : logo}
      alt={siteConfig.name}
      preload={priority}
      sizes="180px"
      className={cn("h-auto w-[150px] lg:w-[168px]", className)}
    />
  );
}
