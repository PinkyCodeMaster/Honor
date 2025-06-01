import { SiteHeader } from '@/components/layouts/site-header';
import { authClient } from '@/lib/auth-client';
import { headers } from 'next/headers';
import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'wolfpackdefence',
  description: 'The premier marketplace for airsoft, paintball, and realsteel gear.',
  generator: 'wolfpackdefence',
}

export default async function RootLayout({ children, }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        {children}
      </main>
      {/* Footer */}
      <footer className="border-t bg-background py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-semibold mb-4">wolfpackdefence</h5>
              <p className="text-sm text-muted-foreground">
                The premier marketplace for airsoft, paintball, and realsteel gear.
              </p>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Categories</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/airsoft">Airsoft</Link>
                </li>
                <li>
                  <Link href="/paintball">Paintball</Link>
                </li>
                <li>
                  <Link href="/realsteel">Realsteel</Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Support</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/help">Help Center</Link>
                </li>
                <li>
                  <Link href="/contact">Contact Us</Link>
                </li>
                <li>
                  <Link href="/safety">Safety Guidelines</Link>
                </li>
              </ul>
            </div>

            <div>
              <h5 className="font-semibold mb-4">Legal</h5>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link href="/terms">Terms of Use</Link>
                </li>
                <li>
                  <Link href="/privacy">Privacy Policy</Link>
                </li>
                <li>
                  <Link href="/seller-guidelines">Seller Guidelines</Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; 2024 wolfpackdefence. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
