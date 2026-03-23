import { createClient } from "@/utils/supabase/server"
import { Button } from "@/components/ui/button"
import { AdminSearchBar } from "@/components/admin-search-bar"
import Link from "next/link"
import {
  Users,
  ArrowUpDown,
  Star,
  MoreHorizontal,
  Building2,
  Calendar,
  Zap
} from "lucide-react"
import { CopyLinkButton } from "@/components/copy-link-button"
import { NewBranchDialog } from "@/components/new-branch-dialog"

export default async function AdminDashboard({ 
  searchParams 
}: { 
  searchParams: Promise<{ q?: string }> 
}) {
  const { q } = await searchParams
  const supabase = await createClient()

  // Fetch Global Metrics
  const [
    { count: subsCount },
    { count: customersCount }
  ] = await Promise.all([
    supabase.from('subsidiaries').select('*', { count: 'exact', head: true }),
    supabase.from('customers').select('*', { count: 'exact', head: true })
  ])

  // Build Subsidiaries Query
  let subsQuery = supabase
    .from('subsidiaries')
    .select('*, customers(id, created_at)')
    .order('name', { ascending: true })

  if (q) {
    subsQuery = subsQuery.ilike('name', `%${q}%`)
  }

  const { data: subsidiaries } = await subsQuery

  // Final Data Mapping
  const branchData = (subsidiaries || []).map((sub, index) => {
    const locations = ["Harare", "Bulawayo", "Mutare", "Gweru", "Kwekwe", "Masvingo"]
    const location = locations[index % locations.length]
    
    const totalCaptures = sub.customers ? sub.customers.length : 0
    const lastCapture = sub.customers && sub.customers.length > 0 
      ? new Date(sub.customers[0].created_at).toLocaleDateString()
      : 'No activity'

    return {
      id: sub.id,
      name: sub.name,
      location,
      totalCaptures,
      lastCapture,
      status: totalCaptures > 0 ? "Active" : "New"
    }
  })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full">
      
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Dashboard</h1>
          <p className="text-slate-500 font-medium">Executive overview of Ensign Holdings subsidiaries.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <AdminSearchBar />
          <NewBranchDialog />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: "Active Branches", val: subsCount || 0, icon: <Building2 className="w-4 h-4 text-indigo-600" />, bg: "bg-indigo-50", suffix: "Live" },
          { title: "Total Customers", val: customersCount || 0, icon: <Users className="w-4 h-4 text-emerald-600" />, bg: "bg-emerald-50", suffix: "Global" },
          { title: "System Growth", val: "+14%", icon: <Zap className="w-4 h-4 text-amber-600" />, bg: "bg-amber-50", suffix: "M-o-M" },
          { title: "Avg. Captures", val: Math.round((customersCount || 0) / (subsCount || 1)), icon: <Star className="w-4 h-4 text-[#FF5A20]" />, bg: "bg-orange-50", suffix: "per branch" }
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
            <div className="absolute top-0 right-0 w-24 h-24 bg-slate-50 opacity-10 rounded-full translate-x-12 -translate-y-12"></div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between">
          <h2 className="text-lg font-bold text-slate-900">Registered Subsidiaries</h2>
          <Button variant="ghost" size="sm" className="text-slate-400 text-xs font-bold uppercase tracking-wider hover:text-[#FF5A20] transition-colors">
            View All <ArrowUpDown className="w-3 h-3 ml-2" />
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="bg-[#FAFBFD]/50 text-slate-400 border-b border-slate-50 font-black uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-4 w-12 text-center">ID</th>
                <th className="px-8 py-4">Subsidiary Name</th>
                <th className="px-8 py-4">Location</th>
                <th className="px-8 py-4">Customer Captures</th>
                <th className="px-8 py-4">Last Activity</th>
                <th className="px-8 py-4">Status</th>
                <th className="px-8 py-4">Capture Link</th>
                <th className="px-8 py-4 text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-bold">
              {branchData.length === 0 && (
                <tr>
                  <td colSpan={8} className="text-center py-20 text-slate-400 font-medium italic">
                    {q ? `No branches matching "${q}" found.` : "No subsidiaries found in the database."}
                  </td>
                </tr>
              )}
              {branchData.map((row) => (
                <tr key={row.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5 text-center text-[10px] font-black tabular-nums text-slate-300">
                    {row.id.toString().slice(0, 4)}
                  </td>
                  <td className="px-8 py-5">
                    <Link href={`/admin/subsidiaries/${row.id}`}>
                      <span className="text-slate-900 font-extrabold text-[15px] hover:text-[#FF5A20] transition-colors">{row.name}</span>
                    </Link>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-semibold">{row.location}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <Users className="w-3.5 h-3.5 text-slate-300" />
                       <span className="text-slate-900">{row.totalCaptures} customers</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-semibold tabular-nums">
                    <div className="flex items-center gap-2">
                       <Calendar className="w-3.5 h-3.5 text-slate-300" />
                       {row.lastCapture}
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                      row.status === 'Active' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <CopyLinkButton url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://ensign-crm.vercel.app'}/capture/${row.id}`} />
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right pr-12">
                    <button className="text-slate-300 hover:text-[#FF5A20] transition-colors">
                      <MoreHorizontal className="w-5 h-5 ml-auto" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
