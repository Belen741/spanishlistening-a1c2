'use client';

import { useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';

interface AudioCardProps {
  id: string;
  title: string;
  duration: string;
  file: string;
  onSelect?: (id: string) => void;
}

export function AudioCard({ id, title, duration, file, onSelect }: AudioCardProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!hasLoaded) {
      audio.src = file;
      setHasLoaded(true);
    }

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().catch((error) => {
        console.error('Error playing audio:', error);
      });
      setIsPlaying(true);
      onSelect?.(id);
    }
  };

  const handleTimeUpdate = () => {
    const audio = audioRef.current;
    if (audio) {
      setCurrentTime(audio.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    const audio = audioRef.current;
    if (audio) {
      setAudioDuration(audio.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (audio) {
      const time = parseFloat(e.target.value);
      audio.currentTime = time;
      setCurrentTime(time);
    }
  };

  const formatTime = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return '0:00';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-xl border p-4 hover-elevate active-elevate-2 transition-all" data-testid={`card-audio-${id}`}>
      <div className="space-y-3">
        <div>
          <h3 className="font-semibold text-lg mb-1" data-testid={`text-audio-title-${id}`}>
            {title}
          </h3>
          <p className="text-sm text-muted-foreground" data-testid={`text-audio-duration-${id}`}>
            {duration}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePlayPause}
            className="p-3 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 border-2 border-primary-border"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            data-testid={`button-play-${id}`}
          >
            {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 ml-0.5" />}
          </button>

          {hasLoaded && (
            <div className="flex-1 space-y-1">
              <input
                type="range"
                min="0"
                max={audioDuration || 0}
                value={currentTime}
                onChange={handleSeek}
                className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer"
                style={{
                  background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${(currentTime / audioDuration) * 100}%, hsl(var(--muted)) ${(currentTime / audioDuration) * 100}%, hsl(var(--muted)) 100%)`
                }}
                data-testid={`slider-progress-${id}`}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(audioDuration)}</span>
              </div>
            </div>
          )}
        </div>

        <audio
          ref={audioRef}
          preload="none"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          data-testid={`audio-player-${id}`}
        />
      </div>
    </div>
  );
}
