"use client";

import Image from "next/image";
import { ChefHat, Clock3, HeartHandshake, Leaf } from "lucide-react";
import { EXPERIENCE_IMAGES } from "@/data/media";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal } from "@/components/ui/Reveal";

const PRINCIPLES = [
  {
    icon: ChefHat,
    title: "Made from scratch",
    text: "Brioche at dawn, custards overnight, syrups simmered in small batches. Nothing on the plate arrives from a warehouse.",
  },
  {
    icon: Leaf,
    title: "Market-first ingredients",
    text: "We build the menu backwards from what's actually good this week — the produce leads, the recipes follow.",
  },
  {
    icon: Clock3,
    title: "Brunch without a clock",
    text: "Pancakes at nine or a steak frites at nine at night. Our kitchens run one menu from open to close, no 'breakfast ended' sighs.",
  },
  {
    icon: HeartHandshake,
    title: "Rooms that feel like yours",
    text: "Window seats for slow mornings, long tables for loud friends, fireside corners for date night. Sit wherever feels right.",
  },
];

export function ExperienceSection() {
  return (
    <section className="container py-20 lg:py-28 relative overflow-hidden">
      {/* Subtle warm backlight */}
      <div className="pointer-events-none absolute left-10 top-1/2 -translate-y-1/2 size-96 rounded-full bg-gold-200/20 blur-3xl -z-10" />

      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/4.4] w-full max-w-[480px] overflow-hidden rounded-[2.5rem] shadow-luxury border border-cream-200/80">
            <Image
              src={EXPERIENCE_IMAGES.craft}
              alt="A table spread with smoothie bowls, waffles, fresh berries and coffee"
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-0 hidden w-56 overflow-hidden rounded-[1.75rem] border-4 border-cream shadow-luxury sm:block lg:-right-8">
            <div className="relative aspect-square">
              <Image
                src={EXPERIENCE_IMAGES.room}
                alt="Bright, plant-filled dining room with communal wooden tables"
                fill
                sizes="224px"
                className="object-cover"
              />
            </div>
          </div>

          {/* Luxury Floating Heritage Seal */}
          <div className="absolute -top-6 -left-6 grid size-32 place-items-center rounded-full bg-gradient-to-br from-charcoal-800 to-charcoal-900 border-2 border-gold-400 text-cream-50 shadow-luxury sm:size-36">
            <div className="text-center p-2">
              <span className="block text-[10px] font-bold uppercase tracking-[0.24em] text-gold-400">EST. 1993</span>
              <p className="font-display text-2xl font-semibold italic text-cream-50">
                Montréal
              </p>
              <span className="mt-0.5 block text-[9px] font-bold uppercase tracking-[0.16em] text-cream-100/70">Heritage Craft</span>
            </div>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="The Heritage"
            title="A neighbourhood institution with a roaring griddle at its heart"
            description="Eggspectation began with one simple obsession: treat the morning meal with the culinary rigor dinner usually gets. Over 30 years later, that commitment has built a beloved tradition of all-day brunch, custom roasted beans, and warm rooms that welcome you to linger."
          />
          <ul className="mt-10 space-y-6">
            {PRINCIPLES.map((principle, i) => (
              <li key={principle.title} className="group rounded-2xl p-3 transition-colors hover:bg-cream-100/60">
                <Reveal delay={0.08 * i} className="flex gap-5 items-start">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cream-50 border border-gold-400/30 text-gold-600 shadow-soft transition-transform group-hover:scale-105">
                    <principle.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight text-charcoal group-hover:text-brand-700 transition-colors">
                      {principle.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-charcoal-50/80">
                      {principle.text}
                    </p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
