"use client";

import { Line, LineChart, ResponsiveContainer } from "recharts";

export function SparklineChart({
  values,
  positive = true,
}: {
  values: number[];
  positive?: boolean;
}) {
  const data = values.map((value, index) => ({
    index,
    value,
  }));

  return (
    <div className="h-12 w-24">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke={positive ? "#00ff88" : "#ff4d6d"}
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
