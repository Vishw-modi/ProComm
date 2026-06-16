"use client";

import { useAppStore } from "@/store/use-app-store";
import { toast } from "sonner";
import type { ApiResponse } from "@/lib/types";

export function useGenerateMessage() {
  const {
    formData,
    isLoading,
    setIsLoading,
    setResponse,
    setError,
    setActiveVariant,
    addToHistory,
  } = useAppStore();

  const canGenerate = formData.message.trim().length > 0 && !isLoading;

  const handleGenerate = async () => {
    if (!canGenerate) return;

    setIsLoading(true);
    setError(null);
    setActiveVariant("A");

    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: formData.message,
          recipientName: formData.recipientName || undefined,
          recipientRole: formData.recipientRole || undefined,
          communicationType: formData.communicationType,
          professionalism: formData.professionalism,
          tones: formData.tones,
          backgroundContext: formData.backgroundContext || undefined,
          previousMessage: formData.previousMessage || undefined,
        }),
      });

      const data: ApiResponse = await res.json();

      if (!data.success || !data.data) {
        throw new Error(data.error || "Failed to generate message");
      }

      setResponse(data.data);

      addToHistory({
        formData: { ...formData },
        response: data.data,
      });

      toast.success("Message generated successfully!", {
        description: "3 variants ready for review",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Something went wrong";
      setError(errorMessage);
      toast.error("Generation failed", { description: errorMessage });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    canGenerate,
    handleGenerate,
    isLoading,
  };
}
