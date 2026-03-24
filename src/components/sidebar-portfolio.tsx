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
    <div className="space-y-1">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between px-2 py-3 group hover:bg-slate-50/80 rounded-xl transition-all cursor-pointer border border-transparent hover:border-slate-100"
      >
        <div className="flex flex-col items-start gap-1.5 w-full">
          <div className="flex items-center justify-between w-full pr-2">
            <h3 className="text-[13px] text-slate-900 font-extrabold flex items-center gap-2 transition-colors group-hover:text-indigo-600">
              {isExpanded ? <ChevronDown className="w-4 h-4 text-indigo-500" /> : <ChevronRight className="w-4 h-4 text-slate-300" />}
              {name}
            </h3>
            <span className="text-[9px] bg-slate-900/5 text-slate-500 border border-slate-200 px-2 py-0.5 rounded-md font-black tracking-widest uppercase">
              {getModuleLabel(module)}
            </span>
          </div>
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
              className="group flex items-center justify-between px-3 py-2.5 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-white hover:shadow-sm rounded-xl transition-all border border-transparent hover:border-slate-100"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="w-2.5 h-2.5 rounded-full shadow-inner border border-white/20"
                  style={{ backgroundColor: sub.color }}
                ></span> 
                <span className="truncate max-w-[140px] text-[13px]">{sub.name}</span>
              </div>
              <div className="text-[10px] text-slate-400 font-black px-1.5 py-0.5 rounded-md bg-slate-50 border border-slate-100 group-hover:bg-indigo-50 group-hover:text-indigo-600 group-hover:border-indigo-100 transition-all">
                {sub.count}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
