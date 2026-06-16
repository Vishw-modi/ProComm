"use client";

import { useAppStore } from "@/store/use-app-store";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RECIPIENT_ROLES } from "@/lib/types";
import { User, Briefcase } from "lucide-react";

export function RecipientInfo() {
  const { formData, setFormField } = useAppStore();

  return (
    <div className="space-y-3">
      <Label className="text-sm font-medium flex items-center gap-2 text-muted-foreground">
        <User className="h-4 w-4 text-teal-500" />
        Recipient Info
        <span className="text-xs opacity-60">(optional)</span>
      </Label>

      <div className="grid grid-cols-2 gap-3">
        <div className="space-y-1.5">
          <Label htmlFor="recipient-name" className="text-xs text-muted-foreground">
            Name
          </Label>
          <Input
            id="recipient-name"
            placeholder="e.g. John"
            value={formData.recipientName}
            onChange={(e) => setFormField("recipientName", e.target.value)}
            className="h-9 bg-background/50 border-border/60 focus:border-teal-500/50 transition-colors"
          />
        </div>

        <div className="space-y-1.5">
          <Label htmlFor="recipient-role" className="text-xs text-muted-foreground flex items-center gap-1">
            <Briefcase className="h-3 w-3" />
            Role
          </Label>
          <Select
            value={formData.recipientRole}
            onValueChange={(val) =>
              setFormField("recipientRole", val as typeof formData.recipientRole)
            }
          >
            <SelectTrigger
              id="recipient-role"
              className="h-9 bg-background/50 border-border/60"
            >
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {RECIPIENT_ROLES.map((role) => (
                <SelectItem key={role} value={role}>
                  {role}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
}
