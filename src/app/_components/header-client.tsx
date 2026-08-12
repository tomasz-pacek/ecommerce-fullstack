"use client";

import gsap from "gsap";
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
      className="flex w-4/5 items-center justify-center rounded-lg border border-gray-300 bg-white py-5"
    >
      <ul>
        {NAV_LINKS.map((link) => (
          <li key={link.label}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
