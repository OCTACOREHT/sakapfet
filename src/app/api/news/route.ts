import { NextRequest, NextResponse } from "next/server";

import { getFinancialNews } from "@/lib/api/news-api";
import type { NewsCategory } from "@/types/market";

export async function GET(request: NextRequest) {
  const category = (request.nextUrl.searchParams.get("category") ?? "all") as NewsCategory;
  const query = request.nextUrl.searchParams.get("query") ?? undefined;
  const payload = await getFinancialNews(category, query);
  return NextResponse.json(payload);
}
