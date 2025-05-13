import { Montserrat } from "next/font/google"
import Link from "next/link"
import Image from "next/image"
import {
  BarChart3,
  BoltIcon,
  BoxIcon,
  Building2,
  ChevronDown,
  Cpu,
  Database,
  Facebook,
  Globe,
  Instagram,
  Key,
  Layers,
  Linkedin,
  Menu,
  ShieldCheck,
  Twitter,
  Users,
  CheckCircle,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import RequestDemoForm from "@/components/RequestDemoForm"

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
})

export default function Home() {
  return (
    <div className={`${montserrat.variable} font-sans`}>
      <header className="relative w-full bg-gradient-to-r from-slate-900 to-slate-800">
        {/* Navigation */}
        <nav className="container mx-auto px-4 py-5 flex items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image src="/images/ubuxa-logo.png" alt="Ubuxa Logo" width={150} height={40} className="h-10 w-auto" />
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="relative group">
              <button className="flex items-center text-gray-200 hover:text-blue-400 transition-colors">
                <span>Features</span>
                <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              <div className="absolute left-0 mt-2 w-60 rounded-md shadow-lg bg-white z-50 hidden group-hover:block">
                <div className="p-4 grid gap-2">
                  <Link href="#sales" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
                    <BarChart3 className="mr-2 h-5 w-5 text-blue-500" /> Sales Management
                  </Link>
                  <Link href="#customers" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
                    <Users className="mr-2 h-5 w-5 text-blue-500" /> Customer Management
                  </Link>
                  <Link href="#agents" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
                    <Building2 className="mr-2 h-5 w-5 text-blue-500" /> Agent Management
                  </Link>
                  <Link href="#products" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
                    <BoxIcon className="mr-2 h-5 w-5 text-blue-500" /> Product Management
                  </Link>
                  <Link href="#inventory" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
                    <Layers className="mr-2 h-5 w-5 text-blue-500" /> Inventory Management
                  </Link>
                  <Link href="#contracts" className="flex items-center p-2 rounded hover:bg-gray-100 text-gray-700">
                    <ShieldCheck className="mr-2 h-5 w-5 text-blue-500" /> Contract Management
                  </Link>
                </div>
              </div>
            </div>
            <Link href="#integrations" className="text-gray-200 hover:text-blue-400 transition-colors">
              Integrations
            </Link>
            <Link href="#pricing" className="text-gray-200 hover:text-blue-400 transition-colors">
              Pricing
            </Link>
            <Link href="#testimonials" className="text-gray-200 hover:text-blue-400 transition-colors">
              Testimonials
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" className="text-white hover:text-blue-400 hover:bg-transparent">
              Log in
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">Request Demo</Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </div>
        </nav>

        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16 md:py-24 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transform Your
              <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                {" "}
                Energy Business
              </span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl">
              All-in-one platform for managing inverters, batteries, and energy products. Streamline sales, track
              inventory, manage customers, and generate device tokens with our powerful SaaS solution.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-6 text-lg">Request Demo</Button>
              <Button variant="outline" className="border-gray-600 text-white hover:bg-slate-800 px-8 py-6 text-lg">
                Explore Features
              </Button>
            </div>

            <div className="mt-10 flex items-center space-x-6">
              <div className="flex -space-x-2">
                <Avatar className="border-2 border-slate-900 w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-slate-900 w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>SM</AvatarFallback>
                </Avatar>
                <Avatar className="border-2 border-slate-900 w-10 h-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
                  <AvatarFallback>RK</AvatarFallback>
                </Avatar>
              </div>
              <div className="text-gray-300">
                <p>
                  Trusted by <span className="text-blue-400 font-semibold">500+</span> energy businesses
                </p>
              </div>
            </div>
          </div>

          <div className="md:w-1/2 relative">
            <div className="relative z-10 bg-gradient-to-br from-slate-800 to-slate-900 p-2 rounded-xl border border-slate-700 shadow-2xl">
              <img src="/images/token-design.png" alt="Dashboard Preview" className="rounded-lg w-full" />

              <div className="absolute -top-6 -right-6 bg-blue-600 rounded-full p-3 shadow-lg">
                <Key className="h-8 w-8 text-white" />
              </div>

              <div className="absolute -bottom-5 -left-5 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg p-3 shadow-lg flex items-center">
                <BoltIcon className="h-6 w-6 text-white mr-2" />
                <span className="text-white font-medium">Token Generated</span>
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute h-40 w-40 bg-blue-500/20 rounded-full blur-3xl -z-10 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute h-60 w-60 bg-blue-500/10 rounded-full blur-3xl -z-10 bottom-0 right-0"></div>
          </div>
        </div>

        {/* Wave divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 200">
            <path
              fill="#ffffff"
              fillOpacity="1"
              d="M0,128L60,117.3C120,107,240,85,360,90.7C480,96,600,128,720,128C840,128,960,96,1080,90.7C1200,85,1320,107,1380,117.3L1440,128L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
            ></path>
          </svg>
        </div>
      </header>

      <main>
        {/* Features Section */}
        <section id="features" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Powerful Features for Energy Businesses</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Our platform provides everything you need to manage your energy products business efficiently
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div
                id="sales"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                  <BarChart3 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Sales Management</h3>
                <p className="text-gray-600">
                  Streamline your sales processes with customizable pipeline management, quotations, and direct
                  integration with your payment system.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Advanced reporting and forecasting
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Automated invoice generation
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Track sales performance metrics
                  </li>
                </ul>
              </div>

              {/* Feature 2 */}
              <div
                id="customers"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Customer Management</h3>
                <p className="text-gray-600">
                  Build lasting relationships with comprehensive customer profiles, interaction history, and device
                  tracking.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Customer account management
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Service request tracking
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Device history and usage analytics
                  </li>
                </ul>
              </div>

              {/* Feature 3 */}
              <div
                id="agents"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                  <Building2 className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Agent Management</h3>
                <p className="text-gray-600">
                  Empower your distribution network with tools for agent performance tracking and commission management.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Agent performance dashboards
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Automated commission calculations
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Territory mapping and management
                  </li>
                </ul>
              </div>

              {/* Feature 4 */}
              <div
                id="products"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                  <BoxIcon className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Product Management</h3>
                <p className="text-gray-600">
                  Maintain a comprehensive catalog of your energy products with detailed specifications and pricing.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Multi-tier pricing structures
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Product bundle configuration
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Serial number and warranty tracking
                  </li>
                </ul>
              </div>

              {/* Feature 5 */}
              <div
                id="inventory"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                  <Layers className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Inventory Management</h3>
                <p className="text-gray-600">
                  Track stock levels across multiple locations with automated alerts and reorder suggestions.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Real-time inventory tracking
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Low-stock alerts and forecasting
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Batch and serial number tracking
                  </li>
                </ul>
              </div>

              {/* Feature 6 */}
              <div
                id="contracts"
                className="bg-white rounded-xl p-8 border border-gray-200 hover:border-blue-500 transition-colors shadow-sm hover:shadow-md"
              >
                <div className="h-14 w-14 rounded-lg bg-blue-100 flex items-center justify-center mb-6">
                  <ShieldCheck className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">Contract Management</h3>
                <p className="text-gray-600">
                  Generate and manage contracts with custom terms, renewal tracking, and electronic signature
                  integration.
                </p>
                <ul className="mt-4 space-y-2">
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Contract lifecycle management
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Custom contract templates
                  </li>
                  <li className="flex items-center text-gray-600">
                    <div className="h-2 w-2 bg-blue-500 rounded-full mr-2"></div>
                    Contract renewal automation
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Token Generation Section */}
        <section className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 md:pr-12 mb-10 md:mb-0">
                <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
                  Seamless Token Generation for Energy Devices
                </h2>
                <p className="text-xl text-gray-600 mb-8">
                  Generate and manage access tokens for smart inverters, batteries, and other energy devices with our
                  powerful platform.
                </p>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Secure Token Generation</h3>
                      <p className="text-gray-600 mt-1">
                        Create time-bound or perpetual access tokens with advanced encryption.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Flexible Payment Integration</h3>
                      <p className="text-gray-600 mt-1">
                        Connect directly to your preferred payment gateway without intermediaries.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                        <div className="h-3 w-3 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h3 className="text-lg font-semibold text-slate-900">Bulk Token Operations</h3>
                      <p className="text-gray-600 mt-1">
                        Generate and manage tokens for multiple devices simultaneously.
                      </p>
                    </div>
                  </div>
                </div>
                <Button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white">
                  Learn More About Token Management
                </Button>
              </div>

              <div className="md:w-1/2 relative">
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-6 md:p-8 relative z-10">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-slate-900">Device Token Generation</h3>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full">Active</span>
                  </div>

                  <div className="space-y-6">
                    <div className="p-4 rounded-lg bg-slate-100 border border-gray-200">
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-600 text-sm">Device ID</span>
                        <span className="text-gray-900 text-sm font-medium">INV-27895-XP</span>
                      </div>
                      <div className="flex justify-between mb-3">
                        <span className="text-gray-600 text-sm">Customer</span>
                        <span className="text-gray-900 text-sm font-medium">Alpha Energy Solutions</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600 text-sm">Token Type</span>
                        <span className="text-gray-900 text-sm font-medium">30-Day Access</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Token Value</label>
                      <div className="flex">
                        <input
                          type="text"
                          value="2F8A-9C3D-E71B-K560"
                          readOnly
                          className="flex-1 rounded-l-lg border border-gray-300 bg-gray-50 px-4 py-3 text-gray-900 focus:border-blue-500 focus:ring-blue-500"
                        />
                        <button className="bg-blue-100 text-blue-700 px-4 rounded-r-lg border border-blue-200 font-medium">
                          Copy
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Generated</label>
                        <div className="text-gray-900">2023-11-15 09:23 AM</div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Expires</label>
                        <div className="text-gray-900">2023-12-15 09:23 AM</div>
                      </div>
                    </div>

                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-medium transition-colors">
                      Generate New Token
                    </button>
                  </div>
                </div>

                {/* Decorative elements */}
                <div className="absolute top-10 left-10 h-full w-full rounded-2xl border border-gray-300 bg-white -z-10 transform rotate-3"></div>
                <div className="absolute top-5 left-5 h-full w-full rounded-2xl border border-gray-300 bg-white -z-20 transform -rotate-2"></div>
                <div className="absolute bottom-10 right-10 h-32 w-32 bg-blue-100 rounded-full -z-30 opacity-60 blur-xl"></div>
              </div>
            </div>
          </div>
        </section>

        {/* Integration Section */}
        <section id="integrations" className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">Seamless Payment Integration</h2>
              <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
                Connect directly to your preferred payment gateway for a streamlined experience
              </p>
            </div>

            <div className="flex flex-col py-12 md:flex-row items-center bg-gradient-to-br from-slate-50 to-slate-100 rounded-2xl overflow-hidden border border-gray-200 shadow-lg">
              <div className="md:w-1/2 p-8 md:p-12">
                <h3 className="text-2xl font-bold text-slate-900 mb-4">Your Payment Platform, Your Control</h3>
                <p className="text-gray-600 mb-6">
                  Unlike traditional SaaS platforms, we don't manage your payments or take a cut. Simply integrate your
                  existing payment gateway through our secure API.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Globe className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Multi-Gateway Support</h4>
                      <p className="text-sm text-gray-600">Integrate with any major payment processor</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-4">
                      <Database className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-slate-900">Full Data Control</h4>
                      <p className="text-sm text-gray-600">Your customer and payment data stays within your control</p>
                    </div>
                  </div>
                </div>
                {/* <Button className="mt-8 bg-blue-600 hover:bg-blue-700 text-white">Explore Integration Options</Button> */}
              </div>

              <div className="md:w-1/2 p-8 md:px-12 md:py-16 bg-white rounded-xl md:rounded-l-3xl md:rounded-r-none shadow-sm">
                <div className="border border-gray-200 rounded-lg p-6 bg-slate-50">
                  <h4 className="font-semibold text-slate-900 mb-4">Supported Payment Gateways</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                      <img src="/images/flutterwave-logo.png" alt="flutterwave logo" className="h-8" />
                    </div>
                    <div className="flex items-center justify-center p-4 bg-white rounded-lg border border-gray-200">
                      <img src="/images/paystack-logo.png" alt="Payment Gateway" className="h-8" />
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white">Trusted by Energy Leaders</h2>
              <p className="mt-4 text-xl text-gray-300 max-w-2xl mx-auto">
                See what our customers have to say about Ubuxa
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 relative">
                <div className="absolute -top-5 -right-5 bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">"</span>
                </div>
                <p className="text-gray-300 mb-6">
                  Ubuxa has transformed how we manage our solar inverter business. The token generation system is
                  seamless and our customers love the reliability.
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-blue-500">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">Jennifer Smith</h4>
                    <p className="text-sm text-gray-400">CEO, SunPower Solutions</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 relative">
                <div className="absolute -top-5 -right-5 bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">"</span>
                </div>
                <p className="text-gray-300 mb-6">
                  The inventory management features have cut our operational costs by 30%. We can now track every
                  battery and inverter throughout its lifecycle.
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-blue-500">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                    <AvatarFallback>MJ</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">Marcus Johnson</h4>
                    <p className="text-sm text-gray-400">Operations Director, EnergizeNow</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-xl border border-slate-700 relative">
                <div className="absolute -top-5 -right-5 bg-blue-600 h-10 w-10 rounded-full flex items-center justify-center">
                  <span className="text-white text-3xl">"</span>
                </div>
                <p className="text-gray-300 mb-6">
                  Being able to integrate our own payment gateway was the game-changer. We maintain our customer
                  relationships while leveraging Ubuxa's robust backend.
                </p>
                <div className="flex items-center">
                  <Avatar className="h-12 w-12 mr-4 border-2 border-blue-500">
                    <AvatarImage src="/placeholder.svg?height=48&width=48" alt="User" />
                    <AvatarFallback>AP</AvatarFallback>
                  </Avatar>
                  <div>
                    <h4 className="font-medium text-white">Amara Patel</h4>
                    <p className="text-sm text-gray-400">CTO, Battery Exchange Ltd</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Request Section */}
        <RequestDemoForm />
        
      </main>

      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            <div className="lg:col-span-2">
              <Link href="/" className="flex items-center mb-6">
                <Image src="/images/ubuxa-logo.png" alt="Ubuxa Logo" width={150} height={40} className="h-10 w-auto" />
              </Link>
              <p className="text-gray-400 mb-6 max-w-md">
                The complete management platform for energy product businesses. Streamline sales, track inventory, and
                generate device tokens seamlessly.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="h-10 w-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Features</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#sales" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Sales Management
                  </a>
                </li>
                <li>
                  <a href="#customers" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Customer Management
                  </a>
                </li>
                <li>
                  <a href="#agents" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Agent Management
                  </a>
                </li>
                <li>
                  <a href="#products" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Product Management
                  </a>
                </li>
                <li>
                  <a href="#inventory" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Inventory Management
                  </a>
                </li>
                <li>
                  <a href="#contracts" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Contract Management
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Press
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Contact Us
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-6">Resources</h3>
              <ul className="space-y-4">
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Tutorials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                    Help Center
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Ubuxa. All rights reserved.
              </p>
              <div className="flex space-x-6">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors text-sm">
                  Cookie Policy
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
