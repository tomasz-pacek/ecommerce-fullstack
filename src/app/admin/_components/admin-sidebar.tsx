"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Route } from "next";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNavigationItems } from "../_lib/admin-navigation";

export function AdminSidebar() {
  const pathname = usePathname();
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarTrigger />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="space-y-2 font-medium">
          {adminNavigationItems.map((item) => {
            const isActive =
              item.url === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.url);
            return (
              <SidebarMenu key={item.title}>
                <SidebarMenuItem>
                  <SidebarMenuButton
                    isActive={isActive}
                    tooltip={item.title}
                    render={<Link href={item.url as Route} />}
                  >
                    <item.icon className="mr-2" />
                    {item.title}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            );
          })}
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
