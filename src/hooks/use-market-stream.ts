"use client";

import useSWR from "swr";

import type { OverviewResponse } from "@/types/market";

export function useMarketStream(symbols: string[]) {
  return useSWR<OverviewResponse>(
    `/api/market/overview?symbols=${encodeURIComponent(symbols.join(","))}`,
    {
      refreshInterval: 15_000,
    },
  );
}
