"use client"

import React, { useState } from 'react'
import { Copy, Check, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import Link from "next/link"

interface CaptureLinkRowProps {
  branch: any
}

export function CaptureLinkRow({ branch }: CaptureLinkRowProps) {
  const [copied, setCopied] = useState(false)
  
  // Calculate relative capture URL
  const captureUrl = `${window.location.origin}/capture/${branch.id}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(captureUrl)
      setCopied(true)
      toast.success("Capture link copied!", {
        description: `URL for ${branch.name} is now on your clipboard.`
      })
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      toast.error("Failed to copy link")
    }
  }

  return (
    <tr className="group hover:bg-slate-50/50 transition-colors">
      <td className="px-8 py-6">
        <div className="flex items-center gap-4">
          <div 
            className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm shrink-0"
            style={{ backgroundColor: branch.brand_color || '#000' }}
          >
            <span className="font-black text-xs uppercase">{branch.name.substring(0, 2)}</span>
          </div>
          <div>
            <h3 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-[#FF5A20] transition-colors">{branch.name}</h3>
            <p className="text-[11px] font-bold text-slate-400 mt-0.5">{branch.organizations?.name}</p>
          </div>
        </div>
      </td>
      <td className="px-8 py-6">
        <span className="text-[10px] font-black px-3 py-1.5 rounded-lg border border-slate-100 bg-white text-slate-500 uppercase tracking-widest shadow-sm">
          {branch.subsidiary_type}
        </span>
      </td>
      <td className="px-8 py-6 text-right">
        <div className="flex items-center justify-end gap-2">
          <Button 
            variant="ghost"
            size="sm"
            onClick={copyToClipboard}
            className={`h-9 border border-slate-100 font-bold transition-all shadow-sm rounded-xl px-4 ${copied ? 'bg-emerald-50 text-emerald-600 border-emerald-100' : 'bg-white hover:bg-slate-50'}`}
          >
            {copied ? (
              <Check className="w-4 h-4 mr-2" />
            ) : (
              <Copy className="w-4 h-4 mr-2 text-slate-400" />
            )}
            {copied ? 'Copied' : 'Copy Link'}
          </Button>
          <Link href={`/capture/${branch.id}`} target="_blank">
            <Button 
              variant="ghost" 
              size="sm"
              className="h-9 w-9 p-0 bg-slate-900 text-white hover:bg-slate-800 hover:text-white rounded-xl shadow-lg shadow-slate-900/10"
            >
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </td>
    </tr>
  )
}
