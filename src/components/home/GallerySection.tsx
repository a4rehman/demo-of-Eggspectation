"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import { GALLERY } from "@/data/media";
import { SectionHeading } from "@/components/ui/Display";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function GallerySection() {
  return (
    <section className="bg-cream-100 py-20 lg:py-28 relative overflow-hidden">
      <div className="container">
        <Reveal>
          <SectionHeading
            align="center"
            eyebrow="Visual Diary"
            title="Moments from our tables & kitchens"
            description="A glimpse inside the rooms, the sizzling skillets, and the hours between first pour and evening dessert."
          />
        </Reveal>

        <StaggerGroup className="mt-12 [columns:2] [column-gap:1.25rem] md:[columns:3] lg:[columns:4]">
          {GALLERY.map((image, i) => (
            <StaggerItem
              key={image.src}
              className={cn("mb-5 break-inside-avoid")}
            >
              <figure
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] border border-cream-200/80 shadow-soft transition-all duration-500 hover:shadow-card-hover hover:border-gold-400/40",
                  i % 3 === 0 ? "aspect-[3/4]" : i % 3 === 1 ? "aspect-square" : "aspect-[4/3]"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-transparent to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-90" />
                <figcaption className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-semibold text-cream-50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-1.5 truncate">
                    <Camera className="size-3.5 shrink-0 text-gold-400" aria-hidden />
                    <span className="truncate">{image.caption}</span>
                  </span>
                  <span className="text-[10px] uppercase tracking-wider text-gold-300 font-bold shrink-0">
                    #Eggspectation
                  </span>
                </figcaption>
              </figure>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
