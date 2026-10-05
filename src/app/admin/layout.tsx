export const instant = false; //making the page dynamic not pre-rendering it

import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "./_components/admin-sidebar";
import { getCurrentSession } from "@/lib/auth-utils";
import { redirect } from "next/navigation";
import { TooltipProvider } from "@/components/ui/tooltip";
import AdminHeader from "./_components/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentSession();
  if (!session?.user || session.user.role !== "admin") {
    redirect("/");
  }

  return (
    <TooltipProvider>
      <SidebarProvider>
        <AdminSidebar />
        <main className="flex w-screen flex-col justify-start">
          <AdminHeader />
          {children}
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
