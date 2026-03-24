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
  email: string;
  subsidiary_id: string;
  schema_type?: string;
  customer_metadata?: Record<string, any>;
}

export function EditCustomerModal({ customer, schemaType = 'fallback' }: { customer: Customer, schemaType?: string }) {
  const [isPending, setIsPending] = useState(false)
  const [open, setOpen] = useState(false)
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    
    const formData = new FormData(e.currentTarget)
    formData.append('subsidiaryId', customer.subsidiary_id)
    
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

  const sections = subsidiarySchemas[schemaType] || subsidiarySchemas['fallback']

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all">
          <Edit3 className="w-4 h-4" />
        </Button>
      } />
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto rounded-3xl border-0 shadow-2xl p-0">
        <DialogHeader className="p-8 bg-slate-900 text-white sticky top-0 z-10">
          <DialogTitle className="text-2xl font-black tracking-tight flex items-center gap-3">
            <div className="p-2 bg-white/10 rounded-lg">
              <Edit3 className="w-5 h-5 text-white" />
            </div>
            Edit Customer Profile
          </DialogTitle>
          <p className="text-slate-400 text-sm font-medium mt-1">Update core details and subsidiary-specific information.</p>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="p-8 space-y-8 bg-white">
          {sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">
                {section.title}
              </h3>
              <div className="grid grid-cols-12 gap-4">
                {section.fields.map((field) => {
                  const defaultValue = (customer as any)[field.id] || (customer.customer_metadata as any)?.[field.id] || ""
                  
                  return (
                    <div key={field.id} className={`col-span-${field.colSpan || 12} space-y-1.5`}>
                      <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-tight">
                        {field.label} {field.required && <span className="text-rose-500">*</span>}
                      </Label>
                      
                      {field.type === 'select' ? (
                        <Select name={field.id} defaultValue={String(defaultValue)}>
                          <SelectTrigger className="h-11 rounded-xl border-slate-100 bg-slate-50 font-bold focus:ring-[#FF5A20]">
                            <SelectValue placeholder={field.placeholder} />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                            {field.options?.map(opt => (
                              <SelectItem key={opt.value} value={opt.value} className="font-bold text-slate-600 focus:bg-slate-50">
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'switch' ? (
                        <div className="flex items-center gap-2 h-11 px-3 bg-slate-50 rounded-xl border border-slate-50">
                          <Switch name={field.id} defaultChecked={!!defaultValue} />
                          <span className="text-xs font-bold text-slate-400 italic">Toggle to enable/disable</span>
                        </div>
                      ) : field.type === 'textarea' ? (
                        <Textarea 
                          name={field.id}
                          defaultValue={String(defaultValue)}
                          placeholder={field.placeholder}
                          className="min-h-[100px] rounded-xl border-slate-100 bg-slate-50 font-bold focus:ring-[#FF5A20] resize-none"
                        />
                      ) : (
                        <Input 
                          name={field.id}
                          type={field.type}
                          defaultValue={String(defaultValue)}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="h-11 rounded-xl border-slate-100 bg-slate-50 font-bold focus:ring-[#FF5A20]"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* Hidden metadata handling or extra fields */}
          <div className="pt-6 flex justify-end gap-3 sticky bottom-0 bg-white border-t border-slate-50">
            <Button 
              type="button" 
              variant="ghost" 
              onClick={() => setOpen(false)}
              className="h-12 px-6 rounded-xl font-bold text-slate-400 hover:text-slate-600 hover:bg-slate-50"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="h-12 px-8 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-black shadow-lg shadow-slate-200 transition-all active:scale-95"
            >
              {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
