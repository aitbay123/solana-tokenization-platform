import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssetDetails } from "@/components/marketplace/asset-details"
import { AssetInvestment } from "@/components/marketplace/asset-investment"
import { AssetAnalytics } from "@/components/marketplace/asset-analytics"

interface AssetPageProps {
  params: {
    id: string
  }
}

export default function AssetPage({ params }: AssetPageProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <AssetDetails assetId={params.id} />
              <div className="mt-8">
                <AssetAnalytics assetId={params.id} />
              </div>
            </div>
            <div className="lg:col-span-1">
              <AssetInvestment assetId={params.id} />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
