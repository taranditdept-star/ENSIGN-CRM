'use client'

import { useState } from "react"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Download, 
  Search, 
  Activity, 
  Filter 
} from "lucide-react"

export type SalesLog = {
  branch_name: string
  subsidiary_type: string
  total_transactions: number
  total_quantity: number
  total_revenue: number
  status: 'active' | 'warning' | 'inactive'
}

interface SalesRegisterTableProps {
  data: SalesLog[]
}

export function SalesRegisterTable({ data }: SalesRegisterTableProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData = data.filter(item => 
    item.branch_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.subsidiary_type.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const exportToCSV = () => {
    const headers = ["Branch", "Type", "Transactions", "Qty", "Revenue", "Status"]
    const csvContent = [
      headers.join(","),
      ...filteredData.map(row => [
        row.branch_name,
        row.subsidiary_type,
        row.total_transactions,
        row.total_quantity,
        row.total_revenue,
        row.status
      ].join(","))
    ].join("\n")

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `daily_sales_register_${new Date().toISOString().split('T')[0]}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="bg-white/80 backdrop-blur-xl rounded-[40px] border-0 shadow-2xl p-8 space-y-8">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl font-black tracking-tight text-slate-900 flex items-center gap-3">
            <Activity className="w-6 h-6 text-[#FF5A20]" />
            Daily Sales Register
          </h2>
          <p className="text-slate-400 text-[13px] font-bold italic ml-9">Real-time branch transactional performance.</p>
        </div>
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#FF5A20] transition-colors" />
            <Input 
              placeholder="Search Branch..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-12 h-14 rounded-2xl border-slate-100 bg-slate-50 font-bold focus:ring-[#FF5A20]/20 transition-all"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={exportToCSV}
            className="h-14 px-6 rounded-2xl border-slate-100 font-black text-slate-600 hover:bg-slate-50 gap-2 shadow-sm transition-all active:scale-95"
          >
            <Download className="w-5 h-5 text-indigo-500" />
            <span className="hidden sm:inline">Export CSV</span>
          </Button>
        </div>
      </div>

      <div className="border border-slate-50 rounded-3xl overflow-hidden bg-white/50 backdrop-blur-md">
        <Table>
          <TableHeader className="bg-slate-900/5 hover:bg-transparent">
            <TableRow className="hover:bg-transparent border-0 h-16">
              <TableHead className="font-black text-slate-400 text-[11px] uppercase tracking-[0.2em] pl-8">Branch</TableHead>
              <TableHead className="font-black text-slate-400 text-[11px] uppercase tracking-[0.2em]">Transactions</TableHead>
              <TableHead className="font-black text-slate-400 text-[11px] uppercase tracking-[0.2em]">Quantity</TableHead>
              <TableHead className="font-black text-slate-400 text-[11px] uppercase tracking-[0.2em]">Revenue</TableHead>
              <TableHead className="font-black text-slate-400 text-[11px] uppercase tracking-[0.2em] pr-8 text-right">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredData.length > 0 ? filteredData.map((row, idx) => (
              <TableRow key={idx} className="group hover:bg-white/80 transition-all h-20 border-b border-slate-50 last:border-0">
                <TableCell className="pl-8">
                  <div className="flex flex-col">
                    <span className="text-[15px] font-black text-slate-900">{row.branch_name}</span>
                    <span className="text-[11px] font-bold text-[#FF5A20] uppercase tracking-widest bg-[#FF5A20]/5 px-2 py-0.5 rounded-md inline-block self-start mt-1">
                      {row.subsidiary_type}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center shadow-lg">
                      <span className="text-white text-sm font-black">{row.total_transactions}</span>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <span className="text-[14px] font-bold text-slate-600 tabular-nums">
                    {row.total_quantity.toLocaleString()} kg/l
                  </span>
                </TableCell>
                <TableCell>
                  <span className="text-[16px] font-black text-slate-900 tabular-nums">
                    ${row.total_revenue.toLocaleString()}
                  </span>
                </TableCell>
                <TableCell className="pr-8 text-right">
                  <Badge className={`rounded-full px-4 py-1.5 font-black text-[10px] uppercase border shadow-sm ${
                    row.status === 'active' ? 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-50' :
                    row.status === 'warning' ? 'bg-amber-50 text-amber-600 border-amber-100 hover:bg-amber-100' :
                    'bg-slate-50 text-slate-500 border-slate-100 hover:bg-slate-50'
                  }`}>
                    {row.status}
                  </Badge>
                </TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={5} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-4 py-12">
                    <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center animate-pulse">
                      <Filter className="w-8 h-8 text-slate-200" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-lg font-black text-slate-900 underline decoration-[#FF5A20] decoration-4 underline-offset-4">No results found</h3>
                      <p className="text-slate-400 font-bold italic">Adjust your search parameters and try again.</p>
                    </div>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
