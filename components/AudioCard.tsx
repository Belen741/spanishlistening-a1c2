'use client';

import { Play, CheckCircle } from 'lucide-react';

interface AudioCardProps {
  id: string;
  title: string;
  duration: string;
  snippet?: string;
  level: string;
  onPlayClick?: () => void;
  isListened?: boolean;
}

export function AudioCard({ id, title, duration, snippet, level, onPlayClick, isListened = false }: AudioCardProps) {
  const handlePlayClick = () => {
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'audio_play', {
        level: level.toUpperCase(),
        title: title,
      });
    }
    onPlayClick?.();
  };

  return (
    <div className="bg-card rounded-xl border p-4 hover-elevate active-elevate-2 transition-all relative" data-testid={`card-audio-${id}`}>
      {isListened && (
        <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-green-500/10 text-green-600 dark:text-green-400 px-2.5 py-1 rounded-full text-xs font-medium border border-green-500/20">
          <CheckCircle className="h-3.5 w-3.5" />
          <span>Escuchado</span>
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

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayClick}
            className="p-3 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 border-2 border-primary-border"
            aria-label="Reproducir audio"
            data-testid={`button-play-${id}`}
          >
            <Play className="h-4 w-4 ml-0.5" />
          </button>
          <span className="text-sm text-muted-foreground">
            Click to listen
          </span>
        </div>
      </div>
    </div>
  );
}
