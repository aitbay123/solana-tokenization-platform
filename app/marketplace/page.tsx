import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { MarketplaceHero } from "@/components/marketplace/marketplace-hero"
import { AssetFilters } from "@/components/marketplace/asset-filters"
import { AssetGrid } from "@/components/marketplace/asset-grid"

export default function MarketplacePage() {
  return (
    <div className="min-h-screen bg-[#070812]">
      <Header />
      <main>
        <MarketplaceHero />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row gap-8">
            <aside className="lg:w-80">
              <AssetFilters />
            </aside>
            <div className="flex-1">
              <AssetGrid />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
