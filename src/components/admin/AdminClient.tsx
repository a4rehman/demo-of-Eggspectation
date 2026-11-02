"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Bike,
  CalendarDays,
  DollarSign,
  Eye,
  Receipt,
  ShoppingBag,
  Store,
  TriangleAlert,
  TrendingUp,
  Users,
} from "lucide-react";
import { MOCK_ORDERS, MOCK_RESERVATIONS, MOCK_STATS } from "@/data/admin";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import { LOCATIONS } from "@/data/locations";
import type { DemoOrder, DemoReservation } from "@/types";
import { cn, formatCurrency, formatDateTime } from "@/lib/utils";
import { getDemoOrders, getDemoReservations } from "@/lib/demo-store";
import { DemoBadge } from "@/components/ui/DemoBadge";

type Tab = "overview" | "orders" | "menu" | "reservations";

export function AdminClient() {
  const [tab, setTab] = useState<Tab>("overview");
  const [demoOrders, setDemoOrders] = useState<DemoOrder[]>([]);
  const [demoReservations, setDemoReservations] = useState<DemoReservation[]>([]);
  const [unavailable, setUnavailable] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setDemoOrders(getDemoOrders());
    setDemoReservations(getDemoReservations());
  }, []);

  const allOrders = [...demoOrders, ...MOCK_ORDERS];
  const allReservations = [...demoReservations, ...MOCK_RESERVATIONS];

  return (
    <div className="min-h-screen bg-cream-100">
      <div className="container py-10">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-bold text-charcoal-50/75 transition hover:text-brand-600"
            >
              <ArrowLeft className="size-4" aria-hidden /> Back to website
            </Link>
            <h1 className="mt-3 font-display text-4xl font-medium tracking-tight sm:text-5xl">
              Owner dashboard
            </h1>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <DemoBadge />
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-100 px-3 py-1 text-xs font-bold text-brand-800">
                <TriangleAlert className="size-3.5" aria-hidden />
                Not connected to any real system
              </span>
            </div>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-charcoal-50/75">
            This dashboard previews what a full Eggspectation management portal could
            look like. All statistics are mock data; the &ldquo;demo orders&rdquo; and
            &ldquo;demo reservations&rdquo; were created by you elsewhere on this site
            and live only in your browser&apos;s local storage.
          </p>
        </div>

        {/* Tabs */}
        <div className="mt-8 flex gap-2 overflow-x-auto">
          {(
            [
              { id: "overview", label: "Overview", icon: TrendingUp },
              { id: "orders", label: "Orders", icon: Receipt },
              { id: "menu", label: "Menu management", icon: ShoppingBag },
              { id: "reservations", label: "Reservations", icon: CalendarDays },
            ] as const
          ).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              aria-pressed={tab === t.id}
              className={cn(
                "inline-flex shrink-0 items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold transition",
                tab === t.id
                  ? "border-charcoal bg-charcoal text-cream-50"
                  : "border-cream-300 bg-cream-50 text-charcoal-600 hover:border-brand-300"
              )}
            >
              <t.icon className="size-4" aria-hidden />
              {t.label}
            </button>
          ))}
        </div>

        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
          {tab === "overview" && <Overview orders={allOrders} reservations={allReservations} />}
          {tab === "orders" && <OrdersTab orders={allOrders} />}
          {tab === "menu" && (
            <MenuTab unavailable={unavailable} onToggle={(id) => setUnavailable((prev) => ({ ...prev, [id]: !prev[id] }))} />
          )}
          {tab === "reservations" && <ReservationsTab reservations={allReservations} />}
        </motion.div>
      </div>
    </div>
  );
}

// ——— Overview ———

