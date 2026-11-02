"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { GALLERY } from "@/data/media";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function GallerySection() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Gallery"
            title="From our tables, to yours"
            description="A glimpse inside the rooms, the plates and the hours between first pour and last bite."
          />
        </Reveal>

        <StaggerGroup className="mt-12 [columns:2] [column-gap:1rem] md:[columns:3] lg:[columns:4]">
          {GALLERY.map((image, i) => (
            <StaggerItem
              key={image.src}
              className={cn("mb-4 break-inside-avoid")}
            >
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-[1.5rem] shadow-soft",
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent opacity-70 transition group-hover:opacity-90" />
                <figcaption className="absolute bottom-3 left-4 right-4 flex items-center gap-2 text-xs font-semibold text-cream-50 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                  {i === 0 && <Camera className="size-3.5 shrink-0" aria-hidden />}
                  {image.caption}
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
