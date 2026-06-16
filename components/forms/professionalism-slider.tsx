"use client";

import { useAppStore } from "@/store/use-app-store";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { getProfessionalismLabel } from "@/lib/constants";
import { Gauge } from "lucide-react";

export function ProfessionalismSlider() {
  const { formData, setFormField } = useAppStore();
  const label = getProfessionalismLabel(formData.professionalism);

  // Color based on level
  const getColor = (value: number) => {
    if (value <= 30) return "text-sky-400";
    if (value <= 60) return "text-teal-400";
    if (value <= 85) return "text-emerald-400";
    return "text-amber-400";
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <Label className="text-sm font-medium flex items-center gap-2">
          <Gauge className="h-4 w-4 text-teal-500" />
          Professionalism
        </Label>
        <div className="flex items-center gap-2">
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-full bg-muted ${getColor(
              formData.professionalism
            )}`}
          >
            {label}
          </span>
          <span className="text-xs tabular-nums text-muted-foreground font-mono">
            {formData.professionalism}
          </span>
        </div>
      </div>
      <Slider
        value={formData.professionalism}
        onValueChange={(val) => setFormField("professionalism", val)}
        min={0}
        max={100}
        step={5}
        className="py-1"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground/60">
        <span>Casual</span>
        <span>Professional</span>
        <span>Corporate</span>
        <span>Executive</span>
      </div>
    </div>
  );
}
