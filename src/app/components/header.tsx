import { Triangle } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 border-b border-border">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <div className="flex items-center gap-1">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <Triangle className="w-7 h-7 text-primary" style={{ transform: 'rotate(180deg)' }} />
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-primary">
            <rect x="4" y="4" width="16" height="16" stroke="currentColor" strokeWidth="2"/>
          </svg>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Code Alchemist
        </h1>
      </div>
    </header>
  );
}
