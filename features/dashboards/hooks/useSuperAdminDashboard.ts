import { useState, useEffect } from "react"
import { SuperAdminDashboardData } from "../types/dashboard.types"
import { superAdminDashboardService } from "../services/superAdminDashboardService"

export function useSuperAdminDashboard() {
  const [data, setData] = useState<SuperAdminDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  const fetchData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const result = await superAdminDashboardService.getDashboardData()
      setData(result)
    } catch (err) {
      setError(err instanceof Error ? err : new Error("Failed to fetch dashboard data"))
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return {
    data,
    isLoading,
    error,
    refresh: fetchData,
  }
}
