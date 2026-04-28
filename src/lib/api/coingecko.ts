import { generateMockCryptoMarkets } from "@/lib/mock-data";

export async function getCryptoMarkets() {
  try {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=20&page=1&sparkline=true&price_change_percentage=24h",
      {
        next: { revalidate: 60 },
        signal: AbortSignal.timeout(8000),
      },
    );

    if (!response.ok) {
      throw new Error("CoinGecko request failed");
    }

    const payload = (await response.json()) as Array<{
      id: string;
      symbol: string;
      name: string;
      current_price: number;
      price_change_percentage_24h: number;
      market_cap: number;
      total_volume: number;
      sparkline_in_7d?: { price?: number[] };
    }>;

    const totalCap = payload.reduce((sum, asset) => sum + asset.market_cap, 0);

    return {
      data: payload.map((asset) => ({
        id: asset.id,
        symbol: asset.symbol.toUpperCase(),
        name: asset.name,
        price: asset.current_price,
        change24h: asset.price_change_percentage_24h ?? 0,
        marketCap: asset.market_cap,
        volume: asset.total_volume,
        dominance: Number(((asset.market_cap / totalCap) * 100).toFixed(2)),
        sparkline:
          asset.sparkline_in_7d?.price?.slice(-24).map((point) => Number(point.toFixed(2))) ??
          [],
      })),
      source: "coingecko",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      data: generateMockCryptoMarkets(),
      source: "mock",
      updatedAt: new Date().toISOString(),
    };
  }
}
