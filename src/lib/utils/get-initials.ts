export const getInitials = (
  firstName?: string | null,
  lastName?: string | null,
): string => {
  const firstInitial = firstName?.trim().charAt(0) ?? "";
  const lastInitial = lastName?.trim().charAt(0) ?? "";

  return `${firstInitial}${lastInitial}`.toUpperCase();
};
