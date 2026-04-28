"use client";

import { useMemo, useState } from "react";

import { NewsFeed } from "@/components/widgets/news-feed";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import { NEWS_CATEGORIES } from "@/lib/constants";
import { generateMockNews } from "@/lib/mock-data";
import { useNews } from "@/hooks/use-news";
import type { NewsCategory } from "@/types/market";

export default function NewsPage() {
  const [category, setCategory] = useState<NewsCategory>("all");
  const [query, setQuery] = useState("");
  const [sourceFilter, setSourceFilter] = useState("all");
  const [tickerFilter, setTickerFilter] = useState("all");
  const newsQuery = useNews(category, query);

  const articles = newsQuery.data?.data ?? generateMockNews(category);
  const sources = useMemo(
    () => ["all", ...new Set(articles.map((article) => article.source))],
    [articles],
  );
  const tickers = useMemo(
    () => ["all", ...new Set(articles.map((article) => article.ticker))],
    [articles],
  );

  const filteredArticles = useMemo(
    () =>
      articles.filter((article) => {
        const sourceMatch = sourceFilter === "all" || article.source === sourceFilter;
        const tickerMatch = tickerFilter === "all" || article.ticker === tickerFilter;
        return sourceMatch && tickerMatch;
      }),
    [articles, sourceFilter, tickerFilter],
  );

  const sentimentBreakdown = filteredArticles.reduce(
    (acc, article) => {
      acc[article.sentiment] += 1;
      return acc;
    },
    { positive: 0, neutral: 0, negative: 0 },
  );

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div>
            <CardTitle>Realtime Intelligence Feed</CardTitle>
            <CardDescription>
              Filter financial headlines by category, source, and ticker with
              sentiment tags.
            </CardDescription>
          </div>
          <Badge variant="violet">{filteredArticles.length} live stories</Badge>
        </CardHeader>

        <div className="grid gap-4 xl:grid-cols-[1.4fr,1fr,1fr,1fr]">
          <Input
            aria-label="Search financial news"
            placeholder="Search theme or ticker..."
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <select
            aria-label="Filter news by category"
            value={category}
            onChange={(event) => setCategory(event.target.value as NewsCategory)}
            className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
          >
            {NEWS_CATEGORIES.map((option) => (
              <option key={option} value={option} className="bg-slate-900">
                {option}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter news by source"
            value={sourceFilter}
            onChange={(event) => setSourceFilter(event.target.value)}
            className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
          >
            {sources.map((source) => (
              <option key={source} value={source} className="bg-slate-900">
                {source}
              </option>
            ))}
          </select>
          <select
            aria-label="Filter news by ticker"
            value={tickerFilter}
            onChange={(event) => setTickerFilter(event.target.value)}
            className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white"
          >
            {tickers.map((ticker) => (
              <option key={ticker} value={ticker} className="bg-slate-900">
                {ticker}
              </option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Positive
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {sentimentBreakdown.positive}
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Neutral
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {sentimentBreakdown.neutral}
            </p>
          </div>
          <div className="rounded-3xl border border-white/8 bg-white/[0.03] p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
              Negative
            </p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {sentimentBreakdown.negative}
            </p>
          </div>
        </div>
      </Card>

      {newsQuery.isLoading && !newsQuery.data ? (
        <div className="grid gap-4 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-[360px] rounded-[28px]" />
          ))}
        </div>
      ) : (
        <NewsFeed
          articles={filteredArticles}
          title="Filtered Financial Feed"
          description="NewsAPI primary feed with sentiment overlays and category routing"
        />
      )}

      <div className="flex justify-end">
        <Button variant="outline" onClick={() => newsQuery.refetch()}>
          Refresh headlines
        </Button>
      </div>
    </div>
  );
}
