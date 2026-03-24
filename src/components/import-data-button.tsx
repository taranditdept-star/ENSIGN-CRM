'use client'

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter
} from "@/components/ui/dialog"
import { 
  Upload, 
  FileSpreadsheet, 
  CheckCircle2, 
  AlertCircle, 
  ArrowRight,
  Loader2
} from "lucide-react"
import { toast } from "sonner"
import { subsidiarySchemas } from "@/lib/schemas"
import { importCustomers } from "@/app/workspace/[id]/customers/actions"

interface ImportDataButtonProps {
  subsidiaryId: string;
  schemaType?: string;
}

export function ImportDataButton({ subsidiaryId, schemaType = "fallback" }: ImportDataButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [step, setStep] = useState(1) // 1: Upload, 2: Mapping, 3: Success
  const [headers, setHeaders] = useState<string[]>([])
  const [rows, setRows] = useState<string[][]>([])
  const [mapping, setMapping] = useState<Record<string, string>>({})
  const [isImporting, setIsImporting] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const schema = subsidiarySchemas[schemaType] || subsidiarySchemas.fallback
  const allFields = [
    { id: "first_name", label: "First Name", required: true },
    { id: "surname", label: "Surname", required: true },
    { id: "phone", label: "Phone Number", required: true },
    { id: "email", label: "Email Address" },
    { id: "gender", label: "Gender" },
    { id: "physical_address", label: "Physical Address" },
    // Dynamic fields from schema
    ...schema.flatMap(s => s.fields.map(f => ({ id: f.id, label: f.label })))
  ]

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      if (selectedFile.type !== "text/csv" && !selectedFile.name.endsWith(".csv")) {
        toast.error("Please upload a valid CSV file")
        return
      }
      parseCSV(selectedFile)
    }
  }

  const parseCSV = (file: File) => {
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      const lines = text.split(/\r?\n/).filter(line => line.trim())
      if (lines.length < 2) {
        toast.error("CSV must have a header row and at least one data row")
        return
      }

      // Simple CSV parser handling quotes
      const parseLine = (line: string) => {
        const result = []
        let current = ""
        let inQuotes = false
        for (let i = 0; i < line.length; i++) {
          const char = line[i]
          if (char === '"') inQuotes = !inQuotes
          else if (char === ',' && !inQuotes) {
            result.push(current.trim())
            current = ""
          } else {
            current += char
          }
        }
        result.push(current.trim())
        return result
      }

      const csvHeaders = parseLine(lines[0])
      const csvRows = lines.slice(1).map(parseLine)
      
      setHeaders(csvHeaders)
      setRows(csvRows)
      
      // Auto-mapping logic (fuzzy match)
      const initialMapping: Record<string, string> = {}
      allFields.forEach(field => {
        const match = csvHeaders.find(h => 
          h.toLowerCase().includes(field.label.toLowerCase()) || 
          h.toLowerCase().includes(field.id.toLowerCase())
        )
        if (match) initialMapping[field.id] = match
      })
      setMapping(initialMapping)
      setStep(2)
    }
    reader.readAsText(file)
  }

  const handleImport = async () => {
    // Validate required fields are mapped
    const missing = allFields.filter(f => f.required && !mapping[f.id])
    if (missing.length > 0) {
      toast.error(`Please map required fields: ${missing.map(f => f.label).join(", ")}`)
      return
    }

    setIsImporting(true)
    try {
      // Prepare data for server action
      const importedData: Record<string, unknown>[] = rows.map(row => {
        const record: Record<string, unknown> = {}
        Object.entries(mapping).forEach(([fieldId, csvHeader]) => {
          const headerIdx = headers.indexOf(csvHeader)
          if (headerIdx !== -1) {
            record[fieldId] = row[headerIdx]
          }
        })
        return record
      })

      const res = await importCustomers(subsidiaryId, importedData)
      if (res.error) throw new Error(res.error)
      
      toast.success(res.message || "Import successful!")
      setStep(3)
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Import failed"
      toast.error(message)
    } finally {
      setIsImporting(false)
    }
  }

  const reset = () => {
    setStep(1)
    setMapping({})
    setHeaders([])
    setRows([])
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      setIsOpen(open)
      if (!open) setTimeout(reset, 500)
    }}>
      <DialogTrigger render={<Button variant="outline" className="h-10 px-5 rounded-lg border-slate-200 text-slate-600 font-bold hover:bg-slate-50 transition-all active:scale-95" />}>
        Bulk Import
      </DialogTrigger>
      
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-hidden flex flex-col p-0 rounded-3xl border-0 shadow-2xl">
        <DialogHeader className="p-8 bg-slate-900 text-white shrink-0">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center text-white border border-white/10">
                <FileSpreadsheet className="w-6 h-6" />
             </div>
             <div>
                <DialogTitle className="text-2xl font-black text-white tracking-tight">Bulk Customer Onboarding</DialogTitle>
                <div className="flex items-center gap-2 mt-1 opacity-60">
                   <div className={`w-2 h-2 rounded-full ${step === 1 ? 'bg-indigo-400 animate-pulse' : 'bg-green-400'}`}></div>
                   <span className="text-xs font-bold uppercase tracking-widest">{step === 1 ? 'Upload CSV' : step === 2 ? 'Map Columns' : 'Complete'}</span>
                </div>
             </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto p-8 bg-[#F8FAFC]">
          {step === 1 && (
            <div className="py-20 border-3 border-dashed border-slate-200 rounded-3xl bg-white flex flex-col items-center justify-center text-center px-10 hover:border-indigo-400 transition-all group cursor-pointer" onClick={() => fileInputRef.current?.click()}>
              <div className="w-20 h-20 rounded-full bg-slate-50 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                 <Upload className="w-8 h-8 text-slate-300 group-hover:text-indigo-500" />
              </div>
              <h4 className="text-xl font-black text-slate-800 mb-2">Select your Data File</h4>
              <p className="text-slate-500 font-medium mb-8 max-w-sm">Upload a CSV file containing your legacy customer list. We&apos;ll help you map the columns next.</p>
              
              <Button className="bg-slate-900 text-white font-bold h-12 px-8 rounded-xl shadow-lg">
                Choose File (.csv)
              </Button>
              <input 
                type="file" 
                ref={fileInputRef} 
                onChange={handleFileChange} 
                className="hidden" 
                accept=".csv" 
              />
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
               <div className="bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-4">
                  <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                     <p className="text-sm font-bold text-amber-900">Step 2: Column Mapping</p>
                     <p className="text-xs font-semibold text-amber-700 mt-0.5">We identified {headers.length} columns and {rows.length} records. Match them to the CRM fields below.</p>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {allFields.map((field) => (
                    <div key={field.id} className="bg-white p-4 rounded-2xl border border-slate-200/50 shadow-sm flex flex-col gap-2">
                       <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                          {field.label}{field.required && <span className="text-red-500 ml-1">*</span>}
                       </Label>
                       <select 
                         className="w-full bg-slate-50 border border-slate-100 rounded-xl h-10 px-3 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-100 transition-all"
                         value={mapping[field.id] || ""}
                         onChange={(e) => setMapping({...mapping, [field.id]: e.target.value})}
                       >
                          <option value="">— Unmapped —</option>
                          {headers.map(h => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                       </select>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {step === 3 && (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm text-center px-10">
               <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-8 border-4 border-white shadow-xl">
                  <CheckCircle2 className="w-10 h-10 text-green-500" />
               </div>
               <h4 className="text-3xl font-black text-slate-900 mb-2">Import Successful!</h4>
               <p className="text-slate-500 font-medium max-w-md">Successfully onboarded {rows.length} customers into the {subsidiaryId.split('-')[0]} vault.</p>
            </div>
          )}
        </div>

        <DialogFooter className="p-8 border-t border-slate-100 bg-white shrink-0">
          <div className="flex w-full items-center justify-between">
            {step === 2 && (
               <Button variant="ghost" onClick={reset} className="text-slate-400 font-bold hover:text-slate-600">
                  Abandon Import
               </Button>
            )}
            <div className="ml-auto flex gap-3">
               {step === 2 && (
                  <Button 
                    onClick={handleImport} 
                    disabled={isImporting}
                    className="bg-[#EA580C] hover:bg-[#C2410C] text-white font-black h-12 px-10 rounded-xl shadow-lg shadow-[#EA580C]/20 transition-all active:scale-95"
                  >
                     {isImporting ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <ArrowRight className="w-4 h-4 mr-2" />}
                     Commit Import
                  </Button>
               )}
               {step === 3 && (
                  <Button onClick={() => setIsOpen(false)} className="bg-slate-900 text-white font-bold h-12 px-10 rounded-xl shadow-lg">
                    Back to Database
                  </Button>
               )}
            </div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
