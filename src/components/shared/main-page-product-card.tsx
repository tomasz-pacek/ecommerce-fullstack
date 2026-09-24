"use client";
import { Laptop } from "@/db/schema";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import ActionButton from "./action-button";
import { ShoppingCartIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils/format-price";
import Link from "next/link";
import useAddToCart from "@/hooks/use-add-to-cart";

type Props = {
  laptop: Laptop;
};

export default function MainPageProductCard({ laptop }: Props) {
  const { handleAddToCart, isPending } = useAddToCart(laptop.id);

  return (
    <Card className="h-full overflow-hidden p-0">
      <CardContent className="flex h-full flex-col p-1.5">
        <Link
          href={`/products/${laptop.slug}`}
          className="relative aspect-3/2 w-full"
        >
          <Image
            src="/macbook-pro-16.png"
            alt="laptop"
            fill
            className="rounded-xl object-cover"
          />
        </Link>
        <div className="flex flex-1 flex-col px-2 pt-2">
          <Link href={`/products/${laptop.slug}`}>
            <p className="line-clamp-2 min-h-10 text-sm font-medium">
              {laptop.title}
            </p>
          </Link>

          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="font-bold md:text-base">
              {formatPrice(laptop.priceCents)}
            </p>
            <ActionButton
              onClick={() => handleAddToCart()}
              className="shrink-0 rounded-full p-2"
              isPending={isPending}
            >
              <ShoppingCartIcon size={20} />
            </ActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
