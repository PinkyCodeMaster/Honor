'use client'
import { AuthDropdown } from "@/components/layouts/auth-dropdown"
import { ProductsCombobox } from "@/components/products-combobox"
// import { CartSheet } from "@/components/checkout/cart-sheet"
import { MobileNav } from "@/components/layouts/mobile-nav"
import { MainNav } from "@/components/layouts/main-nav"
import type { MainNavItem } from "@/types"
import { authClient } from "@/lib/auth-client"

const categories = [
  {
    title: "Airsoft",
    href: "/airsoft",
    description: "Airsoft gear and accessories.",
    items: [
      {
        title: "Airsoft",
        href: "/airsoft",
        description: "Airsoft gear and accessories.",
        items: [],
      },
      {
        title: "Airsoft Guns",
        href: "/airsoft-guns",
        description: "Airsoft guns and accessories.",
        items: [],
      },
      {
        title: "Airsoft Gear",
        href: "/airsoft-gear",
        description: "Airsoft gear and accessories.",
        items: [],
      },
      {
        title: "Airsoft Clothing",
        href: "/airsoft-clothing",
        description: "Airsoft clothing and accessories.",
        items: [],
      },
      {
        title: "Airsoft Equipment",
        href: "/airsoft-equipment",
        description: "Airsoft equipment and accessories.",
        items: [],
      },
    ],
  },
  {
    title: "Paintball",
    href: "/paintball",
    description: "Paintball gear and accessories.",
    items: [
      {
        title: "Paintball",
        href: "/paintball",
        description: "Paintball gear and accessories.",
        items: [],
      },
      {
        title: "Paintball Guns",
        href: "/paintball-guns",
        description: "Paintball guns and accessories.",
        items: [],
      },
      {
        title: "Paintball Gear",
        href: "/paintball-gear",
        description: "Paintball gear and accessories.",
        items: [],
      },
      {
        title: "Paintball Clothing",
        href: "/paintball-clothing",
        description: "Paintball clothing and accessories.",
        items: [],
      },
      {
        title: "Paintball Equipment",
        href: "/paintball-equipment",
        description: "Paintball equipment and accessories.",
        items: [],
      },
    ],
  },
  {
    title: "Realsteel",
    href: "/realsteel",
    description: "Realsteel gear and accessories.",
    items: [
      {
        title: "Realsteel",
        href: "/realsteel",
        description: "Realsteel gear and accessories.",
        items: [],
      },
      {
        title: "Realsteel Guns",
        href: "/realsteel-guns",
        description: "Realsteel guns and accessories.",
        items: [],
      },
      {
        title: "Realsteel Gear",
        href: "/realsteel-gear",
        description: "Realsteel gear and accessories.",
        items: [],
      },
      {
        title: "Realsteel Clothing",
        href: "/realsteel-clothing",
        description: "Realsteel clothing and accessories.",
        items: [],
      },
      {
        title: "Realsteel Equipment",
        href: "/realsteel-equipment",
        description: "Realsteel equipment and accessories.",
        items: [],
      },
    ],
  },
]

const mainNav: MainNavItem[] = [
  {
    title: "Home",
    items: [
      {
        title: "Home",
        href: "/",
        description: "The premier marketplace for airsoft, paintball, and realsteel gear.",
        items: [],
      },
      {
        title: "About",
        href: "/about",
        description: "About us and our mission.",
        items: [],
      },
      {
        title: "Contact",
        href: "/contact",
        description: "Contact us for any questions or concerns.",
        items: [],
      },
    ],
  },
  ...categories.map((category) => ({
    title: category.title,
    href: category.href,
    description: category.description,
    items: category.items,
  })),
]

export function SiteHeader() {
  const {data: session} = authClient.useSession()
  const user = session?.user || null

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background px-4 md:px-0">
      <div className="container mx-auto flex h-16 items-center">
        <MainNav items={mainNav} />
        <MobileNav items={mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            <ProductsCombobox />
            {/* <CartSheet /> */}
            <AuthDropdown user={user} />
          </nav>
        </div>
      </div>
    </header>
  )
}
