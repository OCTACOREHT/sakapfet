import type { NewsCategory, PortfolioRange } from "@/types/market";

export const DASHBOARD_SYMBOLS = [
  "AAPL",
  "MSFT",
  "NVDA",
  "TSLA",
  "AMZN",
  "META",
  "GOOGL",
  "SPY",
];

export const DEFAULT_WATCHLIST = ["AAPL", "MSFT", "NVDA", "TSLA", "AMZN"];

export const NEWS_CATEGORIES: NewsCategory[] = [
  "all",
  "stocks",
  "forex",
  "commodities",
];

export const PORTFOLIO_RANGES: PortfolioRange[] = ["1D", "1W", "1M", "1Y"];

export const MARKET_EXCHANGES = [
  {
    label: "NYSE",
    timezone: "America/New_York",
    openMinutes: 9 * 60 + 30,
    closeMinutes: 16 * 60,
    premarketMinutes: 4 * 60,
  },
  {
    label: "NASDAQ",
    timezone: "America/New_York",
    openMinutes: 9 * 60 + 30,
    closeMinutes: 16 * 60,
    premarketMinutes: 4 * 60,
  },
  {
    label: "LSE",
    timezone: "Europe/London",
    openMinutes: 8 * 60,
    closeMinutes: 16 * 60 + 30,
    premarketMinutes: 7 * 60,
  },
  {
    label: "Tokyo",
    timezone: "Asia/Tokyo",
    openMinutes: 9 * 60,
    closeMinutes: 15 * 60,
    premarketMinutes: 8 * 60,
  },
];

// Crypto assets removed for Sakapfet Okap focus
export const COINCAP_ASSETS = [];

export const NEWS_CATEGORY_QUERIES: Record<NewsCategory, string> = {
  all: "haiti OR nord d'haiti OR cap-haitien OR culture OR economy",
  stocks: "economy OR business OR finance",
  crypto: "haiti culture OR art OR music", // Redirecting crypto query to culture for safety
  forex: "politics OR social issues",
  commodities: "agriculture OR tourism OR environment",
};
