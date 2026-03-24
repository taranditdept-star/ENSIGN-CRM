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
      <h3 className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-2 tracking-[0.15em]">Command</h3>
      <nav className="space-y-0.5">
        {[
          { href: "/admin", label: "Executive Overview", icon: LayoutDashboard, color: "text-[#FF5A20]" },
          { href: "/admin/organizations", label: "Group Organizations", icon: Building2, color: "text-slate-500" },
          { href: "/admin/customers", label: "Master Customer List", icon: Users, color: "text-slate-500" },
          { href: "/admin/audit", label: "Audit Trails", icon: History, color: "text-slate-500" },
          { href: "/admin/sales", label: "Sales Performance", icon: TrendingUp, color: "text-[#FF5A20]" },
        ].map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex items-center gap-3 px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all group relative border border-transparent"
          >
            <item.icon className={`w-4 h-4 ${item.color} group-hover:scale-110 transition-transform`} />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )

  const strategicTools = (
    <div className="px-4">
      <h3 className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-2 tracking-[0.15em]">Strategic</h3>
      <nav className="space-y-0.5">
        {[
          { href: "/admin/tools/qr-manager", label: "QR Code Manager", icon: QrCode },
          { href: "/admin/tools/capture-registry", label: "Capture Link Registry", icon: Globe },
        ].map((item) => (
          <Link 
            key={item.href}
            href={item.href} 
            className="flex items-center gap-3 px-3 py-2 text-[13px] font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all group border border-transparent"
          >
            <item.icon className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#F8FAFC] p-4 flex gap-4" style={{ '--brand-accent': '#FF5A20' } as React.CSSProperties}>
      <BrandTheme />
      
      {/* Sidebar - Sleek Professional Look */}
      <aside className="w-[260px] bg-white border border-slate-200 flex flex-col hidden lg:flex shrink-0 rounded-2xl shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] h-[calc(100vh-32px)] overflow-hidden">
        
        {/* Header */}
        <div className="p-6 pb-2">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center text-white font-black text-sm shadow-lg shadow-slate-900/10">
                EN
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900 leading-none tracking-tight">Ensign</h2>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">CRM</p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>

        {/* Navigation Stream */}
        <div className="flex-1 overflow-y-auto min-h-0 py-6 space-y-8 scrollbar-hide">
          {commandCenter}
          {strategicTools}
          
          {/* Branch Navigation */}
          <div className="pt-2">
            <div className="px-6 mb-3">
               <h3 className="text-[10px] uppercase text-slate-400 font-bold tracking-[0.15em]">Resources</h3>
            </div>
            <SidebarSearch portfolios={portfolios} />
          </div>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 bg-slate-50/50 border-t border-slate-100">
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
