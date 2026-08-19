"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Route } from "next";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import LoginDropdown from "./login-dropdown";
import { Session } from "@/types/auth";
import ThemeToggle from "./theme-toggle";

gsap.registerPlugin(ScrollTrigger);

const NAV_LINKS: { label: string; href: Route }[] = [
  { label: "Home", href: "/" },
];

const ANIMATION_KEY = "navAnimationPlayed";
const SCROLL_THRESHOLD = 80;

type Props = {
  session: Session;
};

export default function HeaderClient({ session }: Props) {
  const headerRef = useRef<HTMLElement | null>(null);
  const navRef = useRef<HTMLElement | null>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const isScrolled = window.scrollY > SCROLL_THRESHOLD;

      if (isScrolled) {
        gsap.set(headerRef.current, { top: 0 });
        gsap.set(navRef.current, {
          width: "100%",
          borderRadius: 0,
          borderTopWidth: 0,
          borderLeftWidth: 0,
          borderRightWidth: 0,
        });
      }

      const alreadyPlayed = sessionStorage.getItem(ANIMATION_KEY) === "true";

      if (alreadyPlayed) {
        gsap.set(navRef.current, { yPercent: 0, opacity: 1 });
      } else {
        gsap
          .timeline({
            defaults: { ease: "power3.out" },
            onComplete: () => {
              sessionStorage.setItem(ANIMATION_KEY, "true");
            },
          })
          .set(navRef.current, { yPercent: -100, opacity: 0 })
          .to(navRef.current, {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
          });
      }

      ScrollTrigger.create({
        start: `${SCROLL_THRESHOLD}px top`,
        onEnter: () => {
          gsap.to(headerRef.current, {
            top: 0,
            duration: 0.4,
            ease: "power3.out",
          });
          gsap.to(navRef.current, {
            width: "100%",
            borderRadius: 0,
            borderTopWidth: 0,
            borderLeftWidth: 0,
            borderRightWidth: 0,
            duration: 0.4,
            ease: "power3.out",
          });
        },
        onLeaveBack: () => {
          gsap.to(headerRef.current, {
            top: 32,
            duration: 0.4,
            ease: "power3.out",
          });
          gsap.to(navRef.current, {
            width: "80%",
            borderRadius: 12,
            borderTopWidth: 1,
            borderLeftWidth: 1,
            borderRightWidth: 1,
            duration: 0.4,
            ease: "power3.out",
          });
        },
      });
    }, headerRef);

    return () => ctx.revert();
  }, []);

  return (
    <header
      ref={headerRef}
      className="fixed top-8 z-50 flex w-full items-center justify-center"
    >
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
        <div className="flex items-center justify-center gap-2">
          <ThemeToggle />
          <LoginDropdown session={session} />
        </div>
      </nav>
    </header>
  );
}
