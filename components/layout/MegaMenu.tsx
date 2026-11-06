"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { groupItems, type CatalogItem, type MegaMenu as MegaMenuData } from "@/lib/data/catalog";
import { icons } from "@/lib/icons";
import { cn } from "@/lib/utils";

function Thumb({ item }: { item: CatalogItem }) {
  if (item.image) {
    return (
      <span className="relative block h-[60px] w-20 shrink-0 overflow-hidden rounded-lg border border-border bg-section">
        <Image
          src={item.image}
          alt=""
          fill
          sizes="80px"
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </span>
    );
  }
  if (item.logo) {
    return (
      <span className="grid h-[60px] w-20 shrink-0 place-items-center rounded-lg border border-border bg-white p-2">
        <Image src={item.logo} alt="" width={64} height={44} className="object-contain" />
      </span>
    );
  }
  const Icon = icons[item.icon];
  return (
    <span className="grid h-[60px] w-20 shrink-0 place-items-center rounded-lg border border-border bg-white text-blue">
      <Icon className="size-6" strokeWidth={1.75} aria-hidden />
    </span>
  );
}

function ItemCard({ item }: { item: CatalogItem }) {
  return (
    <Link
      href={item.href}
      className="group flex items-start gap-3.5 rounded-xl p-3 transition-colors hover:bg-section"
    >
      <Thumb item={item} />
      <span className="min-w-0">
        <span className="block text-xs text-muted-foreground">{item.eyebrow}</span>
        <span className="mt-0.5 line-clamp-2 block text-[15px] leading-snug font-semibold text-navy transition-colors group-hover:text-blue">
          {item.title}
        </span>
        <span className="mt-1 line-clamp-2 block text-[13px] leading-snug text-muted-foreground">
          {item.text}
        </span>
      </span>
    </Link>
  );
}

/** Header mega menu: categories on the left, items of the hovered category on the right. */
export function MegaMenu({ menu }: { menu: MegaMenuData }) {
  const groups = groupItems(menu.items);
  const [active, setActive] = useState(0);
  const current = groups[Math.min(active, groups.length - 1)];
  if (!current) return null;

  return (
    <div className="grid h-[min(440px,calc(100dvh-7rem))] grid-cols-[280px_1fr] overflow-hidden rounded-2xl border border-border bg-white shadow-[0_24px_60px_-20px_rgb(8_29_72/0.35)]">
      {/* Left: categories — hover previews, click opens the filtered listing */}
      <div className="flex min-h-0 flex-col border-r border-border">
        <ul className="no-scrollbar flex flex-1 flex-col gap-1 overflow-y-auto overscroll-contain p-4">
          {groups.map((g, i) => {
            const cls = cn(
              "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-left text-[15px] transition-colors",
              i === active
                ? "bg-orange/10 font-semibold text-orange"
                : "text-navy/80 hover:bg-section hover:text-navy",
            );
            const props = {
              onMouseEnter: () => setActive(i),
              onFocus: () => setActive(i),
              "aria-current": i === active ? ("true" as const) : undefined,
              className: cls,
            };
            return (
              <li key={g.name}>
                {g.href ? (
                  <Link href={g.href} {...props}>
                    {g.name}
                    <ChevronRight className="size-4" />
                  </Link>
                ) : (
                  <button type="button" onClick={() => setActive(i)} {...props}>
                    {g.name}
                    <ChevronRight className="size-4" />
                  </button>
                )}
              </li>
            );
          })}
        </ul>
        <Link
          href={menu.viewAll.href}
          className="flex items-center justify-between border-t border-border px-7 py-4 text-sm font-semibold text-navy transition-colors hover:text-orange"
        >
          {menu.viewAll.label} <ChevronRight className="size-4" />
        </Link>
      </div>

      {/* Right: courses in the active domain — scrolls, scrollbar hidden */}
      <div className="flex min-h-0 flex-col">
        <div className="flex items-center justify-between gap-4 border-b border-border px-6 pt-6 pb-4">
          <p className="text-lg font-bold text-navy">{current.name}</p>
          <Link
            href={current.href ?? menu.viewAll.href}
            className="inline-flex items-center gap-1 text-sm font-semibold text-orange"
          >
            View all <ChevronRight className="size-4" />
          </Link>
        </div>
        <div
          key={current.name}
          className={cn(
            "no-scrollbar grid flex-1 content-start gap-2 overflow-y-auto overscroll-contain p-4",
            current.items.length > 4 ? "grid-cols-3" : "grid-cols-2",
          )}
        >
          {current.items.map((item) => (
            <ItemCard key={item.slug} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
