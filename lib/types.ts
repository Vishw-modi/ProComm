// ============================================================
// Core Type Definitions for AI Professional Communication Assistant
// ============================================================

export const COMMUNICATION_TYPES = [
  "Teams Message",
  "Email",
  "LinkedIn Message",
  "Follow-up",
  "Referral Request",
  "Status Update",
  "Escalation",
  "Meeting Request",
  "Thank You Note",
  "Apology",
  "Resignation",
  "Feedback Request",
] as const;

export type CommunicationType = (typeof COMMUNICATION_TYPES)[number];

export const RECIPIENT_ROLES = [
  "Manager",
  "Director",
  "HR",
  "Recruiter",
  "Client",
  "Colleague",
  "Employee",
  "Other",
] as const;

export type RecipientRole = (typeof RECIPIENT_ROLES)[number];

export const TONE_OPTIONS = [
  "Professional",
  "Friendly",
  "Confident",
  "Persuasive",
  "Diplomatic",
  "Assertive",
  "Formal",
  "Executive",
  "Appreciative",
  "Humble",
] as const;

export type ToneOption = (typeof TONE_OPTIONS)[number];

// Form input shape
export interface FormData {
  message: string;
  recipientName: string;
  recipientRole: RecipientRole | "";
  communicationType: CommunicationType;
  professionalism: number;
  tones: ToneOption[];
  backgroundContext: string;
  previousMessage: string;
}

// AI response from Gemini
export interface AIResponse {
  variantA: string;
  variantB: string;
  variantC: string;
  score_before: number;
  score_after: number;
  improvements: string[];
  red_flags: string[];
  subject_lines?: string[];
}

// History entry for saved messages
export interface HistoryEntry {
  id: string;
  timestamp: number;
  formData: FormData;
  response: AIResponse;
}

// Template for saved prompts
export interface Template {
  id: string;
  name: string;
  formData: Omit<FormData, "message">;
  createdAt: number;
}

// Favorite output
export interface FavoriteOutput {
  id: string;
  message: string;
  variant: "A" | "B" | "C";
  communicationType: CommunicationType;
  timestamp: number;
}

// Active variant tab
export type VariantTab = "A" | "B" | "C";

// API request body
export interface GenerateRequest {
  message: string;
  recipientName?: string;
  recipientRole?: string;
  communicationType: string;
  professionalism: number;
  tones: string[];
  backgroundContext?: string;
  previousMessage?: string;
}

// API response envelope
export interface ApiResponse {
  success: boolean;
  data?: AIResponse;
  error?: string;
}
