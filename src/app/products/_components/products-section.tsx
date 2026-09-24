import { redirect } from "next/navigation";
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
  const rawParams = await searchParams;
  const filters = parseFilters(rawParams);
  const { products, facets, totalPages, total } = await getProducts(filters);

  const lastPage = Math.max(1, totalPages);

  if (filters.page > lastPage) {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(rawParams)) {
      if (key === "page" || value === undefined) continue;
      if (Array.isArray(value)) value.forEach((v) => params.append(key, v));
      else params.set(key, value);
    }
    if (lastPage > 1) params.set("page", String(lastPage));

    const qs = params.toString();
    redirect(qs ? `/products?${qs}` : "/products");
  }
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
