'use client'

import { Input } from "@/components/ui/input"
import { Search, X, Loader2 } from "lucide-react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useTransition, useEffect, useState } from "react"
import { useDebounce } from "@/hooks/use-debounce"

export function AdminSearchBar() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const currentSearch = searchParams.get('q') || ""
  const [value, setValue] = useState(currentSearch)
  const debouncedValue = useDebounce(value, 400)

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString())
    if (debouncedValue) {
      params.set('q', debouncedValue)
    } else {
      params.delete('q')
    }
    
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`)
    })
  }, [debouncedValue, pathname, router, searchParams])

  function handleSearch(val: string) {
    setValue(val)
  }

  return (
    <div className="relative w-full max-w-md group">
      <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 transition-colors ${isPending ? 'text-orange-500 animate-pulse' : 'text-slate-400'}`} />
      <Input 
        placeholder="Search subsidiaries or customers..." 
        className="pl-10 h-10 rounded-xl border-slate-200 bg-white focus:ring-[#FF5A20] focus:border-[#FF5A20] transition-all shadow-sm"
        defaultValue={currentSearch}
        onChange={(e) => handleSearch(e.target.value)}
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
