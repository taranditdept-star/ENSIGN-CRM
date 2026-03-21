'use client'

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { toast } from "sonner"

interface Customer {
  id: string
  first_name: string
  surname: string
  phone: string
  gender: string | null
  physical_address: string | null
  created_at: string
  customer_metadata?: Record<string, any>
}

interface ExportDataButtonProps {
  data: Customer[] | null
  filename?: string
}

export function ExportDataButton({ data, filename = "customers-export.csv" }: ExportDataButtonProps) {
  const handleExport = () => {
    if (!data || data.length === 0) {
      toast.error("No data available to export")
      return
    }

    try {
      // 1. Identify all unique keys in metadata to create dynamic columns
      const metadataKeys = new Set<string>()
      data.forEach(item => {
        if (item.customer_metadata) {
          Object.keys(item.customer_metadata).forEach(key => metadataKeys.add(key))
        }
      })

      const metadataFields = Array.from(metadataKeys)

      // 2. Define headers
      const coreHeaders = ["ID", "First Name", "Surname", "Phone", "Gender", "Address", "Created At"]
      const headers = [...coreHeaders, ...metadataFields.map(k => `Meta: ${k}`)]

      // 3. Map data to rows
      const rows = data.map(item => {
        const coreValues = [
          item.id,
          `"${item.first_name}"`,
          `"${item.surname}"`,
          `"${item.phone}"`,
          `"${item.gender || ''}"`,
          `"${(item.physical_address || '').replace(/"/g, '""')}"`,
          item.created_at
        ]

        const metadataValues = metadataFields.map(key => {
          const val = item.customer_metadata?.[key]
          return val !== undefined ? `"${String(val).replace(/"/g, '""')}"` : '""'
        })

        return [...coreValues, ...metadataValues].join(",")
      })

      // 4. Combine headers and rows
      const csvContent = [headers.join(","), ...rows].join("\n")

      // 5. Create download link
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const url = URL.createObjectURL(blob)
      const link = document.createElement("a")
      link.setAttribute("href", url)
      link.setAttribute("download", filename)
      link.style.visibility = 'hidden'
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success(`Successfully exported ${data.length} records`)
    } catch (err) {
      console.error("Export error:", err)
      toast.error("Failed to generate CSV")
    }
  }

  return (
    <Button 
      variant="outline" 
      onClick={handleExport}
      className="h-10 px-5 rounded-lg border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition-all active:scale-95"
    >
      <Download className="mr-2 w-4 h-4" /> Export CSV
    </Button>
  )
}
