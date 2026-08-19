import { GridPattern } from "@/components/ui/grid-pattern";
import HeroSection from "./hero-section";
import { Separator } from "@/components/ui/separator";

export default function HomeContent() {
  return (
    <section className="relative mx-auto w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[620px] overflow-hidden">
        <GridPattern width={60} height={60} opacity={0.2} />
      </div>

      <div className="relative container mx-auto px-10 pt-40">
        <HeroSection />
      </div>
      <Separator className="my-12" />
      <div className="min-h-screen">xd</div>
    </section>
  );
}
