"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useHeroCarousel } from "./hero-context";
import { useEffect } from "react";

export default function HeroCarousel() {
  const { slides, api, setApi, setIndex, slide } = useHeroCarousel();

  useEffect(() => {
    if (!api) return;

    const onSelect = () => setIndex(api.selectedScrollSnap());
    onSelect();

    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api, setIndex]);

  return (
    <div className="group relative block">
      <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem
              key={slide.id}
              className="border-border bg-muted relative aspect-4/3 overflow-hidden rounded-xl border"
            >
              <Image
                src={slide.image}
                alt={slide.alt}
                priority
                fill
                className="object-cover"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>

      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
            Featured
          </p>
          <p className="text-lg font-medium">{slide.name}</p>
        </div>
        <p className="text-lg font-semibold">{slide.price}</p>
      </div>
    </div>
  );
}
