"use client";

import { motion } from "framer-motion";

import { formatCompactNumber } from "@/lib/utils";
import type { SectorHeatCell } from "@/types/market";

export function SectorHeatmap({ data }: { data: SectorHeatCell[] }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((cell, index) => {
        const positive = cell.changePercent >= 0;
        const intensity = Math.min(Math.abs(cell.changePercent) / 6, 1);
        const background = positive
          ? `linear-gradient(160deg, rgba(0,255,136,${0.16 + intensity * 0.24}), rgba(0,255,136,0.03))`
          : `linear-gradient(160deg, rgba(255,77,109,${0.16 + intensity * 0.24}), rgba(255,77,109,0.03))`;

        return (
          <motion.div
            key={cell.label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            className="rounded-3xl border border-white/8 p-4"
            style={{ background }}
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="font-heading text-lg text-white">{cell.label}</p>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-300/70">
                  {formatCompactNumber(cell.value)}
                </p>
              </div>
              <p className={positive ? "glow-positive" : "glow-negative"}>
                {cell.changePercent > 0 ? "+" : ""}
                {cell.changePercent.toFixed(2)}%
              </p>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
