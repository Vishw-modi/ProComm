"use client";

import { useAppStore } from "@/store/use-app-store";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { COMMUNICATION_TYPES } from "@/lib/types";
import { COMMUNICATION_TYPE_HINTS } from "@/lib/constants";
import type { CommunicationType } from "@/lib/types";
import { Send } from "lucide-react";

export function CommunicationTypeSelect() {
  const { formData, setFormField } = useAppStore();

  const hint =
    COMMUNICATION_TYPE_HINTS[formData.communicationType] || "";

  return (
    <div className="space-y-2">
      <Label
        htmlFor="comm-type"
        className="text-sm font-medium flex items-center gap-2"
      >
        <Send className="h-4 w-4 text-teal-500" />
        Communication Type
      </Label>
      <Select
        value={formData.communicationType}
        onValueChange={(val) =>
          setFormField("communicationType", val as CommunicationType)
        }
      >
        <SelectTrigger id="comm-type" className="bg-background/50 border-border/60">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {COMMUNICATION_TYPES.map((type) => (
            <SelectItem key={type} value={type}>
              {type}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {hint && (
        <p className="text-xs text-muted-foreground/80 leading-relaxed pl-1">
          {hint}
        </p>
      )}
    </div>
  );
}
