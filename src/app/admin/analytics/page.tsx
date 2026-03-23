import { createClient } from "@/utils/supabase/server"
import { BarChart, TrendingUp, Users, Zap, Building2, PieChart } from "lucide-react"

export default async function GlobalAnalytics() {
  const supabase = await createClient()

  // Fetch summary stats
  const [
    { count: totalCustomers },
    { count: totalBranches },
    { data: newToday }
  ] = await Promise.all([
    supabase.from('customers').select('*', { count: 'exact', head: true }),
    supabase.from('subsidiaries').select('*', { count: 'exact', head: true }),
    supabase.from('customers').select('id').gte('created_at', new Date(new Date().setHours(0,0,0,0)).toISOString())
  ])

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Global Analytics</h1>
        <p className="text-slate-500 font-medium">Real-time performance metrics across all Ensign portfolios.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative group">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-indigo-50 rounded-2xl text-indigo-600">
               <Users className="w-6 h-6" />
             </div>
             <TrendingUp className="w-4 h-4 text-emerald-500" />
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-1">{totalCustomers || 0}</h3>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Total Active Customers</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative group">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-amber-50 rounded-2xl text-amber-600">
               <Zap className="w-6 h-6" />
             </div>
             <span className="text-[10px] font-black text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full uppercase">Today</span>
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-1">{newToday?.length || 0}</h3>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">New Captures Today</p>
        </div>

        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm overflow-hidden relative group">
          <div className="flex justify-between items-start mb-4">
             <div className="p-3 bg-emerald-50 rounded-2xl text-emerald-600">
               <Building2 className="w-6 h-6" />
             </div>
          </div>
          <h3 className="text-4xl font-black text-slate-900 mb-1">{totalBranches || 0}</h3>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Productive Branches</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-80 flex flex-col items-center justify-center text-slate-300">
           <BarChart className="w-12 h-12 mb-4 opacity-20" />
           <p className="font-bold">Monthly Capture Trends</p>
           <p className="text-xs font-medium">Visualization coming once more data is captured</p>
        </div>
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm h-80 flex flex-col items-center justify-center text-slate-300">
           <PieChart className="w-12 h-12 mb-4 opacity-20" />
           <p className="font-bold">Portfolio Distribution</p>
           <p className="text-xs font-medium">Market share by Business Module</p>
        </div>
      </div>
    </div>
  )
}
