"use client"

import { Calendar } from "@/components/ui/calendar"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import {
  BarChart3,
  Bell,
  Building,
  ChevronDown,
  Clock,
  Filter,
  LogOut,
  Menu,
  Search,
  Settings,
  User,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle, Mail, TextIcon as Textarea, X, Zap } from "lucide-react"
import { TenantTable } from "@/components/TenantTable"
import AppModal from "@/components/AppModal"
import { TenantTimeline } from "@/components/TenantTimeline"
import AdminSidebar from "@/components/SideBar"
import api from "@/lib/axios"
import { Tenant, TenantStatus } from "@/data/types/tenant"


export default function AdminDashboard() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false)
  const [monthlyFee, setMonthlyFee] = useState("")
  const router = useRouter()
  const { toast } = useToast()
  const [tenantStats, setTenantStats] = useState({
    unprocessed: 0,
    pendingRegistration: 0,
    readyForActivation: 0,
    active: 0,
  })

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/api/v1/tenants")
        // TODO: I don't think this is the best way to do this (res.data.data)
        const tenants: Tenant[] = res.data.data
        console.log(tenants)
  
        const stats = {
          unprocessed: tenants.filter((t: Tenant) => t.status.toLowerCase() === "unprocessed").length,
          pendingRegistration: tenants.filter(
            (t: Tenant) => t.status.toLowerCase() === "processed" && t.registrationSent && !t.registrationCompleted
          ).length,
          readyForActivation: tenants.filter(
            (t: Tenant) =>
              t.status.toLowerCase() === "processed" &&
              t.registrationCompleted &&
              (!t.activationStatus || t.activationStatus === "pending")
          ).length,
          active: tenants.filter((t: Tenant) => t.status.toLowerCase() === "active").length,
        }
  
        setTenantStats(stats)
      } catch (err) {
        console.error("Failed to fetch tenant stats", err)
      }
    }
  
    fetchStats()
  }, [])

  

  // Auth diasbled for development
  // useEffect(() => {
  //   const isAuthenticated = localStorage.getItem("adminAuth") === "true"
  //   if (!isAuthenticated) {
  //     router.push("/admin/login")
  //   }
  // }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const handleProcess = (tenant: Tenant) => {
    setSelectedTenant(tenant)
    setIsProcessingModalOpen(true)
  }

  const handleProcessSubmit = () => {
    if (!monthlyFee || isNaN(Number(monthlyFee)) || Number(monthlyFee) <= 0) {
      toast({
        title: "Invalid fee",
        description: "Please enter a valid monthly fee",
        variant: "destructive",
      })
      return
    }
    toast({
      title: "Tenant processed",
      description: `Registration email sent to ${selectedTenant.name}`,
    })
    setIsProcessingModalOpen(false)
    setMonthlyFee("")
  }

  const handleActivate = (tenant: Tenant) => {
    toast({
      title: "Tenant activated",
      description: `${tenant.name} has been successfully activated`,
    })
  }

  const handleViewDetails = (tenant: Tenant) => {
    setSelectedTenant(tenant)
  }

  console.log(tenantStats)

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const handleSaveNotes = () => {
    console.log("Save notes")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar onLogout={handleLogout} />

      <div className="flex-1 flex flex-col">
        <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>
          <div className="flex items-center space-x-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700">Admin</span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="shadow-sm border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Unprocessed Tenants</p>
                  <h3 className="text-3xl font-bold text-slate-900">{tenantStats.unprocessed}</h3>
                </div>
                <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
              </div>
              <p className="text-sm text-slate-500">Awaiting first call</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Pending Registration</p>
                  <h3 className="text-3xl font-bold text-slate-900">{tenantStats.pendingRegistration}</h3>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
              </div>
              <p className="text-sm text-slate-500">Registration email sent</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Ready for Activation</p>
                  <h3 className="text-3xl font-bold text-slate-900">{tenantStats.readyForActivation}</h3>
                </div>
                <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-purple-600" />
                </div>
              </div>
              <p className="text-sm text-slate-500">Awaiting system activation</p>
            </CardContent>
          </Card>

          <Card className="shadow-sm border">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">Active Tenants</p>
                  <h3 className="text-3xl font-bold text-slate-900">{tenantStats.active}</h3>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="h-6 w-6 text-green-600" />
                </div>
              </div>
              <p className="text-sm text-slate-500">Fully onboarded</p>
            </CardContent>
          </Card>
        </div>

          <TenantTable
            apiUrl="/api/v1/tenants"
            onProcess={handleProcess}
            onActivate={handleActivate}
            onViewDetails={handleViewDetails}
          />
        </main>
      </div>

      <AppModal
        isOpen={!!selectedTenant && !isProcessingModalOpen}
        onClose={() => setSelectedTenant(null)}
        title={selectedTenant?.companyName}
        className="max-w-3xl"
        footer={<Button variant="outline" onClick={() => setSelectedTenant(null)}>Close</Button>}
      >
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            {/* <TabsTrigger value="notes">Notes</TabsTrigger> */}
            {selectedTenant?.status?.toUpperCase() === TenantStatus.UNPROCESSED && (
              <TabsTrigger value="process">Process</TabsTrigger>
            )}
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-500">Contact Person</label>
                <p className="text-slate-900">{selectedTenant?.firstName} {selectedTenant?.lastName}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500">Email</label>
                <p className="text-slate-900">{selectedTenant?.email}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500">Phone</label>
                <p className="text-slate-900">{selectedTenant?.phone}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500">Demo Date</label>
                <p className="text-slate-900">{formatDate(selectedTenant?.demoDate) || "-"}</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-500">Status</label>
                <p className="text-slate-900">{selectedTenant?.status}</p>
              </div>
              {selectedTenant?.status?.toUpperCase() === TenantStatus.PENDING && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Monthly Fee</label>
                  <p className="text-slate-900">${selectedTenant?.monthlyFee || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.ONBOARD_PAYMENT_DETAILS && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Payment Provider</label>
                  <p className="text-slate-900">{selectedTenant?.paymentProvider || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.ONBOARD_CUSTOMIZATION && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Branding Status</label>
                  <p className="text-slate-900">{selectedTenant?.brandingStatus || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.ONBOARD_ROLE && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Role Created</label>
                  <p className="text-slate-900">{selectedTenant?.roleName || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.ONBOARD_TEAMMATE && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Teammate Added</label>
                  <p className="text-slate-900">{selectedTenant?.teammateName || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.ACTIVE && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Activation Date</label>
                  <p className="text-slate-900">{formatDate(selectedTenant?.activationDate) || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.REJECTED && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Rejection Reason</label>
                  <p className="text-slate-900">{selectedTenant?.rejectionReason || "-"}</p>
                </div>
              )}
              {selectedTenant?.status?.toUpperCase() === TenantStatus.DEACTIVATED && (
                <div>
                  <label className="block text-sm font-medium text-slate-500">Deactivation Reason</label>
                  <p className="text-slate-900">{selectedTenant?.deactivationReason || "-"}</p>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <TenantTimeline tenant={selectedTenant} formatDate={formatDate} />
          </TabsContent>

          {/* <TabsContent value="notes" className="space-y-4">
            <Textarea
              placeholder="Add notes about this tenant..."
              className="min-h-[150px]"
              defaultValue={selectedTenant?.moreInfo}
            />
          </TabsContent> */}

          {selectedTenant?.status?.toUpperCase() === TenantStatus.UNPROCESSED && (
            <TabsContent value="process" className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700">Monthly Fee ($)</label>
                <Input
                  type="number"
                  value={monthlyFee}
                  onChange={(e) => setMonthlyFee(e.target.value)}
                  placeholder="Enter monthly fee"
                />
              </div>
              <div className="flex justify-end">
                <Button variant="outline" onClick={() => setSelectedTenant(null)}>Cancel</Button>
                <Button onClick={handleProcessSubmit}>Process</Button>
              </div>
            </TabsContent>
          )}
        </Tabs>
      </AppModal>

      <AppModal
        isOpen={isProcessingModalOpen}
        onClose={() => {
          setIsProcessingModalOpen(false)
          setMonthlyFee("")
        }}
        title={`Process Tenant: ${selectedTenant?.firstName} ${selectedTenant?.lastName}`}
        footer={
          <>
            <Button variant="outline" onClick={() => setIsProcessingModalOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleProcessSubmit}>Process</Button>
          </>
        }
      >
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Monthly Fee ($)</label>
            <Input
              type="number"
              value={monthlyFee}
              onChange={(e) => setMonthlyFee(e.target.value)}
              placeholder="Enter monthly fee"
            />
          </div>
        </div>
      </AppModal>

    </div>
  )
}
