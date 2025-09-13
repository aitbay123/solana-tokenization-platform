"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { ReactNode } from "react"

interface WalletSafeProviderProps {
  children: (wallet: {
    publicKey: any
    disconnect: () => void
    connected: boolean
  }) => ReactNode
  fallback?: ReactNode
}

export function WalletSafeProvider({ children, fallback = null }: WalletSafeProviderProps) {
  try {
    const wallet = useWallet()
    return <>{children(wallet)}</>
  } catch (error) {
    console.warn("Wallet context not available:", error)
    return <>{fallback}</>
  }
}
