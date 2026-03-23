import { createClient } from "@/utils/supabase/server"
import { Building2, ExternalLink } from "lucide-react"
import Link from "next/link"
import { NewBranchDialog } from "@/components/new-branch-dialog"
import { CopyLinkButton } from "@/components/copy-link-button"

export default async function SubsidiariesPage() {
  const supabase = await createClient()
  
  const { data: subsidiaries } = await supabase
    .from('subsidiaries')
    .select('*, customers(count)')
    .order('name', { ascending: true })

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Branches & Subsidiaries</h1>
          <p className="text-slate-500 font-medium pt-1">Manage and monitor all active business units.</p>
        </div>
        <NewBranchDialog />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subsidiaries?.map((sub) => (
          <div key={sub.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative group">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center border border-slate-100">
                <Building2 className="w-6 h-6 text-[#FF5A20]" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900 leading-tight">{sub.name}</h3>
                  <span className="text-[9px] font-black bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-tighter">
                    {sub.schema_type || 'fallback'}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{sub.location || 'Central'}</p>
              </div>
            </div>

            <div className="flex items-center justify-between py-4 border-y border-slate-50 mb-6">
              <div className="text-center flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Customers</p>
                <p className="text-xl font-black text-slate-900">{sub.customers?.[0]?.count || 0}</p>
              </div>
              <div className="w-px h-8 bg-slate-100"></div>
              <div className="text-center flex-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Status</p>
                <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">ACTIVE</span>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Link 
                href={`/admin/subsidiaries/${sub.id}`}
                className="flex-1 h-10 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                Manage Branch
              </Link>
              <Link 
                href={`/capture/${sub.id}`}
                target="_blank"
                className="w-10 h-10 border border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center transition-colors"
                title="Open Capture Portal"
              >
                <ExternalLink className="w-4 h-4" />
              </Link>
              <CopyLinkButton url={`${process.env.NEXT_PUBLIC_APP_URL || 'https://ensign-crm.vercel.app'}/capture/${sub.id}`} />
            </div>
          </div>
        ))}

        {(!subsidiaries || subsidiaries.length === 0) && (
          <div className="col-span-full py-20 bg-slate-50 border border-dashed border-slate-200 rounded-3xl flex flex-col items-center justify-center text-center">
            <Building2 className="w-12 h-12 text-slate-200 mb-4" />
            <h3 className="text-lg font-bold text-slate-900 mb-2">No branches found</h3>
            <p className="text-slate-500 mb-6 max-w-xs">Register your first subsidiary branch to start capturing customer data.</p>
            <NewBranchDialog />
          </div>
        )}
      </div>
    </div>
  )
}
