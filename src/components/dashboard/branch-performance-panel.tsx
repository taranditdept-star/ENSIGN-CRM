import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  Building2, 
  Clock, 
  DollarSign, 
  Hash, 
  ChevronRight 
} from "lucide-react"
import Link from "next/link"
import { BranchPerformance } from "@/lib/sales-service"
import { formatRelativeTime } from "@/lib/utils/time"
import { BranchDetailModal } from "./branch-detail-modal"

interface BranchPerformancePanelProps {
  branches: BranchPerformance[]
}

export function BranchPerformancePanel({ branches }: BranchPerformancePanelProps) {
  const [selectedBranch, setSelectedBranch] = useState<BranchPerformance | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleBranchClick = (branch: BranchPerformance) => {
    setSelectedBranch(branch)
    setIsModalOpen(true)
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <Building2 className="w-6 h-6 text-[#FF5A20]" />
            Branch Performance
          </h2>
          <p className="text-slate-400 text-[13px] font-bold italic ml-9">Operational health and revenue snapshots.</p>
        </div>
        <Badge variant="outline" className="rounded-xl px-4 py-2 font-black text-[10px] uppercase border-slate-200 bg-white/50 backdrop-blur-md shadow-sm">
          {branches.length} TOTAL BRANCHES
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <Card 
            key={branch.branch_id} 
            className="group relative overflow-hidden rounded-[32px] border-0 bg-white shadow-xl hover:shadow-2xl hover:shadow-[#FF5A20]/10 transition-all duration-500 flex flex-col cursor-pointer"
            onClick={() => handleBranchClick(branch)}
          >
            {/* Health Indicator Stripe */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 transition-all group-hover:w-3 ${
              branch.status === 'active' ? 'bg-emerald-500' : 
              branch.status === 'warning' ? 'bg-amber-500' : 
              'bg-rose-500'
            }`} />

            <div className="p-8 space-y-6 flex-1">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <h3 className="text-lg font-black text-slate-900 group-hover:text-[#FF5A20] transition-colors">{branch.branch_name}</h3>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-slate-900/5 text-slate-500 hover:bg-slate-900/10 border-0 font-bold text-[9px] uppercase tracking-widest px-2 py-0.5 rounded-lg">
                      {branch.subsidiary_type}
                    </Badge>
                  </div>
                </div>
                <div className={`w-3 h-3 rounded-full shadow-[0_0_12px] animate-pulse ${
                  branch.status === 'active' ? 'bg-emerald-500 shadow-emerald-500/50' : 
                  branch.status === 'warning' ? 'bg-amber-500 shadow-amber-500/50' : 
                  'bg-rose-500 shadow-rose-500/50'
                }`} />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-1 border border-slate-100 group-hover:bg-white transition-colors">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <DollarSign className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Revenue</span>
                  </div>
                  <span className="text-lg font-black text-slate-900 tabular-nums">
                    ${branch.total_revenue.toLocaleString()}
                  </span>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl flex flex-col gap-1 border border-slate-100 group-hover:bg-white transition-colors">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Hash className="w-3 h-3" />
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Activity</span>
                  </div>
                  <span className="text-lg font-black text-slate-900 tabular-nums">
                    {branch.total_transactions}
                  </span>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-50 flex items-center justify-between text-[11px] font-bold text-slate-400 italic">
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Last active: {branch.last_activity ? formatRelativeTime(branch.last_activity) : 'No activity'}</span>
                </div>
              </div>
            </div>

            <div className="p-5 bg-slate-50 group-hover:bg-[#FF5A20] text-slate-400 group-hover:text-white transition-all flex items-center justify-center font-black text-[12px] uppercase tracking-widest gap-2">
              View Detailed Analytics
              <ChevronRight className="w-4 h-4 translate-x-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </Card>
        ))}
      </div>

      <BranchDetailModal 
        branch={selectedBranch}
        isOpen={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </div>
  )
}
  )
}
