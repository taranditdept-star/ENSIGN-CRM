'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { MoreHorizontal, User, Phone, MapPin, Calendar, ExternalLink } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export type Customer = {
  id: string
  first_name: string
  surname: string
  phone: string
  physical_address: string | null
  created_at: string
  customer_metadata?: {
    customerType?: string
    tier?: string
    [key: string]: any
  }
}

export function CustomerTable({ customers }: { customers: Customer[] }) {
  if (!customers || customers.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white rounded-2xl border-2 border-dashed border-slate-100 text-center">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
          <Users className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-900">No customers found</h3>
        <p className="text-slate-500 max-w-xs mt-1">Try adjusting your filters or record a new customer registration.</p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <Table>
        <TableHeader className="bg-slate-50 border-b border-slate-200">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[280px] font-bold text-slate-600 uppercase text-[10px] tracking-widest h-12">Customer Details</TableHead>
            <TableHead className="font-bold text-slate-600 uppercase text-[10px] tracking-widest h-12">Contact & Location</TableHead>
            <TableHead className="font-bold text-slate-600 uppercase text-[10px] tracking-widest h-12">Tier / Type</TableHead>
            <TableHead className="font-bold text-slate-600 uppercase text-[10px] tracking-widest h-12 text-right pr-8">Registered</TableHead>
            <TableHead className="w-16 h-12"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((cust) => (
            <TableRow key={cust.id} className="group hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0 font-medium">
              <TableCell className="py-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center text-indigo-600 font-bold shadow-sm group-hover:bg-indigo-100 transition-colors">
                    {(cust.first_name?.[0] || 'U').toUpperCase()}
                    {(cust.surname?.[0] || '').toUpperCase()}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-slate-900 font-bold text-[15px]">{cust.first_name} {cust.surname}</span>
                    <span className="text-slate-400 text-xs font-medium tabular-nums">#{cust.id.slice(0, 8)}</span>
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-[13px] text-slate-600">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {cust.phone}
                  </div>
                  <div className="flex items-center gap-2 text-[13px] text-slate-500 truncate max-w-[200px]">
                    <MapPin className="w-3.5 h-3.5 text-slate-400" />
                    {cust.physical_address || 'No address provided'}
                  </div>
                </div>
              </TableCell>
              <TableCell className="py-4">
                <div className="flex gap-2">
                  <Badge variant="outline" className="rounded-lg font-bold tracking-tight bg-slate-50 text-slate-700 border-slate-200">
                    {cust.customer_metadata?.customerType || 'Domestic'}
                  </Badge>
                  {cust.customer_metadata?.tier && (
                    <Badge className="rounded-lg font-bold tracking-tight bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm">
                      {cust.customer_metadata.tier}
                    </Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="py-4 text-right pr-8">
                <div className="flex items-center justify-end gap-2 text-slate-500 font-semibold text-[13px]">
                  <Calendar className="w-3.5 h-3.5 text-slate-300" />
                  {new Date(cust.created_at).toLocaleDateString()}
                </div>
              </TableCell>
              <TableCell className="py-4 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger className="h-8 w-8 flex items-center justify-center rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 transition-colors outline-none">
                    <MoreHorizontal className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl border-slate-100">
                    <DropdownMenuLabel className="font-bold text-slate-800">Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-slate-50"/>
                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-slate-50 cursor-pointer font-medium p-2.5 rounded-lg transition-colors">
                      <ExternalLink className="w-4 h-4 text-slate-400" /> View Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center gap-2 hover:bg-slate-50 cursor-pointer font-medium p-2.5 rounded-lg transition-colors">
                      <User className="w-4 h-4 text-slate-400" /> Edit Record
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function Users({ className }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  )
}
