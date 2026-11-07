import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "outline" | "outline-light" | "link";

const styles: Record<Variant, string> = {
  primary:
    "bg-orange text-white shadow-[0_8px_24px_-8px_rgb(255_104_24/0.6)] hover:bg-[#ec5a0c] hover:-translate-y-0.5",
  secondary: "bg-navy text-white hover:bg-navy-2 hover:-translate-y-0.5",
  outline: "border border-blue/40 text-blue hover:border-blue hover:bg-blue/5",
  "outline-light": "border border-white/30 text-white hover:border-white hover:bg-white/10",
  link: "h-auto px-0 text-blue hover:text-navy sm:h-auto sm:px-0",
};

type Props = {
  href: string;
  variant?: Variant;
  arrow?: boolean;
  className?: string;
  children: React.ReactNode;
};

export function Button({ href, variant = "primary", arrow, className, children }: Props) {
  const internal = href.startsWith("/");
  const newTab = href.startsWith("http");
  const cls = cn(
    // 44px / 14px on phones (still a comfortable tap target), 48px / 15px from 640px up.
    "group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition-all duration-250 sm:h-12 sm:px-6 sm:text-[15px]",
    "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue",
    styles[variant],
    className,
  );
  const content = (
    <>
      {children}
      {arrow && (
        <ArrowRight className="size-4 transition-transform duration-250 group-hover:translate-x-1" />
      )}
    </>
  );

  if (internal) {
    return (
      <Link href={href} className={cls}>
        {content}
      </Link>
    );
  }
  return (
    <a
      href={href}
      className={cls}
      {...(newTab && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}
