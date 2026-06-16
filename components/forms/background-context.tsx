"use client";

import { useAppStore } from "@/store/use-app-store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export function BackgroundContext() {
  const { formData, setFormField } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(!!formData.backgroundContext);

  return (
    <div className="space-y-2">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors w-full text-left"
      >
        <FileText className="h-4 w-4 text-teal-500" />
        Background Context
        <span className="text-xs opacity-60">(optional)</span>
        <svg
          className={cn(
            "h-3.5 w-3.5 ml-auto transition-transform",
            isExpanded && "rotate-180"
          )}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isExpanded && (
        <Textarea
          id="background-context"
          placeholder='e.g. "This is my manager and I have already followed up twice."'
          value={formData.backgroundContext}
          onChange={(e) => setFormField("backgroundContext", e.target.value)}
          className="min-h-[80px] resize-none bg-background/50 border-border/60 focus:border-teal-500/50 transition-colors text-sm"
          maxLength={2000}
        />
      )}
    </div>
  );
}
