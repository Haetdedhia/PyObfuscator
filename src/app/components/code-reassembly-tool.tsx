'use client';

import { useState, useTransition } from 'react';
import { reassembleCode } from '@/app/actions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { ShimmeringCodeBlock } from './shimmering-code-block';
import { Loader2, Wand2 } from 'lucide-react';

export function CodeReassemblyTool() {
  const [isPending, startTransition] = useTransition();
  const [obfuscatedCode, setObfuscatedCode] = useState('για ñ в 범위(10):\n  stampa(α)\n  α, β = β, α + β');
  const [description, setDescription] = useState('A function that prints the first 10 numbers of the fibonacci sequence.');
  const [rewrittenCode, setRewrittenCode] = useState('');

  const handleReassemble = () => {
    startTransition(async () => {
      const result = await reassembleCode({
        obfuscatedCodeSnippet: obfuscatedCode,
        description,
      });
      setRewrittenCode(result);
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>1. Obfuscated Snippet</CardTitle>
            <CardDescription>Provide the obfuscated code you want to understand.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={obfuscatedCode}
              onChange={(e) => setObfuscatedCode(e.target.value)}
              placeholder="Paste obfuscated code snippet here..."
              className="min-h-[200px] font-code text-sm bg-background"
            />
          </CardContent>
        </Card>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle>2. Describe Functionality</CardTitle>
            <CardDescription>Explain what you believe the code is supposed to do.</CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g., 'This function sorts a list of numbers in ascending order.'"
              className="min-h-[200px] text-sm bg-background"
            />
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleReassemble}
          disabled={isPending || !obfuscatedCode || !description}
          size="lg"
          className="bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold text-lg shadow-lg hover:shadow-primary/50 transition-shadow"
        >
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <Wand2 className="mr-2 h-5 w-5" />
          )}
          Reassemble Snippet
        </Button>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-center mb-4">3. Rewritten Code</h2>
        <ShimmeringCodeBlock code={rewrittenCode} isLoading={isPending} language="python" />
      </div>
    </div>
  );
}
