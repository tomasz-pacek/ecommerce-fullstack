import { Laptop } from "@/db/schema";

type Props = {
  laptop: Laptop;
};

export default function ProductCardSpecs({ laptop }: Props) {
  const cardSpecsData = [
    { name: "Processor:", value: laptop.cpuModel },
    { name: "RAM memory:", value: laptop.ramGb + "GB" },
    { name: "Memory:", value: laptop.storageGb + "GB" },
    {
      name: "Graphics:",
      value: laptop.gpuType === "integrated" ? "Integrated" : laptop.gpuModel,
    },
  ];

  return (
    <div className="mt-2 flex flex-col gap-0.5">
      {cardSpecsData.map((spec) => (
        <div key={spec.name} className="flex min-w-0 gap-1">
          <p className="text-muted-foreground shrink-0">{spec.name}</p>
          <span className="min-w-0 truncate">{spec.value}</span>
        </div>
      ))}
    </div>
  );
}
