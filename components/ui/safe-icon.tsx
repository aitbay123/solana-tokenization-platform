"use client"

import { ReactNode, useEffect, useState } from "react"

interface SafeIconProps {
  children: ReactNode
  fallback?: ReactNode
}

export function SafeIcon({ children, fallback = null }: SafeIconProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <>{fallback}</>
  }

  return <>{children}</>
}
