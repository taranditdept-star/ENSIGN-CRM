import Link from 'next/link'
import {
  LayoutDashboard,
  Users,
  BarChart,
  HelpCircle,
  MessageCircle,
  Settings,
  History,
  Building2,
  Fingerprint,
  Download,
  Search,
  Command
} from 'lucide-react'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#F0F2F5] p-2 sm:p-4 flex gap-4">
      
      {/* Sidebar - Matching Uxerflow Light Sidebar exactly */}
      <aside className="w-[260px] bg-white border border-slate-200 flex flex-col hidden lg:flex shrink-0 rounded-2xl shadow-sm h-[calc(100vh-32px)]">
        {/* Header */}
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center text-white font-bold tracking-tighter">
              EN
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900 leading-none mb-1">Ensign Holdings</h2>
              <p className="text-[10px] text-slate-400 font-semibold bg-slate-100 w-max px-1.5 py-0.5 rounded-sm">Centralized CRM</p>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 py-2">
          <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4 group-focus-within:text-slate-600" />
            <input 
              type="text" 
              placeholder="Search" 
              className="w-full bg-slate-50 hover:bg-slate-100 border border-slate-200/60 rounded-xl pl-9 pr-8 py-2 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-slate-300 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 text-[10px] font-bold text-slate-300 bg-white border border-slate-200 px-1 py-0.5 rounded uppercase">
              <Command className="w-2.5 h-2.5"/> K
            </div>
          </div>
        </div>

        {/* Scrollable Nav Area */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-7 scrollbar-hide">
          
          {/* Main Menu */}
          <div>
            <h3 className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-3 tracking-widest">Main Menu</h3>
            <nav className="space-y-0.5">
              <Link href="/admin" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <LayoutDashboard className="w-4 h-4" /> Global Dashboard
              </Link>
              <Link href="/admin/subsidiaries" className="flex items-center gap-3 px-3 py-2 text-[13px] font-bold text-slate-900 bg-orange-50/80 border-l-2 border-[#FF5A20] rounded-r-lg relative -left-[1px]">
                <Building2 className="w-4 h-4 text-[#FF5A20]" /> Subsidiaries
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <BarChart className="w-4 h-4" /> Global Analytics
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Users className="w-4 h-4" /> Master Customer List
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <History className="w-4 h-4" /> Audit Trails
              </Link>
            </nav>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-3 tracking-widest">Tools</h3>
            <nav className="space-y-0.5">
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Fingerprint className="w-4 h-4" /> Data Deduplication
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <Download className="w-4 h-4" /> Export Engine
              </Link>
              <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <MessageCircle className="w-4 h-4 text-[#25D366]" /> WhatsApp Marketing
              </Link>
            </nav>
          </div>

          {/* Workspace */}
          <div>
            <h3 className="text-[10px] uppercase text-slate-400 font-bold mb-3 px-3 tracking-widest">Workspace</h3>
            <nav className="space-y-0.5">
              <Link href="#" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded bg-[#4F46E5] shadow-[0_0_8px_rgba(79,70,229,0.5)]"></span> Flora Gas
                </div>
                <div className="bg-slate-50 text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-slate-100">5</div>
              </Link>
              <Link href="#" className="flex items-center justify-between px-3 py-2 text-[13px] font-medium text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded bg-[#EC4899] shadow-[0_0_8px_rgba(236,72,153,0.5)]"></span> Tarand IT
                </div>
                <div className="bg-slate-50 text-slate-400 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-slate-100">4</div>
              </Link>
            </nav>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-4 space-y-0.5">
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <HelpCircle className="w-4 h-4" /> Help center
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <MessageCircle className="w-4 h-4" /> Feedback
          </Link>
          <Link href="#" className="flex items-center gap-3 px-3 py-2 text-[13px] font-medium text-slate-500 hover:bg-slate-50 rounded-lg transition-colors">
            <Settings className="w-4 h-4" /> Settings
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col h-[calc(100vh-32px)] bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden relative">
        <div className="flex-1 overflow-y-auto px-8 py-8">
          {children}
        </div>
      </main>
    </div>
  )
}
