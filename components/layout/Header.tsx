"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { mainNav, primaryCta, siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/Container";
import { megaMenus, type MegaMenuKey } from "@/lib/data/catalog";
import { Logo } from "./Logo";
import { MegaMenu } from "./MegaMenu";

export function Header() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdown, setDropdown] = useState<MegaMenuKey | null>(null);
  /** Which mega section is expanded in the mobile menu (all collapsed by default). */
  const [mobileSection, setMobileSection] = useState<MegaMenuKey | null>(null);

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 8));

  // Close menus whenever the route changes.
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setMobileOpen(false);
    setDropdown(null);
    setMobileSection(null);
  }

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const activeMenu = dropdown ? megaMenus[dropdown] : null;

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-shadow duration-300",
        scrolled ? "border-border shadow-[0_6px_24px_-12px_rgb(8_29_72/0.18)]" : "border-[#e8edf4]",
      )}
    >
      {/* Frosted background on its own layer: a backdrop-filter on the <header> itself would
          make it the containing block for the fixed mobile menu, collapsing the menu to 0px. */}
      <div aria-hidden className="absolute inset-0 -z-10 bg-white/95 backdrop-blur" />
      <Container className="flex h-[68px] items-center justify-between gap-6 sm:h-[76px] lg:h-20">
        <Link href="/" aria-label={`${siteConfig.name} home`} className="shrink-0">
          <Logo priority />
        </Link>

        <div className="flex items-center gap-4">
          <nav
            aria-label="Main"
            className="hidden xl:block"
            onMouseLeave={() => setDropdown(null)}
            onKeyDown={(e) => e.key === "Escape" && setDropdown(null)}
          >
            <ul className="flex items-center gap-1">
              {mainNav.map((item) => (
                <li key={item.href} onMouseEnter={() => setDropdown(item.mega ?? null)}>
                  <Link
                    href={item.href}
                    aria-haspopup={item.mega ? "true" : undefined}
                    aria-expanded={item.mega ? dropdown === item.mega : undefined}
                    onFocus={() => setDropdown(item.mega ?? null)}
                    className={cn(
                      "relative flex items-center gap-1 px-3 py-7 text-[15px] font-semibold text-navy/80 transition-colors hover:text-blue",
                      (isActive(item.href) || (item.mega && dropdown === item.mega)) && "text-blue",
                    )}
                  >
                    {item.label}
                    {item.mega && (
                      <ChevronDown
                        className={cn(
                          "size-3.5 transition-transform",
                          dropdown === item.mega && "rotate-180",
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
                </li>
              ))}
            </ul>

            {/* Full-width mega menu, positioned against the sticky header */}
            <AnimatePresence>
              {activeMenu && (
                <motion.div
                  key={dropdown}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute inset-x-0 top-full -mt-3 pt-4"
                >
                  <Container>
                    <MegaMenu menu={activeMenu} />
                  </Container>
                </motion.div>
              )}
            </AnimatePresence>
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
              onClick={() => {
                setMobileOpen((o) => !o);
                setMobileSection(null);
              }}
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
              className="fixed top-[68px] right-0 bottom-0 z-50 flex w-full max-w-sm flex-col overflow-y-auto border-l border-border bg-white px-5 pt-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl sm:top-[76px] xl:hidden"
            >
              <ul className="flex flex-col">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => {
                  const mega = "mega" in item ? item.mega : undefined;
                  const expanded = !!mega && mobileSection === mega;
                  const current = item.href === "/" ? pathname === "/" : isActive(item.href);
                  return (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + i * 0.04 }}
                      className="border-b border-border/70 last:border-0"
                    >
                      {mega ? (
                        <>
                          {/* Mega items toggle their sub-list instead of navigating. */}
                          <button
                            type="button"
                            aria-expanded={expanded}
                            aria-controls={`mobile-sub-${mega}`}
                            onClick={() => setMobileSection(expanded ? null : mega)}
                            className={cn(
                              "flex w-full items-center justify-between py-3.5 text-left text-base font-semibold",
                              current || expanded ? "text-blue" : "text-navy",
                            )}
                          >
                            {item.label}
                            <ChevronDown
                              aria-hidden
                              className={cn(
                                "size-5 text-muted-foreground transition-transform duration-300",
                                expanded && "rotate-180 text-blue",
                              )}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {expanded && (
                              <motion.div
                                id={`mobile-sub-${mega}`}
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                                className="overflow-hidden"
                              >
                                <ul className="mb-4 flex flex-col border-l-2 border-orange/50 pl-4">
                                  {megaMenus[mega].items.map((c) => (
                                    <li key={c.href}>
                                      <Link
                                        href={c.href}
                                        className={cn(
                                          "block py-2 text-sm",
                                          pathname === c.href
                                            ? "font-semibold text-blue"
                                            : "text-muted-foreground",
                                        )}
                                      >
                                        {c.title}
                                      </Link>
                                    </li>
                                  ))}
                                  <li>
                                    <Link
                                      href={megaMenus[mega].viewAll.href}
                                      className="block py-2 text-sm font-semibold text-blue"
                                    >
                                      {megaMenus[mega].viewAll.label}
                                    </Link>
                                  </li>
                                </ul>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href}
                          className={cn(
                            "block py-3.5 text-base font-semibold",
                            current ? "text-blue" : "text-navy",
                          )}
                        >
                          {item.label}
                        </Link>
                      )}
                    </motion.li>
                  );
                })}
              </ul>
              <Link
                href={primaryCta.href}
                className="mt-6 flex h-12 shrink-0 items-center justify-center rounded-lg bg-orange text-[15px] font-semibold text-white"
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
