"use client";
import Reveal from "@/components/shared/reveal";
import { useHeroCarousel } from "./hero-context";

export default function HeroChips() {
  const { slide } = useHeroCarousel();
  return (
    <Reveal key={slide.id} stagger className="flex flex-wrap gap-2 pt-4">
      {slide.chips.map((chip) => (
        <span
          key={chip}
          data-reveal-item
          className="border-border text-muted-foreground rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider uppercase"
        >
          {chip}
        </span>
      ))}
    </Reveal>
  );
}
