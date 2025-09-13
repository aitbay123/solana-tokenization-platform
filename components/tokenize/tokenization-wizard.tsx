"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { AssetTypeStep } from "./wizard-steps/asset-type-step"
import { BasicInfoStep } from "./wizard-steps/basic-info-step"
import { FinancialStep } from "./wizard-steps/financial-step"
import { DocumentationStep } from "./wizard-steps/documentation-step"
import { ComplianceStep } from "./wizard-steps/compliance-step"
import { ReviewStep } from "./wizard-steps/review-step"

export interface WizardData {
  assetType: "real_estate" | "art" | "music" | "gaming" | ""
  basicInfo: {
    title: string
    description: string
    location: string
    images: File[]
    audio?: File
    panorama360?: File
  }
  financial: {
    totalValue: number
    tokenSupply: number
    pricePerToken: number
    expectedYield: number
    minimumInvestment: number
  }
  documentation: {
    documents: File[]
    kycRequired: boolean
    legalStructure: string
  }
  compliance: {
    termsAccepted: boolean
    regulatoryCompliance: boolean
    riskDisclosure: boolean
  }
}

const steps = [
  { id: 1, title: "Asset Type", description: "Choose your asset category" },
  { id: 2, title: "Basic Info", description: "Asset details and media" },
  { id: 3, title: "Financial", description: "Tokenomics and pricing" },
  { id: 4, title: "Documentation", description: "Legal documents" },
  { id: 5, title: "Compliance", description: "Legal requirements" },
  { id: 6, title: "Review", description: "Final review and submit" },
]

export function TokenizationWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [wizardData, setWizardData] = useState<WizardData>({
    assetType: "",
    basicInfo: {
      title: "",
      description: "",
      location: "",
      images: [],
    },
    financial: {
      totalValue: 0,
      tokenSupply: 0,
      pricePerToken: 0,
      expectedYield: 0,
      minimumInvestment: 0,
    },
    documentation: {
      documents: [],
      kycRequired: false,
      legalStructure: "",
    },
    compliance: {
      termsAccepted: false,
      regulatoryCompliance: false,
      riskDisclosure: false,
    },
  })

  const updateWizardData = (stepData: Partial<WizardData>) => {
    setWizardData((prev) => ({ ...prev, ...stepData }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const goToStep = (step: number) => {
    setCurrentStep(step)
  }

  const isStepCompleted = (stepNumber: number) => {
    switch (stepNumber) {
      case 1:
        return wizardData.assetType !== ""
      case 2:
        return wizardData.basicInfo.title !== "" && wizardData.basicInfo.description !== ""
      case 3:
        return wizardData.financial.totalValue > 0 && wizardData.financial.tokenSupply > 0
      case 4:
        return wizardData.documentation.documents.length > 0
      case 5:
        return (
          wizardData.compliance.termsAccepted &&
          wizardData.compliance.regulatoryCompliance &&
          wizardData.compliance.riskDisclosure
        )
      default:
        return false
    }
  }

  const canProceed = () => {
    return isStepCompleted(currentStep)
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <AssetTypeStep data={wizardData} updateData={updateWizardData} />
      case 2:
        return <BasicInfoStep data={wizardData} updateData={updateWizardData} />
      case 3:
        return <FinancialStep data={wizardData} updateData={updateWizardData} />
      case 4:
        return <DocumentationStep data={wizardData} updateData={updateWizardData} />
      case 5:
        return <ComplianceStep data={wizardData} updateData={updateWizardData} />
      case 6:
        return <ReviewStep data={wizardData} updateData={updateWizardData} />
      default:
        return null
    }
  }

  const progressPercentage = (currentStep / steps.length) * 100

  return (
    <div className="space-y-8">
      {/* Progress Header */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-white">
                Step {currentStep} of {steps.length}
              </h2>
              <p className="text-gray-400">{steps[currentStep - 1].title}</p>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-400 mb-1">Progress</div>
              <div className="text-lg font-semibold text-white">{Math.round(progressPercentage)}%</div>
            </div>
          </div>

          <Progress value={progressPercentage} className="h-2 mb-6" />

          {/* Step Navigation */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <button
                  onClick={() => goToStep(step.id)}
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-200 ${
                    step.id === currentStep
                      ? "bg-gradient-to-r from-[#9945FF] to-[#14F195] text-white"
                      : isStepCompleted(step.id)
                        ? "bg-[#14F195] text-white"
                        : "bg-white/10 text-gray-400 hover:bg-white/20"
                  }`}
                >
                  {isStepCompleted(step.id) ? <Check className="w-5 h-5" /> : step.id}
                </button>
                {index < steps.length - 1 && (
                  <div
                    className={`w-12 h-0.5 mx-2 ${
                      isStepCompleted(step.id) ? "bg-[#14F195]" : "bg-white/20"
                    } transition-colors duration-200`}
                  />
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Step Content */}
      <Card className="bg-white/5 border-white/10 backdrop-blur-sm">
        <CardContent className="p-8">{renderStep()}</CardContent>
      </Card>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="bg-white/5 border-white/20 text-white hover:bg-white/10 hover:border-white/30 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>

        <Button
          onClick={nextStep}
          disabled={!canProceed() || currentStep === steps.length}
          className="bg-gradient-to-r from-[#9945FF] to-[#14F195] hover:from-[#8A3FE8] hover:to-[#12D488] text-white disabled:opacity-50 disabled:cursor-not-allowed border-0"
        >
          {currentStep === steps.length ? "Submit" : "Next"}
          <ChevronRight className="w-4 h-4 ml-2" />
        </Button>
      </div>
    </div>
  )
}
