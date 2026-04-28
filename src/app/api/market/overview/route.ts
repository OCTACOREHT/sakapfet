import { NextRequest, NextResponse } from "next/server";

import { DASHBOARD_SYMBOLS } from "@/lib/constants";
import { getMarketOverview } from "@/lib/api/alpha-vantage";

export async function GET(request: NextRequest) {
  const symbols = request.nextUrl.searchParams.get("symbols")?.split(",").filter(Boolean) ?? DASHBOARD_SYMBOLS;
  const payload = await getMarketOverview(symbols);
  return NextResponse.json(payload);
}
