import { TrendingUp, Users, DollarSign, Activity, Download, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { getDailySalesStats, getBranchPerformance, getMonthlySalesStats, getOrgPerformance } from "@/lib/sales-service"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { SalesRegisterTable } from "@/components/dashboard/sales-register-table"
import { BranchPerformancePanel } from "@/components/dashboard/branch-performance-panel"

export default async function SalesPerformancePage() {
  const [stats, branchPerformance, monthlyStats, orgPerformance] = await Promise.all([
    getDailySalesStats(),
    getBranchPerformance(),
    getMonthlySalesStats(),
    getOrgPerformance()
  ])

  return (
    <div className="space-y-12 animate-in fade-in duration-700 pb-20">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tighter">Sales Intelligence</h1>
          <p className="text-slate-500 font-bold mt-2 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Live organizational performance tracking
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="outline" className="h-14 rounded-2xl border-slate-200 font-black px-8 text-slate-600 bg-white shadow-sm hover:shadow-md transition-all">
            <Download className="w-4 h-4 mr-2" />
            Download Monthly Report
          </Button>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <KpiCard 
          title="Revenue (Today)" 
          value={stats.total_revenue.toLocaleString()} 
          prefix="$"
          change={stats.revenue_change}
          icon={<DollarSign className="w-7 h-7" />}
          className="shadow-xl shadow-orange-500/5 border border-orange-100/50"
        />
        <KpiCard 
          title="Total Transactions" 
          value={stats.total_transactions} 
          change={stats.transaction_change}
          icon={<Activity className="w-7 h-7" />}
        />
        <KpiCard 
          title="Active Branches" 
          value={stats.active_branches} 
          icon={<Building2 className="w-7 h-7" />}
          suffix={` / ${branchPerformance.length}`}
        />
        <KpiCard 
          title="Avg Sale Value" 
          value={stats.avg_value.toFixed(2)} 
          prefix="$"
          icon={<TrendingUp className="w-7 h-7" />}
        />
      </div>

      {/* Organizational Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
           <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-3">
             <Users className="w-6 h-6 text-[#FF5A20]" />
             Portfolio Performance
           </h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {orgPerformance.map((org) => (
               <div key={org.name} className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-sm hover:shadow-xl transition-all group">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-black text-slate-800">{org.name}</h3>
                    <div className="px-3 py-1 bg-slate-50 border border-slate-100 rounded-lg text-[10px] font-black uppercase tracking-widest text-slate-400">
                      {org.branches} Branches
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Revenue</span>
                      <span className="text-xl font-black text-slate-900">${org.revenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Transactions</span>
                      <span className="text-xl font-black text-slate-900">{org.transactions}</span>
                    </div>
                  </div>
                  <div className="mt-8 pt-6 border-t border-slate-50 flex items-center justify-between">
                    <span className="text-[10px] font-black text-[#FF5A20] uppercase tracking-widest">Growth Plan</span>
                    <TrendingUp className="w-4 h-4 text-[#FF5A20]" />
                  </div>
               </div>
             ))}
           </div>
        </div>

        {/* Monthly Trend Recap */}
        <div className="space-y-8">
           <h2 className="text-2xl font-black text-slate-900 tracking-tight">Monthly Trends</h2>
           <div className="bg-slate-900 rounded-[32px] p-8 text-white shadow-2xl space-y-8">
              {monthlyStats.map((month) => (
                <div key={month.month} className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-black uppercase tracking-widest text-white/40">{new Date(month.month).toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-white/5 rounded-2xl">
                       <p className="text-[10px] font-black text-white/30 uppercase mb-1">Revenue</p>
                       <p className="text-lg font-black">${month.revenue.toLocaleString()}</p>
                    </div>
                    <div className="p-4 bg-white/5 rounded-2xl">
                       <p className="text-[10px] font-black text-white/30 uppercase mb-1">Volume</p>
                       <p className="text-lg font-black">{month.transactions}</p>
                    </div>
                  </div>
                </div>
              ))}
           </div>
        </div>
      </div>

      {/* Detailed Register Table */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Daily Sales Register (Live)</h2>
        <SalesRegisterTable data={branchPerformance} />
      </div>

      {/* Branch Health Grid */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-slate-900 tracking-tight">Real-time Branch Health</h2>
        <BranchPerformancePanel branches={branchPerformance} />
      </div>
    </div>
  )
}
