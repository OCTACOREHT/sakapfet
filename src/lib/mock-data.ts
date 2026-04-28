import { classifySentiment } from "@/lib/sentiment";
import { hashSeed } from "@/lib/utils";
import type {
  CandlestickPoint,
  CryptoAsset,
  FearGreedData,
  MarketQuote,
  NewsArticle,
  NewsCategory,
  PortfolioRange,
  SectorHeatCell,
} from "@/types/market";

type StockSeed = {
  symbol: string;
  name: string;
  sector: string;
  country: string;
  basePrice: number;
  marketCap: number;
  peRatio: number;
  dividendYield: number;
};

const STOCK_SEEDS: StockSeed[] = [
  { symbol: "AAPL", name: "Apple Inc.", sector: "Technology", country: "United States", basePrice: 214.16, marketCap: 3_210_000_000_000, peRatio: 31.2, dividendYield: 0.46 },
  { symbol: "MSFT", name: "Microsoft", sector: "Technology", country: "United States", basePrice: 431.48, marketCap: 3_020_000_000_000, peRatio: 37.1, dividendYield: 0.72 },
  { symbol: "NVDA", name: "NVIDIA", sector: "Semiconductors", country: "United States", basePrice: 926.82, marketCap: 2_280_000_000_000, peRatio: 61.8, dividendYield: 0.03 },
  { symbol: "TSLA", name: "Tesla", sector: "Automotive", country: "United States", basePrice: 218.64, marketCap: 698_000_000_000, peRatio: 54.7, dividendYield: 0 },
  { symbol: "AMZN", name: "Amazon", sector: "Consumer", country: "United States", basePrice: 184.53, marketCap: 1_920_000_000_000, peRatio: 42.2, dividendYield: 0 },
  { symbol: "META", name: "Meta Platforms", sector: "Communication", country: "United States", basePrice: 496.32, marketCap: 1_260_000_000_000, peRatio: 28.9, dividendYield: 0.41 },
  { symbol: "GOOGL", name: "Alphabet", sector: "Communication", country: "United States", basePrice: 174.25, marketCap: 2_080_000_000_000, peRatio: 29.5, dividendYield: 0.44 },
  { symbol: "SPY", name: "SPDR S&P 500 ETF", sector: "ETF", country: "United States", basePrice: 523.77, marketCap: 479_000_000_000, peRatio: 24.8, dividendYield: 1.28 },
  { symbol: "JPM", name: "JPMorgan Chase", sector: "Financials", country: "United States", basePrice: 198.74, marketCap: 573_000_000_000, peRatio: 13.4, dividendYield: 2.21 },
  { symbol: "XOM", name: "Exxon Mobil", sector: "Energy", country: "United States", basePrice: 117.41, marketCap: 468_000_000_000, peRatio: 14.7, dividendYield: 3.14 },
  { symbol: "LLY", name: "Eli Lilly", sector: "Healthcare", country: "United States", basePrice: 783.09, marketCap: 744_000_000_000, peRatio: 67.3, dividendYield: 0.62 },
  { symbol: "COST", name: "Costco", sector: "Consumer", country: "United States", basePrice: 721.38, marketCap: 320_000_000_000, peRatio: 52.6, dividendYield: 0.59 },
  { symbol: "PLTR", name: "Palantir", sector: "Software", country: "United States", basePrice: 31.24, marketCap: 70_000_000_000, peRatio: 166.2, dividendYield: 0 },
  { symbol: "AMD", name: "Advanced Micro Devices", sector: "Semiconductors", country: "United States", basePrice: 176.22, marketCap: 285_000_000_000, peRatio: 44.1, dividendYield: 0 },
  { symbol: "KO", name: "Coca-Cola", sector: "Consumer Staples", country: "United States", basePrice: 61.84, marketCap: 267_000_000_000, peRatio: 24.8, dividendYield: 3.03 },
  { symbol: "ASML", name: "ASML Holding", sector: "Semiconductors", country: "Netherlands", basePrice: 958.42, marketCap: 378_000_000_000, peRatio: 39.8, dividendYield: 0.94 },
  { symbol: "TM", name: "Toyota Motor", sector: "Automotive", country: "Japan", basePrice: 245.18, marketCap: 328_000_000_000, peRatio: 11.6, dividendYield: 2.42 },
  { symbol: "SHEL", name: "Shell", sector: "Energy", country: "United Kingdom", basePrice: 71.64, marketCap: 216_000_000_000, peRatio: 10.9, dividendYield: 4.11 },
];

