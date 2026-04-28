/* eslint-disable @next/next/no-img-element */

import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import type { NewsArticle } from "@/types/market";

const sentimentVariant = {
  positive: "positive",
  negative: "negative",
  neutral: "neutral",
} as const;

export function NewsFeed({
  articles,
  title = "Realtime News",
  description = "Categorized global financial headlines with sentiment",
  compact = false,
}: {
  articles: NewsArticle[];
  title?: string;
  description?: string;
  compact?: boolean;
}) {
  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle>{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        <Badge variant="violet">{articles.length} stories</Badge>
      </CardHeader>

      <div className={`grid gap-4 ${compact ? "md:grid-cols-2" : "xl:grid-cols-2"}`}>
        {articles.map((article, index) => (
          <motion.a
            key={article.id}
            href={article.url}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="group overflow-hidden rounded-[20px] border border-black/5 bg-zinc-50 transition hover:border-black/20 hover:bg-zinc-100"
          >
            <div className="aspect-[16/9] overflow-hidden">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="space-y-4 p-4">
              <div className="flex flex-wrap items-center gap-2">
                <Badge variant="neutral">{article.category}</Badge>
                <Badge variant={sentimentVariant[article.sentiment]}>
                  {article.sentiment}
                </Badge>
                <Badge variant="default">{article.ticker}</Badge>
              </div>
              <div>
                <p className="font-heading text-xl font-bold leading-tight text-black">
                  {article.title}
                </p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">
                  {article.summary}
                </p>
              </div>
              <div className="flex items-center justify-between text-sm text-zinc-500">
                <span className="font-medium">
                  {article.source} / {formatRelativeTime(article.publishedAt)}
                </span>
                <ExternalLink className="h-4 w-4 text-black" />
              </div>
            </div>
          </motion.a>
        ))}
      </div>
    </Card>
  );
}
