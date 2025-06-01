"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Eye, EyeOff, Mail, Lock, AlertCircle, GalleryVerticalEnd } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import type React from "react";
import { toast } from "sonner";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({ email: "", password: "", })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const { data: session, isPending } = authClient.useSession()

  useEffect(() => {
    if (!isPending && session) {
      router.replace("/")
    }
  }, [session, isPending, router])

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

  if (!isPending && session) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    await authClient.signIn.email({ email: formData.email, password: formData.password }, {
      onError: (ctx) => {
        setIsLoading(false)
        if (ctx.error.status === 401 || ctx.error.message?.toLowerCase().includes("invalid credentials")) {
          setError("Incorrect email or password")
          toast.error("Incorrect email or password")
          return
        }
        if (ctx.error.status === 403) {
          setError("Please verify your email address")
          toast.error("Please verify your email address")
          return
        }
        setError(ctx.error.message)
        toast.error(ctx.error.message)
      },
      onRequest: () => {
        setIsLoading(true)
      },
      onSuccess: () => {
        toast.success("Login successful")
        setIsLoading(false)
        router.refresh()
        router.push("/")
      }
    })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value, }))
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Wolfpack Defence
          </Link>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Sign In</CardTitle>
            <CardDescription>Enter your email and password to access your account</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className="pl-10 pr-10"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="text-sm">
                  <Link href="/forgot-password" className="text-primary hover:underline">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <div className="mt-6">
              <Separator className="my-4" />
              <div className="text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline font-medium">
                  Sign up
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
