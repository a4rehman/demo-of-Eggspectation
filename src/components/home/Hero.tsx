"use client";

import Image from "next/image";
import { ArrowRight, Star, UtensilsCrossed } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HERO_IMAGES } from "@/data/media";

export function Hero() {
  return (
    <section className="texture-noise relative overflow-hidden">
      {/* soft warm blobs */}
      <div className="pointer-events-none absolute -left-40 top-24 size-[480px] rounded-full bg-brand-100/60 blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute -right-32 bottom-0 size-[420px] rounded-full bg-cream-200/70 blur-3xl" aria-hidden />

      <div className="container relative grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.05fr_1fr] lg:gap-8 lg:pb-28 lg:pt-20">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-50 px-4 py-2 shadow-soft">
            <Star className="size-4 fill-brand-500 text-brand-500" aria-hidden />
            <span className="text-xs font-bold tracking-wide text-charcoal-600">
              Rated 4.9 by our weekend regulars
            </span>
          </div>

          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.02] tracking-tight text-balance sm:text-7xl">
            Breakfast worth
            <span className="relative ml-3 inline-block italic text-brand-600">
              waking up for
              <svg
                className="absolute -bottom-2 left-0 w-full text-brand-300"
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 9C60 3 160 3 217 8"
                  stroke="currentColor"
                  strokeWidth="5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-charcoal-50/80 sm:text-lg">
            Legendary pancakes, slow-braised skillets and latte art worth the
            detour — served all day in rooms designed for lingering.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <ButtonLink href="/order" size="lg" withArrow>
              Order online
            </ButtonLink>
            <ButtonLink href="/reservations" size="lg" variant="outline">
              Book a table
            </ButtonLink>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {[
              { value: "12+", label: "Signature plates" },
              { value: "6", label: "Menu collections" },
              { value: "3", label: "Locations & growing" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold text-charcoal">
                  {stat.value}
                </dd>
                <dd className="mt-1 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-50/75">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Image composition */}
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="relative aspect-[4/4.6] w-full sm:aspect-[4/4.2]">
            <div className="relative h-[78%] w-full overflow-hidden rounded-[2.5rem] shadow-lift">
              <Image
                src={HERO_IMAGES.main}
                alt="Stack of our legendary pancakes drizzled with maple syrup just before serving"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-6 -left-4 h-[36%] w-[46%] overflow-hidden rounded-[1.75rem] border-4 border-cream shadow-card sm:-left-8">
              <Image
                src={HERO_IMAGES.secondary}
                alt="Rosetta latte art in a ceramic cup surrounded by plants"
                fill
                sizes="240px"
                className="object-cover"
              />
            </div>

            <div className="animate-floaty absolute -right-2 top-6 rounded-2xl bg-cream-50/95 px-4 py-3 shadow-card backdrop-blur sm:-right-6">
              <p className="flex items-center gap-2 text-xs font-bold">
                <UtensilsCrossed className="size-4 text-brand-500" aria-hidden />
                Made from scratch, daily
              </p>
            </div>

            <div className="absolute -right-3 bottom-10 h-[30%] w-[34%] overflow-hidden rounded-[1.5rem] border-4 border-cream shadow-card sm:-right-6">
              <Image
                src={HERO_IMAGES.accent}
                alt="Chilled plate of orchard fruit at its seasonal peak"
                fill
                sizes="180px"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
