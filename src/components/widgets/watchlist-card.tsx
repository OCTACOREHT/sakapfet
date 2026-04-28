"use client";

import { useEffect, useMemo, useState } from "react";
import { BellRing, Plus, Trash2 } from "lucide-react";
import toast from "react-hot-toast";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { useAlphaVantage } from "@/hooks/use-alpha-vantage";
import { useBrowserNotifications } from "@/hooks/use-browser-notifications";
import { formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";
import { useWatchlistStore } from "@/store/watchlist-store";

export function WatchlistCard() {
  const { symbols, alerts, addSymbol, removeSymbol, addAlert, removeAlert, markAlertTriggered } =
    useWatchlistStore();
  const { data, isLoading } = useAlphaVantage(symbols);
  const { permission, notify, requestPermission } = useBrowserNotifications();
  const [newSymbol, setNewSymbol] = useState("");
  const [sectorFilter, setSectorFilter] = useState("all");
  const [sortBy, setSortBy] = useState("performance");
  const [alertSymbol, setAlertSymbol] = useState(symbols[0] ?? "AAPL");
  const [alertDirection, setAlertDirection] = useState<"above" | "below">("above");
  const [alertPrice, setAlertPrice] = useState("");

  const quotes = useMemo(() => data?.data ?? [], [data?.data]);

  useEffect(() => {
    if (!symbols.length) {
      return;
    }

    if (!symbols.includes(alertSymbol)) {
      setAlertSymbol(symbols[0]);
    }
  }, [alertSymbol, symbols]);

  const sectors = useMemo(
    () => ["all", ...new Set(quotes.map((quote) => quote.sector))],
    [quotes],
  );

  const filteredQuotes = useMemo(() => {
    const filtered = quotes.filter((quote) =>
      sectorFilter === "all" ? true : quote.sector === sectorFilter,
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === "marketCap") {
        return b.marketCap - a.marketCap;
      }
      return b.changePercent - a.changePercent;
    });
  }, [quotes, sectorFilter, sortBy]);

  useEffect(() => {
    alerts
      .filter((alert) => !alert.triggered)
      .forEach((alert) => {
        const quote = quotes.find((item) => item.symbol === alert.symbol);
        if (!quote) {
          return;
        }

        const triggered =
          alert.direction === "above"
            ? quote.price >= alert.targetPrice
            : quote.price <= alert.targetPrice;

        if (triggered) {
          const message = `${alert.symbol} hit ${formatCurrency(quote.price)}`;
          toast.success(message);
          notify("Price alert", message);
          markAlertTriggered(alert.id);
        }
      });
  }, [alerts, markAlertTriggered, notify, quotes]);

  const handleAddSymbol = () => {
    if (!newSymbol.trim()) {
      return;
    }
    addSymbol(newSymbol);
    setNewSymbol("");
  };

  const handleAddAlert = async () => {
    const target = Number(alertPrice);
    if (!alertSymbol || Number.isNaN(target)) {
      return;
    }

    if (permission === "default") {
      await requestPermission();
    }

    addAlert(alertSymbol, target, alertDirection);
    setAlertPrice("");
  };

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>Custom Watchlist</CardTitle>
          <CardDescription>Filters, alerts, and neon performance tracking</CardDescription>
        </div>
        <Badge variant="violet">{symbols.length} symbols</Badge>
      </CardHeader>

      <div className="grid gap-3 md:grid-cols-[1fr,160px,160px,auto]">
        <Input
          aria-label="Add stock symbol"
          placeholder="Add symbol e.g. PLTR"
          value={newSymbol}
          onChange={(event) => setNewSymbol(event.target.value.toUpperCase())}
        />
        <select
          aria-label="Filter watchlist by sector"
          value={sectorFilter}
          onChange={(event) => setSectorFilter(event.target.value)}
          className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black font-medium"
        >
          {sectors.map((sector) => (
            <option key={sector} value={sector} className="bg-white">
              {sector === "all" ? "All sectors" : sector}
            </option>
          ))}
        </select>
        <select
          aria-label="Sort watchlist"
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
          className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black font-medium"
        >
          <option className="bg-white" value="performance">
            Sort by performance
          </option>
          <option className="bg-white" value="marketCap">
            Sort by market cap
          </option>
        </select>
        <Button onClick={handleAddSymbol} aria-label="Add symbol to watchlist">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>

      <div className="mt-5 space-y-3">
        {isLoading && !quotes.length ? (
          Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-20 w-full rounded-3xl" />
          ))
        ) : (
          filteredQuotes.map((quote) => (
            <div
              key={quote.symbol}
              className="grid gap-4 rounded-3xl border border-black/5 bg-zinc-50 p-4 md:grid-cols-[1.2fr,0.8fr,0.7fr,auto]"
            >
              <div>
                <p className="font-bold text-black">{quote.symbol}</p>
                <p className="text-sm text-zinc-500">{quote.name}</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <Badge variant="neutral">{quote.sector}</Badge>
                  <Badge variant="default">{formatCompactNumber(quote.marketCap)}</Badge>
                </div>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">Price</p>
                <p className="mt-2 text-lg font-bold text-black">
                  {formatCurrency(quote.price)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-zinc-500 font-bold">Change</p>
                <p className={`mt-2 text-lg font-bold ${quote.changePercent >= 0 ? "glow-positive" : "glow-negative"}`}>
                  {formatPercent(quote.changePercent)}
                </p>
                <p className="mt-1 text-xs text-zinc-500">
                  Vol {formatCompactNumber(quote.volume)}
                </p>
              </div>
              <div className="flex items-start justify-end gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={`Remove ${quote.symbol} from watchlist`}
                  onClick={() => removeSymbol(quote.symbol)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="mt-6 rounded-3xl border border-black/5 bg-zinc-100 p-4">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <p className="font-heading text-lg text-black font-bold">Price Alerts</p>
            <p className="text-sm text-zinc-500">Browser notifications when a level breaks</p>
          </div>
          <BellRing className="h-5 w-5 text-black" />
        </div>

        <div className="grid gap-3 md:grid-cols-[1fr,140px,140px,auto]">
          <select
            aria-label="Choose alert symbol"
            value={alertSymbol}
            onChange={(event) => setAlertSymbol(event.target.value)}
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black font-medium"
          >
            {symbols.map((symbol) => (
              <option key={symbol} value={symbol} className="bg-white">
                {symbol}
              </option>
            ))}
          </select>
          <select
            aria-label="Choose alert direction"
            value={alertDirection}
            onChange={(event) => setAlertDirection(event.target.value as "above" | "below")}
            className="h-11 rounded-2xl border border-black/10 bg-white px-4 text-sm text-black font-medium"
          >
            <option className="bg-white" value="above">
              Above
            </option>
            <option className="bg-white" value="below">
              Below
            </option>
          </select>
          <Input
            aria-label="Alert price"
            placeholder="Target price"
            value={alertPrice}
            onChange={(event) => setAlertPrice(event.target.value)}
          />
          <Button variant="success" onClick={handleAddAlert} aria-label="Create price alert">
            Create alert
          </Button>
        </div>

        <div className="mt-4 space-y-2">
          {alerts.length ? (
            alerts.map((alert) => (
              <div
                key={alert.id}
                className="flex items-center justify-between rounded-2xl border border-black/5 bg-white px-4 py-3 text-sm"
              >
                <div className="flex items-center gap-3">
                  <Badge variant={alert.triggered ? "positive" : "neutral"}>
                    {alert.triggered ? "triggered" : "pending"}
                  </Badge>
                  <span className="text-black font-medium">
                    {alert.symbol} {alert.direction} {formatCurrency(alert.targetPrice)}
                  </span>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAlert(alert.id)}
                  aria-label="Remove price alert"
                >
                  Remove
                </Button>
              </div>
            ))
          ) : (
            <p className="text-sm text-slate-500">No alerts configured yet.</p>
          )}
        </div>
      </div>
    </Card>
  );
}
