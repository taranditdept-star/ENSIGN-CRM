'use client'

import React from 'react'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { LogoutButton } from './logout-button'

export function SidebarFooter() {
  return (
    <div className="shrink-0 bg-transparent p-4 space-y-4">
      <div className="flex flex-col gap-2">
        <button 
          onClick={() => toast.info("Help Center", { 
            description: "Documentation is being prepared for Ensign Holdings." 
          })}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 rounded-2xl transition-all text-[12px] font-bold"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
            <HelpCircle className="w-4 h-4" />
          </div>
          <span>Help Center</span>
        </button>
        <button 
          onClick={() => toast.success("Feedback Requested", { 
            description: "Opening the Ensign CRM feedback portal..." 
          })}
          className="flex items-center gap-3 px-4 py-3 text-slate-500 hover:text-slate-900 border border-transparent hover:border-slate-100 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 rounded-2xl transition-all text-[12px] font-bold"
        >
          <div className="w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:text-slate-600 transition-colors">
            <MessageCircle className="w-4 h-4" />
          </div>
          <span>Send Feedback</span>
        </button>
      </div>
      <div className="pt-4 border-t border-slate-100/50">
        <LogoutButton />
      </div>
    </div>
  )
}
