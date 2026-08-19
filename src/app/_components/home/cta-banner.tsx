import { GridPattern } from "@/components/ui/grid-pattern";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CtaBanner() {
  return (
    <div className="bg-primary/85 relative flex w-full flex-col items-center justify-center overflow-hidden rounded-2xl px-4 py-16 sm:px-6 sm:py-24 md:py-32">
      <GridPattern opacity={0.8} />

      <h2 className="relative text-center text-lg font-semibold text-pretty text-white sm:text-5xl">
        <span className="block">Not sure which machine? </span>
        <span className="block">Tell us your workload.</span>
      </h2>

      <p className="relative mt-4 mb-8 max-w-md text-center text-sm text-gray-200 sm:text-base">
        Filter by CPU, GPU, RAM, weight and refresh rate — or just browse the
        whole curated catalog.
      </p>

      <Link
        href="/products"
        className="relative flex items-center gap-2 rounded-full bg-white px-6 py-3 whitespace-nowrap text-black transition-opacity hover:opacity-90"
      >
        Browse all laptops
        <ArrowRight className="h-5 w-5" />
      </Link>
    </div>
  );
}
