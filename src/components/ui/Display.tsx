import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  dark = false,
  className,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  dark?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "max-w-2xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      <span
        className={cn(
          "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.24em]",
          dark ? "text-gold-400" : "text-gold-600"
        )}
      >
        <span className={cn("h-px w-8", dark ? "bg-gold-400/60" : "bg-gold-500")} aria-hidden />
        <span>{eyebrow}</span>
        {align === "center" && (
          <span className={cn("h-px w-8", dark ? "bg-gold-400/60" : "bg-gold-500")} aria-hidden />
        )}
      </span>
      <h2
        className={cn(
          "mt-4 font-display text-4xl leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl",
          dark ? "text-cream-50" : "text-charcoal"
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            "mt-4 text-[15px] leading-relaxed sm:text-base",
            dark ? "text-cream-100/75" : "text-charcoal-50/85"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export function RatingStars({
  rating,
  className,
}: {
  rating: number;
  className?: string;
}) {
  return (
    <span role="img" className={cn("inline-flex items-center gap-1", className)} aria-label={`Rated ${rating} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn(
            "size-4",
            i < rating
              ? "fill-gold-400 text-gold-400 drop-shadow-[0_1px_3px_rgba(201,148,47,0.4)]"
              : "fill-cream-200/40 text-cream-200/60"
          )}
          aria-hidden
        />
      ))}
    </span>
  );
}

export function QuantityStepper({
  qty,
  onChange,
  subtractLabel = "Decrease quantity",
  addLabel = "Increase quantity",
  className,
}: {
  qty: number;
  onChange: (next: number) => void;
  subtractLabel?: string;
  addLabel?: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full border border-charcoal/15 bg-cream-50",
        className
      )}
    >
      <button
        type="button"
        aria-label={subtractLabel}
        onClick={() => onChange(Math.max(1, qty - 1))}
        className="flex size-10 items-center justify-center rounded-l-full text-charcoal hover:text-brand-600 disabled:opacity-30"
        disabled={qty <= 1}
      >
        −
      </button>
      <span
        className="w-8 select-none text-center text-sm font-bold"
        aria-live="polite"
      >
        {qty}
      </span>
      <button
        type="button"
        aria-label={addLabel}
        onClick={() => onChange(qty + 1)}
        className="flex size-10 items-center justify-center rounded-r-full text-charcoal hover:text-brand-600"
      >
        +
      </button>
    </div>
  );
}
