import { COMMUNICATION_TYPE_HINTS, TONE_DESCRIPTIONS } from "./constants";
import type { GenerateRequest } from "./types";

/**
 * Build the system prompt for the AI communication coach
 */
export function buildSystemPrompt(): string {
  return `You are an expert executive communication specialist and professional writing coach. Your role is to transform rough, casual, or poorly-written messages into polished, professional business communication.

CORE PRINCIPLES:
- Maintain the sender's original intent and key points
- Improve grammar, structure, and clarity
- Adapt the tone and formality to match the specified requirements
- Keep language natural — avoid sounding robotic or overly corporate
- Avoid excessive jargon unless the context demands it
- Use clear, direct sentences that convey confidence
- Preserve any specific details, dates, or action items from the original

OUTPUT FORMAT:
You MUST return a valid JSON object with exactly this structure:
{
  "variantA": "First rewritten version - closest to original intent with polish",
  "variantB": "Second version - slightly different structure or approach",
  "variantC": "Third version - most different in wording while keeping same meaning",
  "score_before": <number 0-100 rating the professionalism of the original>,
  "score_after": <number 0-100 rating the professionalism of the best variant>,
  "improvements": ["list of specific improvements made"],
  "red_flags": ["list of issues found in the original message"],
  "subject_lines": ["3 email subject line suggestions if communication type is Email, otherwise empty array"]
}

IMPORTANT: Return ONLY the JSON object. No markdown, no code fences, no explanation before or after.`;
}

/**
 * Build the user context prompt with all form data
 */
export function buildUserPrompt(data: GenerateRequest): string {
  const typeHint =
    COMMUNICATION_TYPE_HINTS[
      data.communicationType as keyof typeof COMMUNICATION_TYPE_HINTS
    ] || "";

  const toneDescriptions = data.tones
    .map((t) => {
      const desc =
        TONE_DESCRIPTIONS[t as keyof typeof TONE_DESCRIPTIONS] || t;
      return `${t}: ${desc}`;
    })
    .join("\n  ");

  let prompt = `=== COMMUNICATION CONTEXT ===
Type: ${data.communicationType}
Style Guide: ${typeHint}

Professionalism Level: ${data.professionalism}/100
Selected Tones:
  ${toneDescriptions}
`;

  if (data.recipientName || data.recipientRole) {
    prompt += `\n=== RECIPIENT INFO ===\n`;
    if (data.recipientName) prompt += `Name: ${data.recipientName}\n`;
    if (data.recipientRole) prompt += `Role: ${data.recipientRole}\n`;
  }

  if (data.backgroundContext) {
    prompt += `\n=== BACKGROUND CONTEXT ===\n${data.backgroundContext}\n`;
  }

  if (data.previousMessage) {
    prompt += `\n=== PREVIOUS CONVERSATION ===\n${data.previousMessage}\n`;
  }

  prompt += `\n=== ORIGINAL MESSAGE TO REWRITE ===\n${data.message}\n`;

  prompt += `\n=== TASK ===
Generate 3 professionally rewritten versions of the message above. Each version should:
1. Maintain the original intent
2. Match the specified professionalism level (${data.professionalism}/100)
3. Reflect the selected tones: ${data.tones.join(", ")}
4. Be appropriate for sending to ${data.recipientRole || "a colleague"} via ${data.communicationType}
${data.communicationType === "Email" ? "5. Also suggest 3 email subject lines" : ""}

Analyze the original message and return your response as a JSON object.`;

  return prompt;
}
