"use client";

import { CarouselApi } from "@/components/ui/carousel";
import { HeroCarouselItem } from "@/types/hero-carousel-item";
import { useCallback, useContext, useState, createContext } from "react";

type Props = {
  slides: HeroCarouselItem[];
  children: React.ReactNode;
};

type HeroCarouselContextValue = {
  slides: HeroCarouselItem[];
  slide: HeroCarouselItem;
  index: number;
  api: CarouselApi | undefined;
  setApi: (api: CarouselApi) => void;
  setIndex: (index: number) => void;
};

const HeroCarouselContext = createContext<HeroCarouselContextValue | null>(
  null,
);

export function HeroCarouselProvider({ slides, children }: Props) {
  const [api, setApiState] = useState<CarouselApi>();
  const [index, setIndex] = useState(0);

  const setApi = useCallback((instance: CarouselApi) => {
    setApiState(instance);
  }, []);

  if (slides.length === 0) return null;

  return (
    <HeroCarouselContext.Provider
      value={{
        slides,
        slide: slides[index],
        index,
        api,
        setApi,
        setIndex,
      }}
    >
      {children}
    </HeroCarouselContext.Provider>
  );
}

export function useHeroCarousel() {
  const ctx = useContext(HeroCarouselContext);
  if (!ctx) {
    throw new Error("useHeroSlide has to be used inside of HeroSlideProvider");
  }
  return ctx;
}
