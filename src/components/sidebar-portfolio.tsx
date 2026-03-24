'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, ChevronDown } from 'lucide-react'

interface Branch {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface SidebarPortfolioProps {
  id: string;
  name: string;
  module: string;
  branches: Branch[];
}

export function SidebarPortfolio({ name, module, branches }: SidebarPortfolioProps) {
  const [isExpanded, setIsExpanded] = useState(true)

  const getModuleLabel = (mod: string) => {
    switch (mod) {
      case 'lpg': return 'LPG'
      case 'sbali': return 'Roller Meal'
      case 'mining': return 'Mining'
      case 'explosives': return 'Explosives'
      case 'fuel': return 'Renewables'
      case 'solar': return 'Solar'
      case 'branding': return 'Branding'
      case 'farming': return 'Farming'
      case 'meat': return 'Meat'
      case 'bakery': return 'Bakery'
      case 'retail': return 'Retail'
      default: return 'Standard'
    }
  }

  return (
    <div className="space-y-1.5 animate-in fade-in slide-in-from-left-2 duration-500">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-3 group hover:bg-slate-900/[0.02] rounded-2xl transition-all cursor-pointer border border-transparent hover:border-slate-100/50"
      >
        <div className="flex items-center gap-3 w-full">
           <div className={`p-1.5 rounded-lg bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform ${isExpanded ? 'text-[#FF5A20]' : 'text-slate-400'}`}>
             {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
           </div>
           <div className="flex items-center justify-between flex-1 pr-1">
             <h3 className="text-[14px] text-slate-900 font-bold tracking-tight">
               {name}
             </h3>
             <span className="text-[8px] bg-slate-900/5 text-slate-500 border border-slate-100 px-2 py-0.5 rounded-lg font-black tracking-widest uppercase">
               {getModuleLabel(module)}
             </span>
           </div>
        </div>
      </button>

      {isExpanded && (
        <nav className="space-y-1 ml-6 border-l-2 border-slate-50 pl-3 py-1">
          {branches.length === 0 && (
            <p className="px-3 py-2 text-[11px] text-slate-400 font-bold italic">No active branches</p>
          )}
          {branches.map((sub) => (
            <Link 
              key={sub.id}
              href={`/admin/subsidiaries/${sub.id}`} 
              className="group flex items-center justify-between px-3 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 rounded-xl transition-all border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-2 h-2 rounded-full shadow-inner ring-4 ring-slate-50/50"
                  style={{ backgroundColor: sub.color }}
                /> 
                <span className="truncate max-w-[130px] text-[13px] tracking-tight">{sub.name}</span>
              </div>
              <div className="text-[9px] text-slate-400 font-black px-1.5 py-0.5 rounded-lg bg-slate-50 border border-slate-100 group-hover:bg-[#FF5A20] group-hover:text-white group-hover:border-[#FF5A20] transition-all">
                {sub.count}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
