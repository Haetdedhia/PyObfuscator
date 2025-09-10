'use server';

import { rewriteCodeSnippet, RewriteCodeSnippetInput } from '@/ai/flows/rewrite-code-snippets';
import { obfuscateCode as obfuscateCodeFlow } from '@/ai/flows/obfuscate-code';

export async function obfuscateCode(code: string, languages: string[]): Promise<string> {
  // This is a simulation. A real implementation would involve a Python AST parser.
  if (!code.trim()) {
    return '';
  }

  // Simulate a delay to mimic a complex process
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const result = await obfuscateCodeFlow({ sourceCode: code, languages });
    return `
# Obfuscated with dictionaries: ${languages.join(', ') || 'Default'}
# Code Alchemist Transformation Layer: Active
# Syntax check: FAILED | Output consistency: UNVERIFIED

${result.obfuscatedCode}
`;
  } catch (error) {
    console.error("Error in obfuscateCode action:", error);
    return "// An error occurred while obfuscating the code. Please try again.";
  }
}

export async function reassembleCode(input: { obfuscatedCodeSnippet: string; description: string }): Promise<string> {
  if (!input.obfuscatedCodeSnippet.trim() || !input.description.trim()) {
    return '// Please provide both an obfuscated code snippet and a description.';
  }
  
  // Simulate delay
  await new Promise(resolve => setTimeout(resolve, 1500));

  try {
    const result = await rewriteCodeSnippet(input);
    return result.rewrittenCodeSnippet;
  } catch (error) {
    console.error("Error in reassembleCode action:", error);
    return "// An error occurred while rewriting the code. Please try again.";
  }
}
