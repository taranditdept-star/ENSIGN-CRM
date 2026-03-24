import { Card } from "@/components/ui/card"
import { TrendingUp, TrendingDown, Minus, ArrowRight } from "lucide-react"
import Link from "next/link"

interface KpiCardProps {
  title: string
  value: string | number
  change?: number
  icon: React.ReactNode
  prefix?: string
  suffix?: string
  className?: string
  href?: string
}

export function KpiCard({ title, value, change, icon, prefix = "", suffix = "", className = "", href }: KpiCardProps) {
  const isPositive = change && change > 0
  const isNegative = change && change < 0
  
  const content = (
    <Card className={`relative overflow-hidden group hover:shadow-2xl hover:shadow-[#FF5A20]/10 transition-all duration-500 rounded-[32px] border-0 bg-white/80 backdrop-blur-xl p-8 h-full ${className}`}>
      {/* Decorative Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-slate-50 rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-[#FF5A20]/5 transition-colors duration-500" />
      
      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="w-14 h-14 bg-slate-900 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-110 transition-transform duration-500">
            {icon}
          </div>
          <div className="flex flex-col items-end gap-2">
            {change !== undefined && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-black text-[12px] tracking-tight border ${
                isPositive ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 
                isNegative ? 'bg-rose-50 text-rose-600 border-rose-100' : 
                'bg-slate-50 text-slate-400 border-slate-100'
              }`}>
                {isPositive ? <TrendingUp className="w-3.5 h-3.5" /> : isNegative ? <TrendingDown className="w-3.5 h-3.5" /> : <Minus className="w-3.5 h-3.5" />}
                {Math.abs(change).toFixed(1)}%
              </div>
            )}
            {href && (
              <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#FF5A20] group-hover:translate-x-1 transition-all" />
            )}
          </div>
        </div>
        
        <div className="space-y-1">
          <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">{title}</h3>
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-black tracking-tighter text-slate-900">
              {prefix}{value}{suffix}
            </span>
          </div>
          <p className="text-[11px] font-bold text-slate-400 italic mt-2">vs. previous period</p>
        </div>
      </div>
    </Card>
  )

  if (href) {
    return <Link href={href} className="block h-full">{content}</Link>
  }

  return content
}
