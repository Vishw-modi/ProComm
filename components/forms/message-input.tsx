"use client";

import type { KeyboardEvent } from "react";
import { useAppStore } from "@/store/use-app-store";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MessageSquare, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGenerateMessage } from "@/components/forms/use-generate-message";

export function MessageInput() {
  const { formData, setFormField } = useAppStore();
  const { canGenerate, handleGenerate } = useGenerateMessage();
  const charCount = formData.message.length;
  const maxChars = 5000;

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key !== "Enter" || event.shiftKey || event.ctrlKey || event.metaKey) {
      return;
    }

    event.preventDefault();
    if (canGenerate) {
      void handleGenerate();
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <Label
          htmlFor="message-input"
          className="text-sm font-medium flex items-center gap-2"
        >
          <MessageSquare className="h-4 w-4 text-teal-500" />
          Your Message
        </Label>
        <span
          className={`text-xs tabular-nums ${
            charCount > maxChars * 0.9
              ? "text-red-400"
              : "text-muted-foreground"
          }`}
        >
          {charCount}/{maxChars}
        </span>
      </div>
      <div className="relative">
        <Textarea
          id="message-input"
          placeholder="Paste your rough draft here..."
          value={formData.message}
          onChange={(e) => setFormField("message", e.target.value)}
          onKeyDown={handleKeyDown}
          className="min-h-[140px] resize-none bg-background/50 backdrop-blur-sm border-border/60 focus:border-teal-500/50 transition-colors"
          maxLength={maxChars}
        />
        {formData.message && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 h-6 w-6 text-muted-foreground hover:text-foreground"
            onClick={() => setFormField("message", "")}
            aria-label="Clear message"
          >
            <X className="h-3.5 w-3.5" />
          </Button>
        )}
      </div>
    </div>
  );
}
