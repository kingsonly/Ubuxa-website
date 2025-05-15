"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import Cookies from "js-cookie"
import { apiClient } from "@/app/lib/apiClient"

interface ApiCallOptions {
  endpoint: string
  method: "get" | "post" | "put" | "delete" | "patch"
  data?: any
  params?: any
  headers?: any
  successMessage?: string
  showToast?: boolean
}

export const useApiCall = () => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isNetworkError, setIsNetworkError] = useState(false)

  const apiCall = async (options: ApiCallOptions) => {
    const {
      endpoint,
      method,
      data = {},
      params = {},
      headers = {},
      successMessage,
      showToast = true,
    } = options

    setIsLoading(true)
    setIsNetworkError(false)

    try {
      const token = Cookies.get("adminAuthToken") || localStorage.getItem("adminAuthToken")
      const authHeaders = token ? { Authorization: `Bearer ${token}` } : {}

      const response = await apiClient({
        url: endpoint,
        method,
        data,
        params,
        headers: { ...headers, ...authHeaders },
      })

      if (successMessage && showToast) {
        toast({
          title: "Success",
          description: successMessage,
          variant: "default",
        })
      }

      return response.data
    } catch (error: any) {
      if (error.response) {
        switch (error.response.status) {
          case 401:
            toast({
              title: "Session Expired",
              description: "Please login again",
              variant: "destructive",
            })
            Cookies.remove("adminAuthToken")
            localStorage.removeItem("adminAuthToken")
            router.push("/admin/login")
            break
          case 403:
            toast({
              title: "Forbidden",
              description: "You don't have permission",
              variant: "destructive",
            })
            break
          default:
            toast({
              title: "Error",
              description: error.response.data?.message || "An error occurred",
              variant: "destructive",
            })
        }
      } else if (error.request) {
        setIsNetworkError(true)
        toast({
          title: "Network Error",
          description: "Please check your connection",
          variant: "destructive",
        })
      } else {
        toast({
          title: "Error",
          description: "An unexpected error occurred",
          variant: "destructive",
        })
      }
      throw error
    } finally {
      setIsLoading(false)
    }
  }

  return { apiCall, isLoading, isNetworkError }
}