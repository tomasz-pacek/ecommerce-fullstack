"use cache";
import { GridPattern } from "@/components/ui/grid-pattern";
import HeroSection from "./hero-section";
import { Separator } from "@/components/ui/separator";
import CtaBanner from "./cta-banner";
import LogosSection from "./logos-section";
import { getHeroLaptops } from "@/db/queries";

export default async function HomeContent() {
  const featured = await getHeroLaptops();
  return (
    <section className="relative mx-auto w-full">
      <div className="pointer-events-none absolute inset-x-0 h-[700px] overflow-hidden lg:h-[840px]">
        <GridPattern width={60} height={60} opacity={0.4} />
      </div>

      <HeroSection featured={featured} />

      <Separator className="my-12" />
      <div className="relative container mx-auto px-4">
        <LogosSection />
        <CtaBanner />
      </div>
      <div className="min-h-screen">xd</div>
    </section>
  );
}
