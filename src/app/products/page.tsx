import { Suspense } from "react";
import HeaderServer from "../_components/header-server";
import ProductsSection from "./_components/products-section";

type Props = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default function ProductsPage({ searchParams }: Props) {
  return (
    <div>
      <Suspense>
        <HeaderServer />
      </Suspense>
      <div className="container mx-auto mt-42 flex min-h-screen w-full max-w-7xl flex-col gap-10 px-4 pb-10 lg:flex-row">
        <Suspense>
          <ProductsSection searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
