"use client";

import { useEffect } from "react";
import { useAppStore } from "@/store/use-app-store";

export function KeyboardShortcuts() {
  const { formData, isLoading, response, activeVariant } = useAppStore();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ctrl+Enter — Generate
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        const generateBtn = document.querySelector<HTMLButtonElement>(
          'button:has(.lucide-wand2)'
        );
        if (generateBtn && !generateBtn.disabled) {
          generateBtn.click();
        }
      }

      // Ctrl+Shift+C — Copy current variant
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === "C") {
        e.preventDefault();
        if (response) {
          const map = {
            A: response.variantA,
            B: response.variantB,
            C: response.variantC,
          };
          const text = map[activeVariant];
          if (text) {
            navigator.clipboard.writeText(text);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [formData, isLoading, response, activeVariant]);

  return null;
}
