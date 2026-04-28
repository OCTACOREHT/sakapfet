import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "positive" | "negative" | "neutral" | "violet";

const variants: Record<BadgeVariant, string> = {
  default: "border-black/5 bg-zinc-100 text-zinc-700",
  positive: "border-green-100 bg-green-50 text-green-700",
  negative: "border-red-100 bg-red-50 text-red-700",
  neutral: "border-black/5 bg-zinc-50 text-zinc-500",
  violet: "border-blue-100 bg-blue-50 text-blue-700",
};

export function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-[0.16em]",
        variants[variant],
        className,
      )}
    >
      {children}
    </span>
  );
}
