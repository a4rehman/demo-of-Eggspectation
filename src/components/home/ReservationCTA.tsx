"use client";

import Image from "next/image";
import { CalendarCheck, Check, PhoneCall } from "lucide-react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_IMAGES } from "@/data/media";

const PERKS = [
  "Instant confirmation, zero hold music",
  "Large tables & brunch clubs welcome",
  "Requests noted — window seats, highchairs, celebrations",
];

export function ReservationCTA() {
  return (
    <section className="container pb-20 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-charcoal shadow-card">
          <div className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-brand-500/20 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 size-80 rounded-full bg-brand-700/30 blur-3xl" aria-hidden />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.2fr_1fr] lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em] text-brand-300">
                <span className="h-px w-8 bg-brand-300/60" aria-hidden />
                Reservations
              </span>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl">
                Save the table before the Saturday rush
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream-100/70">
                Weekends fill up by Thursday. Book in under a minute and walk in
                like you own the place.
              </p>

              <ul className="mt-8 space-y-3">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-cream-100/85">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-brand-500">
                      <Check className="size-3.5" aria-hidden />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex flex-wrap gap-4">
                <ButtonLink href="/reservations" size="lg" variant="primary" withArrow>
                  <CalendarCheck className="size-4" aria-hidden />
                  Reserve now (demo)
                </ButtonLink>
                <Button size="lg" variant="ghost" className="text-cream-100 hover:bg-cream-100/10" onClick={() => window.open("tel:+15550000000")}>
                  <PhoneCall className="size-4" aria-hidden /> Call (demo placeholder)
                </Button>
              </div>
            </div>

            <div className="relative hidden min-h-[320px] overflow-hidden rounded-[1.75rem] lg:block">
              <Image
                src={ABOUT_IMAGES.room}
                alt="Warm bar and dining room lit by pendant lamps in the evening"
                fill
                sizes="440px"
                className="object-cover"
              />
              <div className="absolute inset-x-4 bottom-4 rounded-2xl bg-charcoal/70 p-4 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-300">Tonight&apos;s hint</p>
                <p className="mt-1 text-sm text-cream-100/80">
                  The window counter at Market Square is our most-guested table.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
