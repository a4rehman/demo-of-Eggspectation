"use client";

import { SectionReveal } from "@/components/ui/SectionReveal";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Coffee, Flame, Sparkles, Star, UtensilsCrossed, Award } from "lucide-react";
import { ButtonLink } from "@/components/ui/Button";
import { HERO_IMAGES } from "@/data/media";

const QUICK_MOODS = [
  { label: "🥞 Legendary Stacks", href: "/menu?category=signature" },
  { label: "🍳 Skillets & Grills", href: "/menu?category=grills" },
  { label: "🥑 Greens & Bowls", href: "/menu?category=greens" },
  { label: "☕ Roastery Sips", href: "/menu?category=sips" },
];

export function Hero() {
  return (
    <section className="texture-noise relative overflow-hidden">
      {/* Radiant ambient glow effects */}
      <div className="pointer-events-none absolute -left-36 top-16 size-[560px] rounded-full bg-gradient-to-tr from-gold-300/35 via-brand-200/25 to-transparent blur-3xl" aria-hidden />
      <div className="pointer-events-none absolute right-0 top-1/4 size-[500px] rounded-full bg-gradient-to-bl from-brand-300/25 via-gold-200/20 to-transparent blur-3xl" aria-hidden />

      <SectionReveal>
          <div className="container relative grid items-center gap-14 pb-20 pt-12 lg:grid-cols-[1.1fr_1fr] lg:gap-12 lg:pb-28 lg:pt-16">
        <div className="max-w-2xl">
          {/* Luxury Eyebrow / Award Tag */}
          <div className="inline-flex flex-wrap items-center gap-2.5 rounded-full border border-gold-400/40 bg-cream-50/90 px-4 py-1.5 shadow-soft backdrop-blur">
            <span className="flex items-center gap-1 text-gold-600">
              <Award className="size-4 text-gold-500 fill-gold-400/30" aria-hidden />
              <span className="text-[11px] font-bold uppercase tracking-[0.16em]">
                Culinary Excellence
              </span>
            </span>
            <span className="size-1 rounded-full bg-charcoal/20" />
            <div className="flex items-center gap-1">
              <Star className="size-3.5 fill-gold-500 text-gold-500" aria-hidden />
              <span className="text-xs font-bold text-charcoal">4.9 / 5.0</span>
              <span className="text-xs text-charcoal-50/70">(2,800+ reviews)</span>
            </div>
          </div>

          <h1 className="mt-6 font-display text-5xl font-medium leading-[1.04] tracking-tight text-balance sm:text-7xl lg:text-[76px]">
            Breakfast elevated to an
            <span className="relative ml-3 inline-block italic gold-gradient-text font-semibold">
              art form
              <svg
                className="absolute -bottom-2 left-0 w-full text-gold-400"
                viewBox="0 0 220 12"
                fill="none"
                aria-hidden
              >
                <path
                  d="M3 9C60 3 160 3 217 8"
                  stroke="currentColor"
                  strokeWidth="4"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-charcoal-50/85 sm:text-lg">
            Golden brioche pancakes, slow-simmered cast iron skillets and single-origin
            latte craft. An artisanal morning tradition born in Montréal, perfected all day.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <ButtonLink href="/order" size="lg" withArrow className="shadow-gold-glow">
              Order Online Now
            </ButtonLink>
            <ButtonLink href="/reservations" size="lg" variant="outline" className="border-charcoal/25 hover:border-gold-500 hover:text-gold-700">
              Book a Table
            </ButtonLink>
          </div>

          {/* Quick mood selector */}
          <div className="mt-8 flex flex-wrap items-center gap-2 pt-2">
            <span className="text-[11px] font-bold uppercase tracking-[0.16em] text-charcoal-50/70 mr-1">
              Explore:
            </span>
            {QUICK_MOODS.map((mood) => (
              <Link
                key={mood.label}
                href={mood.href}
                className="rounded-full border border-cream-300 bg-cream-50/80 px-3.5 py-1 text-xs font-semibold text-charcoal-600 transition hover:border-gold-400 hover:bg-gold-50 hover:text-gold-800"
              >
                {mood.label}
              </Link>
            ))}
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 border-t border-cream-200/80 pt-6">
            {[
              { value: "100%", label: "From-scratch daily" },
              { value: "32+", label: "Artisan recipes" },
              { value: "1993", label: "Heritage origin" },
            ].map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-3xl font-semibold text-charcoal">
                  {stat.value}
                </dd>
                <dd className="mt-0.5 text-xs font-semibold uppercase tracking-[0.14em] text-charcoal-50/70">
                  {stat.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Luxury Image Composition */}
        <div className="relative mx-auto w-full max-w-[540px] lg:max-w-none">
          <div className="relative aspect-[4/4.6] w-full sm:aspect-[4/4.2]">
            {/* Ambient golden halo behind main dish */}
            <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-tr from-gold-400/30 to-brand-500/20 blur-2xl -z-10" />

            <div className="relative h-[80%] w-full overflow-hidden rounded-[2.5rem] shadow-luxury border border-cream-200/60">
              <Image
                src={HERO_IMAGES.main}
                alt="Stack of legendary pancakes drizzled with maple syrup"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-charcoal/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-6 right-6 flex items-center justify-between text-cream-50 text-xs">
                <span className="font-bold tracking-wider uppercase text-[10px] bg-charcoal/70 backdrop-blur-md px-3 py-1 rounded-full border border-gold-400/30">
                  ✦ Signature Dish: Legendary Banana Stack
                </span>
                <span className="font-bold text-gold-300 drop-shadow">$13.99</span>
              </div>
            </div>

            {/* Secondary Floating Image */}
            <div className="absolute -bottom-6 -left-4 h-[38%] w-[46%] overflow-hidden rounded-[2rem] border-4 border-cream shadow-luxury sm:-left-6">
              <Image
                src={HERO_IMAGES.secondary}
                alt="Rosetta latte art in a ceramic cup"
                fill
                sizes="240px"
                className="object-cover"
              />
              <div className="absolute bottom-2 left-3 right-3 rounded-xl bg-charcoal/80 p-1.5 px-2.5 backdrop-blur-md text-[10px] font-bold text-cream-100 flex items-center gap-1.5">
                <Coffee className="size-3 text-gold-400" />
                <span>Single-Origin Roasts</span>
              </div>
            </div>

            {/* Floating Luxury Tag Top Right */}
            <div className="animate-floaty absolute -right-2 top-6 rounded-2xl glass-panel p-3.5 shadow-card sm:-right-6 border border-gold-300/40">
              <p className="flex items-center gap-2 text-xs font-bold text-charcoal">
                <Sparkles className="size-4 text-gold-500 fill-gold-400" aria-hidden />
                <span>Stone-Ground & Farm-Fresh</span>
              </p>
              <p className="mt-0.5 text-[11px] text-charcoal-50/75">Simmered in small batches</p>
            </div>

            {/* Accent Fruit Plate */}
            <div className="absolute -right-3 bottom-10 h-[30%] w-[34%] overflow-hidden rounded-[1.75rem] border-4 border-cream shadow-card sm:-right-6">
              <Image
                src={HERO_IMAGES.accent}
                alt="Chilled orchard fruit plate"
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
