'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Settings, Download, Search, Command } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'sonner'

export function AdminHeader() {
  const handleExport = () => {
    toast.success("Preparing global report...", {
      description: "Data for all subsidiaries is being compiled for export."
    })
  }

  return (
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
      <div className="flex items-center gap-4 flex-1 max-w-xl">
        <div className="relative group w-full hidden md:block">
           <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 w-4 h-4 group-focus-within:text-indigo-600 transition-colors" />
           <input 
             type="text" 
             placeholder="Search anything..." 
             className="w-full bg-slate-50 border-none rounded-xl pl-10 pr-4 py-2 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
           />
           <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-1 text-[10px] font-bold text-slate-300 pointer-events-none uppercase">
             <Command className="w-3 h-3" /> F
           </div>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Horizontal Quick Actions */}
        <div className="hidden sm:flex items-center gap-2 bg-slate-50 p-1.5 rounded-2xl border border-slate-100">
          <Link href="/admin/organizations">
            <Button variant="ghost" size="sm" className="h-9 gap-2 text-slate-600 hover:text-slate-900 font-bold hover:bg-white rounded-xl transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Add Org</span>
            </Button>
          </Link>
          <div className="w-px h-4 bg-slate-200" />
          <Link href="/admin/subsidiaries">
            <Button variant="ghost" size="sm" className="h-9 gap-2 text-slate-600 hover:text-slate-900 font-bold hover:bg-white rounded-xl transition-all">
              <Plus className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Branch</span>
            </Button>
          </Link>
          <div className="w-px h-4 bg-slate-200" />
          <Button 
            onClick={handleExport}
            variant="ghost" 
            size="sm" 
            className="h-9 gap-2 text-slate-600 hover:text-slate-900 font-bold hover:bg-white rounded-xl transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden lg:inline">Export</span>
          </Button>
        </div>

        <div className="h-8 w-px bg-slate-100 mx-2" />
        
        <Button variant="ghost" size="icon" className="h-10 w-10 text-slate-400 hover:text-slate-900 rounded-xl">
           <Settings className="w-5 h-5" />
        </Button>
      </div>
    </header>
  )
}
