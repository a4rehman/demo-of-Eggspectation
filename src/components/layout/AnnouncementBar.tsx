"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const ANNOUNCEMENTS = [
  {
    badge: "WEEKEND BRUNCH",
    text: "Bottomless mimosa bar & artisan brioche specials every Saturday & Sunday",
    linkText: "Reserve a table",
    href: "/reservations",
  },
  {
    badge: "SUNRISE REWARD",
    text: "Enjoy 20% off all signature plates weekday mornings before 10 AM",
    linkText: "View morning menu",
    href: "/menu",
  },
  {
    badge: "CULINARY TO-GO",
    text: "Order artisan breakfast & handcrafted coffee directly to your door",
    linkText: "Order online",
    href: "/order",
  },
];

export function AnnouncementBar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % ANNOUNCEMENTS.length),
      6500
    );
    return () => clearInterval(timer);
  }, []);

  if (isAdmin) return null;

  const current = ANNOUNCEMENTS[index];

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="relative overflow-hidden bg-gradient-to-r from-charcoal-900 via-charcoal-800 to-charcoal-900 text-cream-100 border-b border-gold-500/20"
        >
          <div className="container flex h-11 items-center justify-between gap-4 text-xs font-medium tracking-wide">
            <div className="hidden sm:flex items-center gap-1.5 text-gold-400 font-bold uppercase tracking-[0.2em] text-[10px]">
              <Sparkles className="size-3 text-gold-400" aria-hidden />
              <span>Special Offer</span>
            </div>

            <div className="flex-1 flex items-center justify-center overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={index}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                  className="flex items-center gap-2 truncate"
                >
                  <span className="hidden md:inline-flex rounded-full bg-gold-500/15 border border-gold-400/30 px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.16em] text-gold-300">
                    {current.badge}
                  </span>
                  <span className="truncate text-cream-100/90 font-medium">
                    {current.text}
                  </span>
                  <Link
                    href={current.href}
                    className="ml-1 inline-flex items-center gap-1 font-bold text-gold-400 hover:text-gold-300 underline underline-offset-4 decoration-gold-400/50 hover:decoration-gold-300 shrink-0 transition"
                  >
                    <span>{current.linkText}</span>
                    <span aria-hidden>→</span>
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>

            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setVisible(false)}
              className="rounded-full p-1 text-cream-100/50 transition hover:bg-cream-50/10 hover:text-cream-50 shrink-0"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
