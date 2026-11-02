import type { DemoOrder, DemoReservation } from "@/types";

const ORDERS_KEY = "eggspectation-demo-orders-v1";
const RESERVATIONS_KEY = "eggspectation-demo-reservations-v1";

export const DEMO_TAX_RATE = 0.08;

function readJSON<T>(key: string): T[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : [];
  } catch {
    return [];
  }
}

function writeJSON<T>(key: string, value: T[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable — demo data simply won't persist */
  }
}

export function getDemoOrders(): DemoOrder[] {
  return readJSON<DemoOrder>(ORDERS_KEY);
}

export function saveDemoOrder(order: DemoOrder) {
  const all = getDemoOrders();
  all.unshift(order);
  writeJSON(ORDERS_KEY, all.slice(0, 30));
}

export function getDemoReservations(): DemoReservation[] {
  return readJSON<DemoReservation>(RESERVATIONS_KEY);
}

export function saveDemoReservation(reservation: DemoReservation) {
  const all = getDemoReservations();
  all.unshift(reservation);
  writeJSON(RESERVATIONS_KEY, all.slice(0, 30));
}
