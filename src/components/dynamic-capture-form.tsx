'use client'

import { useActionState, useEffect } from 'react'
import { captureCustomer } from '@/app/workspace/[id]/capture/actions'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { SubsidiarySchema } from '@/lib/schemas'
import { toast } from 'sonner'
import { Loader2, CheckCircle2 } from 'lucide-react'

export function DynamicCaptureForm({ schema, subsidiaryId }: { schema: SubsidiarySchema, subsidiaryId: string }) {
  const [state, formAction, isPending] = useActionState(
    captureCustomer.bind(null, subsidiaryId),
    null
  )

  useEffect(() => {
    if (state?.success) {
      toast.success(state.message)
      // Form resets automatically via native HTML form behavior if we used a ref, 
      // but keeping the data lets the user easily see what they submitted for this PoC.
    }
    if (state?.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <form action={formAction} className="space-y-8 animate-in fade-in duration-500">
      
      {/* Universal Fields */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-slate-100">1</div>
          <h2 className="text-lg font-bold text-slate-900">Standard Customer Data</h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-5">
          <div className="space-y-2">
            <Label htmlFor="first_name" className="text-slate-700 font-semibold">First Name <span className="text-red-500">*</span></Label>
            <Input id="first_name" name="first_name" required placeholder="Jane" className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-slate-400 h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="last_name" className="text-slate-700 font-semibold">Last Name</Label>
            <Input id="last_name" name="last_name" placeholder="Doe" className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-slate-400 h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone_number" className="text-slate-700 font-semibold">Phone Number <span className="text-red-500">*</span></Label>
            <Input id="phone_number" name="phone_number" required placeholder="+263 77 123 4567" className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-slate-400 h-11" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-slate-700 font-semibold">Email Address</Label>
            <Input id="email" type="email" name="email" placeholder="jane@example.com" className="bg-slate-50 border-slate-200 focus:bg-white focus:ring-slate-400 h-11" />
          </div>
        </div>
      </div>

      {/* Dynamic Fields */}
      <div className="bg-indigo-50/40 p-6 rounded-xl border border-indigo-100 shadow-sm space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
        <div className="flex items-center gap-2 mb-4 relative z-10">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-sm ring-2 ring-indigo-200">2</div>
          <h2 className="text-lg font-bold text-indigo-900">{schema.name} Specifics</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6 relative z-10">
          {schema.fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name} className="text-indigo-950 font-semibold">
                {field.label} {field.required && <span className="text-red-500">*</span>}
              </Label>
              
              {field.type === 'select' ? (
                <Select name={field.name} required={field.required}>
                  <SelectTrigger className="bg-white border-indigo-200 focus:ring-indigo-500 h-11 rounded-lg">
                    <SelectValue placeholder={`Select ${field.label.toLowerCase()}...`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map(opt => (
                      <SelectItem key={opt} value={opt} className="cursor-pointer">{opt}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'date' ? (
                <Input type="date" id={field.name} name={field.name} required={field.required} className="bg-white border-indigo-200 focus:ring-indigo-500 h-11 rounded-lg" />
              ) : field.type === 'number' ? (
                <Input type="number" id={field.name} name={field.name} required={field.required} placeholder={`Enter ${field.label.toLowerCase()}`} className="bg-white border-indigo-200 focus:ring-indigo-500 h-11 rounded-lg" />
              ) : (
                <Input type="text" id={field.name} name={field.name} required={field.required} placeholder={`e.g. Value for ${field.label}`} className="bg-white border-indigo-200 focus:ring-indigo-500 h-11 rounded-lg" />
              )}
            </div>
          ))}
        </div>
      </div>

      {state?.error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm font-semibold shadow-sm">
          {state.error}
        </div>
      )}

      {state?.success && (
        <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-700 text-sm font-semibold flex items-center gap-2 shadow-sm">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          {state.message}
        </div>
      )}

      <div className="pt-2 flex justify-end">
        <Button 
          type="submit" 
          disabled={isPending}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-8 h-12 rounded-xl shadow-lg shadow-indigo-600/20 transition-all text-base"
        >
          {isPending ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving Customer...</>
          ) : (
            'Capture Customer Record'
          )}
        </Button>
      </div>

    </form>
  )
}
