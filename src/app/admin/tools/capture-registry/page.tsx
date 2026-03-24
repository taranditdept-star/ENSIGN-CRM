import { createClient } from "@/utils/supabase/server"
import { ExternalLink, Copy, Search, Globe, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default async function CaptureRegistryPage() {
  const supabase = await createClient()

  // Fetch all subsidiaries with their parent organization info and customer counts
  const { data: subsidiaries } = await supabase
    .from('subsidiaries')
    .select(`
      id,
      name,
      schema_type,
      organizations (
        name,
        module_type
      ),
      customers (count)
    `)
    .order('name')

  const registry = (subsidiaries || []).map(sub => ({
    id: sub.id,
    name: sub.name,
    orgName: (sub.organizations as any)?.name || 'Ensign Group',
    module: sub.schema_type || 'standard',
    count: sub.customers?.[0]?.count || 0,
    url: `https://ensign-crm.vercel.app/capture/${sub.id}`
  }))

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Capture Link Registry</h1>
          <p className="text-slate-500 mt-2 font-medium">Master list of all live data collection portals.</p>
        </div>
        
        <div className="relative group w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
          <input 
            type="text" 
            placeholder="Search registry..." 
            className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all shadow-sm"
          />
        </div>
      </div>

      <div className="bg-white rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100">
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Branch & Industry</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">Live Portal URL</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Data Vol</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {registry.map((item) => (
                <tr key={item.id} className="group hover:bg-slate-50/80 transition-colors">
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-white group-hover:text-indigo-600 transition-all font-black shadow-sm">
                        {item.name.charAt(0)}
                      </div>
                      <div>
                        <div className="text-sm font-black text-slate-900">{item.name}</div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-[#FF5A20] mt-0.5">{item.module}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2 max-w-md">
                      <div className="flex-1 bg-slate-100/50 border border-slate-100 rounded-lg px-3 py-1.5 font-mono text-[11px] text-slate-500 truncate group-hover:bg-white transition-colors">
                        {item.url}
                      </div>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-300 hover:text-indigo-600 hover:bg-white transition-colors">
                         <Copy className="w-3.5 h-3.5" />
                      </Button>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-center">
                     <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-slate-50 text-slate-900 text-xs font-black border border-slate-100 group-hover:bg-white transition-colors">
                       {item.count}
                     </span>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                       <Link href={item.url} target="_blank">
                         <Button variant="ghost" size="sm" className="h-9 gap-2 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 font-bold rounded-lg px-4">
                           <Globe className="w-4 h-4" />
                           Open
                         </Button>
                       </Link>
                       <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-200 hover:text-slate-400 transition-colors">
                          <ChevronRight className="w-4 h-4" />
                       </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {registry.length === 0 && (
        <div className="py-20 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
           <ExternalLink className="w-12 h-12 text-slate-300 mx-auto mb-4" />
           <h3 className="text-lg font-bold text-slate-600">No Registry Data</h3>
           <p className="text-slate-400">Initialize a branch to see capture links here.</p>
        </div>
      )}
    </div>
  )
}
