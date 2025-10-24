'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between max-w-7xl">
        <Link 
          href="/" 
          className="text-xl font-semibold hover-elevate px-3 py-2 rounded-md" 
          data-testid="link-home"
        >
          🎧 Spanish Listening
        </Link>
        <ThemeToggle />
      </div>
    </header>
  );
}
