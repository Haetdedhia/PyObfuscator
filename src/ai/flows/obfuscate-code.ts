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

const obfuscateCodeFlow = ai.defineFlow(
  {
    name: 'obfuscateCodeFlow',
    inputSchema: ObfuscateCodeInputSchema,
    outputSchema: ObfuscateCodeOutputSchema,
  },
  async input => {
    // This implements a double-layer obfuscation.
    // Layer 1: An XOR cipher with obscure Unicode characters.
    // Layer 2: The entire XOR engine is encoded in Base64.
    const payload = input.sourceCode;
    
    // 1. Choose a random, obscure Unicode character for the XOR key.
    const keyChars = ['ᚓ', '𓆉', 'ᐰ', '፱', '⡷', '⩠', '⫏', '⫑'];
    const keyChar = keyChars[Math.floor(Math.random() * keyChars.length)];
    const key = keyChar.repeat(payload.length);

    // 2. Encrypt the payload with the XOR cipher.
    let encryptedChars = [];
    for (let i = 0; i < payload.length; i++) {
        const encryptedVal = payload.charCodeAt(i) ^ key.charCodeAt(i);
        encryptedChars.push(String.fromCharCode(encryptedVal));
    }
    const encryptedString = encryptedChars.join('');

    // 3. Assemble the inner layer: the self-contained XOR decryptor one-liner.
    const innerLayer = `exec((lambda 𓋹, 𓋺: ''.join([chr(ord(c1) ^ ord(c2)) for c1, c2 in zip(𓋹, 𓋺)]))('''${encryptedString}''', '''${key}'''))`;
    
    // 4. Encode the inner layer using Base64.
    const outerLayer = Buffer.from(innerLayer).toString('base64');

    // 5. Assemble the final, double-obfuscated code.
    const obfuscatedCode = `import base64\n\nouter_layer = '''\n${outerLayer}\n'''\n\nexec(base64.b64decode(outer_layer).decode())`;
    
    return { obfuscatedCode };
  }
);
