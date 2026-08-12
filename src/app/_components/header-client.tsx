"use client";

import ActionButton from "@/components/shared/action-button";
import gsap from "gsap";
import { ArrowRight } from "lucide-react";
import { Route } from "next";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

const NAV_LINKS: { label: string; href: Route }[] = [
  { label: "Home", href: "/" },
];

const ANIMATION_KEY = "navAnimationPlayed";

export default function HeaderClient() {
  const navRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const alreadyPlayed = sessionStorage.getItem(ANIMATION_KEY) === "true";

    if (alreadyPlayed) {
      gsap.set(navRef.current, { yPercent: 0, opacity: 1 });
      return;
    }

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power3.out" },
        onComplete: () => {
          sessionStorage.setItem(ANIMATION_KEY, "true");
        },
      });

      tl.set(navRef.current, { yPercent: -100, opacity: 0 }).to(
        navRef.current,
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.7,
        },
      );
    }, navRef);

    return () => ctx.revert();
  }, []);

  return (
    <nav
      ref={navRef}
      className="flex w-4/5 items-center justify-around rounded-lg border border-black/10 bg-transparent py-5 backdrop-blur-xl dark:border-white/8"
    >
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
      <ActionButton className="group text-foreground relative overflow-hidden rounded-4xl bg-transparent px-8 shadow-[inset_0_0_0_1px_currentColor] hover:bg-transparent">
        <span className="bg-foreground absolute -inset-px z-0 origin-right scale-x-0 rounded-4xl transition-transform duration-300 ease-out group-hover:scale-x-100" />

        <span className="group-hover:text-background relative z-10 flex items-center gap-2 transition-colors duration-300">
          Login <ArrowRight />
        </span>
      </ActionButton>
    </nav>
  );
}
