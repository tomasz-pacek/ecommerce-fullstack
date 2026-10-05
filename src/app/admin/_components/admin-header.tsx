"use client";

import { usePathname } from "next/navigation";
import { adminNavigationItems } from "../_lib/admin-navigation";
import ThemeToggle from "@/components/shared/theme-toggle";

export default function AdminHeader() {
  const pathname = usePathname();
  const currentPage = adminNavigationItems.find((item) =>
    item.url === "/admin"
      ? pathname === "/admin"
      : pathname.startsWith(item.url),
  );
  return (
    <div className="bg-background sticky top-0 z-50 flex h-16 items-center justify-between border-b px-4">
      <span>{currentPage?.title ?? "Page"}</span>
      <ThemeToggle />
    </div>
  );
}
