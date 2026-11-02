"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getFeaturedItems, MENU_ITEMS } from "@/data/menu";
import type { MenuItem } from "@/types";
import { DishCard } from "@/components/menu/DishCard";
import { DishModal } from "@/components/menu/DishModal";
import { SectionReveal } from "@/components/ui/SectionReveal";

import { cn } from "@/lib/utils";

const FILTER_TABS = [
  { id: "all", label: "All Highlights" },
  { id: "signature", label: "Sweet Stacks" },
  { id: "grills", label: "Savoury Grills" },
  { id: "greens", label: "Harvest Bowls" },
];

export function FeaturedDishes() {
  const [activeTab, setActiveTab] = useState("all");
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  const displayedItems = useMemo(() => {
    const featured = getFeaturedItems();
    if (activeTab === "all") return featured.slice(0, 8);
    const inCategory = MENU_ITEMS.filter((item) => item.category === activeTab);
    return inCategory.slice(0, 4);
  }, [activeTab]);

  return (
    <section className="container py-20 lg:py-28">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeading
          eyebrow="Chef's Selection"
          title="The plates people whisper about"
          description="Five-star dishes that keep tables coming back — from the stack that started it all in Montréal to skillet craft straight from the fire."
        />
        <Link
          href="/menu"
          className="group inline-flex items-center gap-2 rounded-full border border-cream-300 bg-cream-50 px-5 py-2.5 text-sm font-bold text-brand-600 shadow-soft transition hover:border-gold-400 hover:text-brand-700 hover:shadow-card w-fit"
        >
          <span>Explore full menu</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>

      {/* Interactive category pills */}
      <div className="mt-8 flex flex-wrap items-center gap-2 border-b border-cream-200/80 pb-4">
        {FILTER_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-bold transition-all duration-300",
              activeTab === tab.id
                ? "bg-charcoal text-cream-50 shadow-soft"
                : "bg-cream-100 text-charcoal-600 hover:bg-cream-200 hover:text-charcoal"
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <motion.div
        layout
        className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4"
      >
        <AnimatePresence mode="popLayout">
          {displayedItems.map((item) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <DishCard item={item} onOpen={setModalItem} className="h-full" />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <DishModal item={modalItem} onClose={() => setModalItem(null)} />
    </section>
  );
}
