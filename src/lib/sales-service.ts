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

export async function getDailySalesStats() {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0]

  // Fetch today's summary
  const { data: todayData } = await supabase
    .from('sales_summary')
    .select('*')
    .eq('sale_date', today)

  // Fetch yesterday's summary
  const { data: yesterdayData } = await supabase
    .from('sales_summary')
    .select('*')
    .eq('sale_date', yesterday)

  // Fetch active branches count from branch_health view
  const { count: activeCount } = await supabase
    .from('branch_health')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'active')

  const todayTotal = todayData?.reduce((acc, row) => acc + Number(row.total_revenue), 0) || 0
  const yesterdayTotal = yesterdayData?.reduce((acc, row) => acc + Number(row.total_revenue), 0) || 0
  const todayTransactions = todayData?.reduce((acc, row) => acc + Number(row.total_transactions), 0) || 0
  const yesterdayTransactions = yesterdayData?.reduce((acc, row) => acc + Number(row.total_transactions), 0) || 0

  const revenueChange = yesterdayTotal > 0 ? ((todayTotal - yesterdayTotal) / yesterdayTotal) * 100 : 0
  const transactionChange = yesterdayTransactions > 0 ? ((todayTransactions - yesterdayTransactions) / yesterdayTransactions) * 100 : 0

  return {
    total_revenue: todayTotal,
    total_transactions: todayTransactions,
    avg_value: todayTransactions > 0 ? todayTotal / todayTransactions : 0,
    active_branches: activeCount || 0,
    revenue_change: revenueChange,
    transaction_change: transactionChange
  }
}

export async function getBranchPerformance(): Promise<BranchPerformance[]> {
  const supabase = await createClient()
  const today = new Date().toISOString().split('T')[0]

  // Get today's activity from sales_summary
  const { data: summary } = await supabase
    .from('sales_summary')
    .select('*')
    .eq('sale_date', today)

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
