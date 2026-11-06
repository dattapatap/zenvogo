"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { Logo } from "./Logo";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setDropdown(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b bg-white/95 backdrop-blur transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_6px_24px_-12px_rgb(8_29_72/0.18)]" : "border-[#e8edf4]",
      )}
    >
      <Container className="flex h-[68px] items-center justify-between gap-6 sm:h-[76px] lg:h-20">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0">
          <Logo priority />
        </Link>

        <div className="flex items-center gap-4">
          <nav aria-label="Main" className="hidden xl:block" onMouseLeave={() => setDropdown(null)}>
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li
                  key={item.href}
                  className="relative"
                  onMouseEnter={() => setDropdown(item.children ? item.href : null)}
                >
                  <Link
                    href={item.href}
                    aria-haspopup={item.children ? "true" : undefined}
                    aria-expanded={item.children ? dropdown === item.href : undefined}
                    onFocus={() => setDropdown(item.children ? item.href : null)}
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-7 text-sm font-semibold text-navy/80 transition-colors hover:text-blue",
                      isActive(item.href) && "text-blue",
                    )}
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          dropdown === item.href && "rotate-180",
                        )}
                      />
                    )}
                    {isActive(item.href) && (
                      <motion.span
                        layoutId="nav-underline"
                        className="absolute inset-x-3 bottom-[18px] h-0.5 rounded bg-orange"
                      />
                    )}
                  </Link>

                  <AnimatePresence>
                    {item.children && dropdown === item.href && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 w-[540px] -translate-x-1/2"
                      >
                        <span className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-t border-l border-border bg-white" />
                        <div className="grid grid-cols-2 gap-1 rounded-2xl border border-border bg-white/95 p-3 shadow-[0_24px_60px_-20px_rgb(8_29_72/0.35)] backdrop-blur-xl">
                          {item.children.map((c) => (
                            <Link
                              key={c.href}
                              href={c.href}
                              className="rounded-lg p-3 transition-colors hover:bg-section"
                            >
                              <span className="block text-sm font-semibold text-navy">
                                {c.label}
                              </span>
                              <span className="mt-0.5 block text-[13px] leading-snug text-muted-foreground">
                                {c.text}
                              </span>
                            </Link>
                          ))}
                          <Link
                            href={item.href}
                            className="col-span-2 mt-1 flex items-center justify-between rounded-lg bg-section px-3 py-2.5 text-sm font-semibold text-blue"
                          >
                            View all solutions <ArrowRight className="size-4" />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              href={primaryCta.href}
              className="hidden h-11 items-center gap-2 rounded-lg bg-orange px-5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgb(255_104_24/0.6)] transition-all hover:-translate-y-0.5 hover:bg-[#ec5a0c] sm:inline-flex"
            >
              {primaryCta.label}
            </Link>
            <button
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              className="grid size-11 place-items-center rounded-lg border border-border text-navy xl:hidden"
            >
              {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </div>
      </Container>

      {/* Mobile slide-out menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setMobileOpen(false)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 top-[68px] z-40 bg-navy/50 backdrop-blur-sm sm:top-[76px] xl:hidden"
            />
            <motion.nav
              aria-label="Mobile"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-[68px] right-0 bottom-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-border bg-white px-6 py-6 shadow-2xl sm:top-[76px] xl:hidden"
            >
              <ul className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
                  <motion.li
                    key={item.href}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.08 + i * 0.04 }}
                    className="border-b border-border/70 last:border-0"
                  >
                    <Link
                      href={item.href}
                      className={cn(
                        "flex items-center justify-between py-4 text-lg font-semibold",
                        pathname === item.href ? "text-blue" : "text-navy",
                      )}
                    >
                      {item.label}
                      <ArrowRight className="size-4 text-muted-foreground" />
                    </Link>
                    {"children" in item && item.children && (
                      <ul className="mb-4 flex flex-col gap-1 border-l-2 border-orange/50 pl-4">
                        {item.children.map((c) => (
                          <li key={c.href}>
                            <Link
                              href={c.href}
                              className="block py-1.5 text-sm text-muted-foreground"
                            >
                              {c.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </motion.li>
                ))}
              </ul>
              <Link
                href={primaryCta.href}
                className="mt-auto flex h-12 shrink-0 items-center justify-center rounded-lg bg-orange font-semibold text-white"
              >
                {primaryCta.label}
              </Link>
              <p className="mt-4 text-center text-xs text-muted-foreground">{siteConfig.tagline}</p>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
