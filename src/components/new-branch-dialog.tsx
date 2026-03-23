'use client'

import * as React from "react"
import { useActionState } from "react"
import { Plus, Loader2 } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { createSubsidiary, type SubsidiaryActionState } from "@/app/admin/actions"
import { toast } from "sonner"

export function NewBranchDialog({ 
  organizations = [] 
}: { 
  organizations?: { id: string, name: string }[] 
}) {
  const [open, setOpen] = React.useState(false)
  const [state, formAction, isPending] = useActionState(createSubsidiary, { error: "", success: false } as SubsidiaryActionState)

  React.useEffect(() => {
    if (state.success) {
      toast.success("New branch created successfully!")
      setOpen(false)
    }
    if (state.error) {
      toast.error(state.error)
    }
  }, [state])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={(props) => (
        <Button {...props} variant="outline" className="h-10 border-slate-200 text-slate-700 font-bold gap-2 rounded-xl shadow-sm">
          <Plus className="w-4 h-4 text-[#FF5A20]" /> New Branch
        </Button>
      )} />
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-8 border-slate-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Add New Branch</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium pt-1">
            Register a new subsidiary branch to the Ensign Holdings network.
          </DialogDescription>
        </DialogHeader>
        <form action={formAction} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="organization_id" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
              Parent Company
            </Label>
            <Select name="organization_id" required>
              <SelectTrigger className="h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-900 bg-white">
                <SelectValue placeholder="Select parent company..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>{org.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
              Branch Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Flora Gas Bulawayo"
              className="h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-900"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
              Primary Location
            </Label>
            <Input
              id="location"
              name="location"
              placeholder="e.g. Bulawayo, CBD"
              className="h-12 rounded-xl border-slate-200 focus:border-indigo-500 focus:ring-indigo-500 font-bold text-slate-900"
            />
          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-12 bg-indigo-600 hover:bg-indigo-700 text-white font-black rounded-xl shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Subsidiary"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
