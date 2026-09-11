import { parseFilters } from "../lib/filters";
import { getProducts } from "../lib/get-products";
import CustomPagination from "./custom-pagination";
import Filters from "./filters";
import GridTab from "./grid-tab";
import ProductGrid from "./product-grid";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsSection({ searchParams }: Props) {
  const filters = parseFilters(await searchParams);
  const { products, facets, totalPages, total } = await getProducts(filters);

  return (
    <>
      <div className="hidden lg:block lg:w-1/4">
        <Filters facets={facets} activeFilters={filters} />
      </div>

      <div className="flex flex-col gap-6 lg:w-3/4">
        <GridTab total={total} facets={facets} filters={filters} />
        <ProductGrid products={products} />
        <CustomPagination totalPages={totalPages} />
      </div>
    </>
  );
}
