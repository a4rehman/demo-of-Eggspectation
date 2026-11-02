"use client";

import Image from "next/image";
import { ArrowRight, BadgePercent } from "lucide-react";
import Link from "next/link";
import { SPECIAL_OFFERS } from "@/data/media";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal } from "@/components/ui/Reveal";

export function SpecialOffers() {
  return (
    <section className="container pb-20 lg:pb-28">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Special offers"
          title="Reasons to arrive hungry"
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {SPECIAL_OFFERS.map((offer, i) => (
          <Reveal key={offer.id} delay={0.1 * i}>
            <article className="group relative flex flex-col overflow-hidden rounded-[2rem] bg-charcoal text-cream-50 shadow-soft sm:flex-row">
              <div className="relative h-52 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[46%]">
                <Image
                  src={offer.image}
                  alt={offer.title}
                  fill
                  sizes="(min-width: 1024px) 300px, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col p-6 sm:p-8">
                <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-brand-500 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em]">
                  <BadgePercent className="size-3.5" aria-hidden />
                  {offer.badge}
                </span>
                <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight">
                  {offer.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-cream-100/70">
                  {offer.description}
                </p>
                <Link
                  href={offer.ctaHref}
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-cream-50/25 px-5 py-2.5 text-sm font-semibold transition group-hover:border-brand-400 group-hover:bg-brand-500"
                >
                  {offer.ctaLabel}
                  <ArrowRight className="size-4" aria-hidden />
                </Link>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
