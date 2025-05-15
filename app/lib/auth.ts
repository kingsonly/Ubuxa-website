// lib/auth.ts
export function isAdminAuthenticated() {
    if (typeof document === 'undefined') return false // Server-side
    return document.cookie.split(';').some((item) => item.trim().startsWith('adminAuth='))
  }
  
  export function getAdminToken() {
    if (typeof document === 'undefined') return null
    const value = document.cookie
      .split('; ')
      .find(row => row.startsWith('adminAuthToken='))
      ?.split('=')[1]
    return value || null
  }