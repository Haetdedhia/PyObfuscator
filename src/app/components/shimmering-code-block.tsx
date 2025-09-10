'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Copy, Loader2 } from 'lucide-react';

interface ShimmeringCodeBlockProps {
  code: string;
  isLoading?: boolean;
  language?: string;
}

export function ShimmeringCodeBlock({ code, isLoading = false, language = 'python' }: ShimmeringCodeBlockProps) {
  const [hasCopied, setHasCopied] = useState(false);

  useEffect(() => {
    if (hasCopied) {
      const timer = setTimeout(() => {
        setHasCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasCopied]);

  const copyToClipboard = () => {
    if (code) {
      navigator.clipboard.writeText(code);
      setHasCopied(true);
    }
  };

  return (
    <Card className="bg-card/50 min-h-[150px] relative shimmer-effect">
      <CardContent className="p-4">
        {isLoading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-card/80 z-10">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <>
            {code ? (
              <>
                <Button
                  size="icon"
                  variant="ghost"
                  className="absolute top-3 right-3 h-8 w-8 z-10"
                  onClick={copyToClipboard}
                >
                  {hasCopied ? (
                    <Check className="h-4 w-4 text-accent" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                  <span className="sr-only">Copy code</span>
                </Button>
                <pre className="text-sm font-code whitespace-pre-wrap overflow-x-auto">
                  <code className={`language-${language}`}>{code}</code>
                </pre>
              </>
            ) : (
              <div className="flex items-center justify-center h-full min-h-[150px]">
                <p className="text-muted-foreground">Your alchemized code will appear here...</p>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
