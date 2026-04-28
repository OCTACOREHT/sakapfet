import { generateMockCandles, generateMockQuotes } from "@/lib/mock-data";
import type { CandlestickPoint, MarketQuote } from "@/types/market";

const ALPHA_BASE_URL = "https://www.alphavantage.co/query";
const YAHOO_QUOTE_URL = "https://query1.finance.yahoo.com/v7/finance/quote";
const YAHOO_CHART_URL = "https://query1.finance.yahoo.com/v8/finance/chart";

function mergeQuote(base: MarketQuote, partial?: Partial<MarketQuote> | null): MarketQuote {
  if (!partial) {
    return base;
  }

  return {
    ...base,
    ...partial,
    sparkline: partial.sparkline ?? base.sparkline,
    updatedAt: new Date().toISOString(),
  };
}

async function fetchAlphaQuote(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${ALPHA_BASE_URL}?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(7000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      "Global Quote"?: Record<string, string>;
    };
    const quote = payload["Global Quote"];

    if (!quote?.["05. price"]) {
      return null;
    }

    return {
      symbol,
      price: Number(quote["05. price"]),
      change: Number(quote["09. change"]),
      changePercent: Number(quote["10. change percent"].replace("%", "")),
      volume: Number(quote["06. volume"]),
      updatedAt: new Date().toISOString(),
    } satisfies Partial<MarketQuote>;
  } catch {
    return null;
  }
}

async function fetchYahooQuotes(symbols: string[]) {
  try {
    const response = await fetch(`${YAHOO_QUOTE_URL}?symbols=${symbols.join(",")}`, {
      next: { revalidate: 30 },
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      signal: AbortSignal.timeout(7000),
    });

    if (!response.ok) {
      return [];
    }

    const payload = (await response.json()) as {
      quoteResponse?: {
        result?: Array<{
          symbol: string;
          shortName?: string;
          regularMarketPrice?: number;
          regularMarketChange?: number;
          regularMarketChangePercent?: number;
          regularMarketVolume?: number;
          marketCap?: number;
        }>;
      };
    };

    return (payload.quoteResponse?.result ?? []).map((quote) => ({
      symbol: quote.symbol,
      name: quote.shortName,
      price: quote.regularMarketPrice,
      change: quote.regularMarketChange,
      changePercent: quote.regularMarketChangePercent,
      volume: quote.regularMarketVolume,
      marketCap: quote.marketCap,
      updatedAt: new Date().toISOString(),
    })) as Partial<MarketQuote>[];
  } catch {
    return [];
  }
}

async function fetchAlphaCandles(symbol: string) {
  const apiKey = process.env.ALPHA_VANTAGE_API_KEY;
  if (!apiKey) {
    return null;
  }

  try {
    const response = await fetch(
      `${ALPHA_BASE_URL}?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=15min&outputsize=compact&apikey=${apiKey}`,
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      "Time Series (15min)"?: Record<
        string,
        {
          "1. open": string;
          "2. high": string;
          "3. low": string;
          "4. close": string;
          "5. volume": string;
        }
      >;
    };

    const entries = Object.entries(payload["Time Series (15min)"] ?? {});
    if (!entries.length) {
      return null;
    }

    return entries
      .map(([timestamp, values]) => ({
        time: Math.floor(new Date(timestamp).getTime() / 1000),
        open: Number(values["1. open"]),
        high: Number(values["2. high"]),
        low: Number(values["3. low"]),
        close: Number(values["4. close"]),
        volume: Number(values["5. volume"]),
      }))
      .sort((a, b) => a.time - b.time);
  } catch {
    return null;
  }
}

async function fetchYahooCandles(symbol: string): Promise<CandlestickPoint[] | null> {
  try {
    const response = await fetch(`${YAHOO_CHART_URL}/${symbol}?range=5d&interval=15m`, {
      next: { revalidate: 30 },
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
      signal: AbortSignal.timeout(7000),
    });

    if (!response.ok) {
      return null;
    }

    const payload = (await response.json()) as {
      chart?: {
        result?: Array<{
          timestamp?: number[];
          indicators?: {
            quote?: Array<{
              open?: Array<number | null>;
              high?: Array<number | null>;
              low?: Array<number | null>;
              close?: Array<number | null>;
              volume?: Array<number | null>;
            }>;
          };
        }>;
      };
    };

    const result = payload.chart?.result?.[0];
    const quote = result?.indicators?.quote?.[0];
    const timestamps = result?.timestamp ?? [];

    if (!quote || !timestamps.length) {
      return null;
    }

    return timestamps
      .map((time, index) => {
        const open = quote.open?.[index];
        const high = quote.high?.[index];
        const low = quote.low?.[index];
        const close = quote.close?.[index];

        if (
          open == null ||
          high == null ||
          low == null ||
          close == null
        ) {
          return null;
        }

        return {
          time,
          open,
          high,
          low,
          close,
          volume: quote.volume?.[index] ?? 0,
        };
      })
      .filter((entry): entry is CandlestickPoint => Boolean(entry));
  } catch {
    return null;
  }
}

export async function getMarketOverview(symbols: string[]) {
  const normalized = [...new Set(symbols.map((symbol) => symbol.toUpperCase()))];
  const fallback = generateMockQuotes(normalized);
  const yahooQuotes = await fetchYahooQuotes(normalized);
  const yahooMap = new Map(
    yahooQuotes
      .filter((quote) => quote.symbol)
      .map((quote) => [quote.symbol as string, quote]),
  );

  const alphaResults = await Promise.allSettled(
    normalized.slice(0, 3).map((symbol) => fetchAlphaQuote(symbol)),
  );
  const alphaEntries: Array<[string, Partial<MarketQuote> | null]> = [];
  alphaResults.forEach((result, index) => {
    if (result.status === "fulfilled") {
      alphaEntries.push([normalized[index], result.value]);
    }
  });
  const alphaMap = new Map(alphaEntries);

  const merged = fallback.map((quote) =>
    mergeQuote(mergeQuote(quote, yahooMap.get(quote.symbol)), alphaMap.get(quote.symbol)),
  );

  return {
    data: merged,
    source: process.env.ALPHA_VANTAGE_API_KEY ? "alpha-vantage/yahoo" : "yahoo/mock",
    updatedAt: new Date().toISOString(),
  };
}

export async function getStockCandles(symbol: string) {
  const alpha = await fetchAlphaCandles(symbol);
  if (alpha?.length) {
    return {
      data: alpha,
      source: "alpha-vantage",
      symbol,
    };
  }

  const yahoo = await fetchYahooCandles(symbol);
  if (yahoo?.length) {
    return {
      data: yahoo,
      source: "yahoo-finance",
      symbol,
    };
  }

  return {
    data: generateMockCandles(symbol),
    source: "mock",
    symbol,
  };
}
