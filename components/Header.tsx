'use client';

import Link from 'next/link';
import { ThemeToggle } from './ThemeToggle';
import { Award } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getProgress, getOverallProgress } from '@/lib/progress';

export function Header() {
  const [progressPercent, setProgressPercent] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const progress = getProgress();
    const percent = getOverallProgress(progress);
    setProgressPercent(percent);
  }, []);

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
          {mounted && (
            <Link
              href="/progreso"
              className="flex items-center gap-2 hover-elevate px-3 py-2 rounded-md"
              data-testid="link-progress"
            >
              <Award className="w-5 h-5" />
              <span className="hidden sm:inline text-sm font-medium">
                {progressPercent}%
              </span>
            </Link>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
