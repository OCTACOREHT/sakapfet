"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchJson } from "@/lib/utils";
import type { NewsCategory, NewsResponse } from "@/types/market";

export function useNews(category: NewsCategory, query?: string) {
  const search = new URLSearchParams({ category });
  if (query?.trim()) {
    search.set("query", query.trim());
  }

  return useQuery({
    queryKey: ["news", category, query],
    queryFn: () => fetchJson<NewsResponse>(`/api/news?${search.toString()}`),
  });
}
