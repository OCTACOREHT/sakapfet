import { NextResponse } from "next/server";

import { getCryptoMarkets } from "@/lib/api/coingecko";

export async function GET() {
  const payload = await getCryptoMarkets();
  return NextResponse.json(payload);
}
