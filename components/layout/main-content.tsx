"use client";

import { LeftPanel } from "@/components/panels/left-panel";
import { CenterPanel } from "@/components/panels/center-panel";
import { RightPanel } from "@/components/panels/right-panel";
import { KeyboardShortcuts } from "@/components/features/keyboard-shortcuts";
import { useAppStore } from "@/store/use-app-store";
import { ChevronDown, PenSquare, Sparkles, BarChart3 } from "lucide-react";

export function MainContent() {
  const { response, isLoading } = useAppStore();

  return (
    <>
      <KeyboardShortcuts />
      <main className="flex-1 min-h-0 overflow-hidden">
        {/* Desktop: three-column layout */}
        <div className="h-full grid grid-cols-1 lg:grid-cols-[340px_1fr_300px] xl:grid-cols-[380px_1fr_320px]">
          {/* Left Panel — Inputs */}
          <div className="hidden lg:flex flex-col h-full overflow-hidden">
            <LeftPanel />
          </div>

          {/* Center Panel — Output */}
          <div className="flex flex-col h-full overflow-hidden border-x-0 lg:border-x-0">
            <CenterPanel />
          </div>

          {/* Right Panel — Analysis */}
          <div className="hidden lg:flex flex-col h-full overflow-hidden">
            <RightPanel />
          </div>
        </div>

        {/* Mobile: input-first layout with expandable results */}
        <div className="lg:hidden flex h-full min-h-0 flex-col overflow-auto">
          <section className="border-b border-border/40">
            <div className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border/40">
                <PenSquare className="h-4 w-4 text-teal-500" />
                <div>
                  <h2 className="text-sm font-semibold tracking-tight">Input Controls</h2>
                  <p className="text-xs text-muted-foreground">
                    Start here to write your message
                  </p>
                </div>
              </div>
              <div className="h-[72svh] overflow-hidden">
                <LeftPanel />
              </div>
            </div>
          </section>

          <section className="border-b border-border/40">
            <details className="group" open={Boolean(response || isLoading)}>
              <summary className="flex items-center justify-between gap-2 px-4 py-3 list-none cursor-pointer">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-teal-500" />
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight">Generated Output</h2>
                    <p className="text-xs text-muted-foreground">
                      View rewritten variants
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border/40 h-[70svh]">
                <CenterPanel />
              </div>
            </details>
          </section>

          <section>
            <details className="group">
              <summary className="flex items-center justify-between gap-2 px-4 py-3 list-none cursor-pointer">
                <div className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-teal-500" />
                  <div>
                    <h2 className="text-sm font-semibold tracking-tight">AI Analysis</h2>
                    <p className="text-xs text-muted-foreground">
                      Review quality insights
                    </p>
                  </div>
                </div>
                <ChevronDown className="h-4 w-4 text-muted-foreground transition-transform group-open:rotate-180" />
              </summary>
              <div className="border-t border-border/40 h-[56svh]">
                <RightPanel />
              </div>
            </details>
          </section>
        </div>
      </main>
    </>
  );
}
