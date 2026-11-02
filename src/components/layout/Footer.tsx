"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Clock, Facebook, Instagram, MapPin, Phone, Mail, Twitter } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { PLACEHOLDER_CONTACT } from "@/data/locations";
import { DemoBadge } from "@/components/ui/DemoBadge";

const EXPLORE_LINKS = [
  { href: "/menu", label: "Menu" },
  { href: "/order", label: "Order Online" },
  { href: "/reservations", label: "Reservations" },
  { href: "/about", label: "Our Story" },
  { href: "/locations", label: "Locations" },
  { href: "/contact", label: "Contact" },
];

export function Footer() {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;
  return (
    <footer className="bg-charcoal-900 border-t border-gold-500/20 text-cream-100">
      <div className="container grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:py-20">
        <div>
          <Logo inverted />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-cream-100/70">
            An artisanal culinary institution born in Montréal. Celebrating all-day
            brunch, slow-simmered craft, and morning moments that linger.
          </p>
          <div className="mt-6 flex gap-3">
            {[
              {
                icon: Instagram,
                label: "Instagram",
                href: "https://www.instagram.com/eggspectationpk/?hl=en",
              },
              { icon: Facebook, label: "Facebook", href: "#" },
              { icon: Twitter, label: "Twitter", href: "#" },
            ].map(({ icon: Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full bg-cream-100/10 text-cream-100 border border-cream-100/15 transition hover:bg-gold-500 hover:text-charcoal-900 hover:border-gold-400"
              >
                <Icon className="size-4" aria-hidden />
              </a>
            ))}
          </div>
          <DemoBadge className="mt-6" />
        </div>

        <nav aria-label="Footer">
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
            Explore
          </h3>
          <ul className="mt-5 space-y-3">
            {EXPLORE_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-cream-100/70 transition hover:text-gold-300"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
            Opening hours
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-cream-100/70">
            {PLACEHOLDER_CONTACT.hours.map((row) => (
              <li key={row.days} className="flex items-start justify-between gap-4">
                <span className="flex items-start gap-2">
                  <Clock className="mt-0.5 size-3.5 shrink-0 text-gold-400/60" aria-hidden />
                  {row.days}
                </span>
                <span className="shrink-0 tabular-nums">{row.time}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-xs font-bold uppercase tracking-[0.24em] text-gold-400">
            Visit us
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-cream-100/70">
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 size-4 shrink-0 text-gold-400/60" aria-hidden />
              {PLACEHOLDER_CONTACT.address}
            </li>
            <li className="flex items-center gap-3">
              <Phone className="size-4 shrink-0 text-gold-400/60" aria-hidden />
              {PLACEHOLDER_CONTACT.phone}
            </li>
            <li className="flex items-center gap-3">
              <Mail className="size-4 shrink-0 text-gold-400/60" aria-hidden />
              {PLACEHOLDER_CONTACT.email}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream-100/10">
        <div className="container flex flex-col items-center justify-between gap-3 py-6 text-xs text-cream-100/45 sm:flex-row">
          <p>© 2026 Eggspectation — artisanal demonstration website. All rights reserved.</p>
          <p>
            Designed & built with{" "}
            <span className="font-semibold text-gold-300/80">Gastronomy UI System</span>.
          </p>
        </div>
      </div>
    </footer>
  );
}
