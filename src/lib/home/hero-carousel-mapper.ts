import { Laptop } from "@/db/schema";
import { formatPrice } from "../utils/format-price";
import { HeroCarouselItem } from "@/types/hero-carousel-item";
import { Route } from "next";

function buildChips(laptop: Laptop): string[] {
  const chips: string[] = [];

  if (laptop.cpuModel) chips.push(laptop.cpuModel);

  chips.push(
    laptop.gpuType === "dedicated" && laptop.gpuModel
      ? laptop.gpuModel
      : "Integrated GPU",
  );

  if (laptop.refreshRateHz) chips.push(`${laptop.refreshRateHz}Hz`);

  if (laptop.weightGrams) {
    const kg = (laptop.weightGrams / 1000).toFixed(1);
    chips.push(`${kg}kg`);
  }

  if (laptop.touchscreen) chips.push("Touchscreen");

  chips.push(
    `${laptop.ramGb}GB RAM`,
    `${laptop.storageGb}GB ${laptop.storageType.toUpperCase()}`,
  );
  return chips;
}

export function mapLaptopToHeroCarouselItem(
  laptops: Laptop[],
): HeroCarouselItem[] {
  return laptops.map((laptop) => ({
    id: laptop.id,
    name: `${laptop.brand} ${laptop.model}`,
    image: "/macbook-pro-16.png",
    alt: laptop.title,
    chips: buildChips(laptop),
    price: formatPrice(laptop.priceCents),
    href: `/products/${laptop.slug}` as Route,
  }));
}
