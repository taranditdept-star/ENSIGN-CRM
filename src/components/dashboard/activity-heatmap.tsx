'use client'

import { Card } from "@/components/ui/card"
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip"

interface HeatmapData {
  date: string
  count: number
}

interface ActivityHeatmapProps {
  data: HeatmapData[]
}

export function ActivityHeatmap({ data }: ActivityHeatmapProps) {
  // Pad data to last 30 days if needed
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - (29 - i))
    const dateStr = d.toISOString().split('T')[0]
    const match = data.find(item => item.date === dateStr)
    return {
      date: dateStr,
      count: match ? match.count : 0
    }
  })

  const getIntensity = (count: number) => {
    if (count === 0) return "bg-slate-100"
    if (count < 5) return "bg-emerald-200"
    if (count < 15) return "bg-emerald-400"
    return "bg-emerald-600 shadow-[0_0_10px_rgba(16,185,129,0.3)]"
  }

  return (
    <Card className="bg-white/80 backdrop-blur-xl rounded-[40px] border-0 shadow-2xl p-8">
      <div className="space-y-6">
        <div className="space-y-1">
          <h3 className="text-lg font-black text-slate-900 tracking-tight">Activity Heatmap</h3>
          <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest">Transaction volume (Last 30 Days)</p>
        </div>

        <TooltipProvider>
          <div className="flex flex-wrap gap-2">
            {days.map((day) => (
              <Tooltip key={day.date}>
                <TooltipTrigger asChild>
                  <div 
                    className={`w-10 h-10 rounded-xl transition-all duration-500 hover:scale-110 cursor-pointer ${getIntensity(day.count)} shadow-inner`}
                  />
                </TooltipTrigger>
                <TooltipContent className="bg-slate-900 text-white border-0 font-bold rounded-xl px-4 py-2">
                  <p>{new Date(day.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}</p>
                  <p className="text-[11px] text-[#FF5A20] font-black uppercase tracking-widest leading-none mt-1">
                    {day.count} Transactions
                  </p>
                </TooltipContent>
              </Tooltip>
            ))}
          </div>
        </TooltipProvider>

        <div className="flex items-center justify-between pt-4 border-t border-slate-50 text-[10px] font-black text-slate-400 uppercase tracking-widest">
          <div className="flex items-center gap-2">
            <span>Less</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-slate-100" />
              <div className="w-3 h-3 rounded-sm bg-emerald-200" />
              <div className="w-3 h-3 rounded-sm bg-emerald-400" />
              <div className="w-3 h-3 rounded-sm bg-emerald-600" />
            </div>
            <span>More</span>
          </div>
          <span>Updated Real-time</span>
        </div>
      </div>
    </Card>
  )
}
