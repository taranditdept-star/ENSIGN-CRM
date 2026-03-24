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
        <div className="flex flex-col items-start gap-1">
          <h3 className="text-[12px] uppercase text-slate-900 font-black tracking-widest flex items-center gap-2 transition-colors group-hover:text-[#FF5A20]">
            {isExpanded ? <ChevronDown className="w-4 h-4 text-[#FF5A20]" /> : <ChevronRight className="w-4 h-4 text-slate-400" />}
            {name}
          </h3>
          <span className="text-[10px] bg-slate-900 text-white px-2 py-0.5 rounded-full font-black tracking-widest ml-6">
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
              className="group flex items-center justify-between px-3 py-2 text-sm font-extrabold text-slate-700 hover:text-slate-900 hover:bg-slate-50 rounded-xl transition-all"
            >
              <div className="flex items-center gap-3">
                <span 
                  className="w-2 h-2 rounded-full shadow-sm"
                  style={{ backgroundColor: sub.color }}
                ></span> 
                <span className="truncate max-w-[140px] transition-colors">{sub.name}</span>
              </div>
              <div className="text-slate-400 text-xs font-black px-1.5 py-0.5 rounded-md transition-all group-hover:text-slate-900 group-hover:bg-white shadow-sm border border-transparent group-hover:border-slate-100">
                {sub.count}
              </div>
            </Link>
          ))}
        </nav>
      )}
    </div>
  )
}
