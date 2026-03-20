'use client'

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Search, X, Filter } from "lucide-react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export function CustomerFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentSearch = searchParams.get('q') || ""
  const currentType = searchParams.get('type') || "all"

  function updateParams(updates: Record<string, string | null>) {
    const params = new URLSearchParams(searchParams.toString())
    Object.entries(updates).forEach(([key, value]) => {
      if (value === null || value === 'all') {
        params.delete(key)
      } else {
        params.set(key, value)
      }
    })
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
      <div className="relative w-full md:max-w-md group">
        <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isPending ? 'text-indigo-500 animate-pulse' : 'text-slate-400'}`} />
        <Input 
          placeholder="Search by name, phone or ID..." 
          className="pl-10 h-10 rounded-xl border-slate-200 bg-white focus:ring-indigo-500 transition-all shadow-sm"
          defaultValue={currentSearch}
          onChange={(e) => {
            const val = e.target.value
            // Debounce would be better, but for now simple sync
            const timeout = setTimeout(() => updateParams({ q: val || null }), 500)
            return () => clearTimeout(timeout)
          }}
        />
        {currentSearch && (
          <button 
            onClick={() => updateParams({ q: null })}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <div className="flex items-center gap-2 text-slate-500 text-xs font-bold uppercase tracking-wider mr-2">
          <Filter className="w-3.5 h-3.5" />
          Quick Filters:
        </div>
        
        <Select defaultValue={currentType} onValueChange={(val) => updateParams({ type: val })}>
          <SelectTrigger className="w-[160px] h-10 rounded-xl border-slate-200 bg-white shadow-sm font-medium">
            <SelectValue placeholder="Customer Type" />
          </SelectTrigger>
          <SelectContent className="rounded-xl shadow-xl border-slate-100">
            <SelectItem value="all">All Types</SelectItem>
            <SelectItem value="Domestic">Domestic</SelectItem>
            <SelectItem value="Commercial">Commercial</SelectItem>
          </SelectContent>
        </Select>

        <Button 
          variant="outline" 
          size="sm" 
          className="h-10 px-4 rounded-xl border-slate-200 text-slate-600 font-semibold hover:bg-slate-50"
          onClick={() => router.push(pathname)}
        >
          Reset
        </Button>
      </div>
    </div>
  )
}
