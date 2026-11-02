"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { getFeaturedItems } from "@/data/menu";
import type { MenuItem } from "@/types";
import { DishCard } from "@/components/menu/DishCard";
import { DishModal } from "@/components/menu/DishModal";
import { SectionHeading } from "@/components/ui/Display";
import { StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function FeaturedDishes() {
  const items = getFeaturedItems().slice(0, 4);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  return (
    <section className="container py-20 lg:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Most loved"
          title="The plates people whisper about"
          description="Five-star dishes that keep tables coming back — from the stack that started it all to griddle craft after dark."
        />
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition hover:text-brand-700"
        >
          View full menu
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>

      <StaggerGroup className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item) => (
          <StaggerItem key={item.id}>
            <DishCard item={item} onOpen={setModalItem} className="h-full" />
          </StaggerItem>
        ))}
      </StaggerGroup>

      <DishModal item={modalItem} onClose={() => setModalItem(null)} />
    </section>
  );
}
