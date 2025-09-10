import { Languages } from "lucide-react";

export function Header() {
  return (
    <header className="py-6 px-4 md:px-6 border-b border-border">
      <div className="container mx-auto flex items-center justify-center gap-3">
        <Languages className="w-8 h-8 text-primary" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
          Code Alchemist
        </h1>
      </div>
    </header>
  );
}
