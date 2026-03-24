import { createClient } from "@/utils/supabase/server"
import { Building2, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { NewOrganizationDialog } from "@/components/new-organization-dialog"

export default async function OrganizationsPage() {
  const supabase = await createClient()
  
  const { data: organizations } = await supabase
    .from('organizations')
    .select('*, subsidiaries(id)')
    .order('name')

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Group Organizations</h1>
          <p className="text-slate-500 font-medium">Manage top-level organizations in the Ensign network.</p>
        </div>
        <NewOrganizationDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {(organizations || []).map((org) => (
          <div key={org.id} className="bg-white rounded-3xl border border-slate-100 p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:shadow-md transition-all group">
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-[#FF5A20] shadow-inner group-hover:scale-110 transition-transform">
                <Globe className="w-8 h-8" />
              </div>
              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest">Active</span>
            </div>
            
            <h3 className="text-xl font-black text-slate-900 mb-2">{org.name}</h3>
            
            <div className="flex items-center justify-between mt-6 pt-6 border-t border-slate-50">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Branches</span>
                <span className="text-lg font-bold text-slate-900">{org.subsidiaries?.length || 0}</span>
              </div>
              <div className="flex flex-col text-right">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Module</span>
                <span className="text-xs font-bold text-[#FF5A20] uppercase tracking-tighter bg-orange-50 px-2 py-0.5 rounded-md mt-1">
                  {org.module_type === 'lpg' ? 'Flora Gas' : 
                   org.module_type === 'sbali' ? 'Sbali Roller Meal' : 
                   org.module_type === 'mining' ? 'Mining' : 
                   org.module_type === 'fuel' ? 'Fuel' : 'Standard'}
                </span>
              </div>
            </div>

            <Button variant="ghost" className="w-full mt-8 rounded-xl font-bold text-slate-400 hover:text-[#FF5A20] hover:bg-orange-50 transition-colors">
              Manage Company Details
            </Button>
          </div>
        ))}

        {organizations?.length === 0 && (
          <div className="col-span-full py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 flex flex-col items-center justify-center text-slate-400">
            <Building2 className="w-12 h-12 mb-4 opacity-20" />
            <p className="font-bold">No companies registered yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}
