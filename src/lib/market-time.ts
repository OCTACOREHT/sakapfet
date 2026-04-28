import { MARKET_EXCHANGES } from "@/lib/constants";
import type { MarketClock, MarketStatus } from "@/types/market";

function getLocalParts(timezone: string) {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: timezone,
    weekday: "short",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(parts.find((part) => part.type === "minute")?.value ?? "0");
  const weekday = parts.find((part) => part.type === "weekday")?.value ?? "Mon";

  return {
    hour,
    minute,
    weekday,
    formattedTime: `${hour.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")}`,
  };
}

function resolveStatus(
  weekday: string,
  currentMinutes: number,
  premarketMinutes: number,
  openMinutes: number,
  closeMinutes: number,
): MarketStatus {
  if (weekday === "Sat" || weekday === "Sun") {
    return "closed";
  }

  if (currentMinutes >= openMinutes && currentMinutes < closeMinutes) {
    return "open";
  }

  if (currentMinutes >= premarketMinutes && currentMinutes < openMinutes) {
    return "pre-market";
  }

  return "closed";
}

export function getMarketClocks(): MarketClock[] {
  return MARKET_EXCHANGES.map((exchange) => {
    const parts = getLocalParts(exchange.timezone);
    const currentMinutes = parts.hour * 60 + parts.minute;

    return {
      label: exchange.label,
      timezone: exchange.timezone,
      time: parts.formattedTime,
      status: resolveStatus(
        parts.weekday,
        currentMinutes,
        exchange.premarketMinutes,
        exchange.openMinutes,
        exchange.closeMinutes,
      ),
    };
  });
}
