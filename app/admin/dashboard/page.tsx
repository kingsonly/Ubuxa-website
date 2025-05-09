"use client"



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
  const [tenants, setTenants] = useState(mockTenants)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState("all")
  const [selectedTenant, setSelectedTenant] = useState<any>(null)
  const [isProcessingModalOpen, setIsProcessingModalOpen] = useState(false)
  const [monthlyFee, setMonthlyFee] = useState("")
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  // Check authentication
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("adminAuth") === "true"
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("adminAuth")
    router.push("/admin/login")
  }

  const filteredTenants = tenants.filter((tenant) => {
    const matchesSearch =
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      tenant.email.toLowerCase().includes(searchTerm.toLowerCase())

    if (filterStatus === "all") return matchesSearch
    if (filterStatus === "unprocessed") return matchesSearch && tenant.status === "unprocessed"
    if (filterStatus === "processed") return matchesSearch && tenant.status === "processed"
    if (filterStatus === "registration")
      return matchesSearch && tenant.status === "processed" && tenant.registrationSent && !tenant.registrationCompleted
    if (filterStatus === "activation")
      return (
        matchesSearch &&
        tenant.status === "processed" &&
        tenant.registrationCompleted &&
        (!tenant.activationStatus || tenant.activationStatus === "pending")
      )

    return matchesSearch
  })

  const processTenant = (tenant: any) => {
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

    // Update tenant in the list
    const updatedTenants = tenants.map((t) => {
      if (t.id === selectedTenant.id) {
        return {
          ...t,
          status: "processed",
          monthlyFee: Number(monthlyFee),
          registrationSent: true,
          registrationCompleted: false,
        }
      }
      return t
    })

    setTenants(updatedTenants)
    setIsProcessingModalOpen(false)
    setMonthlyFee("")

    toast({
      title: "Tenant processed",
      description: `Registration email sent to ${selectedTenant.name}`,
    })
  }

  const activateTenant = (tenant: any) => {
    const updatedTenants = tenants.map((t) => {
      if (t.id === tenant.id) {
        return {
          ...t,
          activationStatus: "active",
          activationDate: new Date().toISOString(),
        }
      }
      return t
    })

    setTenants(updatedTenants)

    toast({
      title: "Tenant activated",
      description: `${tenant.name} has been successfully activated`,
    })
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

  const getStatusBadge = (tenant: any) => {
    if (tenant.status === "unprocessed") {
      return (
        <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
          Unprocessed
        </Badge>
      )
    } else if (tenant.status === "processed" && tenant.registrationSent && !tenant.registrationCompleted) {
      return (
        <Badge variant="outline" className="bg-blue-100 text-blue-800 border-blue-200">
          Registration Pending
        </Badge>
      )
    } else if (
      tenant.status === "processed" &&
      tenant.registrationCompleted &&
      (!tenant.activationStatus || tenant.activationStatus === "pending")
    ) {
      return (
        <Badge variant="outline" className="bg-purple-100 text-purple-800 border-purple-200">
          Ready for Activation
        </Badge>
      )
    } else if (tenant.activationStatus === "active") {
      return (
        <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
          Active
        </Badge>
      )
    }
    return null
  }

  const unprocessedCount = tenants.filter((t) => t.status === "unprocessed").length
  const pendingRegistrationCount = tenants.filter(
    (t) => t.status === "processed" && t.registrationSent && !t.registrationCompleted,
  ).length
  const pendingActivationCount = tenants.filter(
    (t) =>
      t.status === "processed" && t.registrationCompleted && (!t.activationStatus || t.activationStatus === "pending"),
  ).length
  const activeCount = tenants.filter((t) => t.activationStatus === "active").length

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside
        className={`bg-slate-900 text-white ${isSidebarOpen ? "w-64" : "w-20"} transition-all duration-300 ease-in-out flex flex-col`}
      >
        <div className="p-4 flex items-center justify-between">
          {isSidebarOpen ? (
            <Image src="/images/ubuxa-logo.png" alt="Ubuxa Logo" width={120} height={32} className="h-8 w-auto" />
          ) : (
            <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
              <span className="font-bold text-lg">U</span>
            </div>
          )}
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-400 hover:text-white">
            <Menu className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex-1 pt-5">
          <div className={`px-4 py-2 ${isSidebarOpen ? "mb-2" : "mb-0"}`}>
            {isSidebarOpen ? (
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Main</p>
            ) : (
              <div className="h-4"></div>
            )}
          </div>

          <a href="#" className="flex items-center px-4 py-3 text-blue-400 bg-slate-800 border-l-4 border-blue-600">
            <BarChart3 className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Dashboard</span>}
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Users className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Tenants</span>}
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Building className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Organizations</span>}
          </a>

          <div className={`px-4 py-2 mt-6 ${isSidebarOpen ? "mb-2" : "mb-0"}`}>
            {isSidebarOpen ? (
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Settings</p>
            ) : (
              <div className="h-4"></div>
            )}
          </div>

          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <Settings className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Settings</span>}
          </a>

          <a href="#" className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white">
            <User className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Account</span>}
          </a>
        </nav>

        <div className="p-4">
          <button onClick={handleLogout} className="flex items-center text-slate-300 hover:text-white w-full">
            <LogOut className="h-5 w-5" />
            {isSidebarOpen && <span className="ml-3">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-slate-200 py-4 px-6 flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-900">Admin Dashboard</h1>

          <div className="flex items-center space-x-4">
            <button className="text-slate-500 hover:text-slate-700 relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                3
              </span>
            </button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" alt="Admin" />
                    <AvatarFallback>AD</AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium text-slate-700">Admin User</span>
                  <ChevronDown className="h-4 w-4 text-slate-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
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

        {/* Dashboard content */}
        <main className="flex-1 p-6">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Tenant Overview</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Unprocessed Tenants</p>
                      <h3 className="text-3xl font-bold text-slate-900 mt-1">{unprocessedCount}</h3>
                    </div>
                    <div className="h-12 w-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Clock className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-500">
                    <span>Awaiting first call</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Pending Registration</p>
                      <h3 className="text-3xl font-bold text-slate-900 mt-1">{pendingRegistrationCount}</h3>
                    </div>
                    <div className="h-12 w-12 bg-blue-100 rounded-full flex items-center justify-center">
                      <Mail className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-500">
                    <span>Awaiting tenant registration</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Ready for Activation</p>
                      <h3 className="text-3xl font-bold text-slate-900 mt-1">{pendingActivationCount}</h3>
                    </div>
                    <div className="h-12 w-12 bg-purple-100 rounded-full flex items-center justify-center">
                      <User className="h-6 w-6 text-purple-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-500">
                    <span>Completed registration</span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-slate-500">Active Tenants</p>
                      <h3 className="text-3xl font-bold text-slate-900 mt-1">{activeCount}</h3>
                    </div>
                    <div className="h-12 w-12 bg-green-100 rounded-full flex items-center justify-center">
                      <CheckCircle className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <div className="mt-4 text-sm text-slate-500">
                    <span>Successfully onboarded</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 shadow-sm">
            <div className="p-6 border-b border-slate-200">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <h3 className="text-lg font-semibold text-slate-900">Tenant Management</h3>

                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input
                      type="text"
                      placeholder="Search tenants..."
                      className="pl-9 w-full sm:w-64"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>

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
                      <DropdownMenuItem onClick={() => setFilterStatus("processed")}>Processed</DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("registration")}>
                        Pending Registration
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setFilterStatus("activation")}>
                        Ready for Activation
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Tenant
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Demo Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Monthly Fee
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredTenants.length > 0 ? (
                    filteredTenants.map((tenant) => (
                      <tr key={tenant.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-slate-200 flex items-center justify-center">
                              <span className="font-medium text-slate-600">{tenant.name.charAt(0)}</span>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-slate-900">{tenant.name}</div>
                              <div className="text-sm text-slate-500">{tenant.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-slate-900">{tenant.contactPerson}</div>
                          <div className="text-sm text-slate-500">{tenant.phone}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {formatDate(tenant.demoDate)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">{getStatusBadge(tenant)}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                          {tenant.monthlyFee ? `$${tenant.monthlyFee}/month` : "-"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {tenant.status === "unprocessed" ? (
                            <Button
                              size="sm"
                              onClick={() => processTenant(tenant)}
                              className="bg-blue-600 hover:bg-blue-700"
                            >
                              Process Tenant
                            </Button>
                          ) : tenant.status === "processed" &&
                            tenant.registrationCompleted &&
                            (!tenant.activationStatus || tenant.activationStatus === "pending") ? (
                            <Button
                              size="sm"
                              onClick={() => activateTenant(tenant)}
                              className="bg-green-600 hover:bg-green-700"
                            >
                              Activate Tenant
                            </Button>
                          ) : (
                            <Button size="sm" variant="outline" onClick={() => setSelectedTenant(tenant)}>
                              View Details
                            </Button>
                          )}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-4 text-center text-sm text-slate-500">
                        No tenants found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>

      {/* Processing Modal */}
      {isProcessingModalOpen && selectedTenant && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Process Tenant: {selectedTenant.name}</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Contact Person</label>
                  <p className="text-slate-900">{selectedTenant.contactPerson}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <p className="text-slate-900">{selectedTenant.email}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Demo Date</label>
                  <p className="text-slate-900">{formatDate(selectedTenant.demoDate)}</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Notes</label>
                  <p className="text-slate-900">{selectedTenant.notes}</p>
                </div>

                <div>
                  <label htmlFor="monthlyFee" className="block text-sm font-medium text-slate-700 mb-1">
                    Monthly Fee ($) <span className="text-red-500">*</span>
                  </label>
                  <Input
                    id="monthlyFee"
                    type="number"
                    placeholder="Enter monthly fee"
                    value={monthlyFee}
                    onChange={(e) => setMonthlyFee(e.target.value)}
                    required
                  />
                  <p className="mt-1 text-xs text-slate-500">
                    This will be the agreed monthly subscription fee for this tenant
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end space-x-3">
                <Button
                  variant="outline"
                  onClick={() => {
                    setIsProcessingModalOpen(false)
                    setMonthlyFee("")
                  }}
                >
                  Cancel
                </Button>
                <Button onClick={handleProcessSubmit} className="bg-blue-600 hover:bg-blue-700">
                  Process & Send Registration
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tenant Details Modal */}
      {selectedTenant && !isProcessingModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl mx-4">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-semibold text-slate-900">{selectedTenant.name}</h3>
                <button onClick={() => setSelectedTenant(null)} className="text-slate-400 hover:text-slate-600">
                  <X className="h-5 w-5" />
                </button>
              </div>

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
                      <p className="text-slate-900">{selectedTenant.contactPerson}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500">Email</label>
                      <p className="text-slate-900">{selectedTenant.email}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500">Phone</label>
                      <p className="text-slate-900">{selectedTenant.phone}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500">Demo Date</label>
                      <p className="text-slate-900">{formatDate(selectedTenant.demoDate)}</p>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedTenant)}</div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-500">Monthly Fee</label>
                      <p className="text-slate-900">
                        {selectedTenant.monthlyFee ? `$${selectedTenant.monthlyFee}/month` : "-"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-500">Notes</label>
                    <p className="text-slate-900">{selectedTenant.notes}</p>
                  </div>

                  {selectedTenant.activationStatus === "active" && (
                    <div>
                      <label className="block text-sm font-medium text-slate-500">Activation Date</label>
                      <p className="text-slate-900">{formatDate(selectedTenant.activationDate)}</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="activity">
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                        <Calendar className="h-4 w-4 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-sm text-slate-900">Demo scheduled</p>
                        <p className="text-xs text-slate-500">{formatDate(selectedTenant.demoDate)}</p>
                      </div>
                    </div>

                    {selectedTenant.status === "processed" && (
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">Tenant processed</p>
                          <p className="text-xs text-slate-500">Monthly fee set to ${selectedTenant.monthlyFee}</p>
                        </div>
                      </div>
                    )}

                    {selectedTenant.registrationSent && (
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                          <Mail className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">Registration email sent</p>
                          <p className="text-xs text-slate-500">Sent to {selectedTenant.email}</p>
                        </div>
                      </div>
                    )}

                    {selectedTenant.registrationCompleted && (
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center mr-3">
                          <User className="h-4 w-4 text-purple-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">Registration completed</p>
                          <p className="text-xs text-slate-500">Ready for activation</p>
                        </div>
                      </div>
                    )}

                    {selectedTenant.activationStatus === "active" && (
                      <div className="flex items-start">
                        <div className="h-8 w-8 rounded-full bg-green-100 flex items-center justify-center mr-3">
                          <Zap className="h-4 w-4 text-green-600" />
                        </div>
                        <div>
                          <p className="text-sm text-slate-900">Tenant activated</p>
                          <p className="text-xs text-slate-500">{formatDate(selectedTenant.activationDate)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="notes">
                  <div className="space-y-4">
                    <Textarea
                      placeholder="Add notes about this tenant..."
                      className="min-h-[150px]"
                      defaultValue={selectedTenant.notes}
                    />
                    <div className="flex justify-end">
                      <Button className="bg-blue-600 hover:bg-blue-700">Save Notes</Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 flex justify-end">
                <Button variant="outline" onClick={() => setSelectedTenant(null)}>
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

import { CheckCircle, Mail, TextIcon as Textarea, X, Zap } from "lucide-react";import { useToast } from "components/ui/use-toast"
import { Badge } from "components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "components/ui/avatar"
import { Card, CardContent } from "components/ui/card"
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "components/ui/tabs"
import { Calendar } from "components/ui/calendar"

