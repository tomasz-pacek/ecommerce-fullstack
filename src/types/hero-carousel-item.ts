import { Route } from "next";

export type HeroCarouselItem = {
  id: string;
  name: string;
  image: string;
  alt: string;
  chips: readonly string[];
  price: string;
  href: Route;
};
