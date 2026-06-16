"use client";

import { useAppStore } from "@/store/use-app-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { ScoreDisplay } from "@/components/analysis/score-display";
import { ImprovementsList } from "@/components/analysis/improvements-list";
import { RedFlags } from "@/components/analysis/red-flags";
import { BarChart3 } from "lucide-react";

export function RightPanel() {
  const { response, isLoading } = useAppStore();

  return (
    <div className="flex flex-col h-full lg:border-l border-border/40">
      <div className="px-4 py-3 border-b border-border/40">
        <h2 className="text-sm font-semibold tracking-tight">AI Analysis</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Communication quality metrics
        </p>
      </div>
      <ScrollArea className="flex-1">
        <div className="p-4 space-y-5">
          {isLoading ? (
            <div className="space-y-6">
              <div className="space-y-3">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-2 w-full" />
                <Skeleton className="h-8 w-full" />
                <Skeleton className="h-2 w-full" />
              </div>
              <Separator className="opacity-40" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-28" />
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-4/5" />
                <Skeleton className="h-6 w-3/4" />
              </div>
            </div>
          ) : response ? (
            <>
              <ScoreDisplay />
              <Separator className="opacity-40" />
              <ImprovementsList />
              {response.red_flags.length > 0 && (
                <>
                  <Separator className="opacity-40" />
                  <RedFlags />
                </>
              )}
              {response.subject_lines &&
                response.subject_lines.length > 0 && (
                  <>
                    <Separator className="opacity-40" />
                    <div className="space-y-3">
                      <h3 className="text-sm font-semibold tracking-tight">
                        Suggested Subject Lines
                      </h3>
                      <div className="space-y-1.5">
                        {response.subject_lines.map((line, i) => (
                          <button
                            key={i}
                            onClick={() => {
                              navigator.clipboard.writeText(line);
                            }}
                            className="w-full text-left text-xs py-2 px-3 rounded-md bg-muted/50 hover:bg-muted border border-border/40 transition-colors text-foreground/80"
                          >
                            {line}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center mb-3">
                <BarChart3 className="h-5 w-5 text-muted-foreground/50" />
              </div>
              <p className="text-xs text-muted-foreground">
                Analysis will appear after generation
              </p>
            </div>
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
