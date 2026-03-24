'use client'

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger 
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Edit3, Loader2, Save } from "lucide-react"
import { updateCustomerAdmin } from "@/app/admin/actions"
import { toast } from "sonner"
import { subsidiarySchemas } from "@/lib/schemas"

interface Customer {
  id: string;
  first_name: string;
  surname: string;
  phone: string;
  email?: string;
  subsidiary_id?: string;
  schema_type?: string;
  customer_metadata?: Record<string, any>;
}

interface EditCustomerModalProps {
  customer: Customer | null;
  schemaType?: string;
  subsidiaryId?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function EditCustomerModal({ 
  customer, 
  schemaType = 'fallback',
  subsidiaryId,
  open: externalOpen,
  onOpenChange: setExternalOpen 
}: EditCustomerModalProps) {
  const [isPending, setIsPending] = useState(false)
  const [internalOpen, setInternalOpen] = useState(false)
  
  const open = externalOpen !== undefined ? externalOpen : internalOpen
  const setOpen = setExternalOpen || setInternalOpen

  if (!customer && open) return null // Should not happen but for safety

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!customer) return
    
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append('subsidiaryId', subsidiaryId || customer.subsidiary_id || '')
    
    try {
      await updateCustomerAdmin(customer.id, formData)
      toast.success("Customer updated successfully!")
      setOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to update customer")
    } finally {
      setIsPending(false)
    }
  }

  // Determine schema type
  const actualSchemaType = schemaType || customer?.schema_type || 'fallback'
  const sections = subsidiarySchemas[actualSchemaType] || subsidiarySchemas['fallback']

  // If no customer and not open, still need to render the trigger part if not in controlled mode
  if (!customer && !externalOpen) {
    return (
      <Dialog open={internalOpen} onOpenChange={setInternalOpen}>
        <DialogTrigger render={
          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Edit3 className="w-4 h-4" />
          </Button>
        } />
      </Dialog>
    )
  }

  if (!customer) return null

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {/* Only show trigger if not in controlled mode */}
      {externalOpen === undefined && (
        <DialogTrigger render={
          <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
            <Edit3 className="w-4 h-4" />
          </Button>
        } />
      )}
      <DialogContent className="sm:max-w-[720px] max-h-[85vh] overflow-hidden rounded-[40px] border-0 shadow-[0_32px_128px_-16px_rgba(0,0,0,0.3)] p-0 flex flex-col transition-all duration-500 ease-out animate-in fade-in zoom-in-95">
        <DialogHeader className="p-12 bg-[#0F172A] text-white shrink-0 relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-[#FF5A20]/20 blur-[100px] -mr-40 -mt-40 rounded-full animate-pulse" />
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-indigo-500/10 blur-[60px] -ml-20 -mb-20 rounded-full" />
          
          <div className="relative z-10 flex items-center justify-between">
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-white/10 rounded-[22px] flex items-center justify-center backdrop-blur-2xl border border-white/20 shadow-2xl ring-4 ring-white/5">
                  <Edit3 className="w-7 h-7 text-[#FF5A20]" />
                </div>
                <div>
                  <DialogTitle className="text-3xl font-black tracking-tight text-white">Edit Profile</DialogTitle>
                  <p className="text-slate-400 text-sm font-bold mt-0.5">Management Portal</p>
                </div>
              </div>
              <p className="text-slate-400 text-[13px] font-medium leading-relaxed max-w-[420px]">
                Modifying administrative records for <span className="text-white font-bold bg-white/10 px-2 py-0.5 rounded-lg border border-white/10">{customer.first_name} {customer.surname}</span>.
              </p>
            </div>
            <div className="text-right hidden sm:block">
              <div className="px-4 py-3 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-md">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] block mb-1">Entry ID</span>
                <span className="font-mono text-sm text-[#FF5A20] font-bold">#{customer.id.split('-')[0].toUpperCase()}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto px-12 py-10 bg-[#F8FAFC]">
          <style dangerouslySetInnerHTML={{ __html: `
            .custom-scrollbar::-webkit-scrollbar { width: 6px; }
            .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            .custom-scrollbar::-webkit-scrollbar-thumb { background: #E2E8F0; border-radius: 10px; }
            .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #CBD5E1; }
          `}} />
          <form id="edit-customer-form" onSubmit={handleSubmit} className="space-y-14 custom-scrollbar">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">
                {section.title}
              </h3>
              <div className="grid grid-cols-12 gap-4">
                {section.fields.map((field) => {
                  const defaultValue = (customer as any)[field.id] || (customer.customer_metadata as any)?.[field.id] || ""
                  
                  const colSpanClass = 
                    field.colSpan === 6 ? "col-span-6" : 
                    field.colSpan === 4 ? "col-span-4" : 
                    "col-span-12"

                  return (
                    <div key={field.id} className={`${colSpanClass} space-y-2`}>
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">
                        {field.label} {field.required && <span className="text-rose-500">*</span>}
                      </Label>
                      
                      {field.type === 'select' ? (
                        <Select name={field.id} defaultValue={String(defaultValue)}>
                          <SelectTrigger className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus:ring-2 focus:ring-[#FF5A20]/20 hover:border-slate-200 transition-all">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent className="rounded-2xl border-slate-100 shadow-2xl overflow-hidden">
                            {field.options?.map(opt => (
                              <SelectItem key={opt.value} value={opt.value} className="font-bold text-slate-600 py-3 focus:bg-slate-50">
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'switch' ? (
                        <div className="flex items-center justify-between h-12 px-4 bg-slate-50/50 rounded-2xl border border-slate-100 hover:border-slate-200 transition-all">
                          <span className="text-[11px] font-bold text-slate-400 italic">Enable Option</span>
                          <Switch name={field.id} defaultChecked={!!defaultValue} />
                        </div>
                      ) : field.type === 'textarea' ? (
                        <Textarea 
                          name={field.id}
                          defaultValue={String(defaultValue)}
                          placeholder={field.placeholder}
                          className="min-h-[120px] rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus:ring-2 focus:ring-[#FF5A20]/20 resize-none hover:border-slate-200 transition-all p-4"
                        />
                      ) : (
                        <Input 
                          name={field.id}
                          type={field.type}
                          defaultValue={String(defaultValue)}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 font-bold focus:ring-2 focus:ring-[#FF5A20]/20 hover:border-slate-200 transition-all px-4"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}
          </form>
        </div>

        <div className="p-8 bg-white border-t border-slate-100 flex justify-end gap-4 shrink-0 px-10">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setOpen(false)}
            className="h-14 px-8 rounded-2xl font-black text-slate-400 hover:text-slate-900 hover:bg-slate-50 transition-all active:scale-95"
          >
            Cancel
          </Button>
          <Button 
            form="edit-customer-form"
            type="submit" 
            disabled={isPending}
            className="h-14 px-10 rounded-2xl bg-[#0F172A] hover:bg-[#1E293B] text-white font-black shadow-xl shadow-slate-200 transition-all active:scale-95 flex items-center gap-3"
          >
            {isPending ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                <Save className="w-5 h-5" />
                <span>Save Changes</span>
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
