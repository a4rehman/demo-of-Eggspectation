const WORDS = [
  "Legendary pancakes",
  "Estate fries",
  "Latte art",
  "Bottomless mimosas",
  "Cast-iron skillets",
  "Fresh-pressed juice",
  "Berry hand pies",
  "Soft-yolk toasts",
];

export function TickerStrip() {
  return (
    <div className="border-y border-charcoal/10 bg-brand-500 py-3.5">
      <div className="flex overflow-hidden" aria-hidden>
        <div className="animate-marquee flex shrink-0 items-center gap-10 pr-10">
          {[...WORDS, ...WORDS].map((word, i) => (
            <span
              key={i}
              className="flex shrink-0 items-center gap-10 whitespace-nowrap font-display text-sm font-semibold italic tracking-wide text-cream-50"
            >
              {word}
              <span className="size-1.5 rounded-full bg-cream-50/50" />
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        Legendary pancakes, estate fries, latte art, bottomless mimosas, cast-iron skillets, fresh-pressed juice, berry hand pies and soft-yolk toasts.
      </p>
    </div>
  );
}
