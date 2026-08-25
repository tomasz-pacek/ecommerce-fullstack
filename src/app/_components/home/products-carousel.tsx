import MainPageProductCard from "@/components/shared/main-page-product-card";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Laptop } from "@/db/schema";
import Link from "next/link";

type Props = {
  products: Laptop[];
};
export default async function ProductsCarousel({ products }: Props) {
  const chunkSize = 8;
  const pages = [];
  for (let i = 0; i < products.length; i += chunkSize) {
    pages.push(products.slice(i, i + chunkSize));
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="pb-4">
          <h2 className="text-xl font-medium sm:text-2xl md:text-3xl">
            Products Carousel
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base">
            some text some text some text
          </p>
        </div>

        <Link href="/products">
          <Button className="rounded-xl">View all</Button>
        </Link>
      </div>

      <Carousel className="hidden w-full lg:block">
        <CarouselContent>
          {pages.map((page, index) => (
            <CarouselItem key={index}>
              <div className="grid min-w-0 grid-cols-4 grid-rows-2 gap-4 p-1">
                {page.map((laptop) => (
                  <div key={laptop.id} className="min-w-0">
                    <MainPageProductCard laptop={laptop} />
                  </div>
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <div className="">
          <CarouselPrevious className="left-0 size-10 rounded-xl disabled:hidden" />
          <CarouselNext className="right-0 size-10 rounded-xl disabled:hidden" />
        </div>
      </Carousel>

      <Carousel className="w-full lg:hidden">
        <CarouselContent>
          {products.map((laptop) => (
            <CarouselItem
              key={laptop.id}
              className="min-w-0 basis-1/2 p-1 md:basis-[40%]"
            >
              <div className="">
                <MainPageProductCard laptop={laptop} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
