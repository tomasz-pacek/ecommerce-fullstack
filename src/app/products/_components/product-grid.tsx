import { Laptop } from "@/db/schema";
import ProductCard from "./product-card";

type Props = {
  products: Laptop[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <>
      {products.length === 0 && (
        <div className="flex flex-col items-center justify-center gap-2 py-2">
          <p className="text-2xl text-nowrap">No products found</p>
          <p className="text-muted-foreground text-center text-pretty">
            Try removing selected filters to expand your search{" "}
          </p>
        </div>
      )}

      <div className="mx-auto grid grid-cols-1 content-start items-start gap-4 sm:grid-cols-2 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} laptop={product} />
        ))}
      </div>
    </>
  );
}
