"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Calendar, CalendarCheck, Check, Clock, Users } from "lucide-react";
import { ButtonLink, Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_IMAGES } from "@/data/media";
import { cn } from "@/lib/utils";

const PERKS = [
  "Instant SMS & email confirmation, zero wait",
  "Large brunch gatherings & private celebrations welcome",
  "Tailored seating: Sunlit window alcove, banquette, or bar-side",
];

const GUEST_OPTIONS = [2, 4, 6, 8];
const TIME_SLOTS = ["10:00 AM", "11:30 AM", "1:15 PM", "6:00 PM"];

export function ReservationCTA() {
  const router = useRouter();
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("11:30 AM");

  const handleBook = () => {
    router.push(`/reservations?guests=${guests}&time=${encodeURIComponent(time)}`);
  };

  return (
    <section className="container pb-20 lg:pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-charcoal-900 via-charcoal-800 to-charcoal-900 border border-gold-500/30 text-cream-50 shadow-luxury">
          {/* Ambient ember glows */}
          <div className="pointer-events-none absolute -right-20 -top-20 size-80 rounded-full bg-gold-500/15 blur-3xl" aria-hidden />
          <div className="pointer-events-none absolute -bottom-24 left-1/3 size-96 rounded-full bg-brand-600/20 blur-3xl" aria-hidden />

          <div className="relative grid gap-10 p-8 sm:p-12 lg:grid-cols-[1.1fr_1fr] lg:p-16">
            <div>
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
                <span className="h-px w-8 bg-gold-400/60" aria-hidden />
                Table Reservations
              </span>
              <h2 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-5xl text-cream-50">
                Reserve your table before the weekend rush
              </h2>
              <p className="mt-4 max-w-lg text-[15px] leading-relaxed text-cream-100/75">
                Weekend mornings fill quickly. Reserve your preferred seating in under
                sixty seconds and step in to immediate hospitality.
              </p>

              <ul className="mt-7 space-y-3">
                {PERKS.map((perk) => (
                  <li key={perk} className="flex items-center gap-3 text-sm text-cream-100/90">
                    <span className="grid size-6 shrink-0 place-items-center rounded-full bg-gold-500 text-charcoal-950 font-bold">
                      <Check className="size-3.5 stroke-[3]" aria-hidden />
                    </span>
                    {perk}
                  </li>
                ))}
              </ul>

              {/* Interactive Quick Table Finder Widget */}
              <div className="mt-8 rounded-2xl bg-cream-50/10 border border-gold-400/25 p-5 backdrop-blur-md">
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-gold-300">
                  ✦ Fast Table Selector
                </p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-cream-100/80 mb-2">
                      <Users className="size-3.5 text-gold-400" />
                      <span>Party Size</span>
                    </label>
                    <div className="flex gap-2">
                      {GUEST_OPTIONS.map((num) => (
                        <button
                          key={num}
                          type="button"
                          onClick={() => setGuests(num)}
                          className={cn(
                            "flex-1 py-1.5 text-xs font-bold rounded-lg border transition",
                            guests === num
                              ? "bg-gold-500 border-gold-400 text-charcoal-900 shadow-sm"
                              : "bg-charcoal/50 border-cream-100/20 text-cream-100 hover:border-gold-400/40"
                          )}
                        >
                          {num} {num === 8 ? "+" : ""}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-cream-100/80 mb-2">
                      <Clock className="size-3.5 text-gold-400" />
                      <span>Preferred Hour</span>
                    </label>
                    <div className="grid grid-cols-2 gap-1.5">
                      {TIME_SLOTS.map((slot) => (
                        <button
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={cn(
                            "py-1.5 text-[11px] font-bold rounded-lg border transition truncate",
                            time === slot
                              ? "bg-gold-500 border-gold-400 text-charcoal-900 shadow-sm"
                              : "bg-charcoal/50 border-cream-100/20 text-cream-100 hover:border-gold-400/40"
                          )}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <Button
                    onClick={handleBook}
                    size="md"
                    className="bg-gold-500 text-charcoal-950 hover:bg-gold-400 shadow-gold-glow flex-1 font-bold"
                  >
                    <CalendarCheck className="size-4" aria-hidden />
                    Find Available Table ({guests} Guests)
                  </Button>
                </div>
              </div>
            </div>

            <div className="relative hidden min-h-[360px] overflow-hidden rounded-[2rem] border border-gold-500/20 lg:block shadow-luxury">
              <Image
                src={ABOUT_IMAGES.room}
                alt="Dining room warmly lit by pendant lamps"
                fill
                sizes="440px"
                className="object-cover"
              />
              <div className="absolute inset-x-5 bottom-5 rounded-2xl bg-charcoal-900/85 p-4 backdrop-blur-md border border-gold-400/30">
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-gold-400">
                  ✦ Host Concierge Note
                </p>
                <p className="mt-1 text-xs text-cream-100/90 leading-relaxed">
                  The sunlit window alcoves at Market Square and Downtown Flagship are our guests&apos; most-requested tables.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
