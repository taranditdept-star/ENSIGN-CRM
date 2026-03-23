import { createClient } from "@/utils/supabase/server"
import { History, User, Clock, ShieldCheck, AlertCircle } from "lucide-react"

export default async function AuditTrails() {
  const supabase = await createClient()

  // In a real system, we'd fetch from an 'audit_logs' table.
  // For now, we'll show recent customer captures as the primary "audit" events.
  const { data: logs } = await supabase
    .from('customers')
    .select('*, subsidiaries(name)')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Audit Trails</h1>
        <p className="text-slate-500 font-medium">Compliance and activity logging across all Ensign portfolios.</p>
      </div>

      <div className="bg-white rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)] overflow-hidden">
        <div className="p-6 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-500" />
            <h2 className="font-bold text-slate-900">System Activity Log</h2>
          </div>
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Last 20 Events</span>
        </div>

        <div className="divide-y divide-slate-50">
          {(logs || []).map((log) => (
            <div key={log.id} className="p-6 flex items-start justify-between hover:bg-slate-50/30 transition-colors group">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-black text-slate-900 text-sm">New Customer Capture</span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase">Success</span>
                  </div>
                  <p className="text-slate-500 text-sm font-medium">
                    Customer <span className="text-slate-900 font-bold">{log.first_name} {log.last_name}</span> was registered at 
                    <span className="text-slate-900 font-bold"> {log.subsidiaries?.name}</span>
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-[11px] font-bold text-slate-400 uppercase tracking-tight">
                    <span className="flex items-center gap-1"><User className="w-3 h-3" /> System Agent</span>
                    <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                    <span>{new Date(log.created_at).toLocaleString()}</span>
                  </div>
                </div>
              </div>
              <button className="opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-black text-[#FF5A20] uppercase tracking-widest">
                View Payload
              </button>
            </div>
          ))}

          {(!logs || logs.length === 0) && (
            <div className="py-20 flex flex-col items-center justify-center text-slate-300">
               <AlertCircle className="w-10 h-10 mb-2 opacity-20" />
               <p className="font-bold">No activity logs recorded yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
