import { ThemeProvider } from "@/components/theme/theme-provider";
import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "wolfpackdefence",
  description: "The premier marketplace for airsoft, paintball, and realsteel gear.",
  generator: "wolfpackdefence",
};

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-background antialiased">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
