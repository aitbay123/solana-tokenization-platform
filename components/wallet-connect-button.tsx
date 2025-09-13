"use client"

import { useWallet } from "@solana/wallet-adapter-react"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui"
import { Button } from "@/components/ui/button"
import { Wallet, Copy, ExternalLink, LogOut, ChevronDown } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { toast } from "sonner"
import { SafeIcon } from "@/components/ui/safe-icon"
import { WalletSafeProvider } from "@/components/wallet-safe-provider"

function WalletConnectButtonContent() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <WalletSafeProvider
      fallback={
        <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white border-0 rounded-xl h-11 px-6 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
          <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
            <Wallet className="w-4 h-4 mr-2" />
          </SafeIcon>
          Connect Wallet
        </Button>
      }
    >
      {({ publicKey, disconnect, connected }) => {

  const copyAddress = async () => {
    if (publicKey) {
      await navigator.clipboard.writeText(publicKey.toString())
      toast.success("Wallet address copied!")
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setIsOpen(false)
    toast.success("Wallet disconnected")
  }

  if (!isMounted) {
    return (
      <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white border-0 rounded-xl h-11 px-6 text-sm font-semibold transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105">
        <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
          <Wallet className="w-4 h-4 mr-2" />
        </SafeIcon>
        Connect Wallet
      </Button>
    )
  }

  if (!connected || !publicKey) {
    return (
      <div className="wallet-adapter-button-trigger">
        <WalletMultiButton className="!bg-gradient-to-r !from-[#9945FF] !to-[#14F195] hover:!from-[#8A3FE8] hover:!to-[#12D488] !text-white !border-0 !rounded-xl !h-11 !px-6 !text-sm !font-semibold !transition-all !duration-200 !shadow-lg hover:!shadow-xl hover:!scale-105">
          <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
            <Wallet className="w-4 h-4 mr-2" />
          </SafeIcon>
          Connect Wallet
        </WalletMultiButton>
      </div>
    )
  }

  const shortenAddress = (address: string) => {
    return `${address.slice(0, 4)}...${address.slice(-4)}`
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button className="bg-white/10 border border-white/20 hover:bg-white/20 text-white backdrop-blur-sm rounded-xl h-11 px-4 transition-all duration-200 hover:scale-105">
          <div className="w-2 h-2 bg-[#14F195] rounded-full mr-2 animate-pulse" />
          <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
            <Wallet className="w-4 h-4 mr-2" />
          </SafeIcon>
          {shortenAddress(publicKey.toString())}
          <SafeIcon fallback={<span className="w-4 h-4 ml-2" />}>
            <ChevronDown className="w-4 h-4 ml-2" />
          </SafeIcon>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 bg-[#1A1C24] border-white/10 backdrop-blur-xl">
        <div className="px-3 py-2">
          <p className="text-sm font-semibold text-white">Connected Wallet</p>
          <p className="text-xs text-gray-400 font-mono">{shortenAddress(publicKey.toString())}</p>
          <div className="flex items-center mt-1">
            <div className="w-2 h-2 bg-[#14F195] rounded-full mr-2" />
            <span className="text-xs text-[#14F195]">Devnet</span>
          </div>
        </div>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={copyAddress}
          className="cursor-pointer text-gray-300 hover:text-white hover:bg-white/5"
        >
          <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
            <Copy className="w-4 h-4 mr-2" />
          </SafeIcon>
          Copy Address
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a
            href={`https://explorer.solana.com/address/${publicKey.toString()}?cluster=devnet`}
            target="_blank"
            rel="noopener noreferrer"
            className="cursor-pointer text-gray-300 hover:text-white hover:bg-white/5"
          >
            <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
              <ExternalLink className="w-4 h-4 mr-2" />
            </SafeIcon>
            View in Explorer
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator className="bg-white/10" />
        <DropdownMenuItem
          onClick={handleDisconnect}
          className="cursor-pointer text-red-400 hover:text-red-300 hover:bg-red-500/10"
        >
          <SafeIcon fallback={<span className="w-4 h-4 mr-2" />}>
            <LogOut className="w-4 h-4 mr-2" />
          </SafeIcon>
          Disconnect
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
      }}
    </WalletSafeProvider>
  )
}

export function WalletConnectButton() {
  return <WalletConnectButtonContent />
}
