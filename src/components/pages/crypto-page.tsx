"use client";

import { PortfolioAreaChart } from "@/components/charts/portfolio-area-chart";
import { SparklineChart } from "@/components/charts/sparkline-chart";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { CryptoOverview } from "@/components/widgets/crypto-overview";
import { useCrypto, useCryptoStream } from "@/hooks/use-crypto";
import { buildCorrelationSeries, generateMockCryptoMarkets } from "@/lib/mock-data";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

export default function CryptoPage() {
  const cryptoQuery = useCrypto();
  const assets = useCryptoStream(cryptoQuery.data?.data ?? generateMockCryptoMarkets());
  const correlationSeries = buildCorrelationSeries().map((point) => ({
    label: point.label,
    portfolio: point.crypto,
    benchmark: point.equities,
  }));

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.1fr,0.9fr]">
        <CryptoOverview assets={assets} />

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Crypto / Equity Correlation</CardTitle>
              <CardDescription>
                Rolling comparative momentum between crypto beta and equity risk appetite
              </CardDescription>
            </div>
            <Badge variant="violet">Live blend</Badge>
          </CardHeader>
          <PortfolioAreaChart data={correlationSeries} currency={false} />
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Top 20 Crypto Assets</CardTitle>
            <CardDescription>CoinGecko market depth with CoinCap live pricing</CardDescription>
          </div>
        </CardHeader>

        {cryptoQuery.isLoading && !cryptoQuery.data ? (
          <div className="space-y-3">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-20 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {assets.map((asset) => (
              <div
                key={asset.id}
                className="grid gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[1fr,0.8fr,0.8fr,0.9fr,120px]"
              >
                <div>
                  <p className="font-semibold text-white">{asset.name}</p>
                  <p className="text-sm text-slate-500">{asset.symbol}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                  <p className="mt-2 font-semibold text-white">{formatCurrency(asset.price)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">24h</p>
                  <p className={asset.change24h >= 0 ? "glow-positive mt-2 font-semibold" : "glow-negative mt-2 font-semibold"}>
                    {formatPercent(asset.change24h)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Market cap / volume
                  </p>
                  <p className="mt-2 text-sm text-white">
                    {formatCompactNumber(asset.marketCap)} / {formatCompactNumber(asset.volume)}
                  </p>
                </div>
                <div className="flex items-center justify-end">
                  <SparklineChart values={asset.sparkline} positive={asset.change24h >= 0} />
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
