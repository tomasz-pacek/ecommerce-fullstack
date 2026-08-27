import { parseFilters } from "../lib/filters";
import { getProducts } from "../lib/get-products";
import CustomPagination from "./custom-pagination";
import Filters from "./filters";
import ProductGrid from "./product-grid";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsSection({ searchParams }: Props) {
  const filters = parseFilters(await searchParams);
  const { products, facets, totalPages } = await getProducts(filters);

  return (
    <>
      <div className="hidden w-1/4 lg:block">
        <Filters facets={facets} activeFilters={filters} />
      </div>
      <div className="flex w-3/4 flex-col gap-8">
        <ProductGrid products={products} />
        <CustomPagination totalPages={totalPages} />
      </div>
    </>
  );
}
