export const formatPrice = (price: number | null): string => {
  if (price === null) return "-";

  return new Intl.NumberFormat("pl-PL", {
    style: "currency",
    currency: "PLN",
  }).format(price / 100);
};
