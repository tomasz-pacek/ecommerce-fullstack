import { Suspense } from "react";
import HeaderServer from "../_components/header-server";
import ProductCard from "./_components/product-card";
import Filters from "./_components/filters";
import { parseFilters } from "./lib/filters";
import { getProducts } from "./lib/get-products";
import CustomPagination from "./_components/custom-pagination";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: Props) {
  const filters = parseFilters(await searchParams);
  const key = JSON.stringify(filters);

  const { products, facets, total, totalPages } = await getProducts(filters);

  return (
    <div>
      <Suspense>
        <HeaderServer />
      </Suspense>
      <div className="container mx-auto mt-42 flex min-h-screen w-full max-w-7xl gap-10 px-4 pb-10">
        <div className="hidden w-1/4 lg:block">
          <Suspense>
            <Filters facets={facets} activeFilters={filters} />
          </Suspense>
        </div>

        <div className="flex w-3/4 flex-col gap-8">
          <div className="mx-auto grid grid-cols-1 content-start items-start gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Suspense key={key}>
              {products.map((product) => (
                <ProductCard key={product.id} laptop={product} />
              ))}
            </Suspense>
          </div>
          <CustomPagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}
