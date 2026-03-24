import { createClient } from "@/utils/supabase/server"
import { Search, Filter, Download, Building2, Zap, ArrowUpRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CustomerDetailsModal } from "@/components/customer-details-modal"
import { AdminSearchBar } from "@/components/admin-search-bar"

interface SearchParams {
  q?: string;
}

interface Organization {
  name: string;
}

interface Subsidiary {
  name: string;
  organizations: Organization;
}

interface Customer {
  id: string;
  first_name: string;
  surname: string;
  phone: string | null;
  email: string | null;
  created_at: string;
  subsidiaries: Subsidiary;
}

export default async function MasterCustomerList({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient()
  const query = searchParams.q

  // 1. Fetch Customers with filtering - joined with subsidiary and organization
  let supabaseQuery = supabase
    .from('customers')
    .select('*, subsidiaries(name, organizations(name))')
    .order('created_at', { ascending: false })

  if (query) {
    supabaseQuery = supabaseQuery.or(`first_name.ilike.%${query}%,surname.ilike.%${query}%,phone.ilike.%${query}%`)
  }

  const { data: rawCustomers } = await supabaseQuery
  const customers = rawCustomers as unknown as Customer[] | null

  // 2. Cross-Selling Detection Logic:
  // Count occurrences of each phone (simple implementation for MVP)
  const phoneSubs: Record<string, Set<string>> = {}
  
  // Note: For a real high-scale DB, we'd use a GROUP BY query, 
  // but for the Ensign Holdings demo, we can process in-memory.
  const { data: rawPairs } = await supabase
    .from('customers')
    .select('phone, subsidiary_id')
    .not('phone', 'is', null)

  rawPairs?.forEach(p => {
    if (!p.phone) return
    if (!phoneSubs[p.phone]) phoneSubs[p.phone] = new Set()
    phoneSubs[p.phone].add(p.subsidiary_id)
  })

  const crossSellingPhones = new Set(
    Object.keys(phoneSubs).filter(phone => phoneSubs[phone].size > 1)
  )

  // Global Metrics for Header
  const totalGlobal = customers?.length || 0
  const crossSellingCount = crossSellingPhones.size

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header with Global Insights */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Master Customer List</h1>
          <p className="text-slate-500 font-medium">Global database of all captured customers across Ensign portfolios.</p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
                <Building2 className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Total Global</p>
                <p className="text-xl font-black text-slate-900 leading-none">{totalGlobal}</p>
             </div>
          </div>

          <div className="bg-[#FFF5F2] border border-orange-100 rounded-2xl p-4 shadow-sm flex items-center gap-4">
             <div className="w-10 h-10 bg-[#FF5A20] rounded-xl flex items-center justify-center text-white shadow-[0_4px_12px_rgba(255,90,32,0.3)]">
                <Zap className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black text-[#FF5A20] uppercase tracking-widest leading-none mb-1">Cross-Selling</p>
                <p className="text-xl font-black text-[#FF5A20] leading-none">{crossSellingCount}</p>
             </div>
          </div>

          <Button className="bg-slate-900 text-white font-bold h-14 rounded-2xl px-6 hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-white p-4 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        <div className="flex-1 w-full scale-105 origin-left">
           <AdminSearchBar />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="flex-1 sm:flex-none h-11 rounded-2xl border-slate-200 font-bold px-6 text-slate-600">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
          <Button variant="ghost" className="h-11 w-11 p-0 rounded-2xl border border-slate-100 text-slate-400">
             <Search className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_20px_50px_rgb(0,0,0,0.03)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-[#FAFBFD]/50 text-slate-400 border-b border-slate-100 font-black uppercase text-[10px] tracking-widest">
              <tr>
                <th className="px-8 py-5">Customer Name</th>
                <th className="px-8 py-5">Contact Info</th>
                <th className="px-8 py-5">Organization & Subsidiary</th>
                <th className="px-8 py-5">Global Insights</th>
                <th className="px-8 py-5 text-right pr-12">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50 text-slate-700 font-bold">
              {(customers || []).map((customer) => {
                const isCrossSelling = customer.phone && crossSellingPhones.has(customer.phone)
                
                return (
                  <tr key={customer.id} className="group hover:bg-slate-50/50 transition-all duration-300">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400 font-black text-xs uppercase group-hover:bg-white group-hover:shadow-sm transition-all">
                          {customer.first_name?.[0] || '?'}{customer.surname?.[0] || ''}
                        </div>
                        <div className="flex flex-col">
                           <span className="text-slate-900 font-black text-[15px]">{customer.first_name} {customer.surname}</span>
                           <span className="text-[11px] text-slate-400 font-bold uppercase tracking-tight tabular-nums">ID: {customer.id.split('-')[0]}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col gap-0.5">
                        <span className="text-slate-900 tracking-tight font-extrabold">{customer.phone || 'No phone'}</span>
                        <span className="text-[11px] text-slate-400 font-semibold">{customer.email || 'no-email@ensign.holdings'}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                         <span className="flex items-center gap-1.5 text-slate-900 font-bold">
                           <Building2 className="w-3.5 h-3.5 text-slate-400" />
                           {customer.subsidiaries?.name || 'Unknown'}
                         </span>
                         <span className="text-[11px] text-[#FF5A20] font-black uppercase tracking-widest ml-5">
                            {customer.subsidiaries?.organizations?.name || 'Ensign Group'}
                         </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       {isCrossSelling ? (
                         <div className="flex items-center gap-2 bg-orange-50 text-[#FF5A20] px-3 py-1.5 rounded-xl w-max border border-orange-100 shadow-sm animate-pulse-subtle">
                            <Zap className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-black uppercase tracking-widest">Cross-Selling VIP</span>
                         </div>
                       ) : (
                         <span className="text-[11px] text-slate-300 font-black uppercase tracking-widest">Standard Profile</span>
                       )}
                    </td>
                    <td className="px-8 py-6 text-right pr-12">
                      <div className="flex items-center justify-end gap-2">
                        <CustomerDetailsModal customer={customer as unknown as any} />
                        <Button variant="ghost" className="w-9 h-9 p-0 rounded-xl text-slate-300 hover:text-slate-900 hover:bg-slate-100 transition-all opacity-0 group-hover:opacity-100">
                           <ArrowUpRight className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {(!customers || customers.length === 0) && (
                <tr className="animate-in fade-in zoom-in-95 duration-700">
                  <td colSpan={5} className="py-32 text-center">
                     <div className="flex flex-col items-center justify-center gap-3">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-200">
                           <Search className="w-8 h-8" />
                        </div>
                        <p className="text-slate-400 font-bold italic">No matching customers found for &quot;{query}&quot;</p>
                        <Button variant="link" className="text-indigo-600 font-bold" onClick={() => window.location.href = '/admin/customers'}>
                           Clear all filters
                        </Button>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
