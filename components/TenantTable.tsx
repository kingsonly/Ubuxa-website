// components/TenantTable.tsx
"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"
import api from "@/lib/axios";

export type Tenant = {
  id: string
  name: string
  email: string
  phone: string
  demoDate: string
  contactPerson: string
  status: string
  monthlyFee?: number
  registrationSent?: boolean
  registrationCompleted?: boolean
  activationStatus?: string
  moreInfo?: string
}

export type Props = {
  apiUrl?: string
  onProcess?: (tenant: Tenant) => void
  onActivate?: (tenant: Tenant) => void
  onViewDetails?: (tenant: Tenant) => void
  showSearch?: boolean
}

export function TenantTable({
  apiUrl = "/api/v1/tenants",
  onProcess,
  onActivate,
  onViewDetails,
  showSearch = true,
}: Props) {
  const [tenants, setTenants] = useState<Tenant[]>([])
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchTenants = async () => {
      try {
        const response = await api.get(apiUrl)
        setTenants(response.data)
      } catch (error) {
        console.error("Failed to load tenants:", error)
      }
    }
    fetchTenants()
  }, [apiUrl])

  const formatDate = (dateStr: string) =>
    new Date(dateStr).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })

  const getStatusBadge = (tenant: Tenant) => {
    if (tenant.status === "unprocessed") {
      return <Badge className="bg-yellow-100 text-yellow-700 border-yellow-200">Unprocessed</Badge>
    }
    if (tenant.registrationSent && !tenant.registrationCompleted) {
      return <Badge className="bg-blue-100 text-blue-700 border-blue-200">Registration Pending</Badge>
    }
    if (tenant.registrationCompleted && tenant.activationStatus !== "active") {
      return <Badge className="bg-purple-100 text-purple-700 border-purple-200">Ready for Activation</Badge>
    }
    if (tenant.activationStatus === "active") {
      return <Badge className="bg-green-100 text-green-700 border-green-200">Active</Badge>
    }
    return null
  }

  // const filteredTenants = tenants.filter(
  //   (t) =>
  //     t.name.toLowerCase().includes(search.toLowerCase()) ||
  //     t.email.toLowerCase().includes(search.toLowerCase()),
  // )

  return (
    <div className="p-4">
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
            {/* {filteredTenants.map((tenant) => (
              <tr key={tenant.id} className="border-t hover:bg-slate-50">
                <td className="p-3">
                  <div className="font-medium text-slate-900">{tenant.name}</div>
                  <div className="text-slate-500">{tenant.email}</div>
                </td>
                <td className="p-3">
                  <div className="text-slate-900">{tenant.contactPerson}</div>
                  <div className="text-slate-500">{tenant.phone}</div>
                </td>
                <td className="p-3 text-slate-500">{formatDate(tenant.demoDate)}</td>
                <td className="p-3">{getStatusBadge(tenant)}</td>
                <td className="p-3 text-slate-500">
                  {tenant.monthlyFee ? `$${tenant.monthlyFee}/month` : "-"}
                </td>
                <td className="p-3 text-right">
                  {tenant.status === "unprocessed" ? (
                    <Button size="sm" onClick={() => onProcess?.(tenant)}>
                      Process
                    </Button>
                  ) : tenant.registrationCompleted &&
                    tenant.activationStatus !== "active" ? (
                    <Button size="sm" onClick={() => onActivate?.(tenant)}>
                      Activate
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
            )} */}
          </tbody>
        </table>
      </div>
    </div>
  )
}
