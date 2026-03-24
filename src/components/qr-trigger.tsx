'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { QrCode } from "lucide-react"
import { QRCodeModal } from "./qr-code-modal"

interface QRCodeTriggerProps {
  subsidiaryId: string;
  subsidiaryName: string;
}

export function QRCodeTrigger({ subsidiaryId, subsidiaryName }: QRCodeTriggerProps) {
  const [open, setOpen] = useState(false)
  
  // Use window.location.origin if available, otherwise fallback to vercel env
  const baseUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://ensign-crm.vercel.app'
    
  const captureUrl = `${baseUrl}/capture/${subsidiaryId}`

  return (
    <>
      <Button 
        onClick={() => setOpen(true)}
        variant="outline"
        className="h-12 px-6 border-slate-200 text-slate-600 font-black rounded-xl hover:bg-slate-50 transition-all flex items-center gap-2"
      >
        <QrCode className="w-5 h-5 text-[#FF5A20]" />
        QR Code
      </Button>

      <QRCodeModal 
        subsidiaryName={subsidiaryName}
        captureUrl={captureUrl}
        open={open}
        onOpenChange={setOpen}
      />
    </>
  )
}
