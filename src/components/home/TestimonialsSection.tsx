"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";
import { SectionHeading, RatingStars } from "@/components/ui/Display";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS[active];

  const step = (dir: 1 | -1) =>
    setActive((i) => (i + dir + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="container py-20 lg:py-28">
      <Reveal className="text-center">
        <SectionHeading
          align="center"
          eyebrow="Guest stories"
          title="The regulars say it best"
        />
      </Reveal>

      <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
        <div className="relative rounded-[2.5rem] bg-charcoal px-6 py-12 text-center text-cream-50 shadow-card sm:px-14">
          <Quote className="mx-auto size-8 text-brand-400" aria-hidden />
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
                  <p className="mt-3 text-sm font-bold">{current.name}</p>
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
                className="flex size-11 items-center justify-center rounded-full bg-cream-100/10 transition hover:bg-brand-500"
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
                        i === active ? "h-2.5 w-7 bg-brand-400" : "size-2.5 bg-cream-100/25 hover:bg-cream-100/50"
                      )}
                    />
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => step(1)}
                aria-label="Next testimonial"
                className="flex size-11 items-center justify-center rounded-full bg-cream-100/10 transition hover:bg-brand-500"
              >
                <ChevronRight className="size-5" aria-hidden />
              </button>
            </div>
        </div>
      </Reveal>
    </section>
  );
}
