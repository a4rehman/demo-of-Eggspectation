"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { ReactNode } from "react";
import type { CartItem } from "@/types";

const CART_KEY = "eggspectation-demo-cart-v1";

export type AddToCartInput = {
  id: string;
  name: string;
  image: string;
  basePrice: number;
  qty: number;
  options?: Array<{ name: string; price: number }>;
};

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
  addItem: (input: AddToCartInput) => void;
  updateQty: (key: string, qty: number) => void;
  removeItem: (key: string) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
};

const CartContext = createContext<CartContextValue | null>(null);

function buildKey(id: string, options: Array<{ name: string }>): string {
  const names = options.map((o) => o.name).sort().join("|");
  return names ? `${id}::${names}` : id;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(CART_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.items)) setItems(parsed.items);
      }
    } catch {
      /* ignore corrupted demo state */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(CART_KEY, JSON.stringify({ items }));
    } catch {
      /* storage unavailable */
    }
  }, [items, hydrated]);

  const addItem = useCallback((input: AddToCartInput) => {
    const options = input.options ?? [];
    const key = buildKey(input.id, options);
    const optionPrice = options.reduce((sum, o) => sum + o.price, 0);
    setItems((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, qty: Math.min(20, item.qty + input.qty) }
            : item
        );
      }
      return [
        ...prev,
        {
          key,
          id: input.id,
          name: input.name,
          image: input.image,
          basePrice: input.basePrice,
          unitPrice: Math.round((input.basePrice + optionPrice) * 100) / 100,
          qty: input.qty,
          options: options.map((o) => o.name),
        },
      ];
    });
  }, []);

  const updateQty = useCallback((key: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((item) => item.key !== key)
        : prev.map((item) =>
            item.key === key ? { ...item, qty: Math.min(20, qty) } : item
          )
    );
  }, []);

  const removeItem = useCallback((key: string) => {
    setItems((prev) => prev.filter((item) => item.key !== key));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  const { itemCount, subtotal } = useMemo(() => {
    return items.reduce(
      (acc, item) => ({
        itemCount: acc.itemCount + item.qty,
        subtotal: acc.subtotal + item.unitPrice * item.qty,
      }),
      { itemCount: 0, subtotal: 0 }
    );
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      itemCount,
      subtotal: Math.round(subtotal * 100) / 100,
    }),
    [
      items,
      hydrated,
      drawerOpen,
      openDrawer,
      closeDrawer,
      addItem,
      updateQty,
      removeItem,
      clearCart,
      itemCount,
      subtotal,
    ]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
