import { AdminAuthProvider } from "../../providers/admin-auth-provider"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AdminAuthProvider>
      <div className="min-h-screen bg-slate-50">
        {children}
      </div>
    </AdminAuthProvider>
  )
}
