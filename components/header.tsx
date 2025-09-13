"use client"

import { useState } from "react"
import { Menu, X, Search } from "lucide-react"
import { WalletConnectButton } from "@/components/wallet-connect-button"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#070812]/95 backdrop-blur supports-[backdrop-filter]:bg-[#070812]/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo with Solana gradient */}
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => router.push("/")}>
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-[#9945FF] to-[#14F195] flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">S</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl text-white">SolanaTokens</span>
              <span className="text-xs text-gray-400 -mt-1">Asset Tokenization</span>
            </div>
          </div>

          {/* Desktop Navigation with Solana styling */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => router.push("/marketplace")}
              className="text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
            >
              Marketplace
            </button>
            <button
              onClick={() => router.push("/create")}
              className="text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
            >
              Create
            </button>
            <button
              onClick={() => router.push("/portfolio")}
              className="text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
            >
              Portfolio
            </button>
            <button
              onClick={() => router.push("/governance")}
              className="text-gray-300 hover:text-white transition-all duration-200 hover:bg-white/5 px-3 py-2 rounded-lg"
            >
              Governance
            </button>
          </nav>

          {/* Search and Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search assets..."
                className="bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9945FF]/50 focus:border-[#9945FF]/50 w-64"
              />
            </div>
            <WalletConnectButton />
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu with Solana styling */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <nav className="flex flex-col space-y-2">
              <button
                onClick={() => {
                  router.push("/marketplace")
                  setIsMenuOpen(false)
                }}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left px-3 py-2 rounded-lg"
              >
                Marketplace
              </button>
              <button
                onClick={() => {
                  router.push("/create")
                  setIsMenuOpen(false)
                }}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left px-3 py-2 rounded-lg"
              >
                Create
              </button>
              <button
                onClick={() => {
                  router.push("/portfolio")
                  setIsMenuOpen(false)
                }}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left px-3 py-2 rounded-lg"
              >
                Portfolio
              </button>
              <button
                onClick={() => {
                  router.push("/governance")
                  setIsMenuOpen(false)
                }}
                className="text-gray-300 hover:text-white hover:bg-white/5 transition-colors text-left px-3 py-2 rounded-lg"
              >
                Governance
              </button>
              <div className="pt-4 border-t border-white/10 mt-4">
                <WalletConnectButton />
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
