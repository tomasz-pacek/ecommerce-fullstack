import { Card, CardContent } from "@/components/ui/card";
import type { CartItem, Laptop } from "@/db/schema";
import RemoveCartItemButton from "./remove-cart-item-button";
import CartItemQuantity from "./cart-item-quantity";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { formatPrice } from "@/lib/utils/format-price";

type Props = {
  item: {
    cart_items: CartItem;
    laptops: Laptop;
  };
};

export default function CartItemWrapper({ item }: Props) {
  return (
    <Card className="p w-full">
      <CardContent className="xs:flex-row flex w-full flex-col items-stretch justify-start gap-4 px-4 sm:gap-6">
        <div className="xs:w-32 relative aspect-square w-full shrink-0">
          <Image
            src="/macbook-pro-16.png"
            fill
            alt="macbook"
            className="rounded-xl object-cover"
          />
        </div>

        <div className="flex w-full flex-1 flex-col justify-between gap-4 sm:gap-0">
          <div>
            <div className="flex w-full flex-row items-start justify-between gap-2">
              <p className="text-foreground lince-clamp-2 text-base font-medium">
                {item.laptops.title}
              </p>
              <RemoveCartItemButton cartItemId={item.cart_items.laptopId} />
            </div>
            <div className="font-jetbrains mt-2 flex flex-row items-start gap-2">
              <Badge variant="outline" className="sm:p-3">
                {item.laptops.cpuModel}
              </Badge>
              <Badge variant="outline" className="sm:p-3">
                {item.laptops.ramGb}GB RAM
              </Badge>
              <Badge variant="outline" className="uppercase sm:p-3">
                {`${item.laptops.storageGb}GB ${item.laptops.storageType}`}
              </Badge>
            </div>
          </div>
          <div className="flex flex-row items-end justify-between gap-3">
            <CartItemQuantity
              laptopId={item.laptops.id}
              maxAvailableLaptops={item.laptops.quantity}
            />
            <p className="text-lg font-bold sm:text-xl">
              {formatPrice(item.laptops.priceCents)}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
