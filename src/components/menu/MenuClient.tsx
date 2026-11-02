'use client'

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SearchX, SlidersHorizontal, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/data/menu";
import type { MenuItem } from "@/types";
import { cn } from "@/lib/utils";
import { DishCard } from "@/components/menu/DishCard";
import { DishModal } from "@/components/menu/DishModal";

const DIETARY_FILTERS = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "high-protein", label: "High-protein" },
  { id: "popular", label: "Guest favourites" },
] as const;

type DietFilter = (typeof DIETARY_FILTERS)[number]["id"];

export function MenuClient() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category");
  const [category, setCategory] = useState<string>(
    initialCategory && MENU_CATEGORIES.some((c) => c.id === initialCategory)
      ? initialCategory
      : "all"
  );
  const [query, setQuery] = useState("");
  const [diets, setDiets] = useState<DietFilter[]>([]);
  const [modalItem, setModalItem] = useState<MenuItem | null>(null);

  // Keep the active tab synced when arriving from category links
  useEffect(() => {
    if (initialCategory && MENU_CATEGORIES.some((c) => c.id === initialCategory)) {
      setCategory(initialCategory);
    }
  }, [initialCategory]);

  const filtered = useMemo(() => {
    return MENU_ITEMS.filter((item) => {
      if (category !== "all" && item.category !== category) return false;
      if (query.trim()) {
        const q = query.toLowerCase();
        const haystack = `${item.name} ${item.description}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      for (const diet of diets) {
        if (diet === "popular") {
          if (!item.popular) return false;
        } else if (!item.dietary.includes(diet)) {
          return false;
        }
      }
      return true;
    });
  }, [category, query, diets]);

  const toggleDiet = (diet: DietFilter) =>
    setDiets((prev) => (prev.includes(diet) ? prev.filter((d) => d !== diet) : [...prev, diet]));

  const hasFilters = category !== "all" || diets.length > 0 || query.trim() !== "";
  const resetFilters = () => {
    setCategory("all");
    setDiets([]);
    setQuery("");
  };

  return (
    <div className="container pb-24 pt-10 md:pt-14">
      {/* Page heading */}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em] text-gold-600">
            <span className="h-px w-8 bg-gold-500" aria-hidden /> The Culinary Collection
          </span>
          <h1 className="mt-4 font-display text-4xl font-medium tracking-tight text-balance sm:text-6xl text-charcoal">
            Crafted for every
            <span className="italic gold-gradient-text font-semibold"> table, hour & craving</span>
          </h1>
          <p className="mt-3 text-sm text-charcoal-50/80 max-w-lg">
            From our legendary buttermilk stacks and organic eggs Benedicts to stone-ground bowls and specialty roaster sips.
          </p>
        </div>
        <div className="relative w-full md:w-80">
          <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-charcoal-50/60" aria-hidden />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search our dishes & sips…"
            aria-label="Search the menu"
            className="h-12 w-full rounded-full border border-cream-300 bg-cream-50 pl-11 pr-10 text-sm font-medium outline-none shadow-soft transition focus:border-gold-500 focus:ring-2 focus:ring-gold-200"
          />
        </div>
      </div>

      {/* Category tabs */}
      <div className="sticky top-[78px] z-30 -mx-2 mt-8 scroll-mt-28 bg-cream/95 backdrop-blur-md px-2 pb-3 pt-2 border-b border-cream-200/80">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto pb-1">
          <CategoryTab
            active={category === "all"}
            onClick={() => setCategory("all")}
            label="All Creations"
          />
          {MENU_CATEGORIES.map((cat) => (
            <CategoryTab
              key={cat.id}
              active={category === cat.id}
              onClick={() => setCategory(cat.id)}
              label={cat.name}
            />
          ))}
        </div>
      </div>

      {/* Dietary filters */}
      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span className="mr-1 flex items-center gap-1.5 text-xs font-bold uppercase tracking-[0.18em] text-charcoal-50/80">
          <SlidersHorizontal className="size-3.5 text-gold-600" aria-hidden /> Filters:
        </span>
        {DIETARY_FILTERS.map((diet) => (
          <button
            key={diet.id}
            type="button"
            onClick={() => toggleDiet(diet.id)}
            aria-pressed={diets.includes(diet.id)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-bold transition-all duration-200",
              diets.includes(diet.id)
                ? "border-charcoal bg-charcoal text-cream-50 shadow-soft"
                : "border-cream-300 bg-cream-50 text-charcoal-600 hover:border-gold-400 hover:text-gold-700"
            )}
          >
            {diet.label}
          </button>
        ))}
        {hasFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="ml-2 inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-bold text-brand-600 transition hover:text-brand-700 hover:bg-brand-50"
          >
            <X className="size-3.5" aria-hidden /> Clear filters
          </button>
        )}
      </div>

      {/* Results */}
      <p className="mt-6 text-sm text-charcoal-50/75" aria-live="polite">
        Showing {filtered.length} {filtered.length === 1 ? "dish" : "dishes"}
      </p>

      {filtered.length === 0 ? (
        <div className="mt-8 flex flex-col items-center gap-4 rounded-[2rem] bg-cream-100 py-20 text-center">
          <span className="grid size-16 place-items-center rounded-full bg-cream-200">
            <SearchX className="size-7 text-charcoal-50/75" aria-hidden />
          </span>
          <p className="font-display text-2xl font-medium">Nothing matched that search</p>
          <p className="max-w-sm text-sm text-charcoal-50/70">
            Try a different dish name or clear your filters — the legendary pancakes never hide for long.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="mt-2 inline-flex h-11 items-center rounded-full bg-charcoal px-6 text-sm font-semibold text-cream-50 transition hover:bg-charcoal-700"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <motion.div layout className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35 }}
              >
                <DishCard item={item} onOpen={setModalItem} className="h-full" />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <DishModal item={modalItem} onClose={() => setModalItem(null)} />
    </div>
  );
}

function CategoryTab({
  active,
  onClick,
  label,
}: {
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={cn(
        "shrink-0 rounded-full border px-5 py-2.5 text-sm font-semibold transition-all duration-300",
        active
          ? "border-charcoal bg-charcoal text-cream-50"
          : "border-cream-300 bg-cream-50 text-charcoal-600 hover:border-brand-300 hover:text-brand-700"
      )}
    >
      {label}
    </button>
  );
}
