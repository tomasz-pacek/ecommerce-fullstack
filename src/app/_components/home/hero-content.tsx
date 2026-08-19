import Reveal from "@/components/shared/reveal";
import Link from "next/link";
import { Stat } from "./hero-stat";
import { ArrowRight } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="border-border flex w-full max-w-md flex-col border-b">
      <Reveal
        as="p"
        delay={0.5}
        className="text-muted-foreground mb-6 flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase"
      >
        <span className="bg-primary inline-block size-2 rounded-full" />
        Laptop marketplace
      </Reveal>
      <Reveal
        as="h1"
        delay={0.15}
        className="font-heading text-[13vw] leading-[0.9] font-semibold tracking-tight sm:text-7xl md:text-8xl"
      >
        <span className="block overflow-hidden pb-[0.05em]">
          <span className="block">Compute,</span>
        </span>
        <span className="block overflow-hidden pb-[0.05em]">
          <span className="text-primary block">curated.</span>
        </span>
      </Reveal>
      <Reveal
        as="span"
        delay={0.65}
        className="text-muted-foreground mt-6 w-full text-base leading-relaxed text-pretty"
      >
        We don&apos;t sell every laptop. We benchmark, spec-check and hand-pick
        the machines worth owning - then match them to the way you actually
        work.
      </Reveal>
      <Reveal delay={0.65} className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/products"
          className="group bg-primary text-primary-foreground flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition-opacity hover:opacity-90"
        >
          Explore the catalog
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </Link>
        <Link
          href="/products?use=gaming"
          className="border-border hover:bg-accent rounded-full border px-6 py-3 text-sm font-medium transition-colors"
        >
          Shop by workload
        </Link>
      </Reveal>

      <dl className="grid max-w-md grid-cols-3 gap-4 py-10">
        <Stat value="8" label="Curated models" />
        <Stat value="7" label="Brands" />
        <Stat value="48h" label="Free delivery" />
      </dl>
    </div>
  );
}
