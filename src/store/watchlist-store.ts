"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { DEFAULT_WATCHLIST } from "@/lib/constants";
import type { PriceAlert } from "@/types/market";

type WatchlistStore = {
  symbols: string[];
  alerts: PriceAlert[];
  addSymbol: (symbol: string) => void;
  removeSymbol: (symbol: string) => void;
  addAlert: (symbol: string, targetPrice: number, direction: "above" | "below") => void;
  removeAlert: (id: string) => void;
  markAlertTriggered: (id: string) => void;
  resetAlertsForSymbol: (symbol: string) => void;
};

export const useWatchlistStore = create<WatchlistStore>()(
  persist(
    (set) => ({
      symbols: DEFAULT_WATCHLIST,
      alerts: [],
      addSymbol: (symbol) =>
        set((state) => {
          const normalized = symbol.trim().toUpperCase();
          if (!normalized || state.symbols.includes(normalized)) {
            return state;
          }
          return { symbols: [...state.symbols, normalized] };
        }),
      removeSymbol: (symbol) =>
        set((state) => ({
          symbols: state.symbols.filter((current) => current !== symbol),
          alerts: state.alerts.filter((alert) => alert.symbol !== symbol),
        })),
      addAlert: (symbol, targetPrice, direction) =>
        set((state) => ({
          alerts: [
            ...state.alerts,
            {
              id: crypto.randomUUID(),
              symbol,
              targetPrice,
              direction,
              triggered: false,
            },
          ],
        })),
      removeAlert: (id) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.id !== id),
        })),
      markAlertTriggered: (id) =>
        set((state) => ({
          alerts: state.alerts.map((alert) =>
            alert.id === id ? { ...alert, triggered: true } : alert,
          ),
        })),
      resetAlertsForSymbol: (symbol) =>
        set((state) => ({
          alerts: state.alerts.filter((alert) => alert.symbol !== symbol),
        })),
    }),
    {
      name: "neon-finance-watchlist",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
