"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { COINCAP_ASSETS } from "@/lib/constants";
import { fetchJson } from "@/lib/utils";
import type { CryptoAsset, CryptoResponse } from "@/types/market";

export function useCrypto() {
  return useQuery({
    queryKey: ["crypto-markets"],
    queryFn: () => fetchJson<CryptoResponse>("/api/crypto/markets"),
  });
}

export function useCryptoStream(initialAssets: CryptoAsset[]) {
  const [livePrices, setLivePrices] = useState<Record<string, number>>({});

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const socketUrl =
      process.env.NEXT_PUBLIC_COINCAP_WS_URL ??
      `wss://ws.coincap.io/prices?assets=${COINCAP_ASSETS.join(",")}`;
    const socket = new WebSocket(socketUrl);

    socket.onmessage = (event) => {
      const payload = JSON.parse(event.data) as Record<string, string>;
      setLivePrices((current) => {
        const next = { ...current };
        Object.entries(payload).forEach(([asset, price]) => {
          next[asset.toUpperCase()] = Number(price);
        });
        return next;
      });
    };

    return () => {
      socket.close();
    };
  }, []);

  return useMemo(
    () =>
      initialAssets.map((asset) => ({
        ...asset,
        price: livePrices[asset.symbol] ?? asset.price,
      })),
    [initialAssets, livePrices],
  );
}
