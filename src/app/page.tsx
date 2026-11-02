import { Hero } from "@/components/home/Hero";
import { TickerStrip } from "@/components/home/TickerStrip";
import { FeaturedDishes } from "@/components/home/FeaturedDishes";
import { MenuCategories } from "@/components/home/MenuCategories";
import { ExperienceSection } from "@/components/home/ExperienceSection";
import { SpecialOffers } from "@/components/home/SpecialOffers";
import { GallerySection } from "@/components/home/GallerySection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { LocationsPreview } from "@/components/home/LocationsPreview";
import { ReservationCTA } from "@/components/home/ReservationCTA";
import { NewsletterSection } from "@/components/home/NewsletterSection";

export default function HomePage() {
  return (
    <>
      <Hero />
      <TickerStrip />
      <FeaturedDishes />
      <MenuCategories />
      <ExperienceSection />
      <SpecialOffers />
      <GallerySection />
      <TestimonialsSection />
      <LocationsPreview />
      <ReservationCTA />
      <NewsletterSection dark />
    </>
  );
}
