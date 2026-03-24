'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Home } from 'lucide-react'

export function Breadcrumbs() {
  const pathname = usePathname()
  
  // Split the path and filter out empty segments
  const segments = pathname.split('/').filter(Boolean)
  
  // Don't show breadcrumbs on the main landing or if it's too short
  if (segments.length === 0) return null

  return (
    <nav className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
      <Link href="/admin" className="hover:text-slate-900 transition-colors flex items-center gap-1">
        <Home className="w-3 h-3" />
        <span>Admin</span>
      </Link>
      
      {segments.map((segment, index) => {
        // Skip 'admin' as it's our root breadcrumb
        if (segment.toLowerCase() === 'admin') return null
        
        const path = `/${segments.slice(0, index + 1).join('/')}`
        const isLast = index === segments.length - 1
        
        // Clean up the label (replace hyphens with spaces)
        const label = segment.replace(/-/g, ' ')

        return (
          <React.Fragment key={path}>
            <ChevronRight className="w-3 h-3 text-slate-300" />
            {isLast ? (
              <span className="text-slate-900 font-extrabold truncate max-w-[120px]">
                {label}
              </span>
            ) : (
              <Link href={path} className="hover:text-slate-900 transition-colors truncate max-w-[100px]">
                {label}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
