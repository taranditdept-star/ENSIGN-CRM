import { createClient } from "@/utils/supabase/server"

export type SalesStats = {
  total_revenue: number
  total_transactions: number
  avg_value: number
  active_branches: number
  revenue_change: number // % change vs yesterday
  transaction_change: number // % change vs yesterday
}

export type BranchPerformance = {
  branch_id: string
  branch_name: string
  subsidiary_type: string
  total_transactions: number
  total_quantity: number
  total_revenue: number
  last_activity: string
  status: 'active' | 'warning' | 'inactive'
}

export async function getDailySalesStats(dateStr?: string) {
  const supabase = await createClient()
  const targetDate = dateStr || new Date().toISOString().split('T')[0]
  const prevDate = new Date(new Date(targetDate).getTime() - 86400000).toISOString().split('T')[0]

  // Fetch target date summary
  const { data: currentData } = await supabase
    .from('sales_summary')
    .select('*')
    .eq('sale_date', targetDate)

  // Fetch previous date summary for comparison
  const { data: previousData } = await supabase
    .from('sales_summary')
    .select('*')
    .eq('sale_date', prevDate)

  // Fetch active branches count from branch_health view
  const { count: activeCount } = await supabase
    .from('branch_health')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  const currentTotal = currentData?.reduce((acc, row) => acc + Number(row.total_revenue), 0) || 0
  const previousTotal = previousData?.reduce((acc, row) => acc + Number(row.total_revenue), 0) || 0
  const currentTransactions = currentData?.reduce((acc, row) => acc + Number(row.total_transactions), 0) || 0
  const previousTransactions = previousData?.reduce((acc, row) => acc + Number(row.total_transactions), 0) || 0

  const revenueChange = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0
  const transactionChange = previousTransactions > 0 ? ((currentTransactions - previousTransactions) / previousTransactions) * 100 : 0

  return {
    total_revenue: currentTotal,
    total_transactions: currentTransactions,
    avg_value: currentTransactions > 0 ? currentTotal / currentTransactions : 0,
    active_branches: activeCount || 0,
    revenue_change: revenueChange,
    transaction_change: transactionChange
  }
}

export async function getBranchPerformance(dateStr?: string): Promise<BranchPerformance[]> {
  const supabase = await createClient()
  const targetDate = dateStr || new Date().toISOString().split('T')[0]

  // Get targeted date activity from sales_summary
  const { data: summary } = await supabase
    .from('sales_summary')
    .select('*')
    .eq('sale_date', targetDate)

  // Get health status for ALL branches
  const { data: health } = await supabase
    .from('branch_health')
    .select('*')

  // Merge totals with health status
  return (health || []).map(h => {
    const s = summary?.find(row => row.branch_id === h.branch_id)
    return {
      branch_id: h.branch_id,
      branch_name: h.branch_name,
      subsidiary_type: s?.subsidiary_type || 'N/A',
      total_transactions: s?.total_transactions || 0,
      total_quantity: s?.total_quantity || 0,
      total_revenue: s?.total_revenue || 0,
      last_activity: h.last_activity,
      status: h.status as 'active' | 'warning' | 'inactive'
    }
  })
}

export async function getActivityHeatmapData() {
  const supabase = await createClient()
  const thirtyDaysAgo = new Date(Date.now() - 30 * 86400000).toISOString().split('T')[0]

  const { data } = await supabase
    .from('sales_summary')
    .select('sale_date, total_transactions')
    .gte('sale_date', thirtyDaysAgo)
    .order('sale_date', { ascending: true })

  // Aggregate by date (since view is by branch+date)
  const heatmap: Record<string, number> = {}
  data?.forEach(row => {
    heatmap[row.sale_date] = (heatmap[row.sale_date] || 0) + row.total_transactions
  })

  return Object.entries(heatmap).map(([date, count]) => ({ date, count }))
}

export async function getMonthlySalesStats() {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('sales_summary')
    .select('*')
    .order('sale_date', { ascending: false })
    .limit(30)

  const monthly = (data || []).reduce((acc: Record<string, { month: string; revenue: number; transactions: number }>, curr) => {
    const month = curr.sale_date.substring(0, 7)
    if (!acc[month]) {
      acc[month] = { month, revenue: 0, transactions: 0 }
    }
    acc[month].revenue += Number(curr.total_revenue)
    acc[month].transactions += Number(curr.total_transactions)
    return acc
  }, {})

  return Object.values(monthly)
}

export async function getOrgPerformance() {
  const supabase = await createClient()
  
  const { data } = await supabase
    .from('sales_summary')
    .select('*, organizations(id, name)')

  const orgs = (data || []).reduce((acc: Record<string, { name: string; revenue: number; transactions: number; branches: Set<string> }>, curr) => {
    const orgName = curr.organizations?.name || 'Unknown'
    if (!acc[orgName]) {
      acc[orgName] = { name: orgName, revenue: 0, transactions: 0, branches: new Set() }
    }
    acc[orgName].revenue += Number(curr.total_revenue)
    acc[orgName].transactions += Number(curr.total_transactions)
    acc[orgName].branches.add(curr.branch_id)
    return acc
  }, {})

  return Object.values(orgs).map((o) => ({
    ...o,
    branches: o.branches.size
  }))
}
