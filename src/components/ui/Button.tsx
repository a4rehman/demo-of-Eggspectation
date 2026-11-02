"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "dark" | "outline" | "ghost" | "light" | "gold";
type ButtonSize = "sm" | "md" | "lg";

type CommonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  withArrow?: boolean;
  className?: string;
  children: ReactNode;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-brand-500 via-brand-600 to-brand-700 text-cream-50 hover:from-brand-600 hover:to-brand-800 shadow-glow-brand active:scale-[0.98]",
  gold:
    "bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-charcoal-900 font-bold hover:from-gold-400 hover:to-gold-300 shadow-gold-glow active:scale-[0.98]",
  dark:
    "bg-charcoal text-cream-50 hover:bg-charcoal-700 border border-charcoal-700/60 shadow-soft active:scale-[0.98]",
  outline:
    "border border-charcoal/20 bg-cream-50/50 text-charcoal hover:border-gold-500 hover:text-gold-700 hover:bg-cream-50 active:scale-[0.98]",
  ghost:
    "bg-transparent text-charcoal hover:bg-charcoal/5 active:scale-[0.98]",
  light:
    "bg-cream-100 text-charcoal hover:bg-cream-200 border border-cream-200 active:scale-[0.98]",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-10 px-4 text-sm gap-1.5",
  md: "h-12 px-6 text-[15px] gap-2",
  lg: "h-14 px-8 text-base gap-2.5",
};

const baseClasses =
  "inline-flex items-center justify-center rounded-full font-semibold tracking-[0.01em] transition-all duration-300 cursor-pointer whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-cream disabled:opacity-50 disabled:pointer-events-none";

export function Button({
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "className">) {
  return (
    <button
      className={cn(baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      )}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  withArrow = false,
  className,
  children,
  ...props
}: CommonProps & { href: string } & Omit<
    React.ComponentProps<typeof Link>,
    "href" | "className" | "children"
  >) {
  return (
    <Link
      href={href}
      className={cn("group", baseClasses, variantClasses[variant], sizeClasses[size], className)}
      {...props}
    >
      {children}
      {withArrow && (
        <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" aria-hidden />
      )}
    </Link>
  );
}
