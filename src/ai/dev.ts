import { config } from 'dotenv';
config();

import '@/ai/flows/suggest-languages-for-obfuscation.ts';
import '@/ai/flows/rewrite-code-snippets.ts';
import '@/ai/flows/obfuscate-code.ts';
