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
import { captureCustomer } from "@/app/workspace/[id]/capture/actions"
import { toast } from "sonner"
import { Loader2, UserPlus } from "lucide-react"

export function DynamicCaptureForm({ 
  subsidiaryId,
  schema
}: { 
  subsidiaryId: string;
  schema: SectionDefinition[];
}) {
  const formRef = useRef<HTMLFormElement>(null)
  
  const [state, formAction, isPending] = useActionState(captureCustomer, {
    error: "",
    success: false
  })

  // Toast notifications for success or failure
  useEffect(() => {
    if (state.error) {
      toast.error(state.error)
    }
    if (state.success) {
      toast.success("Customer Registered Successfully!")
      formRef.current?.reset() // clear form immediately
    }
  }, [state])

  return (
    <form ref={formRef} action={formAction} className="space-y-8">
      {/* Hidden input to pass the path context ID directly */}
      <input type="hidden" name="subsidiaryId" value={subsidiaryId} />

      {schema.map((section, sIdx) => (
        <div key={sIdx} className="space-y-6">
          
          {/* Section Divider with Title precisely matching UI lines */}
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-slate-200"></div>
            <h3 className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-widest leading-none">
              {section.title}
            </h3>
            <div className="flex-1 h-px bg-slate-200"></div>
          </div>

          <div className="grid grid-cols-12 gap-x-6 gap-y-6">
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
                  <Label htmlFor={field.id} className="text-xs font-bold text-[#1e3a5f] uppercase tracking-wide">
                    {field.label}{field.required && " *"}
                  </Label>
                  
                  {field.type === 'text' || field.type === 'number' || field.type === 'email' ? (
                    <Input 
                      id={field.id} 
                      name={field.id} 
                      type={field.type} 
                      required={field.required} 
                      placeholder={field.placeholder}
                      className="h-11 rounded-lg border-slate-200 text-sm shadow-sm bg-white focus:ring-slate-900"
                    />
                  ) : field.type === 'textarea' ? (
                    <Textarea 
                      id={field.id} 
                      name={field.id} 
                      required={field.required} 
                      placeholder={field.placeholder}
                      className="min-h-[100px] rounded-lg border-slate-200 text-sm shadow-sm bg-white resize-none"
                    />
                  ) : field.type === 'select' ? (
                    <Select name={field.id} required={field.required}>
                      <SelectTrigger className="h-11 rounded-lg border-slate-200 text-sm shadow-sm bg-white">
                        <SelectValue placeholder="— Select —" />
                      </SelectTrigger>
                      <SelectContent>
                        {field.options?.map((opt) => (
                          <SelectItem key={opt.value} value={opt.value}>
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
      <div className="flex justify-end gap-4 pt-6 mt-8 border-t border-slate-100">
        <Button 
          type="reset" 
          variant="outline" 
          className="h-11 px-6 rounded-lg font-semibold text-slate-500 border-slate-200 hover:bg-slate-50"
        >
          Clear Form
        </Button>
        <Button 
          type="submit" 
          disabled={isPending}
          className="h-11 px-8 rounded-lg font-bold bg-[#EA580C] hover:bg-[#C2410C] text-white shadow-sm flex items-center gap-2 transition"
        >
          {isPending && <Loader2 className="w-4 h-4 animate-spin" />}
          {!isPending && <UserPlus className="w-4 h-4" />}
          Register Customer
        </Button>
      </div>

    </form>
  )
}