const CRYPTO_SEEDS = [
  ["bitcoin", "BTC", "Bitcoin", 68_420, 1_346_000_000_000],
  ["ethereum", "ETH", "Ethereum", 3_680, 442_000_000_000],
  ["tether", "USDT", "Tether", 1, 102_000_000_000],
  ["binancecoin", "BNB", "BNB", 618, 92_000_000_000],
  ["solana", "SOL", "Solana", 142, 63_000_000_000],
  ["ripple", "XRP", "XRP", 0.62, 35_000_000_000],
  ["usd-coin", "USDC", "USD Coin", 1, 32_000_000_000],
  ["dogecoin", "DOGE", "Dogecoin", 0.16, 24_000_000_000],
  ["cardano", "ADA", "Cardano", 0.68, 24_500_000_000],
  ["avalanche-2", "AVAX", "Avalanche", 39.4, 16_000_000_000],
  ["chainlink", "LINK", "Chainlink", 18.1, 11_000_000_000],
  ["tron", "TRX", "TRON", 0.13, 11_800_000_000],
  ["polkadot", "DOT", "Polkadot", 8.9, 12_600_000_000],
  ["matic-network", "MATIC", "Polygon", 1.06, 10_300_000_000],
  ["litecoin", "LTC", "Litecoin", 82.4, 6_200_000_000],
  ["internet-computer", "ICP", "Internet Computer", 14.9, 7_100_000_000],
  ["shiba-inu", "SHIB", "Shiba Inu", 0.000029, 16_300_000_000],
  ["near", "NEAR", "NEAR Protocol", 7.05, 7_500_000_000],
  ["uniswap", "UNI", "Uniswap", 12.4, 9_300_000_000],
  ["aptos", "APT", "Aptos", 10.1, 4_100_000_000],
] as const;

