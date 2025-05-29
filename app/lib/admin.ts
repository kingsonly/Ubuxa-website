"use client"

import { useApiCall } from "@/hooks/useApiCall"

interface AdminUser {
  id: string
  email: string
  name: string
  role: string
}

interface Tenant {
  id: string
  name: string
  status: "unprocessed" | "processed" | "active"
  // ... other fields
}

export const useAdminApi = () => {
  const { apiCall, isLoading } = useApiCall()

  // Authentication
  const login = async (email: string, password: string) => {
    return apiCall({
      endpoint: "/api/v1/admin/login",
      method: "post",
      data: { email, password },
      successMessage: "Login successful",
    })
  }

  const logout = async () => {
    return apiCall({
      endpoint: "/api/v1/admin/logout",
      method: "post",
      successMessage: "Logged out successfully",
    })
  }

  const validateSession = async () => {
    return apiCall({
      endpoint: "/api/v1/admin/validate",
      method: "get",
      showToast: false,
    })
  }

  // Tenant Management
  const getTenants = async () => {
    return apiCall({
      endpoint: "/api/v1/admin/tenants",
      method: "get",
    })
  }

  const processTenant = async (tenantId: string, monthlyFee: number) => {
    return apiCall({
      endpoint: `/api/v1/admin/tenants/${tenantId}/process`,
      method: "post",
      data: { monthlyFee },
      successMessage: "Tenant processed successfully",
    })
  }

  const activateTenant = async (tenantId: string) => {
    return apiCall({
      endpoint: `/api/v1/admin/tenants/${tenantId}/activate`,
      method: "post",
      successMessage: "Tenant activated successfully",
    })
  }

  // Admin Management
  const inviteAdmin = async (email: string) => {
    return apiCall({
      endpoint: "/api/v1/admin/invite",
      method: "post",
      data: { email },
      successMessage: "Invitation sent successfully",
    })
  }

  const setPassword = async (token: string, password: string) => {
    return apiCall({
      endpoint: "/api/v1/admin/set-password",
      method: "post",
      data: { token, password },
      successMessage: "Password set successfully",
    })
  }

  return {
    isLoading,
    // Auth
    login,
    logout,
    validateSession,
    // Tenants
    getTenants,
    processTenant,
    activateTenant,
    // Admin
    inviteAdmin,
    setPassword,
  }
}