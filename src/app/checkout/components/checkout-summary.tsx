import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CartItem, Laptop } from "@/db/schema";
import { formatPrice } from "@/lib/utils/format-price";
import Image from "next/image";
import { ReactNode } from "react";

type Props = {
  items: {
    cart_items: CartItem;
    laptops: Laptop;
  }[];
  total: number;
  children: ReactNode;
};

export default function CheckoutSummary({ items, total, children }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Summary</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col justify-center gap-4 px-0">
        {items.map((item) => (
          <div key={item.cart_items.id} className="flex gap-4 px-6">
            <div className="relative aspect-6/5 w-24 shrink-0">
              <Image
                src="/macbook-pro-16.png"
                alt={item.laptops.title}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="flex min-w-0 flex-1 flex-col gap-2">
              <p className="truncate font-medium">{item.laptops.title}</p>

              <div className="flex w-full justify-between">
                <p>x{item.cart_items.quantity}</p>
                <p>{formatPrice(item.laptops.priceCents)}</p>
              </div>
            </div>
          </div>
        ))}
        <hr />
        <div className="flex flex-col justify-between gap-4 px-6">
          <div className="flex justify-between">
            Sum: <strong>{(total / 100).toFixed(2)} zł</strong>
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  );
}
