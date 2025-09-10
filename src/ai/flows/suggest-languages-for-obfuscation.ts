'use server';
/**
 * @fileOverview This file defines a Genkit flow for suggesting non-English languages for code obfuscation.
 *
 * The flow suggests a list of non-English languages that can be used as dictionaries for code obfuscation.
 * It leverages an LLM to generate the suggestions based on a predefined prompt.
 *
 * @file Exports:
 *   - `suggestLanguages`: An async function that triggers the language suggestion flow.
 *   - `SuggestLanguagesOutput`: The output type of the language suggestion flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestLanguagesOutputSchema = z.array(z.string().describe('A non-English language suitable for code obfuscation.')).describe('A list of suggested non-English languages.');
export type SuggestLanguagesOutput = z.infer<typeof SuggestLanguagesOutputSchema>;

export async function suggestLanguages(): Promise<SuggestLanguagesOutput> {
  return suggestLanguagesFlow();
}

const prompt = ai.definePrompt({
  name: 'suggestLanguagesPrompt',
  output: {schema: SuggestLanguagesOutputSchema},
  prompt: `Suggest a diverse list of non-English languages that would be suitable for use as dictionaries when obfuscating code.  Focus on languages with distinct character sets from English. Return the languages as a JSON array of strings.`,
});

const suggestLanguagesFlow = ai.defineFlow({
  name: 'suggestLanguagesFlow',
  outputSchema: SuggestLanguagesOutputSchema,
}, async () => {
  const {output} = await prompt({});
  return output!;
});
