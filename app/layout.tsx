import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "sonner"
import { WalletContextProvider } from "@/components/wallet-provider"
import { Suspense } from "react"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "SolanaTokens - Платформа токенизации активов",
  description: "Токенизируйте реальные активы на блокчейне Solana",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className="dark">
      <body className={`font-sans ${inter.variable} antialiased`}>
        <WalletContextProvider>
          <Suspense fallback={null}>
            {children}
          </Suspense>
          <Toaster position="top-right" />
        </WalletContextProvider>
        <Analytics />
      </body>
    </html>
  )
}
