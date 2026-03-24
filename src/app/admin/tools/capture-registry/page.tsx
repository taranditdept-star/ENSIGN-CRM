import { createClient } from "@/utils/supabase/server"
import { Building2, Copy, ExternalLink, Globe, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { CaptureLinkRow } from "@/components/dashboard/capture-link-row"

export default async function CaptureRegistryPage() {
  const supabase = await createClient()

  // Fetch all branches across organizations
  const { data: subsidiaries } = await supabase
    .from('subsidiaries')
    .select('*, organizations(name)')
    .order('name')

  const branches = subsidiaries || []

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700 pb-20">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-3">
             <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center text-white">
                <Globe className="w-4 h-4" />
             </div>
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Strategic Tools</span>
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Capture Link Registry</h1>
          <p className="text-slate-500 font-semibold mt-2 text-lg">Centralized portal management for all branch data capturers.</p>
        </div>
      </div>

      {/* Registry Table */}
      <div className="bg-white/80 backdrop-blur-xl border border-white rounded-[32px] shadow-sm overflow-hidden">
        <div className="p-8 border-bottom border-slate-100 flex items-center justify-between">
            <div className="flex items-center gap-4 bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 w-full max-w-md">
              <Search className="w-4 h-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search branches or organizations..." 
                className="bg-transparent border-none focus:outline-none text-sm font-semibold w-full placeholder:text-slate-400"
              />
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-3 py-1.5 rounded-lg border border-slate-100">
                {branches.length} Active Portals
              </span>
            </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-y border-slate-100 bg-slate-50/30">
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Branch & Org</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">Type</th>
                <th className="px-8 py-4 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Capture Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {branches.map((branch) => (
                <CaptureLinkRow 
                  key={branch.id} 
                  branch={branch} 
                />
              ))}
              {branches.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-8 py-20 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                        <Building2 className="w-6 h-6" />
                      </div>
                      <p className="font-bold text-slate-400 italic text-sm">No branches found in the registry.</p>
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
