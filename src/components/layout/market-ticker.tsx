"use client";

import useSWR from "swr";

import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { DASHBOARD_SYMBOLS } from "@/lib/constants";
import { formatCurrency, formatPercent } from "@/lib/utils";
import type { OverviewResponse } from "@/types/market";

export function MarketTicker() {
  const { data, isLoading } = useSWR<OverviewResponse>(
    `/api/market/overview?symbols=${DASHBOARD_SYMBOLS.join(",")}`,
    {
      refreshInterval: 15_000,
    },
  );

  if (isLoading && !data) {
    return <Skeleton className="mx-4 mt-4 h-14 rounded-2xl md:mx-6" />;
  }

  const items = [...(data?.data ?? []), ...(data?.data ?? [])];

  return (
    <div className="overflow-hidden border-b border-black/5 bg-zinc-50 px-4 py-3 md:px-6">
      <div className="mx-auto flex max-w-[1440px] ticker-track animate-marquee items-center gap-4">
        {items.map((quote, index) => (
          <div
            key={`${quote.symbol}-${index}`}
            className="flex min-w-[220px] items-center justify-between rounded-2xl border border-black/10 bg-white px-4 py-3 shadow-sm"
          >
            <div>
              <p className="font-bold text-black">{quote.symbol}</p>
              <p className="text-xs text-zinc-500">{quote.name}</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-black">{formatCurrency(quote.price)}</p>
              <Badge variant={quote.changePercent >= 0 ? "positive" : "negative"}>
                {formatPercent(quote.changePercent)}
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
