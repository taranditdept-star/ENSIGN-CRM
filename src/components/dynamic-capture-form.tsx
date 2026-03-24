'use client'

import { useActionState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { SectionDefinition } from "@/lib/schemas"
import { captureCustomer, ActionState } from "@/app/workspace/[id]/capture/actions"
import { toast } from "sonner"
import { Loader2, UserPlus } from "lucide-react"

export function DynamicCaptureForm({ 
  subsidiaryId,
  schema,
  isDark = false
}: { 
  subsidiaryId: string;
  schema: SectionDefinition[];
  isDark?: boolean;
}) {
  const formRef = useRef<HTMLFormElement>(null)
  
  const [state, formAction, isPending] = useActionState(captureCustomer, {
    error: "",
    success: false
  } as ActionState)

  // Toast notifications for success or failure
  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
      // Haptic feedback for error (double pulse)
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate([50, 50, 50])
      }
    }
    if (state.success) {
      toast.success("Customer Registered Successfully!")
      
      // Haptic feedback for success (short pulse)
      if (typeof window !== 'undefined' && window.navigator.vibrate) {
        window.navigator.vibrate(20)
      }

      // Play subtle success sound
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2432/2432-preview.mp3')
      audio.volume = 0.2
      audio.play().catch(() => {}) // Ignore if browser blocks auto-play

      formRef.current?.reset() 
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      {/* Hidden input to pass the path context ID directly */}
      <input type="hidden" name="subsidiaryId" value={subsidiaryId} />

      {schema.map((section, sIdx) => (
        <div key={sIdx} className="space-y-6">
          
          {/* Section Divider with Title precisely matching UI lines */}
          <div className="flex items-center gap-6">
            <h3 className={`text-[11px] font-black ${isDark ? 'text-white' : 'text-slate-500'} uppercase tracking-[0.3em] leading-none whitespace-nowrap`}>
              {section.title}
            </h3>
            <div className={`flex-1 h-px ${isDark ? 'bg-white/10' : 'bg-slate-200'}`}></div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-5 md:gap-y-6">
            {section.fields.map((field) => {
              // Dynamic tailwind column spans
              const colClass = 
                field.colSpan === 12 ? 'col-span-12' : 
                field.colSpan === 6 ? 'col-span-12 md:col-span-6' : 
                'col-span-12 md:col-span-6 lg:col-span-4'

              // Check if Switch/Toggle to layout differently
              if (field.type === 'switch') {
                return (
                  <div key={field.id} className={`${colClass} flex items-center justify-between p-4 bg-slate-50 border border-slate-100 rounded-xl`}>
                    <Label htmlFor={field.id} className="text-[13px] font-medium text-slate-700">
                      {field.label}{field.required && " *"}
                    </Label>
                    <Switch id={field.id} name={field.id} value="true" />
                  </div>
                )
              }

              return (
                   <div key={field.id} className={`${colClass} flex flex-col gap-2`}>
                  <Label htmlFor={field.id} className={`text-[11px] font-black ${isDark ? 'text-slate-400' : 'text-[#1e3a5f]'} uppercase tracking-widest flex items-center gap-1.5`}>
                    {field.label}
                    {field.required && <span className="text-red-500 text-lg leading-none">*</span>}
                  </Label>
                  
                  {field.type === 'text' || field.type === 'number' || field.type === 'email' ? (
                    <div className="relative group/input">
                      <Input 
                        id={field.id} 
                        name={field.id} 
                        type={field.type} 
                        required={field.required} 
                        placeholder={field.placeholder}
                        className={`h-14 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-900'} text-base shadow-inner focus:ring-2 focus-visible:ring-[var(--brand-accent)] transition-all`}
                        style={{'--brand-accent-glow': 'rgba(99, 102, 241, 0.2)'} as React.CSSProperties}
                      />
                      {/* Interactive Validation Visual (Conceptual) */}
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-focus-within/input:opacity-100 transition-opacity pointer-events-none">
                         <div className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-tighter ${isDark ? 'bg-white/10 text-white/40' : 'bg-slate-100 text-slate-400'}`}>
                           Validated
                         </div>
                      </div>
                    </div>
                   ) : field.type === 'textarea' ? (
                    <Textarea 
                      id={field.id} 
                      name={field.id} 
                      required={field.required} 
                      placeholder={field.placeholder}
                      className={`min-h-[140px] rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 text-white placeholder:text-white/20 focus:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-900'} text-base shadow-inner resize-none focus:ring-2 focus:ring-orange-500/50 transition-all`}
                    />
                  ) : field.type === 'select' ? (
                    <Select name={field.id} required={field.required}>
                      <SelectTrigger className={`h-14 rounded-2xl border ${isDark ? 'bg-white/5 border-white/10 text-white focus:bg-white/10' : 'bg-slate-50 border-slate-200 text-slate-900'} text-base shadow-inner focus:ring-2 focus:ring-orange-500/50 transition-all text-left`}>
                        <SelectValue placeholder="— Select —" />
                      </SelectTrigger>
                      <SelectContent className={isDark ? 'bg-[#0F172A] border-white/10 text-white backdrop-blur-3xl' : ''}>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value} className={isDark ? 'focus:bg-white/10 focus:text-white py-3' : 'py-3'}>
                            {opt.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : null}
                </div>
              )
            })}
          </div>
        </div>
      ))}

      {/* Action Buttons exactly aligned with mockup */}
      <div className={`flex flex-col sm:flex-row justify-end gap-3 sm:gap-4 pt-10 mt-8 border-t ${isDark ? 'border-slate-800' : 'border-slate-100'}`}>
        <Button 
          type="reset" 
          variant="outline" 
          className={`h-14 sm:h-11 px-6 rounded-xl font-bold ${isDark ? 'bg-[#334155] border-slate-600 text-slate-300 hover:bg-[#475569]' : 'text-slate-400 border-slate-200 hover:bg-slate-50'}`}
        >
          Clear Form
        </Button>
        <Button 
          type="submit" 
          disabled={isPending}
          className={`h-14 sm:h-12 px-10 rounded-xl font-black shadow-lg flex items-center justify-center gap-2 transition-all active:scale-95 text-base sm:text-sm text-white shadow-[var(--brand-accent-glow)]`}
          style={{ 
            backgroundColor: 'var(--brand-accent, #6366F1)',
            filter: isPending ? 'brightness(0.8)' : 'none'
          }}
        >
          {isPending ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <>
              <UserPlus className="w-5 h-5" />
              {isDark ? 'Submit Customer Information' : 'Commit Registration'}
            </>
          )}
        </Button>
      </div>

    </form>
  )
}
