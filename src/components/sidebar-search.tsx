'use client'

import React, { useState, useMemo } from 'react'
import { Search, Command, X } from 'lucide-react'
import { SidebarPortfolio } from './sidebar-portfolio'

interface Branch {
  id: string;
  name: string;
  count: number;
  color: string;
}

interface Portfolio {
  id: string;
  name: string;
  module: string;
  branches: Branch[];
}

interface SidebarSearchProps {
  portfolios: Portfolio[];
}

export function SidebarSearch({ portfolios }: SidebarSearchProps) {
  const [query, setQuery] = useState('')

  const filteredPortfolios = useMemo(() => {
    if (!query) return portfolios

    const lowerQuery = query.toLowerCase()
    
    return portfolios.map(p => {
      // Check if org name matches
      const orgMatches = p.name.toLowerCase().includes(lowerQuery)
      
      // Filter branches that match
      const matchingBranches = p.branches.filter(b => 
        b.name.toLowerCase().includes(lowerQuery)
      )

      // If org matches, return it with all branches
      if (orgMatches) return p
      
      // If branches match, return org with only matching branches
      if (matchingBranches.length > 0) {
        return {
          ...p,
          branches: matchingBranches
        }
      }

      return null
    }).filter(Boolean) as Portfolio[]
  }, [portfolios, query])

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Search Input Area */}
      <div className="px-5 py-4 shrink-0">
        <div className="relative group/search">
          <div className="absolute inset-0 bg-slate-900/[0.02] rounded-2xl group-hover/search:bg-slate-900/[0.04] transition-all duration-300" />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within/search:text-[#FF5A20] transition-colors duration-300" />
          <input 
            type="text" 
            placeholder="Quick search..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent border-0 rounded-2xl pl-11 pr-10 py-3 text-[13px] font-bold focus:outline-none focus:ring-0 transition-all placeholder:text-slate-400 text-slate-900 relative z-10"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600 relative z-20"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] font-black text-slate-300 bg-white shadow-sm border border-slate-100 px-1.5 py-0.5 rounded-lg uppercase tracking-wider relative z-20">
              <Command className="w-2.5 h-2.5"/> K
            </div>
          )}
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-6 scrollbar-hide">
        {filteredPortfolios.length > 0 ? (
          <div className="space-y-4">
            {filteredPortfolios.map((portfolio) => (
              <SidebarPortfolio 
                key={portfolio.id}
                id={portfolio.id}
                name={portfolio.name}
                module={portfolio.module}
                branches={portfolio.branches}
              />
            ))}
          </div>
        ) : (
          <div className="px-6 py-12 text-center rounded-[32px] border-2 border-dashed border-slate-100/50 flex flex-col items-center gap-4">
            <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
               <Search className="w-6 h-6" />
            </div>
            <p className="text-xs font-bold text-slate-400 italic leading-relaxed"> No results found for<br/><span className="text-slate-900">&quot;{query}&quot;</span></p>
          </div>
        )}
      </div>
    </div>
  )
}
