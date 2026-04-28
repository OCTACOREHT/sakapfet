"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import { SWRConfig } from "swr";

import { fetchJson } from "@/lib/utils";

export function AppProviders({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60_000,
            refetchOnWindowFocus: false,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          revalidateOnFocus: false,
          dedupingInterval: 15_000,
        }}
      >
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            style: {
              background: "rgba(11, 14, 24, 0.94)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.08)",
            },
          }}
        />
      </SWRConfig>
    </QueryClientProvider>
  );
}
