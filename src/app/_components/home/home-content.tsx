import { GridPattern } from "@/components/ui/grid-pattern";
import HeroSection from "./hero-section";
import { Separator } from "@/components/ui/separator";
import CtaBanner from "./cta-banner";
import LogosSection from "./logos-section";

export default function HomeContent() {
  return (
    <section className="relative mx-auto w-full">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[810px] overflow-hidden">
        <GridPattern width={60} height={60} opacity={0.2} />
      </div>

      <HeroSection />
      <Separator className="my-12" />
      <div className="relative container mx-auto px-4">
        <LogosSection />
        <CtaBanner />
      </div>
      <div className="min-h-screen">xd</div>
    </section>
  );
}
