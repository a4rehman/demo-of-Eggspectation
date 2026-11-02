import type { Metadata } from "next";
import { Suspense } from "react";
import { MenuClient } from "@/components/menu/MenuClient";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export const metadata: Metadata = {
  title: "Menu",
  description:
    "Browse the full Eggspectation menu — signature plates, grills & skillets, greens & bowls, bakery, coffee and sips. (Concept demo)",
};

export default function MenuPage() {
  return (
    <>
      <Suspense>
        <MenuClient />
      </Suspense>
      <NewsletterSection />
    </>
  );
}
