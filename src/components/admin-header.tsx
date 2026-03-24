'use client'

import React from 'react'
import Link from 'next/link'
import { Plus, Download } from 'lucide-react'
import { Button } from './ui/button'
import { toast } from 'sonner'
import { Breadcrumbs } from './breadcrumbs'

import { AdminSearchBar } from './admin-search-bar'

export function AdminHeader() {
  const handleExport = () => {
    toast.success("Preparing global report...", {
      description: "Data for all subsidiaries is being compiled for export."
    })
  }

  return (
    <>
    <header className="h-16 border-b border-slate-100 flex items-center justify-between px-8 bg-white/80 backdrop-blur-md sticky top-0 z-30">
        <div className="flex-1 max-w-xl group relative">
          <AdminSearchBar />
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

      </div>
    </header>
    <div className="px-8 py-2 bg-slate-50/50 border-b border-slate-100 flex items-center">
       <Breadcrumbs />
    </div>
    </>
  )
}
