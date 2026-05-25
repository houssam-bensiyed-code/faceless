/**
 * Port interface for AI text generation.
 * Consumed by: Workers, ScoreParserTransformer (justified exception).
 * Production adapter: AnthropicAdapter (with decorator chain).
 * Test adapter: StubAIProvider.
 */
export interface IAIProviderPort {
  /**
   * Sends a prompt to the AI provider and returns the generated text.
   * @param prompt - The user/task prompt to send.
   * @param systemPrompt - Optional system-level instructions.
   * @returns The AI-generated text response.
   */
  generate(prompt: string, systemPrompt?: string): Promise<string>;
}
