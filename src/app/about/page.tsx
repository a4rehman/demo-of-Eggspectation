import type { Metadata } from "next";
import Image from "next/image";
import { ArrowRight, Flame, HeartHandshake, Leaf, Wheat } from "lucide-react";
import { ABOUT_IMAGES } from "@/data/media";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { DemoBadge } from "@/components/ui/DemoBadge";

export const metadata: Metadata = {
  title: "Our Story",
  description:
    "How Eggspectation turned a griddle obsession into all-day brunch rooms — food philosophy, craft and rooms worth lingering in.",
};

const VALUES = [
  {
    icon: Wheat,
    title: "Mornings done properly",
    text: "Buttermilk rested overnight, brioche proofed at dawn. Breakfast shouldn't be a compressed menu — we give first meals the ceremony they deserve.",
  },
  {
    icon: Leaf,
    title: "Seasonal by default",
    text: "The menu breathes with the market. When the berries are loud, they're loud on the plate; when winter asks for slow food, we simmer.",
  },
  {
    icon: Flame,
    title: "Fire, butter & patience",
    text: "Cast-iron, real butter and cooks who taste everything. Techniques borrowed from fine dining, warmth borrowed from home.",
  },
  {
    icon: HeartHandshake,
    title: "Hospitality, unhurried",
    text: "No turning tables before the last coffee. Our rooms are built for lingering, laughing and ordering one more thing.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="texture-noise">
        <div className="container grid items-center gap-12 pb-16 pt-12 lg:grid-cols-[1.1fr_1fr] lg:pb-24 lg:pt-20">
          <div>
            <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-600">
              <span className="h-px w-8 bg-brand-400" aria-hidden /> Our story
            </span>
            <h1 className="mt-5 font-display text-5xl font-medium leading-[1.05] tracking-tight text-balance sm:text-6xl">
              It started with
              <span className="italic text-brand-600"> one perfect breakfast</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-charcoal-50/80 sm:text-lg">
              Not a chain of shortcuts — a collection of rooms built around a simple
              belief: the first meal of the day deserves the same craft as dinner
              service, and then some, because everyone&apos;s already been awake for hours.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <ButtonLink href="/reservations" withArrow>Visit a room</ButtonLink>
              <ButtonLink href="/menu" variant="outline">See the menu</ButtonLink>
            </div>
          </div>

          <div className="relative">
            <div className="relative aspect-[4/3] overflow-hidden rounded-[2.5rem] shadow-lift">
              <Image
                src={ABOUT_IMAGES.story}
                alt="Friends gathered around a table of waffles, bowls and morning dishes"
                fill
                priority
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-8 -left-6 hidden w-44 overflow-hidden rounded-[1.5rem] border-4 border-cream shadow-card sm:block lg:-left-10">
              <div className="relative aspect-[3/4]">
                <Image
                  src={ABOUT_IMAGES.detail}
                  alt="Basket of house-baked breads and pastries"
                  fill
                  sizes="176px"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline / brand intro */}
      <section className="bg-cream-100 py-20 lg:py-28">
        <div className="container grid gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              eyebrow="The short version"
              title="From single griddle to full-day table"
            />
            <div className="mt-8 space-y-8">
              {[
                {
                  heading: "The obsession",
                  text: "Before the menus, the rooms and the weekend queues, there was a single griddle and a batch of pancakes worth queuing for. Everything since has been an excuse to keep griddling.",
                },
                {
                  heading: "Beyond breakfast",
                  text: "Regulars started staying past noon — so we stayed open. Skillets, steaks and slow plates joined the menu without ever deposing the pancake.",
                },
                {
                  heading: "Today",
                  text: "Multiple rooms, one standard: honest cooking, warm light, and hospitality that behaves like a co-host rather than a transaction. You're welcome at every one of them.",
                },
              ].map((chapter, i) => (
                <div key={chapter.heading} className="flex gap-5">
                  <span className="font-display text-4xl font-semibold text-brand-200">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl font-semibold tracking-tight">{chapter.heading}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal-50/80">{chapter.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="relative aspect-[4/4.6] overflow-hidden rounded-[2.5rem] shadow-card">
              <Image
                src={ABOUT_IMAGES.kitchen}
                alt="Chef plating a griddled white fish dish with fresh herbs"
                fill
                sizes="(min-width: 1024px) 560px, 92vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 right-6 rounded-2xl bg-charcoal/80 p-5 text-cream-50 backdrop-blur">
              <p className="font-display text-lg italic">“We don&apos;t do breakfast food. We do first-meal food.”</p>
              <p className="mt-1 text-xs uppercase tracking-[0.18em] text-cream-100/60">— the kitchen&apos;s founding argument</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Values */}
      <section className="container py-20 lg:py-28">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Food philosophy"
            title="Four rules the kitchen reads every morning"
          />
        </Reveal>
        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {VALUES.map((value) => (
            <StaggerItem key={value.title}>
              <article className="flex h-full flex-col rounded-[1.75rem] bg-cream-50 p-7 shadow-soft transition-shadow duration-500 hover:shadow-card">
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                  <value.icon className="size-5" aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-lg font-semibold tracking-tight">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal-50/80">{value.text}</p>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Room strip CTA */}
      <section className="container pb-24">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2.5rem]">
            <div className="relative aspect-[16/9] min-h-[320px] w-full">
              <Image
                src={ABOUT_IMAGES.room}
                alt="Moody bar and lounge with warm pendant lighting"
                fill
                sizes="92vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-charcoal/55" />
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center text-cream-50">
              <span className="rounded-full border border-cream-50/25 px-4 py-1.5 text-[11px] font-bold uppercase tracking-[0.18em]">
                The rooms
              </span>
              <h2 className="mt-4 max-w-xl font-display text-3xl font-medium tracking-tight text-balance sm:text-5xl">
                Choose your morning, evening or everything in between
              </h2>
              <p className="mt-3 max-w-md text-sm text-cream-100/80 sm:text-base">
                Three rooms, one standard of hospitality.
              </p>
              <ButtonLink href="/locations" variant="light" size="lg" withArrow className="mt-7">
                Explore locations
              </ButtonLink>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 flex justify-center">
          <DemoBadge />
        </div>
      </section>
    </>
  );
}
