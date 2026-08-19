import Breadcrumbs, {
  BreadcrumbItemsType,
} from "@/components/shared/breadcrumbs";
import Reveal from "@/components/shared/reveal";
import { getLaptopBySlug } from "@/db/queries";
import { Route } from "next";
import { notFound } from "next/navigation";
import ProductSpecsSheet from "./product-specs-sheet";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function ProductContent({ params }: Props) {
  const { slug } = await params;
  const laptop = await getLaptopBySlug(slug);
  if (!laptop) return notFound();

  const breadcrumbItems: BreadcrumbItemsType[] = [
    { label: "Home", href: "/" },
    { label: "Products", href: "/products" },
    { label: laptop.title, href: `/products/${slug}` as Route },
  ];
  return (
    <div className="container mx-auto mt-42 flex flex-col px-4">
      <Reveal>
        <Breadcrumbs items={breadcrumbItems} />
      </Reveal>
      <ProductSpecsSheet laptop={laptop} />
    </div>
  );
}
