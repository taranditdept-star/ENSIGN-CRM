import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BarChart,
  HelpCircle,
  MessageCircle,
  Settings,
  History,
  Building2,
  Search,
  Command,
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoutButton } from '@/components/logout-button'
import { SidebarPortfolio } from '@/components/sidebar-portfolio'

interface OrganizationWithSubs {
  id: string;
  name: string;
  module_type: string;
  subsidiaries: {
    id: string;
    name: string;
    customers: { count: number }[];
  }[];
}

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()

  // Fetch organizations with their subsidiaries for the modular sidebar
  const { data: orgs } = await supabase
    .from('organizations')
    .select('*, subsidiaries(*, customers(count))')
    .order('name')

  const portfolios = (orgs as unknown as OrganizationWithSubs[] || []).map(org => ({
    id: org.id,
    name: org.name,
    module: org.module_type,
    branches: (org.subsidiaries || []).map(sub => ({
      id: sub.id,
      name: sub.name,
      count: sub.customers?.[0]?.count || 0,
      color: org.module_type === 'lpg' ? '#4F46E5' : 
             org.module_type === 'sbali' ? '#EC4899' :
             org.module_type === 'mining' ? '#D97706' :
             org.module_type === 'explosives' ? '#EF4444' :
             org.module_type === 'fuel' ? '#0EA5E9' :
             org.module_type === 'solar' ? '#F59E0B' :
             org.module_type === 'branding' ? '#6366F1' :
             org.module_type === 'farming' ? '#10B981' :
             org.module_type === 'meat' ? '#F43F5E' :
             org.module_type === 'retail' ? '#8B5CF6' :
             org.module_type === 'bakery' ? '#F59E0B' : '#64748b'
    }))
  }))

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-2 sm:p-4 flex gap-4">
      
      {/* Sidebar - Matching Uxerflow Light Sidebar exactly */}
      <aside className="w-[260px] bg-white border border-slate-200 flex flex-col hidden lg:flex shrink-0 rounded-2xl shadow-sm h-[calc(100vh-32px)]">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold tracking-tighter">
              EN
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none mb-1">Ensign Holdings</h2>
              <div className="flex items-center gap-2">
                <p className="text-[10px] text-slate-400 font-semibold bg-slate-100 dark:bg-slate-800 w-max px-1.5 py-0.5 rounded-sm tracking-tight">Centralized CRM</p>
                <div className="scale-75 origin-left">
                  <ThemeToggle />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-slate-600" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl pl-9 pr-8 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-bold text-slate-300 bg-white border border-slate-200 px-1 py-0.5 rounded uppercase">
              <Command className="w-2.5 h-2.5"/> K
            </div>
          </div>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-7 scrollbar-hide">
          
          {/* Main Menu */}
          <div>
            <h3 className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-3 tracking-widest">Main Menu</h3>
            <nav className="space-y-0.5">
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Group Executive Overview
              </Link>
              <Link href="/admin/organizations" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Building2 className="w-4 h-4" /> Portfolio Companies
              </Link>
              <Link href="/admin/subsidiaries" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Users className="w-4 h-4" /> Subsidiary Branches
              </Link>
              <Link href="/admin/analytics" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <BarChart className="w-4 h-4" /> Global Analytics
              </Link>
              <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Users className="w-4 h-4" /> Master Customer List
              </Link>
              <Link href="/admin/audit" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <History className="w-4 h-4" /> Audit Trails
              </Link>
            </nav>
          </div>

          {/* Portfolios (Modular Navigation) - Data driven and Collapsible */}
          <div className="space-y-6">
            {portfolios.map((portfolio) => (
              <SidebarPortfolio 
                key={portfolio.id}
                id={portfolio.id}
                name={portfolio.name}
                module={portfolio.module}
                branches={portfolio.branches}
              />
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-0.5">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" /> Help center
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" /> Feedback
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
          <div className="pt-2 mt-2 border-t border-slate-100 flex items-center px-1">
            <LogoutButton />
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-32px)] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
