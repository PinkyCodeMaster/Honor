"use client"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger, } from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Search, LogOut, Settings, User } from "lucide-react";
import { redirect, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

export function AdminHeader() {

  const { data: session, isPending } = authClient.useSession()
  const router = useRouter()

  if (isPending) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Loading...</CardTitle>
              <CardDescription>Please wait while we check your session</CardDescription>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-primary"></div>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (!session) {
    redirect("/login")
  }

  const user = session.user

  const handleSignOut = async () => {
    await authClient.signOut().finally(() => {
      router.push("/")
    })
  }

  return (
    <header className="border-b bg-background px-6 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input placeholder="Search users, listings, reports..." className="pl-10" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center text-xs">3</Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <div className="space-y-2 p-2">
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                  <p className="text-sm font-medium">New listing flagged</p>
                  <p className="text-xs text-muted-foreground">Airsoft rifle needs review</p>
                </div>
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                  <p className="text-sm font-medium">Dispute opened</p>
                  <p className="text-xs text-muted-foreground">Payment issue reported</p>
                </div>
                <div className="p-2 hover:bg-muted rounded-md cursor-pointer">
                  <p className="text-sm font-medium">User verification</p>
                  <p className="text-xs text-muted-foreground">New documents uploaded</p>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* User Menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="flex items-center gap-2 px-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.image || "/placeholder.svg"} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.role}</p>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <Button variant={"destructive"} onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
