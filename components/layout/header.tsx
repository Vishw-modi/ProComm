"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MessageHistory } from "@/components/features/message-history";
import { Templates } from "@/components/features/templates";
import { Separator } from "@/components/ui/separator";
import { Zap } from "lucide-react";

export function Header() {
  return (
    <header className="h-13 border-b border-border/40 bg-background/80 backdrop-blur-md sticky top-0 z-50">
      <div className="h-full flex items-center justify-between px-4">
        {/* Logo */}
        <div className="flex items-center gap-2.5">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shadow-md shadow-teal-500/20">
            <Zap className="h-4.5 w-4.5 text-white" />
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-tight">
              ProComm
              <span className="text-teal-500 ml-0.5">AI</span>
            </h1>
            <p className="text-[10px] text-muted-foreground -mt-0.5 hidden sm:block">
              Professional Communication Assistant
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1">
          <MessageHistory />
          <Templates />
          <Separator orientation="vertical" className="h-5 mx-1 opacity-40" />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
