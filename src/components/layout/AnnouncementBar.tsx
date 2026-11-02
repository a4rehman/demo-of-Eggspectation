"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Sunrise, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

const MESSAGES = [
  "Weekend brunch every Saturday & Sunday — bottomless mimosa bar until 3 PM",
  "20% off signature plates on weekday breakfasts before 10 AM",
  "Order online for pickup or delivery — now open for demo",
];

export function AnnouncementBar() {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");
  const [visible, setVisible] = useState(true);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % MESSAGES.length),
      6000
    );
    return () => clearInterval(timer);
  }, []);

  if (isAdmin) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          className="overflow-hidden bg-charcoal text-cream-100"
        >
          <div className="container flex h-10 items-center justify-center gap-3 text-xs font-medium tracking-wide">
            <Sunrise className="hidden size-4 shrink-0 text-brand-300 sm:block" aria-hidden />
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ y: 8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="truncate"
              >
                {MESSAGES[index]}
              </motion.p>
            </AnimatePresence>
            <button
              type="button"
              aria-label="Dismiss announcement"
              onClick={() => setVisible(false)}
              className="ml-1 rounded-full p-1 text-cream-100/60 transition hover:text-cream-50"
            >
              <X className="size-3.5" aria-hidden />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
