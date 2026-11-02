import { cn } from "@/lib/utils";

export function DemoBadge({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border border-cream-100/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.18em] text-cream-100/60",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-brand-400" aria-hidden />
      Concept demo — not live
    </span>
  );
}
