import { GoogleGenerativeAI } from "@google/generative-ai";
import { generateRequestSchema, aiResponseSchema } from "@/lib/schemas";
import { buildSystemPrompt, buildUserPrompt } from "@/lib/prompt-builder";
import type { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

export async function POST(request: NextRequest) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { success: false, error: "API key not configured" },
        { status: 500 }
      );
    }

    const body = await request.json();

    // Validate request
    const parseResult = generateRequestSchema.safeParse(body);
    if (!parseResult.success) {
      return Response.json(
        {
          success: false,
          error: "Invalid request data",
          details: parseResult.error.message,
        },
        { status: 400 }
      );
    }

    const data = parseResult.data;

    // Build prompts
    const systemPrompt = buildSystemPrompt();
    const userPrompt = buildUserPrompt(data);

    // Call Gemini API
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash-lite",
      generationConfig: {
        temperature: 0.8,
        topP: 0.95,
        topK: 40,
        maxOutputTokens: 4096,
        responseMimeType: "application/json",
      },
      systemInstruction: systemPrompt,
    });

    const result = await model.generateContent(userPrompt);
    const responseText = result.response.text();

    // Parse JSON response
    let parsedResponse;
    try {
      // Try to extract JSON from the response
      let jsonStr = responseText.trim();

      // Remove markdown code fences if present
      if (jsonStr.startsWith("```")) {
        jsonStr = jsonStr.replace(/```(?:json)?\n?/g, "").trim();
      }

      parsedResponse = JSON.parse(jsonStr);
    } catch {
      console.error("Failed to parse AI response:", responseText);
      return Response.json(
        {
          success: false,
          error: "AI returned an invalid response. Please try again.",
        },
        { status: 502 }
      );
    }

    // Validate AI response structure
    const validationResult = aiResponseSchema.safeParse(parsedResponse);
    if (!validationResult.success) {
      console.error(
        "AI response validation failed:",
        validationResult.error.message
      );

      // Try to salvage what we can
      const fallbackResponse = {
        variantA: parsedResponse.variantA || parsedResponse.variant_a || responseText,
        variantB: parsedResponse.variantB || parsedResponse.variant_b || "",
        variantC: parsedResponse.variantC || parsedResponse.variant_c || "",
        score_before: parsedResponse.score_before ?? 50,
        score_after: parsedResponse.score_after ?? 80,
        improvements: parsedResponse.improvements || [],
        red_flags: parsedResponse.red_flags || [],
        subject_lines: parsedResponse.subject_lines || [],
      };

      return Response.json({ success: true, data: fallbackResponse });
    }

    return Response.json({ success: true, data: validationResult.data });
  } catch (error) {
    console.error("Generate API error:", error);
    const message =
      error instanceof Error ? error.message : "An unexpected error occurred";
    return Response.json(
      { success: false, error: message },
      { status: 500 }
    );
  }
}
