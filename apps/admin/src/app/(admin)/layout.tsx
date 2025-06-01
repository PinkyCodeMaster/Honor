import type React from "react"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin-sidebar"
import { AdminHeader } from "@/components/admin-header"

export default function AdminLayout({ children, }: { children: React.ReactNode }) {


  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 space-y-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
