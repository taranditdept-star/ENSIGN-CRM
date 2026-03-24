'use client'

import React, { useRef } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { QrCode, Download, Share2, Copy } from "lucide-react"
import { toast } from "sonner"

interface QRCodeModalProps {
  subsidiaryName: string;
  captureUrl: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRCodeModal({ subsidiaryName, captureUrl, open, onOpenChange }: QRCodeModalProps) {
  const qrRef = useRef<SVGSVGElement>(null)

  const downloadQRCode = () => {
    const svg = qrRef.current
    if (!svg) return

    const svgData = new XMLSerializer().serializeToString(svg)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width + 80 // Add padding
      canvas.height = img.height + 140
      
      if (!ctx) return
      
      // White Background
      ctx.fillStyle = "white"
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      
      // Draw Image
      ctx.drawImage(img, 40, 40)
      
      // Add Text
      ctx.fillStyle = "#0F172A" // slate-900
      ctx.font = "bold 20px Inter, sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(subsidiaryName, canvas.width / 2, img.height + 80)
      
      ctx.fillStyle = "#64748B" // slate-500
      ctx.font = "14px Inter, sans-serif"
      ctx.fillText("Scan to Capture Data", canvas.width / 2, img.height + 105)

      const pngFile = canvas.toDataURL("image/png")
      const downloadLink = document.createElement("a")
      downloadLink.download = `QR-${subsidiaryName.replace(/\s+/g, '-')}.png`
      downloadLink.href = pngFile
      downloadLink.click()
      toast.success("QR Code downloaded successfully!")
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const copyUrl = () => {
    navigator.clipboard.writeText(captureUrl)
    toast.success("Capture link copied to clipboard!")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px] rounded-3xl border-slate-100 shadow-2xl p-0 overflow-hidden">
        <DialogHeader className="p-8 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center backdrop-blur-md border border-white/20">
              <QrCode className="w-6 h-6 text-[#FF5A20]" />
            </div>
            <div>
              <DialogTitle className="text-xl font-black tracking-tight">Branch QR Code</DialogTitle>
              <DialogDescription className="text-slate-400 font-medium">
                {subsidiaryName}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="p-8 flex flex-col items-center gap-8 bg-white">
          {/* QR Container */}
          <div className="p-6 bg-slate-50 rounded-[2rem] border-2 border-slate-100 shadow-inner group relative">
            <QRCodeSVG 
              ref={qrRef}
              value={captureUrl} 
              size={240}
              level="H"
              includeMargin={false}
              className="rounded-xl"
            />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-white/60 backdrop-blur-[2px] rounded-[2rem]">
               <Button variant="outline" size="sm" className="rounded-full font-bold shadow-lg" onClick={copyUrl}>
                 <Copy className="w-4 h-4 mr-2" /> Copy Link
               </Button>
            </div>
          </div>

          <div className="text-center space-y-2">
            <p className="text-sm font-black text-slate-900">Proprietary Capture Link</p>
            <p className="text-xs font-mono text-slate-400 break-all px-4 select-all">{captureUrl}</p>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full">
            <Button 
              variant="outline" 
              onClick={copyUrl}
              className="h-12 rounded-2xl border-slate-200 font-bold gap-2 hover:bg-slate-50"
            >
              <Share2 className="w-4 h-4" /> Share Link
            </Button>
            <Button 
              onClick={downloadQRCode}
              className="h-12 rounded-2xl bg-[#FF5A20] hover:bg-[#E04F1C] text-white font-black gap-2 shadow-lg shadow-orange-100"
            >
              <Download className="w-4 h-4" /> Download QR
            </Button>
          </div>
        </div>

        <DialogFooter className="p-6 bg-slate-50 border-t border-slate-100">
           <p className="text-[10px] text-center w-full font-black text-slate-400 uppercase tracking-widest">
             ENSIGN CRM • CUSTOMER CAPTURE ENGINE v2.5
           </p>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
