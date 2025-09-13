"use client"

import { useState, useEffect, useCallback } from "react"
import { oracleClient, type AssetValuation } from "@/lib/api/oracle-client"

export function useAssetValuation(assetId: string, assetType: string) {
  const [valuation, setValuation] = useState<AssetValuation | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchValuation = useCallback(async () => {
    if (!assetId || !assetType) return

    try {
      setError(null)
      setLoading(true)
      const valuationData = await oracleClient.getAssetValuation(assetId, assetType)
      setValuation(valuationData)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch asset valuation")
      console.error("[v0] Asset valuation fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [assetId, assetType])

  useEffect(() => {
    fetchValuation()
  }, [fetchValuation])

  const refresh = useCallback(() => {
    fetchValuation()
  }, [fetchValuation])

  return {
    valuation,
    loading,
    error,
    refresh,
  }
}
