import { createClient } from "@/utils/supabase/server"
import { TrendingUp, Users, DollarSign, ArrowLeft, Download, Calendar, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { KpiCard } from "@/components/dashboard/kpi-card"

export default async function BranchReportPage({
  params
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // 1. Fetch Branch info
  const { data: branch } = await supabase
    .from('subsidiaries')
    .select('*, organizations(name)')
    .eq('id', id)
    .single()

  if (!branch) return <div>Branch not found</div>

  // 2. Fetch Latest Transactions for this branch
  const { data: transactions } = await supabase
    .from('customers')
    .select('*')
    .eq('subsidiary_id', id)
    .order('created_at', { ascending: false })
    .limit(50)

  // 3. Simple Aggregations for Branch KPIs
  const totalRevenue = (transactions || []).reduce((acc, curr) => acc + (curr.customer_metadata?.totalPriceUSD || 0), 0)
  // const totalQty = (transactions || []).reduce((acc, curr) => acc + (curr.customer_metadata?.requestedQuantity || 0), 0)
  const avgValue = transactions?.length ? totalRevenue / transactions.length : 0

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header with Navigation */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <Link 
            href={`/admin/subsidiaries/${id}`}
            className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs mb-4 transition-colors group"
          >
            <ArrowLeft className="w-3 h-3 group-hover:-translate-x-1 transition-transform" />
            Back to Overview
          </Link>
          <div className="flex items-center gap-3">
             <div 
               className="w-12 h-12 rounded-[20px] flex items-center justify-center text-white text-xl font-black shadow-lg"
               style={{ backgroundColor: branch.brand_color || '#000' }}
             >
                {branch.name.substring(0, 1)}
             </div>
             <div>
               <h1 className="text-4xl font-black text-slate-900 tracking-tight">{branch.name}</h1>
               <p className="text-slate-500 font-bold mt-1 text-lg flex items-center gap-2">
                 {branch.organizations?.name} 
                 <span className="w-1.5 h-1.5 rounded-full bg-slate-200" />
                 Intelligence Report
               </p>
             </div>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="h-12 border-slate-200 font-bold px-6 rounded-2xl bg-white shadow-sm hover:bg-slate-50">
             <Calendar className="w-4 h-4 mr-2 text-slate-400" />
             Last 30 Days
           </Button>
           <Button className="h-12 bg-slate-900 text-white font-black px-6 rounded-2xl shadow-xl shadow-slate-900/10 hover:bg-slate-800">
             <Download className="w-4 h-4 mr-2" />
             Export Data
           </Button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <KpiCard 
          title="Branch Revenue" 
          value={totalRevenue.toLocaleString()}
          prefix="$"
          icon={<DollarSign className="w-7 h-7" />}
          change={12}
        />
        <KpiCard 
          title="Capture Volume" 
          value={transactions?.length?.toString() || '0'}
          icon={<TrendingUp className="w-7 h-7" />}
          change={0}
        />
        <KpiCard 
          title="Avg Transaction" 
          value={avgValue.toFixed(0)}
          prefix="$"
          icon={<Users className="w-7 h-7" />}
          change={-5}
        />
      </div>

      {/* Transaction Deep-Dive */}
      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[40px] shadow-sm overflow-hidden">
        <div className="p-8 border-b border-slate-50">
           <h2 className="text-2xl font-black text-slate-900 tracking-tight italic">Operational Logs</h2>
           <p className="text-slate-400 font-bold text-sm mt-1">Detailed history of the latest 50 customer interactions.</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Customer Details</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Status</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Quantity</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {(transactions || []).map((t) => (
                <tr key={t.id} className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <p className="font-extrabold text-slate-900 text-sm">{t.first_name} {t.last_name}</p>
                    <p className="text-[11px] font-bold text-slate-400 mt-0.5">{t.phone}</p>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[10px] font-black px-3 py-1 bg-emerald-50 text-emerald-600 rounded-lg uppercase tracking-wider">
                      {t.customer_type || 'Active'}
                    </span>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-2">
                       <Zap className="w-3.5 h-3.5 text-slate-400" />
                       <span className="font-bold text-slate-600 text-sm tracking-tight">{t.customer_metadata?.requestedQuantity || 0} units</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right font-black text-slate-900 tracking-tight">
                    ${(t.customer_metadata?.totalPriceUSD || 0).toLocaleString()}
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
