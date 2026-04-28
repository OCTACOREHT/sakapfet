"use client";

import { useQuery } from "@tanstack/react-query";

import { fetchJson } from "@/lib/utils";
import type { FearGreedResponse } from "@/types/market";

export function useFearGreed() {
  return useQuery({
    queryKey: ["fear-greed"],
    queryFn: () => fetchJson<FearGreedResponse>("/api/fear-greed"),
    staleTime: 15 * 60 * 1000,
  });
}
