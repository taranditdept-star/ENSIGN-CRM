import { createClient } from "@/utils/supabase/server"
import { cn } from "@/lib/utils"
import { AdminSearchBar } from "@/components/admin-search-bar"
import Link from "next/link"
import {
  Users,
  Building2,
  Zap,
  Plus
} from "lucide-react"

interface DashboardPortfolio {
  id: string;
  name: string;
  module_type: string;
  subsidiaries: {
    id: string;
    name: string;
    customers: { count: number }[];
  }[];
}
import { CopyLinkButton } from "@/components/copy-link-button"
import { NewBranchDialog } from "@/components/new-branch-dialog"
import { buttonVariants } from "@/lib/button-variants"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch Global Metrics
  const [
    { count: subsCount },
    { count: customersCount }
  ] = await Promise.all([
    supabase.from('subsidiaries').select('*', { count: 'exact', head: true }),
    supabase.from('customers').select('*', { count: 'exact', head: true })
  ])

  // Fetch Organizations with their branches and customer counts
  const { data: orgs } = await supabase
    .from('organizations')
    .select('*, subsidiaries(*, customers(count))')
    .order('name')

  const organizations = (orgs || []).map(o => ({ id: o.id, name: o.name }))

  // Build Portfolios for the Dashboard
  const dashboardPortfolios = (orgs as unknown as DashboardPortfolio[] || []).map(org => ({
    id: org.id,
    name: org.name,
    module: org.module_type || 'standard',
    branches: (org.subsidiaries || []).map(sub => ({
      id: sub.id,
      name: sub.name,
      captures: sub.customers?.[0]?.count || 0,
      status: sub.customers?.[0]?.count > 0 ? "Active" : "New",
      color: org.module_type === 'lpg' ? '#4F46E5' : 
             org.module_type === 'sbali' ? '#EC4899' : '#64748b'
    }))
  }))

  const totalOrgs = orgs?.length || 0

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Dashboard</h1>
          <p className="text-slate-500 font-medium">Executive overview of Ensign Holdings subsidiaries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <AdminSearchBar />
          <NewBranchDialog organizations={organizations || []} />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Portfolios", val: totalOrgs, icon: <Building2 className="w-4 h-4 text-indigo-600" />, bg: "bg-indigo-50", suffix: "Main" },
          { title: "Registered Branches", val: subsCount || 0, icon: <Building2 className="w-4 h-4 text-blue-600" />, bg: "bg-blue-50", suffix: "Live" },
          { title: "Total Customers", val: customersCount || 0, icon: <Users className="w-4 h-4 text-emerald-600" />, bg: "bg-emerald-50", suffix: "Global" },
          { title: "System Growth", val: "+14%", icon: <Zap className="w-4 h-4 text-amber-600" />, bg: "bg-amber-50", suffix: "M-o-M" },
        ].map((stat, i) => (
          <div key={i} className="rounded-3xl border border-slate-100 p-6 bg-white shadow-[0_8px_30px_rgb(0,0,0,0.02)] relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2.5 ${stat.bg} rounded-xl shadow-inner transition-transform group-hover:scale-110`}>
                {stat.icon}
              </div>
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{stat.suffix}</span>
            </div>
            <h3 className="text-3xl font-black text-slate-900 tracking-tight leading-none mb-2">{stat.val}</h3>
            <span className="text-[13px] font-bold text-slate-400">{stat.title}</span>
          </div>
        ))}
      </div>

      <div className="space-y-12">
        {dashboardPortfolios.length === 0 && (
          <div className="py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
             <Building2 className="w-12 h-12 mb-4 opacity-20" />
             <p className="font-bold whitespace-pre-wrap text-center">No modular portfolios configured yet.
             Use &quot;Main Companies&quot; to create your business units.</p>
          </div>
        )}
        
        {dashboardPortfolios.map((portfolio) => (
          <section key={portfolio.id} className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center justify-between mb-6 px-2">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg`} style={{ backgroundColor: portfolio.branches[0]?.color || '#64748b' }}>
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-slate-900 tracking-tight">{portfolio.name} Portfolio</h2>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{portfolio.branches.length} Registered Branches</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span className="text-[11px] font-black text-[#FF5A20] uppercase tracking-widest">
                       {portfolio.module === 'lpg' ? 'Flora Gas Module' : 
                        portfolio.module === 'sbali' ? 'Sbali Roller Meal Module' : 'Standard CRM'}
                    </span>
                  </div>
                </div>
              </div>
              <Link 
                href="/admin/organizations" 
                className={cn(buttonVariants({ variant: "outline" }), "rounded-xl border-slate-200 font-bold hover:bg-slate-50")}
              >
                Portfolio Settings
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {portfolio.branches.map((branch) => (
                <div key={branch.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-md transition-all group relative overflow-hidden">
                  <div className="flex justify-between items-start mb-6">
                    <div className="space-y-1">
                      <h4 className="text-lg font-black text-slate-900 leading-tight group-hover:text-[#FF5A20] transition-colors">{branch.name}</h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tight flex items-center gap-1.5">
                        <Users className="w-3 h-3" />
                        {branch.captures} Verified Captures
                      </p>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider ${
                      branch.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {branch.status}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Link 
                      href={`/admin/subsidiaries/${branch.id}`}
                      className={cn(buttonVariants(), "flex-1 rounded-xl h-10 font-bold text-xs bg-slate-900 hover:bg-slate-800 transition-all")}
                    >
                      Open Branch Data
                    </Link>
                    <div className="h-10 px-2 flex items-center justify-center gap-2">
                       <CopyLinkButton url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://ensign-crm.vercel.app'}/capture/${branch.id}`} />
                    </div>
                  </div>

                  <div className="absolute top-0 right-0 w-2 h-full" style={{ backgroundColor: branch.color }}></div>
                </div>
              ))}
              
              <Link href={`/admin/subsidiaries`} className="border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center p-6 text-slate-300 hover:border-[#FF5A20] hover:text-[#FF5A20] hover:bg-orange-50/30 transition-all">
                 <Plus className="w-8 h-8 mb-2" />
                 <span className="font-bold text-sm">Add Branch to {portfolio.name}</span>
              </Link>
            </div>
          </section>
        ))}
      </div>

    </div>
  )
}
