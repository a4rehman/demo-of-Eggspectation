"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Bean,
  Croissant,
  FlameKindling,
  Leaf,
  Salad,
  Sparkles,
} from "lucide-react";
import { getCategoriesWithCounts } from "@/data/menu";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

const CATEGORY_ICONS: Record<string, typeof Sparkles> = {
  signature: Sparkles,
  grills: FlameKindling,
  greens: Leaf,
  comfort: Salad,
  bakery: Croissant,
  sips: Bean,
};

export function MenuCategories() {
  const categories = getCategoriesWithCounts();

  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Explore the menu"
            title="Six rooms of one delicious house"
            description="Whether it's a slow Sunday stack, a power-lunch bowl or a Tuesday that needs some comfort — start where your appetite is."
          />
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => {
            const Icon = CATEGORY_ICONS[category.id] ?? Sparkles;
            return (
              <StaggerItem key={category.id}>
                <Link
                  href={`/menu?category=${category.id}`}
                  className="group relative block overflow-hidden rounded-[1.75rem] bg-charcoal shadow-soft transition-shadow duration-500 hover:shadow-card"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.tagline}
                      fill
                      sizes="(min-width: 1024px) 420px, 92vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/25 to-transparent" />
                  </div>
                  <div className="relative -mt-16 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-11 items-center justify-center rounded-full bg-brand-500/20 text-brand-300 backdrop-blur transition-colors group-hover:bg-brand-500 group-hover:text-cream-50">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="rounded-full bg-cream-50/15 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] text-cream-100/80 backdrop-blur">
                        {category.count} dishes
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-xl font-semibold tracking-tight text-cream-50">
                      {category.name}
                    </h3>
                    <p className="mt-1 text-sm text-cream-100/65">{category.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-brand-300 transition-all duration-300 group-hover:gap-3">
                      Explore collection →
                    </span>
                  </div>
                </Link>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
