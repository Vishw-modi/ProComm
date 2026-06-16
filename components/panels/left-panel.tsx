"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { MessageInput } from "@/components/forms/message-input";
import { RecipientInfo } from "@/components/forms/recipient-info";
import { CommunicationTypeSelect } from "@/components/forms/communication-type";
import { ProfessionalismSlider } from "@/components/forms/professionalism-slider";
import { ToneSelector } from "@/components/forms/tone-selector";
import { BackgroundContext } from "@/components/forms/background-context";
import { PreviousMessage } from "@/components/forms/previous-message";
import { GenerateButton } from "@/components/forms/generate-button";

export function LeftPanel() {
  return (
    <div className="flex min-h-0 flex-col h-full border-r border-border/40">
      <div className="px-4 py-3 border-b border-border/40">
        <h2 className="text-sm font-semibold tracking-tight">Input Controls</h2>
        <p className="text-xs text-muted-foreground mt-0.5">
          Configure your message parameters
        </p>
      </div>
      <ScrollArea className="flex-1 min-h-0">
        <div className="p-4 space-y-5">
          <MessageInput />
          <Separator className="opacity-40" />
          <RecipientInfo />
          <Separator className="opacity-40" />
          <CommunicationTypeSelect />
          <Separator className="opacity-40" />
          <ProfessionalismSlider />
          <Separator className="opacity-40" />
          <ToneSelector />
          <Separator className="opacity-40" />
          <BackgroundContext />
          <PreviousMessage />
          <div className="pt-2 pb-4">
            <GenerateButton />
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
