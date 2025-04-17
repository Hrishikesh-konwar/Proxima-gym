import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "FitZone -",
  description: "Join our state-of-the-art fitness center and start your journey to a healthier, stronger you.",
  generator: 'v0.dev',
  icons: {
    icon: "/dumbell.png", // or "/favicon.png" if you're using PNG
  },

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  )
}


import './globals.css'