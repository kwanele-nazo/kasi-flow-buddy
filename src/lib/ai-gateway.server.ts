import { createOpenAI } from "@ai-sdk/openai";

/**
 * Creates a Lovable AI Gateway provider configured for the OpenAI Responses API.
 * Call this inside a server function handler — never at module scope.
 *
 * The provider authenticates via the Lovable-API-Key header. The model id
 * passed to `.responses()` must include its `openai/` prefix exactly as it
 * appears in the gateway catalog (e.g. "openai/gpt-6-astra").
 */
export function createLovableAiProvider(lovableApiKey: string) {
  return createOpenAI({
    baseURL: "https://ai.gateway.lovable.dev/v1",
    apiKey: lovableApiKey,
    headers: {
      "Lovable-API-Key": lovableApiKey,
      "X-Lovable-AIG-SDK": "vercel-ai-sdk",
    },
  });
}
