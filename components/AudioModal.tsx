'use client';

import { X, FileText, HelpCircle, Play, Pause } from 'lucide-react';

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
  isPlaying: boolean;
  onPlayPause: () => void;
  onShowTranscript: () => void;
  onShowQuiz: () => void;
}

export function AudioModal({ 
  isOpen, 
  onClose, 
  audio,
  isPlaying,
  onPlayPause,
  onShowTranscript, 
  onShowQuiz 
}: AudioModalProps) {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
      onClick={onClose}
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
            onClick={onClose}
            className="p-2 rounded-lg hover-elevate active-elevate-2"
            aria-label="Cerrar modal"
            data-testid="button-modal-close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="bg-accent/20 border rounded-lg p-6 flex items-center justify-center gap-4">
            <button
              onClick={onPlayPause}
              className="p-4 rounded-full bg-primary text-primary-foreground hover-elevate active-elevate-2 border-2 border-primary-border"
              aria-label={isPlaying ? "Pausar audio" : "Reproducir audio"}
              data-testid="button-play-pause"
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8" />
              )}
            </button>
            <div className="text-sm text-muted-foreground">
              {isPlaying ? "Reproduciendo..." : "Haz clic para reproducir"}
            </div>
          </div>

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
            onClick={onShowTranscript}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover-elevate active-elevate-2 border-2 border-primary-border"
            data-testid="button-show-transcript"
          >
            <FileText className="h-4 w-4" />
            📝 Ver transcripción completa
          </button>
          <button
            onClick={onShowQuiz}
            className="flex items-center gap-2 px-4 py-2 bg-accent text-accent-foreground rounded-lg hover-elevate active-elevate-2 border"
            data-testid="button-show-quiz"
          >
            <HelpCircle className="h-4 w-4" />
            ❓ Hacer quiz
          </button>
        </div>

        <p className="text-xs text-muted-foreground text-center">
          💡 El audio continuará reproduciéndose mientras navegas por la transcripción o el quiz
        </p>
      </div>
    </div>
  );
}
