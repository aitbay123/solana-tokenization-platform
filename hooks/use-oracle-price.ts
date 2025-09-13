"use client"

import { useState, useEffect, useCallback } from "react"
import { oracleClient, type PriceData } from "@/lib/api/oracle-client"

export function useOraclePrice(symbols: string[], refreshInterval = 30000) {
  const [prices, setPrices] = useState<PriceData[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdated, setLastUpdated] = useState<number>(0)

  const fetchPrices = useCallback(async () => {
    try {
      setError(null)
      const priceData = await oracleClient.getCryptoPrices(symbols)
      setPrices(priceData)
      setLastUpdated(Date.now())
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch prices")
      console.error("[v0] Oracle price fetch error:", err)
    } finally {
      setLoading(false)
    }
  }, [symbols])

  useEffect(() => {
    fetchPrices()

    // Set up auto-refresh interval
    const interval = setInterval(fetchPrices, refreshInterval)

    return () => clearInterval(interval)
  }, [fetchPrices, refreshInterval])

  const getPriceBySymbol = useCallback(
    (symbol: string) => {
      return prices.find((p) => p.symbol === symbol)
    },
    [prices],
  )

  const refresh = useCallback(() => {
    setLoading(true)
    fetchPrices()
  }, [fetchPrices])

  return {
    prices,
    loading,
    error,
    lastUpdated,
    getPriceBySymbol,
    refresh,
  }
}
