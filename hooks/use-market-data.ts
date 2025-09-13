"use client"

import { useState, useEffect, useCallback } from "react"
import { oracleClient, type MarketData } from "@/lib/api/oracle-client"

export function useMarketData(refreshInterval = 60000) {
  const [marketData, setMarketData] = useState<MarketData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMarketData = useCallback(async () => {
    try {
      setError(null)
      const data = await oracleClient.getMarketData()
      setMarketData(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch market data")
      console.error("[v0] Market data fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMarketData()

    // Set up auto-refresh interval
    const interval = setInterval(fetchMarketData, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchMarketData, refreshInterval])

  const refresh = useCallback(() => {
    setLoading(true)
    fetchMarketData()
  }, [fetchMarketData])

  return {
    marketData,
    loading,
    error,
    refresh,
  }
}
