'use client'

import { useRouter, useSearchParams } from "next/navigation"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "lucide-react"

export function DateFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const currentDate = searchParams.get('date') || new Date().toISOString().split('T')[0]

  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(new Date().getTime() - 86400000).toISOString().split('T')[0]
  
  // Last 7 days options
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date()
    d.setDate(d.getDate() - i)
    return d.toISOString().split('T')[0]
  })

  const handleDateChange = (value: string | null) => {
    if (!value) return
    const params = new URLSearchParams(searchParams.toString())
    params.set('date', value)
    router.push(`?${params.toString()}`, { scroll: false })
  }

  return (
    <div className="flex items-center gap-3 bg-white/50 backdrop-blur-md px-4 py-2 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all group">
      <Calendar className="w-4 h-4 text-slate-400 group-hover:text-[#FF5A20] transition-colors" />
      <Select value={currentDate} onValueChange={handleDateChange}>
        <SelectTrigger className="w-[180px] bg-transparent border-0 font-bold text-slate-600 focus:ring-0 p-0 h-auto">
          <SelectValue placeholder="Select Date" />
        </SelectTrigger>
        <SelectContent className="rounded-2xl border-slate-100 shadow-2xl">
          <SelectItem value={today} className="font-bold text-slate-700 focus:bg-orange-50 focus:text-[#FF5A20] rounded-xl">
            Today
          </SelectItem>
          <SelectItem value={yesterday} className="font-bold text-slate-700 focus:bg-orange-50 focus:text-[#FF5A20] rounded-xl">
            Yesterday
          </SelectItem>
          <div className="h-px bg-slate-50 my-2" />
          <div className="px-2 py-1.5 text-[10px] font-black text-slate-400 uppercase tracking-widest">Recent Days</div>
          {last7Days.slice(2).map((date) => (
            <SelectItem key={date} value={date} className="font-bold text-slate-600 focus:bg-orange-50 focus:text-[#FF5A20] rounded-xl">
              {new Date(date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
