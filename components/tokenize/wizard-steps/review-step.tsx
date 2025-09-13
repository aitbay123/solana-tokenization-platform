"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, Edit, DollarSign, FileText, Shield, TrendingUp, MapPin, Calendar, Users } from "lucide-react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import type { WizardData } from "../tokenization-wizard"

interface ReviewStepProps {
  data: WizardData
  updateData: (data: Partial<WizardData>) => void
}

export function ReviewStep({ data, updateData }: ReviewStepProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Prepare the data for submission
      const submissionData = {
        title: data.basicInfo.title,
        description: data.basicInfo.description,
        location: data.basicInfo.location,
        assetType: data.assetType,
        totalValue: data.financial.totalValue,
        tokenSupply: data.financial.tokenSupply,
        expectedYield: data.financial.expectedYield,
        minimumInvestment: data.financial.minimumInvestment,
        kycRequired: data.documentation.kycRequired,
        legalStructure: data.documentation.legalStructure,
        owner: "Пользователь", // In a real app, this would come from user auth
        // File uploads would be handled separately in a real application
        images: [], // For now, we'll skip file uploads
        audio: null,
        panorama360: null,
        documents: [],
        highlights: [
          "Актив создан пользователем",
          "Готов к инвестированию",
          "Прошел верификацию"
        ]
      }

      // Submit to API
      const response = await fetch('/api/assets/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData),
      })

      if (response.ok) {
        const result = await response.json()
        toast.success("Актив успешно создан!")
        
        // Redirect to the created asset page
        setTimeout(() => {
          router.push(`/marketplace/asset/${result.asset.id}`)
        }, 2000)
      } else {
        const error = await response.json()
        toast.error(`Ошибка создания актива: ${error.error}`)
      }
    } catch (error) {
      console.error('Error submitting asset:', error)
      toast.error("Ошибка при создании актива. Попробуйте еще раз.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const getAssetTypeLabel = (type: string) => {
    switch (type) {
      case "real_estate":
        return "Real Estate"
      case "art":
        return "Digital Art"
      case "music":
        return "Music & Audio"
      case "gaming":
        return "Gaming Assets"
      default:
        return type
    }
  }

  const calculatePricePerToken = () => {
    if (data.financial.totalValue > 0 && data.financial.tokenSupply > 0) {
      return data.financial.totalValue / data.financial.tokenSupply
    }
    return 0
  }

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Review & Submit</h3>
        <p className="text-gray-400">Review all information before submitting your tokenization request</p>
      </div>

      {/* Asset Overview */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-white">Asset Overview</CardTitle>
          <Button variant="ghost" size="sm" className="text-[#14F195] hover:text-[#12D488]">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary" className="bg-[#9945FF]/20 text-[#9945FF] border-[#9945FF]/30">
                  {getAssetTypeLabel(data.assetType)}
                </Badge>
              </div>
              <h4 className="text-xl font-semibold text-white mb-2">{data.basicInfo.title}</h4>
              <p className="text-gray-400 text-sm mb-3">{data.basicInfo.description}</p>
              {data.basicInfo.location && (
                <div className="flex items-center gap-2 text-gray-300">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">{data.basicInfo.location}</span>
                </div>
              )}
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Images uploaded:</span>
                <span className="text-white">{data.basicInfo.images.length}</span>
              </div>
              {data.basicInfo.audio && (
                <div className="flex justify-between">
                  <span className="text-gray-400">Audio file:</span>
                  <CheckCircle className="w-4 h-4 text-[#14F195]" />
                </div>
              )}
              {data.basicInfo.panorama360 && (
                <div className="flex justify-between">
                  <span className="text-gray-400">360° panorama:</span>
                  <CheckCircle className="w-4 h-4 text-[#14F195]" />
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Summary */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-white">
            <DollarSign className="w-5 h-5 text-[#14F195]" />
            Financial Structure
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-[#14F195] hover:text-[#12D488]">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">${data.financial.totalValue.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Total Value</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{data.financial.tokenSupply.toLocaleString()}</div>
              <div className="text-gray-400 text-sm">Token Supply</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">${calculatePricePerToken().toFixed(4)}</div>
              <div className="text-gray-400 text-sm">Price/Token</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{data.financial.expectedYield}%</div>
              <div className="text-gray-400 text-sm">Expected Yield</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documentation & Compliance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-[#9945FF]" />
              Documentation
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-[#14F195] hover:text-[#12D488]">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Documents uploaded:</span>
              <span className="text-white">{data.documentation.documents.length}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Legal structure:</span>
              <span className="text-white">{data.documentation.legalStructure || "Not set"}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">KYC required:</span>
              {data.documentation.kycRequired ? (
                <CheckCircle className="w-4 h-4 text-[#14F195]" />
              ) : (
                <span className="text-gray-400">No</span>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-white">
              <Shield className="w-5 h-5 text-[#14F195]" />
              Compliance
            </CardTitle>
            <Button variant="ghost" size="sm" className="text-[#14F195] hover:text-[#12D488]">
              <Edit className="w-4 h-4 mr-2" />
              Edit
            </Button>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Terms accepted:</span>
              {data.compliance.termsAccepted ? (
                <CheckCircle className="w-4 h-4 text-[#14F195]" />
              ) : (
                <span className="text-red-400">Required</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Regulatory compliance:</span>
              {data.compliance.regulatoryCompliance ? (
                <CheckCircle className="w-4 h-4 text-[#14F195]" />
              ) : (
                <span className="text-red-400">Required</span>
              )}
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-400">Risk disclosure:</span>
              {data.compliance.riskDisclosure ? (
                <CheckCircle className="w-4 h-4 text-[#14F195]" />
              ) : (
                <span className="text-red-400">Required</span>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Submission Summary */}
      <Card className="bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border-white/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <TrendingUp className="w-5 h-5 text-[#14F195]" />
            Tokenization Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-white mb-1">${data.financial.minimumInvestment}</div>
              <div className="text-gray-400 text-sm">Minimum Investment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                {data.financial.minimumInvestment && calculatePricePerToken() > 0
                  ? Math.floor(data.financial.minimumInvestment / calculatePricePerToken()).toLocaleString()
                  : "0"}
              </div>
              <div className="text-gray-400 text-sm">Tokens per Min Investment</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-1">
                <Calendar className="w-6 h-6 mx-auto mb-1" />
              </div>
              <div className="text-gray-400 text-sm">Ready to Launch</div>
            </div>
          </div>

          <Separator className="bg-white/20" />

          <div className="text-center">
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white px-8 py-3 text-lg font-semibold border-0 disabled:opacity-50"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Submitting...
                </>
              ) : (
                <>
                  <Users className="w-5 h-5 mr-2" />
                  Launch Tokenization
                </>
              )}
            </Button>
            <p className="text-gray-400 text-sm mt-2">Your asset will be reviewed and launched within 24-48 hours</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
