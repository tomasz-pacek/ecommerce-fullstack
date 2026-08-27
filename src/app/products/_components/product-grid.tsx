import { Laptop } from "@/db/schema";
import ProductCard from "./product-card";

type Props = {
  products: Laptop[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <div className="mx-auto grid grid-cols-1 content-start items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} laptop={product} />
      ))}
    </div>
  );
}
