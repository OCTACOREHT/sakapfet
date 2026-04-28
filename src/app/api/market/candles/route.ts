import { NextRequest, NextResponse } from "next/server";

import { getStockCandles } from "@/lib/api/alpha-vantage";

export async function GET(request: NextRequest) {
  const symbol = request.nextUrl.searchParams.get("symbol") ?? "NVDA";
  const payload = await getStockCandles(symbol.toUpperCase());
  return NextResponse.json(payload);
}
