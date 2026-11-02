"use client";

import { useState } from "react";
import { Mail, Send } from "lucide-react";
import { SectionHeading } from "@/components/ui/Display";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { isValidEmail } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function NewsletterSection({ dark = false }: { dark?: boolean }) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
      setStatus("error");
      return;
    }
    setStatus("success");
  };

  return (
    <section className={cn(dark ? "bg-charcoal text-cream-50" : "bg-cream-100", "py-20 lg:py-24")}>
      <div className="container">
        <Reveal>
          <div className="mx-auto max-w-2xl text-center">
            <span className={cn(
              "inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.22em]",
              dark ? "text-brand-300" : "text-brand-600"
            )}>
              <Mail className="size-4" aria-hidden /> The Sunday Letter
            </span>
            <h2
              className={cn(
                "mt-4 font-display text-3xl font-medium tracking-tight text-balance sm:text-5xl",
                dark ? "text-cream-50" : "text-charcoal"
              )}
            >
              Get our specials before everyone else
            </h2>
            <p
              className={cn(
                "mx-auto mt-4 max-w-md text-sm leading-relaxed sm:text-base",
                dark ? "text-cream-100/70" : "text-charcoal-50/80"
              )}
            >
              Seasonal plates, mimosa-holiday schedules and the occasional
              secret-menu drop. Once a week, worth opening.
            </p>

            {status === "success" ? (
              <p
                className={cn(
                  "mx-auto mt-8 flex w-fit items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold",
                  dark ? "bg-brand-500 text-cream-50" : "bg-sage-600 text-cream-50"
                )}
                role="status"
              >
                <Send className="size-4" aria-hidden />
                You&apos;re on the list — welcome to the table. (Demo: nothing is actually sent.)
              </p>
            ) : (
              <form onSubmit={submit} className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row" noValidate>
                <div className="flex-1">
                  <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                  </label>
                  <input
                    id="newsletter-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === "error") setStatus("idle");
                    }}
                    placeholder="you@hungry.com"
                    className={cn(
                      "h-12 w-full rounded-full px-6 text-sm font-medium outline-none transition focus:ring-2",
                      dark
                        ? "bg-cream-100/10 text-cream-50 placeholder:text-cream-100/40 focus:ring-brand-400"
                        : "border border-cream-300 bg-cream-50 focus:ring-brand-200",
                      status === "error" && (dark ? "ring-2 ring-red-400" : "border-red-400 ring-2 ring-red-200")
                    )}
                  />
                  {status === "error" && (
                    <p className="mt-2 text-left text-xs font-semibold text-red-400 pl-6">
                      Please enter a valid email address.
                    </p>
                  )}
                </div>
                <Button type="submit" size="md" className="shrink-0">
                  Subscribe
                </Button>
              </form>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
