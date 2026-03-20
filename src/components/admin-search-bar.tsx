'use client'

import { Input } from "@/components/ui/input"
import { Search, X, Loader2 } from "lucide-react"
import { useRouter, useSearchParams } from "next/navigation"
import { useTransition } from "react"

export function AdminSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentSearch = searchParams.get('q') || ""

  function handleSearch(val: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (val) {
      params.set('q', val)
    } else {
      params.delete('q')
    }
    
    startTransition(() => {
      router.push(`/admin?${params.toString()}`)
    })
  }

  return (
    <div className="relative w-full max-w-md group">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isPending ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`} />
      <Input 
        placeholder="Search subsidiaries or customers..." 
        className="pl-10 h-10 rounded-xl border-slate-200 bg-white focus:ring-[#FF5A20] focus:border-[#FF5A20] transition-all shadow-sm"
        defaultValue={currentSearch}
        onChange={(e) => {
          const val = e.target.value
          const timeout = setTimeout(() => handleSearch(val), 500)
          return () => clearTimeout(timeout)
        }}
      />
      {isPending && <Loader2 className="absolute right-10 top-1/2 -translate-y-1/2 w-3.5 h-3.5 animate-spin text-slate-300" />}
      {currentSearch && !isPending && (
        <button 
          onClick={() => handleSearch("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-500"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  )
}
