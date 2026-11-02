"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Bike,
  Check,
  CreditCard,
  Info,
  Minus,
  Plus,
  ShoppingBag,
  Store,
  Trash2,
} from "lucide-react";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import type { CartItem, DemoOrder, MenuItem } from "@/types";
import { cn, formatCurrency, generateRef, isValidEmail, isValidPhone } from "@/lib/utils";
import { DEMO_TAX_RATE, saveDemoOrder } from "@/lib/demo-store";
import { useCart } from "@/components/providers/CartProvider";
import { DishCard } from "@/components/menu/DishCard";
import { DishModal } from "@/components/menu/DishModal";
import { Button, ButtonLink } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/Display";

type Stage = "browse" | "checkout" | "confirmed";
type Fulfilment = "delivery" | "pickup";

const DELIVERY_WINDOWS = ["ASAP · 25–40 min", "12:00 – 12:30 PM", "12:30 – 1:00 PM", "1:00 – 1:30 PM", "6:00 – 6:30 PM", "6:30 – 7:00 PM"];
const PICKUP_WINDOWS = ["Ready in 15 min", "Ready at 12:30 PM", "Ready at 1:00 PM", "Ready at 6:00 PM", "Ready at 6:30 PM"];

export function OrderClient() {
  const searchParams = useSearchParams();
  const {
    items, hydrated, addItem, updateQty, removeItem, clearCart, subtotal, itemCount,
  } = useCart();

  const [stage, setStage] = useState<Stage>(
    searchParams.get("checkout") === "1" ? "checkout" : "browse"
  );
  const [fulfilment, setFulfilment] = useState<Fulfilment>("delivery");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [category, setCategory] = useState("all");

  // checkout form state
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", apt: "", notes: "", window: "" });
  const [payment, setPayment] = useState("card");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<DemoOrder | null>(null);

  const tax = Math.round(subtotal * DEMO_TAX_RATE * 100) / 100;
  const deliveryFee = fulfilment === "delivery" && subtotal > 0 ? 4.99 : 0;
  const total = Math.round((subtotal + tax + deliveryFee) * 100) / 100;

  useEffect(() => {
    setForm((f) => ({ ...f, window: DELIVERY_WINDOWS[0] }));
  }, []);

  useEffect(() => {
    setForm((f) => ({
      ...f,
      window: fulfilment === "delivery" ? DELIVERY_WINDOWS[0] : PICKUP_WINDOWS[0],
    }));
  }, [fulfilment]);

  const visibleItems = useMemo(
    () =>
      MENU_ITEMS.filter((item) => category === "all" || item.category === category),
    [category]
  );

  const setField = (field: string, value: string) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: "" }));
  };

  const validate = (): boolean => {
    const next: Record<string, string> = {};
    if (form.name.trim().length < 2) next.name = "Please tell us your name.";
    if (!isValidPhone(form.phone)) next.phone = "Enter a reachable phone number.";
    if (form.email && !isValidEmail(form.email)) next.email = "That email doesn't look right.";
    if (fulfilment === "delivery" && form.address.trim().length < 6)
      next.address = "Delivery needs a full street address.";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const placeOrder = () => {
    if (!validate()) {
      document.getElementById("order-details-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    const order: DemoOrder = {
      id: generateRef("EGG"),
      type: fulfilment,
      customer: form.name.trim(),
      channel: "Web demo checkout",
      items: items.map((item) => ({ name: item.name, qty: item.qty, unitPrice: item.unitPrice })),
      total,
      createdAt: new Date().toISOString(),
      scheduledFor: form.window,
    };
    saveDemoOrder(order);
    setConfirmedOrder(order);
    clearCart();
    setStage("confirmed");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ——— Confirmed view ———
  if (stage === "confirmed" && confirmedOrder) {
    return <ConfirmationView order={confirmedOrder} fulfilment={fulfilment} />;
  }

  // ——— Checkout view ———
  if (stage === "checkout") {
    if (hydrated && itemCount === 0) {
      return (
        <EmptyState
          onBack={() => setStage("browse")}
        />
      );
    }
    return (
      <CheckoutView
        items={items}
        subtotal={subtotal}
        tax={tax}
        deliveryFee={deliveryFee}
        total={total}
        fulfilment={fulfilment}
        onFulfilment={setFulfilment}
        form={form}
        errors={errors}
        payment={payment}
        onPayment={setPayment}
        onField={setField}
        onPlaceOrder={placeOrder}
        onBack={() => setStage("browse")}
      />
    );
  }

  // ——— Browse view ———
  return (
    <div className="container pb-24 pt-10 md:pt-14">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
            <span className="h-px w-8 bg-brand-400" aria-hidden /> Order online
          </span>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-6xl">
            Your brunch table,
            <span className="italic text-brand-600"> wherever you are</span>
          </h1>
          <p className="mt-3 max-w-md text-[15px] text-charcoal-50/80">
            Build your bag, pick delivery or pickup, and check out in under a minute.
            <span className="font-semibold text-charcoal"> Demo experience — no real payment is processed.</span>
          </p>
        </div>
      </div>

      {/* Fulfillment toggle */}
      <div className="mt-8 inline-flex rounded-full bg-cream-100 p-1.5 shadow-soft">
        {(
          [
            { id: "delivery", label: "Deliver to me", icon: Bike },
            { id: "pickup", label: "Pick up at restaurant", icon: Store },
          ] as const
        ).map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setFulfilment(option.id)}
            aria-pressed={fulfilment === option.id}
            className={cn(
              "flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-300",
              fulfilment === option.id
                ? "bg-charcoal text-cream-50 shadow-soft"
                : "text-charcoal-50/70 hover:text-charcoal"
            )}
          >
            <option.icon className="size-4" aria-hidden />
            {option.label}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_340px]">
        {/* Menu grid */}
        <div>
          <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
            <CategoryPill active={category === "all"} onClick={() => setCategory("all")} label="All" />
            {MENU_CATEGORIES.map((cat) => (
              <CategoryPill key={cat.id} active={category === cat.id} onClick={() => setCategory(cat.id)} label={cat.name} />
            ))}
          </div>

          <div className="mt-6 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {visibleItems.map((item) => (
              <DishCard key={item.id} item={item} onOpen={setModalItem} className="h-full" />
            ))}
          </div>
        </div>

        {/* Order summary rail */}
        <aside className="hidden lg:block">
          <div className="sticky top-[100px] rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 shadow-soft">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <ShoppingBag className="size-5 text-brand-500" aria-hidden />
              Order summary
            </h2>
            {hydrated && itemCount === 0 ? (
              <p className="mt-4 text-sm text-charcoal-50/70">
                Your bag is empty — add a few dishes from the menu and they&apos;ll appear here.
              </p>
            ) : (
              <SummaryList items={items} onUpdateQty={updateQty} onRemove={removeItem} />
            )}
            {hydrated && itemCount > 0 && (
              <>
                <div className="mt-4 space-y-2 border-t border-cream-200 pt-4 text-sm">
                  <Row label="Subtotal" value={formatCurrency(subtotal)} />
                  <Row label={`Tax (${Math.round(DEMO_TAX_RATE * 100)}%)`} value={formatCurrency(tax)} />
                  <Row label={fulfilment === "delivery" ? "Delivery fee" : "Pickup"} value={deliveryFee ? formatCurrency(deliveryFee) : "Free"} />
                  <div className="flex justify-between border-t border-cream-200 pt-3 text-base font-bold">
                    <span>Total</span>
                    <span className="text-brand-600">{formatCurrency(total)}</span>
                  </div>
                </div>
                <Button withArrow className="mt-5 w-full" onClick={() => setStage("checkout")}>
                  Proceed to checkout
                </Button>
                <p className="mt-3 flex items-start gap-1.5 text-[11px] leading-relaxed text-charcoal-50/75">
                  <Info className="mt-0.5 size-3.5 shrink-0" aria-hidden />
                  {fulfilment === "delivery"
                    ? `Free delivery on orders over $50 (order fee $${formatCurrency(deliveryFee)})`
                    : "Pickup orders are ready at the counter — no fees."}
                </p>
              </>
            )}
          </div>
        </aside>
      </div>

      {/* Mobile sticky summary */}
      <AnimatePresence>
        {hydrated && itemCount > 0 && (
          <motion.div
            initial={{ y: 80 }}
            animate={{ y: 0 }}
            exit={{ y: 80 }}
            className="fixed inset-x-3 bottom-3 z-40 flex items-center justify-between gap-3 rounded-full bg-charcoal px-4 py-3 shadow-lift lg:hidden"
          >
            <div className="min-w-0">
              <p className="truncate text-xs font-semibold text-cream-100/70">
                {itemCount} {itemCount === 1 ? "item" : "items"} · {formatCurrency(total)}
              </p>
              <p className="truncate font-display text-sm font-semibold text-cream-50">
                Ready to order?
              </p>
            </div>
            <Button size="sm" onClick={() => setStage("checkout")}>
              Checkout
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      <DishModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
}

// ——— Sub-components ———

function CategoryPill({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-4 py-2 text-[13px] font-semibold transition",
        active
          ? "border-charcoal bg-charcoal text-cream-50"
          : "border-cream-300 bg-cream-50 text-charcoal-600 hover:border-brand-300"
      )}
    >
      {label}
    </button>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-charcoal-50/75">
      <span>{label}</span>
      <span className="font-semibold text-charcoal">{value}</span>
    </div>
  );
}

