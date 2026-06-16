"use client";

import { Button } from "@/components/ui/button";
import { Wand2, Loader2 } from "lucide-react";
import { useGenerateMessage } from "@/components/forms/use-generate-message";

export function GenerateButton() {
  const { canGenerate, handleGenerate, isLoading } = useGenerateMessage();

  return (
    <Button
      onClick={handleGenerate}
      disabled={!canGenerate}
      className="w-full h-11 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-500 hover:to-cyan-500 text-white shadow-lg shadow-teal-500/20 hover:shadow-teal-500/30 transition-all duration-300 font-medium"
      size="lg"
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Generating...
        </>
      ) : (
        <>
          <Wand2 className="h-4 w-4 mr-2" />
          Generate Professional Message
          <kbd className="ml-2 text-[10px] opacity-60 bg-white/10 px-1.5 py-0.5 rounded hidden sm:inline-block">
            Ctrl+↵
          </kbd>
        </>
      )}
    </Button>
  );
}
