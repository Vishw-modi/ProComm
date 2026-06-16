import { z } from "zod";
import {
  COMMUNICATION_TYPES,
  RECIPIENT_ROLES,
  TONE_OPTIONS,
} from "./types";

// Form validation schema
export const formSchema = z.object({
  message: z
    .string()
    .min(1, "Please enter your message")
    .max(5000, "Message must be under 5000 characters"),
  recipientName: z.string().max(100).optional().default(""),
  recipientRole: z.string().optional().default(""),
  communicationType: z.enum(COMMUNICATION_TYPES).default("Teams Message"),
  professionalism: z.number().min(0).max(100).default(70),
  tones: z
    .array(z.enum(TONE_OPTIONS))
    .min(1, "Select at least one tone")
    .default(["Professional"]),
  backgroundContext: z.string().max(2000).optional().default(""),
  previousMessage: z.string().max(5000).optional().default(""),
});

export type FormSchemaType = z.infer<typeof formSchema>;

// AI response validation schema
export const aiResponseSchema = z.object({
  variantA: z.string(),
  variantB: z.string(),
  variantC: z.string(),
  score_before: z.number().min(0).max(100),
  score_after: z.number().min(0).max(100),
  improvements: z.array(z.string()),
  red_flags: z.array(z.string()),
  subject_lines: z.array(z.string()).optional(),
});

// Generate request schema (server-side validation)
export const generateRequestSchema = z.object({
  message: z.string().min(1).max(5000),
  recipientName: z.string().optional(),
  recipientRole: z.string().optional(),
  communicationType: z.string(),
  professionalism: z.number().min(0).max(100),
  tones: z.array(z.string()).min(1),
  backgroundContext: z.string().optional(),
  previousMessage: z.string().optional(),
});
