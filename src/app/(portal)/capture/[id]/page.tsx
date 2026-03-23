import { createClient } from "@/utils/supabase/server"
import { DynamicCaptureForm } from "@/components/dynamic-capture-form"
import { subsidiarySchemas } from "@/lib/schemas"
import { Flame } from "lucide-react"

export default async function CapturePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch subsidiary details including schema_type
  const { data: subsidiary } = await supabase
    .from('subsidiaries')
    .select('name, schema_type')
    .eq('id', id)
    .single()

  // Fetch real registration count
  const { count: registeredCount } = await supabase
    .from('customers')
    .select('*', { count: 'exact', head: true })
    .eq('subsidiary_id', id)

  const branchName = subsidiary?.name || (id === "1" ? "Flora Gas" : "Ensign Branch")
  const schemaType = subsidiary?.schema_type || (id === "1" ? "lpg" : "fallback")
  const schema = subsidiarySchemas[schemaType] || subsidiarySchemas.fallback

  return (
    <div className="min-h-screen bg-[#F0F2F5] flex flex-col font-sans">
      
      {/* Premium Dark Blue Top Navbar precisely matching the reference */}
      <header className="bg-[#1e3a5f] h-16 flex items-center justify-between px-6 shrink-0 shadow-md relative z-10 w-full">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg bg-[#EA580C] shadow-inner flex items-center justify-center flex-shrink-0">
            <Flame className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-black text-lg leading-tight tracking-tight">{branchName}</h1>
            <p className="text-[#94a3b8] text-xs font-medium tracking-wide">Customer Registration Portal</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <span className="text-[#94a3b8] text-sm font-medium">Customers registered:</span>
          <div className="bg-[#EA580C] text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
            {registeredCount || 0}
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex justify-center py-10 px-4 sm:px-6">
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Main Form Container Card */}
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100 overflow-hidden">
            
            {/* Header Area Inside the Card */}
            <div className="px-8 sm:px-12 pt-10 pb-6">
              <h2 className="text-[#1e3a5f] text-[28px] font-bold tracking-tight mb-2">
                Customer Registration Form
              </h2>
              <p className="text-slate-500 font-medium text-[15px]">
                Fill in all required fields to register a new {branchName} customer.
              </p>
            </div>

            {/* Injected Intelligent Component handling the massive grid layout loop */}
            <div className="px-8 sm:px-12 pb-10">
              <DynamicCaptureForm subsidiaryId={id} schema={schema} />
            </div>

          </div>

          {/* Recently Registered Module matching bottom bar hook */}
          <div className="mt-8 flex items-center justify-between px-2">
            <h3 className="text-[#1e3a5f] font-bold text-lg">Recently Registered</h3>
            <span className="text-slate-400 font-medium text-sm">Latest 5 entries</span>
          </div>

        </div>
      </main>

    </div>
  )
}
