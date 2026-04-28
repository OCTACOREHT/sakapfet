import { buildPerformanceSeries } from "@/lib/mock-data";
import type { MarketQuote, PortfolioHolding, PortfolioRange } from "@/types/market";

export function buildQuoteMap(quotes: MarketQuote[]) {
  return new Map(quotes.map((quote) => [quote.symbol, quote]));
}

export function computePositionMetrics(
  holding: PortfolioHolding,
  quote?: MarketQuote,
) {
  const currentPrice = quote?.price ?? holding.entryPrice;
  const value = currentPrice * holding.quantity;
  const cost = holding.entryPrice * holding.quantity;
  const pnl = value - cost;
  const pnlPercent = cost === 0 ? 0 : (pnl / cost) * 100;

  return {
    currentPrice,
    value,
    cost,
    pnl,
    pnlPercent,
  };
}

export function computePortfolioSnapshot(
  holdings: PortfolioHolding[],
  quotes: MarketQuote[],
) {
  const quoteMap = buildQuoteMap(quotes);

  return holdings.reduce(
    (acc, holding) => {
      const metrics = computePositionMetrics(holding, quoteMap.get(holding.symbol));
      acc.totalValue += metrics.value;
      acc.totalCost += metrics.cost;
      acc.totalPnl += metrics.pnl;
      return acc;
    },
    { totalValue: 0, totalCost: 0, totalPnl: 0 },
  );
}

export function computeAllocationBySector(
  holdings: PortfolioHolding[],
  quotes: MarketQuote[],
) {
  const quoteMap = buildQuoteMap(quotes);
  const grouped = holdings.reduce<Record<string, number>>((acc, holding) => {
    const metrics = computePositionMetrics(holding, quoteMap.get(holding.symbol));
    acc[holding.sector] = (acc[holding.sector] ?? 0) + metrics.value;
    return acc;
  }, {});

  return Object.entries(grouped).map(([name, value]) => ({
    name,
    value: Number(value.toFixed(2)),
  }));
}

export function buildPortfolioComparisonSeries(
  range: PortfolioRange,
  holdings: PortfolioHolding[],
  quotes: MarketQuote[],
) {
  const snapshot = computePortfolioSnapshot(holdings, quotes);
  return buildPerformanceSeries(range, snapshot.totalValue || 125_000, 100);
}
