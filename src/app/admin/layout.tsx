import Link from 'next/link'
import {
  HelpCircle,
  MessageCircle,
  Settings,
  LayoutDashboard,
  Building2,
  Users,
  History,
  QrCode,
  Globe,
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ThemeToggle } from '@/components/theme-toggle'
import { LogoutButton } from '@/components/logout-button'
import { SidebarSearch } from '@/components/sidebar-search'
import { SidebarQuickActions } from '@/components/sidebar-quick-actions'

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

        {/* Command Center - Primary Navigation (High Readability) */}
        <div className="px-3 pt-2 pb-6">
          <h3 className="text-[11px] uppercase text-slate-900 font-extrabold mb-4 px-3 tracking-[0.15em]">Command Center</h3>
          <nav className="space-y-1">
            <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF5A20] font-bold shadow-sm group-hover:shadow-md transition-all">
                <LayoutDashboard className="w-4 h-4" />
              </div>
              Executive Overview
            </Link>
            <Link href="/admin/organizations" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shadow-sm group-hover:shadow-md transition-all">
                <Building2 className="w-4 h-4" />
              </div>
              Group Organizations
            </Link>
            <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold shadow-sm group-hover:shadow-md transition-all">
                <Users className="w-4 h-4" />
              </div>
              Master Customer List
            </Link>
            <Link href="/admin/audit" className="flex items-center gap-3 px-3 py-2.5 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold shadow-sm group-hover:shadow-md transition-all">
                <History className="w-4 h-4" />
              </div>
              Audit Trails
            </Link>
          </nav>
        </div>

        {/* Strategic Tools Section (New Tools requested) */}
        <div className="px-3 pb-6">
          <h3 className="text-[11px] uppercase text-slate-900 font-extrabold mb-4 px-3 tracking-[0.15em]">Strategic Tools</h3>
          <nav className="space-y-1">
            <Link href="/admin/tools/qr-manager" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm group-hover:shadow-md transition-all">
                <QrCode className="w-4 h-4" />
              </div>
              QR Code Manager
            </Link>
            <Link href="/admin/tools/capture-registry" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-sm group-hover:shadow-md transition-all">
                <Globe className="w-4 h-4" />
              </div>
              Capture Link Registry
            </Link>
          </nav>
        </div>

        {/* Real-Time Search & Modular Navigation */}
        <div className="flex-1 overflow-hidden flex flex-col border-t border-slate-100 pt-6">
          <div className="px-6 mb-2">
             <h3 className="text-[11px] uppercase text-slate-900 font-extrabold tracking-[0.15em]">Quick Branch Search</h3>
          </div>
          <SidebarSearch portfolios={portfolios} />
        </div>

        {/* Quick Actions Card (Now as a Client Component) */}
        <SidebarQuickActions />

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
