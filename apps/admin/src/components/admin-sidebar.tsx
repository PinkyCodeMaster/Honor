"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar"
import {
  LayoutDashboard,
  Users,
  Package,
  Flag,
  MessageSquare,
  CreditCard,
  BarChart3,
  Settings,
  Shield,
  FileText,
  AlertTriangle,
  Gavel,
  Eye,
  UserCheck,
  DollarSign,
} from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Overview",
    items: [
      { title: "Dashboard", href: "/", icon: LayoutDashboard },
      { title: "Analytics", href: "/analytics", icon: BarChart3 },
    ],
  },
  {
    title: "User Management",
    items: [
      { title: "All Users", href: "/user-management/users", icon: Users },
      { title: "Verification Queue", href: "/user-management/verification", icon: UserCheck },
      { title: "Suspended Users", href: "/user-management/suspended", icon: Shield },
    ],
  },
  {
    title: "Content Management",
    items: [
      { title: "All Listings", href: "/content-management/listings", icon: Package },
      { title: "Pending Approval", href: "/content-management/pending", icon: Eye },
      { title: "Flagged Content", href: "/content-management/flagged", icon: Flag },
      { title: "Categories", href: "/content-management/categories", icon: FileText },
    ],
  },
  {
    title: "Trust & Safety",
    items: [
      { title: "Reports", href: "/reports", icon: AlertTriangle },
      { title: "Disputes", href: "/disputes", icon: Gavel },
      { title: "Reviews", href: "/reviews", icon: MessageSquare },
    ],
  },
  {
    title: "Financial",
    items: [
      { title: "Transactions", href: "/transactions", icon: CreditCard },
      { title: "Payouts", href: "/payouts", icon: DollarSign },
    ],
  },
  {
    title: "System",
    items: [
      { title: "Settings", href: "/settings", icon: Settings },
      { title: "Audit Logs", href: "/audit", icon: FileText },
    ],
  },
]

export function AdminSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar className="border-r">
      <SidebarHeader className="p-4">
        <h2 className="text-lg font-semibold">Admin Panel</h2>
        <p className="text-sm text-muted-foreground">Marketplace Management</p>
      </SidebarHeader>

      <SidebarContent>
        {menuItems.map((group) => (
          <SidebarGroup key={group.title}>
            <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={pathname === item.href}>
                      <Link href={item.href}>
                        <item.icon className="w-4 h-4" />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </Sidebar>
  )
}
