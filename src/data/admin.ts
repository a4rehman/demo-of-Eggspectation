import type { DemoOrder, DemoReservation } from "@/types";

/** Mock history shown on the demo dashboard. Clearly labelled as demonstration data. */
export const MOCK_STATS = {
  revenue: { week: 18450.75, weekDelta: 12.4 },
  orders: { today: 87, delta: 8.1 },
  avgTicket: { value: 32.4, delta: 3.2 },
  reservations: { upcomingWeek: 64, delta: 15.8 },
};

export const MOCK_ORDERS: DemoOrder[] = [
  {
    id: "EGG-JD92M",
    type: "delivery",
    customer: "K. Alvarez",
    channel: "Web demo",
    items: [
      { name: "Legendary Banana Pancakes", qty: 2, unitPrice: 13.99 },
      { name: "Roastery Signature Latte", qty: 2, unitPrice: 6.19 },
    ],
    total: 42.51,
    createdAt: new Date("2026-11-01T09:24:00").toISOString(),
    scheduledFor: "ASAP (25 min)",
  },
  {
    id: "EGG-KT71Q",
    type: "pickup",
    customer: "M. Duval",
    channel: "Web demo",
    items: [{ name: "Hangar Steak & Estate Fries", qty: 1, unitPrice: 26.49 }],
    total: 28.61,
    createdAt: new Date("2026-11-01T08:51:00").toISOString(),
    scheduledFor: "Pickup 1:15 PM",
  },
  {
    id: "EGG-PX04B",
    type: "pickup",
    customer: "R. Chen",
    channel: "Web demo",
    items: [
      { name: "Tall Order French Toast", qty: 1, unitPrice: 18.49 },
      { name: "Sunday Meatball Skillet", qty: 1, unitPrice: 15.99 },
    ],
    total: 37.22,
    createdAt: "2026-11-01T08:12:00",
    scheduledFor: "Pickup 12:40 PM",
  },
];

export const MOCK_RESERVATIONS: DemoReservation[] = [
  {
    id: "EGG-BR118",
    location: "harbourside",
    date: "2026-11-07",
    time: "10:30 AM",
    guests: 6,
    name: "L. Fontana",
    email: "guest@example.com",
    occasion: "Birthday brunch",
    createdAt: new Date("2026-11-01T07:44:00").toISOString(),
  },
  {
    id: "EGG-BR119",
    location: "market-square",
    date: "2026-11-08",
    time: "09:00 AM",
    guests: 2,
    name: "T. Osei",
    email: "guest@example.com",
    createdAt: new Date("2026-11-01T06:58:00").toISOString(),
  },
  {
    id: "EGG-BR120",
    location: "northgate",
    date: "2026-11-08",
    time: "12:15 PM",
    guests: 8,
    name: "H. Yamada",
    email: "guest@example.com",
    occasion: "Team celebration",
    createdAt: new Date("2026-10-31T20:12:00").toISOString(),
  },
];
