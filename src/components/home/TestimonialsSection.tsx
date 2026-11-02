"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Sparkles } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading, RatingStars } from "@/components/ui/Display";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

const PRESS_ACCOLADES = [
  { outlet: "Montréal Gazette", quote: "The undisputed benchmark for weekend brunch ritual." },
  { outlet: "Eater National", quote: "Pancake craft executed with fine dining rigor." },
  { outlet: "Culinary Guide", quote: "Rated #1 Best Breakfast Experience 2025." },
];

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  const step = (dir: 1 | -1) =>
    setActive((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="container py-20 lg:py-28 relative">
      <Reveal className="text-center">
        <SectionHeading
          align="center"
          eyebrow="Acclaim & Accolades"
          title="The regulars & critics say it best"
          description="Honored by dining critics and cherished by thousands of families and weekend brunch regulars."
        />
      </Reveal>

      {/* Press strip */}
      <Reveal delay={0.08} className="mt-10 grid gap-4 sm:grid-cols-3">
        {PRESS_ACCOLADES.map((item) => (
          <div
            key={item.outlet}
            className="rounded-2xl border border-gold-400/25 bg-cream-50/80 p-5 shadow-soft backdrop-blur text-center"
          >
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-gold-600">
              ✦ {item.outlet}
            </p>
            <p className="mt-2 text-sm italic font-display text-charcoal">
              “{item.quote}”
            </p>
          </div>
        ))}
      </Reveal>

      <Reveal delay={0.15} className="mx-auto mt-12 max-w-3xl">
        <div className="relative rounded-[2.5rem] bg-gradient-to-br from-charcoal-900 to-charcoal-800 border border-gold-500/25 px-6 py-12 text-center text-cream-50 shadow-luxury sm:px-14">
          <div className="mx-auto mb-2 flex size-12 items-center justify-center rounded-full bg-gold-500/15 border border-gold-400/30">
            <Quote className="size-5 text-gold-400" aria-hidden />
          </div>
          <div className="min-h-[168px] sm:min-h-[144px]">
            <AnimatePresence mode="wait">
              <motion.blockquote
                key={current.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.4 }}
              >
                <p className="mx-auto mt-6 max-w-2xl font-display text-xl leading-relaxed text-cream-50 sm:text-2xl">
                  “{current.quote}”
                </p>
                <footer className="mt-6">
                  <RatingStars rating={current.rating} className="justify-center" />
                  <p className="mt-3 text-sm font-bold text-gold-200">{current.name}</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-cream-100/50">
                    {current.visit}
                  </p>
                </footer>
              </motion.blockquote>
            </AnimatePresence>
          </div>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous testimonial"
              className="flex size-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 transition hover:bg-gold-500 hover:text-charcoal-900"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <div className="flex gap-0.5 py-2" role="tablist" aria-label="Testimonials">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={t.id}
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  aria-label={`Testimonial from ${t.name}`}
                  onClick={() => setActive(i)}
                  className="grid size-9 place-items-center"
                >
                  <span
                    className={cn(
                      "block rounded-full transition-all duration-300",
                      i === active ? "h-2 w-8 bg-gold-400" : "size-2 bg-cream-100/25 hover:bg-cream-100/50"
                    )}
                  />
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next testimonial"
              className="flex size-11 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 transition hover:bg-gold-500 hover:text-charcoal-900"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
