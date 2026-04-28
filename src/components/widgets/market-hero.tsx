"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Activity, Clock3, Globe2, TrendingUp } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { getMarketClocks } from "@/lib/market-time";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";
import type { FearGreedData, MarketClock, MarketQuote } from "@/types/market";

export function MarketHero({
  quotes,
  fearGreed,
}: {
  quotes: MarketQuote[];
  fearGreed?: FearGreedData;
}) {
  const [clocks, setClocks] = useState<MarketClock[]>(getMarketClocks());

  useEffect(() => {
    const timer = window.setInterval(() => {
      setClocks(getMarketClocks());
    }, 60_000);

    return () => window.clearInterval(timer);
  }, []);

  const gainers = quotes.filter((quote) => quote.changePercent >= 0).length;
  const marketCap = quotes.reduce((sum, quote) => sum + quote.marketCap, 0);
  const strongest = [...quotes].sort((a, b) => b.changePercent - a.changePercent)[0];
  const marketPulse = clocks.filter((clock) => clock.status === "open").length;

  return (
    <Card className="relative overflow-hidden p-6 lg:p-7">
      <div className="pointer-events-none absolute inset-0 bg-hero-orb opacity-90" />
      <div className="relative grid gap-8 xl:grid-cols-[1.4fr,0.9fr]">
        <div className="space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <Badge variant="violet">Realtime dashboard</Badge>
            <Badge variant={marketPulse > 0 ? "positive" : "neutral"}>
              {marketPulse} markets open
            </Badge>
            {fearGreed ? (
              <Badge variant={fearGreed.value >= 55 ? "positive" : "neutral"}>
                Fear & Greed {fearGreed.value}
              </Badge>
            ) : null}
          </div>

          <div className="space-y-4">
            <motion.h2
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl font-heading text-4xl leading-tight text-white md:text-5xl"
            >
              Financial signal intelligence with a neon trading-floor pulse.
            </motion.h2>
            <p className="max-w-2xl text-base leading-7 text-slate-300">
              Track cross-market momentum, portfolio drift, macro emotion, and
              sector leadership through an animated glassmorphism control room.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Watched market cap
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {formatCurrency(marketCap, true)}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Breadth
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {gainers}/{quotes.length} green
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-400">
                Lead momentum
              </p>
              <p className="mt-3 text-2xl font-semibold text-white">
                {strongest?.symbol ?? "NVDA"}
              </p>
              <p className="mt-1 text-sm text-mint">
                {strongest ? formatPercent(strongest.changePercent) : "+0.00%"}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {quotes.slice(0, 4).map((quote) => (
              <div
                key={quote.symbol}
                className="rounded-2xl border border-white/10 bg-black/20 px-4 py-3"
              >
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  {quote.symbol}
                </p>
                <p className="mt-1 font-semibold text-white">
                  {formatCurrency(quote.price)}
                </p>
                <p className={quote.changePercent >= 0 ? "glow-positive" : "glow-negative"}>
                  {formatPercent(quote.changePercent)}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            {clocks.map((clock) => (
              <div
                key={clock.label}
                className="rounded-3xl border border-white/10 bg-white/5 p-4"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">{clock.label}</p>
                  <Badge
                    variant={
                      clock.status === "open"
                        ? "positive"
                        : clock.status === "pre-market"
                          ? "violet"
                          : "neutral"
                    }
                  >
                    {clock.status}
                  </Badge>
                </div>
                <p className="mt-4 font-heading text-3xl text-white">{clock.time}</p>
                <p className="mt-2 text-xs uppercase tracking-[0.18em] text-slate-500">
                  {clock.timezone}
                </p>
              </div>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <Clock3 className="h-5 w-5 text-electric" />
              <p className="mt-3 text-sm text-slate-400">Market time sync</p>
              <p className="mt-2 font-semibold text-white">UTC aligned</p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <TrendingUp className="h-5 w-5 text-mint" />
              <p className="mt-3 text-sm text-slate-400">Aggregate volume</p>
              <p className="mt-2 font-semibold text-white">
                {formatCompactNumber(quotes.reduce((sum, quote) => sum + quote.volume, 0))}
              </p>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
              <Activity className="h-5 w-5 text-violet" />
              <p className="mt-3 text-sm text-slate-400">Global routing</p>
              <p className="mt-2 flex items-center gap-2 font-semibold text-white">
                <Globe2 className="h-4 w-4" />
                Cross-asset live
              </p>
            </div>
          </div>

          <Button variant="outline" className="w-full justify-between">
            <span>Pulse score from live basket</span>
            <span className="font-heading text-lg text-electric">
              {quotes.length ? Math.round(quotes.reduce((sum, quote) => sum + quote.changePercent, 0) / quotes.length + 50) : 50}
            </span>
          </Button>
        </div>
      </div>
    </Card>
  );
}
