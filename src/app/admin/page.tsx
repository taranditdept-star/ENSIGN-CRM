import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Building2, Users, Database, TrendingUp, MoreHorizontal, ArrowUpRight } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"

const recentActivity = [
  { id: 1, name: "Flora Gas Main Branch", action: "System Health Check", date: "2 mins ago", status: "Active" },
  { id: 2, name: "Tarand IT Solutions", action: "Onboarded New Users", date: "45 mins ago", status: "Active" },
  { id: 3, name: "Ensign Security", action: "Bulk Data Capture", date: "3 hours ago", status: "Review" },
  { id: 4, name: "Flora Logistics", action: "Billing Profile Updated", date: "Yesterday", status: "Active" },
  { id: 5, name: "Eco Mattresses", action: "Sync Failed", date: "Yesterday", status: "Failed" },
]

export default function AdminDashboard() {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black tracking-tight text-slate-900">Platform Overview</h1>
          <p className="text-slate-500 mt-1 font-medium">Monitor all subsidiaries, engagement, and system health globally.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-4 rounded-full border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold shadow-sm">
            Export Report
          </Button>
          <Button className="h-10 px-4 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold tracking-wide shadow-md shadow-indigo-600/20">
            Generate Insights <ArrowUpRight className="ml-2 w-4 h-4 opacity-80" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/50 bg-white group hover:ring-indigo-200 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Subsidiaries</CardTitle>
            <div className="p-2 bg-indigo-50 rounded-lg group-hover:bg-indigo-100 transition-colors">
              <Building2 className="h-4 w-4 text-indigo-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">12</div>
            <p className="text-sm text-slate-500 mt-2 font-medium flex items-center">
              <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md mr-2">+2</span> from last month
            </p>
          </CardContent>
        </Card>
        
        <Card className="border-none shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/50 bg-white group hover:ring-blue-200 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Total Users</CardTitle>
            <div className="p-2 bg-blue-50 rounded-lg group-hover:bg-blue-100 transition-colors">
              <Users className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">2,450</div>
            <p className="text-sm text-slate-500 mt-2 font-medium flex items-center">
              <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md mr-2">+18%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/50 bg-white group hover:ring-amber-200 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Data Captures</CardTitle>
            <div className="p-2 bg-amber-50 rounded-lg group-hover:bg-amber-100 transition-colors">
              <Database className="h-4 w-4 text-amber-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-black text-slate-900">14.2<span className="text-xl">k</span></div>
            <p className="text-sm text-slate-500 mt-2 font-medium flex items-center">
              <span className="text-emerald-600 font-bold bg-emerald-50 px-1.5 py-0.5 rounded-md mr-2">+4%</span> vs last month
            </p>
          </CardContent>
        </Card>

        <Card className="border-none shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-500/50 bg-gradient-to-br from-indigo-600 to-blue-700 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 -translate-y-4 translate-x-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
          <CardHeader className="flex flex-row items-center justify-between pb-2 relative z-10">
            <CardTitle className="text-sm font-semibold text-indigo-100 uppercase tracking-wider">System Health</CardTitle>
            <div className="p-2 bg-white/10 rounded-lg">
              <TrendingUp className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="text-3xl font-black">99.9%</div>
            <p className="text-sm text-indigo-100 mt-2 font-medium flex items-center">
              Uptime across all database nodes
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-6 md:grid-cols-7 lg:grid-cols-7">
        
        {/* Recent Activity Table */}
        <Card className="md:col-span-5 border-none shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/50 bg-white flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4 border-b border-slate-100">
            <CardTitle className="text-lg font-bold text-slate-900">Recent Network Activity</CardTitle>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-slate-600 rounded-full">
              <MoreHorizontal className="w-5 h-5" />
            </Button>
          </CardHeader>
          <CardContent className="p-0 flex-1">
            <Table>
              <TableHeader className="bg-slate-50/50">
                <TableRow className="hover:bg-transparent border-slate-100">
                  <TableHead className="text-slate-500 font-semibold uppercase text-xs tracking-wider h-12">Subsidiary / Tenant</TableHead>
                  <TableHead className="text-slate-500 font-semibold uppercase text-xs tracking-wider h-12">Action</TableHead>
                  <TableHead className="text-slate-500 font-semibold uppercase text-xs tracking-wider h-12">Status</TableHead>
                  <TableHead className="text-right text-slate-500 font-semibold uppercase text-xs tracking-wider h-12 pr-6">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentActivity.map((activity) => (
                  <TableRow key={activity.id} className="border-slate-50 hover:bg-slate-50/50 transition-colors cursor-pointer group">
                    <TableCell className="font-bold text-slate-800 py-4 group-hover:text-indigo-600 transition-colors">
                      {activity.name}
                    </TableCell>
                    <TableCell className="text-slate-600 font-medium">{activity.action}</TableCell>
                    <TableCell>
                      <span className={`inline-flex items-center px-2.5 py-1 ${
                        activity.status === 'Active' ? 'bg-emerald-50 text-emerald-700 ring-1 ring-inset ring-emerald-600/20' : 
                        activity.status === 'Failed' ? 'bg-red-50 text-red-700 ring-1 ring-inset ring-red-600/20' : 
                        'bg-amber-50 text-amber-700 ring-1 ring-inset ring-amber-600/20'
                      } rounded-full text-xs font-bold uppercase tracking-wide`}>
                        {activity.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-right text-slate-500 font-medium whitespace-nowrap pr-6">{activity.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
          <div className="p-4 border-t border-slate-100 text-center">
            <button className="text-sm font-bold text-indigo-600 hover:text-indigo-700 transition-colors">
              View All Logs
            </button>
          </div>
        </Card>

        {/* Quick Actions Side Panel */}
        <Card className="md:col-span-2 border-none shadow-sm shadow-slate-200/50 ring-1 ring-slate-200/50 bg-white flex flex-col">
          <CardHeader className="border-b border-slate-100 pb-4">
            <CardTitle className="text-lg font-bold text-slate-900">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex-1 p-6 space-y-4">
            <button className="w-full flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-indigo-600 hover:bg-white hover:shadow-lg hover:shadow-indigo-600/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-indigo-100 flex items-center justify-center mr-4 group-hover:bg-indigo-600 transition-colors">
                <Building2 className="w-5 h-5 text-indigo-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 group-hover:text-indigo-600 transition-colors tracking-tight">Onboard Subsidiary</p>
                <p className="text-xs font-medium text-slate-500">Create a new tenant</p>
              </div>
            </button>
            
            <button className="w-full flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-blue-600 hover:bg-white hover:shadow-lg hover:shadow-blue-600/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center mr-4 group-hover:bg-blue-600 transition-colors">
                <Users className="w-5 h-5 text-blue-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors tracking-tight">Invite User</p>
                <p className="text-xs font-medium text-slate-500">Add an administrator</p>
              </div>
            </button>
            
            <button className="w-full flex items-center p-4 bg-slate-50 rounded-2xl border border-slate-100 hover:border-amber-500 hover:bg-white hover:shadow-lg hover:shadow-amber-500/10 transition-all group">
              <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center mr-4 group-hover:bg-amber-500 transition-colors">
                <Database className="w-5 h-5 text-amber-600 group-hover:text-white transition-colors" />
              </div>
              <div className="text-left">
                <p className="font-bold text-slate-800 group-hover:text-amber-600 transition-colors tracking-tight">Query Data</p>
                <p className="text-xs font-medium text-slate-500">Run SQL functions</p>
              </div>
            </button>
          </CardContent>
        </Card>

      </div>
    </div>
  )
}
