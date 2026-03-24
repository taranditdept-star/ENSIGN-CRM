import { createClient } from "@/utils/supabase/server"
import { notFound } from "next/navigation"
import { Building2, Users, MapPin, ChevronLeft, Edit3, Trash2 } from "lucide-react"
import Link from "next/link"
import { QRCodeTrigger } from "@/components/qr-trigger"
import { CustomerDetailsModal } from "@/components/customer-details-modal"

// Define interfaces for better type safety
interface CustomerMetadata {
  quantityKg?: number;
  refillQuantityKg?: number;
  quantity?: number;
  totalPriceUSD?: number;
  orderValue?: number;
  paymentStatus?: string;
  customerType?: string;
  visitPurpose?: string;
  location?: string;
  siteAddress?: string;
  siteLocation?: string;
}

interface Customer {
  id: string;
  first_name: string;
  surname: string;
  phone: string;
  created_at: string;
  customer_metadata: CustomerMetadata | null;
}

interface Subsidiary {
  id: string;
  name: string;
  location: string | null;
  customers: Customer[];
}

export default async function SubsidiaryDetailPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ q?: string }>
}) {
  const { id } = await params
  const { q } = await searchParams
  const supabase = await createClient()

  // Build the customers query with optional filtering
  let customersQuery = supabase
    .from('customers')
    .select('*')
    .eq('subsidiary_id', id)

  if (q) {
    customersQuery = customersQuery.or(`first_name.ilike.%${q}%,surname.ilike.%${q}%,phone.ilike.%${q}%`)
  }

  // Fetch subsidiary and customers
  const [{ data: subsidiaryData }, { data: customersData }] = await Promise.all([
    supabase.from('subsidiaries').select('*').eq('id', id).single(),
    customersQuery.order('created_at', { ascending: false })
  ])

  if (!subsidiaryData) {
    notFound()
  }

  const subsidiary = subsidiaryData as Subsidiary
  const customers = customersData as Customer[] || []

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <Link 
          href="/admin/organizations" 
          className="flex items-center gap-2 text-slate-400 hover:text-slate-600 text-sm font-bold transition-colors w-max"
        >
          <ChevronLeft className="w-4 h-4" /> Back to Organizations
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
          <div className="flex items-center gap-3">
            <QRCodeTrigger subsidiaryId={subsidiary.id} subsidiaryName={subsidiary.name} />
            <Link 
              href={`/capture/${subsidiary.id}`}
              target="_blank"
              className="h-12 px-6 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl shadow-lg shadow-slate-200 transition-all flex items-center gap-2"
            >
              Launch Capture Portal
            </Link>
          </div>
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
                ? new Date(Math.max(...customers.map((c) => new Date(c.created_at).getTime()))).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
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
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
                <th className="px-8 py-4">Customer Name</th>
                <th className="px-8 py-4">Phone</th>
                <th className="px-6 py-4">Location</th>
                <th className="px-6 py-4 text-center">Type</th>
                <th className="px-6 py-4 text-center">Qty (KG)</th>
                <th className="px-6 py-4 text-center">Price (USD)</th>
                <th className="px-6 py-4 text-center">Status</th>
                <th className="px-8 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {customers.map((customer) => {
                const meta = customer.customer_metadata || {}
                const qty = meta.quantityKg || meta.refillQuantityKg || meta.quantity || '-'
                const price = meta.totalPriceUSD || meta.orderValue || '-'
                const status = meta.paymentStatus || 'Success' // Fallback
                const customerType = meta.customerType || meta.visitPurpose || 'Retail'

                return (
                  <tr key={customer.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="px-8 py-5">
                      <div className="flex flex-col">
                        <span className="text-slate-900 font-extrabold">{customer.first_name} {customer.surname}</span>
                        <span className="text-[10px] text-slate-400 font-bold uppercase">{customer.id.split('-')[0]}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5 text-slate-600 font-extrabold text-sm">{customer.phone}</td>
                    <td className="px-6 py-5">
                       <span className="text-slate-500 font-semibold">{meta.location || meta.siteAddress || meta.siteLocation || '-'}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <span className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-black rounded-lg uppercase">{customerType}</span>
                    </td>
                    <td className="px-6 py-5 text-center text-slate-900 font-black">{qty}</td>
                    <td className="px-6 py-5 text-center">
                       <span className="text-emerald-600 font-black shadow-emerald-100">${price}</span>
                    </td>
                    <td className="px-6 py-5 text-center">
                       <span className={`px-2 py-1 rounded-md text-[9px] font-black uppercase ${
                         status?.toString().toLowerCase() === 'paid' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' :
                         status?.toString().toLowerCase() === 'pending' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
                         'bg-indigo-50 text-indigo-600 border border-indigo-200'
                       }`}>
                         {status}
                       </span>
                    </td>
                    <td className="px-8 py-5">
                      <div className="flex items-center justify-end gap-2 transition-opacity">
                        <CustomerDetailsModal customer={customer as any} />
                        <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-slate-400 hover:text-amber-600 transition-all">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="p-2 hover:bg-white hover:shadow-md rounded-lg text-slate-400 hover:text-rose-600 transition-all">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
              {customers.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-8 py-12 text-center text-slate-400 font-medium italic">
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
