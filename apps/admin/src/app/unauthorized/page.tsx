"use client"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, LogOut } from "lucide-react"

export default function UnauthorizedPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending) {
      if (!session) {
        router.push("/login")
        return
      }

      const user = session.user
      if (!user || user.role === "admin") {
        router.push("/dashboard")
        return
      }
    }
  }, [session, isPending, router])

  const handleSignOut = async () => {
    try {
      await authClient.signOut()
      router.push("/")
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  // Show loading state while checking authentication
  if (isPending) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    )
  }

  // This will only render briefly before redirect
  if (!session || !session.user || session.user.role === "admin") {
    return null
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
            <AlertCircle className="h-6 w-6 text-red-600" />
          </div>
          <CardTitle className="text-xl font-semibold text-gray-900">Access Restricted</CardTitle>
          <CardDescription className="text-gray-600">
            You don't have permission to access this page. Please contact your administrator if you believe this is an
            error.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-gray-50 p-4">
            <div className="text-sm">
              <p className="font-medium text-gray-900">Current User:</p>
              <p className="text-gray-600">{session.user.email}</p>
              <p className="text-gray-600">Role: {session.user.role}</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <Button onClick={() => router.push("/dashboard")} className="w-full">
              Go to Dashboard
            </Button>
            <Button onClick={handleSignOut} variant="destructive" className="w-full">
              <LogOut className="mr-2 h-4 w-4" />
              Sign Out
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
