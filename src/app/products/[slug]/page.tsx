import HeaderServer from "@/app/_components/header-server";
import { Suspense } from "react";
import ProductContent from "./_components/product-content";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductPage({ params }: Props) {
  return (
    <Suspense fallback={<div>Loading</div>}>
      <HeaderServer />
      <ProductContent params={params} />
    </Suspense>
  );
}
