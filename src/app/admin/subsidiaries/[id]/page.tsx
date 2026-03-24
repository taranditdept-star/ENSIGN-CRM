import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { Building2, Users, MapPin, ChevronLeft } from "lucide-react"
import Link from "next/link"

export default async function SubsidiaryDetailPage({ 
  params 
}: { 
  params: Promise<{ id: string }> 
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch subsidiary and its relative data
  const { data: subsidiary } = await supabase
    .from('subsidiaries')
    .select('*, customers(*)')
    .eq('id', id)
    .single()

  if (!subsidiary) {
    notFound()
  }

  const customers = subsidiary.customers || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/subsidiaries" 
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors w-max"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Branches
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-slate-900 flex items-center justify-center text-white shadow-xl shadow-slate-200">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-4xl font-black text-slate-900 tracking-tight">{subsidiary.name}</h1>
              <div className="flex items-center gap-4 mt-1">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                  <MapPin className="w-4 h-4 text-slate-400" /> {subsidiary.location || 'Unknown Location'}
                </div>
                <div className="w-1 h-1 bg-slate-300 rounded-full"></div>
                <div className="flex items-center gap-1.5 text-slate-500 font-medium text-sm">
                  <Users className="w-4 h-4 text-slate-400" /> {customers.length} Total Customers
                </div>
              </div>
            </div>
          </div>
          <Link 
            href={`/capture/${subsidiary.id}`}
            target="_blank"
            className="h-12 px-6 bg-[#FF5A20] hover:bg-[#E04F1C] text-white font-black rounded-xl shadow-lg shadow-orange-100 transition-all flex items-center gap-2"
          >
            Launch Capture Portal
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Activity</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">Active</span>
            <span className="text-emerald-500 text-xs font-bold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 uppercase tracking-wider">Online</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Total Captures</p>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-black text-slate-900">{customers.length}</span>
            <span className="text-slate-400 text-xs font-bold uppercase tracking-wider">Entries</span>
          </div>
        </div>
        <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Latest Scan</p>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-black text-slate-900">
              {customers.length > 0 
                ? new Date(Math.max(...customers.map((c: any) => new Date(c.created_at).getTime()))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                : 'No entries yet'}
            </span>
          </div>
        </div>
      </div>

      {/* Customer List */}
      <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-lg font-bold text-slate-900">Recent Customer Captures</h3>
          <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Showing Latest {customers.length}</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Customer Name</th>
                <th className="px-8 py-4">Contact</th>
                <th className="px-8 py-4">Registered On</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer: any) => (
                <tr key={customer.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-8 py-5">
                    <span className="text-slate-900 font-extrabold">{customer.full_name || `${customer.first_name} ${customer.surname}`}</span>
                  </td>
                  <td className="px-8 py-5 text-slate-500 font-semibold">{customer.phone}</td>
                  <td className="px-8 py-5 text-slate-400 font-medium">
                    {new Date(customer.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-8 py-12 text-center text-slate-400 font-medium italic">
                    No customers registered for this branch yet.
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
