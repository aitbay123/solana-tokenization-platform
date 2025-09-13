"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { FileText, Upload, X, CheckCircle } from "lucide-react"
import type { WizardData } from "../tokenization-wizard"

interface DocumentationStepProps {
  data: WizardData
  updateData: (data: Partial<WizardData>) => void
}

export function DocumentationStep({ data, updateData }: DocumentationStepProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDocumentationChange = (field: keyof WizardData["documentation"], value: any) => {
    updateData({
      documentation: {
        ...data.documentation,
        [field]: value,
      },
    })
  }

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        const newFiles = Array.from(e.dataTransfer.files)
        handleDocumentationChange("documents", [...data.documentation.documents, ...newFiles])
      }
    },
    [data.documentation.documents],
  )

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files)
      handleDocumentationChange("documents", [...data.documentation.documents, ...newFiles])
    }
  }

  const removeDocument = (index: number) => {
    const updatedDocuments = data.documentation.documents.filter((_, i) => i !== index)
    handleDocumentationChange("documents", updatedDocuments)
  }

  const requiredDocuments = [
    "Property deed or ownership certificate",
    "Financial statements (last 2 years)",
    "Legal entity formation documents",
    "Insurance documentation",
    "Regulatory compliance certificates",
    "Third-party valuation report",
  ]

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h3 className="text-2xl font-bold text-white mb-2">Legal Documentation</h3>
        <p className="text-gray-400">Upload required documents for compliance and verification</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Document Upload */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <FileText className="w-5 h-5 text-[#14F195]" />
              Document Upload
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Drag and Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? "border-[#14F195] bg-[#14F195]/10" : "border-white/20 hover:border-white/40"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-white mb-2">Drag and drop files here</p>
              <p className="text-gray-400 text-sm mb-4">or</p>
              <Button
                variant="outline"
                className="bg-white/5 border-white/20 text-white hover:bg-white/10"
                onClick={() => document.getElementById("file-input")?.click()}
              >
                Browse Files
              </Button>
              <input
                id="file-input"
                type="file"
                multiple
                accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                onChange={handleFileInput}
                className="hidden"
              />
            </div>

            {/* Uploaded Files */}
            {data.documentation.documents.length > 0 && (
              <div className="space-y-2">
                <Label className="text-gray-300">Uploaded Documents</Label>
                {data.documentation.documents.map((file, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[#14F195]" />
                      <span className="text-white text-sm">{file.name}</span>
                      <span className="text-gray-400 text-xs">({(file.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeDocument(index)}
                      className="text-red-400 hover:text-red-300 hover:bg-red-400/10"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Legal Structure & Requirements */}
        <Card className="bg-white/5 border-white/10">
          <CardHeader>
            <CardTitle className="text-white">Legal Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="legalStructure" className="text-gray-300">
                Legal Entity Structure
              </Label>
              <Select
                value={data.documentation.legalStructure}
                onValueChange={(value) => handleDocumentationChange("legalStructure", value)}
              >
                <SelectTrigger className="bg-white/5 border-white/20 text-white">
                  <SelectValue placeholder="Select legal structure" />
                </SelectTrigger>
                <SelectContent className="bg-gray-900 border-white/20">
                  <SelectItem value="llc">Limited Liability Company (LLC)</SelectItem>
                  <SelectItem value="corporation">Corporation</SelectItem>
                  <SelectItem value="partnership">Partnership</SelectItem>
                  <SelectItem value="trust">Trust</SelectItem>
                  <SelectItem value="reit">Real Estate Investment Trust (REIT)</SelectItem>
                  <SelectItem value="spv">Special Purpose Vehicle (SPV)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox
                id="kycRequired"
                checked={data.documentation.kycRequired}
                onCheckedChange={(checked) => handleDocumentationChange("kycRequired", checked)}
                className="border-white/20 data-[state=checked]:bg-[#14F195] data-[state=checked]:border-[#14F195]"
              />
              <Label htmlFor="kycRequired" className="text-gray-300">
                KYC/AML verification required for investors
              </Label>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Required Documents Checklist */}
      <Card className="bg-white/5 border-white/10">
        <CardHeader>
          <CardTitle className="text-white">Required Documents Checklist</CardTitle>
          <p className="text-gray-400 text-sm">Ensure you have the following documents ready for upload</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {requiredDocuments.map((doc, index) => (
              <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <CheckCircle className="w-4 h-4 text-[#14F195] flex-shrink-0" />
                <span className="text-gray-300 text-sm">{doc}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Upload Progress */}
      {data.documentation.documents.length > 0 && (
        <Card className="bg-gradient-to-r from-[#9945FF]/10 to-[#14F195]/10 border-white/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-white font-semibold">
                  {data.documentation.documents.length} document(s) uploaded
                </div>
                <div className="text-gray-400 text-sm">
                  Legal structure: {data.documentation.legalStructure || "Not selected"}
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-[#14F195]">
                  {Math.round((data.documentation.documents.length / requiredDocuments.length) * 100)}%
                </div>
                <div className="text-gray-400 text-sm">Complete</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
