import { createClient } from "@/utils/supabase/server"
import { QRCodeCanvas } from "qrcode.react"
import { Download, Search, Building2, MapPin, QrCode } from "lucide-react"
import { Button } from "@/components/ui/button"

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

  const branches = (subsidiaries || []).map(sub => ({
    id: sub.id,
    name: sub.name,
    location: sub.location || 'Unknown Location',
    orgName: (sub.organizations as unknown as { name: string })?.name || 'Ensign Group',
    module: (sub.organizations as unknown as { module_type: string })?.module_type || 'standard',
    count: sub.customers?.[0]?.count || 0,
    url: `https://ensign-crm.vercel.app/capture/${sub.id}`
  }))

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

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <div key={branch.id} className="bg-white rounded-3xl border border-slate-100 p-6 shadow-sm hover:shadow-xl transition-all group relative overflow-hidden">
            {/* Industry Badge */}
            <div className="absolute top-0 right-0 p-4">
               <span className="text-[10px] font-black uppercase tracking-widest bg-slate-100 text-slate-500 px-3 py-1 rounded-full">
                 {branch.module}
               </span>
            </div>

            <div className="flex gap-6">
              {/* QR Code Section */}
              <div className="shrink-0 bg-slate-50 p-4 rounded-2xl border border-slate-100 group-hover:bg-white group-hover:border-orange-100 transition-colors">
                <QRCodeCanvas 
                  value={branch.url}
                  size={120}
                  level="H"
                  includeMargin={false}
                  imageSettings={{
                    src: "/favicon.ico",
                    x: undefined,
                    y: undefined,
                    height: 24,
                    width: 24,
                    excavate: true,
                  }}
                />
              </div>

              {/* Branch Details */}
              <div className="flex-1 flex flex-col justify-between py-1">
                <div>
                  <h3 className="text-lg font-black text-slate-900 leading-tight mb-1 group-hover:text-[#FF5A20] transition-colors line-clamp-2">
                    {branch.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-slate-500 text-xs font-bold mb-3">
                    <Building2 className="w-3.5 h-3.5" />
                    {branch.orgName}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                    <MapPin className="w-3 h-3" />
                    {branch.location}
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Registrations</span>
                    <span className="text-sm font-black text-slate-900">{branch.count}</span>
                  </div>
                  <Button variant="outline" size="sm" className="rounded-xl border-slate-200 font-bold hover:bg-slate-900 hover:text-white group-hover:border-slate-900 transition-all">
                    <Download className="w-3.5 h-3.5 mr-2" />
                    SVG
                  </Button>
                </div>
              </div>
            </div>
          </div>
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
