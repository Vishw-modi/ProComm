"use client";

import { useAppStore } from "@/store/use-app-store";
import { Label } from "@/components/ui/label";
import { TONE_OPTIONS } from "@/lib/types";
import type { ToneOption } from "@/lib/types";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function ToneSelector() {
  const { formData, setFormField } = useAppStore();
  const selectedTones = formData.tones;

  const toggleTone = (tone: ToneOption) => {
    if (selectedTones.includes(tone)) {
      // Don't allow removing the last tone
      if (selectedTones.length === 1) return;
      setFormField(
        "tones",
        selectedTones.filter((t) => t !== tone)
      );
    } else {
      setFormField("tones", [...selectedTones, tone]);
    }
  };

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-teal-500" />
        Tone
        <span className="text-xs text-muted-foreground font-normal">
          ({selectedTones.length} selected)
        </span>
      </Label>
      <div className="flex flex-wrap gap-1.5">
        {TONE_OPTIONS.map((tone) => {
          const isSelected = selectedTones.includes(tone);
          return (
            <button
              key={tone}
              onClick={() => toggleTone(tone)}
              className={cn(
                "px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-200",
                "border hover:scale-[1.02] active:scale-[0.98]",
                isSelected
                  ? "bg-teal-500/15 border-teal-500/40 text-teal-600 dark:text-teal-400 shadow-sm"
                  : "bg-muted/50 border-border/60 text-muted-foreground hover:bg-muted hover:border-border"
              )}
            >
              {tone}
            </button>
          );
        })}
      </div>
    </div>
  );
}
