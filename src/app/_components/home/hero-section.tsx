import HeroContent from "./hero-content";
import HeroImage from "./hero-image";

export default function HeroSection() {
  return (
    <div className="relative">
      <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <HeroContent />

        <HeroImage />
      </div>

      <div className="flex flex-wrap gap-2 pt-10">
        {[
          "Apple M3",
          "Integrated GPU",
          "120Hz",
          "Sub-1.2kg",
          "All-day battery",
          "MIL-SPEC",
          "4K mini-LED",
        ].map((chip) => (
          <span
            key={chip}
            data-hero-chip
            className="border-border text-muted-foreground rounded-full border px-3 py-1 font-mono text-[11px] tracking-wider uppercase"
          >
            {chip}
          </span>
        ))}
      </div>
    </div>
  );
}
