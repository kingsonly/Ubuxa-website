"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Lock, Key } from "lucide-react"
import Link from "next/link"
import { setPasswordSchema } from "lib/auth"
import { useToast } from "components/ui/use-toast"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "components/ui/form"
import { Input } from "components/ui/input"
import { Button } from "components/ui/button"

type FormData = z.infer<typeof setPasswordSchema>

export default function SetPasswordPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()
  const [isLoading, setIsLoading] = useState(false)
  const token = searchParams.get("token")

  const form = useForm<FormData>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  async function onSubmit(data: FormData) {
    if (!token) {
      toast({
        title: "Invalid link",
        description: "The password setup link is invalid or expired",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    
    try {
      const response = await fetch('/api/admin/auth/set-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          token,
          password: data.password,
        }),
      })

      const result = await response.json()
      
      if (!response.ok) {
        throw new Error(result.message || "Failed to set password")
      }

      toast({
        title: "Success!",
        description: "Your password has been set successfully",
      })
      
      router.push('/admin/login')
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An unexpected error occurred",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100 p-4">
      <div className="w-full max-w-md">
        <Card className="border-slate-200 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
              <Key className="h-6 w-6 text-blue-600" />
            </div>
            <CardTitle className="text-2xl">Set Your Password</CardTitle>
            <CardDescription>Create a secure password for your admin account</CardDescription>
          </CardHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="At least 8 characters"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm Password</FormLabel>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Lock className="h-5 w-5 text-slate-400" />
                        </div>
                        <FormControl>
                          <Input
                            type="password"
                            placeholder="Re-enter your password"
                            className="pl-10"
                            {...field}
                          />
                        </FormControl>
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
              <CardContent>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Setting up..." : "Set Password"}
                </Button>
              </CardContent>
            </form>
          </Form>
        </Card>
        <div className="mt-4 text-center text-sm">
          <Link href="/admin/login" className="text-blue-600 hover:underline">
            Back to login
          </Link>
        </div>
      </div>
    </div>
  )
}