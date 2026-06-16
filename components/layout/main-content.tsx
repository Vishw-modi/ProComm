"use client";

import { LeftPanel } from "@/components/panels/left-panel";
import { CenterPanel } from "@/components/panels/center-panel";
import { RightPanel } from "@/components/panels/right-panel";
import { KeyboardShortcuts } from "@/components/features/keyboard-shortcuts";
import { useAppStore } from "@/store/use-app-store";
import { PenSquare, Sparkles, BarChart3 } from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export function MainContent() {
  const { response, isLoading } = useAppStore();
  const [activeTab, setActiveTab] = useState<"input" | "output" | "analysis">("input");

  // Auto-switch to output tab when generation starts or updates
  useEffect(() => {
    if (isLoading) {
      setActiveTab("output");
    }
  }, [isLoading]);

  // Auto-switch to output tab when response changes (if we have a response and not already on output/analysis)
  useEffect(() => {
    if (response) {
      setActiveTab("output");
    }
  }, [response]);

  return (
    <>
      <KeyboardShortcuts />
      <main className="flex-1 min-h-0 overflow-hidden">
        {/* Desktop: three-column layout */}
        <div className="hidden lg:grid h-full lg:grid-cols-[340px_1fr_300px] xl:grid-cols-[380px_1fr_320px]">
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

        {/* Mobile: tabs-based layout */}
        <div className="lg:hidden flex h-full flex-col overflow-hidden bg-background">
          {/* Tabs header bar */}
          <div className="flex border-b border-border/40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/80 p-1.5 gap-1.5 z-40">
            <button
              onClick={() => setActiveTab("input")}
              className={cn(
                "flex-grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border",
                activeTab === "input"
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 shadow-xs"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30"
              )}
            >
              <PenSquare className="h-3.5 w-3.5" />
              Configure
            </button>
            <button
              onClick={() => setActiveTab("output")}
              className={cn(
                "flex-grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border relative",
                activeTab === "output"
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 shadow-xs"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30"
              )}
            >
              <Sparkles className="h-3.5 w-3.5" />
              Output
              {response && (
                <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-teal-500"></span>
                </span>
              )}
            </button>
            <button
              onClick={() => setActiveTab("analysis")}
              className={cn(
                "flex-grow flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold transition-all duration-200 border",
                activeTab === "analysis"
                  ? "bg-teal-500/10 text-teal-600 dark:text-teal-400 border-teal-500/20 shadow-xs"
                  : "bg-transparent text-muted-foreground border-transparent hover:text-foreground hover:bg-muted/30"
              )}
            >
              <BarChart3 className="h-3.5 w-3.5" />
              Analysis
            </button>
          </div>

          {/* Panel containers */}
          <div className="flex-1 min-h-0 relative">
            <div className={cn("h-full", activeTab !== "input" && "hidden")}>
              <LeftPanel />
            </div>
            <div className={cn("h-full", activeTab !== "output" && "hidden")}>
              <CenterPanel />
            </div>
            <div className={cn("h-full", activeTab !== "analysis" && "hidden")}>
              <RightPanel />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
