"use client";

import { useAppStore } from "@/store/use-app-store";
import { AlertTriangle } from "lucide-react";

export function RedFlags() {
  const { response } = useAppStore();

  if (!response || !response.red_flags.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold tracking-tight flex items-center gap-2">
        <AlertTriangle className="h-3.5 w-3.5 text-amber-500" />
        Red Flags Detected
      </h3>
      <div className="space-y-1.5">
        {response.red_flags.map((flag, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 py-1.5 px-2 rounded-md bg-amber-500/5 border border-amber-500/10"
          >
            <div className="mt-0.5 h-1.5 w-1.5 rounded-full bg-amber-500 flex-shrink-0 mt-1.5" />
            <span className="text-xs text-foreground/70 leading-relaxed">
              {flag}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
