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
                  className="group relative block overflow-hidden rounded-[2rem] bg-charcoal-900 border border-charcoal-700/60 shadow-soft transition-all duration-500 hover:shadow-card-hover hover:-translate-y-1 hover:border-gold-400/40"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <Image
                      src={category.image}
                      alt={category.tagline}
                      fill
                      sizes="(min-width: 1024px) 420px, 92vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-charcoal-900/40 to-transparent" />
                  </div>
                  <div className="relative -mt-16 p-6">
                    <div className="flex items-center justify-between gap-3">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-gold-500/20 text-gold-300 border border-gold-400/30 backdrop-blur transition-all duration-300 group-hover:bg-gold-500 group-hover:text-cream-50 group-hover:shadow-gold-glow">
                        <Icon className="size-5" aria-hidden />
                      </span>
                      <span className="rounded-full bg-cream-50/15 border border-cream-50/20 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-gold-200 backdrop-blur">
                        {category.count} dishes
                      </span>
                    </div>
                    <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-cream-50 transition-colors group-hover:text-gold-200">
                      {category.name}
                    </h3>
                    <p className="mt-1.5 text-sm text-cream-100/70">{category.tagline}</p>
                    <span className="mt-4 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-gold-400 transition-all duration-300 group-hover:gap-3 group-hover:text-gold-300">
                      Explore Collection →
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
