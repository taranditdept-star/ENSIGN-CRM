'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'

const THEME_MAP: Record<string, string> = {
  lpg: '#EA580C',      // Orange
  sbali: '#EC4899',    // Pink
  mining: '#D97706',   // Amber/Gold
  explosives: '#EF4444', // Red
  fuel: '#0EA5E9',     // Sky Blue
  solar: '#F59E0B',    // Yellow
  branding: '#6366F1', // Indigo
  farming: '#10B981',  // Emerald
  meat: '#F43F5E',     // Rose
  retail: '#8B5CF6',   // Violet
  bakery: '#F59E0B',   // Honey
}

export function BrandTheme() {
  const pathname = usePathname()

  useEffect(() => {
    // Detect if we are in a subsidiary context
    // Paths like /admin/subsidiaries/[id] or /admin/tools/qr-manager (can be general)
    
    // For now, let's look for known keywords in the path to simulate "context"
    let activeTheme = '#6366F1' // Default Indigo

    Object.entries(THEME_MAP).forEach(([key, color]) => {
      if (pathname.includes(key) || (pathname.includes('subsidiaries') && key === 'lpg')) { // Rough heuristic
        activeTheme = color
      }
    })

    // Apply to CSS Variable
    document.documentElement.style.setProperty('--brand-accent', activeTheme)
    document.documentElement.style.setProperty('--brand-accent-glow', `${activeTheme}33`) // 20% opacity
  }, [pathname])

  return null
}
