import { NextResponse } from "next/server";

import { getFearGreedIndex } from "@/lib/api/fear-greed";

export async function GET() {
  const payload = await getFearGreedIndex();
  return NextResponse.json(payload);
}
