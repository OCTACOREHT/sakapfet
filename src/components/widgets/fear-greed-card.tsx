import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatRelativeTime } from "@/lib/utils";
import type { FearGreedData } from "@/types/market";

export function FearGreedCard({ data }: { data: FearGreedData }) {
  const progress = `${data.value * 3.6}deg`;

  return (
    <Card className="h-full">
      <CardHeader>
        <div>
          <CardTitle>Fear & Greed Index</CardTitle>
          <CardDescription>Behavioral momentum gauge</CardDescription>
        </div>
        <Badge variant={data.value >= 55 ? "positive" : data.value <= 40 ? "negative" : "neutral"}>
          {data.valueText}
        </Badge>
      </CardHeader>

      <div className="flex flex-col items-center justify-center gap-6 py-4">
        <div
          className="relative flex h-44 w-44 items-center justify-center rounded-full"
          style={{
            background: `conic-gradient(#00d4ff 0deg, #00ff88 ${progress}, rgba(0,0,0,0.05) ${progress}, rgba(0,0,0,0.05) 360deg)`,
          }}
        >
          <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border border-black/5 bg-white">
            <p className="font-heading text-5xl text-black font-bold">{data.value}</p>
            <p className="text-xs uppercase tracking-[0.24em] text-zinc-500">
              /100
            </p>
          </div>
        </div>

        <div className="grid w-full gap-3 text-center sm:grid-cols-2">
          <div className="rounded-2xl border border-black/5 bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Current bias
            </p>
            <p className="mt-2 font-bold text-black">{data.valueText}</p>
          </div>
          <div className="rounded-2xl border border-black/5 bg-zinc-50 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-zinc-500">
              Last update
            </p>
            <p className="mt-2 font-bold text-black">
              {formatRelativeTime(data.lastUpdated)}
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
}
