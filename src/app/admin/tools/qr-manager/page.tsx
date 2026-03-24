import { createClient } from "@/utils/supabase/server"
import { Search, QrCode } from "lucide-react"
import { QRCodeCard } from "@/components/qr-code-card"

export default async function QRManagerPage() {
  const supabase = await createClient()

  // Fetch all subsidiaries with their parent organization info and customer counts
  const { data: subsidiaries } = await supabase
    .from('subsidiaries')
    .select(`
      id,
      name,
      location,
      organizations (
        name,
        module_type
      ),
      customers (count)
    `)
    .order('name')

  const branches = (subsidiaries || []).map((sub: unknown) => {
    const s = sub as any
    return {
      id: s.id,
      name: s.name,
      location: s.location || 'Unknown Location',
      orgName: (s.organizations as unknown as { name: string })?.name || 'Ensign Group',
      module: (s.organizations as unknown as { module_type: string })?.module_type || 'standard',
      count: s.customers?.[0]?.count || 0,
      url: `https://ensign-crm.vercel.app/capture/${s.id}`
    }
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">QR Code Manager</h1>
          <p className="text-slate-500 mt-2 font-medium">Centralized hub for all branch registration portals.</p>
        </div>
        
        <div className="relative group w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#FF5A20] transition-colors" />
          <input 
            type="text" 
            placeholder="Filter branches..." 
            className="w-full bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-100 transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {branches.map((branch) => (
          <QRCodeCard key={branch.id} branch={branch} />
        ))}
      </div>

      {branches.length === 0 && (
        <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <QrCode className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <h3 className="text-lg font-bold text-slate-600">No Branches Found</h3>
           <p className="text-slate-400">Add a subsidiary to start generating QR codes.</p>
        </div>
      )}
    </div>
  )
}
