import { generateMockFearGreed } from "@/lib/mock-data";

export async function getFearGreedIndex() {
  try {
    const response = await fetch("https://api.alternative.me/fng/?limit=1", {
      next: { revalidate: 900 },
      signal: AbortSignal.timeout(7000),
    });

    if (!response.ok) {
      throw new Error("Fear & Greed request failed");
    }

    const payload = (await response.json()) as {
      data?: Array<{
        value: string;
        value_classification: string;
      }>;
    };
    const current = payload.data?.[0];

    if (!current) {
      throw new Error("No fear greed data");
    }

    const value = Number(current.value);

    return {
      data: {
        value,
        valueText: current.value_classification,
        previousClose: Math.max(0, value - 6),
        lastUpdated: new Date().toISOString(),
      },
      source: "alternative.me",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      data: generateMockFearGreed(),
      source: "mock",
      updatedAt: new Date().toISOString(),
    };
  }
}
