// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAdminRoute = path.startsWith('/admin')
  
  if (isAdminRoute) {
    const authToken = request.cookies.get('adminAuthToken')?.value
    const isAuth = request.cookies.get('adminAuth')?.value === 'true'
    
    // If trying to access admin routes without auth
    if (!authToken || !isAuth) {
      // If trying to access login page, allow it
      if (path === '/admin/login') {
        return NextResponse.next()
      }
      return NextResponse.redirect(new URL('/admin/login', request.url))
    }
    
    // If already authenticated and trying to access login page, redirect to dashboard
    if (path === '/admin/login') {
      return NextResponse.redirect(new URL('/admin/dashboard', request.url))
    }
  }
  
  return NextResponse.next()
}

// Specify the paths the middleware should run on
export const config = {
  matcher: ['/admin/:path*']
}