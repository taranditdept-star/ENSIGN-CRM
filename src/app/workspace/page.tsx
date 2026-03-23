import { createClient } from "@/utils/supabase/server"
import { Building2, ChevronRight, LayoutDashboard } from "lucide-react"
import Link from "next/link"
import { LogoutButton } from "@/components/logout-button"

export default async function GenericWorkspace() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  
  // Fetch profile to check role
  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('role')
    .eq('id', user?.id)
    .single()

  if (profileError) {
    console.error('Error fetching profile:', profileError)
  }

  // Fetch only subsidiaries that the user is allowed to see (RLS will filter this)
  const { data: subsidiaries } = await supabase
    .from('subsidiaries')
    .select('id, name')
    .order('name', { ascending: true })

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-8">
      <div className="w-full max-w-xl space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
        
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center mx-auto mb-6">
            <Building2 className="w-8 h-8 text-[#FF5A20]" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Select Workspace</h1>
          <p className="text-slate-500 font-medium">Please select a subsidiary branch to enter your workspace.</p>
        </div>

        <div className="grid gap-3">
          {subsidiaries && subsidiaries.length > 0 ? (
            subsidiaries.map((sub) => (
              <Link 
                key={sub.id} 
                href={`/workspace/${sub.id}`}
                className="group flex items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] hover:border-indigo-500 hover:shadow-md transition-all active:scale-[0.99]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400 group-hover:bg-indigo-50 group-hover:text-indigo-600 transition-colors">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-[17px]">{sub.name}</h3>
                    <p className="text-slate-400 text-xs font-semibold tabular-nums uppercase tracking-widest">Branch ID: {sub.id.slice(0, 8)}</p>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-slate-300 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </Link>
            ))
          ) : (
            <div className="p-12 bg-white rounded-3xl border border-dashed border-slate-200 text-center space-y-4">
              <div className="space-y-1">
                <p className="text-slate-900 font-bold text-lg">No workspaces found.</p>
                <p className="text-slate-500 text-sm">You haven&apos;t been assigned to any subsidiary branch yet.</p>
              </div>

              {profile?.role === 'super_admin' ? (
                <div className="pt-2">
                  <Link 
                    href="/admin" 
                    className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-sm"
                  >
                    <LayoutDashboard className="w-4 h-4" />
                    Go to Admin Dashboard
                  </Link>
                </div>
              ) : (
                <p className="text-xs font-bold text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg inline-block">
                  Please contact a system administrator for access.
                </p>
              )}
            </div>
          )}
        </div>

        <div className="text-center">
            <LogoutButton />
        </div>

      </div>
    </div>
  )
}
