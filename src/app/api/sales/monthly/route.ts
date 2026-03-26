import { NextResponse } from "next/server"
import { getMonthlySalesStats } from "@/lib/sales-service"

export async function GET() {
  try {
    const stats = await getMonthlySalesStats()
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: "Failed to fetch monthly sales stats" }, { status: 500 })
  }
}
