"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { RefObject, useLayoutEffect } from "react";

gsap.registerPlugin(ScrollTrigger);

type Options = {
  delay?: number;
  stagger?: boolean;
  y?: number;
};

export function useGsapReveal(
  ref: RefObject<HTMLElement | null>,
  { delay = 0, stagger = false, y = 28 }: Options = {},
) {
  useLayoutEffect(() => {
    const element = ref.current;
    if (!element) return;

    const ctx = gsap.context(() => {
      const targets = stagger
        ? element.querySelectorAll<HTMLElement>("[data-reveal-item]")
        : [element];

      gsap.from(targets, {
        y,
        opacity: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: element,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, element);

    return () => ctx.revert();
  }, [ref, delay, stagger, y]);
}
