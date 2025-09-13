import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { AssetEditForm } from "@/components/marketplace/asset-edit-form"

interface AssetEditPageProps {
  params: {
    id: string
  }
}

export default function AssetEditPage({ params }: AssetEditPageProps) {
  return (
    <div className="min-h-screen bg-[#070812]">
      <Header />
      <main className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-white">Редактировать</span>{" "}
                <span className="bg-gradient-to-r from-[#9945FF] to-[#14F195] bg-clip-text text-transparent">
                  актив
                </span>
              </h1>
              <p className="text-xl text-gray-300">
                Обновите информацию о вашем активе
              </p>
            </div>
            <AssetEditForm assetId={params.id} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
