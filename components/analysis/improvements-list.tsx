"use client";

import { useAppStore } from "@/store/use-app-store";
import { Check } from "lucide-react";

export function ImprovementsList() {
  const { response } = useAppStore();

  if (!response || !response.improvements.length) return null;

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold tracking-tight">AI Improvements</h3>
      <div className="space-y-1.5">
        {response.improvements.map((improvement, i) => (
          <div
            key={i}
            className="flex items-start gap-2.5 py-1.5 px-2 rounded-md hover:bg-muted/50 transition-colors"
          >
            <div className="mt-0.5 h-4 w-4 rounded-full bg-emerald-500/15 flex items-center justify-center flex-shrink-0">
              <Check className="h-2.5 w-2.5 text-emerald-500" />
            </div>
            <span className="text-xs text-foreground/80 leading-relaxed">
              {improvement}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
