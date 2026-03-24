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
    <nav className="flex items-center gap-1.5 text-[12px] font-extrabold uppercase tracking-tight mb-3">
      <Link href="/admin" className="hover:text-indigo-600 transition-colors flex items-center gap-1.5 px-2 py-1 bg-slate-100/80 rounded-lg text-slate-500">
        <Home className="w-3.5 h-3.5" />
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
            <ChevronRight className="w-3.5 h-3.5 text-slate-300" />
            {isLast ? (
              <span className="text-white font-black truncate max-w-[150px] px-2 py-1 bg-slate-900 rounded-lg shadow-sm">
                {label}
              </span>
            ) : (
              <Link href={path} className="hover:text-slate-900 transition-colors truncate max-w-[120px] px-2 py-1 bg-slate-100/80 rounded-lg text-slate-500">
                {label}
              </Link>
            )}
          </React.Fragment>
        )
      })}
    </nav>
  )
}
