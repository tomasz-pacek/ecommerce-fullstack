import HeroContent from "./hero-content";
import { Laptop } from "@/db/schema";
import HeroCarousel from "./hero-carousel";
import { HeroCarouselProvider } from "./hero-context";
import { mapLaptopToHeroCarouselItem } from "@/lib/home/hero-carousel-mapper";
import HeroChips from "./hero-chips";

type Props = {
  featured: Laptop[];
};

export default function HeroSection({ featured }: Props) {
  const slides = mapLaptopToHeroCarouselItem(featured);

  return (
    <HeroCarouselProvider slides={slides}>
      <div className="relative container mx-auto px-4 pt-40">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <HeroContent />
          <HeroCarousel />
        </div>
        <HeroChips />
      </div>
    </HeroCarouselProvider>
  );
}
