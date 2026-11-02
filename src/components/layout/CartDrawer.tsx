"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/components/providers/CartProvider";
import { Button, ButtonLink } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useEffect } from "react";

export function CartDrawer() {
  const { drawerOpen, closeDrawer, items, updateQty, removeItem, subtotal, itemCount, hydrated } =
    useCart();

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  return (
    <AnimatePresence>
      {drawerOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-charcoal/40 backdrop-blur-sm"
          onClick={closeDrawer}
        >
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-y-0 right-0 flex w-[92%] max-w-md flex-col bg-cream-50 shadow-lift"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping bag"
          >
            <div className="flex items-center justify-between border-b border-cream-200 px-6 py-5">
              <h2 className="flex items-center gap-2.5 font-display text-xl font-semibold tracking-tight">
                <ShoppingBag className="size-5 text-brand-500" aria-hidden />
                Your bag
                {hydrated && itemCount > 0 && (
                  <span className="rounded-full bg-cream-200 px-2.5 py-0.5 text-xs font-bold text-charcoal">
                    {itemCount}
                  </span>
                )}
              </h2>
              <button
                type="button"
                onClick={closeDrawer}
                aria-label="Close bag"
                className="flex size-10 items-center justify-center rounded-full transition hover:bg-charcoal/5"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>

            {!hydrated ? (
              <div className="flex flex-1 items-center justify-center text-sm text-charcoal-50/70">
                Loading bag…
              </div>
            ) : items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-8 text-center">
                <span className="grid size-16 place-items-center rounded-full bg-cream-200">
                  <ShoppingBag className="size-7 text-charcoal-50/75" aria-hidden />
                </span>
                <p className="font-display text-xl font-medium">Your bag is empty</p>
                <p className="text-sm text-charcoal-50/70">
                  Add something delicious from the menu to get started.
                </p>
                <div className="mt-2 flex gap-3">
                  <ButtonLink href="/menu" size="sm" onClick={closeDrawer}>
                    Browse the menu
                  </ButtonLink>
                  <Button variant="outline" size="sm" onClick={closeDrawer}>
                    Keep shopping
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <ul className="flex-1 divide-y divide-cream-200 overflow-y-auto px-6">
                  {items.map((item) => (
                    <li key={item.key} className="flex gap-4 py-4">
                      <div className="relative size-16 shrink-0 overflow-hidden rounded-2xl bg-cream-200">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          sizes="64px"
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-start justify-between gap-2">
                          <p className="truncate text-sm font-bold">{item.name}</p>
                          <button
                            type="button"
                            onClick={() => removeItem(item.key)}
                            aria-label={`Remove ${item.name} from bag`}
                            className="text-charcoal-50/75 transition hover:text-red-600"
                          >
                            <Trash2 className="size-4" aria-hidden />
                          </button>
                        </div>
                        {item.options.length > 0 && (
                          <p className="mt-0.5 truncate text-xs text-charcoal-50/80">
                            {item.options.join(" · ")}
                          </p>
                        )}
                        <div className="mt-2 flex items-center justify-between">
                          <div className="inline-flex items-center rounded-full border border-charcoal/15">
                            <button
                              type="button"
                              aria-label={`Decrease ${item.name} quantity`}
                              onClick={() => updateQty(item.key, item.qty - 1)}
                              className="flex size-8 items-center justify-center rounded-l-full hover:text-brand-600"
                            >
                              {item.qty === 1 ? (
                                <Trash2 className="size-3.5" aria-hidden />
                              ) : (
                                <Minus className="size-3.5" aria-hidden />
                              )}
                            </button>
                            <span className="w-6 text-center text-xs font-bold">{item.qty}</span>
                            <button
                              type="button"
                              aria-label={`Increase ${item.name} quantity`}
                              onClick={() => updateQty(item.key, item.qty + 1)}
                              className="flex size-8 items-center justify-center rounded-r-full hover:text-brand-600"
                            >
                              <Plus className="size-3.5" aria-hidden />
                            </button>
                          </div>
                          <p className="text-sm font-bold text-brand-600">
                            {formatCurrency(item.unitPrice * item.qty)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="border-t border-cream-200 px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <p className="text-sm text-charcoal-50/70">Subtotal</p>
                    <p className="text-lg font-bold">{formatCurrency(subtotal)}</p>
                  </div>
                  <p className="mt-1 text-xs text-charcoal-50/75">
                    Taxes and fees calculated at checkout. Demo experience — no real orders.
                  </p>
                  <ButtonLink
                    href="/order"
                    withArrow
                    className="mt-4 w-full"
                    onClick={closeDrawer}
                  >
                    Checkout
                  </ButtonLink>
                </div>
              </>
            )}
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
