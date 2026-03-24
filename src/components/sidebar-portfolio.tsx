'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

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
    <div className="space-y-0.5">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-3 py-2 group hover:bg-slate-50 rounded-lg transition-all cursor-pointer border border-transparent"
      >
        <div className="flex items-center gap-2 w-full overflow-hidden">
           <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
             <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900" />
           </div>
           <h3 className="text-[13px] text-slate-600 font-semibold truncate tracking-tight group-hover:text-slate-900">
             {name}
           </h3>
        </div>
        {!isExpanded && (
          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap ml-2">
            {getModuleLabel(module)}
          </span>
        )}
      </button>

      {isExpanded && (
        <nav className="space-y-0.5 ml-[19px] border-l border-slate-100 pl-3 py-1">
          {branches.length === 0 && (
            <p className="px-3 py-2 text-[11px] text-slate-400 italic">Empty</p>
          )}
          {branches.map((sub) => (
            <Link 
              key={sub.id}
              href={`/admin/subsidiaries/${sub.id}`} 
              className="group flex items-center justify-between px-2 py-1.5 text-[12.5px] font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-all border border-transparent"
            >
              <div className="flex items-center gap-2.5">
                <div 
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ backgroundColor: sub.color }}
                /> 
                <span className="truncate max-w-[130px]">{sub.name}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold px-1.5 py-0.5 rounded-full bg-slate-50 group-hover:bg-[#FF5A20]/10 group-hover:text-[#FF5A20] transition-colors">
                {sub.count}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
