"use client";

import { useEffect, useRef } from "react";
import {
  ColorType,
  createChart,
  type CandlestickData,
  type IChartApi,
  type UTCTimestamp,
} from "lightweight-charts";

import type { CandlestickPoint } from "@/types/market";

export function CandlestickChart({ data }: { data: CandlestickPoint[] }) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    if (!containerRef.current || !data.length) {
      return;
    }

    const chart = createChart(containerRef.current, {
      autoSize: true,
      layout: {
        background: { type: ColorType.Solid, color: "transparent" },
        textColor: "#94a3b8",
      },
      grid: {
        vertLines: { color: "rgba(255,255,255,0.05)" },
        horzLines: { color: "rgba(255,255,255,0.05)" },
      },
      rightPriceScale: {
        borderColor: "rgba(255,255,255,0.08)",
      },
      timeScale: {
        borderColor: "rgba(255,255,255,0.08)",
      },
      crosshair: {
        vertLine: { color: "rgba(0, 212, 255, 0.28)" },
        horzLine: { color: "rgba(0, 212, 255, 0.28)" },
      },
    });

    const series = chart.addCandlestickSeries({
      upColor: "#00ff88",
      downColor: "#ff4d6d",
      borderVisible: false,
      wickUpColor: "#00ff88",
      wickDownColor: "#ff4d6d",
    });

    series.setData(
      data.map(
        (point) =>
          ({
            time: point.time as UTCTimestamp,
            open: point.open,
            high: point.high,
            low: point.low,
            close: point.close,
          }) satisfies CandlestickData<UTCTimestamp>,
      ),
    );
    chart.timeScale().fitContent();
    chartRef.current = chart;

    const observer = new ResizeObserver(() => {
      chart.applyOptions({
        width: containerRef.current?.clientWidth ?? 0,
      });
    });

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
      chart.remove();
      chartRef.current = null;
    };
  }, [data]);

  return <div ref={containerRef} className="h-[320px] w-full" aria-label="Candlestick chart" />;
}
