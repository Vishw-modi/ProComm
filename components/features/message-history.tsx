"use client";

import { useAppStore } from "@/store/use-app-store";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { History, Trash2, RotateCcw } from "lucide-react";
import { useState } from "react";

export function MessageHistory() {
  const { history, removeFromHistory, clearHistory, loadFormData, setResponse } =
    useAppStore();
  const [open, setOpen] = useState(false);

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);

    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  };

  const handleRestore = (entry: (typeof history)[0]) => {
    loadFormData(entry.formData);
    setResponse(entry.response);
    setOpen(false);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 relative"
            aria-label="Message history"
          />
        }
      >
        <History className="h-4 w-4" />
        {history.length > 0 && (
          <span className="absolute -top-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-teal-500 text-[9px] text-white flex items-center justify-center font-medium">
            {history.length > 9 ? "9+" : history.length}
          </span>
        )}
      </SheetTrigger>
      <SheetContent className="w-[380px] sm:w-[420px]">
        <SheetHeader>
          <div className="flex items-center justify-between">
            <SheetTitle className="text-base">Message History</SheetTitle>
            {history.length > 0 && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearHistory}
                className="text-xs text-muted-foreground hover:text-red-400 h-7"
              >
                Clear All
              </Button>
            )}
          </div>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-100px)] px-4">
          {history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <History className="h-8 w-8 text-muted-foreground/30 mb-3" />
              <p className="text-sm text-muted-foreground">
                No history yet
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                Generated messages will appear here
              </p>
            </div>
          ) : (
            <div className="space-y-2 pr-2">
              {history.map((entry) => (
                <div
                  key={entry.id}
                  className="p-3 rounded-lg border border-border/50 hover:border-border hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-[10px] font-medium px-1.5 py-0.5 rounded bg-muted text-muted-foreground">
                          {entry.formData.communicationType}
                        </span>
                        <span className="text-[10px] text-muted-foreground/60">
                          {formatDate(entry.timestamp)}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/70 line-clamp-2 leading-relaxed">
                        {entry.formData.message}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[10px] text-muted-foreground">
                          Score: {entry.response.score_before} →{" "}
                          <span className="text-emerald-500 font-medium">
                            {entry.response.score_after}
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6"
                        onClick={() => handleRestore(entry)}
                        title="Restore"
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 text-muted-foreground hover:text-red-400"
                        onClick={() => removeFromHistory(entry.id)}
                        title="Delete"
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
