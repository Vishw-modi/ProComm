"use client";

import { useAppStore } from "@/store/use-app-store";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bookmark, Plus, Trash2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export function Templates() {
  const {
    templates,
    addTemplate,
    removeTemplate,
    formData,
    loadFormData,
  } = useAppStore();

  const [templateName, setTemplateName] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSave = () => {
    if (!templateName.trim()) {
      toast.error("Please enter a template name");
      return;
    }
    const { message, ...rest } = formData;
    addTemplate(templateName.trim(), rest);
    setTemplateName("");
    toast.success("Template saved!");
  };

  const handleLoad = (template: (typeof templates)[0]) => {
    loadFormData(template.formData);
    setIsOpen(false);
    toast.success(`Loaded template: ${template.name}`);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Templates"
          />
        }
      >
        <Bookmark className="h-4 w-4" />
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-base">Templates</DialogTitle>
        </DialogHeader>

        {/* Save current */}
        <div className="flex gap-2">
          <Input
            placeholder="Template name..."
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="h-9 text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
          <Button onClick={handleSave} size="sm" className="gap-1 shrink-0">
            <Plus className="h-3.5 w-3.5" />
            Save
          </Button>
        </div>

        {/* Template list */}
        <ScrollArea className="max-h-[300px]">
          {templates.length === 0 ? (
            <div className="py-8 text-center">
              <Bookmark className="h-6 w-6 text-muted-foreground/30 mx-auto mb-2" />
              <p className="text-xs text-muted-foreground">
                Save your first template
              </p>
            </div>
          ) : (
            <div className="space-y-1.5">
              {templates.map((template) => (
                <div
                  key={template.id}
                  className="flex items-center gap-2 p-2.5 rounded-lg border border-border/50 hover:border-border hover:bg-muted/30 transition-colors group"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">
                      {template.name}
                    </p>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {template.formData.communicationType} ·{" "}
                      {template.formData.tones.join(", ")}
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={() => handleLoad(template)}
                    title="Load"
                  >
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-red-400"
                    onClick={() => removeTemplate(template.id)}
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
