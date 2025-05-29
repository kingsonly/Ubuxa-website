"use client"

import Image from "next/image"
import { useState } from "react"
import {
  BarChart3,
  Building,
  LogOut,
  Menu,
  Settings,
  User,
  Users,
} from "lucide-react"

type Props = {
  onLogout: () => void
}

export default function AdminSidebar({ onLogout }: Props) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <aside
      className={`bg-slate-900 text-white ${
        isSidebarOpen ? "w-64" : "w-20"
      } transition-all duration-300 ease-in-out flex flex-col`}
    >
      <div className="p-4 flex items-center justify-between">
        {isSidebarOpen ? (
          <Image
            src="/images/ubuxa-logo.png"
            alt="Ubuxa Logo"
            width={120}
            height={32}
            className="h-8 w-auto"
          />
        ) : (
          <div className="w-10 h-10 bg-blue-600 rounded-md flex items-center justify-center">
            <span className="font-bold text-lg">U</span>
          </div>
        )}
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-slate-400 hover:text-white"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 pt-5">
        <div className={`px-4 py-2 ${isSidebarOpen ? "mb-2" : "mb-0"}`}>
          {isSidebarOpen ? (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Main
            </p>
          ) : (
            <div className="h-4" />
          )}
        </div>

        <a
          href="#"
          className="flex items-center px-4 py-3 text-blue-400 bg-slate-800 border-l-4 border-blue-600"
        >
          <BarChart3 className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Dashboard</span>}
        </a>

        <a
          href="#"
          className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Users className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Tenants</span>}
        </a>

        <a
          href="#"
          className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Building className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Organizations</span>}
        </a>

        <div className={`px-4 py-2 mt-6 ${isSidebarOpen ? "mb-2" : "mb-0"}`}>
          {isSidebarOpen ? (
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Settings
            </p>
          ) : (
            <div className="h-4" />
          )}
        </div>

        <a
          href="#"
          className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Settings</span>}
        </a>

        <a
          href="#"
          className="flex items-center px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white"
        >
          <User className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Account</span>}
        </a>
      </nav>

      <div className="p-4">
        <button
          onClick={onLogout}
          className="flex items-center text-slate-300 hover:text-white w-full"
        >
          <LogOut className="h-5 w-5" />
          {isSidebarOpen && <span className="ml-3">Logout</span>}
        </button>
      </div>
    </aside>
  )
}
