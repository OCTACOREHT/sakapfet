"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import type { PortfolioHolding } from "@/types/market";

const DEFAULT_HOLDINGS: PortfolioHolding[] = [
  {
    id: "holding-aapl",
    symbol: "AAPL",
    quantity: 45,
    entryPrice: 188.14,
    sector: "Technology",
    addedAt: new Date().toISOString(),
  },
  {
    id: "holding-msft",
    symbol: "MSFT",
    quantity: 30,
    entryPrice: 392.8,
    sector: "Technology",
    addedAt: new Date().toISOString(),
  },
  {
    id: "holding-nvda",
    symbol: "NVDA",
    quantity: 16,
    entryPrice: 802.41,
    sector: "Semiconductors",
    addedAt: new Date().toISOString(),
  },
];

type PortfolioStore = {
  holdings: PortfolioHolding[];
  addHolding: (holding: Omit<PortfolioHolding, "id" | "addedAt">) => void;
  removeHolding: (id: string) => void;
};

export const usePortfolioStore = create<PortfolioStore>()(
  persist(
    (set) => ({
      holdings: DEFAULT_HOLDINGS,
      addHolding: (holding) =>
        set((state) => ({
          holdings: [
            ...state.holdings,
            {
              ...holding,
              id: crypto.randomUUID(),
              addedAt: new Date().toISOString(),
            },
          ],
        })),
      removeHolding: (id) =>
        set((state) => ({
          holdings: state.holdings.filter((holding) => holding.id !== id),
        })),
    }),
    {
      name: "neon-finance-portfolio",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
