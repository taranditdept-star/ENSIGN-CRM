import { createClient } from "@/utils/supabase/server"
import { Users, Search, Filter, Download, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default async function MasterCustomerList() {
  const supabase = await createClient()

  // Fetch all customers with their branch name
  const { data: customers } = await supabase
    .from('customers')
    .select('*, subsidiaries(name)')
    .order('created_at', { ascending: false })

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Master Customer List</h1>
          <p className="text-slate-500 font-medium">Global database of all captured customers across Ensign portfolios.</p>
        </div>
        <Button className="bg-slate-900 text-white font-bold rounded-xl px-6">
          <Download className="w-4 h-4 mr-2" />
          Export All Data
        </Button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input 
            placeholder="Search by name, phone, or email..." 
            className="pl-10 h-11 rounded-xl border-slate-200"
          />
        </div>
        <Button variant="outline" className="h-11 rounded-xl border-slate-200 font-bold px-6">
          <Filter className="w-4 h-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAFBFD]/50 text-slate-400 border-b border-slate-50 font-black uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-4">Customer Name</th>
                <th className="px-8 py-4">Contact Info</th>
                <th className="px-8 py-4">Subsidiary / Branch</th>
                <th className="px-8 py-4">Captured On</th>
                <th className="px-8 py-4 text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-bold">
              {(customers || []).map((customer) => (
                <tr key={customer.id} className="group hover:bg-slate-50/50 transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs uppercase">
                        {customer.first_name?.[0] || '?'}{customer.last_name?.[0] || ''}
                      </div>
                      <span className="text-slate-900 font-extrabold text-[15px]">{customer.first_name} {customer.last_name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-slate-900">{customer.phone || 'No phone'}</span>
                      <span className="text-[11px] text-slate-400">{customer.email || 'No email'}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="flex items-center gap-2">
                      <Building2 className="w-3.5 h-3.5 text-slate-300" />
                      {customer.subsidiaries?.name || 'Unknown'}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-semibold tabular-nums">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-8 py-5 text-right pr-12">
                    <Button variant="ghost" size="sm" className="font-bold text-slate-400 hover:text-[#FF5A20]">
                      View Details
                    </Button>
                  </td>
                </tr>
              ))}
              {(!customers || customers.length === 0) && (
                <tr>
                  <td colSpan={5} className="py-20 text-center text-slate-400 italic">No customers found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
