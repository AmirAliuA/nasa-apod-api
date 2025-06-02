"use client"

import { useEffect, useState } from "react"

import { checkAPIKeyStatus } from "@/lib/nasa-api"
import { cn } from "@/lib/utils"

import { AlertTriangle, Info, Loader2, CheckCircle } from "lucide-react"

interface APIStatus {
  isWorking: boolean
  usingDemoKey: boolean
  error?: string
}

export function APIStatusBanner() {
  const [status, setStatus] = useState<APIStatus | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const apiStatus = await checkAPIKeyStatus()
        console.log("API Status received:", apiStatus) // Debug log
        setStatus(apiStatus)
      } catch (error) {
        console.error("API Status check error:", error)
        setStatus({
          isWorking: false,
          usingDemoKey: true,
          error: "Failed to check API status",
        })
      } finally {
        setIsLoading(false)
      }
    }

    checkStatus()
  }, [])

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/30 bg-card/50 backdrop-blur-sm">
        <Loader2 className="h-4 w-4 animate-spin text-blue-500" />
        <span className="text-xs font-medium text-blue-600 dark:text-blue-400">Checking API...</span>
      </div>
    )
  }

  // No status received
  if (!status) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-yellow-500/30 bg-card/50 backdrop-blur-sm">
        <AlertTriangle className="h-4 w-4 text-yellow-600 dark:text-yellow-400" />
        <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">No API status</span>
      </div>
    )
  }

  // Determine status content based on API response
  const getAlertContent = () => {
    console.log("Status evaluation:", {
      isWorking: status.isWorking,
      usingDemoKey: status.usingDemoKey,
      error: status.error,
    }) // Debug log

    // Case 1: API key is not working (403/401 errors)
    if (!status.isWorking) {
      return {
        icon: <AlertTriangle className="h-4 w-4" />,
        description: status.error || "API key issue",
        color: "text-red-600 dark:text-red-400",
        border: "border-red-500/30",
      }
    }

    // Case 2: API is working but using demo key (rate limited)
    if (status.isWorking && status.usingDemoKey) {
      return {
        icon: <Info className="h-4 w-4" />,
        description: "Demo key (rate limited)",
        color: "text-amber-600 dark:text-amber-400",
        border: "border-amber-500/30",
      }
    }

    // Case 3: API is working with personal key
    if (status.isWorking && !status.usingDemoKey) {
      return {
        icon: <CheckCircle className="h-4 w-4" />,
        description: "API connected",
        color: "text-green-600 dark:text-green-400",
        border: "border-green-500/30",
      }
    }

    // Fallback case
    return {
      icon: <AlertTriangle className="h-4 w-4" />,
      description: "Unknown status",
      color: "text-gray-600 dark:text-gray-400",
      border: "border-gray-500/30",
    }
  }

  const alertContent = getAlertContent()

  return (
    <div
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-200",
        "bg-card/50 backdrop-blur-sm hover:bg-accent/50",
        alertContent.border,
        alertContent.color,
      )}
    >
      {alertContent.icon}
      <span className="text-xs font-medium max-w-[140px] truncate">{alertContent.description}</span>
    </div>
  )
}