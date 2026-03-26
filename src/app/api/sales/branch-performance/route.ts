import { NextResponse } from "next/server"
import { getBranchPerformance } from "@/lib/sales-service"

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date') || undefined

  try {
    const stats = await getBranchPerformance(date)
    return NextResponse.json(stats)
  } catch {
    return NextResponse.json({ error: "Failed to fetch branch performance" }, { status: 500 })
  }
}
