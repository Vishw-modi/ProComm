"use client";

import { LeftPanel } from "@/components/panels/left-panel";
import { CenterPanel } from "@/components/panels/center-panel";
import { RightPanel } from "@/components/panels/right-panel";
import { KeyboardShortcuts } from "@/components/features/keyboard-shortcuts";

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

        {/* Mobile: Stacked layout */}
        <div className="lg:hidden flex flex-col overflow-auto h-full">
          <div className="border-b border-border/40">
            <LeftPanel />
          </div>
          <div className="border-b border-border/40 min-h-[400px]">
            <CenterPanel />
          </div>
          <div>
            <RightPanel />
          </div>
        </div>
      </main>
    </>
  );
}
