import { AdminHeader } from '@/components/admin-header'
import { AdminSidebar } from '@/components/admin-sidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

export default function NotFound() {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="min-h-screen flex w-full">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 p-6 space-y-6">NotFound</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
