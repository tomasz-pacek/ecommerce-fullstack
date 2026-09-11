"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SortOption } from "@/types/sort";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS: SortOption[] = [
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
  { label: "Newest", value: "newest" },
];

const defaultSortOption: SortOption = SORT_OPTIONS.find(
  (option) => option.value === "newest",
)!;

export default function SelectSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleSelect = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sort", value);
    params.set("page", "1");
    router.push(`${pathname}?${params.toString()}` as Route);
  };

  return (
    <Select
      items={SORT_OPTIONS}
      defaultValue={defaultSortOption.value}
      onValueChange={(value: string | null) => {
        if (value) {
          handleSelect(value);
        }
      }}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue />
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {SORT_OPTIONS.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
