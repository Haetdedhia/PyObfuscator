'use server';

/**
 * @fileOverview Rewrites code snippets from obfuscated code using an LLM.
 *
 * - rewriteCodeSnippet - A function that rewrites a portion of obfuscated code based on a description.
 * - RewriteCodeSnippetInput - The input type for the rewriteCodeSnippet function.
 * - RewriteCodeSnippetOutput - The return type for the rewriteCodeSnippet function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteCodeSnippetInputSchema = z.object({
  obfuscatedCodeSnippet: z
    .string()
    .describe('The obfuscated code snippet to rewrite.'),
  description: z
    .string()
    .describe(
      'A description of what the code snippet should do after rewriting.'
    ),
});
export type RewriteCodeSnippetInput = z.infer<typeof RewriteCodeSnippetInputSchema>;

const RewriteCodeSnippetOutputSchema = z.object({
  rewrittenCodeSnippet: z
    .string()
    .describe('The rewritten code snippet in plain Python.'),
});
export type RewriteCodeSnippetOutput = z.infer<typeof RewriteCodeSnippetOutputSchema>;

export async function rewriteCodeSnippet(
  input: RewriteCodeSnippetInput
): Promise<RewriteCodeSnippetOutput> {
  return rewriteCodeSnippetFlow(input);
}

const rewriteCodeSnippetPrompt = ai.definePrompt({
  name: 'rewriteCodeSnippetPrompt',
  input: {schema: RewriteCodeSnippetInputSchema},
  output: {schema: RewriteCodeSnippetOutputSchema},
  prompt: `You are a highly skilled Python developer. Your task is to write a *new* Python code snippet based *only* on the user's description of the intended functionality.

  **IMPORTANT:** You MUST IGNORE the provided "obfuscated code snippet". It is a visual distraction and contains no useful information for your task. Your only source of truth is the description.

  Here is the description of what the new code snippet should do:
  "{{description}}"

  Based on that description, write a clean, functional, and understandable Python code snippet.
  Keep the rewritten code as concise as possible.
  `,
});

const rewriteCodeSnippetFlow = ai.defineFlow(
  {
    name: 'rewriteCodeSnippetFlow',
    inputSchema: RewriteCodeSnippetInputSchema,
    outputSchema: RewriteCodeSnippetOutputSchema,
  },
  async input => {
    const {output} = await rewriteCodeSnippetPrompt(input);
    return output!;
  }
);
