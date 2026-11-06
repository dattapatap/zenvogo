"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Sticky in-page tab bar for detail pages. Highlights the section in view and
 * reveals an "apply" button once the hero form has scrolled away.
 */
export function DetailNav({
  tabs,
  cta,
}: {
  tabs: { id: string; label: string }[];
  cta: { label: string; href: string };
}) {
  const [active, setActive] = useState(tabs[0]?.id);
  const [showCta, setShowCta] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const sections = tabs
      .map((t) => document.getElementById(t.id))
      .filter((el): el is HTMLElement => !!el);
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          const top = visible.sort(
            (a, b) => a.boundingClientRect.top - b.boundingClientRect.top,
          )[0];
          setActive(top.target.id);
        }
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    sections.forEach((s) => io.observe(s));

    const apply = document.getElementById("apply");
    const io2 = apply
      ? new IntersectionObserver(([e]) =>
          setShowCta(!e.isIntersecting && e.boundingClientRect.top < 0),
        )
      : null;
    if (apply) io2?.observe(apply);

    return () => {
      io.disconnect();
      io2?.disconnect();
    };
  }, [tabs]);

  // Keep the active tab visible in the horizontal scroller.
  useEffect(() => {
    const list = listRef.current;
    const el = list?.querySelector<HTMLElement>(`[data-tab="${active}"]`);
    if (list && el) {
      list.scrollTo({
        left: el.offsetLeft - list.clientWidth / 2 + el.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <div className="sticky top-[68px] z-40 border-b border-border bg-white/95 backdrop-blur sm:top-[76px] lg:top-20">
      <div className="mx-auto flex max-w-[1400px] items-center gap-4 px-5 sm:px-7 lg:px-10">
        <ul ref={listRef} className="no-scrollbar flex flex-1 gap-1 overflow-x-auto">
          {tabs.map((t) => (
            <li key={t.id} data-tab={t.id}>
              <a
                href={`#${t.id}`}
                className={cn(
                  "relative block px-3 py-4 text-sm font-semibold whitespace-nowrap transition-colors",
                  active === t.id ? "text-blue" : "text-navy/60 hover:text-navy",
                )}
              >
                {t.label}
                <span
                  className={cn(
                    "absolute inset-x-3 bottom-0 h-0.5 rounded bg-orange transition-transform duration-300",
                    active === t.id ? "scale-x-100" : "scale-x-0",
                  )}
                />
              </a>
            </li>
          ))}
        </ul>
        <Link
          href={cta.href}
          className={cn(
            "hidden h-10 shrink-0 items-center rounded-lg bg-orange px-5 text-sm font-semibold text-white transition-all duration-300 lg:inline-flex",
            showCta ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-2 opacity-0",
          )}
        >
          {cta.label}
        </Link>
      </div>
    </div>
  );
}

/** Fixed bottom call-to-action bar on small screens. */
export function MobileApplyBar({
  title,
  cta,
}: {
  title: string;
  cta: { label: string; href: string };
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex items-center gap-3 border-t border-border bg-white/95 px-4 py-3 shadow-[0_-10px_30px_-15px_rgb(8_29_72/0.3)] backdrop-blur lg:hidden">
      <p className="line-clamp-2 flex-1 text-sm leading-tight font-semibold text-navy">{title}</p>
      <Link
        href={cta.href}
        className="inline-flex h-11 shrink-0 items-center rounded-lg bg-orange px-5 text-sm font-semibold text-white"
      >
        {cta.label}
      </Link>
    </div>
  );
}
