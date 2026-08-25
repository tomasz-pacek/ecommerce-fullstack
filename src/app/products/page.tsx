import { Suspense } from "react";
import HeaderServer from "../_components/header-server";
import { getLaptops } from "@/db/queries";
import ProductCard from "./_components/product-card";

export default async function ProductsPage() {
  const laptops = await getLaptops();

  return (
    <div>
      <Suspense>
        <HeaderServer />
      </Suspense>
      <div className="container mx-auto mt-42 flex w-full max-w-6xl px-4">
        <div className="hidden w-1/4 lg:block">
          <h2>Filters</h2>
        </div>
        <div className="mx-auto grid w-3/4 grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {laptops.map((laptop) => (
            <ProductCard key={laptop.id} laptop={laptop} />
          ))}
        </div>
      </div>
    </div>
  );
}
