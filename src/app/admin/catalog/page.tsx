import { Suspense, ViewTransition } from "react";
import CatalogContent from "./_components/catalog-content";
import { getLaptopsForAdminPanel } from "@/db/queries";

export default async function AdminCatalogPage() {
  const laptops = await getLaptopsForAdminPanel();
  return (
    <ViewTransition default="none" enter="fade-in" exit="fade-out">
      <Suspense>
        <CatalogContent laptops={laptops} />
      </Suspense>
    </ViewTransition>
  );
}
