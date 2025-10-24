'use client';

import Link from 'next/link';
import Image from 'next/image';
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
          Spanish Listening
        </Link>
        <div className="flex items-center gap-4">
          <ThemeToggle />
          <a 
            href="https://hablandoconbelen.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover-elevate rounded-md transition-transform"
            data-testid="link-logo"
          >
            <Image 
              src="/images/logo-hablando-con-belen.png" 
              alt="Hablando con Belén" 
              width={120}
              height={80}
              className="h-12 w-auto"
              priority
            />
          </a>
        </div>
      </div>
    </header>
  );
}