function StatCard({
  label,
  value,
  delta,
  icon: Icon,
  note,
}: {
  label: string;
  value: string;
  delta?: string;
  icon: typeof DollarSign;
  note?: string;
}) {
  return (
    <div className="rounded-[1.5rem] bg-cream-50 p-6 shadow-soft">
      <div className="flex items-center justify-between">
        <span className="flex size-10 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
          <Icon className="size-5" aria-hidden />
        </span>
        {delta && (
          <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[11px] font-bold text-sage-700">
            +{delta}%
          </span>
        )}
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">{label}</p>
      <p className="mt-1 font-display text-3xl font-semibold tracking-tight">{value}</p>
      {note && <p className="mt-1 text-[11px] text-charcoal-50/75">{note}</p>}
    </div>
  );
}

function Overview({
  orders,
  reservations,
}: {
  orders: DemoOrder[];
  reservations: DemoReservation[];
}) {
  const tonight = orders.filter((o) => o.type === "delivery").length;
  return (
    <div className="mt-8">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue · this week (mock)" value={formatCurrency(MOCK_STATS.revenue.week)} delta={MOCK_STATS.revenue.weekDelta.toString()} icon={DollarSign} note="Mock data for illustration" />
        <StatCard label="Orders · today (mock)" value={MOCK_STATS.orders.today.toString()} delta={MOCK_STATS.orders.delta.toString()} icon={ShoppingBag} note="Across all rooms" />
        <StatCard label="Avg. ticket (mock)" value={formatCurrency(MOCK_STATS.avgTicket.value)} delta={MOCK_STATS.avgTicket.delta.toString()} icon={Receipt} note="Per order" />
        <StatCard label="Upcoming reservations (mock)" value={MOCK_STATS.reservations.upcomingWeek.toString()} delta={MOCK_STATS.reservations.delta.toString()} icon={Users} note="Next 7 days" />
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        <div className="rounded-[1.5rem] bg-cream-50 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold tracking-tight">Latest demo orders</h2>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
              {todayMock()} today
            </span>
          </div>
          <OrderList orders={orders.slice(0, 4)} />
        </div>
        <div className="rounded-[1.5rem] bg-cream-50 p-6 shadow-soft">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-semibold tracking-tight">Next reservations</h2>
            <span className="text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
              {tonight} delivery orders today
            </span>
          </div>
          <ReservationList reservations={reservations.slice(0, 4)} />
        </div>
      </div>

      {/* Popular dishes mock chart */}
      <div className="mt-8 rounded-[1.5rem] bg-cream-50 p-6 shadow-soft">
        <h2 className="font-display text-lg font-semibold tracking-tight">Top sellers this week (mock)</h2>
        <div className="mt-5 space-y-4">
          {[
            { name: "Legendary Banana Pancakes", pct: 92 },
            { name: "Roastery Signature Latte", pct: 81 },
            { name: "Sunrise Avocado Toast", pct: 64 },
            { name: "Hangar Steak & Estate Fries", pct: 47 },
            { name: "Bottomless Mimosa", pct: 38 },
          ].map((row) => (
            <div key={row.name} className="flex items-center gap-4">
              <p className="w-56 shrink-0 truncate text-sm font-semibold">{row.name}</p>
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-cream-200">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${row.pct}%` }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className={cn("h-full rounded-full", row.pct > 60 ? "bg-brand-500" : "bg-brand-300")}
                />
              </div>
              <span className="w-10 text-right text-xs font-bold text-charcoal-50/75">{row.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function todayMock() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// ——— Orders tab ———

function OrdersTab({ orders }: { orders: DemoOrder[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-cream-50 shadow-soft">
      <div className="border-b border-cream-200 p-6">
        <h2 className="font-display text-lg font-semibold tracking-tight">Order management preview</h2>
        <p className="mt-1 text-xs text-charcoal-50/75">
          Mock tickets mixed with any demo orders you placed while browsing the site.
        </p>
      </div>
      <OrderTable orders={orders} />
    </div>
  );
}

function OrderList({ orders }: { orders: DemoOrder[] }) {
  return (
    <ul className="mt-4 divide-y divide-cream-200">
      {orders.map((order) => (
        <li key={order.id} className="flex items-center gap-4 py-3.5">
          <span
            className={cn(
              "flex size-10 shrink-0 items-center justify-center rounded-xl",
              order.type === "delivery" ? "bg-brand-50 text-brand-600" : "bg-cream-200 text-charcoal-600"
            )}
          >
            {order.type === "delivery" ? <Bike className="size-4" aria-hidden /> : <Store className="size-4" aria-hidden />}
          </span>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-bold">
              {order.id} · {order.customer}
            </p>
            <p className="truncate text-xs text-charcoal-50/75">
              {order.items.reduce((n, i) => n + i.qty, 0)} items · {order.scheduledFor}
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm font-bold text-brand-600">{formatCurrency(order.total)}</p>
            <p className="text-[11px] text-charcoal-50/75">{order.type}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

function OrderTable({ orders }: { orders: DemoOrder[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-cream-200 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
            <th className="px-6 py-4">Order</th>
            <th className="px-6 py-4">Customer</th>
            <th className="px-6 py-4">Type</th>
            <th className="px-6 py-4">When</th>
            <th className="px-6 py-4">Placed</th>
            <th className="px-6 py-4 text-right">Total</th>
            <th className="px-6 py-4 text-right">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-cream-200">
          {orders.map((order) => (
            <tr key={order.id} className="transition hover:bg-cream-100">
              <td className="px-6 py-4 font-bold text-brand-700">{order.id}</td>
              <td className="px-6 py-4">{order.customer}</td>
              <td className="px-6 py-4">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-2.5 py-1 text-[11px] font-bold">
                  {order.type === "delivery" ? <Bike className="size-3" aria-hidden /> : <Store className="size-3" aria-hidden />}
                  {order.type}
                </span>
              </td>
              <td className="px-6 py-4 text-charcoal-50/75">{order.scheduledFor}</td>
              <td className="px-6 py-4 text-charcoal-50/70">{formatDateTime(order.createdAt)}</td>
              <td className="px-6 py-4 text-right font-bold">{formatCurrency(order.total)}</td>
              <td className="px-6 py-4 text-right">
                <span className="rounded-full bg-sage-100 px-2.5 py-1 text-[11px] font-bold text-sage-700">
                  {order.id.startsWith("EGG-") && order.channel === "Web demo checkout" ? "New (demo)" : "Fulfilled (mock)"}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ——— Menu tab ———

function MenuTab({
  unavailable,
  onToggle,
}: {
  unavailable: Record<string, boolean>;
  onToggle: (id: string) => void;
}) {
  const [category, setCategory] = useState("all");
  const items = MENU_ITEMS.filter((i) => category === "all" || i.category === category);

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-2">
        <MenuFilter active={category === "all"} onClick={() => setCategory("all")} label="All" />
        {MENU_CATEGORIES.map((c) => (
          <MenuFilter key={c.id} active={category === c.id} onClick={() => setCategory(c.id)} label={c.name} />
        ))}
      </div>

      <div className="mt-6 overflow-hidden rounded-[1.5rem] bg-cream-50 shadow-soft">
        <div className="flex items-center justify-between border-b border-cream-200 p-6">
          <h2 className="font-display text-lg font-semibold tracking-tight">Menu management preview</h2>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-full border border-charcoal/15 px-4 py-2 text-xs font-bold transition hover:border-brand-400 hover:text-brand-600"
            onClick={() => alert("Demo only — production version connects to the real menu database with pricing, photos and live edits across every location.")}
          >
            <Eye className="size-3.5" aria-hidden /> Edit item (demo)
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-cream-200 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                <th className="px-6 py-4">Dish</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4 text-right">Price</th>
                <th className="px-6 py-4">Dietary</th>
                <th className="px-6 py-4 text-right">Availability</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-cream-200">
              {items.map((item) => (
                <tr key={item.id} className="transition hover:bg-cream-100">
                  <td className="px-6 py-3 font-semibold">{item.name}</td>
                  <td className="px-6 py-3 text-charcoal-50/70">{item.category}</td>
                  <td className="px-6 py-3 text-right font-bold">{formatCurrency(item.price)}</td>
                  <td className="px-6 py-3">
                    <span className="text-xs text-charcoal-50/75">
                      {item.dietary.length > 0 ? item.dietary.join(", ") : "—"}
                    </span>
                  </td>
                  <td className="px-6 py-3 text-right">
                    <button
                      type="button"
                      role="switch"
                      aria-checked={!unavailable[item.id]}
                      onClick={() => onToggle(item.id)}
                      className={cn(
                        "relative inline-flex h-6 w-11 items-center rounded-full transition-colors",
                        unavailable[item.id] ? "bg-cream-300" : "bg-sage-600"
                      )}
                    >
                      <span
                        className={cn(
                          "inline-block size-5 transform rounded-full bg-cream-50 shadow transition-transform",
                          unavailable[item.id] ? "translate-x-1" : "translate-x-[24px]"
                        )}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <p className="mt-4 flex items-start gap-2 text-xs text-charcoal-50/75">
        <TriangleAlert className="mt-0.5 size-4 shrink-0 text-brand-600" aria-hidden />
        Availability toggles are scenic — they reset on refresh and are never sent to a kitchen.
      </p>
    </div>
  );
}

function MenuFilter({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "rounded-full border px-4 py-2 text-xs font-bold transition",
        active ? "border-charcoal bg-charcoal text-cream-50" : "border-cream-300 bg-cream-50 text-charcoal-600 hover:border-brand-300"
      )}
    >
      {label}
    </button>
  );
}

// ——— Reservations tab ———

function ReservationList({ reservations }: { reservations: DemoReservation[] }) {
  return (
    <ul className="mt-4 divide-y divide-cream-200">
      {reservations.map((res) => (
        <li key={res.id} className="py-3.5">
          <div className="flex items-center justify-between gap-3">
            <p className="truncate text-sm font-bold">
              {res.name} · {res.guests} {res.guests === 1 ? "guest" : "guests"}
            </p>
            <p className="shrink-0 text-xs font-bold text-brand-600">{res.time}</p>
          </div>
          <p className="mt-0.5 text-xs text-charcoal-50/75">
            {locationName(res.location)} · {res.date}
            {res.occasion ? ` · ${res.occasion}` : ""}
          </p>
        </li>
      ))}
    </ul>
  );
}

function ReservationsTab({ reservations }: { reservations: DemoReservation[] }) {
  return (
    <div className="mt-8 overflow-hidden rounded-[1.5rem] bg-cream-50 shadow-soft">
      <div className="border-b border-cream-200 p-6">
        <h2 className="font-display text-lg font-semibold tracking-tight">Reservation book preview</h2>
        <p className="mt-1 text-xs text-charcoal-50/75">
          A taste of the day-view book. In production this syncs with table inventory in real time.
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[680px] text-left text-sm">
          <thead>
            <tr className="border-b border-cream-200 text-[11px] font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
              <th className="px-6 py-4">Ref</th>
              <th className="px-6 py-4">Guest</th>
              <th className="px-6 py-4">Room</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Party</th>
              <th className="px-6 py-4 text-right">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-cream-200">
            {reservations.map((res) => (
              <tr key={res.id} className="transition hover:bg-cream-100">
                <td className="px-6 py-4 font-bold text-brand-700">{res.id}</td>
                <td className="px-6 py-4">
                  {res.name}
                  {res.notes && <span className="block text-[11px] text-charcoal-50/75">{res.notes}</span>}
                </td>
                <td className="px-6 py-4 text-charcoal-50/75">{locationName(res.location)}</td>
                <td className="px-6 py-4 text-charcoal-50/75">{res.date}</td>
                <td className="px-6 py-4 text-right font-bold">{res.guests}</td>
                <td className="px-6 py-4 text-right font-bold text-brand-600">{res.time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function locationName(id: string): string {
  return LOCATIONS.find((l) => l.id === id)?.name ?? id;
}
