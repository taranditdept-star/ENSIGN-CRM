'use client'

import * as React from "react"
import { Plus } from "lucide-react"
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
import { createOrganization } from "@/app/admin/organizations/actions"
import { toast } from "sonner"

export function NewOrganizationDialog() {
  const [open, setOpen] = React.useState(false)
  const [isPending, setIsPending] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsPending(true)
    const formData = new FormData(e.currentTarget)
    const result = await createOrganization(formData)
    setIsPending(false)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success("Organization created successfully!")
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={(props) => (
        <Button {...props} className="bg-[#FF5A20] hover:bg-[#E44E1B] text-white font-bold rounded-xl px-6">
          <Plus className="w-5 h-5 mr-2" />
          Add Organization
        </Button>
      )} />
      <DialogContent className="sm:max-w-[425px] rounded-3xl p-8 border-slate-100 shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black text-slate-900 tracking-tight">Add Group Organization</DialogTitle>
          <DialogDescription className="text-slate-500 font-medium pt-1">
            Create a top-level organization and assign its business module.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 pt-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
              Organization Name
            </Label>
            <Input
              id="name"
              name="name"
              placeholder="e.g. Flora Gas"
              className="h-12 rounded-xl border-slate-200 font-bold text-slate-900"
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="module_type" className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">
              Business Module (Form Template)
            </Label>
            <Select name="module_type" defaultValue="fallback">
              <SelectTrigger className="h-12 rounded-xl border-slate-200 font-bold text-slate-900 bg-white">
                <SelectValue placeholder="Select module..." />
              </SelectTrigger>
              <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                <SelectItem value="lpg">Flora Gas (LPG)</SelectItem>
                <SelectItem value="sbali">Sbali Roller Meal (Agriculture)</SelectItem>
                <SelectItem value="mining">Continental Treasures (Gold Mining)</SelectItem>
                <SelectItem value="explosives">Mining Explosives (Continental)</SelectItem>
                <SelectItem value="fuel">Global Energies (Fuel Logistics)</SelectItem>
                <SelectItem value="solar">Flora Solar & Tech (Solar)</SelectItem>
                <SelectItem value="branding">MountPlus / New Impetus (Branding)</SelectItem>
                <SelectItem value="farming">Ecomatt Farm (Livestock/Crops)</SelectItem>
                <SelectItem value="meat">Ecomatt Butcheries (Meat)</SelectItem>
                <SelectItem value="bakery">Granite Haven Bakery (Pies)</SelectItem>
                <SelectItem value="retail">Granite Haven Groceries (Retail)</SelectItem>
                <SelectItem value="fallback">Standard CRM Module</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter className="pt-4">
            <Button 
              type="submit" 
              disabled={isPending}
              className="w-full h-12 bg-slate-900 hover:bg-slate-800 text-white font-black rounded-xl transition-all"
            >
              {isPending ? "Creating..." : "Create Organization"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
