'use client'

import { useState, useActionState, useEffect } from 'react'
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription,
  DialogFooter
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
import { subsidiarySchemas } from "@/lib/schemas"
import { updateCustomer, ActionState } from "@/app/workspace/[id]/customers/actions"
import { toast } from "sonner"
import { Loader2 } from "lucide-react"

type Customer = {
  id: string
  first_name: string
  surname: string
  phone: string
  gender: string | null
  physical_address: string | null
  customer_metadata?: Record<string, any>
}

interface EditCustomerModalProps {
  customer: Customer | null
  subsidiaryId: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EditCustomerModal({ customer, subsidiaryId, open, onOpenChange }: EditCustomerModalProps) {
  const schema = subsidiarySchemas[subsidiaryId] || subsidiarySchemas["fallback"]
  const initialState: ActionState = {}
  
  // Wrap updateCustomer in a function that passes necessary IDs
  const updateWithIds = async (prevState: ActionState, formData: FormData) => {
    if (!customer) return { error: "No customer selected" }
    return await updateCustomer(customer.id, subsidiaryId, prevState, formData)
  }

  const [state, action, isPending] = useActionState(updateWithIds, initialState)

  useEffect(() => {
    if (state.success) {
      toast.success(state.message || "Customer updated successfully")
      onOpenChange(false)
    } else if (state.error) {
      toast.error(state.error)
    }
  }, [state, onOpenChange])

  if (!customer) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto rounded-3xl border-slate-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Edit Customer Record</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium pt-1">
            Update the profile for {customer.first_name} {customer.surname}.
          </DialogDescription>
        </DialogHeader>

        <form action={action} className="space-y-8 py-4">
          {schema.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-50 pb-2">
                {section.title}
              </h3>
              <div className="grid grid-cols-12 gap-x-6 gap-y-4">
                {section.fields.map((field) => {
                  // Determine initial value from customer core fields or metadata
                  const coreMap: Record<string, any> = {
                    firstName: customer.first_name,
                    surname: customer.surname,
                    phone: customer.phone,
                    physicalAddress: customer.physical_address,
                    gender: customer.gender
                  }
                  
                  const value = coreMap[field.id] ?? customer.customer_metadata?.[field.id] ?? ""

                  return (
                    <div key={field.id} className={`${field.colSpan === 12 ? 'col-span-12' : field.colSpan === 6 ? 'col-span-12 sm:col-span-6' : 'col-span-12 sm:col-span-4'} space-y-2`}>
                      <Label htmlFor={field.id} className="text-[13px] font-bold text-slate-700 ml-1">
                        {field.label} {field.required && <span className="text-red-500">*</span>}
                      </Label>

                      {field.type === 'switch' ? (
                        <div className="flex items-center space-x-2 pt-1 uppercase">
                           <Switch 
                            id={field.id} 
                            name={field.id} 
                            defaultChecked={Boolean(value)}
                          />
                          <span className="text-xs font-black text-slate-400">Enable Toggle</span>
                        </div>
                      ) : field.type === 'select' ? (
                        <Select name={field.id} defaultValue={String(value)}>
                          <SelectTrigger className="h-11 rounded-xl border-slate-200 bg-slate-50/50 font-semibold focus:ring-indigo-500/20">
                            <SelectValue placeholder={field.placeholder || "Select option"} />
                          </SelectTrigger>
                          <SelectContent className="rounded-xl border-slate-100 shadow-lg">
                            {field.options?.map(opt => (
                              <SelectItem key={opt.value} value={opt.value} className="font-medium focus:bg-indigo-50 rounded-lg m-1">
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      ) : field.type === 'textarea' ? (
                        <Textarea 
                          id={field.id}
                          name={field.id}
                          defaultValue={String(value)}
                          placeholder={field.placeholder}
                          className="min-h-[100px] rounded-xl border-slate-200 bg-slate-50/50 focus:ring-indigo-500/20 font-medium resize-none"
                        />
                      ) : (
                        <Input 
                          id={field.id}
                          name={field.id}
                          type={field.type}
                          defaultValue={String(value)}
                          placeholder={field.placeholder}
                          required={field.required}
                          className="h-11 rounded-xl border-slate-200 bg-slate-50/50 focus:ring-indigo-500/20 font-semibold tabular-nums"
                        />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          <DialogFooter className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-slate-50">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => onOpenChange(false)}
              className="h-12 rounded-2xl border-slate-200 font-bold px-8 hover:bg-slate-50"
            >
              Discard Changes
            </Button>
            <Button 
              type="submit" 
              disabled={isPending}
              className="h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold px-10 shadow-xl shadow-slate-200 disabled:opacity-70"
            >
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating...
                </>
              ) : (
                "Save Customer Record"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
