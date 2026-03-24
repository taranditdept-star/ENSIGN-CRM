'use client'

import Link from "next/link"
import { Plus, QrCode, Download } from "lucide-react"
import { toast } from "sonner"

export function SidebarQuickActions() {
  const handleExport = () => {
    toast.success("Preparing global report...", {
      description: "Data for all subsidiaries is being compiled for export."
    })
    // In a real app, this would trigger a download or heavy server action
  }

  return (
    <div className="p-4">
      <div className="bg-slate-900 rounded-2xl p-4 shadow-xl shadow-slate-200">
        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Quick Actions</h4>
        <div className="grid grid-cols-1 gap-2">
          <Link href="/admin/organizations" className="flex items-center justify-between text-[11px] font-bold text-white hover:text-white/80 transition-colors">
            <span>Add New Org</span>
            <Plus className="w-3 h-3" />
          </Link>
          <div className="h-px bg-white/10 my-1"></div>
          <Link href="/admin/tools/qr-manager" className="flex items-center justify-between text-[11px] font-bold text-white hover:text-white/80 transition-colors">
            <span>Manage Branches</span>
            <QrCode className="w-3 h-3" />
          </Link>
          <div className="h-px bg-white/10 my-1"></div>
          <button 
            onClick={handleExport}
            className="flex items-center justify-between text-[11px] font-bold text-white hover:text-white/80 transition-colors w-full"
          >
            <span>Export Report</span>
            <Download className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  )
}
