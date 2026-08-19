export const formatGramsToKilos = (weight: number | null): number | "-" => {
  return weight === null ? "-" : weight / 1000;
};
