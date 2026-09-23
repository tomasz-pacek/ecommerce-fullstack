type SortValue = "price_asc" | "price_desc" | "newest";

export type SortOption = {
  label: string;
  shortLabel: string;
  value: SortValue;
};
