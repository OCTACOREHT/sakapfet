"use client";

import { TrendingUp, TrendingDown } from "lucide-react";

const CURRENCY_DATA = [
  { pair: "USD / HTG", rate: "131.45", change: "+0.12%", up: true },
  { pair: "EUR / HTG", rate: "142.12", change: "-0.05%", up: false },
  { pair: "HTG / USD", rate: "0.0076", change: "0.00%", up: true },
  { pair: "USD / HTG (BRH)", rate: "131.32", change: "+0.08%", up: true },
  { pair: "EUR / HTG (BRH)", rate: "141.95", change: "-0.11%", up: false },
];

export function CurrencyTicker() {
  // Duplicate items for seamless loop
  const items = [...CURRENCY_DATA, ...CURRENCY_DATA, ...CURRENCY_DATA];

  return (
    <div className="relative flex items-center overflow-hidden py-3">
      {/* Marquee Track */}
      <div className="flex animate-marquee items-center gap-12 whitespace-nowrap px-10">
        {items.map((item, index) => (
          <div key={`${item.pair}-${index}`} className="flex items-center gap-3">
            <span className="text-[0.6875rem] font-bold text-zinc-400">{item.pair}</span>
            <span className="font-poppins text-sm font-black text-black">{item.rate}</span>
            <div className={`flex items-center gap-1 text-[0.625rem] font-bold ${item.up ? "text-green-600" : "text-red-600"}`}>
              {item.up ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
              {item.change}
            </div>
          </div>
        ))}
      </div>

      {/* Cloud-like Fading Gradients */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />
    </div>
  );
}
