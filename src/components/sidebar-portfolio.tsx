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

export function SidebarPortfolio({ id, name, module, branches }: SidebarPortfolioProps) {
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
    <div className="space-y-1">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 group hover:bg-slate-50 rounded-lg transition-colors cursor-pointer"
      >
        <div className="flex flex-col items-start gap-0.5">
          <h3 className="text-[10px] uppercase text-slate-400 font-black tracking-widest flex items-center gap-1.5 transition-colors group-hover:text-slate-600">
            {isExpanded ? <ChevronDown className="w-3 h-3 text-slate-300" /> : <ChevronRight className="w-3 h-3 text-slate-300" />}
            {name}
          </h3>
          <span className="text-[9px] bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter ml-4.5">
            {getModuleLabel(module)}
          </span>
        </div>
      </button>

      {isExpanded && (
        <nav className="space-y-0.5 ml-4 border-l-2 border-slate-50 pl-2 py-1">
          {branches.length === 0 && (
            <p className="px-3 py-1 text-[11px] text-slate-400 italic">No active branches</p>
          )}
          {branches.map((sub) => (
            <Link 
              key={sub.id}
              href={`/admin/subsidiaries/${sub.id}`} 
              className="group flex items-center justify-between px-3 py-1.5 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_rgba(0,0,0,0.1)]"
                  style={{ backgroundColor: sub.color }}
                ></span> 
                <span className="truncate max-w-[140px] group-hover:text-slate-900 transition-colors">{sub.name}</span>
              </div>
              <div className="text-slate-300 text-[10px] font-bold px-1 py-0.5 rounded transition-colors group-hover:text-slate-500">
                {sub.count}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
