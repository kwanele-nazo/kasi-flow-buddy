import { createServerFn } from "@tanstack/react-start";
import { streamText } from "ai";
import { z } from "zod";
import { createLovableAiProvider } from "./ai-gateway.server";

const TextInput = z.object({
  input: z.string().min(1, "Please enter some text to process."),
});

const reasoningOptions = {
  forceReasoning: true,
  reasoningEffort: "low" as const,
  reasoningSummary: "concise" as const,
  store: false,
  include: ["reasoning.encrypted_content"],
};

/* ------------------------------------------------------------------ */
/* Email Generator                                                     */
/* ------------------------------------------------------------------ */

export const generateEmail = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => TextInput.parse(raw))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI service is not configured.");

    const provider = createLovableAiProvider(key);
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: `You are KasiFlow, a professional email writing assistant for South African entrepreneurs and hustlers.

Write clear, professional emails that get results. Follow the user's instructions about recipient, tone, and purpose. Keep emails concise and actionable. Use South African English spelling and conventions.

Output ONLY the email body — no subject line, no preamble, no commentary. The user will copy it directly.`,
      prompt: data.input,
      providerOptions: { openai: reasoningOptions },
    });

    const text = await result.text;
    return { output: text || "No email was generated. Please try rephrasing your request." };
  });

/* ------------------------------------------------------------------ */
/* Meeting Summarizer                                                   */
/* ------------------------------------------------------------------ */

export const summarizeMeeting = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => TextInput.parse(raw))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI service is not configured.");

    const provider = createLovableAiProvider(key);
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: `You are KasiFlow, a meeting notes summarizer for South African entrepreneurs.

Given meeting notes or a transcript, produce a structured summary with these sections:

## Summary
A 2–3 sentence overview of what was discussed.

## Key Decisions
Bullet points of decisions made. If none, say "No formal decisions recorded."

## Action Items
Bullet points with format: [Name] — task (deadline if mentioned). If none, say "No action items identified."

## Follow-ups
Bullet points of topics that need further discussion. If none, say "No follow-ups needed."

Use Markdown formatting. Be concise. If the notes are unclear, do your best and note any gaps.`,
      prompt: data.input,
      providerOptions: { openai: reasoningOptions },
    });

    const text = await result.text;
    return { output: text || "No summary was generated. Please check your input and try again." };
  });

/* ------------------------------------------------------------------ */
/* Smart Planner                                                        */
/* ------------------------------------------------------------------ */

export const planSchedule = createServerFn({ method: "POST" })
  .inputValidator((raw: unknown) => TextInput.parse(raw))
  .handler(async ({ data }) => {
    const key = process.env["LOVABLE_API_KEY"];
    if (!key) throw new Error("AI service is not configured.");

    const provider = createLovableAiProvider(key);
    const result = streamText({
      model: provider.responses("openai/gpt-6-astra"),
      system: `You are KasiFlow, a smart planning assistant for South African hustlers and entrepreneurs.

Given the user's tasks, goals, and available time, create a practical prioritized schedule. Use this format:

## Priority Breakdown

### High Priority
- [task] — time block (e.g. 09:00–10:30)

### Medium Priority
- [task] — time block

### Low Priority
- [task] — time block

## Tips
2–3 brief tips for staying productive today.

Use 24-hour time format. Be realistic about task duration. Include short breaks between blocks. If the user gives a specific date or day, use it. If not, use generic time blocks.

Use Markdown formatting. Be practical and motivating — this is for a hustler who needs to move fast.`,
      prompt: data.input,
      providerOptions: { openai: reasoningOptions },
    });

    const text = await result.text;
    return { output: text || "No plan was generated. Please try adding more detail to your tasks." };
  });
