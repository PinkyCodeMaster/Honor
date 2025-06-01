import Image from 'next/image'
import React from 'react'


export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="grid min-h-svh lg:grid-cols-2">
            {children}
            <div className="bg-muted relative hidden lg:block">
                <Image
                    src="https://images.unsplash.com/photo-1619760563678-02e23d15f69f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Image by @brotakesphotos on unsplash"
                    className="absolute inset-0 h-full w-full object-cover"
                    fill
                />
            </div>
        </div>
    )
}
