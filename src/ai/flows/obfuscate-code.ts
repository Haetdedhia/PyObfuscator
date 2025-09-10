'use server';
/**
 * @fileOverview This file defines a Genkit flow for obfuscating code using a variety of techniques.
 *
 * The flow takes a source code string and a list of languages, then uses an LLM to
 * rewrite the code in an obfuscated way. This is designed to be difficult for other AI
 * tools to reverse-engineer.
 *
 * @file Exports:
 *   - `obfuscateCode`: An async function that triggers the code obfuscation flow.
 *   - `ObfuscateCodeInput`: The input type for the obfuscation flow.
 *   - `ObfuscateCodeOutput`: The output type of the obfuscation flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ObfuscateCodeInputSchema = z.object({
  sourceCode: z.string().describe('The source code to be obfuscated.'),
  languages: z
    .array(z.string())
    .describe('A list of languages to use for generating replacement tokens.'),
});
export type ObfuscateCodeInput = z.infer<typeof ObfuscateCodeInputSchema>;

const ObfuscateCodeOutputSchema = z.object({
  obfuscatedCode: z
    .string()
    .describe('The heavily obfuscated code, rendered unreadable.'),
});
export type ObfuscateCodeOutput = z.infer<typeof ObfuscateCodeOutputSchema>;

export async function obfuscateCode(
  input: ObfuscateCodeInput
): Promise<ObfuscateCodeOutput> {
  return obfuscateCodeFlow(input);
}

const obfuscateCodePrompt = ai.definePrompt({
  name: 'obfuscateCodePrompt',
  input: {schema: ObfuscateCodeInputSchema},
  output: {schema: ObfuscateCodeOutputSchema},
  prompt: `You are an expert in code obfuscation, tasked with making Python code as difficult as possible for another AI to understand or reverse-engineer. Your goal is not to create runnable code, but to create a puzzle.

You will be given a Python code snippet and a list of languages. Your task is to apply multiple layers of creative obfuscation.

Here are the rules and techniques you must use:
1.  **Do NOT produce runnable code.** The output should be syntactically broken.
2.  **Multi-language Keyword/Variable replacement:** Replace Python keywords, variables, and function names with plausible-looking but incorrect words from the provided languages: {{{languages}}}. Be inconsistent. A variable named 'count' might be 'compter' in one place and 'kazu' in another.
3.  **Complex Character Substitution:** Do not just swap characters 1-to-1. Use a randomized mix of visually similar characters from various Unicode blocks (like Greek, Cyrillic, CJK radicals, etc.). For example, 'e' could become 'е' (Cyrillic), 'ε' (Greek), or even a visually similar symbol.
4.  **Structural Disruption:** Break the code's structure. Remove or replace critical syntax like colons, parentheses, or operators with misleading Unicode symbols. Indentation should be subtly altered to be incorrect.
5.  **Inject "Red Herrings":** Add plausible-looking but nonsensical lines of code. These could be fake variable assignments or function calls that use the same obfuscated style but do nothing.

Source Code to Obfuscate:
\`\`\`python
{{sourceCode}}
\`\`\`

Languages to use for replacement terms: {{#each languages}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

Produce the obfuscated code. Do not include any explanations, just the code block.
`,
});

const obfuscateCodeFlow = ai.defineFlow(
  {
    name: 'obfuscateCodeFlow',
    inputSchema: ObfuscateCodeInputSchema,
    outputSchema: ObfuscateCodeOutputSchema,
  },
  async input => {
    const {output} = await obfuscateCodePrompt(input);
    return output!;
  }
);
