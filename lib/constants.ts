import type { CommunicationType, ToneOption } from "./types";

// Communication type descriptions for AI prompt injection
export const COMMUNICATION_TYPE_HINTS: Record<CommunicationType, string> = {
  "Teams Message":
    "Keep it concise and conversational. Use short paragraphs. Suitable for internal team communication.",
  Email:
    "Include a proper greeting and sign-off. Structure with clear paragraphs. Maintain professional formatting.",
  "LinkedIn Message":
    "Keep it networking-friendly and personable. Be concise but warm. Show genuine interest.",
  "Follow-up":
    "Reference the previous conversation. Be polite but purposeful. Include a clear next step.",
  "Referral Request":
    "Be appreciative and specific about what you're looking for. Make it easy for the person to help.",
  "Status Update":
    "Be structured and factual. Lead with key results. Include blockers and next steps.",
  Escalation:
    "Be factual, not emotional. Clearly state the issue, impact, and what action is needed.",
  "Meeting Request":
    "State the purpose clearly. Suggest specific times. Include agenda or topics to discuss.",
  "Thank You Note":
    "Be sincere and specific about what you're thankful for. Keep it genuine, not generic.",
  Apology:
    "Take responsibility without over-apologizing. Focus on the solution and path forward.",
  Resignation:
    "Be professional and gracious. Express gratitude. Keep it brief and positive.",
  "Feedback Request":
    "Be specific about what feedback you want. Make it easy to respond. Show openness to input.",
};

// Tone descriptions for AI context
export const TONE_DESCRIPTIONS: Record<ToneOption, string> = {
  Professional: "Clear, business-appropriate language",
  Friendly: "Warm and approachable while maintaining respect",
  Confident: "Self-assured without being arrogant",
  Persuasive: "Compelling with strong reasoning",
  Diplomatic: "Tactful and considerate of all perspectives",
  Assertive: "Direct and clear about expectations",
  Formal: "Traditional business formality",
  Executive: "C-suite level communication style",
  Appreciative: "Expressing genuine gratitude",
  Humble: "Modest and respectful",
};

// Professionalism level labels
export const getProfessionalismLabel = (value: number): string => {
  if (value <= 20) return "Casual";
  if (value <= 40) return "Semi-Casual";
  if (value <= 60) return "Professional";
  if (value <= 80) return "Corporate";
  if (value <= 95) return "Executive";
  return "Ultra-Formal";
};

// Default form values
export const DEFAULT_FORM_VALUES = {
  message: "",
  recipientName: "",
  recipientRole: "" as const,
  communicationType: "Teams Message" as CommunicationType,
  professionalism: 70,
  tones: ["Professional"] as ToneOption[],
  backgroundContext: "",
  previousMessage: "",
};
