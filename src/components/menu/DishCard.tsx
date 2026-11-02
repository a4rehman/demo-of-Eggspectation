"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import type { MenuItem } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { DIETARY_META } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";

export function DietaryBadges({
  dietary,
  className,
}: {
  dietary: string[];
  className?: string;
}) {
  if (dietary.length === 0) return null;
  return (
    <div className={cn("flex flex-wrap gap-1.5", className)}>
      {dietary.map((tag) => {
        const meta = DIETARY_META[tag];
        if (!meta) return null;
        return (
          <span
            key={tag}
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]",
              meta.className
            )}
          >
            {meta.label}
          </span>
        );
      })}
    </div>
  );
}

export function DishCard({
  item,
  onOpen,
  className,
}: {
  item: MenuItem;
  onOpen: (item: MenuItem) => void;
  className?: string;
}) {
  const { addItem, hydrated } = useCart();

  const quickAdd = () => {
    if (item.customizations?.some((c) => c.required)) {
      onOpen(item);
      return;
    }
    addItem({ id: item.id, name: item.name, image: item.image, basePrice: item.price, qty: 1 });
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[1.75rem] bg-cream-50 shadow-soft transition-shadow duration-500 hover:shadow-card",
        className
      )}
    >
      <button
        type="button"
        onClick={() => onOpen(item)}
        className="relative block aspect-[4/3] w-full overflow-hidden"
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </button>
      {item.popular && (
        <span className="absolute left-4 top-4 rounded-full bg-cream-50/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal shadow-soft">
          Guest favourite
        </span>
      )}
      {item.seasonal && (
        <span className="absolute left-4 top-4 rounded-full bg-charcoal/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream-50">
          Seasonal
        </span>
      )}

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-semibold tracking-tight leading-snug">
            {item.name}
          </h3>
          <p className="shrink-0 text-[15px] font-bold text-brand-600">
            {formatCurrency(item.price)}
          </p>
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-charcoal-50/85">
          {item.description}
        </p>
        <div className="mt-4 flex items-center justify-between gap-3">
          <DietaryBadges dietary={item.dietary} />
          <div className="ml-auto flex items-center gap-2">
            <span className="text-xs text-charcoal-50/75">{item.calories} cal</span>
            <button
              type="button"
              onClick={quickAdd}
              disabled={!hydrated}
              aria-label={
                item.customizations?.some((c) => c.required)
                  ? `Customise and add ${item.name}`
                  : `Add ${item.name} to bag`
              }
              className="flex size-9 items-center justify-center rounded-full bg-brand-500 text-cream-50 transition-all duration-300 hover:bg-brand-600 active:scale-90"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
