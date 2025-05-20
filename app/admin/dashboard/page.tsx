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
import { TenantTable, Tenant } from "@/components/TenantTable"
import AppModal from "@/components/AppModal"
import { TenantTimeline } from "@/components/TenantTimeline"
import AdminSidebar from "@/components/SideBar"

// Mock tenant data
const mockTenants = [
  {
    id: "t1",
    name: "Acme Corporation",
    email: "contact@acmecorp.com",
    phone: "+1 (555) 123-4567",
    status: "unprocessed",
    demoDate: "2023-11-15T10:00:00",
    contactPerson: "John Smith",
    notes: "Interested in inventory management features",
  },
  {
    id: "t2",
    name: "TechNova Solutions",
    email: "info@technovasolutions.com",
    phone: "+1 (555) 987-6543",
    status: "processed",
    demoDate: "2023-11-10T14:30:00",
    contactPerson: "Sarah Johnson",
    notes: "Requires custom integration with their ERP system",
    monthlyFee: 499,
    registrationSent: true,
    registrationCompleted: false,
  },
  {
    id: "t3",
    name: "Global Energy Partners",
    email: "contact@globalenergy.com",
    phone: "+1 (555) 456-7890",
    status: "processed",
    demoDate: "2023-11-05T11:00:00",
    contactPerson: "Michael Brown",
    notes: "Primarily interested in token generation for their devices",
    monthlyFee: 799,
    registrationSent: true,
    registrationCompleted: true,
    activationStatus: "pending",
  },
  {
    id: "t4",
    name: "Sunshine Solar Inc.",
    email: "support@sunshinesolar.com",
    phone: "+1 (555) 234-5678",
    status: "processed",
    demoDate: "2023-11-02T09:15:00",
    contactPerson: "Emily Davis",
    notes: "Looking for comprehensive solution for their expanding business",
    monthlyFee: 649,
    registrationSent: true,
    registrationCompleted: true,
    activationStatus: "active",
    activationDate: "2023-11-12T00:00:00",
  },
  {
    id: "t5",
    name: "PowerGrid Innovations",
    email: "info@powergridinnovations.com",
    phone: "+1 (555) 876-5432",
    status: "unprocessed",
    demoDate: "2023-11-18T13:00:00",
    contactPerson: "Robert Wilson",
    notes: "Referred by Sunshine Solar Inc.",
  },
]

export default function AdminDashboard() {
  const [selectedTenant, setSelectedTenant] = useState<Tenant | null>(null)
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false)
  const [monthlyFee, setMonthlyFee] = useState("")
  const router = useRouter()
  const { toast } = useToast()

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

  return (
    <div className="min-h-screen bg-slate-50 flex">
      <AdminSidebar onLogout={handleLogout} />
      {/* <aside className="bg-slate-900 text-white w-64 p-4 flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <Image src="/images/ubuxa-logo.png" alt="Ubuxa Logo" width={120} height={32} className="h-8 w-auto" />
          <button onClick={handleLogout} className="text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex-1">
          <a href="#" className="flex items-center px-4 py-3 text-blue-400 bg-slate-800 border-l-4 border-blue-600">
            <BarChart3 className="h-5 w-5" />
            <span className="ml-3">Dashboard</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Users className="h-5 w-5" />
            <span className="ml-3">Tenants</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Building className="h-5 w-5" />
            <span className="ml-3">Organizations</span>
          </a>
          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Settings className="h-5 w-5" />
            <span className="ml-3">Settings</span>
          </a>
        </nav>
        <div className="mt-4">
          <button onClick={handleLogout} className="flex items-center text-slate-300 hover:text-white w-full">
            <LogOut className="h-5 w-5" />
            <span className="ml-3">Logout</span>
          </button>
        </div>
      </aside> */}

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card><CardContent className="p-6">Unprocessed Placeholder</CardContent></Card>
            <Card><CardContent className="p-6">Registration Placeholder</CardContent></Card>
            <Card><CardContent className="p-6">Activation Placeholder</CardContent></Card>
            <Card><CardContent className="p-6">Active Placeholder</CardContent></Card>
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
        isOpen={isProcessingModalOpen}
        onClose={() => {
          setIsProcessingModalOpen(false)
          setMonthlyFee("")
        }}
        title={`Process Tenant: ${selectedTenant?.name}`}
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

      <AppModal
        isOpen={!!selectedTenant && !isProcessingModalOpen}
        onClose={() => setSelectedTenant(null)}
        title={selectedTenant?.name}
        className="max-w-3xl"
        footer={<Button variant="outline" onClick={() => setSelectedTenant(null)}>Close</Button>}
      >
        <Tabs defaultValue="details">
          <TabsList className="mb-4">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-500">Contact Person</label>
                <p className="text-slate-900">{selectedTenant?.contactPerson}</p>
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
            </div>
          </TabsContent>

          <TabsContent value="activity" className="space-y-4">
            <TenantTimeline tenant={selectedTenant} formatDate={formatDate} />
          </TabsContent>

          <TabsContent value="notes" className="space-y-4">
            <Textarea
              placeholder="Add notes about this tenant..."
              className="min-h-[150px]"
              defaultValue={selectedTenant?.moreInfo}
            />
            <div className="flex justify-end">
              <Button className="bg-blue-600 hover:bg-blue-700">Save Notes</Button>
            </div>
          </TabsContent>
        </Tabs>
      </AppModal>
    </div>
  )
}



