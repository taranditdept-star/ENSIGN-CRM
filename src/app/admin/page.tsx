import { createClient } from "@/utils/supabase/server"
import { AdminSearchBar } from "@/components/admin-search-bar"
import { NewBranchDialog } from "@/components/new-branch-dialog"
import {
  Building2,
  DollarSign,
  Zap,
  BarChart3,
  Activity
} from "lucide-react"
import { KpiCard } from "@/components/dashboard/kpi-card"
import { SalesRegisterTable } from "@/components/dashboard/sales-register-table"
import { BranchPerformancePanel } from "@/components/dashboard/branch-performance-panel"
import { ActivityHeatmap } from "@/components/dashboard/activity-heatmap"
import { getDailySalesStats, getBranchPerformance, getActivityHeatmapData } from "@/lib/sales-service"

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch Live Sales Stats, Branch Performance & Heatmap
  const [stats, branchPerformance, heatmapData, { data: orgs }] = await Promise.all([
    getDailySalesStats(),
    getBranchPerformance(),
    getActivityHeatmapData(),
    supabase.from('organizations').select('id, name').order('name')
  ])

  const organizations = orgs || []

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700 h-full pb-20">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#FF5A20] rounded-xl flex items-center justify-center text-white shadow-xl">
              <BarChart3 className="w-6 h-6" />
            </div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">Sales Intelligence</h1>
          </div>
          <p className="text-slate-500 font-bold italic ml-13">Executive control center for Ensign Holdings.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <AdminSearchBar />
          <NewBranchDialog organizations={organizations} />
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <KpiCard 
          title="Revenue (Today)" 
          value={stats.total_revenue.toLocaleString()} 
          prefix="$"
          change={stats.revenue_change}
          icon={<DollarSign className="w-7 h-7" />}
          className="shadow-[#FF5A20]/5"
        />
        <KpiCard 
          title="Daily Transactions" 
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
          title="Avg Transaction" 
          value={stats.avg_value.toFixed(2)} 
          prefix="$"
          icon={<Zap className="w-7 h-7" />}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Col: Heatmap & Table */}
        <div className="lg:col-span-12 space-y-12">
          {/* Heatmap Section */}
          <div className="animate-in fade-in slide-in-from-bottom-5 duration-700">
             <ActivityHeatmap data={heatmapData} />
          </div>

          {/* Daily Sales Register */}
          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <SalesRegisterTable data={branchPerformance} />
          </div>

          {/* Branch Health & Detailed Performance */}
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <BranchPerformancePanel branches={branchPerformance} />
          </div>
        </div>
      </div>

      {/* Empty State / Porter Footer */}
      {branchPerformance.length === 0 && (
        <div className="py-20 bg-slate-50 rounded-[40px] border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
           <Building2 className="w-12 h-12 mb-4 opacity-20" />
           <p className="font-black text-lg">No sales recorded today</p>
           <p className="font-bold text-sm italic opacity-60">Open a capture portal to begin data collection.</p>
        </div>
      )}
    </div>
  )
}
