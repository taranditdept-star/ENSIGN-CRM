'use client'

import React, { useState } from 'react'
import { Menu, X, ChevronRight } from 'lucide-react'
import { SidebarSearch } from './sidebar-search'
import { SidebarQuickActions } from './sidebar-quick-actions'
import { ThemeToggle } from './theme-toggle'
import { LogoutButton } from './logout-button'
import Link from 'next/link'

interface MobileNavProps {
  portfolios: any[];
  commandCenter: React.ReactNode;
  strategicTools: React.ReactNode;
}

export function MobileNav({ portfolios, commandCenter, strategicTools }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="lg:hidden">
      {/* Mobile Top Bar */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-slate-200 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold tracking-tighter">
            EN
          </div>
          <h2 className="text-sm font-bold text-slate-900">Ensign CRM</h2>
        </div>
        <button 
          onClick={() => setIsOpen(true)}
          className="p-2 text-slate-500 hover:bg-slate-50 rounded-lg transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Overlay Sidebar */}
      {isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 animate-in fade-in duration-300"
            onClick={() => setIsOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-white z-50 shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
            <div className="p-4 flex items-center justify-between border-b border-slate-100">
               <span className="text-xs font-black uppercase tracking-widest text-slate-400">Navigation Menu</span>
               <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                 <X className="w-6 h-6" />
               </button>
            </div>

            <div className="flex-1 overflow-y-auto py-6">
               <div className="space-y-8">
                 {commandCenter}
                 {strategicTools}
                 <div className="px-3">
                    <h3 className="text-[11px] uppercase text-slate-900 font-extrabold px-3 mb-4 tracking-[0.15em]">Branch Navigation</h3>
                    <SidebarSearch portfolios={portfolios} />
                 </div>
               </div>
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
               <SidebarQuickActions />
               <div className="mt-4 flex items-center justify-between px-2">
                 <ThemeToggle />
                 <LogoutButton />
               </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}
