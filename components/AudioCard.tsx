'use client';

import Link from 'next/link';
import { Play, ChevronRight } from 'lucide-react';

interface AudioCardProps {
  id: string;
  title: string;
  duration: string;
  snippet?: string;
  level: string;
  listenPercentage?: number;
  href?: string;
}

export function AudioCard({ id, title, duration, snippet, level, listenPercentage = 0, href }: AudioCardProps) {
  const content = (
    <>
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1 pr-24" data-testid={`text-audio-title-${id}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2" data-testid={`text-audio-duration-${id}`}>
            {duration}
          </p>
          {snippet && (
            <p className="text-sm text-muted-foreground italic line-clamp-2" data-testid={`text-audio-snippet-${id}`}>
              {snippet}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Play className="h-4 w-4" />
            <span>Click to listen</span>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </div>
      </div>
    </>
  );

  if (href) {
    return (
      <Link 
        href={href}
        className="block bg-card rounded-xl border p-4 hover-elevate active-elevate-2 transition-all relative" 
        data-testid={`card-audio-${id}`}
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="bg-card rounded-xl border p-4 hover-elevate active-elevate-2 transition-all relative" data-testid={`card-audio-${id}`}>
      {content}
    </div>
  );
}
