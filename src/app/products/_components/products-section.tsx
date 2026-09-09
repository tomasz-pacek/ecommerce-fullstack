import { parseFilters } from "../lib/filters";
import { getProducts } from "../lib/get-products";
import CustomPagination from "./custom-pagination";
import Filters from "./filters";
import FiltersMobile from "./filters-mobile";
import ProductGrid from "./product-grid";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsSection({ searchParams }: Props) {
  const filters = parseFilters(await searchParams);
  const { products, facets, totalPages } = await getProducts(filters);

  return (
    <>
      <div className="hidden lg:block lg:w-1/4">
        <Filters facets={facets} activeFilters={filters} />
      </div>

      <div className="lg:hidden">
        <FiltersMobile facets={facets} activeFilters={filters} />
      </div>

      <div className="flex flex-col gap-8 lg:w-3/4">
        <ProductGrid products={products} />
        <CustomPagination totalPages={totalPages} />
      </div>
    </>
  );
}
