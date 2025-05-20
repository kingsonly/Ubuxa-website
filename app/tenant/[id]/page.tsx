// "use client"

// import { useEffect, useState } from "react"
// import { useParams, useRouter } from "next/navigation"
// import { useForm } from "react-hook-form"
// import axios from "axios"
// import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
// import { Loader2, AlertCircle, Building, User, CreditCard } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Label } from "@/components/ui/label"
// import { Separator } from "@/components/ui/separator"
// import { useToast } from "@/components/ui/use-toast"
// import api from "@/lib/axios"

// // Types
// interface Tenant {
//     id: string
//     slug: string
//     email: string
//     companyName: string
//     firstName: string
//     lastName: string
//     phone: string
//     monthlyFee: number
// }

// interface UserFormData {
//     firstname: string
//     lastname: string
//     email: string
//     phone: string
//     location: string
//     password: string
//     confirmPassword: string
// }

// const TenantRegistrationPage = () => {
//     const { id } = useParams()
//     const router = useRouter()
//     const { toast } = useToast()
//     const [tenant, setTenant] = useState<Tenant | null>(null)
//     const [loading, setLoading] = useState(true)
//     const [error, setError] = useState<string | null>(null)
//     const [paymentProcessing, setPaymentProcessing] = useState(false)

//     const {
//         register,
//         handleSubmit,
//         watch,
//         formState: { errors, isValid },
//     } = useForm<UserFormData>({
//         mode: "onChange",
//         defaultValues: {
//             firstname: "",
//             lastname: "",
//             email: "",
//             phone: "",
//             location: "",
//             password: "",
//             confirmPassword: "",
//         },
//     })

//     // Fetch tenant data
//     useEffect(() => {
//         const fetchTenant = async () => {
//             try {
//                 const tenant = await api.get(`/api/v1/tenants/${id}`);
//                 setTenant(tenant.data)
//                 setError(null)
//             } catch (error: any) {
//                 console.error(error);
//                 setError("Unable to load tenant information. Please check the URL or contact support.")
//             } finally {
//                 setLoading(false)
//             }
//         }

//         if (id) {
//             fetchTenant()
//         }
//     }, [id])

//     // Flutterwave configuration
//     const config = tenant
//         ? {
//             public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
//             tx_ref: `tenant-${tenant.id}-${Date.now()}`,
//             amount: tenant.monthlyFee,
//             currency: "NGN",
//             payment_options: "card,banktransfer",
//             customer: {
//                 email: watch("email") || tenant.email,
//                 phone_number: watch("phone") || tenant.phone,
//                 name: `${watch("firstname") || tenant.firstName} ${watch("lastname") || tenant.lastName}`,
//             },
//             customizations: {
//                 title: `${tenant.companyName} Registration`,
//                 description: "Payment for tenant registration",
//                 logo: "https://res.cloudinary.com/bluebberies/image/upload/v1726242207/Screenshot_2024-09-04_at_2.43.01_PM_fcjlf3.png",
//             },
//         }
//         : null

//     const handleFlutterPayment = useFlutterwave(config as any || {})

//     const onSubmit = (data: UserFormData) => {
//         if (!tenant) return

//         setPaymentProcessing(true)

//         // Initiate Flutterwave payment
//         handleFlutterPayment({
//             callback: (response) => {
//                 closePaymentModal()
//                 console.log("i am payment response", response)
//                 if (response.status === "successful") {
//                     // Payment successful, send user data to backend
//                     completeRegistration(data, response.transaction_id)
//                 } else {
//                     setPaymentProcessing(false)
//                     toast({
//                         title: "Payment Failed",
//                         description: "Your payment was not successful. Please try again.",
//                         variant: "destructive",
//                     })
//                 }
//             },
//             onClose: () => {
//                 setPaymentProcessing(false)
//             },
//         })
//     }

//     const completeRegistration = async (userData: UserFormData, transactionId: number) => {
//         try {
//             // Send user data and payment info to backend
//             await axios.post(`/api/tenants/${id}/register`, {
//                 ...userData,
//                 tenantId: id,
//                 transactionId,
//             })

//             toast({
//                 title: "Registration Successful",
//                 description: "Your account has been created successfully. You can now login.",
//                 variant: "default",
//             })

