"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { Icons } from "@/components/icons";
import { User } from "better-auth";
import { cn } from "@/lib/utils";
import * as React from "react";
import Link from "next/link";

interface AuthDropdownProps
  extends React.ComponentPropsWithRef<typeof DropdownMenuTrigger>,
  ButtonProps {
  user: User | null
}

export function AuthDropdown({ user, className, ...props }: AuthDropdownProps) {
  const router = useRouter()

  if (!user) {
    return (
      <Button size="sm" className={cn(className)} {...props} asChild>
        <Link href="/login">
          Sign In
          <span className="sr-only">Sign In</span>
        </Link>
      </Button>
    )
  }

  const initials = `${user.name?.split(" ")[0]?.charAt(0) ?? ""} ${user.name?.split(" ")[1]?.charAt(0) ?? ""}`

  const handleSignOut = async () => {
    await authClient.signOut().finally(() => {
      router.push("/")
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className={cn("size-8 rounded-full", className)} {...props}>
          <Avatar className="size-8">
            <AvatarImage src={user.image ?? ""} alt={user.name ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.name}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <React.Suspense
          fallback={
            <div className="flex flex-col space-y-1.5 p-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded-sm" />
              ))}
            </div>
          }
        >
          <AuthDropdownGroup />
        </React.Suspense>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={handleSignOut}>
            <ExitIcon className="mr-2 size-4" aria-hidden="true" />
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function AuthDropdownGroup() {

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href="/dashboard">
          <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
          Dashboard
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/billing">
          <Icons.credit className="mr-2 size-4" aria-hidden="true" />
          Billing
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings">
          <GearIcon className="mr-2 size-4" aria-hidden="true" />
          Settings
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  )
}
