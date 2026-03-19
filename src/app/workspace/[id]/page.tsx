import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, Target, PlusCircle, MoreHorizontal } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const recentCustomers = [
  { id: 1, name: "Grace Ncube", phone: "+263 77 123 4567", tier: "Gold", date: "10 mins ago" },
  { id: 2, name: "Tariro Moyo", phone: "+263 71 987 6543", tier: "Standard", date: "1 hour ago" },
  { id: 3, name: "John Smith", phone: "+263 78 456 1230", tier: "Premium", date: "3 hours ago" },
  { id: 4, name: "Rutendo Ndlovu", phone: "+263 73 321 0987", tier: "Standard", date: "Yesterday" },
]

export default function WorkspaceOverview() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Branch Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Your daily localized metrics and customer flow.</p>
        </div>
        <div className="flex gap-3">
          <Button className="h-10 px-5 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-semibold">
            <PlusCircle className="mr-2 w-4 h-4" /> New Capture
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Total Customers</CardTitle>
            <div className="p-2 bg-indigo-50 rounded-lg">
              <Users className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">1,248</div>
            <p className="text-sm text-slate-500 mt-2 font-medium flex items-center">
              <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md mr-2">+12</span> onboarded today
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Interactions (MTD)</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg">
              <FileText className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">856</div>
            <p className="text-sm text-slate-500 mt-2 font-medium flex items-center">
              Notes & data appended
            </p>
          </CardContent>
        </Card>

        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-bold text-slate-500 uppercase tracking-wider">Target Progress</CardTitle>
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Target className="h-4 w-4 text-emerald-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">76%</div>
            <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '76%' }}></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-1">
        
        {/* Recent Customers Table */}
        <Card className="border-slate-200 shadow-sm bg-white">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-900">Recent Customer Captures</CardTitle>
            <Button variant="ghost" size="sm" className="text-indigo-600 font-semibold hover:bg-indigo-50">
              View Database
            </Button>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader className="bg-slate-50 border-b border-slate-200">
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-slate-600 font-semibold uppercase text-xs tracking-wider h-10">Customer Name</TableHead>
                  <TableHead className="text-slate-600 font-semibold uppercase text-xs tracking-wider h-10">Contact</TableHead>
                  <TableHead className="text-slate-600 font-semibold uppercase text-xs tracking-wider h-10">Tier Profile</TableHead>
                  <TableHead className="text-right text-slate-600 font-semibold uppercase text-xs tracking-wider h-10 pr-6">Captured</TableHead>
                  <TableHead className="w-12"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentCustomers.map((customer) => (
                  <TableRow key={customer.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                    <TableCell className="font-bold text-slate-800 py-4">
                      {customer.name}
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">{customer.phone}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 ${
                        customer.tier === 'Gold' ? 'bg-amber-100 text-amber-800' : 
                        customer.tier === 'Premium' ? 'bg-indigo-100 text-indigo-800' : 
                        'bg-slate-100 text-slate-700'
                      } rounded-md text-xs font-bold tracking-wide`}>
                        {customer.tier}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-slate-500 font-medium pr-6">{customer.date}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-indigo-600">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
