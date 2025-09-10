# **App Name**: Code Alchemist

## Core Features:

- Code Input: Accepts Python code through a text area.
- Intelligent Obfuscation Engine: Transforms variable names, function names, and comments into randomly chosen words from non-English languages, and transforms characters into characters from other scripts. LLM is used as a tool for language detection and translation of words.
- Obfuscation Customization: Allow users to specify which non-English languages to be used as dictionaries for code obfuscation.
- Code Reassembly Tool: Tool leverages a Language Model (LLM) to find portions of code, even if obfuscated with other language scripts, that accomplish specific tasks and rewrite these snippets.
- Syntax Check: Automatically checks if the obfuscated code is still syntactically correct after it is transformed.
- Output Display: Display the obfuscated code in a text box for the user to copy.

## Style Guidelines:

- Background color: Very dark gray (#121212) to evoke a code-ink theme.
- Primary color: Electric purple (#BE63FF) for highlighting key UI elements.
- Accent color: Teal (#44D9E6) for interactive elements.
- Body and headline font: 'Space Grotesk', a sans-serif with a techy feel.
- Use multilingual symbols within icons.
- Visually represent each non-English language in a separate display container in an intuitive display
- Subtle animation in the output, like shimmering.