import { createClient } from "@/utils/supabase/server"
import { CustomerTable } from "@/components/customer-table"
import { CustomerFilters } from "@/components/customer-filters"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { PlusCircle, Download } from "lucide-react"
import Link from "next/link"

export default async function CustomersPage({ 
  params,
  searchParams
}: { 
  params: Promise<{ id: string }>,
  searchParams: Promise<{ q?: string, type?: string }>
}) {
  const { id } = await params
  const { q, type } = await searchParams
  const supabase = await createClient()

  // Fetch branch name for the header
  const { data: subData } = await supabase
    .from('subsidiaries')
    .select('name')
    .eq('id', id)
    .single()

  const branchName = subData?.name || "Flora Gas"

  // Build Query
  let query = supabase
    .from('customers')
    .select('*', { count: 'exact' })
    .eq('subsidiary_id', id)
    .order('created_at', { ascending: false })

  // Apply Search
  if (q) {
    query = query.or(`first_name.ilike.%${q}%,surname.ilike.%${q}%,phone.ilike.%${q}%`)
  }

  // Apply Metadata Filters
  if (type && type !== 'all') {
    query = query.contains('customer_metadata', { customerType: type })
  }

  const { data: customers, count, error } = await query

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Customer Database</h1>
          <p className="text-slate-500 mt-1 font-medium">Viewing {count || 0} registered customers for {branchName}.</p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" className="h-10 px-5 rounded-lg border-slate-200 text-slate-600 font-semibold hover:bg-slate-50">
            <Download className="mr-2 w-4 h-4" /> Export CSV
          </Button>
          <Link 
            href={`/workspace/${id}/capture`}
            className={cn(
              buttonVariants({ variant: "default" }), 
              "h-10 px-5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold shadow-sm transition-all active:scale-[0.98]"
            )}
          >
            <PlusCircle className="mr-2 w-4 h-4" /> New Capture
          </Link>
        </div>
      </div>

      <div className="bg-[#F8FAFC]/50 p-6 rounded-3xl border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.02)]">
        {/* Search & Filters */}
        <CustomerFilters />

        {/* The Data Table */}
        <CustomerTable customers={customers || []} />
        
        {/* Pagination placeholder */}
        {customers && customers.length > 0 && (
          <div className="mt-6 flex items-center justify-between px-2 text-sm text-slate-500 font-medium">
            <p>Showing {customers.length} of {count} results</p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" disabled className="text-slate-400">Previous</Button>
              <Button variant="ghost" size="sm" disabled className="text-indigo-600 font-bold">Next</Button>
            </div>
          </div>
        )}
      </div>

    </div>
  )
}
