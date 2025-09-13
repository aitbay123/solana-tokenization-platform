import { Button } from "@/components/ui/button"
import { ArrowRight, Play, Sparkles, Globe, Zap } from "lucide-react"
import Link from "next/link"

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9945FF]/20 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14F195]/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#9945FF]/20 to-[#14F195]/20 border border-white/10 backdrop-blur-sm text-white text-sm font-medium mb-8 hover:scale-105 transition-transform duration-200">
            <Sparkles className="w-4 h-4 mr-2 text-[#14F195]" />
            Powered by Solana Blockchain
            <div className="w-2 h-2 bg-[#14F195] rounded-full ml-2 animate-pulse" />
          </div>

          {/* Main heading with gradient text */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-balance leading-tight">
            <span className="text-white">Tokenize</span>{" "}
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Real-World Assets
            </span>
            <br />
            <span className="text-white">on Solana</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-12 text-pretty max-w-4xl mx-auto leading-relaxed">
            Transform real estate, art, music, and gaming assets into digital tokens. Invest, trade, and manage assets
            with blockchain transparency and fractional ownership.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-20">
            <Link href="/create">
              <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white text-lg px-10 py-6 rounded-xl font-semibold shadow-2xl hover:shadow-[#9945FF]/25 hover:scale-105 transition-all duration-200 border-0">
                Start Tokenizing
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button
                variant="outline"
                className="text-lg px-10 py-6 rounded-xl bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 backdrop-blur-sm hover:scale-105 transition-all duration-200"
              >
                <Play className="w-5 h-5 mr-2" />
                Explore Marketplace
              </Button>
            </Link>
          </div>

          {/* Feature highlights grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-8 h-8 text-[#14F195]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Global Liquidity</h3>
              <p className="text-gray-400 leading-relaxed">
                Trade asset fractions 24/7 on a global marketplace with instant settlement and low fees
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8 text-[#9945FF]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Immersive Experience</h3>
              <p className="text-gray-400 leading-relaxed">
                360° property tours, high-res art viewing, and integrated audio players for music assets
              </p>
            </div>

            <div className="group p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8 text-[#14F195]" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">Solana Speed</h3>
              <p className="text-gray-400 leading-relaxed">
                Lightning-fast transactions with minimal fees powered by Solana's high-performance blockchain
              </p>
            </div>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-12 border-t border-white/10">
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                $2.4B+
              </div>
              <div className="text-gray-400 text-sm">Assets Tokenized</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-gray-400 text-sm">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                15K+
              </div>
              <div className="text-gray-400 text-sm">Assets Listed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                99.9%
              </div>
              <div className="text-gray-400 text-sm">Uptime</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}
