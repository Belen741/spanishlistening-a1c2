'use client';

import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Download, Volume2, SkipBack, SkipForward } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title: string;
}

export function AudioPlayer({ src, title }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [playbackRate, setPlaybackRate] = useState(1);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  const skip = (seconds: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = Math.max(0, Math.min(duration, currentTime + seconds));
  };

  const changePlaybackRate = () => {
    const rates = [0.75, 1, 1.25, 1.5];
    const currentIndex = rates.indexOf(playbackRate);
    const nextRate = rates[(currentIndex + 1) % rates.length];
    setPlaybackRate(nextRate);
    if (audioRef.current) {
      audioRef.current.playbackRate = nextRate;
    }
  };

  const formatTime = (time: number) => {
    if (isNaN(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-card rounded-xl border p-6 space-y-4" data-testid="audio-player">
      <audio ref={audioRef} src={src} preload="metadata" />
      
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-sm text-muted-foreground">Audio</h3>
        <a
          href={src}
          download
          className="text-sm text-primary hover:underline flex items-center gap-1"
          data-testid="button-download-audio"
        >
          <Download className="h-4 w-4" />
          Descargar
        </a>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <button
            onClick={() => skip(-10)}
            className="p-2 rounded-md hover-elevate active-elevate-2 border"
            aria-label="Retroceder 10 segundos"
            data-testid="button-skip-back"
          >
            <SkipBack className="h-5 w-5" />
          </button>

          <button
            onClick={togglePlay}
            className="p-4 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 border-2 border-primary-border"
            aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
            data-testid="button-play-pause"
          >
            {isPlaying ? (
              <Pause className="h-6 w-6" />
            ) : (
              <Play className="h-6 w-6 ml-0.5" />
            )}
          </button>

          <button
            onClick={() => skip(10)}
            className="p-2 rounded-md hover-elevate active-elevate-2 border"
            aria-label="Adelantar 10 segundos"
            data-testid="button-skip-forward"
          >
            <SkipForward className="h-5 w-5" />
          </button>

          <button
            onClick={changePlaybackRate}
            className="ml-auto px-3 py-1 rounded-md text-sm font-medium hover-elevate active-elevate-2 border min-w-[60px]"
            data-testid="button-playback-rate"
          >
            {playbackRate}x
          </button>
        </div>

        <div className="space-y-1">
          <input
            type="range"
            min="0"
            max={duration || 0}
            value={currentTime}
            onChange={handleProgressChange}
            className="w-full h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Progreso de reproducción"
            data-testid="input-progress"
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span data-testid="text-current-time">{formatTime(currentTime)}</span>
            <span data-testid="text-duration">{formatTime(duration)}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer accent-primary"
            aria-label="Volumen"
            data-testid="input-volume"
          />
          <span className="text-xs text-muted-foreground min-w-[35px]">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>
    </div>
  );
}
