"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ActivityData {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  data: ActivityData[]
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Generate last 90 days of dates
  const dates = Array.from({ length: 91 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (90 - i))
    return d.toISOString().split('T')[0]
  })

  const dataMap = new Map(data.map(item => [item.date, item.count]))

  const getColor = (count: number) => {
    if (count === 0) return 'bg-slate-100/50'
    if (count < 5) return 'bg-orange-200'
    if (count < 15) return 'bg-orange-400'
    return 'bg-[#FF5A20]'
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl border border-white p-8 rounded-[32px] shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight">Operational Intensity</h2>
          <p className="text-[13px] font-semibold text-slate-400 mt-1">Transaction volume across the last 90 days</p>
        </div>
        <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          <span>Less</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-sm bg-slate-100" />
            <div className="w-3 h-3 rounded-sm bg-orange-200" />
            <div className="w-3 h-3 rounded-sm bg-orange-400" />
            <div className="w-3 h-3 rounded-sm bg-[#FF5A20]" />
          </div>
          <span>More</span>
        </div>
      </div>

      <TooltipProvider delay={0}>
        <div className="flex flex-wrap gap-1.5 lg:grid lg:grid-flow-col lg:grid-rows-7 lg:gap-2">
          {dates.map((date) => {
            const count = dataMap.get(date) || 0
            return (
              <Tooltip key={date}>
                <TooltipTrigger>
                  <motion.div 
                    whileHover={{ scale: 1.2, zIndex: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    className={`w-3.5 h-3.5 sm:w-4 sm:h-4 rounded-[4px] cursor-pointer transition-colors ${getColor(count)}`}
                  />
                </TooltipTrigger>
                <TooltipContent side="top" className="bg-slate-900 text-white border-none py-2 px-3 rounded-xl shadow-2xl">
                  <div className="text-[11px] font-bold">
                    <span className="text-white/60">{new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                    <div className="text-sm mt-0.5">{count} {count === 1 ? 'transaction' : 'transactions'}</div>
                  </div>
                </TooltipContent>
              </Tooltip>
            )
          })}
        </div>
      </TooltipProvider>
    </div>
  )
}
