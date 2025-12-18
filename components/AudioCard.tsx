'use client';

import Link from 'next/link';
import { Play, CheckCircle, Clock, ChevronRight } from 'lucide-react';

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
  const isCompleted = listenPercentage >= 90;
  const isInProgress = listenPercentage > 0 && listenPercentage < 90;

  const content = (
    <>
      {isCompleted && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-medium border border-green-500/20" data-testid={`badge-completed-${id}`}>
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Escuchado</span>
        </div>
      )}
      {isInProgress && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 px-2.5 py-1 rounded-full text-xs font-medium border border-yellow-500/20" data-testid={`badge-in-progress-${id}`}>
          <Clock className="h-3.5 w-3.5" />
          <span>En progreso</span>
        </div>
      )}
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
