import Link from "next/link"
import { LayoutDashboard, Database, Users, Bell, Search, LogOut, PlusCircle } from "lucide-react"
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
import { ThemeToggle } from "@/components/theme-toggle"

export default async function WorkspaceLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {/* Sidebar - Subsidiary Specific */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 hidden md:flex flex-col z-10 shadow-lg relative text-slate-300">
        <div className="h-16 flex items-center px-6 shrink-0 bg-slate-950">
          <span className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <div className="w-6 h-6 bg-indigo-500 rounded flex items-center justify-center">
              <span className="text-xs font-black text-white">W</span>
            </div>
            Workspace
          </span>
        </div>
        
        <div className="px-6 py-4 border-b border-slate-800 bg-slate-900/50">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">Active Branch</p>
          <p className="text-sm font-bold text-white truncate">Branch #{id}</p>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          <Link href={`/workspace/${id}`} className="flex items-center gap-3 px-3 py-2.5 bg-indigo-600/10 text-indigo-400 rounded-lg font-semibold transition-colors">
            <LayoutDashboard className="w-5 h-5" />
            Overview
          </Link>
          <Link href={`/workspace/${id}/customers`} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Users className="w-5 h-5 opacity-70" />
            Customer Database
          </Link>
          <Link href={`/workspace/${id}/capture`} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <PlusCircle className="w-5 h-5 opacity-70" />
            Data Capture Flow
          </Link>
          
          <p className="px-3 text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2 mt-8">Tools</p>
          <Link href={`/workspace/${id}/reports`} className="flex items-center gap-3 px-3 py-2.5 hover:bg-slate-800 hover:text-white rounded-lg font-medium transition-colors">
            <Database className="w-5 h-5 opacity-70" />
            Local Reports
          </Link>
        </nav>

        {/* User Card */}
        <div className="p-4 bg-slate-950 mt-auto">
          <div className="flex items-center gap-3 rounded-lg p-2">
            <Avatar className="h-9 w-9 border border-slate-700 shadow-sm">
              <AvatarImage src="" />
              <AvatarFallback className="bg-slate-800 text-slate-300 font-bold text-xs">SA</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-white truncate">Branch Admin</p>
              <p className="text-xs text-slate-500 truncate">agent@subsidiary.co</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* Top Header */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 shrink-0 sticky top-0 z-20 shadow-sm">
          <div className="flex items-center flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder="Search customers by name, phone, or ID..."
                className="w-full pl-9 bg-slate-50 border-slate-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-lg h-9 transition-all text-sm"
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 ml-4">
            <ThemeToggle />
            <button className="text-slate-400 hover:text-indigo-600 relative p-2 transition-colors rounded-lg hover:bg-indigo-50">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-200 mx-1"></div>
            
            <DropdownMenu>
              <DropdownMenuTrigger className="focus:outline-none flex items-center gap-2 hover:bg-slate-50 p-1 rounded-lg transition-colors border border-transparent">
                <Avatar className="h-8 w-8 shadow-sm">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-indigo-100 text-indigo-700 text-xs font-bold">SA</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 mt-2 rounded-xl shadow-lg border-slate-200">
                <DropdownMenuLabel className="font-semibold px-3 py-2 text-slate-800">My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">Workspace Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <form action={logout}>
                  <button type="submit" className="flex w-full items-center text-red-600 cursor-pointer hover:bg-red-50 p-2 rounded-md transition-colors font-medium">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log Out</span>
                  </button>
                </form>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto p-6 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}
