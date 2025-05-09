"use client"

import { ReactNode, createContext, useContext, useEffect, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "components/ui/use-toast"


type Admin = {
  id: string
  email: string
  name: string
}

type AuthContextType = {
  admin: Admin | null
  isAuthenticated: boolean
  isLoading: boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AdminAuthProvider({ children }: { children: ReactNode }) {
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await fetch('/api/admin/auth/check', {
          credentials: 'include',
        })
        
        const data = await response.json()
        
        if (response.ok && data.admin) {
          setAdmin(data.admin)
          setIsAuthenticated(true)
          
          // Redirect from login if already authenticated
          if (pathname === '/admin/login' || pathname === '/admin/set-password') {
            router.push('/admin/dashboard')
          }
        } else {
          throw new Error(data.message || 'Not authenticated')
        }
      } catch (error) {
        setAdmin(null)
        setIsAuthenticated(false)
        
        // Redirect to login if trying to access protected route
        if (pathname.startsWith('/admin') && 
            !['/admin/login', '/admin/set-password'].includes(pathname)) {
          router.push('/admin/login')
        }
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [pathname, router])

  const logout = async () => {
    try {
      await fetch('/api/admin/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      
      setAdmin(null)
      setIsAuthenticated(false)
      router.push('/admin/login')
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to logout",
        variant: "destructive",
      })
    }
  }

  return (
    <AuthContext.Provider value={{ admin, isAuthenticated, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAdminAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
      throw new Error('useAdminAuth must be used within an AdminAuthProvider')
    }
    return context
  }