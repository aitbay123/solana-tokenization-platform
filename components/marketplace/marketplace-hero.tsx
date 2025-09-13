
import { Search, TrendingUp, Users, DollarSign } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function MarketplaceHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      {/* Animated background gradients */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#9945FF]/10 rounded-full blur-3xl animate-float" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#14F195]/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
            <span className="text-white">Discover</span>{" "}
            <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
              Tokenized Assets
            </span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 text-pretty leading-relaxed">
            Trade fractions of real estate, art, music, and gaming assets on a global marketplace with instant
            settlement
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto mb-12">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search assets by name, type, or location..."
                className="pl-12 h-14 text-base bg-white/5 border-white/10 text-white placeholder-gray-400 focus:border-[#9945FF]/50 focus:ring-[#9945FF]/50 rounded-xl backdrop-blur-sm"
              />
            </div>
            <Button className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white h-14 px-8 rounded-xl font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 border-0">
              Search Assets
            </Button>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <DollarSign className="w-7 h-7 text-[#14F195]" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                $2.4B+
              </div>
              <div className="text-gray-400">Trading Volume</div>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-7 h-7 text-[#9945FF]" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                15K+
              </div>
              <div className="text-gray-400">Active Assets</div>
            </div>

            <div className="group p-6 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-all duration-300">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#9945FF]/20 to-[#14F195]/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                <Users className="w-7 h-7 text-[#14F195]" />
              </div>
              <div className="text-3xl font-bold bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent mb-2">
                50K+
              </div>
              <div className="text-gray-400">Investors</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
