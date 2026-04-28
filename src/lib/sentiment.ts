import type { SentimentTone } from "@/types/market";

const POSITIVE_TERMS = [
  "surge",
  "beat",
  "record",
  "growth",
  "upgrade",
  "rally",
  "breakout",
  "expands",
  "optimism",
];

const NEGATIVE_TERMS = [
  "selloff",
  "downgrade",
  "risk",
  "slump",
  "cuts",
  "lawsuit",
  "volatility",
  "inflation",
  "decline",
];

export function classifySentiment(text: string): {
  label: SentimentTone;
  score: number;
} {
  const normalized = text.toLowerCase();
  const positiveScore = POSITIVE_TERMS.filter((term) =>
    normalized.includes(term),
  ).length;
  const negativeScore = NEGATIVE_TERMS.filter((term) =>
    normalized.includes(term),
  ).length;

  const score = positiveScore - negativeScore;

  if (score > 0) {
    return { label: "positive", score };
  }

  if (score < 0) {
    return { label: "negative", score };
  }

  return { label: "neutral", score: 0 };
}
