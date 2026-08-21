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
import HeroDots from "./hero-dots";
import Link from "next/link";

export default function HeroCarousel() {
  const { slides, api, setApi, setIndex, slide, index } = useHeroCarousel();

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
    <div className="group relative">
      <Carousel opts={{ loop: true }} setApi={setApi} className="w-full">
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id} className="relative aspect-4/3">
              <div className="bg-muted relative h-full w-full overflow-hidden rounded-xl">
                <Link href={slide.href}>
                  <Image
                    src={slide.image}
                    alt={slide.alt}
                    priority
                    fill
                    className="rounded-xl object-cover"
                  />
                </Link>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="mt-4 flex items-center justify-between gap-1">
          <HeroDots
            current={index}
            slidesLength={slides.length}
            onSelect={(i) => api?.scrollTo(i)}
          />
          <div className="flex gap-2">
            <CarouselPrevious className="static translate-y-0" />
            <CarouselNext className="static translate-y-0" />
          </div>
        </div>
      </Carousel>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
            Featured
          </p>
          <p className="text-lg font-medium capitalize">{slide.name}</p>
        </div>
        <p className="text-lg font-semibold">{slide.price}</p>
      </div>
    </div>
  );
}
