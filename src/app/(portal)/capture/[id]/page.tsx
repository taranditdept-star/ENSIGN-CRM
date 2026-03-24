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

  const branchName = subsidiary?.name || 
    (id.startsWith('f') ? "Flora Gas" : 
     id.startsWith('s') ? "Sbali Roller Meal" : 
     id.startsWith('m') ? "Continental Mining" :
     id.startsWith('e') ? "Global Energies Fuel" :
     id.startsWith('b') ? "Granite Haven Bakery" :
     id.startsWith('fo') ? "Ecomatt Foods" : "Ensign Branch")
  
  const schemaType = subsidiary?.schema_type || 
    (id.startsWith('f') ? "lpg" : 
     id.startsWith('s') ? "sbali" : 
     id.startsWith('m') ? "mining" :
     id.startsWith('e') ? "fuel" :
     id.startsWith('b') ? "bakery" :
     id.startsWith('fo') ? "food" : "fallback")

  const schema = subsidiarySchemas[schemaType] || subsidiarySchemas.fallback

  // Premium Branded Theme Logic
  const theme: Record<string, { bg: string; accent: string; gradient: string }> = {
    lpg: { bg: 'bg-[#1e3a5f]', accent: '#EA580C', gradient: 'from-slate-900 via-[#1e3a5f] to-indigo-950' },
    sbali: { bg: 'bg-[#0F172A]', accent: '#EC4899', gradient: 'from-slate-950 via-[#0F172A] to-[#1E1B4B]' },
    mining: { bg: 'bg-[#0F172A]', accent: '#D97706', gradient: 'from-slate-950 via-stone-900 to-amber-950' },
    fuel: { bg: 'bg-[#0F172A]', accent: '#0EA5E9', gradient: 'from-slate-950 via-[#0F172A] to-sky-950' },
    bakery: { bg: 'bg-[#FDFCFB]', accent: '#F59E0B', gradient: 'from-amber-50 via-orange-50 to-white' },
    fallback: { bg: 'bg-[#F0F2F5]', accent: '#6366F1', gradient: 'from-slate-50 via-indigo-50 to-white' }
  }

  const activeTheme = theme[schemaType] || theme.fallback

  return (
    <div className={`min-h-screen ${activeTheme.bg} bg-gradient-to-br ${activeTheme.gradient} flex flex-col font-sans transition-colors duration-700 selection:bg-indigo-500 selection:text-white`}>
      
      {/* Decorative Orbs for Premium Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-500/10 blur-[120px] rounded-full"></div>
      </div>
      
      {/* High-Fidelity Transparent Header */}
      <header className="h-20 flex items-center justify-between px-6 shrink-0 relative z-20 w-full border-b border-white/5 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-orange-600 to-orange-400 shadow-xl shadow-orange-950/20 flex items-center justify-center flex-shrink-0 animate-bounce-subtle">
            <Flame className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-white font-black text-xl sm:text-2xl leading-tight tracking-tight drop-shadow-sm uppercase italic">{branchName}</h1>
            <p className="text-white/40 text-[10px] font-black tracking-[0.2em] uppercase">Group Member Portal</p>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-1">
          <span className="text-white/30 text-[10px] font-black uppercase tracking-widest hidden sm:block">Registered</span>
          <div className="bg-white/10 backdrop-blur-md text-white text-sm font-black px-4 py-1.5 rounded-full border border-white/5 shadow-inner">
             <span className="text-orange-400 pr-1">{registeredCount || 0}</span> Members
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex justify-center py-6 sm:py-10 px-4 sm:px-6">
        <div className="w-full max-w-4xl animate-in fade-in slide-in-from-bottom-4 duration-700">
          
          {/* Premium Glassmorphic Card */}
          <div className="bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl shadow-black/20 border border-white/5 overflow-hidden backdrop-saturate-150">
            
            {/* Header Area Inside the Card */}
            <div className="px-8 sm:px-14 pt-10 sm:pt-14 pb-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-600/10 blur-[80px] rounded-full translate-x-1/2 -translate-y-1/2"></div>
              
              <h2 className="text-white text-3xl sm:text-4xl font-black tracking-tighter mb-4 selection:bg-orange-500">
                {schemaType === 'sbali' ? 'Roller Meal Capture' : 'Branch Registration'}
              </h2>
              <div className="h-1.5 w-24 bg-orange-600 rounded-full mb-6"></div>
              <p className="text-white/50 font-bold text-base sm:text-lg max-w-xl leading-relaxed">
                {schemaType === 'sbali' ? 'Direct secure data entry for the SBali distribution network.' : `Fill in all required fields to register a new ${branchName} customer.`}
              </p>
            </div>

            {/* Injected Intelligent Component handling the massive grid layout loop */}
            <div className="px-8 sm:px-14 pb-14">
              <DynamicCaptureForm subsidiaryId={id} schema={schema} isDark={true} />
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
