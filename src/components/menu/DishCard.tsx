"use client";

import Image from "next/image";
import { Plus, Sparkles, Star, Eye } from "lucide-react";
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
              "rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-[0.1em]",
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

  const quickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (item.customizations?.some((c) => c.required)) {
      onOpen(item);
      return;
    }
    addItem({ id: item.id, name: item.name, image: item.image, basePrice: item.price, qty: 1 });
  };

  return (
    <article
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[2rem] bg-cream-50 border border-cream-200/80 shadow-soft transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 hover:border-gold-400/40",
        className
      )}
    >
      <div
        role="button"
        tabIndex={0}
        onClick={() => onOpen(item)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onOpen(item);
          }
        }}
        className="relative block aspect-[4/3] w-full overflow-hidden cursor-pointer"
        aria-label={`View details for ${item.name}`}
      >
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex items-center justify-center">
          <span className="flex items-center gap-1.5 rounded-full bg-cream-50/95 px-4 py-2 text-xs font-bold text-charcoal shadow-soft backdrop-blur">
            <Eye className="size-3.5 text-brand-600" />
            Quick View
          </span>
        </div>
      </div>

      {item.popular && (
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1 rounded-full border border-gold-400/40 bg-cream-50/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-charcoal shadow-soft backdrop-blur">
          <Star className="size-3 fill-gold-500 text-gold-500" aria-hidden />
          Guest Favourite
        </span>
      )}
      {item.seasonal && (
        <span className="absolute left-3.5 top-3.5 inline-flex items-center gap-1 rounded-full border border-gold-400/30 bg-charcoal/90 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-cream-50 shadow-soft backdrop-blur">
          <Sparkles className="size-3 text-gold-400" aria-hidden />
          Seasonal Special
        </span>
      )}

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-start justify-between gap-3">
          <h3
            onClick={() => onOpen(item)}
            className="cursor-pointer font-display text-lg font-semibold tracking-tight leading-snug transition-colors group-hover:text-brand-600"
          >
            {item.name}
          </h3>
          <p className="shrink-0 rounded-full bg-cream-100 px-2.5 py-1 text-sm font-bold text-brand-600 border border-cream-200">
            {formatCurrency(item.price)}
          </p>
        </div>
        <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-charcoal-50/80">
          {item.description}
        </p>

        <div className="mt-5 flex items-center justify-between gap-3 pt-3 border-t border-cream-200/60">
          <DietaryBadges dietary={item.dietary} />
          <div className="ml-auto flex items-center gap-2.5">
            <span className="text-xs font-medium text-charcoal-50/70">{item.calories} cal</span>
            <button
              type="button"
              onClick={quickAdd}
              disabled={!hydrated}
              aria-label={
                item.customizations?.some((c) => c.required)
                  ? `Customise and add ${item.name}`
                  : `Add ${item.name} to bag`
              }
              className="flex size-9 items-center justify-center rounded-full bg-brand-500 text-cream-50 shadow-glow-brand transition-all duration-300 hover:bg-brand-600 hover:scale-105 active:scale-95"
            >
              <Plus className="size-4" aria-hidden />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
