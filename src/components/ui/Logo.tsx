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
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <span
        className={cn(
          "grid size-10 shrink-0 place-items-center rounded-full",
          inverted ? "bg-brand-500" : "bg-charcoal"
        )}
        aria-hidden
      >
        <span
          className="size-[18px] rounded-full border-2"
          style={{
            borderColor: inverted ? "#FAF7F2" : "#FAF7F2",
            background: inverted ? "#CE5B17" : "#CE5B17",
          }}
        />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[21px] font-semibold tracking-tight",
            inverted ? "text-cream-50" : "text-charcoal"
          )}
        >
          Eggspectation
        </span>
        {!compact && (
          <span
            className={cn(
              "mt-1 text-[9px] font-bold uppercase tracking-[0.32em]",
              inverted ? "text-cream-100/60" : "text-brand-600"
            )}
          >
            Breakfast · Brunch · Beyond
          </span>
        )}
      </span>
    </span>
  );
}
