import Link from 'next/link'
import {
  LayoutDashboard,
  Building2,
  Users,
  History,
  QrCode,
  Globe,
  TrendingUp,
} from 'lucide-react'
import { createClient } from '@/utils/supabase/server'
import { ThemeToggle } from '@/components/theme-toggle'
import { SidebarSearch } from '@/components/sidebar-search'
import { MobileNav } from '@/components/mobile-nav'
import { AdminHeader } from '@/components/admin-header'
import { BrandTheme } from '@/components/brand-theme'
import { SidebarFooter } from '@/components/sidebar-footer'

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

  const commandCenter = (
    <div className="px-3">
      <h3 className="text-[11px] uppercase text-slate-900 font-extrabold mb-4 px-3 tracking-[0.15em]">Command Center</h3>
      <nav className="space-y-1">
        <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-orange-50 flex items-center justify-center text-[#FF5A20] font-bold shadow-sm group-hover:shadow-md transition-all shrink-0">
            <LayoutDashboard className="w-4 h-4" />
          </div>
          Executive Overview
        </Link>
        <Link href="/admin/organizations" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shadow-sm group-hover:shadow-md transition-all shrink-0">
            <Building2 className="w-4 h-4" />
          </div>
          Group Organizations
        </Link>
        <Link href="/admin/customers" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 font-bold shadow-sm group-hover:shadow-md transition-all shrink-0">
            <Users className="w-4 h-4" />
          </div>
          Master Customer List
        </Link>
        <Link href="/admin/audit" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600 font-bold shadow-sm group-hover:shadow-md transition-all shrink-0">
            <History className="w-4 h-4" />
          </div>
          Audit Trails
        </Link>
        <Link href="/admin/sales" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-amber-50 flex items-center justify-center text-amber-600 font-bold shadow-sm group-hover:shadow-md transition-all shrink-0 border border-amber-100">
            <TrendingUp className="w-4 h-4" />
          </div>
          Sales Performance
        </Link>
      </nav>
    </div>
  )

  const strategicTools = (
    <div className="px-3">
      <h3 className="text-[11px] uppercase text-slate-900 font-extrabold mb-4 px-3 tracking-[0.15em]">Strategic Tools</h3>
      <nav className="space-y-1">
        <Link href="/admin/tools/qr-manager" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 font-bold shadow-sm group-hover:shadow-md transition-all shrink-0">
            <QrCode className="w-4 h-4" />
          </div>
          QR Code Manager
        </Link>
        <Link href="/admin/tools/capture-registry" className="flex items-center gap-3 px-3 py-2 text-sm font-bold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all group">
          <div className="w-8 h-8 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold shadow-sm group-hover:shadow-md transition-all shrink-0">
            <Globe className="w-4 h-4" />
          </div>
          Capture Link Registry
        </Link>
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-2 sm:p-4 flex gap-4" style={{ '--brand-accent': '#6366F1' } as React.CSSProperties}>
      <BrandTheme />
      
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

        {/* Main Navigation - Single Scrollable Stream */}
        <div className="flex-1 overflow-y-auto min-h-0 py-4 scrollbar-hide">
          {commandCenter}
          <div className="h-4" /> 
          {strategicTools}
          <div className="h-4" />
          
          {/* Real-Time Search & Branch Portfolios */}
          <div className="border-t border-slate-50 pt-8">
            <div className="px-6 mb-4">
               <h3 className="text-[11px] uppercase text-slate-900 font-extrabold tracking-[0.15em]">Branch Navigation</h3>
            </div>
            <SidebarSearch portfolios={portfolios} />
          </div>
        </div>

        {/* Sidebar Footer - Clean & Minimal */}
        <SidebarFooter />
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-32px)] bg-white border border-slate-200 lg:rounded-2xl shadow-sm overflow-hidden relative">
        <MobileNav portfolios={portfolios} commandCenter={commandCenter} strategicTools={strategicTools} />
        <AdminHeader />
        <div className="flex-1 overflow-y-auto px-4 sm:px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
