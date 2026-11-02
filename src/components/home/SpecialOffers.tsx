"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight, BadgePercent, Check, Copy } from "lucide-react";
import Link from "next/link";
import { SPECIAL_OFFERS } from "@/data/media";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal } from "@/components/ui/Reveal";

const PROMO_CODES: Record<string, string> = {
  "early-bird": "SUNRISE20",
  "mimosa-weekend": "BRUNCHMIMOSA",
};

export function SpecialOffers() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <section className="container pb-20 lg:pb-28">
      <Reveal>
        <SectionHeading
          align="center"
          eyebrow="Curated Privileges"
          title="Exclusive offers for our table guests"
          description="Seasonal perks and morning privileges crafted to make every visit memorable."
        />
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {SPECIAL_OFFERS.map((offer, i) => {
          const code = PROMO_CODES[offer.id] || "DEGUSTATION";
          const isCopied = copiedCode === code;

          return (
            <Reveal key={offer.id} delay={0.1 * i}>
              <article className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-charcoal-900 to-charcoal-800 text-cream-50 border border-gold-500/25 shadow-luxury transition-all duration-500 hover:border-gold-400/50 hover:shadow-card-hover sm:flex-row">
                <div className="relative h-60 w-full shrink-0 overflow-hidden sm:h-auto sm:w-[46%]">
                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="(min-width: 1024px) 300px, 92vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900 via-transparent to-transparent sm:bg-gradient-to-r sm:from-transparent sm:to-charcoal-900" />
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-8">
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-gold-500/20 border border-gold-400/40 px-3.5 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
                      <BadgePercent className="size-3.5 text-gold-400" aria-hidden />
                      {offer.badge}
                    </span>

                    <button
                      type="button"
                      onClick={() => copyCode(code)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-cream-50/10 px-3 py-1 text-[11px] font-mono font-bold text-cream-100 hover:bg-gold-500/20 hover:text-gold-300 transition"
                      title="Click to copy promo code"
                    >
                      {isCopied ? (
                        <>
                          <Check className="size-3 text-emerald-400" />
                          <span className="text-emerald-300 text-[10px]">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="size-3 text-cream-100/60" />
                          <span>{code}</span>
                        </>
                      )}
                    </button>
                  </div>

                  <h3 className="mt-4 font-display text-2xl font-semibold tracking-tight text-cream-50">
                    {offer.title}
                  </h3>
                  <p className="mt-2.5 flex-1 text-sm leading-relaxed text-cream-100/75">
                    {offer.description}
                  </p>
                  <div className="mt-6 flex items-center justify-between gap-4 pt-4 border-t border-cream-100/10">
                    <Link
                      href={offer.ctaHref}
                      className="inline-flex w-fit items-center gap-2 rounded-full bg-gold-500 px-5 py-2.5 text-sm font-semibold text-charcoal-900 shadow-gold-glow transition hover:bg-gold-400 active:scale-95"
                    >
                      <span>{offer.ctaLabel}</span>
                      <ArrowRight className="size-4" aria-hidden />
                    </Link>
                    <span className="text-[11px] text-cream-100/50">Limited availability</span>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
