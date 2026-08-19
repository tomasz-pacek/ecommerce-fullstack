import Image from "next/image";

export default function HeroImage() {
  return (
    <div className="group relative block">
      <div className="border-border bg-muted relative aspect-4/3 overflow-hidden rounded-xl border">
        {/* <Image
          src="/macbook-pro-16.png"
          alt="Featured laptop"
          priority
          fill
          className="object-cover"
        /> */}
      </div>
      <div className="mt-4 flex items-end justify-between">
        <div>
          <p className="text-muted-foreground font-mono text-[10px] tracking-[0.2em] uppercase">
            Featured
          </p>
          <p className="text-lg font-medium">MacBook Pro 16 M3 Max</p>
        </div>
        <p className="text-lg font-semibold">14400 zł</p>
      </div>
    </div>
  );
}
