"use client";

import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { useId, useState } from "react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

export function Accordion({ items, className }: { items: Item[]; className?: string }) {
  const [open, setOpen] = useState<number | null>(0);
  const id = useId();

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div
            key={item.q}
            className={cn("card", isOpen && "border-blue/30 shadow-[var(--shadow-card-hover)]")}
          >
            <h3 className="text-base sm:text-lg">
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={`${id}-${i}`}
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-semibold"
              >
                {item.q}
                <span
                  className={cn(
                    "grid size-8 shrink-0 place-items-center rounded-full bg-section-2 text-navy transition-all duration-300",
                    isOpen && "rotate-45 bg-orange text-white",
                  )}
                >
                  <Plus className="size-4" />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`${id}-${i}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-6 text-muted-foreground">{item.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
