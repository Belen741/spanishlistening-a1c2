'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { GraduationCap } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-2 flex items-center justify-between max-w-7xl">
        <Link 
          href="/" 
          className="text-xl font-semibold hover-elevate px-3 py-2 rounded-md" 
          data-testid="link-home"
        >
          Spanish Listening
        </Link>
        
        <div className="flex items-center gap-2">
          <Link
            href="/advanced-spanish-classes"
            className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md text-orange-500 hover:text-orange-400 transition-colors"
            data-testid="link-advanced-classes"
          >
            <GraduationCap className="w-5 h-5" />
            <span className="hidden sm:inline text-sm font-medium">
              Advanced Classes
            </span>
          </Link>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
