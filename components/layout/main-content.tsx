"use client";

import { LeftPanel } from "@/components/panels/left-panel";
import { CenterPanel } from "@/components/panels/center-panel";
import { RightPanel } from "@/components/panels/right-panel";
import { KeyboardShortcuts } from "@/components/features/keyboard-shortcuts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PenSquare, Sparkles, BarChart3 } from "lucide-react";

export function MainContent() {
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

        {/* Mobile: tabbed layout */}
        <div className="lg:hidden flex-1 min-h-0 overflow-hidden">
          <Tabs defaultValue="input" className="flex h-full min-h-0 flex-col">
            <div className="border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
              <TabsList
                variant="line"
                className="w-full justify-between gap-0 rounded-none px-2 py-2"
              >
                <TabsTrigger value="input" className="flex-1">
                  <PenSquare className="h-3.5 w-3.5" />
                  <span className="text-xs">Input</span>
                </TabsTrigger>
                <TabsTrigger value="output" className="flex-1">
                  <Sparkles className="h-3.5 w-3.5" />
                  <span className="text-xs">Output</span>
                </TabsTrigger>
                <TabsTrigger value="analysis" className="flex-1">
                  <BarChart3 className="h-3.5 w-3.5" />
                  <span className="text-xs">Analysis</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 min-h-0 overflow-hidden">
              <TabsContent value="input" className="h-full min-h-0">
                <div className="h-full overflow-hidden border-b border-border/40">
                  <LeftPanel />
                </div>
              </TabsContent>

              <TabsContent value="output" className="h-full min-h-0">
                <div className="h-full overflow-hidden border-b border-border/40">
                  <CenterPanel />
                </div>
              </TabsContent>

              <TabsContent value="analysis" className="h-full min-h-0">
                <div className="h-full overflow-hidden">
                  <RightPanel />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </main>
    </>
  );
}
