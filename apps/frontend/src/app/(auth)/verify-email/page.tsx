"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, CheckCircle, AlertCircle, RefreshCw } from "lucide-react";
import { useState, useEffect, useCallback, Suspense } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Link from "next/link";

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <RefreshCw className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Loading...</h2>
            <p className="text-muted-foreground">Please wait while we load the page.</p>
          </CardContent>
        </Card>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}

function VerifyEmailContent() {
  const [isLoading, setIsLoading] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [emailInput, setEmailInput] = useState("")

  const searchParams = useSearchParams()
  const router = useRouter()

  const email = searchParams.get("email")
  const token = searchParams.get("token")

  const handleVerifyToken = useCallback(async (verificationToken: string) => {
    setIsVerifying(true)
    setError("")

    try {
      await authClient.verifyEmail({
        query: {
          token: verificationToken
        }
      })
      setSuccess(true)
      router.push("/dashboard")
    } catch (err: unknown) {
      console.log(err)
      setError("An error occurred during verification. Please try again.")
    } finally {
      setIsVerifying(false)
    }
  }, [router])

  useEffect(() => {
    if (token) {
      handleVerifyToken(token)
    }
  }, [token, handleVerifyToken])

  const handleResendEmail = async () => {
    setIsLoading(true)
    setError("")
    setResendSuccess(false)

    const emailToUse = email || emailInput

    if (!emailToUse) {
      setError("Please enter an email address")
      setIsLoading(false)
      return
    }

    try {
      await authClient.sendVerificationEmail({
        email: emailToUse,
        callbackURL: "/dashboard"
      })
      toast.success("Verification email sent successfully!")
      setResendSuccess(true)
    } catch (err: unknown) {
      console.log(err)
      setError("Failed to resend verification email. Please try again.")
      toast.error("Failed to resend verification email. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  // Success state after email verification
  if (success) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold mb-2">Email Verified!</h2>
            <p className="text-muted-foreground mb-4">
              Your email has been successfully verified. You can now access all features of wolfpackdefence.
            </p>
            <p className="text-sm text-muted-foreground mb-6">Redirecting to your dashboard...</p>
            <Button asChild className="w-full">
              <Link href="/dashboard">Go to Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Verifying state
  if (isVerifying) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardContent className="pt-6 text-center">
            <RefreshCw className="h-16 w-16 text-primary mx-auto mb-4 animate-spin" />
            <h2 className="text-2xl font-bold mb-2">Verifying Email...</h2>
            <p className="text-muted-foreground">Please wait while we verify your email address.</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="text-2xl font-bold text-primary">
            wolfpackdefence
          </Link>
          <h1 className="text-2xl font-bold mt-4">Verify Your Email</h1>
          <p className="text-muted-foreground">
            {email ? "Check your inbox to complete registration" : "Enter your email to verify your account"}
          </p>
        </div>

        <Card>
          <CardHeader className="text-center">
            <Mail className="h-16 w-16 text-primary mx-auto mb-4" />
            <CardTitle>Check Your Email</CardTitle>
            <CardDescription>
              {email ? (
                <>We&apos;ve sent a verification link to <strong>{email}</strong></>
              ) : (
                "Enter your email address to receive a verification link"
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {resendSuccess && (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>Verification email sent successfully! Check your inbox.</AlertDescription>
              </Alert>
            )}

            <div className="text-center space-y-4">
              {!email && (
                <div className="space-y-2">
                  <Label htmlFor="email">Email address</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    required
                  />
                </div>
              )}

              <p className="text-sm text-muted-foreground">
                {email
                  ? "Click the verification link in your email to activate your account."
                  : "Enter your email address to receive a verification link."}
              </p>

              <div className="space-y-2">
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={handleResendEmail}
                  disabled={isLoading || (!email && !emailInput)}
                >
                  {isLoading ? "Sending..." : email ? "Resend Verification Email" : "Send Verification Email"}
                </Button>

                <Button asChild variant="ghost" className="w-full">
                  <Link href="/login">Back to Sign In</Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Help Section */}
        <Card className="bg-muted/50">
          <CardContent className="pt-6">
            <div className="text-center text-sm text-muted-foreground space-y-2">
              <p className="font-medium">Didn&apos;t receive the email?</p>
              <ul className="space-y-1">
                <li>• Check your spam or junk folder</li>
                <li>• Make sure you entered the correct email</li>
                <li>• Wait a few minutes and try again</li>
              </ul>
              <p className="mt-4">
                Still having trouble?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact Support
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>

        {process.env.NODE_ENV === "development" && (
          <Card className="bg-primary/5 border-primary/20">
            <CardContent className="pt-6 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                For demo purposes, click here to simulate email verification:
              </p>
              <Button variant="outline" size="sm" onClick={() => handleVerifyToken("valid-token-123")}>
                Simulate Email Verification
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
