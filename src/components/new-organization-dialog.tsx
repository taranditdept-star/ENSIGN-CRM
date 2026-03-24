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
              <SelectContent className="rounded-2xl border-slate-100 shadow-2xl p-2 min-w-[280px]">
                <div className="px-3 py-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pointer-events-none">Agriculture & Energy</div>
                <SelectItem value="lpg" className="py-2.5 rounded-lg focus:bg-orange-50 focus:text-orange-600 transition-colors">Flora Gas (LPG)</SelectItem>
                <SelectItem value="sbali" className="py-2.5 rounded-lg focus:bg-orange-50 focus:text-orange-600 transition-colors">Sbali Roller Meal (Agric)</SelectItem>
                <SelectItem value="fuel" className="py-2.5 rounded-lg focus:bg-orange-50 focus:text-orange-600 transition-colors">Global Energies (Fuel)</SelectItem>
                <SelectItem value="solar" className="py-2.5 rounded-lg focus:bg-orange-50 focus:text-orange-600 transition-colors">Flora Solar & Tech (Solar)</SelectItem>
                
                <div className="px-3 py-2 mt-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pointer-events-none border-t border-slate-50 pt-3">Mining & Industry</div>
                <SelectItem value="mining" className="py-2.5 rounded-lg focus:bg-indigo-50 focus:text-indigo-600 transition-colors">Continental Treasures (Gold)</SelectItem>
                <SelectItem value="explosives" className="py-2.5 rounded-lg focus:bg-indigo-50 focus:text-indigo-600 transition-colors">Mining Explosives (Explo)</SelectItem>
                <SelectItem value="branding" className="py-2.5 rounded-lg focus:bg-indigo-50 focus:text-indigo-600 transition-colors">MountPlus (Branding/Prnt)</SelectItem>
                
                <div className="px-3 py-2 mt-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] pointer-events-none border-t border-slate-50 pt-3">Food & Retail</div>
                <SelectItem value="farming" className="py-2.5 rounded-lg focus:bg-pink-50 focus:text-pink-600 transition-colors">Ecomatt Farm (Livestock)</SelectItem>
                <SelectItem value="meat" className="py-2.5 rounded-lg focus:bg-pink-50 focus:text-pink-600 transition-colors">Ecomatt Butcheries (Meat)</SelectItem>
                <SelectItem value="bakery" className="py-2.5 rounded-lg focus:bg-pink-50 focus:text-pink-600 transition-colors">Granite Haven Bakery (Pies)</SelectItem>
                <SelectItem value="retail" className="py-2.5 rounded-lg focus:bg-pink-50 focus:text-pink-600 transition-colors">Granite Haven Groceries</SelectItem>
                
                <div className="mt-2 border-t border-slate-50 pt-2">
                  <SelectItem value="fallback" className="py-2.5 rounded-lg font-black text-slate-900">Standard CRM Module</SelectItem>
                </div>
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
