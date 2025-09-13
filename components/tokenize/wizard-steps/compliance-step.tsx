"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Shield, AlertTriangle, CheckCircle, FileText, Users, Globe } from "lucide-react"
import type { WizardData } from "../tokenization-wizard"

interface ComplianceStepProps {
  data: WizardData
  updateData: (data: Partial<WizardData>) => void
}

export function ComplianceStep({ data, updateData }: ComplianceStepProps) {
  const handleComplianceChange = (field: keyof WizardData["compliance"], value: boolean) => {
    updateData({
      compliance: {
        ...data.compliance,
        [field]: value,
      },
    })
  }

  const allCompleted =
    data.compliance.termsAccepted && data.compliance.regulatoryCompliance && data.compliance.riskDisclosure

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Compliance & Legal</h3>
        <p className="text-gray-400">Review and accept all legal requirements and disclosures</p>
      </div>

      {/* Regulatory Compliance */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <Shield className="w-5 h-5 text-[#14F195]" />
            Regulatory Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="regulatoryCompliance"
              checked={data.compliance.regulatoryCompliance}
              onCheckedChange={(checked) => handleComplianceChange("regulatoryCompliance", checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-[#14F195] data-[state=checked]:border-[#14F195] mt-1"
            />
            <div className="space-y-2">
              <Label htmlFor="regulatoryCompliance" className="text-white font-medium">
                I confirm regulatory compliance
              </Label>
              <p className="text-gray-400 text-sm leading-relaxed">
                I acknowledge that this tokenization complies with all applicable securities laws, including SEC
                regulations, state securities laws, and international compliance requirements. The asset has been
                properly structured as a security token offering and meets all regulatory requirements for public or
                private placement.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Risk Disclosure */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            Risk Disclosure
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="riskDisclosure"
              checked={data.compliance.riskDisclosure}
              onCheckedChange={(checked) => handleComplianceChange("riskDisclosure", checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-[#14F195] data-[state=checked]:border-[#14F195] mt-1"
            />
            <div className="space-y-2">
              <Label htmlFor="riskDisclosure" className="text-white font-medium">
                I acknowledge investment risks
              </Label>
              <p className="text-gray-400 text-sm leading-relaxed">
                I understand that tokenized assets carry significant risks including market volatility, liquidity risks,
                regulatory changes, technology risks, and potential total loss of investment. Past performance does not
                guarantee future results. Investors should carefully consider their risk tolerance and investment
                objectives.
              </p>
            </div>
          </div>

          <Alert className="bg-yellow-500/10 border-yellow-500/20">
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <AlertDescription className="text-yellow-200">
              <strong>Important:</strong> Tokenized assets are speculative investments. Only invest what you can afford
              to lose.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Terms and Conditions */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-white">
            <FileText className="w-5 h-5 text-[#9945FF]" />
            Terms and Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <Checkbox
              id="termsAccepted"
              checked={data.compliance.termsAccepted}
              onCheckedChange={(checked) => handleComplianceChange("termsAccepted", checked as boolean)}
              className="border-white/20 data-[state=checked]:bg-[#14F195] data-[state=checked]:border-[#14F195] mt-1"
            />
            <div className="space-y-2">
              <Label htmlFor="termsAccepted" className="text-white font-medium">
                I accept the Terms and Conditions
              </Label>
              <p className="text-gray-400 text-sm leading-relaxed">
                I have read, understood, and agree to be bound by the Platform Terms of Service, Privacy Policy, Token
                Sale Agreement, and all applicable legal documents. I understand the platform fees, token mechanics, and
                my rights and obligations as a token issuer.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Compliance Summary */}
      <Card
        className={`border-2 transition-colors ${
          allCompleted
            ? "bg-gradient-to-r from-[#14F195]/10 to-[#9945FF]/10 border-[#14F195]/30"
            : "bg-white/5 border-white/10"
        }`}
      >
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {allCompleted ? (
                <CheckCircle className="w-8 h-8 text-[#14F195]" />
              ) : (
                <Shield className="w-8 h-8 text-gray-400" />
              )}
              <div>
                <h4 className="text-lg font-semibold text-white">
                  {allCompleted ? "Compliance Complete" : "Compliance Required"}
                </h4>
                <p className="text-gray-400 text-sm">
                  {allCompleted
                    ? "All legal requirements have been acknowledged"
                    : "Please review and accept all compliance requirements"}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">
                {Object.values(data.compliance).filter(Boolean).length}/3
              </div>
              <div className="text-gray-400 text-sm">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Legal Disclaimers */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <Users className="w-8 h-8 text-[#9945FF] mx-auto mb-2" />
            <h5 className="text-white font-medium mb-1">Investor Protection</h5>
            <p className="text-gray-400 text-xs">All investors must complete KYC/AML verification</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <Globe className="w-8 h-8 text-[#14F195] mx-auto mb-2" />
            <h5 className="text-white font-medium mb-1">Global Compliance</h5>
            <p className="text-gray-400 text-xs">Adheres to international securities regulations</p>
          </CardContent>
        </Card>

        <Card className="bg-white/5 border-white/10">
          <CardContent className="p-4 text-center">
            <Shield className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
            <h5 className="text-white font-medium mb-1">Secure Platform</h5>
            <p className="text-gray-400 text-xs">Built on audited smart contracts and secure infrastructure</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
