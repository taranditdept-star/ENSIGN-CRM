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
    <div className="px-4">
      <h3 className="text-[10px] uppercase text-slate-400 font-black mb-4 px-2 tracking-[0.25em]">Command Center</h3>
      <nav className="space-y-1.5">
        {[
          { href: "/admin", label: "Executive Overview", icon: LayoutDashboard, color: "text-[#FF5A20]", bg: "bg-orange-50/50" },
          { href: "/admin/organizations", label: "Group Organizations", icon: Building2, color: "text-slate-600", bg: "bg-slate-100/50" },
          { href: "/admin/customers", label: "Master Customer List", icon: Users, color: "text-slate-600", bg: "bg-slate-100/50" },
          { href: "/admin/audit", label: "Audit Trails", icon: History, color: "text-slate-500", bg: "bg-slate-100/50" },
          { href: "/admin/sales", label: "Sales Performance", icon: TrendingUp, color: "text-[#FF5A20]", bg: "bg-orange-100/50" },
        ].map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-2xl transition-all border border-transparent hover:border-slate-100 group"
          >
            <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-all shrink-0`}>
              <item.icon className="w-4 h-4" />
            </div>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )

  const strategicTools = (
    <div className="px-4">
      <h3 className="text-[10px] uppercase text-slate-400 font-black mb-4 px-2 tracking-[0.25em]">Strategic Tools</h3>
      <nav className="space-y-1.5">
        {[
          { href: "/admin/tools/qr-manager", label: "QR Code Manager", icon: QrCode, color: "text-orange-600", bg: "bg-orange-100/50" },
          { href: "/admin/tools/capture-registry", label: "Capture Link Registry", icon: Globe, color: "text-emerald-600", bg: "bg-emerald-100/50" },
        ].map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex items-center gap-3 px-3 py-2.5 text-[13px] font-bold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-2xl transition-all border border-transparent hover:border-slate-100 group"
          >
            <div className={`w-8 h-8 rounded-xl ${item.bg} flex items-center justify-center ${item.color} shadow-sm group-hover:scale-110 transition-all shrink-0`}>
              <item.icon className="w-4 h-4" />
            </div>
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F0F2F5] p-2 sm:p-4 flex gap-4" style={{ '--brand-accent': '#FF5A20' } as React.CSSProperties}>
      <BrandTheme />
      
      {/* Sidebar - Redesigned for Premium Look */}
      <aside className="w-[280px] bg-white/70 backdrop-blur-2xl border border-white/50 flex flex-col hidden lg:flex shrink-0 rounded-[40px] shadow-2xl h-[calc(100vh-32px)] overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-slate-200/20 pointer-events-none" />
        
        {/* Header */}
        <div className="p-8 pb-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-900 rounded-[20px] flex items-center justify-center text-white font-black text-xl shadow-2xl shadow-slate-900/20 transform -rotate-12">
              EN
            </div>
            <div>
              <h2 className="text-lg font-black text-slate-900 leading-none tracking-tight">Ensign</h2>
              <p className="text-[10px] text-[#FF5A20] font-black uppercase tracking-widest mt-1">Intelligence CRM</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between px-1">
            <span className="text-[10px] font-black text-slate-400">THEME</span>
            <ThemeToggle />
          </div>
        </div>

        {/* Main Navigation */}
        <div className="flex-1 overflow-y-auto min-h-0 py-6 space-y-10 scrollbar-hide relative z-10">
          {commandCenter}
          {strategicTools}
          
          {/* Branch Navigation */}
          <div className="pt-2 border-t border-slate-100/50">
            <div className="px-6 mb-4">
               <h3 className="text-[10px] uppercase text-slate-400 font-black tracking-[0.25em]">Branch Navigation</h3>
            </div>
            <SidebarSearch portfolios={portfolios} />
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="relative z-10 p-4">
          <SidebarFooter />
        </div>
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
