import type React from "react"
import type { Metadata } from "next"
import { Inter, Kristi } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const kristi = Kristi({
  subsets: ["latin"],
  variable: "--font-kristi",
  weight: "400",
})

export const metadata: Metadata = {
  title: "You Move The World",
  description: "Create your personalised visual in just a few steps",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${kristi.variable}`}>
      <body className="font-inter">{children}</body>
    </html>
  )
}
