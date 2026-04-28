import { NEWS_CATEGORY_QUERIES } from "@/lib/constants";
import { generateMockNews } from "@/lib/mock-data";
import { classifySentiment } from "@/lib/sentiment";
import type { NewsArticle, NewsCategory } from "@/types/market";

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=900&q=80";

function inferCategory(text: string): Exclude<NewsCategory, "all"> {
  const normalized = text.toLowerCase();
  if (normalized.includes("bitcoin") || normalized.includes("ethereum") || normalized.includes("crypto")) {
    return "crypto";
  }
  if (normalized.includes("forex") || normalized.includes("dollar") || normalized.includes("euro")) {
    return "forex";
  }
  if (normalized.includes("oil") || normalized.includes("gold") || normalized.includes("commodity")) {
    return "commodities";
  }
  return "stocks";
}

function extractTicker(text: string) {
  const match = text.match(/\b[A-Z]{2,5}\b/);
  return match?.[0] ?? "SPY";
}

export async function getFinancialNews(category: NewsCategory, query?: string) {
  const apiKey = process.env.NEWS_API_KEY;
  if (!apiKey) {
    return {
      data: generateMockNews(category),
      source: "mock",
      updatedAt: new Date().toISOString(),
    };
  }

  try {
    const targetQuery = query?.trim() || NEWS_CATEGORY_QUERIES[category];
    const response = await fetch(
      `https://newsapi.org/v2/everything?q=${encodeURIComponent(
        targetQuery,
      )}&language=en&sortBy=publishedAt&pageSize=12&apiKey=${apiKey}`,
      {
        next: { revalidate: 300 },
        signal: AbortSignal.timeout(7000),
      },
    );

    if (!response.ok) {
      throw new Error("News API request failed");
    }

    const payload = (await response.json()) as {
      articles?: Array<{
        title?: string;
        description?: string;
        url?: string;
        urlToImage?: string;
        publishedAt?: string;
        source?: { name?: string };
      }>;
    };

    const articles: NewsArticle[] = (payload.articles ?? []).map((article, index) => {
      const title = article.title ?? "Market update";
      const description = article.description ?? "A fresh update from the global financial market.";
      const categoryLabel = inferCategory(`${title} ${description}`);
      const sentiment = classifySentiment(`${title} ${description}`).label;

      return {
        id: `${categoryLabel}-${index}-${article.publishedAt ?? Date.now()}`,
        title,
        description,
        summary: description.length > 140 ? `${description.slice(0, 140)}...` : description,
        imageUrl: article.urlToImage ?? FALLBACK_IMAGE,
        url: article.url ?? "#",
        source: article.source?.name ?? "News API",
        ticker: extractTicker(title),
        category: categoryLabel,
        sentiment,
        publishedAt: article.publishedAt ?? new Date().toISOString(),
      };
    });

    return {
      data: category === "all" ? articles : articles.filter((article) => article.category === category),
      source: "newsapi",
      updatedAt: new Date().toISOString(),
    };
  } catch {
    return {
      data: generateMockNews(category),
      source: "mock",
      updatedAt: new Date().toISOString(),
    };
  }
}
