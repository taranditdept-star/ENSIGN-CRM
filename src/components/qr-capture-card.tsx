'use client'

import { QRCodeSVG } from 'qrcode.react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { QrCode, ExternalLink, Copy, Check } from "lucide-react"
import { useState } from 'react'
import { toast } from 'sonner'

export function QrCaptureCard({ subsidiaryId }: { subsidiaryId: string }) {
  const [copied, setCopied] = useState(false)
  
  // Construct the absolute URL for the public portal
  // In a real app, this would use a base URL from env vars
  const portalUrl = `${window.location.origin}/capture/${subsidiaryId}`

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(portalUrl)
      setCopied(true)
      toast.success("Link copied to clipboard!")
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error("Failed to copy link")
    }
  }

  return (
    <Card className="border-slate-200 shadow-sm bg-white overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 bg-slate-50/50 border-b border-slate-100">
        <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider flex items-center gap-2">
          <QrCode className="h-4 w-4 text-indigo-600" />
          Self-Capture QR Code
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6 flex flex-col items-center text-center">
        <div className="p-4 bg-white border-2 border-slate-100 rounded-2xl shadow-inner mb-4">
          <QRCodeSVG 
            value={portalUrl} 
            size={160}
            level="H"
            includeMargin={true}
          />
        </div>
        
        <h3 className="font-bold text-slate-900 mb-1">Customer Self-Registration</h3>
        <p className="text-xs text-slate-500 mb-6 max-w-[200px]">
          Customers can scan this code to fill out the registration form on their own devices.
        </p>

        <div className="flex w-full gap-2">
          <Button 
            variant="outline" 
            className="flex-1 h-9 text-xs font-semibold gap-2 border-slate-200"
            onClick={copyToClipboard}
          >
            {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Copy className="h-3.5 w-3.5" />}
            {copied ? "Copied" : "Copy Link"}
          </Button>
          <a 
            href={portalUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex-1 h-9 inline-flex items-center justify-center rounded-lg bg-[#EA580C] hover:bg-[#C2410C] text-white text-xs font-bold gap-2 shadow-sm transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            Open Portal
          </a>
        </div>
      </CardContent>
    </Card>
  )
}
