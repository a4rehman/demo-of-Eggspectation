import type { Metadata } from "next";
import Image from "next/image";
import { Clock, Mail, MapPin, Phone, Umbrella, Wine, Users } from "lucide-react";
import { LOCATIONS, PLACEHOLDER_CONTACT } from "@/data/locations";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Locations",
  description:
    "Eggspectation rooms and opening hours. All address and contact details are demo placeholders pending client information.",
};

const FEATURE_ICONS: Record<string, typeof Umbrella> = {
  "Harbour-view patio": Umbrella,
  "Full bar": Wine,
  "Private dining room": Users,
  "Espresso bar": Wine,
  "Quick-pickup counter": Users,
  "Street terrace": Umbrella,
  "Cosy fireside seating": Wine,
  "Weekend dinner service": Wine,
  "Family booths": Users,
};

export default function LocationsPage() {
  return (
    <div className="container pb-24 pt-10 md:pt-14">
      <div className="max-w-2xl">
        <SectionHeading
          eyebrow="Locations"
          title="Find your table"
          description="Three rooms, one standard. Hours below are placeholders — official addresses and contact details will be provided by the client before launch."
        />
      </div>

      <StaggerGroup className="mt-12 grid gap-6 lg:grid-cols-3">
        {LOCATIONS.map((location) => (
          <StaggerItem key={location.id}>
            <article
              id={location.id}
              className="flex h-full scroll-mt-28 flex-col overflow-hidden rounded-[2rem] bg-cream-50 shadow-soft transition-shadow duration-500 hover:shadow-card"
            >
              <div className="relative aspect-[16/10]">
                <Image
                  src={location.image}
                  alt={`${location.name} — ${location.neighborhood}`}
                  fill
                  sizes="(min-width: 1024px) 420px, 92vw"
                  className="object-cover"
                />
              </div>
              <div className="flex flex-1 flex-col p-6">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  <MapPin className="size-3.5" aria-hidden />
                  {location.neighborhood}
                </p>
                <h2 className="mt-2 font-display text-2xl font-semibold tracking-tight">
                  {location.name}
                </h2>

                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {location.features.map((feature) => {
                    const Icon = FEATURE_ICONS[feature] ?? Users;
                    return (
                      <li
                        key={feature}
                        className="inline-flex items-center gap-1.5 rounded-full bg-cream-100 px-3 py-1 text-[11px] font-semibold text-charcoal-600"
                      >
                        <Icon className="size-3" aria-hidden />
                        {feature}
                      </li>
                    );
                  })}
                </ul>

                <div className="mt-5 border-t border-cream-200 pt-5">
                  <h3 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-charcoal-50/75">
                    <Clock className="size-3.5" aria-hidden /> Opening hours
                  </h3>
                  <ul className="mt-3 space-y-2 text-sm">
                    {location.hours.map((row) => (
                      <li key={row.days} className="flex items-baseline justify-between gap-3">
                        <span className="text-charcoal-50/75">{row.days}</span>
                        <span className="shrink-0 text-right font-semibold tabular-nums" title={row.note}>
                          {row.time}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-5 space-y-2.5 border-t border-cream-200 pt-5 text-sm text-charcoal-50/75">
                  <p className="flex items-start gap-2.5">
                    <MapPin className="mt-0.5 size-4 shrink-0 text-charcoal-50/40" aria-hidden />
                    {location.addressPlaceholder}
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Phone className="size-4 shrink-0 text-charcoal-50/40" aria-hidden />
                    <a href={`tel:${location.phonePlaceholder.replace(/[^+\d]/g, "")}`} className="transition hover:text-brand-600">
                      {location.phonePlaceholder}
                    </a>
                  </p>
                  <p className="flex items-center gap-2.5">
                    <Mail className="size-4 shrink-0 text-charcoal-50/40" aria-hidden />
                    <a href={`mailto:${location.emailPlaceholder}`} className="transition hover:text-brand-600">
                      {location.emailPlaceholder}
                    </a>
                  </p>
                </div>

                <div className="mt-6 flex gap-3 border-t border-cream-200 pt-5">
                  <ButtonLink href="/reservations" size="sm" className="flex-1">
                    Book this room
                  </ButtonLink>
                  <ButtonLink href="/order" size="sm" variant="outline" className="flex-1">
                    Order for pickup
                  </ButtonLink>
                </div>
              </div>
            </article>
          </StaggerItem>
        ))}
      </StaggerGroup>

      {/* Map placeholder */}
      <Reveal className="mt-14">
        <div className="relative overflow-hidden rounded-[2rem] border border-cream-300 bg-cream-100 shadow-soft">
          <div
            className="relative flex aspect-[16/7] min-h-[280px] flex-col items-center justify-center gap-3 text-center"
            style={{
              backgroundImage:
                "linear-gradient(rgba(227,212,191,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(227,212,191,0.35) 1px, transparent 1px)",
              backgroundSize: "44px 44px",
            }}
            role="img"
            aria-label="Map placeholder — interactive map arrives with the production build"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-500 text-cream-50 shadow-glow-brand">
              <MapPin className="size-7" aria-hidden />
            </span>
            <p className="font-display text-xl font-semibold tracking-tight">Interactive map placeholder</p>
            <p className="max-w-sm text-sm text-charcoal-50/70">
              The production build integrates live maps and directions to each room, pinned with real coordinates.
            </p>
          </div>
        </div>
      </Reveal>

      {/* General contact strip */}
      <Reveal className="mt-10">
        <div className="rounded-[2rem] bg-charcoal px-8 py-10 text-center text-cream-50 sm:px-12">
          <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-300">General enquiries</p>
          <p className="mt-3 text-lg font-medium">
            {PLACEHOLDER_CONTACT.phone} · {PLACEHOLDER_CONTACT.email}
          </p>
          <p className="mt-1 text-sm text-cream-100/60">
            Brand partnerships, press and feedback — all placeholders until the client supplies official details.
          </p>
        </div>
      </Reveal>
    </div>
  );
}
