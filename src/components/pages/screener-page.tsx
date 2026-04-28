"use client";

import { useMemo, useState } from "react";

import { SparklineChart } from "@/components/charts/sparkline-chart";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAlphaVantage } from "@/hooks/use-alpha-vantage";
import { generateMockScreener } from "@/lib/mock-data";
import { downloadCsv, formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";

export default function ScreenerPage() {
  const [sectorFilter, setSectorFilter] = useState("all");
  const [countryFilter, setCountryFilter] = useState("all");
  const [peMax, setPeMax] = useState("80");
  const [dividendMin, setDividendMin] = useState("0");
  const [capMin, setCapMin] = useState("50");

  const baseRows = useMemo(() => generateMockScreener(), []);
  const screenerQuery = useAlphaVantage(baseRows.map((row) => row.symbol));
  const liveMap = useMemo(
    () => new Map((screenerQuery.data?.data ?? []).map((row) => [row.symbol, row])),
    [screenerQuery.data?.data],
  );
  const rows = baseRows.map((row) => ({
    ...row,
    ...(liveMap.get(row.symbol) ?? {}),
    sparkline: liveMap.get(row.symbol)?.sparkline ?? row.sparkline,
  }));

  const sectors = ["all", ...new Set(rows.map((row) => row.sector))];
  const countries = ["all", ...new Set(rows.map((row) => row.country))];

  const filteredRows = rows.filter((row) => {
    const sectorMatch = sectorFilter === "all" || row.sector === sectorFilter;
    const countryMatch = countryFilter === "all" || row.country === countryFilter;
    const peMatch = row.peRatio <= Number(peMax);
    const dividendMatch = row.dividendYield >= Number(dividendMin);
    const capMatch = row.marketCap >= Number(capMin) * 1_000_000_000;
    return sectorMatch && countryMatch && peMatch && dividendMatch && capMatch;
  });

  const exportCsv = () => {
    downloadCsv(
      "neon-finance-screener.csv",
      filteredRows.map((row) => ({
        symbol: row.symbol,
        name: row.name,
        sector: row.sector,
        country: row.country,
        price: row.price,
        changePercent: row.changePercent,
        marketCap: row.marketCap,
        peRatio: row.peRatio,
        dividendYield: row.dividendYield,
      })),
    );
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Equity Screener</CardTitle>
            <CardDescription>
              Filter by sector, geography, valuation, dividend, and capitalization.
            </CardDescription>
          </div>
          <Badge variant="violet">{filteredRows.length} matches</Badge>
        </CardHeader>

        <div className="grid gap-4 xl:grid-cols-5">
          <select
            aria-label="Filter screener by sector"
            value={sectorFilter}
            onChange={(event) => setSectorFilter(event.target.value)}
            className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
          >
            {sectors.map((sector) => (
              <option key={sector} value={sector} className="bg-slate-900">
                {sector}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter screener by country"
            value={countryFilter}
            onChange={(event) => setCountryFilter(event.target.value)}
            className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
          >
            {countries.map((country) => (
              <option key={country} value={country} className="bg-slate-900">
                {country}
              </option>
            ))}
          </select>
          <Input aria-label="Maximum PE ratio" placeholder="PE max" value={peMax} onChange={(event) => setPeMax(event.target.value)} />
          <Input aria-label="Minimum dividend yield" placeholder="Dividend min" value={dividendMin} onChange={(event) => setDividendMin(event.target.value)} />
          <Input aria-label="Minimum market cap in billions" placeholder="Min cap (B)" value={capMin} onChange={(event) => setCapMin(event.target.value)} />
        </div>

        <div className="mt-6 flex justify-end">
          <Button variant="outline" onClick={exportCsv}>
            Export CSV
          </Button>
        </div>
      </Card>

      <Card>
        <CardHeader>
          <div>
            <CardTitle>Screened Universe</CardTitle>
            <CardDescription>Sorted live table with valuation overlays and sparklines</CardDescription>
          </div>
        </CardHeader>

        <div className="space-y-3">
          {filteredRows
            .sort((a, b) => b.changePercent - a.changePercent)
            .map((row) => (
              <div
                key={row.symbol}
                className="grid gap-4 rounded-3xl border border-white/8 bg-white/[0.03] p-4 md:grid-cols-[1fr,0.7fr,0.7fr,0.7fr,0.9fr,120px]"
              >
                <div>
                  <p className="font-semibold text-white">{row.symbol}</p>
                  <p className="text-sm text-slate-500">
                    {row.name} • {row.country}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Price</p>
                  <p className="mt-2 font-semibold text-white">{formatCurrency(row.price)}</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Change</p>
                  <p className={row.changePercent >= 0 ? "glow-positive mt-2 font-semibold" : "glow-negative mt-2 font-semibold"}>
                    {formatPercent(row.changePercent)}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">PE / Div</p>
                  <p className="mt-2 text-sm text-white">
                    {row.peRatio.toFixed(1)} / {row.dividendYield.toFixed(2)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Market cap</p>
                  <p className="mt-2 text-sm text-white">{formatCompactNumber(row.marketCap)}</p>
                </div>
                <div className="flex items-center justify-end">
                  <SparklineChart values={row.sparkline} positive={row.changePercent >= 0} />
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );
}
