"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { SortOption } from "@/types/sort";
import { Route } from "next";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const SORT_OPTIONS: SortOption[] = [
  { label: "Price: Low to High", shortLabel: "Price ↑", value: "price_asc" },
  { label: "Price: High to Low", shortLabel: "Price ↓", value: "price_desc" },
  { label: "Newest", shortLabel: "Newest", value: "newest" },
];

const defaultSortOption: SortOption = SORT_OPTIONS.find(
  (option) => option.value === "newest",
)!;

export default function SelectSort() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentValue = searchParams.get("sort") ?? defaultSortOption.value;
  const currentOption =
    SORT_OPTIONS.find((o) => o.value === currentValue) ?? defaultSortOption;

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
      <SelectTrigger className="xs:text-sm w-auto text-xs">
        <SelectValue>{currentOption.shortLabel}</SelectValue>
      </SelectTrigger>
      <SelectContent alignItemWithTrigger={false}>
        <SelectGroup>
          {SORT_OPTIONS.map(({ label, value }) => (
            <SelectItem
              key={value}
              value={value}
              className={cn(value === currentOption.value && "bg-accent")}
            >
              {label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
