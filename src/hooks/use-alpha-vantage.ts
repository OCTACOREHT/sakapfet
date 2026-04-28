"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchJson } from "@/lib/utils";
import type { CandlesResponse, OverviewResponse } from "@/types/market";

export function useAlphaVantage(symbols: string[]) {
  return useQuery({
    queryKey: ["market-overview", symbols.join(",")],
    queryFn: () =>
      fetchJson<OverviewResponse>(
        `/api/market/overview?symbols=${encodeURIComponent(symbols.join(","))}`,
      ),
    enabled: symbols.length > 0,
  });
}

export function useStockCandles(symbol: string) {
  return useQuery({
    queryKey: ["market-candles", symbol],
    queryFn: () =>
      fetchJson<CandlesResponse>(
        `/api/market/candles?symbol=${encodeURIComponent(symbol)}`,
      ),
    enabled: Boolean(symbol),
  });
}
