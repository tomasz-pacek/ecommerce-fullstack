import { Laptop } from "@/db/schema";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import ActionButton from "./action-button";
import { ShoppingCartIcon } from "lucide-react";
import { formatPrice } from "@/lib/utils/format-price";

type Props = {
  laptop: Laptop;
};

export default function ProductCard({ laptop }: Props) {
  return (
    <Card className="h-full overflow-hidden p-0">
      <CardContent className="flex h-full flex-col p-1.5">
        <div className="relative aspect-3/2 w-full">
          <Image
            src="/macbook-pro-16.png"
            alt="laptop"
            fill
            className="rounded-xl object-cover"
          />
        </div>
        <div className="flex flex-1 flex-col px-2 pt-2">
          <p className="text-muted-foreground truncate text-sm capitalize">
            {laptop.brand}
          </p>
          <p className="line-clamp-2 min-h-12 text-base font-medium capitalize">
            {laptop.model}
          </p>
          <div className="mt-auto flex items-center justify-between pt-2">
            <p className="font-bold lg:text-lg">
              {formatPrice(laptop.priceCents)}
            </p>
            <ActionButton className="shrink-0 rounded-full p-2">
              <ShoppingCartIcon size={20} />
            </ActionButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
