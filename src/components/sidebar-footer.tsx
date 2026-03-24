'use client'

import React from 'react'
import { HelpCircle, MessageCircle } from 'lucide-react'
import { toast } from 'sonner'
import { LogoutButton } from './logout-button'

export function SidebarFooter() {
  return (
    <div className="shrink-0 border-t border-slate-100 bg-white p-4 space-y-0.5 mt-auto">
      <div className="grid grid-cols-2 gap-2 mb-2">
        <button 
          onClick={() => toast.info("Help Center: Documentation is being prepared.", { 
            description: "Detailed tutorials and FAQs will be available here soon." 
          })}
          className="flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-[11px] font-black uppercase tracking-wider"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Help</span>
        </button>
        <button 
          onClick={() => toast.success("Feedback: Opening submission form...", { 
            description: "Thank you for helping us improve the Ensign CRM!" 
          })}
          className="flex items-center gap-2 px-3 py-1.5 text-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-lg transition-all text-[11px] font-black uppercase tracking-wider"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>Feedback</span>
        </button>
      </div>
      <div className="pt-2 border-t border-slate-50">
        <LogoutButton />
      </div>
    </div>
  )
}
