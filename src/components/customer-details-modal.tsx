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
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { 
  MessageSquare, 
  Calendar, 
  History as HistoryIcon, 
  Building2, 
  Phone, 
  Mail, 
  Clock,
  Plus,
  Loader2
} from "lucide-react"
import { addInteractionNote } from "@/app/admin/actions"
import { toast } from "sonner"

interface Note {
  id: string;
  content: string;
  timestamp: string;
  author: string;
  followUpDate?: string;
}

interface Customer {
  id: string;
  first_name: string;
  surname: string;
  phone: string;
  email: string;
  created_at: string;
  subsidiaries?: { name: string };
  customer_metadata?: Record<string, unknown>;
}

export function CustomerDetailsModal({ customer }: { customer: Customer }) {
  const [newNote, setNewNote] = useState("")
  const [followUpDate, setFollowUpDate] = useState("")
  const [isPending, setIsPending] = useState(false)
  
  // Extract notes from metadata
  const notes = (customer.customer_metadata?.notes as Note[]) || []
  
  // For the demo, we show the notes in descending order
  const sortedNotes = [...notes].sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  )

  const handleSaveNote = async () => {
    if (!newNote) return
    setIsPending(true)
    try {
      await addInteractionNote(customer.id, newNote, followUpDate)
      toast.success("Interaction log saved!")
      setNewNote("")
      setFollowUpDate("")
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : "Failed to save note"
      toast.error(message)
    } finally {
      setIsPending(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger render={<Button variant="ghost" size="sm" className="font-bold text-slate-400 hover:text-[#FF5A20]" />}>
        View Details
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-3xl border-0 shadow-2xl">
        <DialogHeader className="p-8 bg-slate-900 text-white shrink-0">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-black uppercase text-white shadow-xl backdrop-blur-md border border-white/20">
                {customer.first_name?.[0]}{customer.surname?.[0]}
              </div>
              <div>
                <DialogTitle className="text-2xl font-black tracking-tight">{customer.first_name} {customer.surname}</DialogTitle>
                <div className="flex items-center gap-2 mt-1 opacity-70">
                  <Building2 className="w-3.5 h-3.5" />
                  <span className="text-sm font-bold uppercase tracking-wider">{customer.subsidiaries?.name || 'Main Branch'}</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black uppercase tracking-widest opacity-50 mb-1">Customer ID</p>
              <p className="font-mono text-xs opacity-70">#{customer.id.split('-')[0]}</p>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto bg-[#F8FAFC]">
          <div className="grid grid-cols-12 gap-0">
            
            {/* Left Col: Info */}
            <div className="col-span-12 lg:col-span-4 p-8 space-y-8 border-r border-slate-100 bg-white">
              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Contact Details</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                    <Phone className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{customer.phone || 'None'}</span>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100/50">
                    <Mail className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-bold text-slate-700">{customer.email || 'None'}</span>
                  </div>
                </div>
              </section>

              <section className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Profile Stats</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-100/50">
                    <p className="text-[10px] font-black text-indigo-400 uppercase mb-1">Registered</p>
                    <p className="text-xs font-bold text-slate-700">{new Date(customer.created_at).toLocaleDateString()}</p>
                  </div>
                  <div className="p-3 bg-pink-50/50 rounded-xl border border-pink-100/50">
                    <p className="text-[10px] font-black text-pink-400 uppercase mb-1">Tot. Notes</p>
                    <p className="text-xs font-bold text-slate-700">{notes.length}</p>
                  </div>
                </div>
              </section>

              {/* Dynamic Metadata Section */}
              {customer.customer_metadata && Object.keys(customer.customer_metadata).filter(k => k !== 'notes').length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Subsidiary Data</h3>
                  <div className="space-y-2">
                    {Object.entries(customer.customer_metadata).map(([key, val]) => (
                      key !== 'notes' && (
                        <div key={key} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                          <span className="text-[11px] font-bold text-slate-400 uppercase">{key.replace(/([A-Z])/g, ' $1')}</span>
                          <span className="text-xs font-bold text-slate-700">{String(val)}</span>
                        </div>
                      )
                    ))}
                  </div>
                </section>
              )}
            </div>

            {/* Right Col: Interaction Feed */}
            <div className="col-span-12 lg:col-span-8 p-8 flex flex-col gap-8">
              
              {/* Add Note Section */}
              <section className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-slate-900 rounded-lg">
                    <MessageSquare className="w-4 h-4 text-white" />
                  </div>
                  <h3 className="font-bold text-slate-900">Add Interaction Note</h3>
                </div>
                
                <div className="space-y-4">
                  <Textarea 
                    placeholder="Describe the interaction, customer feedback, or request..."
                    className="min-h-[100px] rounded-xl border-slate-100 bg-slate-50 focus:bg-white transition-all resize-none font-medium placeholder:text-slate-400"
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                  />
                  
                  <div className="flex flex-col sm:flex-row gap-4 items-end">
                    <div className="flex-1 space-y-1.5 w-full">
                      <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Set Follow-up (Optional)</Label>
                      <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                          type="date" 
                          className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-slate-200 transition-all"
                          value={followUpDate}
                          onChange={(e) => setFollowUpDate(e.target.value)}
                        />
                      </div>
                    </div>
                    <Button 
                      onClick={handleSaveNote}
                      className="bg-[#FF5A20] hover:bg-[#E04D1A] text-white font-black px-6 h-10 rounded-xl shadow-lg shadow-[#FF5A20]/20 active:scale-95 transition-all w-full sm:w-auto"
                      disabled={!newNote || isPending}
                    >
                      {isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Plus className="w-4 h-4 mr-2" />}
                      Save Log
                    </Button>
                  </div>
                </div>
              </section>

              {/* Activity Timeline */}
              <section className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <HistoryIcon className="w-3.5 h-3.5" /> Interaction History
                  </h3>
                  <span className="text-[10px] px-2 py-1 bg-slate-100 rounded-full font-bold text-slate-500 uppercase">
                    Timeline
                  </span>
                </div>

                <div className="relative space-y-6 pl-6 border-l-2 border-slate-100">
                  {sortedNotes.length > 0 ? sortedNotes.map((note) => (
                    <div key={note.id} className="relative">
                      {/* Timeline Dot */}
                      <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-white border-4 border-slate-900 shadow-sm" />
                      
                      <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-[13px] font-black text-slate-900">{note.author}</span>
                            <span className="text-[10px] text-slate-400">•</span>
                            <span className="text-[11px] font-bold text-slate-400 flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {new Date(note.timestamp).toLocaleString()}
                            </span>
                          </div>
                          {note.followUpDate && (
                            <div className="px-2 py-1 bg-amber-50 rounded-lg flex items-center gap-1.5 border border-amber-100">
                              <Calendar className="w-3 h-3 text-amber-500" />
                              <span className="text-[10px] font-black text-amber-600 uppercase">Follow-up: {new Date(note.followUpDate).toLocaleDateString()}</span>
                            </div>
                          )}
                        </div>
                        <p className="text-[13px] font-medium text-slate-600 leading-relaxed italic">
                          &ldquo;{note.content}&rdquo;
                        </p>
                      </div>
                    </div>
                  )) : (
                    <div className="p-12 text-center bg-white rounded-3xl border border-dashed border-slate-200">
                      <MessageSquare className="w-10 h-10 text-slate-200 mx-auto mb-3" />
                      <p className="text-sm font-bold text-slate-400">No interaction logs yet for this customer.</p>
                      <p className="text-[11px] text-slate-300 mt-1">Capture customer feedback or track visit history above.</p>
                    </div>
                  )}
                </div>
              </section>

            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
