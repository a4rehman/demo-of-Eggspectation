"use client";

import Image from "next/image";
import { Check, Flame, Minus, Plus, X } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Customization, MenuItem } from "@/types";
import { cn, formatCurrency } from "@/lib/utils";
import { useCart } from "@/components/providers/CartProvider";
import { DietaryBadges } from "@/components/menu/DishCard";
import { Button } from "@/components/ui/Button";

type SelectedChoice = Record<string, string>; // customizationId -> optionId
type SelectedExtras = Record<string, string[]>; // customizationId -> optionIds

export function DishModal({
  item,
  onClose,
  subscribedOpen,
}: {
  item: MenuItem | null;
  onClose: () => void;
  subscribedOpen?: boolean;
}) {
  const { addItem, openDrawer } = useCart();
  const [qty, setQty] = useState(1);
  const [choices, setChoices] = useState<SelectedChoice>({});
  const [extras, setExtras] = useState<SelectedExtras>({});
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (item) {
      const initialChoices: SelectedChoice = {};
      item.customizations
        ?.filter((c) => c.type === "choice")
        .forEach((c) => {
          initialChoices[c.id] = c.options.find((o) => o.price === 0)?.id ?? c.options[0].id;
        });
      setChoices(initialChoices);
      setExtras({});
      setQty(1);
      setJustAdded(false);
    }
  }, [item]);

  const open = Boolean(item) || subscribedOpen;

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  if (!item) return null;

  const selection = collectSelection(item, choices, extras, qty);
  const canAdd = item.customizations
    ? item.customizations
        .filter((c) => c.required)
        .every((c) => selection.picked[c.id]?.length === 1)
    : true;

  const handleAdd = () => {
    if (!canAdd) return;
    const options = collectOptions(item, choices, extras);
    addItem({
      id: item.id,
      name: item.name,
      image: item.image,
      basePrice: item.price,
      qty,
      options,
    });
    setJustAdded(true);
    setTimeout(() => {
      onClose();
      openDrawer();
    }, 650);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-end justify-center bg-charcoal/50 backdrop-blur-sm sm:items-center sm:p-6"
          onClick={onClose}
        >
          <motion.div
            initial={{ y: 60, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 40, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-[2rem] bg-cream-50 shadow-lift sm:rounded-[2rem]"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={item.name}
          >
            <button
              type="button"
              onClick={onClose}
              aria-label="Close dialog"
              className="absolute right-4 top-4 z-10 flex size-10 items-center justify-center rounded-full bg-charcoal/70 text-cream-50 backdrop-blur transition hover:bg-charcoal"
            >
              <X className="size-5" aria-hidden />
            </button>

            <div className="relative h-52 shrink-0 sm:h-64">
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="(min-width: 640px) 768px, 100vw"
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-charcoal/10" />
              <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-semibold tracking-tight text-cream-50 sm:text-3xl">
                  {item.name}
                </h2>
                {item.calories > 0 && (
                  <span className="flex shrink-0 items-center gap-1 rounded-full bg-cream-50/15 px-3 py-1 text-xs font-semibold text-cream-50 backdrop-blur">
                    <Flame className="size-3.5" aria-hidden /> {item.calories} cal
                  </span>
                )}
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6">
              <DietaryBadges dietary={item.dietary} />
              <p className="mt-3 text-sm leading-relaxed text-charcoal-50/85 sm:text-[15px]">
                {item.description}
              </p>

              {item.customizations && (
                <div className="mt-6 space-y-6 border-t border-cream-200 pt-6">
                  {item.customizations.map((custom) => (
                    <fieldset key={custom.id}>
                      <legend className="flex items-baseline justify-between text-sm font-bold">
                        <span>
                          {custom.name}
                          {custom.required && <span className="text-brand-600"> *</span>}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-semibold",
                            isSatisfied(item, custom, choices, extras)
                              ? "text-sage-600"
                              : "text-charcoal-50/75"
                          )}
                        >
                          {isSatisfied(item, custom, choices, extras) ? "Selected" : "Choose below"}
                        </span>
                      </legend>
                      <div className="mt-3 grid gap-2 sm:grid-cols-2">
                        {custom.options.map((option) => {
                          if (custom.type === "choice") {
                            const checked = choices[custom.id] === option.id;
                            return (
                              <label
                                key={option.id}
                                className={cn(
                                  "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                                  checked
                                    ? "border-brand-500 bg-brand-50 text-charcoal"
                                    : "border-cream-200 bg-cream-100/60 hover:border-brand-300"
                                )}
                              >
                                <span className="flex items-center gap-2.5 font-semibold">
                                  <input
                                    type="radio"
                                    name={`${item.id}-${custom.id}`}
                                    className="sr-only"
                                    checked={checked}
                                    onChange={() =>
                                      setChoices((prev) => ({ ...prev, [custom.id]: option.id }))
                                    }
                                  />
                                  <span
                                    className={cn(
                                      "grid size-4 place-items-center rounded-full border-2",
                                      checked ? "border-brand-500" : "border-cream-300"
                                    )}
                                    aria-hidden
                                  >
                                    {checked && (
                                      <span className="size-2 rounded-full bg-brand-500" />
                                    )}
                                  </span>
                                  {option.name}
                                </span>
                                <span className="shrink-0 text-xs font-semibold text-charcoal-50/70">
                                  {option.price === 0 ? "Included" : `+${formatCurrency(option.price)}`}
                                </span>
                              </label>
                            );
                          }
                          const checkedList = extras[custom.id] ?? [];
                          const checked = checkedList.includes(option.id);
                          const atMax = custom.max
                            ? !checked && checkedList.length >= custom.max
                            : false;
                          return (
                            <label
                              key={option.id}
                              className={cn(
                                "flex cursor-pointer items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-sm transition",
                                checked
                                  ? "border-brand-500 bg-brand-50"
                                  : "border-cream-200 bg-cream-100/60 hover:border-brand-300",
                                atMax && "cursor-not-allowed opacity-50"
                              )}
                            >
                              <span className="flex items-center gap-2.5 font-semibold">
                                <input
                                  type="checkbox"
                                  className="sr-only"
                                  checked={checked}
                                  disabled={atMax}
                                  onChange={() => {
                                    setExtras((prev) => {
                                      const list = prev[custom.id] ?? [];
                                      return {
                                        ...prev,
                                        [custom.id]: checked
                                          ? list.filter((v) => v !== option.id)
                                          : [...list, option.id],
                                      };
                                    });
                                  }}
                                />
                                <span
                                  className={cn(
                                    "grid size-4 place-items-center rounded-md border-2",
                                    checked
                                      ? "border-brand-500 bg-brand-500 text-cream-50"
                                      : "border-cream-300"
                                  )}
                                  aria-hidden
                                >
                                  {checked && <Check className="size-3" />}
                                </span>
                                {option.name}
                              </span>
                              <span className="shrink-0 text-xs font-semibold text-charcoal-50/70">
                                +{formatCurrency(option.price)}
                              </span>
                            </label>
                          );
                        })}
                      </div>
                    </fieldset>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3 border-t border-cream-200 bg-cream-100/70 px-6 py-4">
              <div className="inline-flex items-center rounded-full border border-charcoal/15 bg-cream-50">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  disabled={qty <= 1}
                  className="flex size-11 items-center justify-center rounded-l-full hover:text-brand-600 disabled:opacity-30"
                >
                  <Minus className="size-4" aria-hidden />
                </button>
                <span className="w-8 text-center text-sm font-bold" aria-live="polite">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(10, q + 1))}
                  className="flex size-11 items-center justify-center rounded-r-full hover:text-brand-600"
                >
                  <Plus className="size-4" aria-hidden />
                </button>
              </div>
              <Button
                onClick={handleAdd}
                disabled={!canAdd}
                className="flex-1"
                withArrow={!justAdded}
              >
                {justAdded ? (
                  <span className="flex items-center gap-2">
                    <Check className="size-4" aria-hidden /> Added to bag
                  </span>
                ) : canAdd ? (
                  `Add to bag · ${formatCurrency(selection.total)}`
                ) : (
                  "Complete required choices"
                )}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// ——— helpers ———

function collectOptions(
  item: MenuItem,
  choices: SelectedChoice,
  extras: SelectedExtras
): Array<{ name: string; price: number }> {
  const options: Array<{ name: string; price: number }> = [];
  item.customizations?.forEach((custom) => {
    if (custom.type === "choice") {
      const option = custom.options.find((o) => o.id === choices[custom.id]);
      if (option) options.push({ name: option.name, price: option.price });
    } else {
      (extras[custom.id] ?? []).forEach((optionId) => {
        const option = custom.options.find((o) => o.id === optionId);
        if (option) options.push({ name: option.name, price: option.price });
      });
    }
  });
  return options;
}

type PickedItem = { name: string; price: number };

function collectSelection(
  item: MenuItem,
  choices: SelectedChoice,
  extras: SelectedExtras,
  qty: number
) {
  const labels: PickedItem[] = [];
  let unit = item.price;

  item.customizations?.forEach((custom) => {
    if (custom.type === "choice") {
      const optionId = choices[custom.id];
      const option = custom.options.find((o) => o.id === optionId);
      if (option) {
        unit += option.price;
        labels.push({ name: option.name, price: option.price });
      }
    } else {
      const list = extras[custom.id] ?? [];
      list.forEach((optionId) => {
        const option = custom.options.find((o) => o.id === optionId);
        if (option) {
          unit += option.price;
          labels.push({ name: option.name, price: option.price });
        }
      });
    }
  });

  return {
    labels,
    picked: buildPicked(item, choices, extras),
    total: Math.round(unit * qty * 100) / 100,
  };
}

function buildPicked(
  item: MenuItem,
  choices: SelectedChoice,
  extras: SelectedExtras
): Record<string, string[]> {
  const picked: Record<string, string[]> = {};
  item.customizations?.forEach((custom) => {
    if (custom.type === "choice") {
      picked[custom.id] = choices[custom.id] ? [choices[custom.id]] : [];
    } else {
      picked[custom.id] = extras[custom.id] ?? [];
    }
  });
  return picked;
}

function isSatisfied(
  item: MenuItem,
  custom: Customization,
  choices: SelectedChoice,
  extras: SelectedExtras
): boolean {
  if (custom.type === "choice") return Boolean(choices[custom.id]);
  const min = custom.required ? 1 : 0;
  return (extras[custom.id]?.length ?? 0) >= min;
}