function SummaryList({
  items,
  onUpdateQty,
  onRemove,
}: {
  items: CartItem[];
  onUpdateQty: (key: string, qty: number) => void;
  onRemove: (key: string) => void;
}) {
  return (
    <ul className="mt-4 space-y-3">
      {items.map((item) => (
        <li key={item.key} className="flex gap-3 rounded-2xl bg-cream-100 p-3">
          <div className="relative size-14 shrink-0 overflow-hidden rounded-xl bg-cream-200">
            <Image src={item.image} alt={item.name} fill sizes="56px" className="object-cover" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-2">
              <p className="truncate text-[13px] font-bold">{item.name}</p>
              <button
                type="button"
                onClick={() => onRemove(item.key)}
                aria-label={`Remove ${item.name}`}
                className="text-charcoal-50/75 transition hover:text-red-600"
              >
                <Trash2 className="size-3.5" aria-hidden />
              </button>
            </div>
            {item.options.length > 0 && (
              <p className="truncate text-[11px] text-charcoal-50/80">{item.options.join(" · ")}</p>
            )}
            <div className="mt-1.5 flex items-center justify-between">
              <div className="inline-flex items-center rounded-full border border-charcoal/10 bg-cream-50">
                <button
                  type="button"
                  aria-label={`Decrease ${item.name} quantity`}
                  onClick={() => onUpdateQty(item.key, item.qty - 1)}
                  className="flex size-7 items-center justify-center rounded-l-full hover:text-brand-600"
                >
                  <Minus className="size-3" aria-hidden />
                </button>
                <span className="w-5 text-center text-[11px] font-bold">{item.qty}</span>
                <button
                  type="button"
                  aria-label={`Increase ${item.name} quantity`}
                  onClick={() => onUpdateQty(item.key, item.qty + 1)}
                  className="flex size-7 items-center justify-center rounded-r-full hover:text-brand-600"
                >
                  <Plus className="size-3" aria-hidden />
                </button>
              </div>
              <span className="text-[13px] font-bold text-brand-600">
                {formatCurrency(item.unitPrice * item.qty)}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

function CheckoutView({
  items,
  subtotal,
  tax,
  deliveryFee,
  total,
  fulfilment,
  onFulfilment,
  form,
  errors,
  payment,
  onPayment,
  onField,
  onPlaceOrder,
  onBack,
}: {
  items: CartItem[];
  subtotal: number;
  tax: number;
  deliveryFee: number;
  total: number;
  fulfilment: Fulfilment;
  onFulfilment: (f: Fulfilment) => void;
  form: { name: string; phone: string; email: string; address: string; apt: string; notes: string; window: string };
  errors: Record<string, string>;
  payment: string;
  onPayment: (p: string) => void;
  onField: (field: string, value: string) => void;
  onPlaceOrder: () => void;
  onBack: () => void;
}) {
  const windows = fulfilment === "delivery" ? DELIVERY_WINDOWS : PICKUP_WINDOWS;

  return (
    <div className="container pb-24 pt-10 md:pt-14">
      <button
        type="button"
        onClick={onBack}
        className="inline-flex items-center gap-2 text-sm font-bold text-charcoal-50/70 transition hover:text-brand-600"
      >
        <ArrowLeft className="size-4" aria-hidden /> Back to menu
      </button>

      <div className="mt-4 max-w-2xl">
        <SectionHeading
          eyebrow="Checkout"
          title="Almost at the table"
          description="A short form, a time slot and you're done. This is a demonstration checkout — no card is charged and no food is cooked."
        />
      </div>

      <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
        <div id="order-details-form" className="space-y-8">
          {/* Fulfillment */}
          <section className="rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold tracking-tight">1 · How would you like it?</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "delivery", label: "Delivery", note: "25–40 min · $4.99", icon: Bike },
                  { id: "pickup", label: "Pickup", note: "Ready in ~15 min · Free", icon: Store },
                ] as const
              ).map((option) => (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => onFulfilment(option.id)}
                  aria-pressed={fulfilment === option.id}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                    fulfilment === option.id
                      ? "border-brand-500 bg-brand-50"
                      : "border-cream-300 hover:border-brand-300"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-11 shrink-0 place-items-center rounded-xl",
                      fulfilment === option.id ? "bg-brand-500 text-cream-50" : "bg-cream-200 text-charcoal-600"
                    )}
                  >
                    <option.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="block text-xs text-charcoal-50/70">{option.note}</span>
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-5">
              <label htmlFor="order-window" className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                {fulfilment === "delivery" ? "Delivery window" : "Pickup time"}
              </label>
              <div className="mt-2 grid gap-2 sm:grid-cols-3">
                {windows.map((w) => (
                  <button
                    key={w}
                    type="button"
                    onClick={() => onField("window", w)}
                    aria-pressed={form.window === w}
                    className={cn(
                      "rounded-xl border px-3 py-2.5 text-xs font-semibold transition",
                      form.window === w
                        ? "border-charcoal bg-charcoal text-cream-50"
                        : "border-cream-300 bg-cream-100/60 hover:border-brand-300"
                    )}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {/* Details */}
          <section className="rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold tracking-tight">2 · Your details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Field label="Full name" id="order-name" value={form.name} error={errors.name} onChange={(v) => onField("name", v)} placeholder="Jane Diner" autoComplete="name" />
              <Field label="Phone" id="order-phone" value={form.phone} error={errors.phone} onChange={(v) => onField("phone", v)} placeholder="(555) 000-0000" autoComplete="tel" />
              <Field label="Email (optional)" id="order-email" value={form.email} error={errors.email} onChange={(v) => onField("email", v)} placeholder="you@hungry.com" autoComplete="email" className="sm:col-span-2" />
              {fulfilment === "delivery" && (
                <>
                  <Field label="Delivery address" id="order-address" value={form.address} error={errors.address} onChange={(v) => onField("address", v)} placeholder="12 Maple Street" autoComplete="street-address" />
                  <Field label="Apt / suite (optional)" id="order-apt" value={form.apt} onChange={(v) => onField("apt", v)} placeholder="Apt 4B" className="sm:col-span-2" />
                </>
              )}
              <Field label="Note for the kitchen (optional)" id="order-notes" value={form.notes} onChange={(v) => onField("notes", v)} placeholder="Allergies, extra napkins…" className="sm:col-span-2" />
            </div>
          </section>

          {/* Payment */}
          <section className="rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 shadow-soft">
            <h2 className="font-display text-xl font-semibold tracking-tight">3 · Payment</h2>
            <div className="mt-3 flex items-start gap-2.5 rounded-2xl bg-brand-50 p-4 text-xs leading-relaxed text-brand-800">
              <Info className="mt-0.5 size-4 shrink-0" aria-hidden />
              <span>
                <strong>Demo checkout.</strong> No card fields are shown and no payment is
                processed. This flow exists to showcase the ordering experience.
              </span>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {(
                [
                  { id: "card", label: "Card on file (demo)", note: "Mock charge at fulfilment", icon: CreditCard },
                  { id: fulfilment === "delivery" ? "cash-delivery" : "cash-pickup", label: fulfilment === "delivery" ? "Cash on delivery" : "Cash at pickup", note: "Exact change appreciated", icon: Store },
                ] as const
              ).map((option) => (
                <button
                  key={option.label}
                  type="button"
                  onClick={() => onPayment(option.id)}
                  aria-pressed={payment.startsWith(option.id)}
                  className={cn(
                    "flex items-center gap-3 rounded-2xl border p-4 text-left transition",
                    payment.startsWith(option.id)
                      ? "border-brand-500 bg-brand-50"
                      : "border-cream-300 hover:border-brand-300"
                  )}
                >
                  <span
                    className={cn(
                      "grid size-10 shrink-0 place-items-center rounded-xl",
                      payment.startsWith(option.id) ? "bg-brand-500 text-cream-50" : "bg-cream-200 text-charcoal-600"
                    )}
                  >
                    <option.icon className="size-5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-sm font-bold">{option.label}</span>
                    <span className="block text-xs text-charcoal-50/70">{option.note}</span>
                  </span>
                </button>
              ))}
            </div>
          </section>
        </div>

        {/* Summary */}
        <aside>
          <div className="rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 shadow-soft lg:sticky lg:top-[100px]">
            <h2 className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight">
              <ShoppingBag className="size-5 text-brand-500" aria-hidden /> In your bag
            </h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {items.map((item) => (
                <li key={item.key} className="flex items-start justify-between gap-3">
                  <span className="min-w-0">
                    <span className="block truncate font-semibold">
                      {item.qty} × {item.name}
                    </span>
                    {item.options.length > 0 && (
                      <span className="block truncate text-[11px] text-charcoal-50/75">{item.options.join(" · ")}</span>
                    )}
                  </span>
                  <span className="shrink-0 font-semibold">{formatCurrency(item.unitPrice * item.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-5 space-y-2 border-t border-cream-200 pt-4 text-sm">
              <Row label="Subtotal" value={formatCurrency(subtotal)} />
              <Row label={`Tax (${Math.round(DEMO_TAX_RATE * 100)}%)`} value={formatCurrency(tax)} />
              <Row label={fulfilment === "delivery" ? "Delivery fee" : "Pickup"} value={deliveryFee ? formatCurrency(deliveryFee) : "Free"} />
              <div className="flex justify-between border-t border-cream-200 pt-3 text-base font-bold">
                <span>Total</span>
                <span className="text-brand-600">{formatCurrency(total)}</span>
              </div>
            </div>
            <Button withArrow className="mt-6 w-full" onClick={onPlaceOrder}>
              Place demo order
            </Button>
            <p className="mt-3 text-center text-[11px] text-charcoal-50/75">
              {Object.keys(errors).length > 0
                ? "Please fix the highlighted fields above."
                : "You'll see a confirmation screen with a mock order number."}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Field({
  label,
  id,
  value,
  onChange,
  placeholder,
  error,
  className,
  autoComplete,
}: {
  label: string;
  id: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  error?: string;
  className?: string;
  autoComplete?: string;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
        {label}
      </label>
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={Boolean(error)}
        className={cn(
          "mt-2 h-12 w-full rounded-2xl border bg-cream-100/60 px-4 text-sm font-medium outline-none transition focus:border-brand-400 focus:ring-2 focus:ring-brand-200",
          error ? "border-red-400" : "border-cream-300"
        )}
      />
      {error && (
        <p className="mt-1.5 text-xs font-semibold text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}

function EmptyState({ onBack }: { onBack: () => void }) {
  return (
    <div className="container flex flex-col items-center gap-4 pb-24 pt-16 text-center">
      <span className="grid size-20 place-items-center rounded-full bg-cream-200">
        <ShoppingBag className="size-9 text-charcoal-50/75" aria-hidden />
      </span>
      <h1 className="font-display text-3xl font-medium tracking-tight">Nothing in the bag yet</h1>
      <p className="max-w-md text-[15px] text-charcoal-50/70">
        Add a few dishes from the menu first — the pancakes travel beautifully.
      </p>
      <div className="mt-2 flex gap-3">
        <Button onClick={onBack}>Back to menu</Button>
        <ButtonLink href="/menu" variant="outline">
          Full menu page
        </ButtonLink>
      </div>
    </div>
  );
}

function ConfirmationView({
  order,
  fulfilment,
}: {
  order: DemoOrder;
  fulfilment: Fulfilment;
}) {
  const router = useRouter();
  return (
    <div className="container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 16 }}
        className="grid size-24 place-items-center rounded-full bg-sage-600 text-cream-50 shadow-glow-brand"
      >
        <Check className="size-12" aria-hidden />
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
        <h1 className="mt-8 font-display text-4xl font-medium tracking-tight sm:text-5xl">
          Order received{fulfilment === "pickup" ? " — see you soon!" : "!"}
        </h1>
        <p className="mx-auto mt-3 max-w-md text-[15px] text-charcoal-50/75">
          This is a demonstration confirmation — no kitchen was harmed in the making of
          this order. Your details were stored locally for the demo dashboard.
        </p>

        <div className="mx-auto mt-8 w-full max-w-md rounded-[1.75rem] border border-cream-300 bg-cream-50 p-6 text-left shadow-soft">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-[0.16em] text-charcoal-50/75">
              Demo order number
            </span>
            <span className="font-display text-lg font-semibold text-brand-600">{order.id}</span>
          </div>
          <ul className="mt-4 space-y-2 border-t border-cream-200 pt-4 text-sm">
            {order.items.map((item, i) => (
              <li key={i} className="flex justify-between gap-3">
                <span className="truncate text-charcoal-50/80">
                  {item.qty} × {item.name}
                </span>
                <span className="font-semibold">{formatCurrency(item.unitPrice * item.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-4 flex justify-between border-t border-cream-200 pt-4 text-sm font-bold">
            <span>Total (demo)</span>
            <span className="text-brand-600">{formatCurrency(order.total)}</span>
          </div>
          <p className="mt-3 text-xs text-charcoal-50/75">
            {order.type === "delivery" ? "Delivery" : "Pickup"} · {order.scheduledFor} · Placed{" "}
            {new Date(order.createdAt).toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" })}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={() => router.push("/order")}>Order something else</Button>
          <ButtonLink href="/menu" variant="outline">
            Browse the menu
          </ButtonLink>
          <ButtonLink href="/reservations" variant="ghost">
            Reserve a table instead →
          </ButtonLink>
        </div>
        <p className="mt-6 text-xs text-charcoal-50/75">
          Curious what restaurants see? <Link href="/admin" className="font-semibold text-brand-600 underline underline-offset-2">Preview the demo dashboard</Link>
        </p>
      </motion.div>
    </div>
  );
}
