'use client'

import React from 'react'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { LogoutButton } from './logout-button'

export function SidebarFooter() {
  return (
    <div className="space-y-1">
      <button 
        onClick={() => toast.info("Help Center", { 
          description: "Documentation portal for Ensign Holdings." 
        })}
        className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all border border-transparent"
      >
        <HelpCircle className="w-3.5 h-3.5 text-slate-400" />
        <span>Help & Documentation</span>
      </button>
      <button 
        onClick={() => toast.success("Feedback Form", { 
          description: "Opening the Ensign CRM feedback portal..." 
        })}
        className="w-full flex items-center gap-3 px-3 py-2 text-[12px] font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all border border-transparent"
      >
        <MessageCircle className="w-3.5 h-3.5 text-slate-400" />
        <span>Send Feedback</span>
      </button>
      <div className="pt-2 mt-2 border-t border-slate-100">
        <LogoutButton />
      </div>
    </div>
  )
}
