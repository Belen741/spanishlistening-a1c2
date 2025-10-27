'use client';

import { useRef, useState } from 'react';
import { X, FileText, HelpCircle } from 'lucide-react';

interface AudioModalProps {
  isOpen: boolean;
  onClose: () => void;
  audio: {
    id: string;
    title: string;
    file: string;
    snippet?: string;
    level: string;
  };
  onShowTranscript: () => void;
  onShowQuiz: () => void;
}

export function AudioModal({ 
  isOpen, 
  onClose, 
  audio, 
  onShowTranscript, 
  onShowQuiz 
}: AudioModalProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!isOpen) return null;

  const handlePlayPause = () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
      setIsPlaying(false);
    } else {
      audioElement.play();
      setIsPlaying(true);
    }
  };

  const handleClose = () => {
    const audioElement = audioRef.current;
    if (audioElement) {
      audioElement.pause();
      audioElement.currentTime = 0;
    }
    setIsPlaying(false);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={handleClose}
      data-testid="modal-audio-overlay"
    >
      <div 
        className="bg-background border rounded-xl shadow-lg max-w-2xl w-full p-6 space-y-6"
        onClick={(e) => e.stopPropagation()}
        data-testid="modal-audio-content"
      >
        <div className="flex items-start justify-between">
          <h2 className="text-2xl font-bold pr-8" data-testid="text-modal-title">
            {audio.title}
          </h2>
          <button
            onClick={handleClose}
            className="p-2 rounded-lg hover-elevate active-elevate-2"
            aria-label="Cerrar modal"
            data-testid="button-modal-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <audio
            ref={audioRef}
            src={audio.file}
            controls
            preload="none"
            className="w-full"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            data-testid="audio-player-modal"
          />

          {audio.snippet && (
            <div className="bg-muted/50 rounded-lg p-4 border">
              <p className="text-sm text-muted-foreground italic leading-relaxed" data-testid="text-transcript-snippet">
                {audio.snippet}
              </p>
            </div>
          )}
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => {
              handleClose();
              onShowTranscript();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 border-2 border-primary-border"
            data-testid="button-show-transcript"
          >
            <FileText className="h-4 w-4" />
            📝 Ver transcripción completa
          </button>
          <button
            onClick={() => {
              handleClose();
              onShowQuiz();
            }}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover-elevate active-elevate-2 border"
            data-testid="button-show-quiz"
          >
            <HelpCircle className="h-4 w-4" />
            ❓ Hacer quiz
          </button>
        </div>
      </div>
    </div>
  );
}
