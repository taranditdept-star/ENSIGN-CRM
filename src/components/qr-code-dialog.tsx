'use client'

import * as React from "react"
import { QrCode, Download, Printer } from "lucide-react"
import { QRCodeCanvas } from "qrcode.react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"

export function QRCodeDialog({ 
  branchName, 
  url 
}: { 
  branchName: string;
  url: string;
}) {
  const handleDownload = () => {
    const canvas = document.getElementById(`qr-canvas-${branchName}`) as HTMLCanvasElement
    if (canvas) {
      const pngUrl = canvas
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream")
      const downloadLink = document.createElement("a")
      downloadLink.href = pngUrl
      downloadLink.download = `QR-${branchName.replace(/\s+/g, "-")}.png`
      document.body.appendChild(downloadLink)
      downloadLink.click()
      document.body.removeChild(downloadLink)
      toast.success("QR Code downloaded!")
    }
  }

  const handlePrint = () => {
    const canvas = document.getElementById(`qr-canvas-${branchName}`) as HTMLCanvasElement
    const windowUrl = window.open('', '', 'left=0,top=0,width=800,height=900,toolbar=0,scrollbars=0,status=0')
    if (windowUrl && canvas) {
      const imgUrl = canvas.toDataURL("image/png")
      windowUrl.document.write(`
        <html>
          <head>
            <title>QR Code - ${branchName}</title>
            <style>
              body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; }
              .container { text-align: center; border: 2px solid #eee; padding: 40px; border-radius: 20px; }
              img { width: 300px; height: 300px; margin: 20px 0; }
              h1 { margin-bottom: 10px; font-size: 28px; color: #1e293b; }
              p { margin-top: 10px; color: #64748b; font-size: 16px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="container">
              <h1>${branchName}</h1>
              <img src="${imgUrl}" />
              <p>Scan to Register Customer</p>
            </div>
            <script>
              window.onload = function() { window.print(); window.close(); }
            </script>
          </body>
        </html>
      `)
      windowUrl.document.close()
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={(props) => (
        <Button 
          {...props}
          variant="outline" 
          className="w-10 h-10 border-slate-200 hover:bg-slate-50 text-slate-600 rounded-xl flex items-center justify-center transition-colors"
          title="Show QR Code"
        >
          <QrCode className="w-4 h-4" />
        </Button>
      )} />
      <DialogContent className="sm:max-w-[400px] rounded-3xl p-8 border-slate-100 shadow-2xl">
        <DialogHeader className="items-center text-center">
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">{branchName}</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium pt-1">
            Scan this code to quickly access the customer capture portal for this branch.
          </DialogDescription>
        </DialogHeader>
        
        <div className="flex flex-col items-center justify-center py-10">
          <div className="p-6 bg-white rounded-3xl border-2 border-slate-50 shadow-xl">
            <QRCodeCanvas 
              id={`qr-canvas-${branchName}`}
              value={url} 
              size={200} 
              level="H" 
              includeMargin={false} 
            />
          </div>
          <p className="mt-8 text-[11px] font-black text-slate-300 uppercase tracking-widest bg-slate-50 px-3 py-1 rounded-full border border-slate-100">
            {url}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-4">
          <Button 
            onClick={handlePrint}
            className="h-12 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print QR
          </Button>
          <Button 
            variant="outline" 
            className="h-12 border-slate-200 text-slate-700 font-bold rounded-xl flex items-center justify-center gap-2"
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" /> Download
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