//             // Redirect to login page after successful registration
//             setTimeout(() => {
//                 router.push("/login")
//             }, 2000)
//         } catch (err) {
//             console.error("Error completing registration:", err)
//             setPaymentProcessing(false)
//             toast({
//                 title: "Registration Failed",
//                 description: "There was an error completing your registration. Please contact support.",
//                 variant: "destructive",
//             })
//         }
//     }

//     if (loading) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen p-4">
//                 <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
//                 <p className="text-lg text-gray-600">Loading tenant information...</p>
//             </div>
//         )
//     }

//     if (error || !tenant) {
//         return (
//             <div className="flex flex-col items-center justify-center min-h-screen p-4">
//                 <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
//                 <h1 className="text-2xl font-bold text-gray-800 mb-2">Tenant Not Found</h1>
//                 <p className="text-lg text-gray-600 mb-6">{error || "Unable to load tenant information."}</p>
//                 <Button onClick={() => router.push("/")}>Return to Home</Button>
//             </div>
//         )
//     }

//     return (
//         <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
//             <div className="max-w-5xl mx-auto">
//                 <div className="text-center mb-8">
//                     <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">Complete Your Registration</h1>
//                     <p className="mt-3 text-xl text-gray-500">
//                         Set up your admin account for <span className="font-semibold text-primary">{tenant.companyName}</span>
//                     </p>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//                     {/* Tenant Information Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <Building className="mr-2 h-5 w-5" />
//                                 Company Details
//                             </CardTitle>
//                             <CardDescription>Your company information</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div>
//                                 <Label className="text-sm text-gray-500">Company Name</Label>
//                                 <p className="font-medium">{tenant.companyName}</p>
//                             </div>
//                             <div>
//                                 <Label className="text-sm text-gray-500">Email</Label>
//                                 <p className="font-medium">{tenant.email}</p>
//                             </div>
//                             <div>
//                                 <Label className="text-sm text-gray-500">Contact Person</Label>
//                                 <p className="font-medium">
//                                     {tenant.firstName} {tenant.lastName}
//                                 </p>
//                             </div>
//                             <div>
//                                 <Label className="text-sm text-gray-500">Phone</Label>
//                                 <p className="font-medium">{tenant.phone}</p>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Payment Information Card */}
//                     <Card>
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <CreditCard className="mr-2 h-5 w-5" />
//                                 Payment Details
//                             </CardTitle>
//                             <CardDescription>Your subscription information</CardDescription>
//                         </CardHeader>
//                         <CardContent className="space-y-4">
//                             <div className="p-4 bg-primary/10 rounded-lg">
//                                 <Label className="text-sm text-gray-500">Monthly Subscription</Label>
//                                 <p className="text-2xl font-bold text-primary">₦{tenant.monthlyFee.toLocaleString()}</p>
//                                 <p className="text-sm text-gray-500 mt-1">Billed monthly</p>
//                             </div>

//                             <div className="space-y-2">
//                                 <div className="flex justify-between">
//                                     <span>Monthly Fee</span>
//                                     <span>₦{tenant.monthlyFee.toLocaleString()}</span>
//                                 </div>
//                                 <Separator />
//                                 <div className="flex justify-between font-medium">
//                                     <span>Total Due Today</span>
//                                     <span>₦{tenant.monthlyFee.toLocaleString()}</span>
//                                 </div>
//                             </div>

//                             <div className="text-sm text-gray-500 mt-4">
//                                 <p>Payment will be processed securely via Flutterwave</p>
//                             </div>
//                         </CardContent>
//                     </Card>

//                     {/* Admin User Form Card */}
//                     <Card className="lg:col-span-1">
//                         <CardHeader>
//                             <CardTitle className="flex items-center">
//                                 <User className="mr-2 h-5 w-5" />
//                                 Admin Account
//                             </CardTitle>
//                             <CardDescription>Create your admin user account</CardDescription>
//                         </CardHeader>
//                         <CardContent>
//                             <form id="registration-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
//                                 <div className="grid grid-cols-2 gap-4">
//                                     <div className="space-y-2">
//                                         <Label htmlFor="firstname">First Name</Label>
//                                         <Input
//                                             id="firstname"
//                                             {...register("firstname", {
//                                                 required: "First name is required",
//                                                 minLength: { value: 2, message: "First name is too short" },
//                                             })}
//                                         />
//                                         {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
//                                     </div>

