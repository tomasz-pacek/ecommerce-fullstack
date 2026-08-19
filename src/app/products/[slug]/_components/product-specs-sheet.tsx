"use client";

import Reveal from "@/components/shared/reveal";
import { Laptop } from "@/db/schema";
import { formatGramsToKilos } from "@/lib/utils/format-grams-to-kilos";
import { formatSpecValue } from "@/lib/utils/format-spec-value";

type Props = {
  laptop: Laptop;
};

type SpecItemProps = {
  label: string;
  value: string | boolean | number | null;
};

export default function ProductSpecsSheet({ laptop }: Props) {
  return (
    <Reveal stagger>
      <h2 data-reveal-item className="mb-4 text-3xl font-bold">
        Specifications
      </h2>
      <div className="grid gap-x-10 gap-y-px sm:grid-cols-2">
        <SpecItem label="Cpu Model" value={laptop.cpuModel} />
        <SpecItem label="Cpu Brand" value={laptop.cpuBrand} />
        <SpecItem label="Gpu Model" value={laptop.gpuModel} />
        <SpecItem label="Gpu Type" value={laptop.gpuType} />
        <SpecItem label="Ram" value={`${laptop.ramGb}GB`} />
        <SpecItem label="Storage" value={`${laptop.storageGb}GB`} />
        <SpecItem label="Display" value={`${laptop.screenInches}"`} />
        <SpecItem label="Refresh Rate" value={`${laptop.refreshRateHz}Hz`} />
        <SpecItem
          label="Weight"
          value={`${formatGramsToKilos(laptop.weightGrams)}kg`}
        />
        <SpecItem label="Battery" value={`${laptop.batteryWh}Wh`} />
        <SpecItem label="Operating System" value={laptop.os} />
        <SpecItem label="Touchscreen" value={laptop.touchscreen} />
        <SpecItem label="Backlit Keyboard" value={laptop.backlitKeyboard} />
        <SpecItem label="Brand" value={laptop.brand} />
      </div>
    </Reveal>
  );
}

const SpecItem = ({ label, value }: SpecItemProps) => {
  return (
    <div
      data-reveal-item
      className="border-border flex items-center justify-between border-b py-3.5"
    >
      <span className="font-jetbrains text-base font-light">{label}</span>
      <span className="text-base font-semibold capitalize">
        {formatSpecValue(value)}
      </span>
    </div>
  );
};
