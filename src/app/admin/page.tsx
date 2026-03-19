'use client'

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import {
  Bell,
  Share,
  Users,
  LayoutGrid,
  Filter,
  ArrowUpDown,
  Settings2,
  Download,
  Plus,
  Star,
  Check,
  MoreHorizontal,
  HelpCircle
} from "lucide-react"

export default function SubsidiariesPage() {
  const tableData = [
    { id: 1, name: "Tarand IT Solutions",  price: "Harare", sales: 471, revenue: "$635.85", stock: 100, status: "Active", rating: "5.0", checked: false },
    { id: 2, name: "Flora Gas Profile",   price: "Bulawayo", sales: 402, revenue: "$544.05", stock: 0,   status: "Inactive", rating: "5.0", checked: true },
    { id: 3, name: "Flora Gas Profiles",  price: "Victoria Falls", sales: 455, revenue: "$645.25", stock: 20,  status: "Review", rating: "4.9", checked: false },
    { id: 4, name: "Ensign Security Hub", price: "Mutare", sales: 7,   revenue: "$1,050.00", stock: 12,  status: "Active", rating: "4.8", checked: true },
    { id: 5, name: "Ecomatt Foods",       price: "Gweru", sales: 5,   revenue: "$1,000.00", stock: 0,   status: "Inactive", rating: "4.8", checked: false },
    { id: 6, name: "ProVision 4K Monitor", price: "Masvingo", sales: 1, revenue: "$400.25", stock: 3, status: "Review", rating: "5.0", checked: false },
    { id: 7, name: "Ensign Retro Wave", price: "Harare", sales: 120, revenue: "$162.40", stock: 20, status: "Active", rating: "4.7", checked: false },
  ]

  return (
    <div className="space-y-8 animate-in fade-in duration-500 h-full">
      
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#111827]">Subsidiaries</h1>
        <div className="flex items-center gap-3">
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition">
            <Share className="w-4 h-4" />
          </button>
          <button className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition">
            <Bell className="w-4 h-4" />
          </button>
          <div className="flex items-center -space-x-3 bg-white p-1 rounded-full border border-slate-200 px-3 h-10">
            <div className="w-7 h-7 rounded-full bg-indigo-500 border-2 border-white relative z-20"></div>
            <div className="w-7 h-7 rounded-full bg-pink-500 border-2 border-white relative z-10"></div>
            <div className="w-7 h-7 bg-orange-100 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-bold text-orange-600 relative z-0 pr-1 pl-4">+3</div>
            <button className="text-slate-400 pl-3">
              <Users className="w-4 h-4" />
            </button>
          </div>
          <Button variant="outline" className="h-10 border-slate-200 text-slate-700 font-semibold gap-2 ml-2 rounded-[10px]">
            <LayoutGrid className="w-4 h-4 text-slate-500" /> Customize Widget
          </Button>
        </div>
      </div>

      {/* Toolbar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 border-slate-200 font-semibold text-slate-700 gap-2 rounded-lg">
            <LayoutGrid className="w-4 h-4 text-slate-400" /> Table View <ArrowUpDown className="w-3 h-3 ml-1 text-slate-400" />
          </Button>
          <Button variant="outline" className="h-9 border-slate-200 font-medium text-slate-600 gap-2 rounded-lg">
            <Filter className="w-4 h-4 text-slate-400" /> Filter
          </Button>
          <Button variant="outline" className="h-9 border-slate-200 font-medium text-slate-600 gap-2 rounded-lg">
            <ArrowUpDown className="w-4 h-4 text-slate-400" /> Sort
          </Button>
          <div className="flex items-center gap-3 ml-4">
            <span className="text-sm font-bold text-slate-700">Show Statistics</span>
            <Switch defaultChecked className="data-[state=checked]:bg-[#FF5A20]" />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="outline" className="h-9 border-slate-200 font-medium text-slate-600 gap-2 rounded-lg">
            <Settings2 className="w-4 h-4 text-slate-400" /> Customize
          </Button>
          <Button variant="outline" className="h-9 border-slate-200 font-medium text-slate-600 gap-2 rounded-lg">
            <Download className="w-4 h-4 text-slate-400" /> Export
          </Button>
          <Button className="h-9 bg-[#111827] hover:bg-black text-white font-semibold gap-2 rounded-lg ml-2">
            <Plus className="w-4 h-4" /> Add New Subsidiary
          </Button>
        </div>
      </div>

      {/* Statistics Cards exactly matching screenshot */}
      <div className="grid grid-cols-4 gap-4">
        {[
          { title: "Total Subsidiary", val: "250", suffix: "+ 3 addition", positive: true },
          { title: "Quarter Revenue", val: "$15,490", suffix: "+ 9%", positive: true },
          { title: "Customers Onboarded", val: "2,355", suffix: "+ 7%", color: "emerald", positive: true },
          { title: "Avg. Monthly Capture", val: "890", suffix: "+ 5%", positive: true }
        ].map((stat, i) => (
          <div key={i} className="rounded-2xl border border-slate-200 p-5 pl-6 bg-white relative">
            <div className="flex justify-between items-start mb-2">
              <span className="text-[13px] font-semibold text-slate-500">{stat.title}</span>
              <HelpCircle className="w-3.5 h-3.5 text-slate-300" />
            </div>
            <h3 className="text-[32px] font-bold text-slate-900 tracking-tight leading-none mb-3">{stat.val}</h3>
            <div className="flex items-center gap-2">
              <span className="text-[12px] text-slate-400 font-medium">vs last month</span>
              <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded flex items-center">
                {stat.suffix}
              </span>
            </div>
            {/* The first card has a slightly rounded look or subtle right divider in the screenshot */}
            {i !== 3 && <div className="absolute right-0 top-1/2 -translate-y-1/2 w-px h-16 bg-slate-100 hidden"></div>}
          </div>
        ))}
      </div>

      {/* Main Beautiful Table */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
        <table className="w-full text-left text-sm whitespace-nowrap">
          <thead className="bg-[#FAFBFD] text-slate-400 font-semibold border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 font-semibold w-12"><Checkbox className="border-slate-300 rounded-[4px]" /></th>
              <th className="px-6 py-4 font-semibold text-[13px]">Subsidiary Name</th>
              <th className="px-6 py-4 font-semibold text-[13px]">City/Region</th>
              <th className="px-6 py-4 font-semibold text-[13px]">Captures</th>
              <th className="px-6 py-4 font-semibold text-[13px]">Revenue</th>
              <th className="px-6 py-4 font-semibold text-[13px]">Credits</th>
              <th className="px-6 py-4 font-semibold text-[13px]">Status</th>
              <th className="px-6 py-4 font-semibold text-[13px]">Rating</th>
              <th className="px-6 py-4 font-semibold text-[13px] text-right"><Plus className="w-4 h-4 ml-auto" /></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-[#111827] font-medium">
            {tableData.map((row) => (
              <tr key={row.id} className={`group hover:bg-[#FAFBFD] transition-colors ${row.checked ? 'bg-[#FFF9F6] border-l-2 border-[#FF5A20] -ml-[2px] relative' : ''}`}>
                <td className="px-6 py-3.5"><Checkbox checked={row.checked} className={`rounded-[4px] ${row.checked ? 'data-[state=checked]:bg-[#FF5A20] data-[state=checked]:border-[#FF5A20]' : 'border-slate-300'}`} /></td>
                <td className="px-6 py-3.5"><span className="text-slate-700">{row.name}</span></td>
                <td className="px-6 py-3.5">{row.price}</td>
                <td className="px-6 py-3.5 text-slate-500">{row.sales} pcs</td>
                <td className="px-6 py-3.5 text-slate-700">{row.revenue}</td>
                <td className="px-6 py-3.5">{row.stock}</td>
                <td className="px-6 py-3.5">
                  <span className={`px-2.5 py-1 rounded-md text-[11px] font-bold ${
                    row.status === 'Active' ? 'bg-[#EEECFC] text-[#5542F6]' :
                    row.status === 'Inactive' ? 'bg-[#FEE9EC] text-[#EB4861]' :
                    'bg-[#FEF5E3] text-[#ECA935]'
                  }`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-3.5">
                  <div className="flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> <span className="text-slate-700">{row.rating}</span>
                  </div>
                </td>
                <td className="px-6 py-3.5 text-right"><button className="text-slate-300 hover:text-slate-500"><MoreHorizontal className="w-4 h-4 ml-auto" /></button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  )
}