//                                     <div className="space-y-2">
//                                         <Label htmlFor="lastname">Last Name</Label>
//                                         <Input
//                                             id="lastname"
//                                             {...register("lastname", {
//                                                 required: "Last name is required",
//                                                 minLength: { value: 2, message: "Last name is too short" },
//                                             })}
//                                         />
//                                         {errors.lastname && <p className="text-sm text-red-500">{errors.lastname.message}</p>}
//                                     </div>
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="email">Email</Label>
//                                     <Input
//                                         id="email"
//                                         type="email"
//                                         {...register("email", {
//                                             required: "Email is required",
//                                             pattern: {
//                                                 value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
//                                                 message: "Invalid email address",
//                                             },
//                                         })}
//                                     />
//                                     {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="phone">Phone Number</Label>
//                                     <Input
//                                         id="phone"
//                                         {...register("phone", {
//                                             required: "Phone number is required",
//                                             minLength: { value: 5, message: "Phone number is too short" },
//                                         })}
//                                     />
//                                     {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="location">Location</Label>
//                                     <Input id="location" {...register("location", { required: "Location is required" })} />
//                                     {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="password">Password</Label>
//                                     <Input
//                                         id="password"
//                                         type="password"
//                                         {...register("password", {
//                                             required: "Password is required",
//                                             minLength: { value: 8, message: "Password must be at least 8 characters" },
//                                         })}
//                                     />
//                                     {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
//                                 </div>

//                                 <div className="space-y-2">
//                                     <Label htmlFor="confirmPassword">Confirm Password</Label>
//                                     <Input
//                                         id="confirmPassword"
//                                         type="password"
//                                         {...register("confirmPassword", {
//                                             required: "Please confirm your password",
//                                             validate: (value) => value === watch("password") || "Passwords do not match",
//                                         })}
//                                     />
//                                     {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
//                                 </div>
//                             </form>
//                         </CardContent>
//                         <CardFooter>
//                             <Button
//                                 type="submit"
//                                 form="registration-form"
//                                 className="w-full"
//                                 disabled={!isValid || paymentProcessing}
//                             >
//                                 {paymentProcessing ? (
//                                     <>
//                                         <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                                         Processing...
//                                     </>
//                                 ) : (
//                                     <>Complete Registration & Pay ₦{tenant.monthlyFee.toLocaleString()}</>
//                                 )}
//                             </Button>
//                         </CardFooter>
//                     </Card>
//                 </div>

//                 <div className="mt-8 text-center text-sm text-gray-500">
//                     <p>
//                         By completing registration, you agree to our{" "}
//                         <a href="/terms" className="font-medium text-primary hover:underline">
//                             Terms of Service
//                         </a>{" "}
//                         and{" "}
//                         <a href="/privacy" className="font-medium text-primary hover:underline">
//                             Privacy Policy
//                         </a>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     )
// }

// export default TenantRegistrationPage


"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import axios from "axios"
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3"
import { Loader2, AlertCircle, Building, User, CreditCard, CheckCircle, ArrowRight } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import api from "@/lib/axios"

// Types
interface Tenant {
    id: string
    slug: string
    email: string
    companyName: string
    firstName: string
    lastName: string
    phone: string
    monthlyFee: number
}

interface UserFormData {
    firstname: string
    lastname: string
    email: string
    phone: string
    location: string
    password: string
    confirmPassword: string
}

