import { mockSchemas } from "@/lib/schemas"
import { DynamicCaptureForm } from "@/components/dynamic-capture-form"
import { ShieldCheck } from "lucide-react"

export default async function CapturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  
  // In a robust production environment, this schema would be dynamically 
  // fetched from `public.organizations` depending on the current user context.
  const schema = mockSchemas[id]
  
  // Fallback to Flora Gas mapping (Branch 1) to guarantee testing is easy across any generic URL ID.
  const activeSchema = schema || mockSchemas["1"]

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-700">
      
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Onboard New Customer</h1>
          <div className="hidden sm:flex items-center bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-bold border border-emerald-200">
            <ShieldCheck className="w-4 h-4 mr-1" /> Secure Session
          </div>
        </div>
        <p className="text-slate-500 mt-2 font-medium">Record a new interaction for <span className="text-indigo-600 font-bold">{activeSchema.name}</span>. The fields below are dynamically mapped to your branch&apos;s designated requirements.</p>
      </div>
      
      <DynamicCaptureForm schema={activeSchema} subsidiaryId={id} />
      
    </div>
  )
}
