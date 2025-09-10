'use client';

import { useState, useEffect, useTransition } from 'react';
import { suggestLanguages } from '@/ai/flows/suggest-languages-for-obfuscation';
import { obfuscateCode } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { ShimmeringCodeBlock } from './shimmering-code-block';
import { Loader2, Sparkles } from 'lucide-react';

const defaultPythonCode = `# Simple fibonacci sequence
def fibonacci(n):
    a, b = 0, 1
    for _ in range(n):
        print(a)
        a, b = b, a + b

fibonacci(10)
`;

export function ObfuscatorTool() {
  const [isPending, startTransition] = useTransition();
  const [languages, setLanguages] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<Set<string>>(new Set());
  const [inputCode, setInputCode] = useState(defaultPythonCode);
  const [outputCode, setOutputCode] = useState('');

  useEffect(() => {
    suggestLanguages().then(langs => {
      // Add some default languages for a better initial experience
      const defaultLangs = ['Chinese', 'Japanese', 'Italian', 'German', 'Spanish', 'Greek'];
      const combinedLangs = [...new Set([...defaultLangs, ...langs])];
      setLanguages(combinedLangs);
    });
  }, []);

  const handleLanguageToggle = (lang: string, checked: boolean) => {
    setSelectedLanguages(prev => {
      const newSet = new Set(prev);
      if (checked) {
        newSet.add(lang);
      } else {
        newSet.delete(lang);
      }
      return newSet;
    });
  };

  const handleObfuscate = () => {
    startTransition(async () => {
      const result = await obfuscateCode(inputCode, Array.from(selectedLanguages));
      setOutputCode(result);
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>1. Input Python Code</CardTitle>
            <CardDescription>Paste your Python code into the editor below.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={inputCode}
              onChange={(e) => setInputCode(e.target.value)}
              placeholder="Enter your Python code here..."
              className="min-h-[250px] font-code text-sm bg-background"
            />
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>2. Select Obfuscation Dictionaries</CardTitle>
            <CardDescription>Choose languages to source obfuscation terms from.</CardDescription>
          </CardHeader>
          <CardContent>
            {languages.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-h-[250px] overflow-y-auto p-1">
                {languages.map(lang => (
                  <div key={lang} className="flex items-center space-x-2 bg-background p-3 rounded-md border border-border hover:border-primary transition-colors">
                    <Checkbox
                      id={lang}
                      onCheckedChange={(checked) => handleLanguageToggle(lang, !!checked)}
                    />
                    <Label htmlFor={lang} className="text-sm font-medium leading-none cursor-pointer">
                      {lang}
                    </Label>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex items-center justify-center h-[250px]">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleObfuscate}
          disabled={isPending || !inputCode}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg shadow-lg hover:shadow-primary/50 transition-shadow"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Sparkles className="mr-2 h-5 w-5" />
          )}
          Alchemize Code
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center mb-4">3. Obfuscated Result</h2>
        <ShimmeringCodeBlock code={outputCode} isLoading={isPending} />
      </div>
    </div>
  );
}
