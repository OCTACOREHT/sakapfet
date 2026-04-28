import * as React from "react";

import { cn } from "@/lib/utils";

export const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "h-11 w-full rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white outline-none transition focus:border-electric/40 focus:bg-white/7 focus:ring-2 focus:ring-electric/20",
        className,
      )}
      {...props}
    />
  ),
);

Input.displayName = "Input";
