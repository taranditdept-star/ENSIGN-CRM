'use client'

import { Button } from "@/components/ui/button"
import { Copy, Check } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function CopyLinkButton({ url, label = "Copy Link" }: { url: string, label?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      className="h-8 px-3 rounded-lg bg-slate-50 border border-slate-100 text-[10px] font-black uppercase tracking-tighter text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-all gap-1.5"
      onClick={handleCopy}
    >
      {copied ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
      {copied ? "Copied" : label}
    </Button>
  )
}
