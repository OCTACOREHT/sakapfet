"use client";

import { useMemo, useState } from "react";
import { Trash2 } from "lucide-react";

import { AllocationDonutChart } from "@/components/charts/allocation-donut-chart";
import { PortfolioAreaChart } from "@/components/charts/portfolio-area-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { PORTFOLIO_RANGES } from "@/lib/constants";
import {
  buildPortfolioComparisonSeries,
  computeAllocationBySector,
  computePortfolioSnapshot,
  computePositionMetrics,
} from "@/lib/portfolio";
import { formatCurrency, formatPercent, unique } from "@/lib/utils";
import { useAlphaVantage } from "@/hooks/use-alpha-vantage";
import { usePortfolioStore } from "@/store/portfolio-store";
import type { PortfolioRange } from "@/types/market";

export default function PortfolioPage() {
  const { holdings, addHolding, removeHolding } = usePortfolioStore();
  const [range, setRange] = useState<PortfolioRange>("1M");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [entryPrice, setEntryPrice] = useState("");
  const [sector, setSector] = useState("");

  const symbols = useMemo(
    () => unique([...holdings.map((holding) => holding.symbol), "SPY"]),
    [holdings],
  );
  const overviewQuery = useAlphaVantage(symbols);
  const quotes = overviewQuery.data?.data ?? [];
  const snapshot = computePortfolioSnapshot(holdings, quotes);
  const allocation = computeAllocationBySector(holdings, quotes);
  const series = buildPortfolioComparisonSeries(range, holdings, quotes);

  const pnlPercent =
    snapshot.totalCost === 0 ? 0 : (snapshot.totalPnl / snapshot.totalCost) * 100;

  const handleSubmit = () => {
    const parsedQuantity = Number(quantity);
    const parsedEntry = Number(entryPrice);

    if (!symbol || Number.isNaN(parsedQuantity) || Number.isNaN(parsedEntry) || !sector) {
      return;
    }

    addHolding({
      symbol: symbol.toUpperCase(),
      quantity: parsedQuantity,
      entryPrice: parsedEntry,
      sector,
    });

    setSymbol("");
    setQuantity("");
    setEntryPrice("");
    setSector("");
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-[1.15fr,0.85fr]">
        <Card>
          <CardHeader>
            <div>
              <CardTitle>Portfolio Performance</CardTitle>
              <CardDescription>Real-time P&amp;L with benchmark comparison</CardDescription>
            </div>
            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_RANGES.map((option) => (
                <Button
                  key={option}
                  size="sm"
                  variant={range === option ? "default" : "outline"}
                  onClick={() => setRange(option)}
                  aria-label={`Set portfolio range to ${option}`}
                >
                  {option}
                </Button>
              ))}
            </div>
          </CardHeader>

          <div className="mb-6 grid gap-4 md:grid-cols-3">
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Total value
              </p>
              <p className="mt-3 text-3xl font-semibold text-white">
                {formatCurrency(snapshot.totalValue || 0)}
              </p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                P&amp;L
              </p>
              <p className={snapshot.totalPnl >= 0 ? "glow-positive mt-3 text-3xl font-semibold" : "glow-negative mt-3 text-3xl font-semibold"}>
                {formatCurrency(snapshot.totalPnl || 0)}
              </p>
            </div>
            <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
              <p className="text-xs uppercase tracking-[0.22em] text-slate-500">
                Return
              </p>
              <p className={pnlPercent >= 0 ? "glow-positive mt-3 text-3xl font-semibold" : "glow-negative mt-3 text-3xl font-semibold"}>
                {formatPercent(pnlPercent)}
              </p>
            </div>
          </div>

          <PortfolioAreaChart data={series} />
        </Card>

        <Card>
          <CardHeader>
            <div>
              <CardTitle>Add Position</CardTitle>
              <CardDescription>Simulate holdings with live valuation</CardDescription>
            </div>
            <Badge variant="violet">{holdings.length} holdings</Badge>
          </CardHeader>

          <div className="grid gap-3">
            <Input
              aria-label="Holding symbol"
              placeholder="Symbol"
              value={symbol}
              onChange={(event) => setSymbol(event.target.value.toUpperCase())}
            />
            <Input
              aria-label="Quantity"
              placeholder="Quantity"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
            <Input
              aria-label="Entry price"
              placeholder="Entry price"
              value={entryPrice}
              onChange={(event) => setEntryPrice(event.target.value)}
            />
            <Input
              aria-label="Sector"
              placeholder="Sector"
              value={sector}
              onChange={(event) => setSector(event.target.value)}
            />
            <Button onClick={handleSubmit}>Add position</Button>
          </div>

          <div className="mt-6">
            <AllocationDonutChart data={allocation} />
          </div>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Holdings Ledger</CardTitle>
            <CardDescription>Live mark-to-market breakdown by position</CardDescription>
          </div>
        </CardHeader>

        <div className="space-y-3">
          {holdings.map((holding) => {
            const quote = quotes.find((item) => item.symbol === holding.symbol);
            const metrics = computePositionMetrics(holding, quote);

            return (
              <div
                key={holding.id}
                className="grid gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[1fr,0.9fr,0.9fr,0.7fr,auto]"
              >
                <div>
                  <p className="font-semibold text-white">{holding.symbol}</p>
                  <p className="text-sm text-slate-500">{holding.sector}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Position value
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {formatCurrency(metrics.value)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Entry / current
                  </p>
                  <p className="mt-2 font-semibold text-white">
                    {formatCurrency(holding.entryPrice)} / {formatCurrency(metrics.currentPrice)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">P&amp;L</p>
                  <p className={metrics.pnl >= 0 ? "glow-positive mt-2 font-semibold" : "glow-negative mt-2 font-semibold"}>
                    {formatCurrency(metrics.pnl)} ({formatPercent(metrics.pnlPercent)})
                  </p>
                </div>
                <div className="flex justify-end">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeHolding(holding.id)}
                    aria-label={`Remove ${holding.symbol} position`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}
