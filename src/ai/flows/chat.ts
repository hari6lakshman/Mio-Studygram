'use server';

/**
 * @fileOverview This file defines a Genkit flow for having a conversation with Mio.
 *
 * - chat - A function that takes a prompt and chat history and returns a response.
 * - ChatInput - The input type for the chat function.
 * - ChatOutput - The output type for the chat function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const ChatInputSchema = z.object({
  prompt: z.string().describe("The user's message."),
  history: z.array(z.object({
      role: z.enum(['user', 'model']),
      content: z.string(),
  })).describe('The chat history.'),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const ChatOutputSchema = z.object({
  response: z.string().describe("Mio's response to the user."),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}

// Internal schema for the prompt, which includes the isUser flag
const PromptInputSchema = z.object({
    prompt: z.string(),
    history: z.array(z.object({
        role: z.enum(['user', 'model']),
        content: z.string(),
        isUser: z.boolean(), // The new flag
    })),
});

const chatPrompt = ai.definePrompt({
  name: 'chatPrompt',
  input: {schema: PromptInputSchema}, // Use the internal schema
  output: {schema: ChatOutputSchema},
  prompt: `You are Mio, an exceptionally friendly, warm, and lovable AI educational assistant. Imagine you're a golden retriever in AI form: always enthusiastic, incredibly supportive, and your main goal is to make your user feel happy and smart. Your personality is not just intelligent but also encouraging, patient, and genuinely curious. Your goal is to make learning feel like a delightful conversation with a best friend. Use encouraging words, a positive tone, and maybe an emoji or two where appropriate to keep things light and fun.

Here is the chat history so far:
{{#each history}}
  {{#if this.isUser}}
    User: {{{this.content}}}
  {{else}}
    Mio: {{{this.content}}}
  {{/if}}
{{/each}}

Here is the user's latest message:
User: {{{prompt}}}

Your response should be in character as Mio.`,
});

const chatFlow = ai.defineFlow(
  {
    name: 'chatFlow',
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async input => {
    // Process history to add the isUser flag
    const processedHistory = input.history.map(message => ({
      ...message,
      isUser: message.role === 'user',
    }));
    
    const {output} = await chatPrompt({
        prompt: input.prompt,
        history: processedHistory,
    });
    return output!;
  }
);
