"use client";

import { useAppStore } from "@/store/use-app-store";
import { cn } from "@/lib/utils";

export function ScoreDisplay() {
  const { response } = useAppStore();

  if (!response) return null;

  const { score_before, score_after } = response;
  const improvement = score_after - score_before;

  const getScoreColor = (score: number) => {
    if (score >= 80) return "text-emerald-500";
    if (score >= 60) return "text-teal-500";
    if (score >= 40) return "text-amber-500";
    return "text-red-400";
  };

  const getScoreBarColor = (score: number) => {
    if (score >= 80) return "bg-emerald-500";
    if (score >= 60) return "bg-teal-500";
    if (score >= 40) return "bg-amber-500";
    return "bg-red-400";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold tracking-tight">
        Professionalism Score
      </h3>

      {/* Before score */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Your Draft</span>
          <span
            className={cn(
              "text-lg font-bold tabular-nums",
              getScoreColor(score_before)
            )}
          >
            {score_before}
            <span className="text-xs font-normal text-muted-foreground">
              /100
            </span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              getScoreBarColor(score_before)
            )}
            style={{ width: `${score_before}%`, opacity: 0.5 }}
          />
        </div>
      </div>

      {/* After score */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs text-muted-foreground">Generated</span>
          <span
            className={cn(
              "text-lg font-bold tabular-nums",
              getScoreColor(score_after)
            )}
          >
            {score_after}
            <span className="text-xs font-normal text-muted-foreground">
              /100
            </span>
          </span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <div
            className={cn(
              "h-full rounded-full transition-all duration-1000 ease-out",
              getScoreBarColor(score_after)
            )}
            style={{ width: `${score_after}%` }}
          />
        </div>
      </div>

      {/* Improvement badge */}
      {improvement > 0 && (
        <div className="flex items-center justify-center pt-1">
          <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            +{improvement} point improvement
          </span>
        </div>
      )}
    </div>
  );
}
