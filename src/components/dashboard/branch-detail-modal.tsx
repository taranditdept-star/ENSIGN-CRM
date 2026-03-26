'use client'

import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { 
  BarChart3, 
  Activity, 
  DollarSign, 
  TrendingUp, 
  Calendar,
  Zap
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { BranchPerformance } from "@/lib/sales-service"
import { format } from "date-fns"

interface BranchDetailModalProps {
  branch: BranchPerformance | null
  isOpen: boolean
  onOpenChange: (open: boolean) => void
}

export function BranchDetailModal({ branch, isOpen, onOpenChange }: BranchDetailModalProps) {
  if (!branch) return null

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl bg-white/90 backdrop-blur-3xl border-0 shadow-2xl rounded-[40px] p-0 overflow-hidden">
        <div className="h-32 bg-slate-900 relative">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_#FF5A20_0%,_transparent_70%)]" />
          <div className="absolute -bottom-10 left-8">
             <div className="w-20 h-20 rounded-3xl bg-white shadow-2xl flex items-center justify-center border-4 border-slate-50">
               <Zap className="w-10 h-10 text-[#FF5A20]" />
             </div>
          </div>
        </div>

        <div className="pt-14 pb-8 px-8 space-y-8">
          <div className="flex justify-between items-start">
            <div className="space-y-1">
              <DialogTitle className="text-3xl font-black text-slate-900">{branch.branch_name}</DialogTitle>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest text-[#FF5A20] border-[#FF5A20]/20 bg-[#FF5A20]/5 px-2 py-1">
                  {branch.subsidiary_type}
                </Badge>
                <div className="flex items-center gap-1.5 ml-2">
                  <div className={`w-2 h-2 rounded-full ${
                    branch.status === 'active' ? 'bg-emerald-500' : 
                    branch.status === 'warning' ? 'bg-amber-500' : 'bg-slate-300'
                  } animate-pulse`} />
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">{branch.status}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Activity</p>
              <p className="text-sm font-bold text-slate-700">
                {branch.last_activity ? format(new Date(branch.last_activity), 'MMM d, h:mm a') : 'No recent activity'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/50 space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <DollarSign className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Revenue (Today)</span>
              </div>
              <p className="text-2xl font-black text-slate-900">${branch.total_revenue.toLocaleString()}</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/50 space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <Activity className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Transactions</span>
              </div>
              <p className="text-2xl font-black text-slate-900">{branch.total_transactions}</p>
            </div>

            <div className="bg-slate-50 rounded-3xl p-6 border border-slate-100/50 space-y-2">
              <div className="flex items-center gap-2 text-slate-400">
                <TrendingUp className="w-4 h-4" />
                <span className="text-[10px] font-black uppercase tracking-widest">Quantity Sold</span>
              </div>
              <div className="flex items-baseline gap-1">
                <p className="text-2xl font-black text-slate-900">{branch.total_quantity.toLocaleString()}</p>
                <span className="text-xs font-bold text-slate-400">kg/l</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
             <div className="flex items-center justify-between">
                <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-[#FF5A20]" />
                  Performance Pulse
                </h4>
                <span className="text-[11px] font-bold text-slate-400 italic">Last 7 days trend</span>
             </div>
             
             {/* Placeholder for real chart - for now using a stylized visual */}
             <div className="h-40 w-full bg-slate-900/5 rounded-[32px] border-2 border-dashed border-slate-100 flex items-center justify-center text-slate-300">
                <div className="flex flex-col items-center gap-2">
                  <TrendingUp className="w-8 h-8 opacity-20" />
                  <p className="text-xs font-bold italic opacity-60">Analytics module initializing...</p>
                </div>
             </div>
          </div>

          <DialogDescription className="text-[11px] font-bold text-slate-400 italic text-center pt-4">
            * This data is aggregated in real-time from the branch data capture portal.
          </DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  )
}