const NEWS_ITEMS: Omit<NewsArticle, "sentiment">[] = [
  {
    id: "news-1",
    title: "Okap Flavors : Célébration de la diversité culinaire du Cap-Haïtien",
    description: "L'événement annuel Okap Flavors a réuni des milliers de participants pour célébrer les saveurs uniques du Nord d'Haïti.",
    summary: "Une vitrine exceptionnelle pour les chefs locaux et les artisans de la gastronomie haïtienne au cœur de la cité christophienne.",
    imageUrl: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=900&q=80",
    url: "https://sakapfetokap.org/okap-flavors",
    source: "Sakapfet Okap",
    ticker: "CULTURE",
    category: "stocks", // Reusing 'stocks' category for local news to avoid breaking types for now
    publishedAt: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
  },
  {
    id: "news-2",
    title: "Le Palais Sans-Souci : Un patrimoine mondial à préserver",
    description: "Les initiatives se multiplient pour la restauration et la promotion du site historique de Milot.",
    summary: "Un appel à la protection de l'héritage d'Henri Christophe pour booster le tourisme culturel dans le Nord.",
    imageUrl: "https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=900&q=80",
    url: "https://sakapfetokap.org/patrimoine",
    source: "Sakapfet Okap",
    ticker: "HISTOIRE",
    category: "crypto", // Reusing 'crypto' for history/heritage
    publishedAt: new Date(Date.now() - 80 * 60 * 1000).toISOString(),
  },
  {
    id: "news-3",
    title: "Journalisme communautaire : Former les jeunes voix du Nord",
    description: "Un nouveau programme de formation pour les jeunes reporters locaux voit le jour au Cap-Haïtien.",
    summary: "Renforcer la démocratie locale par une information de proximité et de qualité faite par et pour la communauté.",
    imageUrl: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=900&q=80",
    url: "https://sakapfetokap.org/formation",
    source: "Sakapfet Okap",
    ticker: "SOCIAL",
    category: "forex", // Reusing 'forex' for social
    publishedAt: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "news-4",
    title: "Festivités de la Saint-Jacques : Une tradition vivante à la Plaine du Nord",
    description: "Les pèlerins convergent vers la Plaine du Nord pour les célébrations traditionnelles annuelles.",
    summary: "Un mélange unique de foi, de culture et de traditions qui anime tout le département du Nord.",
    imageUrl: "https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&w=900&q=80",
    url: "https://sakapfetokap.org/saint-jacques",
    source: "Sakapfet Okap",
    ticker: "TRADITION",
    category: "commodities", // Reusing 'commodities' for traditions
    publishedAt: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "news-5",
    title: "Environnement : Opération nettoyage dans la baie du Cap-Haïtien",
    description: "Les citoyens se mobilisent pour protéger l'écosystème marin de la cité historique.",
    summary: "Une initiative communautaire exemplaire pour un Cap-Haïtien plus propre et plus vert.",
    imageUrl: "https://images.unsplash.com/photo-1528190336454-13cd56b45b5a?auto=format&fit=crop&w=900&q=80",
    url: "https://sakapfetokap.org/environnement",
    source: "Sakapfet Okap",
    ticker: "ÉCOLOGIE",
    category: "stocks",
    publishedAt: new Date(Date.now() - 8 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "news-6",
    title: "Artisanat local : Le savoir-faire des mains du Nord à l'honneur",
    description: "Exposition des produits artisanaux locaux au marché de fer rénové.",
    summary: "Valoriser la créativité haïtienne et soutenir l'économie circulaire dans le département du Nord.",
    imageUrl: "https://images.unsplash.com/photo-1544650030-3c9baf624244?auto=format&fit=crop&w=900&q=80",
    url: "https://sakapfetokap.org/artisanat",
    source: "Sakapfet Okap",
    ticker: "ART",
    category: "crypto",
    publishedAt: new Date(Date.now() - 10 * 60 * 60 * 1000).toISOString(),
  },
];

function wave(seed: string, index: number) {
  const base = hashSeed(seed) / 97;
  return Math.sin(base + index * 0.42) * 0.65 + Math.cos(base * 0.33 + index * 0.18) * 0.35;
}

function buildSparkline(seed: string, baseValue: number, points = 24) {
  let current = baseValue;
  return Array.from({ length: points }, (_, index) => {
    current += wave(seed, index) * Math.max(baseValue * 0.004, 0.02);
    return Number(current.toFixed(baseValue > 20 ? 2 : 4));
  });
}

function resolveSeed(symbol: string): StockSeed {
  const matched = STOCK_SEEDS.find((seed) => seed.symbol === symbol.toUpperCase());
  if (matched) {
    return matched;
  }

  const fallbackBase = 50 + (hashSeed(symbol) % 250);
  return {
    symbol: symbol.toUpperCase(),
    name: `${symbol.toUpperCase()} Holdings`,
    sector: "Technology",
    country: "United States",
    basePrice: fallbackBase,
    marketCap: fallbackBase * 4_500_000_000,
    peRatio: 21.4,
    dividendYield: 0.4,
  };
}

function quoteFromSeed(seed: StockSeed): MarketQuote {
  const currentIndex = new Date().getUTCMinutes() + new Date().getUTCHours() * 2;
  const changePercent = Number((wave(seed.symbol, currentIndex) * 3.8).toFixed(2));
  const price = Number((seed.basePrice * (1 + changePercent / 100)).toFixed(2));

  return {
    symbol: seed.symbol,
    name: seed.name,
    price,
    change: Number((price - seed.basePrice).toFixed(2)),
    changePercent,
    volume: Math.round(seed.marketCap / 3400 + Math.abs(changePercent) * 1_800_000),
    marketCap: seed.marketCap,
    sector: seed.sector,
    country: seed.country,
    peRatio: seed.peRatio,
    dividendYield: seed.dividendYield,
    sparkline: buildSparkline(seed.symbol, price),
    updatedAt: new Date().toISOString(),
  };
}

export function generateMockQuotes(symbols: string[]): MarketQuote[] {
  return symbols.map((symbol) => quoteFromSeed(resolveSeed(symbol)));
}

export function generateMockScreener() {
  return STOCK_SEEDS.map((seed) => quoteFromSeed(seed));
}

export function generateMockCandles(symbol: string): CandlestickPoint[] {
  const quote = quoteFromSeed(resolveSeed(symbol));
  let previousClose = quote.price * 0.95;
  const now = Math.floor(Date.now() / 1000);

  return Array.from({ length: 48 }, (_, index) => {
    const time = now - (47 - index) * 15 * 60;
    const drift = wave(symbol, index) * 0.9;
    const open = Number(previousClose.toFixed(2));
    const close = Number((open + drift).toFixed(2));
    const high = Number((Math.max(open, close) + Math.abs(drift) * 0.8 + 0.9).toFixed(2));
    const low = Number((Math.min(open, close) - Math.abs(drift) * 0.8 - 0.6).toFixed(2));
    previousClose = close;
    return {
      time,
      open,
      high,
      low,
      close,
      volume: Math.round(1_500_000 + Math.abs(drift) * 950_000 + index * 7000),
    };
  });
}

export function generateMockFearGreed(): FearGreedData {
  return {
    value: 68,
    valueText: "Greed",
    previousClose: 61,
    lastUpdated: new Date().toISOString(),
  };
}

export function generateMockNews(category: NewsCategory = "all"): NewsArticle[] {
  return NEWS_ITEMS.filter((article) => category === "all" || article.category === category).map(
    (article) => ({
      ...article,
      sentiment: classifySentiment(`${article.title} ${article.description}`).label,
    }),
  );
}

export function generateMockCryptoMarkets(): CryptoAsset[] {
  const resolved = CRYPTO_SEEDS.map(([id, symbol, name, basePrice, marketCap]) => {
    const change24h = Number((wave(symbol, new Date().getUTCHours()) * 6.5).toFixed(2));
    const price = Number((basePrice * (1 + change24h / 100)).toFixed(basePrice > 5 ? 2 : 4));
    return {
      id,
      symbol,
      name,
      price,
      change24h,
      marketCap,
      volume: Math.round(marketCap * 0.08),
      dominance: 0,
      sparkline: buildSparkline(symbol, price, 24),
    };
  });

  const totalCap = resolved.reduce((sum, asset) => sum + asset.marketCap, 0);
  return resolved.map((asset) => ({
    ...asset,
    dominance: Number(((asset.marketCap / totalCap) * 100).toFixed(2)),
  }));
}

export function buildSectorHeatmap(quotes = generateMockScreener()): SectorHeatCell[] {
  const grouped = quotes.reduce<Record<string, { total: number; weightedChange: number }>>(
    (acc, quote) => {
      const current = acc[quote.sector] ?? { total: 0, weightedChange: 0 };
      current.total += quote.marketCap;
      current.weightedChange += quote.marketCap * quote.changePercent;
      acc[quote.sector] = current;
      return acc;
    },
    {},
  );

  return Object.entries(grouped).map(([label, value]) => ({
    label,
    value: value.total,
    changePercent: Number((value.weightedChange / value.total).toFixed(2)),
  }));
}

export function buildPerformanceSeries(range: PortfolioRange, currentValue: number, benchmarkBase = 100) {
  const pointsByRange: Record<PortfolioRange, number> = { "1D": 12, "1W": 14, "1M": 24, "1Y": 30 };
  const points = pointsByRange[range];
  let portfolio = currentValue * 0.92;
  let benchmark = benchmarkBase * 0.95;

  return Array.from({ length: points }, (_, index) => {
    portfolio += wave(`portfolio-${range}`, index) * (currentValue * 0.015);
    benchmark += wave(`benchmark-${range}`, index) * 1.4;
    return {
      label: `${index + 1}`,
      portfolio: Number(portfolio.toFixed(2)),
      benchmark: Number(benchmark.toFixed(2)),
    };
  });
}

export function buildCorrelationSeries() {
  return Array.from({ length: 18 }, (_, index) => ({
    label: `T${index + 1}`,
    crypto: Number((54 + wave("crypto-correlation", index) * 18).toFixed(2)),
    equities: Number((49 + wave("equity-correlation", index) * 12).toFixed(2)),
  }));
}