const TenantRegistrationPage = () => {
    const { id } = useParams()
    const router = useRouter()
    const { toast } = useToast()
    const [tenant, setTenant] = useState<Tenant | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [paymentProcessing, setPaymentProcessing] = useState(false)
    const [activeSection, setActiveSection] = useState<"company" | "payment" | "account">("company")

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors, isValid },
    } = useForm<UserFormData>({
        mode: "onChange",
        defaultValues: {
            firstname: "",
            lastname: "",
            email: "",
            phone: "",
            location: "",
            password: "",
            confirmPassword: "",
        },
    })

    // Fetch tenant data
    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const tenant = await api.get(`/api/v1/tenants/${id}`)
                setTenant(tenant.data)
                setError(null)
            } catch (error: any) {
                console.error(error)
                setError("Unable to load tenant information. Please check the URL or contact support.")
            } finally {
                setLoading(false)
            }
        }

        if (id) {
            fetchTenant()
        }
    }, [id])

    // Flutterwave configuration
    const config = tenant
        ? {
            public_key: process.env.NEXT_PUBLIC_FLUTTERWAVE_PUBLIC_KEY || "",
            tx_ref: `tenant-${tenant.id}-${Date.now()}`,
            amount: tenant.monthlyFee,
            currency: "NGN",
            payment_options: "card",
            customer: {
                email: tenant.email,
                phone_number: tenant.phone,
                name: `${tenant.firstName} ${tenant.lastName}`,
            },
            customizations: {
                title: `Ubuxa Registration`,
                description: "Initial Subscription Payment",
                logo: "https://res.cloudinary.com/bluebberies/image/upload/v1726242207/Screenshot_2024-09-04_at_2.43.01_PM_fcjlf3.png",
            },
        }
        : null

    const handleFlutterPayment = useFlutterwave(config as any || {})

    const onSubmit = (data: UserFormData) => {
        if (!tenant) return

        setPaymentProcessing(true)

        // Initiate Flutterwave payment
        handleFlutterPayment({
            callback: (response) => {
                closePaymentModal()
                console.log("i am payment response", response)
                if (response.status === "successful") {
                    // Payment successful, send user data to backend
                    completeRegistration(data, response.transaction_id)
                } else {
                    setPaymentProcessing(false)
                    toast({
                        title: "Payment Failed",
                        description: "Your payment was not successful. Please try again.",
                        variant: "destructive",
                    })
                }
            },
            onClose: () => {
                setPaymentProcessing(false)
            },
        })
    }

    const completeRegistration = async (userData: UserFormData, transactionId: number) => {
        try {
            // Send user data and payment info to backend
            await api.post(`/api/v1/tenants/onboard-initial-payment/${id}`, {
                ...userData,
                tenantId: id,
                paymentReference: transactionId,
            });
            setPaymentProcessing(false)
            toast({
                title: "Registration Successful",
                description: "Your account has been created successfully. You can now login.",
                variant: "default",
            })

            // Redirect to login page after successful registration on the app page
        } catch (err) {
            console.error("Error completing registration:", err)
            setPaymentProcessing(false)
            toast({
                title: "Registration Failed",
                description: "There was an error completing your registration. Please contact support.",
                variant: "destructive",
            })
        }
    }

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <Image src="/images/loader.gif" alt="Loader" width={100} height={100} />
                <p className="text-lg text-[#333333]">Loading tenant information...</p>
            </div>
        )
    }

    if (error || !tenant) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen p-4">
                <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
                <h1 className="text-2xl font-bold text-[#333333] mb-2">Tenant Not Found</h1>
                <p className="text-lg text-gray-600 mb-6">{error || "Unable to load tenant information."}</p>
                <Button onClick={() => router.push("/")} className="bg-[#0F2B5B] hover:bg-[#0F2B5B]/90">
                    Return to Home
                </Button>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex flex-col md:flex-row">
            {/* Left Hero Section */}
            <div className="w-full md:w-5/12 bg-gradient-to-br from-[#0F2B5B] to-[#1A4189] text-white p-8 md:p-12 flex flex-col">
                <div className="mb-8">
                    <Image
                        src="/images/ubuxa-logo.png"
                        alt="Logo"
                        width={150}
                        height={50}
                        className="mb-12"
                    />
                    <h1 className="text-3xl md:text-4xl font-bold mb-4">Welcome to Ubuxa</h1>
                    <p className="text-lg opacity-90 mb-8">
                        Complete your registration to access your company's dashboard and start managing your business efficiently.
                    </p>
                </div>

                <div className="flex-grow">
                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <div className="bg-white/20 rounded-full p-2 mt-1">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl">Streamlined Operations</h3>
                                <p className="opacity-80">Manage your entire business workflow in one place</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-white/20 rounded-full p-2 mt-1">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl">Real-time Analytics</h3>
                                <p className="opacity-80">Get insights into your business performance instantly</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <div className="bg-white/20 rounded-full p-2 mt-1">
                                <CheckCircle className="h-5 w-5 text-white" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-xl">Secure Platform</h3>
                                <p className="opacity-80">Your data is protected with enterprise-grade security</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-auto pt-8 border-t border-white/20">
                    <p className="text-sm opacity-80">
                        Already have an account? <a href="/login" className="underline font-medium">Sign in here</a>
                    </p>
                </div>
            </div>

            {/* Right Form Section */}
            <div className="w-full md:w-7/12 bg-white p-6 md:p-12 overflow-y-auto">
                <div className="max-w-2xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-2xl md:text-3xl font-bold text-[#333333]">Complete Your Registration</h2>
                        <p className="text-gray-600 mt-2">
                            Set up your admin account for <span className="font-semibold text-[#0F2B5B]">{tenant.companyName}</span>
                        </p>
                    </div>

                    {/* Progress Tabs */}
                    <div className="flex mb-8 border-b">
                        <button
                            onClick={() => setActiveSection("company")}
                            className={`flex items-center px-4 py-2 border-b-2 ${activeSection === "company" ? "border-[#0F2B5B] text-[#0F2B5B]" : "border-transparent text-gray-500"
                                }`}
                        >
                            <Building className="w-4 h-4 mr-2" />
                            Company
                        </button>
                        <button
                            onClick={() => setActiveSection("payment")}
                            className={`flex items-center px-4 py-2 border-b-2 ${activeSection === "payment" ? "border-[#0F2B5B] text-[#0F2B5B]" : "border-transparent text-gray-500"
                                }`}
                        >
                            <CreditCard className="w-4 h-4 mr-2" />
                            Payment
                        </button>
                        <button
                            onClick={() => setActiveSection("account")}
                            className={`flex items-center px-4 py-2 border-b-2 ${activeSection === "account" ? "border-[#0F2B5B] text-[#0F2B5B]" : "border-transparent text-gray-500"
                                }`}
                        >
                            <User className="w-4 h-4 mr-2" />
                            Account
                        </button>
                    </div>

                    {/* Company Details Section */}
                    <div className={activeSection === "company" ? "block" : "hidden"}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-[#333333] flex items-center">
                                    <Building className="w-5 h-5 mr-2 text-[#0F2B5B]" />
                                    Company Details
                                </h3>
                                <span className="text-xs font-medium px-2 py-1 bg-blue-50 text-[#0F2B5B] rounded-full">Verified</span>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div>
                                    <Label className="text-sm text-gray-500 mb-1 block">Company Name</Label>
                                    <p className="font-medium text-[#333333]">{tenant.companyName}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-gray-500 mb-1 block">Email</Label>
                                    <p className="font-medium text-[#333333]">{tenant.email}</p>
                                </div>
                                <div>
                                    <Label className="text-sm text-gray-500 mb-1 block">Contact Person</Label>
                                    <p className="font-medium text-[#333333]">
                                        {tenant.firstName} {tenant.lastName}
                                    </p>
                                </div>
                                <div>
                                    <Label className="text-sm text-gray-500 mb-1 block">Phone</Label>
                                    <p className="font-medium text-[#333333]">{tenant.phone}</p>
                                </div>
                            </div>

                            <div className="mt-6 flex justify-end">
                                <Button
                                    onClick={() => setActiveSection("payment")}
                                    className="bg-[#0F2B5B] hover:bg-[#0F2B5B]/90"
                                >
                                    Continue to Payment <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Payment Details Section */}
                    <div className={activeSection === "payment" ? "block" : "hidden"}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center mb-4">
                                <h3 className="text-lg font-semibold text-[#333333] flex items-center">
                                    <CreditCard className="w-5 h-5 mr-2 text-[#0F2B5B]" />
                                    Payment Details
                                </h3>
                            </div>

                            <div className="bg-gradient-to-r from-[#0F2B5B]/5 to-[#0F2B5B]/10 rounded-lg p-6 mb-6">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-sm text-gray-600">Monthly Subscription</span>
                                    <span className="text-xs px-2 py-1 bg-white text-[#0F2B5B] rounded-full font-medium">Required</span>
                                </div>
                                <div className="flex items-end justify-between">
                                    <div>
                                        <p className="text-3xl font-bold text-[#0F2B5B]">₦{tenant.monthlyFee.toLocaleString()}</p>
                                        <p className="text-sm text-gray-500 mt-1">Billed monthly</p>
                                    </div>
                                    <div className="flex items-center">
                                        <Image
                                            src="https://res.cloudinary.com/bluebberies/image/upload/v1726242207/Screenshot_2024-09-04_at_2.43.01_PM_fcjlf3.png"
                                            alt="Flutterwave"
                                            width={80}
                                            height={30}
                                            className="opacity-70"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-600">Monthly Fee</span>
                                    <span className="font-medium text-[#333333]">₦{tenant.monthlyFee.toLocaleString()}</span>
                                </div>
                                <Separator />
                                <div className="flex justify-between font-medium">
                                    <span className="text-[#333333]">Total Due Today</span>
                                    <span className="text-[#0F2B5B] font-bold">₦{tenant.monthlyFee.toLocaleString()}</span>
                                </div>
                            </div>

                            <div className="text-sm text-gray-500 bg-gray-50 p-3 rounded-md mb-6">
                                <p className="flex items-center">
                                    <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                                    Payment will be processed securely via Flutterwave
                                </p>
                            </div>

                            <div className="mt-6 flex justify-between">
                                <Button
                                    onClick={() => setActiveSection("company")}
                                    variant="outline"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={() => setActiveSection("account")}
                                    className="bg-[#0F2B5B] hover:bg-[#0F2B5B]/90"
                                >
                                    Continue to Account Setup <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Admin Account Section */}
                    <div className={activeSection === "account" ? "block" : "hidden"}>
                        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6">
                            <div className="flex items-center mb-6">
                                <h3 className="text-lg font-semibold text-[#333333] flex items-center">
                                    <User className="w-5 h-5 mr-2 text-[#0F2B5B]" />
                                    Admin Account Setup
                                </h3>
                            </div>

                            <form id="registration-form" onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="firstname" className="text-[#333333]">First Name</Label>
                                        <Input
                                            id="firstname"
                                            className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                            {...register("firstname", {
                                                required: "First name is required",
                                                minLength: { value: 2, message: "First name is too short" },
                                            })}
                                        />
                                        {errors.firstname && <p className="text-sm text-red-500">{errors.firstname.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="lastname" className="text-[#333333]">Last Name</Label>
                                        <Input
                                            id="lastname"
                                            className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                            {...register("lastname", {
                                                required: "Last name is required",
                                                minLength: { value: 2, message: "Last name is too short" },
                                            })}
                                        />
                                        {errors.lastname && <p className="text-sm text-red-500">{errors.lastname.message}</p>}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="email" className="text-[#333333]">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address",
                                            },
                                        })}
                                    />
                                    {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="phone" className="text-[#333333]">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                        {...register("phone", {
                                            required: "Phone number is required",
                                            minLength: { value: 5, message: "Phone number is too short" },
                                        })}
                                    />
                                    {errors.phone && <p className="text-sm text-red-500">{errors.phone.message}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="location" className="text-[#333333]">Location</Label>
                                    <Input
                                        id="location"
                                        className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                        {...register("location", { required: "Location is required" })}
                                    />
                                    {errors.location && <p className="text-sm text-red-500">{errors.location.message}</p>}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-[#333333]">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                            {...register("password", {
                                                required: "Password is required",
                                                minLength: { value: 8, message: "Password must be at least 8 characters" },
                                            })}
                                        />
                                        {errors.password && <p className="text-sm text-red-500">{errors.password.message}</p>}
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="confirmPassword" className="text-[#333333]">Confirm Password</Label>
                                        <Input
                                            id="confirmPassword"
                                            type="password"
                                            className="border-gray-300 focus:border-[#0F2B5B] focus:ring-[#0F2B5B]"
                                            {...register("confirmPassword", {
                                                required: "Please confirm your password",
                                                validate: (value) => value === watch("password") || "Passwords do not match",
                                            })}
                                        />
                                        {errors.confirmPassword && <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>}
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between">
                                    <Button
                                        onClick={() => setActiveSection("payment")}
                                        variant="outline"
                                    >
                                        Back
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="bg-[#0F2B5B] hover:bg-[#0F2B5B]/90"
                                        disabled={!isValid || paymentProcessing}
                                    >
                                        {paymentProcessing ? (
                                            <>
                                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                                Processing...
                                            </>
                                        ) : (
                                            <>Complete Registration & Pay ₦{tenant.monthlyFee.toLocaleString()}</>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        <p>
                            By completing registration, you agree to our{" "}
                            <a href="/terms" className="font-medium text-[#0F2B5B] hover:underline">
                                Terms of Service
                            </a>{" "}
                            and{" "}
                            <a href="/privacy" className="font-medium text-[#0F2B5B] hover:underline">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TenantRegistrationPage
