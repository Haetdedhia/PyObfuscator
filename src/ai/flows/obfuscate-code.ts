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
  prompt: `You are an expert in extreme code obfuscation. Your mission is to make the given Python code COMPLETELY UNREADABLE and structurally broken, especially for other AI tools. The output should look like corrupted data, not runnable code.

You will be given a Python code snippet and a list of languages. Your task is to apply multiple layers of aggressive, chaotic obfuscation.

Here are the techniques you MUST use:
1.  **Do NOT produce runnable or syntactically valid code.** The output must be a chaotic mess.
2.  **Multi-language Keyword/Variable replacement:** Replace Python keywords, variables, and function names with plausible-looking but incorrect words from the provided languages: {{{languages}}}. Be extremely inconsistent. A variable named 'count' might be 'compter' in one place and 'kazu' in another.
3.  **Complex and Visually Deceptive Character Substitution:** Do not just swap characters 1-to-1. Use a randomized mix of visually similar characters from various Unicode blocks (like Greek, Cyrillic, CJK radicals, box-drawing characters, etc.). For example, 'e' could become 'е' (Cyrillic), 'ε' (Greek), or a symbol like '∊'. Make it jarring.
4.  **Radical Structural Disruption:** Dismantle the code's structure. Aggressively remove or replace critical syntax like colons, parentheses, and operators with misleading Unicode symbols (e.g., replace a colon with '⁝' or a parenthesis with '❨'). Indentation must be destroyed and randomized.
5.  **Inject "Red Herrings" and Gibberish:** Add plausible-looking but nonsensical lines of code. More importantly, inject random snippets of text or proverbs from the source languages directly into the code to break any remaining semantic flow. For example, a line might look like: "για i in range(10) ... La vita è bella ... print(i)".
6.  **Corrupt Formatting:** Use random line breaks within variable names or keywords. Merge lines together. Create a visual flow that is impossible for a parser to follow.
7.  **Misleading Formatting**: Use formatting and line breaks that seem to imply a structure, but which is actually nonsensical.

Source Code to Obfuscate:
\'\'\'python
{{sourceCode}}
\'\'\'

Languages to use for replacement terms and gibberish: {{#each languages}}{{this}}{{#unless @last}}, {{/unless}}{{/each}}

Produce the obfuscated code. Do not include any explanations, just the raw, mangled code block.
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
