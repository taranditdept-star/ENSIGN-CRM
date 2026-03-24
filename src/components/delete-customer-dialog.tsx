'use client'

import { useState } from "react"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Trash2, Loader2, AlertTriangle } from "lucide-react"
import { deleteCustomer } from "@/app/admin/actions"
import { toast } from "sonner"

export function DeleteCustomerDialog({ customerId, customerName }: { customerId: string, customerName: string }) {
  const [isPending, setIsPending] = useState(false)
  const [open, setOpen] = useState(false)

  const handleDelete = async () => {
    setIsPending(true)
    try {
      await deleteCustomer(customerId)
      toast.success("Customer record deleted successfully.")
      setOpen(false)
    } catch (error: any) {
      toast.error(error.message || "Failed to delete customer")
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={
        <Button variant="ghost" size="icon" className="h-9 w-9 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-all">
          <Trash2 className="w-4 h-4" />
        </Button>
      } />
      <DialogContent className="rounded-3xl border-0 shadow-2xl p-0 overflow-hidden sm:max-w-[450px]">
        <div className="p-8 bg-rose-50 flex flex-col items-center text-center gap-4 border-b border-rose-100">
          <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm border border-rose-100">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div>
            <DialogTitle className="text-xl font-black text-slate-900 tracking-tight">Delete Customer Record?</DialogTitle>
            <p className="text-slate-500 font-medium mt-1 text-sm">
              Are you sure you want to delete <span className="text-slate-900 font-bold underline decoration-rose-200 underline-offset-2">{customerName}</span>? This action is permanent and cannot be undone.
            </p>
          </div>
        </div>
        <DialogFooter className="p-6 bg-white flex sm:justify-center gap-3">
          <Button 
            variant="ghost" 
            onClick={() => setOpen(false)}
            className="h-12 px-6 rounded-xl font-bold text-slate-400 hover:text-slate-600"
          >
            Cancel
          </Button>
          <Button 
            onClick={handleDelete}
            disabled={isPending}
            className="h-12 px-8 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black shadow-lg shadow-rose-200 transition-all active:scale-95 border-0"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Trash2 className="w-4 h-4 mr-2" />}
            Confirm Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
