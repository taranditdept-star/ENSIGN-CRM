import { createClient } from "@/utils/supabase/server"
import { TrendingUp, Users, DollarSign, Activity, Download, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SalesData {
  branch: string;
  organization: string;
  transactions: number;
  quantity: string;
  revenue: number;
  status: 'Active' | 'Warning' | 'Inactive';
  lastActivity: string;
}

export default async function SalesPerformancePage() {
  const supabase = await createClient()

  // In a real scenario, we'd fetch this from a view or aggregate query.
  // For the demo/MVP, we'll simulate the data based on current captures.
  const { data: customers } = await supabase
    .from('customers')
    .select('*, subsidiaries(name, organization_id, organizations(name))')

  // Simple aggregation logic for the dashboard
  const today = new Date().toISOString().split('T')[0]
  const todaySales = customers?.filter(c => c.created_at.startsWith(today)) || []
  
  const totalRevenue = todaySales.reduce((acc, curr) => {
    const meta = (curr.customer_metadata as any) || {}
    return acc + (Number(meta.totalPriceUSD) || Number(meta.orderValue) || 0)
  }, 0)

  const mockSalesData: SalesData[] = [
    {
      branch: "Sbali/Chitsano - Gwanda",
      organization: "Sbali Roller Meal",
      transactions: todaySales.length,
      quantity: "150 KG",
      revenue: totalRevenue,
      status: "Active",
      lastActivity: "2 mins ago"
    },
    {
      branch: "Flora Gas - Harare",
      organization: "Ensign LPG",
      transactions: 5,
      quantity: "45 KG",
      revenue: 85,
      status: "Active",
      lastActivity: "15 mins ago"
    },
    {
       branch: "Flora Solar - Bulawayo",
       organization: "Flora Solar",
       transactions: 0,
       quantity: "0 units",
       revenue: 0,
       status: "Warning",
       lastActivity: "28 hours ago"
    }
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Sales Intelligence</h1>
          <p className="text-slate-500 font-medium">Real-time performance monitoring across all Ensign portfolios.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-12 rounded-xl border-slate-200 font-bold px-6 text-slate-600 bg-white">
            <Filter className="w-4 h-4 mr-2" />
            Today
          </Button>
          <Button className="bg-slate-900 text-white font-bold h-12 rounded-xl px-6 hover:bg-slate-800 transition-all shadow-lg">
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* KPI Overviews */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm group hover:border-[#FF5A20]/30 transition-all">
           <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-[#FF5A20] mb-4 group-hover:scale-110 transition-transform">
              <DollarSign className="w-6 h-6" />
           </div>
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Revenue (Today)</p>
           <h3 className="text-3xl font-black text-slate-900">${totalRevenue.toLocaleString()}</h3>
           <p className="text-[10px] text-emerald-500 font-bold mt-2 flex items-center gap-1">
             <TrendingUp className="w-3 h-3" /> +12% vs yesterday
           </p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm group hover:border-indigo-100 transition-all">
           <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform">
              <Activity className="w-6 h-6" />
           </div>
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Transactions</p>
           <h3 className="text-3xl font-black text-slate-900">{todaySales.length + 5}</h3>
           <p className="text-[10px] text-slate-400 font-bold mt-2 italic">Steady momentum</p>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-6 shadow-sm group hover:border-emerald-100 transition-all">
           <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6" />
           </div>
           <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Active Branches</p>
           <h3 className="text-3xl font-black text-slate-900">8/12</h3>
           <p className="text-[10px] text-orange-400 font-bold mt-2">4 branches pending activity</p>
        </div>

        <div className="bg-[#1A1C21] rounded-[2rem] p-6 shadow-xl shadow-slate-200">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center text-white mb-4">
              <TrendingUp className="w-6 h-6" />
           </div>
           <p className="text-[11px] font-black text-white/40 uppercase tracking-widest mb-1">Avg Sale Value</p>
           <h3 className="text-3xl font-black text-white">${totalRevenue > 0 ? (totalRevenue / (todaySales.length || 1)).toFixed(2) : '0.00'}</h3>
           <p className="text-[10px] text-white/60 font-medium mt-2">Across all modules</p>
        </div>
      </div>

      {/* Daily Sales Table */}
      <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-[0_20px_60px_rgba(0,0,0,0.03)] overflow-hidden">
        <div className="px-10 py-8 border-b border-slate-50 flex items-center justify-between">
           <div>
             <h2 className="text-xl font-black text-slate-900">Daily Sales Register</h2>
             <p className="text-sm text-slate-400 font-medium tracking-tight">Consolidated transactions for {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
           </div>
           <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Search branch..." 
                className="w-full bg-slate-50 border-none rounded-xl pl-10 h-10 text-sm font-bold focus:ring-[#FF5A20] transition-all"
              />
           </div>
        </div>

        <div className="overflow-x-auto">
           <table className="w-full text-left whitespace-nowrap">
             <thead className="bg-[#FAFBFD]/50 text-slate-400 text-[10px] font-black uppercase tracking-[0.2em] border-b border-slate-50">
               <tr>
                 <th className="px-10 py-5">Branch Name</th>
                 <th className="px-8 py-5">Organization</th>
                 <th className="px-8 py-5 text-center">Trans.</th>
                 <th className="px-8 py-5 text-center">Quantity</th>
                 <th className="px-8 py-5 text-right">Revenue</th>
                 <th className="px-10 py-5 text-center">Health</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-slate-50">
               {mockSalesData.map((sale) => (
                 <tr key={sale.branch} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-10 py-6">
                       <span className="text-slate-900 font-black tracking-tight">{sale.branch}</span>
                    </td>
                    <td className="px-8 py-6">
                       <span className="text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg">{sale.organization}</span>
                    </td>
                    <td className="px-8 py-6 text-center font-black text-slate-700">{sale.transactions}</td>
                    <td className="px-8 py-6 text-center font-extrabold text-slate-400">{sale.quantity}</td>
                    <td className="px-8 py-6 text-right">
                       <span className="text-slate-900 font-black">${sale.revenue.toLocaleString()}</span>
                    </td>
                    <td className="px-10 py-6 text-center">
                       <div className="flex flex-col items-center gap-1">
                          <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${
                            sale.status === 'Active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                            sale.status === 'Warning' ? 'bg-amber-50 text-amber-600 border-amber-100' :
                            'bg-rose-50 text-rose-600 border-rose-100'
                          }`}>
                            <div className={`w-1.5 h-1.5 rounded-full ${
                               sale.status === 'Active' ? 'bg-emerald-500' :
                               sale.status === 'Warning' ? 'bg-amber-500' :
                               'bg-rose-500'
                            }`} />
                            {sale.status}
                          </div>
                          <span className="text-[10px] text-slate-400 font-medium">{sale.lastActivity}</span>
                       </div>
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
