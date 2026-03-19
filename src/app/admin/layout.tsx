import Link from "next/link"
import { LayoutDashboard, Users, Building2, Settings, LogOut, Search, Bell } from "lucide-react"
import { logout } from "@/app/login/actions"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col z-10 shadow-sm relative">
        <div className="h-16 flex items-center px-6 border-b border-slate-100 shrink-0">
          <span className="text-2xl font-black tracking-tight text-slate-900">
            ENSIGN<span className="text-indigo-600">.</span>
          </span>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-4">Dashboard</p>
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 bg-indigo-50/50 text-indigo-700 rounded-lg font-semibold transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href="/admin/organizations" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Building2 className="w-5 h-5 opacity-70" />
            Subsidiaries
          </Link>
          <Link href="/admin/users" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5 opacity-70" />
            Staff & Users
          </Link>
          
          <p className="px-3 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 mt-8">Configuration</p>
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 text-slate-600 hover:bg-slate-50 hover:text-slate-900 rounded-lg font-medium transition-colors">
            <Settings className="w-5 h-5 opacity-70" />
            General Settings
          </Link>
        </nav>

        {/* User Card at bottom of sidebar */}
        <div className="p-4 border-t border-slate-100 m-2 mt-auto">
          <div className="flex items-center gap-3 bg-slate-50 rounded-lg p-2 ring-1 ring-slate-200/50">
            <Avatar className="h-9 w-9 border border-white shadow-sm">
              <AvatarImage src="" />
              <AvatarFallback className="bg-indigo-600 text-white font-bold text-xs">SA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 truncate">Chief Admin</p>
              <p className="text-xs text-slate-500 truncate">admin@ensign.co</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200/60 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search branches, accounts..."
                className="w-full pl-9 bg-slate-100/50 border-transparent focus:border-indigo-500 focus:bg-white rounded-full h-9 transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-4 ml-4">
            <button className="text-slate-400 hover:text-slate-600 relative p-2 transition-colors rounded-full hover:bg-slate-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none flex items-center gap-2 hover:bg-slate-50 p-1 pr-2 rounded-full transition-colors border border-transparent hover:border-slate-200">
                <Avatar className="h-8 w-8 shadow-sm">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">SA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-xl shadow-slate-200/20 ring-1 ring-slate-200/50 border-none p-1">
                <DropdownMenuLabel className="font-semibold px-3 py-2 text-slate-800">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-100 mx-2" />
                <DropdownMenuItem className="rounded-lg mx-1 text-slate-600 font-medium cursor-pointer hover:text-slate-900 focus:bg-slate-50">Profile Settings</DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-100 mx-2" />
                <form action={logout} className="mx-1 mt-1">
                  <button type="submit" className="flex w-full items-center text-red-600 bg-red-50/50 hover:bg-red-50 px-2 py-2 rounded-lg transition-colors font-medium">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Secure Log Out</span>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8 bg-slate-50/50">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
