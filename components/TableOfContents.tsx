'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { LEVELS } from '@/lib/levels';

interface TableOfContentsProps {
  hasSelectedAudio: boolean;
  currentLevelSlug: string;
}

export function TableOfContents({ hasSelectedAudio, currentLevelSlug }: TableOfContentsProps) {
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);

  const otherLevels = LEVELS.filter((level) => level.slug !== currentLevelSlug);

  return (
    <nav className="sticky top-4 space-y-6" data-testid="table-of-contents">
      <div>
        <button
          onClick={() => setIsLevelsOpen(!isLevelsOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover-elevate active-elevate-2 transition-colors"
          data-testid="button-toggle-levels"
          aria-expanded={isLevelsOpen}
          aria-controls="other-levels-menu"
        >
          <span>OTROS NIVELES</span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              isLevelsOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        {isLevelsOpen && (
          <div id="other-levels-menu" className="space-y-1 mt-2">
            {otherLevels.map((level) => (
              <Link
                key={level.slug}
                href={level.url}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-muted-foreground hover-elevate active-elevate-2"
                data-testid={`toc-link-level-${level.slug}`}
              >
                <div
                  className="h-4 w-4 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: level.color }}
                />
                <span>Nivel {level.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
