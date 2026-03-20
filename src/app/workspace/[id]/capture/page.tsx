import { Button } from "@/components/ui/button"
import { ExternalLink, Copy, CheckCircle2, QrCode } from "lucide-react"
import Link from "next/link"

export default async function CaptureManagementPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // In a real Vercel env, we'd use process.env.NEXT_PUBLIC_SITE_URL
  const portalUrl = `https://ensign-crm.vercel.app/capture/${id}`

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Data Capture Flow</h1>
        <p className="text-slate-500 mt-2 font-medium">Manage and share your mobile-optimized registration portal.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Portal Link Card */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
              <QrCode className="w-32 h-32" />
            </div>
            
            <div className="relative z-10">
              <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                <ExternalLink className="w-5 h-5 text-indigo-500" />
                Live Customer Portal Link
              </h3>
              
              <p className="text-slate-500 text-sm mb-6 leading-relaxed max-w-md">
                This link is optimized for mobile devices and tablets. 
                Share it with your data capture clerks or generate a QR code for customers to scan in-store.
              </p>

              <div className="flex items-center gap-2">
                <div className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 font-mono text-sm text-slate-600 truncate">
                  {portalUrl}
                </div>
                <Button variant="outline" className="shrink-0 h-[46px] gap-2 border-slate-200">
                  <Copy className="w-4 h-4" />
                  Copy Link
                </Button>
                <Link href={portalUrl} target="_blank">
                  <Button className="shrink-0 h-[46px] gap-2 bg-indigo-600 hover:bg-indigo-700">
                    Open Portal
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-100">
              <div className="w-10 h-10 rounded-lg bg-indigo-500 flex items-center justify-center mb-4">
                <CheckCircle2 className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-indigo-900 mb-1 text-sm">Optimized for Mobile</h4>
              <p className="text-indigo-700/70 text-xs">Full screen layout designed for fast entry on smartphones.</p>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-100">
              <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center mb-4">
                <QrCode className="w-5 h-5 text-white" />
              </div>
              <h4 className="font-bold text-emerald-900 mb-1 text-sm">QR Ready</h4>
              <p className="text-emerald-700/70 text-xs">Print and display this link as a QR code in your branch.</p>
            </div>
          </div>
        </div>

        {/* Quick Stats sidebar inside management */}
        <div className="space-y-6">
          <div className="bg-slate-900 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden">
             <div className="relative z-10">
               <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">Status</p>
               <h4 className="text-xl font-bold mb-6">Portal is Live</h4>
               
               <div className="space-y-4">
                 <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                   <span className="text-white/60">Data Security</span>
                   <span className="font-bold text-emerald-400">Encrypted</span>
                 </div>
                 <div className="flex items-center justify-between text-sm py-2 border-b border-white/10">
                   <span className="text-white/60">Validation</span>
                   <span className="font-bold text-emerald-400">Active</span>
                 </div>
                 <div className="flex items-center justify-between text-sm py-2">
                   <span className="text-white/60">Submissions</span>
                   <span className="font-bold">Unlimited</span>
                 </div>
               </div>
             </div>
          </div>
        </div>

      </div>
    </div>
  )
}
