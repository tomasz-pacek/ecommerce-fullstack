export const formatSpecValue = (value: string | boolean | number | null) => {
  if (value === null) return "-";
  if (typeof value === "boolean") {
    return value ? "Yes" : "No";
  }
  if (typeof value === "number") {
    return String(value);
  }
  return value;
};
