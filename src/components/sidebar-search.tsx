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
      {/* Search Bar - Slim & Subtle */}
      <div className="px-5 py-2 shrink-0">
        <div className="relative group/search">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-3.5 h-3.5 transition-colors duration-200 group-focus-within/search:text-slate-900" />
          <input 
            type="text" 
            placeholder="Search branches..." 
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/50 rounded-lg pl-9 pr-8 py-2 text-[12px] font-semibold focus:outline-none focus:ring-1 focus:ring-slate-200 focus:bg-white transition-all placeholder:text-slate-400 text-slate-900"
          />
          {query ? (
            <button 
              onClick={() => setQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          ) : (
            <div className="absolute right-2.5 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[9px] font-black text-slate-300 pointer-events-none">
              <Command className="w-2.5 h-2.5"/>K
            </div>
          )}
        </div>
      </div>

      {/* Results Area - High Density */}
      <div className="flex-1 overflow-y-auto px-2 py-4 space-y-2 scrollbar-hide">
        {filteredPortfolios.length > 0 ? (
          <div className="space-y-1">
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
          <div className="px-4 py-10 text-center">
            <p className="text-[11px] font-semibold text-slate-400 italic">No matches found</p>
          </div>
        )}
      </div>
    </div>
  )
}
