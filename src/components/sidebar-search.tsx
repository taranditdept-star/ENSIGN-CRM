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
      <div className="px-4 py-2 shrink-0">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-[#FF5A20] transition-colors" />
          <input 
            type="text" 
            placeholder="Search branches..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl pl-9 pr-10 py-2.5 text-xs font-bold focus:outline-none focus:ring-1 focus:ring-orange-200 focus:bg-white transition-all placeholder:text-slate-400 text-slate-900"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
            >
              <X className="w-4 h-4" />
            </button>
          ) : (
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-black text-slate-300 bg-white border border-slate-200 px-1 py-0.5 rounded uppercase">
              <Command className="w-2.5 h-2.5"/> K
            </div>
          )}
        </div>
      </div>

      {/* Results Area */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-8 scrollbar-hide">
        {filteredPortfolios.length > 0 ? (
          <div className="space-y-6">
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
          <div className="px-4 py-8 text-center bg-slate-50 rounded-2xl mx-1 border border-dashed border-slate-200">
            <p className="text-xs font-bold text-slate-400 italic">No results for &quot;{query}&quot;</p>
          </div>
        )}
      </div>
    </div>
  )
}
