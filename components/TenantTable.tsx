// components/TenantTable.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ChevronDown, Filter, Search } from "lucide-react"
import api from "@/app/lib/axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tenant, TenantStatus } from "@/data/types/tenant"
import { mockTenants } from "@/data/mock/admin-dashboard"


export type Props = {
  apiUrl?: string
  onActivate?: (tenant: Tenant) => void
  onViewDetails?: (tenant: Tenant) => void
  onSetDemoDate?: (tenant: Tenant) => void
  onSetFee?: (tenant: Tenant) => void
  showSearch?: boolean
  useMockData?: boolean
}

export function TenantTable({
  apiUrl = "/api/v1/tenants",
  onActivate,
  onViewDetails,
  onSetDemoDate,
  onSetFee,
  showSearch = true,
  useMockData = false
}: Props) {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [filterStatus, setFilterStatus] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    if (useMockData) {
      setTenants(mockTenants)
      return
    }

    const fetchTenants = async () => {
      try {
        const response = await api.get(apiUrl)
        setTenants(response.data.data)
      } catch (error) {
        console.error("Failed to load tenants:", error)
      }
    }
    fetchTenants()
  }, [apiUrl, useMockData])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const getStatusBadge = (tenant: Tenant) => {
    const status = tenant.status.toUpperCase();

    switch (status) {
      case TenantStatus.UNPROCESSED:
        return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Unprocessed</Badge>;

      case TenantStatus.SET_DEMO_DATE:
        return <Badge className="bg-orange-100 text-orange-700 border-orange-200">Demo Date Set</Badge>;

      case TenantStatus.PENDING:
        return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Pending Payment</Badge>;

      case TenantStatus.ONBOARD_PAYMENT_DETAILS:
      case TenantStatus.ONBOARD_CUSTOMIZATION:
      case TenantStatus.ONBOARD_ROLE:
      case TenantStatus.ONBOARD_TEAMMATE:
        return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Onboarding</Badge>;

      case TenantStatus.ACTIVE:
        return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;

      case TenantStatus.REJECTED:
        return <Badge className="bg-red-100 text-red-700 border-red-200">Rejected</Badge>;

      case TenantStatus.DEACTIVATED:
        return <Badge className="bg-slate-100 text-slate-700 border-slate-200">Deactivated</Badge>;

      default:
        // For backward compatibility with old status values
        if (tenant.registrationSent && !tenant.registrationCompleted) {
          return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Registration Pending</Badge>;
        }
        if (tenant.registrationCompleted && tenant.activationStatus !== "active") {
          return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Ready for Activation</Badge>;
        }
        if (tenant.activationStatus === "active") {
          return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>;
        }
        return <Badge className="bg-gray-100 text-gray-700 border-gray-200">Unknown</Badge>;
    }
  }

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.companyName.toLowerCase().includes(search.toLowerCase()) ||
      tenant.email.toLowerCase().includes(search.toLowerCase());

    const status = tenant.status.toUpperCase();

    if (filterStatus === "all") return matchesSearch;

    // Handle specific status filters
    if (filterStatus === "unprocessed")
      return matchesSearch && status === TenantStatus.UNPROCESSED;

    if (filterStatus === "demo-set")
      return matchesSearch && status === TenantStatus.SET_DEMO_DATE;

    if (filterStatus === "pending")
      return matchesSearch && status === TenantStatus.PENDING;

    if (filterStatus === "onboarding")
      return matchesSearch && [
        TenantStatus.ONBOARD_PAYMENT_DETAILS,
        TenantStatus.ONBOARD_CUSTOMIZATION,
        TenantStatus.ONBOARD_ROLE,
        TenantStatus.ONBOARD_TEAMMATE
      ].includes(status as TenantStatus);

    if (filterStatus === "active")
      return matchesSearch && status === TenantStatus.ACTIVE;

    if (filterStatus === "rejected")
      return matchesSearch && status === TenantStatus.REJECTED;

    if (filterStatus === "deactivated")
      return matchesSearch && status === TenantStatus.DEACTIVATED;

    // For backward compatibility
    if (filterStatus === "processed")
      return matchesSearch && tenant.status.toLowerCase() === "processed";

    if (filterStatus === "registration")
      return matchesSearch && tenant.registrationSent && !tenant.registrationCompleted;

    if (filterStatus === "activation")
      return matchesSearch && tenant.registrationCompleted && tenant.activationStatus !== "active";

    return matchesSearch;
  })

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
        <div className="p-6 border-b border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <h3 className="text-lg font-semibold text-slate-900">Tenant Management</h3>

            <div className="flex flex-col sm:flex-row gap-3">
              {showSearch && (
                <div className="mb-4 relative max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    className="pl-9"
                    placeholder="Search tenants..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
              )}

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setFilterStatus("all")}>All Tenants</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("unprocessed")}>Unprocessed</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("demo-set")}>Demo Date Set</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("pending")}>Pending Payment</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("onboarding")}>Onboarding</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("active")}>Active</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("rejected")}>Rejected</DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setFilterStatus("deactivated")}>Deactivated</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>


        <div className="overflow-x-auto rounded border">
          <table className="w-full text-sm">
            <thead className="bg-slate-100 text-slate-600 uppercase text-xs">
              <tr>
                <th className="text-left p-3">Tenant</th>
                <th className="text-left p-3">Contact</th>
                <th className="text-left p-3">Demo Date</th>
                <th className="text-left p-3">Status</th>
                <th className="text-left p-3">Monthly Fee</th>
                <th className="text-right p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredTenants.map((tenant) => (
                <tr key={tenant.id} className="border-t hover:bg-slate-50">
                  <td className="p-3">
                    <div className="font-medium text-slate-900">{tenant.companyName}</div>
                    <div className="text-slate-500">{tenant.email}</div>
                  </td>
                  <td className="p-3">
                    <div className="text-slate-900">{tenant.firstName} {tenant.lastName}</div>
                    <div className="text-slate-500">{tenant.phone}</div>
                  </td>
                  <td className="p-3 text-slate-500">{formatDate(tenant.demoDate!)}</td>
                  <td className="p-3">{getStatusBadge(tenant)}</td>
                  <td className="p-3 text-slate-500">
                    {tenant.monthlyFee ? `$${tenant.monthlyFee}/month` : "-"}
                  </td>
                  <td className="p-3 text-right">
                    {tenant.status.toLowerCase() === "unprocessed" && tenant.demoDate == null ? (
                      <Button size="sm" onClick={() => onSetDemoDate?.(tenant)}>
                        Set Demo Date
                      </Button>
                    ) : tenant.status.toLowerCase() === "set_demo_date" && tenant.demoDate != null && tenant.monthlyFee == null ? (
                      <Button size="sm" onClick={() => onSetFee?.(tenant)}>
                        Set Fee
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" onClick={() => onViewDetails?.(tenant)}>
                        View
                      </Button>
                    )}
                  </td>
                </tr>
              ))}
              {filteredTenants.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-4 text-center text-slate-400">
                    No tenants found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

