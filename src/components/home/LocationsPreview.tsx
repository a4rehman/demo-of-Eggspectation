"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { LOCATIONS } from "@/data/locations";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";

export function LocationsPreview() {
  return (
    <section className="container pb-20 lg:pb-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Find us"
          title="Three rooms, one standard"
          description="Pick the table that suits your morning — harbourside light, downtown bustle or a fireside corner uptown."
        />
        <Link
          href="/locations"
          className="group inline-flex items-center gap-2 text-sm font-bold text-brand-600 transition hover:text-brand-700"
        >
          All locations
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden />
        </Link>
      </div>

      <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-3">
        {LOCATIONS.map((location) => (
          <StaggerItem key={location.id}>
            <Link
              href={`/locations#${location.id}`}
              className="group block overflow-hidden rounded-[1.75rem] bg-cream-50 shadow-soft transition-shadow duration-500 hover:shadow-card"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={location.image}
                  alt={`${location.name} dining room`}
                  fill
                  sizes="(min-width: 768px) 400px, 92vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6">
                <p className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-600">
                  <MapPin className="size-3.5" aria-hidden />
                  {location.neighborhood}
                </p>
                <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">
                  {location.name}
                </h3>
                <p className="mt-1 text-sm text-charcoal-50/70">
                  {location.features.slice(0, 2).join(" · ")}
                </p>
              </div>
            </Link>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
