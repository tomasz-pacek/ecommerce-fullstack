"use client";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { formatPrice } from "@/lib/utils/format-price";
import ActionButton from "@/components/shared/action-button";
import { ShoppingCartIcon } from "lucide-react";
import { Laptop } from "@/db/schema";
import ProductCardSpecs from "./product-card-specs";
import { useTransition } from "react";
import { addToCart } from "@/actions/cart";
import { toast } from "@/components/ui/toast";

type Props = {
  laptop: Laptop;
};

export default function ProductCard({ laptop }: Props) {
  const [isPending, startTransition] = useTransition();

  const handleAddToCart = () => {
    startTransition(async () => {
      try {
        await addToCart(laptop.id, 1);
        toast.add({ title: "Product added to cart", type: "success" });
      } catch (error) {
        toast.add({
          title: `Something went wrong: ${error}`,
          type: "error",
        });
      }
    });
  };

  return (
    <Card className="h-full p-0">
      <CardContent className="h-full p-1.5">
        <Link href={`/products/${laptop.slug}`} className="relative aspect-3/2">
          <Image
            src="/macbook-pro-16.png"
            alt={laptop.title}
            fill
            className="rounded-xl object-cover"
          />
        </Link>

        <div className="flex flex-1 flex-col px-2">
          <Link href={`/products/${laptop.slug}`}>
            <p className="line-clamp-2 text-base font-medium">{laptop.title}</p>
          </Link>

          <ProductCardSpecs laptop={laptop} />

          <div className="mt-auto flex items-center justify-between pt-4">
            <p className="font-semibold md:text-lg">
              {formatPrice(laptop.priceCents)}
            </p>

            <ActionButton
              onClick={handleAddToCart}
              isPending={isPending}
              className="shrink-0 rounded-full p-2"
            >
              <ShoppingCartIcon size={20} />
            </ActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
