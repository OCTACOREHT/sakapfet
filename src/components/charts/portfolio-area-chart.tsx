"use client";

import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import { formatCurrency } from "@/lib/utils";

type DataPoint = {
  label: string;
  portfolio: number;
  benchmark?: number;
};

export function PortfolioAreaChart({
  data,
  currency = true,
}: {
  data: DataPoint[];
  currency?: boolean;
}) {
  return (
    <div className="h-[320px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data}>
          <defs>
            <linearGradient id="portfolioGradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="5%" stopColor="#00d4ff" stopOpacity={0.45} />
              <stop offset="95%" stopColor="#00d4ff" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false} />
          <XAxis dataKey="label" tick={{ fill: "#64748b", fontSize: 12 }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fill: "#64748b", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(value: number) =>
              currency ? formatCurrency(value, true) : `${value.toFixed(0)}`
            }
          />
          <Tooltip
            contentStyle={{
              background: "rgba(10, 10, 15, 0.96)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 18,
            }}
            formatter={(value: number) =>
              currency ? formatCurrency(value) : `${value.toFixed(2)}`
            }
          />
          <Area
            type="monotone"
            dataKey="portfolio"
            stroke="#00d4ff"
            strokeWidth={3}
            fill="url(#portfolioGradient)"
          />
          {data.some((point) => point.benchmark != null) ? (
            <Line
              type="monotone"
              dataKey="benchmark"
              stroke="#7c3aed"
              strokeWidth={2}
              dot={false}
            />
          ) : null}
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
