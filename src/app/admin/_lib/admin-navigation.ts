import { Laptop, TableOfContents, Users } from "lucide-react";

export const adminNavigationItems = [
  { title: "Overview", url: "/admin", icon: TableOfContents },
  { title: "Catalog", url: "/admin/catalog", icon: Laptop },
  { title: "Customers", url: "/admin/customers", icon: Users },
];
