import type { Metadata } from "next";
import { Suspense } from "react";
import { OrderClient } from "@/components/ordering/OrderClient";

export const metadata: Metadata = {
  title: "Order Online",
  description:
    "Build your bag, choose delivery or pickup, and check out in under a minute. Interactive demo — no real orders are processed.",
};

export default function OrderPage() {
  return (
    <Suspense>
      <OrderClient />
    </Suspense>
  );
}
