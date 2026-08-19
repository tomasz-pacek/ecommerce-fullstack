"use client";

import { useGsapReveal } from "@/hooks/use-gsap-reveal";
import { ElementType, useRef } from "react";

type Props = {
  children: React.ReactNode;
  as?: ElementType;
  className?: string;
  delay?: number;
  stagger?: boolean;
  y?: number;
};

export default function Reveal({
  children,
  as: Tag = "div",
  className,
  delay = 0,
  stagger = false,
  y = 28,
}: Props) {
  const ref = useRef<HTMLElement | null>(null);
  useGsapReveal(ref, { delay, stagger, y });

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
