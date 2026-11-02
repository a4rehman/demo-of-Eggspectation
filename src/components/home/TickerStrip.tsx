const HIGHLIGHTS = [
  "MONTREAL HERITAGE EST. 1993",
  "LEGENDARY BUTTERMILK PANCAKES",
  "SINGLE-ORIGIN ARTISAN ROASTS",
  "ALL-DAY BRUNCH WITHOUT A CLOCK",
  "CAST-IRON SKILLET BENEDICTS",
  "FARM-FRESH PASTURE-RAISED EGGS",
  "PURE VERMONT MAPLE SYRUP",
  "SCRATCH-MADE BRIOCHE & PASTRIES",
  "WEEKEND BOTTOMLESS MIMOSAS",
];

export function TickerStrip() {
  return (
    <div className="relative overflow-hidden border-y border-gold-500/25 bg-charcoal-900 py-4 text-cream-100 shadow-soft">
      {/* Subtle warm ember glow on left and right */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-charcoal-900 to-transparent z-10" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-charcoal-900 to-transparent z-10" />

      <div className="flex overflow-hidden" aria-hidden>
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...HIGHLIGHTS, ...HIGHLIGHTS].map((item, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-xs font-semibold uppercase tracking-[0.22em] text-cream-100/90"
            >
              <span>{item}</span>
              <span className="text-gold-400 drop-shadow-[0_0_8px_rgba(201,148,47,0.8)]">✦</span>
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Montreal Heritage Est. 1993, Legendary Buttermilk Pancakes, Single-Origin Artisan Roasts, All-Day Brunch, Cast-Iron Skillet Benedicts, Farm-Fresh Pasture-Raised Eggs.
      </p>
    </div>
  );
}
