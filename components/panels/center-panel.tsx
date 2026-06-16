"use client";

import { useAppStore } from "@/store/use-app-store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Copy,
  RefreshCw,
  Download,
  FileText,
  Star,
  Check,
  Wand2,
} from "lucide-react";
import { toast } from "sonner";
import { useState } from "react";
import type { VariantTab } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CenterPanel() {
  const {
    response,
    isLoading,
    error,
    activeVariant,
    setActiveVariant,
    formData,
    addFavorite,
  } = useAppStore();

  const [copiedVariant, setCopiedVariant] = useState<VariantTab | null>(null);

  const getVariantText = (variant: VariantTab): string => {
    if (!response) return "";
    const map = { A: response.variantA, B: response.variantB, C: response.variantC };
    return map[variant] || "";
  };

  const currentText = getVariantText(activeVariant);

  const handleCopy = async (variant: VariantTab) => {
    const text = getVariantText(variant);
    await navigator.clipboard.writeText(text);
    setCopiedVariant(variant);
    toast.success("Copied to clipboard");
    setTimeout(() => setCopiedVariant(null), 2000);
  };

  const handleDownloadTxt = () => {
    const blob = new Blob([currentText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `message-variant-${activeVariant.toLowerCase()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Downloaded as TXT");
  };

  const handleDownloadPdf = async () => {
    const { jsPDF } = await import("jspdf");
    const doc = new jsPDF();
    const margin = 20;
    const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;

    doc.setFontSize(16);
    doc.text("Professional Message", margin, margin);
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(
      `Type: ${formData.communicationType} | Variant ${activeVariant}`,
      margin,
      margin + 8
    );
    doc.setFontSize(12);
    doc.setTextColor(0);
    const lines = doc.splitTextToSize(currentText, pageWidth);
    doc.text(lines, margin, margin + 20);
    doc.save(`message-variant-${activeVariant.toLowerCase()}.pdf`);
    toast.success("Downloaded as PDF");
  };

  const handleFavorite = () => {
    addFavorite(currentText, activeVariant, formData.communicationType);
    toast.success("Added to favorites");
  };

  const handleRegenerate = () => {
    // Trigger regeneration by clicking the generate button via the store action
    const generateBtn = document.querySelector<HTMLButtonElement>(
      'button:has(.lucide-wand2), button:has(.lucide-loader2)'
    );
    if (generateBtn && !generateBtn.disabled) {
      generateBtn.click();
    }
  };

  // Empty state
  if (!response && !isLoading && !error) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-border/40">
          <h2 className="text-sm font-semibold tracking-tight">Generated Output</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Your polished message will appear here
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-teal-500/10 to-cyan-500/10 flex items-center justify-center mx-auto mb-4">
              <Wand2 className="h-7 w-7 text-teal-500/60" />
            </div>
            <h3 className="text-lg font-semibold text-foreground/80 mb-2">
              Ready to Transform
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Enter your draft message on the left panel and click{" "}
              <span className="text-teal-500 font-medium">Generate</span> to
              create polished variants.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Loading state
  if (isLoading) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-border/40">
          <h2 className="text-sm font-semibold tracking-tight">Generated Output</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Crafting your professional message...
          </p>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <div className="flex gap-2">
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
            <Skeleton className="h-9 w-28" />
          </div>
          <Card className="p-6 space-y-3">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
          </Card>
          <div className="flex gap-2">
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
            <Skeleton className="h-9 w-24" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex flex-col h-full">
        <div className="px-4 py-3 border-b border-border/40">
          <h2 className="text-sm font-semibold tracking-tight">Generated Output</h2>
        </div>
        <div className="flex-1 flex items-center justify-center p-8">
          <div className="text-center max-w-sm">
            <div className="w-16 h-16 rounded-2xl bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">⚠️</span>
            </div>
            <h3 className="text-lg font-semibold text-foreground/80 mb-2">
              Something went wrong
            </h3>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <Button variant="outline" onClick={handleRegenerate} size="sm">
              <RefreshCw className="h-4 w-4 mr-2" />
              Try Again
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Success state
  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b border-border/40">
        <h2 className="text-sm font-semibold tracking-tight">Generated Output</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          {formData.communicationType} · Variant {activeVariant}
        </p>
      </div>
      <div className="flex-1 flex flex-col p-4 gap-3 min-h-0">
        <Tabs
          value={activeVariant}
          onValueChange={(v) => setActiveVariant(v as VariantTab)}
          className="flex-1 flex flex-col min-h-0"
        >
          <TabsList className="w-full justify-start bg-muted/50 gap-1">
            {(["A", "B", "C"] as VariantTab[]).map((variant) => (
              <TabsTrigger
                key={variant}
                value={variant}
                className={cn(
                  "data-[state=active]:bg-background data-[state=active]:shadow-sm",
                  "transition-all"
                )}
              >
                <span className="text-xs font-medium">Version {variant}</span>
              </TabsTrigger>
            ))}
          </TabsList>

          {(["A", "B", "C"] as VariantTab[]).map((variant) => (
            <TabsContent
              key={variant}
              value={variant}
              className="flex-1 min-h-0 mt-3"
            >
              <Card className="h-full flex flex-col bg-background/50 backdrop-blur-sm border-border/60">
                <ScrollArea className="flex-1 p-5">
                  <p className="text-sm leading-relaxed whitespace-pre-wrap">
                    {getVariantText(variant)}
                  </p>
                </ScrollArea>
              </Card>
            </TabsContent>
          ))}
        </Tabs>

        {/* Action buttons */}
        <div className="flex items-center gap-2 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleCopy(activeVariant)}
            className="gap-1.5"
          >
            {copiedVariant === activeVariant ? (
              <Check className="h-3.5 w-3.5 text-emerald-500" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            {copiedVariant === activeVariant ? "Copied" : "Copy"}
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleRegenerate}
            className="gap-1.5"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Regenerate
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadTxt}
            className="gap-1.5"
          >
            <FileText className="h-3.5 w-3.5" />
            TXT
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleDownloadPdf}
            className="gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            PDF
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleFavorite}
            className="gap-1.5 ml-auto text-muted-foreground hover:text-amber-500"
          >
            <Star className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
