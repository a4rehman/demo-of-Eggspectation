import { cn } from "@/lib/utils";

export function Logo({
  className,
  inverted = false,
  compact = false,
}: {
  className?: string;
  inverted?: boolean;
  compact?: boolean;
}) {
  return (
    <span className={cn("group inline-flex items-center gap-3", className)}>
      <span
        className={cn(
          "relative grid size-10 shrink-0 place-items-center rounded-full transition-transform duration-300 group-hover:scale-105",
          inverted
            ? "bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 shadow-gold-glow"
            : "bg-charcoal shadow-soft"
        )}
        aria-hidden
      >
        <span
          className="relative size-5 rounded-full border-[2px] shadow-sm flex items-center justify-center overflow-hidden"
          style={{
            borderColor: inverted ? "rgba(253, 251, 247, 0.9)" : "#F6E5BC",
            background: "linear-gradient(135deg, #E2B85A 0%, #C9942F 50%, #BE4A0F 100%)",
          }}
        >
          {/* Subtle light reflection on the yolk */}
          <span className="absolute -top-1 -right-0.5 size-2.5 rounded-full bg-cream-50/70 blur-[1px]" />
        </span>
        {/* Subtle gold outer aura */}
        <span className="absolute inset-0 rounded-full ring-1 ring-gold-400/40" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[22px] font-semibold tracking-tight transition-colors",
            inverted ? "text-cream-50" : "text-charcoal"
          )}
        >
          Eggspectation
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[9px] font-bold uppercase tracking-[0.28em]",
              inverted ? "text-gold-300/80" : "text-brand-600"
            )}
          >
            Montréal Heritage · Est. 1993
          </span>
        )}
      </span>
    </span>
  );
}
