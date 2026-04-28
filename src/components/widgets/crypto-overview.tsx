import { ArrowUpRight, Coins } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";
import type { CryptoAsset } from "@/types/market";

export function CryptoOverview({
  assets,
  compact = false,
}: {
  assets: CryptoAsset[];
  compact?: boolean;
}) {
  const btc = assets.find((asset) => asset.symbol === "BTC");
  const eth = assets.find((asset) => asset.symbol === "ETH");

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>Crypto Command</CardTitle>
          <CardDescription>Top assets, dominance, and intraday pulse</CardDescription>
        </div>
        <Badge variant="violet">
          <Coins className="h-3.5 w-3.5" />
          Top {compact ? 5 : assets.length}
        </Badge>
      </CardHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-3xl border border-black/5 bg-zinc-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Bitcoin dominance
          </p>
          <p className="mt-3 text-3xl font-bold text-black">
            {btc?.dominance.toFixed(2) ?? "0.00"}%
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-zinc-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Ethereum dominance
          </p>
          <p className="mt-3 text-3xl font-bold text-black">
            {eth?.dominance.toFixed(2) ?? "0.00"}%
          </p>
        </div>
        <div className="rounded-3xl border border-black/5 bg-zinc-50 p-4">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
            Market depth
          </p>
          <p className="mt-3 text-3xl font-bold text-black">
            {formatCompactNumber(assets.reduce((sum, asset) => sum + asset.volume, 0))}
          </p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        {assets.slice(0, compact ? 5 : 8).map((asset) => (
          <div
            key={asset.id}
            className="grid gap-4 rounded-3xl border border-black/5 bg-zinc-50 p-4 md:grid-cols-[1fr,0.9fr,0.8fr]"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-black/10 bg-zinc-100 font-heading text-black font-bold">
                {asset.symbol.slice(0, 2)}
              </div>
              <div>
                <p className="font-bold text-black">{asset.name}</p>
                <p className="text-sm text-zinc-500">{asset.symbol}</p>
              </div>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">Price</p>
              <p className="mt-2 font-bold text-black">{formatCurrency(asset.price)}</p>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-500">
                  24h move
                </p>
                <p className={asset.change24h >= 0 ? "glow-positive font-bold" : "glow-negative font-bold"}>
                  {formatPercent(asset.change24h)}
                </p>
              </div>
              <ArrowUpRight className="h-5 w-5 text-black" />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
