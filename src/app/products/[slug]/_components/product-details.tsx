import AddToCart from "@/components/shared/add-to-cart";
import Reveal from "@/components/shared/reveal";
import { Laptop } from "@/db/schema";
import { formatGramsToKilos } from "@/lib/utils/format-grams-to-kilos";
import { formatPrice } from "@/lib/utils/format-price";
import { formatSpecValue } from "@/lib/utils/format-spec-value";
import ImageWrapper from "./image-wrapper";

type SpecDivProps = {
  label: string;
  value: string | boolean | number | null;
};

type Props = {
  laptop: Laptop;
};

export default function ProductDetails({ laptop }: Props) {
  return (
    <Reveal className="mt-12 grid gap-10 lg:grid-cols-2">
      <ImageWrapper />
      <div className="flex flex-col items-start justify-center gap-4">
        <p className="text-muted-foreground font-jetbrains text-sm uppercase">
          SKU {laptop.sku}
        </p>
        <h1 className="text-4xl font-bold capitalize">
          {laptop.brand} {laptop.model}
        </h1>
        <span className="text-3xl font-bold">
          {formatPrice(laptop.priceCents)}
        </span>
        <p className="font-jetbrains text-sm">
          IN-STOCK - {laptop.quantity} UNITS
        </p>
        <AddToCart laptop={laptop} />
        <span className="text-muted-foreground">{laptop.description}</span>
        {/* specs table */}
        <div className="border-border bg-border mt-8 grid w-full grid-cols-2 gap-px overflow-hidden rounded-xl border sm:grid-cols-3">
          <SpecDiv label="Cpu" value={laptop.cpuModel} />
          <SpecDiv label="Gpu" value={laptop.gpuModel} />
          <SpecDiv label="Ram" value={`${laptop.ramGb}GB`} />
          <SpecDiv label="Storage" value={`${laptop.storageGb}GB`} />
          <SpecDiv
            label="Display"
            value={`${laptop.screenInches}" - ${laptop.refreshRateHz}Hz`}
          />
          <SpecDiv
            label="Weight"
            value={`${formatGramsToKilos(laptop.weightGrams)}kg`}
          />
        </div>
      </div>
    </Reveal>
  );
}

const SpecDiv = ({ label, value }: SpecDivProps) => {
  return (
    <div className="bg-card hover:bg-accent flex flex-col gap-2 p-3 transition-colors">
      <span className="font-jetbrains text-sm uppercase">{label}</span>
      <span className="font-semibold capitalize">{formatSpecValue(value)}</span>
    </div>
  );
};
