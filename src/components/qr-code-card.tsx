'use client'

import React, { useRef } from 'react'
import { QRCodeSVG } from "qrcode.react"
import { Download, Copy, Building2, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

interface QRCodeCardProps {
  branch: {
    id: string;
    name: string;
    location: string;
    orgName: string;
    module: string;
    count: number;
    url: string;
  }
}

export function QRCodeCard({ branch }: QRCodeCardProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  const downloadJPG = () => {
    if (!svgRef.current) return

    const svgData = new XMLSerializer().serializeToString(svgRef.current)
    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    const img = new Image()

    img.onload = () => {
      canvas.width = img.width * 2 // Higher resolution
      canvas.height = img.height * 2
      if (ctx) {
        ctx.fillStyle = "white"
        ctx.fillRect(0, 0, canvas.width, canvas.height)
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
        const jpgUrl = canvas.toDataURL("image/jpeg", 1.0)
        const downloadLink = document.createElement("a")
        downloadLink.href = jpgUrl
        downloadLink.download = `${branch.name.replace(/\s+/g, "_")}_QR.jpg`
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        toast.success("QR Code downloaded as JPG")
      }
    }

    img.src = "data:image/svg+xml;base64," + btoa(svgData)
  }

  const copyLink = () => {
    navigator.clipboard.writeText(branch.url)
    toast.success("Portal link copied to clipboard")
  }

  return (
    <div className="bg-white rounded-[2.5rem] border border-slate-100 p-8 shadow-sm hover:shadow-2xl transition-all group relative overflow-hidden backdrop-blur-sm">
      {/* Industry Badge */}
      <div className="absolute top-0 right-0 p-6">
         <span className="text-[10px] font-black uppercase tracking-widest bg-slate-900 text-white px-4 py-1.5 rounded-full shadow-lg">
           {branch.module}
         </span>
      </div>

      <div className="flex flex-col sm:flex-row gap-8">
        {/* QR Code Section */}
        <div className="shrink-0 flex flex-col items-center gap-4">
          <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 group-hover:bg-white group-hover:border-[#FF5A20]/20 transition-all shadow-inner group-hover:shadow-xl group-hover:scale-105 duration-500">
            <QRCodeSVG 
              ref={svgRef}
              value={branch.url}
              size={140}
              level="H"
              includeMargin={false}
              imageSettings={{
                src: "/favicon.ico",
                x: undefined,
                y: undefined,
                height: 28,
                width: 28,
                excavate: true,
              }}
            />
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Ensign Secure QR</p>
        </div>

        {/* Branch Details */}
        <div className="flex-1 flex flex-col justify-between py-2">
          <div>
            <h3 className="text-2xl font-black text-slate-900 leading-tight mb-2 group-hover:text-[#FF5A20] transition-colors">
              {branch.name}
            </h3>
            <div className="flex items-center gap-2 text-slate-500 text-sm font-bold mb-4">
              <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center">
                <Building2 className="w-3.5 h-3.5" />
              </div>
              {branch.orgName}
            </div>
            <div className="flex items-center gap-2 text-slate-400 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#FF5A20]" />
              {branch.location}
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex items-center justify-between px-1">
              <div className="flex flex-col">
                <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">Verified Entries</span>
                <span className="text-xl font-black text-slate-900">{branch.count}</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={copyLink}
                  variant="outline" 
                  size="sm" 
                  className="rounded-xl border-slate-200 font-black hover:bg-slate-900 hover:text-white transition-all h-10 px-4"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Link
                </Button>
                <Button 
                  onClick={downloadJPG}
                  className="rounded-xl bg-[#FF5A20] hover:bg-slate-900 text-white font-black transition-all shadow-lg shadow-orange-500/20 h-10 px-4"
                >
                  <Download className="w-4 h-4 mr-2" />
                  JPG
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
