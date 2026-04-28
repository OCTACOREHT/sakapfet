export type MarketStatus = "open" | "closed" | "pre-market";
export type SentimentTone = "positive" | "negative" | "neutral";
export type NewsCategory = "all" | "stocks" | "crypto" | "forex" | "commodities";
export type PortfolioRange = "1D" | "1W" | "1M" | "1Y";

export interface MarketQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
  country: string;
  peRatio: number;
  dividendYield: number;
  sparkline: number[];
  updatedAt: string;
}

export interface CandlestickPoint {
  time: number;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
}

export interface MarketClock {
  label: string;
  timezone: string;
  time: string;
  status: MarketStatus;
}

export interface FearGreedData {
  value: number;
  valueText: string;
  previousClose: number;
  lastUpdated: string;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  summary: string;
  imageUrl: string;
  url: string;
  source: string;
  ticker: string;
  category: Exclude<NewsCategory, "all">;
  sentiment: SentimentTone;
  publishedAt: string;
}

export interface CryptoAsset {
  id: string;
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  marketCap: number;
  volume: number;
  dominance: number;
  sparkline: number[];
}

export interface SectorHeatCell {
  label: string;
  value: number;
  changePercent: number;
}

export interface PortfolioHolding {
  id: string;
  symbol: string;
  quantity: number;
  entryPrice: number;
  sector: string;
  addedAt: string;
}

export interface PriceAlert {
  id: string;
  symbol: string;
  direction: "above" | "below";
  targetPrice: number;
  triggered: boolean;
}

export interface OverviewResponse {
  data: MarketQuote[];
  source: string;
  updatedAt: string;
}

export interface CandlesResponse {
  data: CandlestickPoint[];
  source: string;
  symbol: string;
}

export interface CryptoResponse {
  data: CryptoAsset[];
  source: string;
  updatedAt: string;
}

export interface NewsResponse {
  data: NewsArticle[];
  source: string;
  updatedAt: string;
}

export interface FearGreedResponse {
  data: FearGreedData;
  source: string;
  updatedAt: string;
}
