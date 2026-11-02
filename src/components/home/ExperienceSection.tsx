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
    <section className="container py-20 lg:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal className="relative order-2 lg:order-1">
          <div className="relative aspect-[4/4.4] w-full max-w-[480px] overflow-hidden rounded-[2.5rem] shadow-card">
            <Image
              src={EXPERIENCE_IMAGES.craft}
              alt="A table spread with smoothie bowls, waffles, fresh berries and coffee"
              fill
              sizes="(min-width: 1024px) 480px, 92vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-8 right-0 hidden w-56 overflow-hidden rounded-[1.5rem] border-4 border-cream shadow-card sm:block lg:-right-8">
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
          <div className="absolute -top-6 -left-6 grid size-32 place-items-center rounded-full bg-brand-500 text-cream-50 shadow-glow-brand sm:size-36">
            <p className="text-center font-display text-3xl font-semibold italic">
              Brunch
              <span className="mt-1 block text-xl font-bold uppercase not-italic tracking-[0.2em] text-cream-50/90">all day</span>
            </p>
          </div>
        </Reveal>

        <div className="order-1 lg:order-2">
          <SectionHeading
            eyebrow="The experience"
            title="A neighbourhood restaurant with a griddle at its heart"
            description="Eggspectation began with one obsession: do breakfast with the care dinner usually gets. Twenty years later, that idea has grown into all-day brunch rooms where the coffee is taken seriously and nobody rushes you out."
          />
          <ul className="mt-10 space-y-7">
            {PRINCIPLES.map((principle, i) => (
              <li key={principle.title} className="flex gap-5">
                <Reveal delay={0.08 * i} className="flex gap-5">
                  <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-cream-100 text-brand-600 shadow-soft">
                    <principle.icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <h3 className="font-display text-lg font-semibold tracking-tight">
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
