import { buttonVariants } from "@/components/ui/button";
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function EmptyCart() {
  return (
    <Empty>
      <EmptyHeader>
        <EmptyMedia>
          <ShoppingCart />
        </EmptyMedia>
        <EmptyTitle>No Items Yet</EmptyTitle>
        <EmptyDescription>
          No machines yet. Explore the catalog and find the laptop that matches
          the way you actually work.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Link
          href="/products"
          className={buttonVariants({
            variant: "default",
          })}
        >
          Browse Products
        </Link>
      </EmptyContent>
    </Empty>
  );
}
